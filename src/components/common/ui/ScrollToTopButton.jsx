import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll back to top"
      className={`fixed bottom-5 left-5 z-[90] rounded-full border border-black/10 bg-white/85 p-3 text-black shadow-[0_10px_25px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 dark:border-white/15 dark:bg-[#131826]/90 dark:text-white ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-4" aria-hidden="true" />
    </button>
  );
}
