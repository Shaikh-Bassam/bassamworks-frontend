import PrimaryButtom from "./buttons/PrimaryButtom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="px-4 md:px-10 py-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="h-8 w-8 flex items-center justify-center bg-white rounded-lg text-primary">
              <span className="material-symbols-outlined text-[20px] font-bold">
                terminal
              </span>
            </div>
            <Logo />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-300 text-sm font-medium hover:text-white">
              Work
            </a>
            <a href="#" className="text-gray-300 text-sm font-medium hover:text-white">
              Stack
            </a>
            <a href="#" className="text-gray-300 text-sm font-medium hover:text-white">
              About
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <PrimaryButtom className="h-10">
              Let&apos;s Talk
            </PrimaryButtom>
            <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
