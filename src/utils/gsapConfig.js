import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let pluginsRegistered = false;

export const MOTION_EASE = {
  smoothOut: "power3.out",
  smoothInOut: "power3.inOut",
  springSoft: "back.out(1.4)",
};

export const MOTION_TOKENS = {
  duration: {
    fast: 0.45,
    base: 0.8,
    slow: 1.2,
  },
  stagger: {
    tight: 0.08,
    normal: 0.14,
  },
};

export function ensureGsapPlugins() {
  if (pluginsRegistered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger, useGSAP);
  pluginsRegistered = true;
}

export { gsap, ScrollTrigger };
