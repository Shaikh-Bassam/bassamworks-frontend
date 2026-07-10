import useParallax from "../../hooks/useParallax";

/**
 * Decorative gradient orbs that sit behind page content and drift with a
 * subtle scroll parallax. Purely presentational: hidden from assistive tech,
 * ignores pointer events, and respects prefers-reduced-motion via useParallax
 * (JS) and the .bw-blob keyframe rule (CSS).
 */
export default function AmbientBlobs() {
  useParallax();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-100 dark:opacity-60"
    >
      <div
        className="bw-blob"
        data-parallax="1"
        data-speed="-0.18"
        style={{
          top: "-12%",
          left: "-6%",
          width: "46vw",
          height: "46vw",
          maxWidth: "680px",
          maxHeight: "680px",
          background: "radial-gradient(circle at 35% 35%, #6F9BF2, #4D7FF0)",
          filter: "blur(10px)",
          opacity: 0.5,
          animationDuration: "14s",
        }}
      />
      <div
        className="bw-blob"
        data-parallax="1"
        data-speed="0.12"
        style={{
          top: "2%",
          right: "-10%",
          width: "42vw",
          height: "42vw",
          maxWidth: "600px",
          maxHeight: "600px",
          background: "radial-gradient(circle at 60% 40%, #FBD24E, #F4BE2C)",
          filter: "blur(8px)",
          opacity: 0.55,
          animationDuration: "18s",
          animationDelay: "1s",
        }}
      />
      <div
        className="bw-blob"
        data-parallax="1"
        data-speed="-0.1"
        style={{
          bottom: "-14%",
          left: "30%",
          width: "40vw",
          height: "40vw",
          maxWidth: "560px",
          maxHeight: "560px",
          background: "radial-gradient(circle at 50% 50%, #6F9BF2, #F4BE2C)",
          filter: "blur(40px)",
          opacity: 0.22,
        }}
      />
    </div>
  );
}
