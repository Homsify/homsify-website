"use client";
import { useEffect } from "react";

/** In-page anchor navigation that accounts for the fixed 84px header.
 *  Explicit rather than relying on CSS smooth scroll, which silently breaks
 *  when an ancestor becomes a scroll container. */
export default function SmoothLinks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href")!.split("#")[1];
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;               // let the router handle cross-page links
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = target.getBoundingClientRect().top + window.pageYOffset - 96;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
      history.pushState(null, "", "#" + id);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
