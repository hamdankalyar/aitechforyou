"use client";

import { useEffect } from "react";

// Marks the contents link of the section currently in view with aria-current="true".
export function ActiveSection({ links = 'nav a[href^="#"]' }: { links?: string }) {
  useEffect(() => {
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(links));
    const sections = anchors.map(anchor => document.getElementById(decodeURIComponent(anchor.hash.slice(1)))).filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
      for (const anchor of anchors) anchor.toggleAttribute("aria-current", anchor.hash === `#${current.id}`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => { removeEventListener("scroll", schedule); removeEventListener("resize", schedule); cancelAnimationFrame(frame); };
  }, [links]);
  return null;
}
