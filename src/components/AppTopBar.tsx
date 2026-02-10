import type { ReactNode } from "react";

interface AppTopBarProps {
    rightSlot?: ReactNode;
}

export default function AppTopBar({ rightSlot }: AppTopBarProps) {
    return (
        <header className="app-top-bar">
            <div className="app-top-bar-inner">
                <div className="app-brand">
                    <span className="material-symbols-outlined" aria-hidden>
                        piano
                    </span>
                    <span>88keys.app</span>
                </div>

                {rightSlot ? <div className="app-top-bar-right">{rightSlot}</div> : null}
            </div>
        </header>
    );
}
