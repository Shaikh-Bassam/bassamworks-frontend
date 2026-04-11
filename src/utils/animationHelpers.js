import { gsap } from "./gsapConfig";

let heroClockCleanup = null;

function formatClock(value) {
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}

export function animateCountUp(element, toValue, options = {}) {
  if (!element) {
    return null;
  }

  const state = { value: 0 };
  const {
    duration = 1,
    delay = 0,
    ease = "power2.out",
    formatter = (value) => String(Math.round(value)),
  } = options;

  return gsap.to(state, {
    value: toValue,
    duration,
    delay,
    ease,
    onUpdate: () => {
      element.textContent = formatter(state.value);
    },
  });
}

export function animateClock(element) {
  if (!element) {
    return null;
  }

  const now = new Date();
  const targetSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const state = { value: 0 };

  const tween = gsap.to(state, {
    value: targetSeconds,
    duration: 1.25,
    ease: "power2.out",
    onUpdate: () => {
      const totalSeconds = Math.floor(state.value);
      const hours = formatClock(Math.floor(totalSeconds / 3600));
      const minutes = formatClock(Math.floor((totalSeconds % 3600) / 60));
      const seconds = formatClock(totalSeconds % 60);
      element.textContent = `${hours}:${minutes}:${seconds}`;
    },
    onComplete: () => {
      element.textContent = `${formatClock(now.getHours())}:${formatClock(now.getMinutes())}:${formatClock(now.getSeconds())}`;
    },
  });

  const intervalId = window.setInterval(() => {
    const liveNow = new Date();
    element.textContent = `${formatClock(liveNow.getHours())}:${formatClock(liveNow.getMinutes())}:${formatClock(liveNow.getSeconds())}`;
  }, 1000);

  return () => {
    tween.kill();
    window.clearInterval(intervalId);
  };
}

export function animatePageHero() {
  if (heroClockCleanup) {
    heroClockCleanup();
    heroClockCleanup = null;
  }

  const navItems = gsap.utils.toArray("[data-enter-nav]");
  if (navItems.length) {
    gsap.fromTo(
      navItems,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        overwrite: true,
      }
    );
  }

  const heroReveal = document.querySelector("[data-hero-reveal]");
  if (heroReveal) {
    gsap.fromTo(
      heroReveal,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.1,
        ease: "power4.out",
        overwrite: true,
      }
    );
  }

  const coordinates = document.querySelector("[data-coordinates]");
  if (coordinates) {
    gsap.fromTo(
      coordinates,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.6,
        ease: "power2.out",
        overwrite: true,
      }
    );
  }

  const clock = document.querySelector("[data-clock]");
  if (clock) {
    heroClockCleanup = animateClock(clock);
  }
}
