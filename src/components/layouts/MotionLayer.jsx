import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, ensureGsapPlugins } from "../../utils/gsapConfig";
import useLenisScroll from "../../hooks/useLenisScroll";
import useMagneticHover from "../../hooks/useMagneticHover";
import { animatePageHero } from "../../utils/animationHelpers";

const MotionContext = createContext(null);

export function useMotionNavigate() {
  const context = useContext(MotionContext);

  if (!context) {
    throw new Error("useMotionNavigate must be used inside MotionLayer");
  }

  return context.navigateWithTransition;
}

function CustomCursor() {
  const cursorRef = useRef(null);
  const stateRef = useRef({
    x: -100,
    y: -100,
    targetX: -100,
    targetY: -100,
    scale: 1,
    color: "var(--link-color)",
    fillOpacity: 0,
  });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      return undefined;
    }

    const cursor = cursorRef.current;
    if (!cursor) {
      return undefined;
    }

    const updateState = (event) => {
      const interactive = event.target.closest("a, button, [role='button'], [data-cursor-hover]");
      const computedColor = interactive ? getComputedStyle(interactive).color : "";

      stateRef.current.targetX = event.clientX;
      stateRef.current.targetY = event.clientY;
      stateRef.current.scale = interactive ? 3.333 : 1;
      stateRef.current.fillOpacity = interactive ? 1 : 0;
      stateRef.current.color = computedColor || "var(--link-color)";
    };

    let frameId = 0;

    const frame = () => {
      const state = stateRef.current;
      state.x += (state.targetX - state.x) * 0.08;
      state.y += (state.targetY - state.y) * 0.08;

      cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale})`;
      cursor.style.setProperty("--cursor-color", state.color);
      cursor.style.setProperty("--cursor-fill-opacity", state.fillOpacity.toString());
      frameId = requestAnimationFrame(frame);
    };

    const resetCursor = () => {
      stateRef.current.scale = 1;
      stateRef.current.fillOpacity = 0;
    };

    document.addEventListener("pointermove", updateState);
    document.addEventListener("pointerdown", updateState);
    document.addEventListener("pointerleave", resetCursor);
    frameId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("pointermove", updateState);
      document.removeEventListener("pointerdown", updateState);
      document.removeEventListener("pointerleave", resetCursor);
    };
  }, []);

  return <div ref={cursorRef} aria-hidden="true" className="custom-cursor" />;
}

export default function MotionLayer({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef(null);
  const isMountedRef = useRef(false);
  const pendingTargetRef = useRef(null);

  useEffect(() => {
    ensureGsapPlugins();
  }, []);

  useLenisScroll();
  useMagneticHover("[data-magnetic]", location.pathname);

  const navigateWithTransition = useCallback(
    (to) => {
      const overlay = overlayRef.current;

      if (!overlay) {
        navigate(to);
        return;
      }

      if (pendingTargetRef.current) {
        return;
      }

      pendingTargetRef.current = to;
      gsap.killTweensOf(overlay);
      gsap.set(overlay, { yPercent: 100 });

      gsap.to(overlay, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.inOut",
        onComplete: () => {
          navigate(to);
        },
      });
    },
    [navigate]
  );

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const target = event.target.closest("a[href], [data-transition-href]");

      if (!target) {
        return;
      }

      const rawHref = target.getAttribute("href") || target.getAttribute("data-transition-href") || "";

      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
        return;
      }

      const resolvedUrl = new URL(rawHref, window.location.origin);

      if (resolvedUrl.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      navigateWithTransition(`${resolvedUrl.pathname}${resolvedUrl.search}${resolvedUrl.hash}`);
    };

    document.addEventListener("click", handleDocumentClick, true);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
    };
  }, [navigateWithTransition]);

  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) {
      return undefined;
    }

    if (!isMountedRef.current) {
      isMountedRef.current = true;
      gsap.set(overlay, { yPercent: 0 });
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.55,
        ease: "power3.inOut",
      });
      return undefined;
    }

    if (pendingTargetRef.current) {
      pendingTargetRef.current = null;
      gsap.set(overlay, { yPercent: 0 });
      gsap.to(overlay, {
        yPercent: -100,
        duration: 0.55,
        ease: "power3.inOut",
      });
    }

    const frame = requestAnimationFrame(() => {
      animatePageHero(location.pathname);
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  const contextValue = useMemo(
    () => ({ navigateWithTransition }),
    [navigateWithTransition]
  );

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
      <div ref={overlayRef} className="page-transition-overlay" aria-hidden="true" />
      <CustomCursor />
    </MotionContext.Provider>
  );
}
