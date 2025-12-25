import useMenu from "../../hooks/useMenu";
import PrimaryButtom from "../common/buttons/PrimaryButtom";
import Logo from "../common/Logo";
import Sidebar from "./menu";

export default function Navbar({ isDisabled, toggleMenu, isOpen } ) {

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
            {/* <button className="md:hidden text-white">
              <span className="material-symbols-outlined">menu</span>
            </button> */}
            {/* Hamburger Button - Boxed when closed, Rounded when open */}
            <button
              aria-label="hamburger menu button"
              className={`fixed  ${isDisabled ? 'pointer-events-none' : ''} transition-all duration-700 ease-in-out ${isOpen
                ? 'top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 w-14 h-10'
                : 'top-5 right-5 w-12 h-10'
                }`}
              onClick={toggleMenu}
            >
              <span
                className={`flex justify-center items-center w-full h-full bg-white transition-all duration-700 ease-in-out hover:scale-95 shadow-lg ${isOpen ? 'rounded-full' : 'rounded-lg'
                  }`}
              >
                <span className="relative w-[24px] h-[14px]">
                  <span
                    className={`absolute left-0 w-full h-[3px] bg-[#302c1a] rounded-sm transition-all duration-500 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                      }`}
                  />
                  <span
                    className={`absolute left-0 w-full h-[3px] bg-[#302c1a] rounded-sm transition-all duration-500 ease-in-out ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                      }`}
                  />
                </span>
              </span>
            </button>
            {/* <Sidebar /> */}
          </div>
        </div>
      </div>
    </header>
  );
}
