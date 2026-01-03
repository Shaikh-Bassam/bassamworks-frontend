const stats = [
    { value: "05+", label: "Years Exp." },
    { value: "32", label: "Projects" },
    { value: "12", label: "Awards" },
    { value: "100%", label: "Commitment" },
];

export default function StatsSection() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8 border-b border-white/5">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="p-6 rounded-xl bg-[#1e293b]/20 border border-white/5 backdrop-blur-sm group hover:bg-[#1e293b]/40 hover:border-[#258cf4]/30 transition-all duration-300"
                >
                    <div className="text-3xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                        {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider group-hover:text-[#258cf4] transition-colors">
                        {stat.label}
                    </div>
                </div>
            ))}
        </div>
    );
}
