import { useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../utils/gsapConfig";

export default function useParallax(selector = "[data-parallax]") {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    ensureGsapPlugins();
    const els = gsap.utils.toArray(selector);
    const tweens = els.map((el) => {
      const speed = parseFloat(el.getAttribute("data-speed")) || 0.15;
      return gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      ScrollTrigger.refresh();
    };
  }, [selector]);
}
