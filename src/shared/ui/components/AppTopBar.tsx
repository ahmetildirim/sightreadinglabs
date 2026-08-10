import type { ReactNode } from "react";
import { APP_NAME, APP_RELEASE_STAGE, APP_TITLE } from "../../config/appMeta";
import BrandMark from "./BrandMark";

interface AppTopBarProps {
    rightSlot?: ReactNode;
}

export default function AppTopBar({ rightSlot }: AppTopBarProps) {
    return (
        <header className="app-top-bar">
            <div className="app-top-bar-inner">
                <div className="app-brand" aria-label={`${APP_NAME} ${APP_RELEASE_STAGE}`}>
                    <BrandMark className="app-brand-mark" />
                    <span className="app-brand-wordmark">
                        <strong>{APP_TITLE}</strong>
                        <small>{APP_RELEASE_STAGE}</small>
                    </span>
                </div>

                {rightSlot ? <div className="app-top-bar-right">{rightSlot}</div> : null}
            </div>
        </header>
    );
}
