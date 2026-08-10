interface BrandMarkProps {
    className?: string;
}

export default function BrandMark({ className }: BrandMarkProps) {
    const classes = ["brand-mark", className].filter(Boolean).join(" ");

    return (
        <span className={classes} aria-hidden>
            <img className="brand-mark-light" src="/favicon-light.png" alt="" />
            <img className="brand-mark-dark" src="/favicon-dark.png" alt="" />
        </span>
    );
}
