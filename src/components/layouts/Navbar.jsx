import PrimaryButtom from "../common/buttons/PrimaryButtom";
import Logo from "../branding/Logo";
import Icon from "../branding/Icon";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/5">
      <div className="px-4 md:px-10 py-4 max-w-[1440px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer group">
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
