import type { ReactNode } from "react";

/** Small uppercase label used above reference lists and documentation blocks. */
export default function MicroHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
      {children}
    </p>
  );
}

/** MicroHeading without the bottom margin, for inline header rows. */
export function MicroHeadingInline({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{children}</p>
  );
}
