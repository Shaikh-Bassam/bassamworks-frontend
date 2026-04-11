import { Link } from "react-router-dom";
import { MoonStar, SunMedium } from "lucide-react";
import Logo from "../branding/Logo";
import Icon from "../branding/Icon";
import BorderButton from "../common/buttons/BorderButton";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-10">
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between rounded-full border border-black/10 bg-white/80 px-4 py-3 text-black shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-[#0b0d12]/82 dark:text-white">
        <Link to="/" className="flex items-center gap-3 group">
          <Icon />
          <Logo className="text-sm uppercase tracking-[0.28em] md:text-base" />
        </Link>

        <nav className="hidden items-center gap-1 text-xs uppercase tracking-[0.3em] text-black/70 dark:text-white/70 md:flex">
          <Link className="rounded-full px-4 py-2 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white" to="/">
            Home
          </Link>
          <Link className="rounded-full px-4 py-2 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white" to="/about">
            About
          </Link>
          <Link className="rounded-full px-4 py-2 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white" to="/skills">Skills</Link>
          <Link className="rounded-full px-4 py-2 transition-colors hover:bg-black/5 hover:text-black dark:hover:bg-white/10 dark:hover:text-white" to="/contact">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle dark mode"
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-9 items-center justify-center rounded-full border border-black/10 bg-white/80 transition-colors hover:bg-white dark:border-white/20 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {isDark ? <SunMedium className="size-4" aria-hidden="true" /> : <MoonStar className="size-4" aria-hidden="true" />}
          </button>
          <BorderButton as={Link} to="/contact" variant="solid" className="rounded-full border-0 bg-[#f5d34f] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#101114] shadow-none hover:bg-[#ffe07a]">
            Let&apos;s build
          </BorderButton>
        </div>
      </div>
    </header>
  );
}
