import { useEffect, useRef } from "react";
import { createHeroScene } from "./HeroSceneController";

export default function HeroScene3D() {
  const hostRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) {
      return undefined;
    }

    const scene = createHeroScene(canvasRef.current, hostRef.current);
    return () => scene.destroy();
  }, []);

  return (
    <div ref={hostRef} className="hero-scene-host" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-scene-canvas" />
    </div>
  );
}
