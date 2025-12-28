import { AtSign } from "lucide-react";

export default function CTASection() {
    return (
        <div className="pt-8 border-t border-white/5">
            <div className="rounded-xl bg-gradient-to-r from-[#258cf4]/10 to-purple-500/10 border border-white/5 p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#258cf4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-white mb-2">Interested in working together?</h2>
                    <p className="text-gray-400 mb-6 max-w-lg mx-auto">
                        I'm always open to discussing product design work or partnership opportunities.
                    </p>
                    <button className="flex mx-auto items-center justify-center gap-2 h-10 px-6 rounded-lg bg-white text-[#101922] text-sm font-bold hover:bg-gray-200 hover:scale-105 transition-all shadow-lg">
                        <AtSign className="w-5 h-5" />
                        Get in Touch
                    </button>
                </div>
            </div>
        </div>
    );
}
