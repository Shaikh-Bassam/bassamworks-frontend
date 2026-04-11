import { useEffect } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../utils/gsapConfig";

export default function useScrollReveal(selector, config = {}) {
  useEffect(() => {
    ensureGsapPlugins();

    const elements = gsap.utils.toArray(selector);
    if (!elements.length) {
      return undefined;
    }

    const triggers = elements.map((element) =>
      gsap.fromTo(
        element,
        {
          y: config.fromY ?? 48,
          opacity: 0,
          filter: "blur(6px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: config.duration ?? 0.9,
          ease: config.ease ?? "power3.out",
          scrollTrigger: {
            trigger: element,
            start: config.start ?? "top 84%",
            once: config.once ?? true,
          },
        }
      )
    );

    return () => {
      triggers.forEach((trigger) => {
        trigger.scrollTrigger?.kill();
        trigger.kill();
      });

      ScrollTrigger.refresh();
    };
  }, [selector, config.duration, config.ease, config.fromY, config.once, config.start]);
}
