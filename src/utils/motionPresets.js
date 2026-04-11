import { gsap } from "./gsapConfig";
import { animateCountUp } from "./animationHelpers";

export function revealUp(targets, options = {}) {
  const {
    y = 56,
    duration = 0.95,
    stagger = 0.1,
    ease = "power3.out",
    delay = 0,
  } = options;

  return gsap.fromTo(
    targets,
    {
      y,
      opacity: 0,
      filter: "blur(8px)",
    },
    {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration,
      ease,
      stagger,
      delay,
    }
  );
}

export function floatLoop(target, options = {}) {
  const {
    y = 14,
    duration = 2.8,
    ease = "sine.inOut",
    yoyo = true,
    repeat = -1,
  } = options;

  return gsap.to(target, {
    y,
    duration,
    ease,
    yoyo,
    repeat,
  });
}

export function counterTo(target, value, options = {}) {
  return animateCountUp(target, value, options);
}
