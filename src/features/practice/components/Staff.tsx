import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { OpenSheetMusicDisplay } from "opensheetmusicdisplay";

interface StaffProps {
  scoreXml: string;
  cursorStyle: CursorStyle;
  completedNotes: number;
}

interface CursorStyle {
  color: string;
  alpha: number;
}

const SCORE_ZOOM = 1.5;
type OpenSheetMusicDisplayCtor = (typeof import("opensheetmusicdisplay"))["OpenSheetMusicDisplay"];

export default function Staff({ scoreXml, cursorStyle, completedNotes }: StaffProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const osmdRef = useRef<OpenSheetMusicDisplay | null>(null);
  const osmdCtorRef = useRef<OpenSheetMusicDisplayCtor | null>(null);
  const renderedNotesRef = useRef(0);
  const readyRef = useRef(false);
  const completedNotesRef = useRef(completedNotes);
  completedNotesRef.current = completedNotes;

  const cursorStyleRef = useRef(cursorStyle);
  cursorStyleRef.current = cursorStyle;

  const applyCursorStyle = useCallback((style: CursorStyle) => {
    const cursor = osmdRef.current?.cursor;
    if (!cursor) return;
    cursor.CursorOptions = {
      ...cursor.CursorOptions,
      color: style.color,
      alpha: style.alpha,
    };
    cursor.show();
  }, []);

  const getScrollContainer = useCallback((): HTMLElement | null => {
    const root = containerRef.current;
    if (!root) return null;

    const practiceScore = root.closest(".practice-score");
    if (practiceScore instanceof HTMLElement) {
      return practiceScore;
    }

    return root.parentElement instanceof HTMLElement ? root.parentElement : null;
  }, []);

  const scrollToNextPage = useCallback(() => {
    const scrollContainer = getScrollContainer();
    const cursor = osmdRef.current?.cursor;
    if (!readyRef.current || !scrollContainer || !cursor || cursor.Iterator.EndReached) return;

    const containerRect = scrollContainer.getBoundingClientRect();
    const cursorRect = cursor.cursorElement.getBoundingClientRect();
    const currentLeft = scrollContainer.scrollLeft;
    const viewportLeft = containerRect.left + scrollContainer.clientLeft;
    const containerStyle = getComputedStyle(scrollContainer);
    const leftPadding = parseFloat(containerStyle.paddingLeft) || 0;
    const rightPadding = parseFloat(containerStyle.paddingRight) || 0;
    const visibleRight = viewportLeft + scrollContainer.clientWidth - rightPadding;

    // Keep the staff still until the next note no longer fits on this page.
    if (cursorRect.right <= visibleRight) return;

    const cursorLeft = cursorRect.left - viewportLeft + currentLeft;
    // New pages start at the left padding, without the opening clef's spacing.
    // Leave enough trailing room to align a short final page there too.
    containerRef.current?.style.setProperty(
      "--staff-page-tail",
      `${Math.max(0, scrollContainer.clientWidth - leftPadding)}px`,
    );
    scrollContainer.scrollTo({
      left: Math.max(0, cursorLeft - leftPadding),
      behavior: "instant",
    });
  }, [getScrollContainer]);

  const resetCursor = useCallback(() => {
    osmdRef.current?.cursor?.reset();
    renderedNotesRef.current = 0;
    containerRef.current?.style.removeProperty("--staff-page-tail");
    getScrollContainer()?.scrollTo({ left: 0, behavior: "instant" });
  }, [getScrollContainer]);

  const syncCursor = useCallback(() => {
    const cursor = osmdRef.current?.cursor;
    if (!readyRef.current || !cursor) return;

    const completed = completedNotesRef.current;
    if (completed < renderedNotesRef.current) resetCursor();
    cursor.show();
    // Replay page boundaries when restoring a staff after loading or remounting.
    while (renderedNotesRef.current < completed && !cursor.Iterator.EndReached) {
      cursor.next();
      renderedNotesRef.current += 1;
      scrollToNextPage();
    }
  }, [resetCursor, scrollToNextPage]);

  const getOrCreateOsmd = useCallback(async (): Promise<OpenSheetMusicDisplay | null> => {
    if (osmdRef.current) return osmdRef.current;
    if (!containerRef.current) return null;

    if (!osmdCtorRef.current) {
      const osmdModule = await import("opensheetmusicdisplay");
      osmdCtorRef.current = osmdModule.OpenSheetMusicDisplay;
    }

    // Strict Mode can start another effect while the module import is pending.
    if (osmdRef.current) return osmdRef.current;
    if (!containerRef.current) return null;

    const OpenSheetMusicDisplayClass = osmdCtorRef.current;
    osmdRef.current = new OpenSheetMusicDisplayClass(containerRef.current, {
      drawMetronomeMarks: false,
      drawTitle: false,
      drawPartNames: false,
      drawMeasureNumbers: false,
      followCursor: false,
      renderSingleHorizontalStaffline: true,
      spacingFactorSoftmax: 100,
      // A single horizontal staff does not reflow with the viewport. OSMD's
      // automatic redraw replaces its DOM and discards the scroll position.
      autoResize: false,
    });

    return osmdRef.current;
  }, []);

  useLayoutEffect(() => {
    syncCursor();
  }, [completedNotes, syncCursor]);

  useEffect(() => {
    const scrollContainer = getScrollContainer();
    if (!scrollContainer) return;

    const observer = new ResizeObserver(scrollToNextPage);
    observer.observe(scrollContainer);
    return () => observer.disconnect();
  }, [getScrollContainer, scrollToNextPage]);

  useEffect(() => {
    let cancelled = false;
    readyRef.current = false;

    (async () => {
      const osmd = await getOrCreateOsmd();
      if (!osmd || cancelled) return;

      await osmd.load(scoreXml);
      if (cancelled) return;

      osmd.zoom = SCORE_ZOOM;
      osmd.render();
      applyCursorStyle(cursorStyleRef.current);
      resetCursor();
      readyRef.current = true;
      syncCursor();
    })();

    return () => {
      cancelled = true;
      readyRef.current = false;
    };
  }, [scoreXml, getOrCreateOsmd, applyCursorStyle, resetCursor, syncCursor]);

  useEffect(() => {
    applyCursorStyle(cursorStyle);
  }, [cursorStyle, applyCursorStyle]);

  return <div id="osmd" className="osmd" ref={containerRef} />;
}
