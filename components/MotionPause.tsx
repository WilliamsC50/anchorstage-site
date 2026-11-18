"use client";

import { useEffect } from "react";

/**
 * Pauses a section's decorative CSS animations while it is out of view.
 *
 * Every element matching `target` gets data-motion="paused" (globals.css)
 * while it lies entirely outside the viewport, plus a small margin so motion
 * is already running again as the section scrolls back in. Paused animations
 * hold their current frame and resume from it, so nothing jumps or restarts,
 * and nothing changes while any part of the section is on screen.
 *
 * The homepage scenes are handled by SceneStack instead: stacked scenes stay
 * inside the viewport even when covered, so intersection cannot tell.
 * Renders nothing.
 */
export default function MotionPause({ target }: { target: string }) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(target));
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) delete el.dataset.motion;
          else el.dataset.motion = "paused";
        }
      },
      { rootMargin: "100px 0px" },
    );
    for (const el of els) observer.observe(el);

    return () => {
      observer.disconnect();
      for (const el of els) delete el.dataset.motion;
    };
  }, [target]);

  return null;
}
