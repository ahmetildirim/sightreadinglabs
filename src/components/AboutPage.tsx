import AppTopBar from "./AppTopBar";
import BackButton from "./BackButton";
import { APP_VERSION } from "../config/appMeta";

interface AboutPageProps {
    onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
    return (
        <div className="app-page about-page">
            <AppTopBar
                rightSlot={
                    <BackButton onClick={onBack} />
                }
            />

            <main className="about-main">
                <div className="about-wrapper">
                    <section className="about-content">
                        <div className="about-icon-box" aria-hidden>
                            <span className="material-symbols-outlined">piano</span>
                        </div>

                        <h1>About 88keys</h1>
                        <div className="about-divider" aria-hidden />

                        <p>
                            In a world of cluttered interfaces and gamified distractions, finding
                            focus at the piano can be challenging. <strong>88keys</strong> was built
                            to strip away the noise.
                        </p>

                        <p>
                            Our mission is simple: provide a pure, distraction-free environment
                            dedicated solely to the mastery of sight-reading. We believe precision
                            in design fosters precision in practice. No badges, no leaderboards.
                            Just you and the notes.
                        </p>

                        <p>
                            Designed with a minimalist monochrome aesthetic, every pixel serves a
                            purpose, ensuring your cognitive load is spent on the music, not the
                            software.
                        </p>

                        <div className="about-support">
                            <a
                                className="about-support-button"
                                href="https://buymeacoffee.com/ahmetildirim"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span className="material-symbols-outlined">local_cafe</span>
                                <span>Buy me a coffee</span>
                            </a>
                            <p>Support independent development</p>
                        </div>
                    </section>

                    <figure className="about-hero" aria-label="Piano keys close-up">
                        <div className="about-hero-image" aria-hidden />
                    </figure>
                </div>
            </main>

            <footer className="about-footer">
                <p className="mono">v{APP_VERSION}</p>
                <p>Crafted for pianists. © 2026 88keys.app</p>
            </footer>
        </div>
    );
}
