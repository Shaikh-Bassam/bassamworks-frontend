import { useEffect } from "react";
import { gsap } from "../utils/gsapConfig";

export default function useMagneticHover(selector = "[data-magnetic]", dependency) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector));

    if (!elements.length) {
      return undefined;
    }

    const handlers = elements.map((element) => {
      const handleMove = (event) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);

        if (distance > 60) {
          gsap.to(element, { x: 0, y: 0, duration: 0.25, ease: "power3.out", overwrite: true });
          return;
        }

        const offsetX = ((event.clientX - centerX) / 60) * 6;
        const offsetY = ((event.clientY - centerY) / 60) * 6;

        gsap.to(element, {
          x: offsetX,
          y: offsetY,
          duration: 0.22,
          ease: "power3.out",
          overwrite: true,
        });
      };

      const handleLeave = () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      };

      element.addEventListener("mousemove", handleMove);
      element.addEventListener("mouseleave", handleLeave);

      return { element, handleMove, handleLeave };
    });

    return () => {
      handlers.forEach(({ element, handleMove, handleLeave }) => {
        element.removeEventListener("mousemove", handleMove);
        element.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, [selector, dependency]);
}
