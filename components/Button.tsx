import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  // The one place brand orange carries a full surface. Warm shadow so the
  // primary action sits above the page rather than flat on it.
  primary:
    "bg-aso-orange text-white shadow-[0_6px_20px_-8px_rgba(255,122,26,0.75)] hover:shadow-[0_10px_26px_-8px_rgba(255,122,26,0.9)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0",
  outline: "border border-white/30 text-white hover:border-aso-orange hover:bg-white/5",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-6 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "lg",
  className = "",
}: ButtonProps) {
  const classes = `inline-block rounded-lg font-medium text-center transition ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
