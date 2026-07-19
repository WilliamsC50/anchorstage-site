import type { ReactNode } from "react";

/** Anchor wrapper: gives each Section a stable id with room for the sticky
 *  header + jump bar when the browser scrolls to it. */
export default function Anchored({ id, children }: { id: string; children: ReactNode }) {
  return (
    <div id={id} className="scroll-mt-28">
      {children}
    </div>
  );
}
