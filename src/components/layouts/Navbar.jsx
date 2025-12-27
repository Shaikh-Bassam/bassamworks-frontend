import useMenu from "../../hooks/useMenu";
import PrimaryButtom from "../common/buttons/PrimaryButtom";
import Logo from "../branding/Logo";
import Icon from "../branding/Icon";

export default function Navbar() {

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="px-4 md:px-10 py-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group">
            <Icon/>
            <Logo />
          </div>

          <div className="flex items-center gap-4">
            <PrimaryButtom className="h-10">
              Let&apos;s Talk
            </PrimaryButtom>
          </div>
        </div>
      </div>
    </header>
  );
}
