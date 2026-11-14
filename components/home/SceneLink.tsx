"use client";

import type { MouseEvent, ReactNode } from "react";

interface SceneLinkProps {
  /** id of the homepage scene to bring into view. */
  target: string;
  className?: string;
  children: ReactNode;
}

/**
 * An in-page link to a homepage scene.
 *
 * It is a plain fragment link (href="#id"), so it works without JavaScript,
 * in new tabs, and with modifier keys; the scene's scroll-margin keeps it
 * below the sticky header (home.css). A plain click is enhanced with the
 * browser's own smooth scrollIntoView (instant under reduced motion), records
 * the fragment in history like a native link, and then moves keyboard focus
 * to the scene so Tab continues from there. Focus waits for the scroll to
 * finish: SceneStack brings any focused, off-screen element into view at
 * once, which would cut the smooth scroll short.
 */
export default function SceneLink({ target, className, children }: SceneLinkProps) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const scene = document.getElementById(target);
    if (!scene) return;
    event.preventDefault();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.location.hash !== `#${target}`) window.history.pushState(null, "", `#${target}`);
    scene.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

    let done = false;
    const focusScene = () => {
      if (done) return;
      done = true;
      window.removeEventListener("scrollend", focusScene);
      // Only if the scene arrived (the reader may have scrolled away).
      const top = scene.getBoundingClientRect().top;
      if (top >= -1 && top < window.innerHeight / 2) scene.focus({ preventScroll: true });
    };
    if (reduce) {
      focusScene();
    } else {
      // scrollend where supported; a timer otherwise, or if nothing scrolled.
      window.addEventListener("scrollend", focusScene);
      window.setTimeout(focusScene, 1500);
    }
  };

  return (
    <a href={`#${target}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
