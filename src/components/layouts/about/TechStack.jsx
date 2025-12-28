import { Terminal } from "lucide-react";

const techStacks = [
    {
        title: 'Frontend',
        color: 'primary',
        tags: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Framer Motion']
    },
    {
        title: 'Backend',
        color: 'purple',
        tags: ['Node.js', 'PostgreSQL', 'Laravel', 'Redis']
    },
    {
        title: 'DevOps & Tools',
        color: 'green',
        tags: ['Docker', 'AWS', 'Git', 'Figma']
    }
];
export default function TechStack() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-[#258cf4]" />
                    Technical Arsenal
                </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {techStacks.map((stack, idx) => {
                    const colorMap = {
                        primary: {
                            bg: 'bg-[#258cf4]/10',
                            text: 'text-[#258cf4]',
                            hover: 'group-hover:bg-[#258cf4]',
                            border: 'hover:border-[#258cf4]/50',
                            shadow: 'hover:shadow-[0_0_20px_rgba(37,140,244,0.15)]',
                            tagBorder: 'group-hover:border-[#258cf4]/30',
                            hoverText: 'group-hover:text-[#258cf4]'
                        },
                        purple: {
                            bg: 'bg-purple-500/10',
                            text: 'text-purple-500',
                            hover: 'group-hover:bg-purple-500',
                            border: 'hover:border-purple-500/50',
                            shadow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
                            tagBorder: 'group-hover:border-purple-500/30',
                            hoverText: 'group-hover:text-purple-400'
                        },
                        green: {
                            bg: 'bg-green-500/10',
                            text: 'text-green-500',
                            hover: 'group-hover:bg-green-500',
                            border: 'hover:border-green-500/50',
                            shadow: 'hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]',
                            tagBorder: 'group-hover:border-green-500/30',
                            hoverText: 'group-hover:text-green-400'
                        }
                    };

                    const colors = colorMap[stack.color];

                    return (
                        <div
                            key={idx}
                            className={`p-6 rounded-xl bg-[#0b1015] border border-white/5 ${colors.border} ${colors.shadow} transition-all group duration-300`}
                        >
                            <div className={`h-12 w-12 rounded-lg ${colors.bg} flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 ${colors.hover} group-hover:text-white transition-all duration-300`}>
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {idx === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                                    {idx === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />}
                                    {idx === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />}
                                </svg>
                            </div>
                            <h3 className={`text-lg font-bold text-white mb-3 ${colors.hoverText} transition-colors`}>
                                {stack.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {stack.tags.map((tag, tagIdx) => (
                                    <span
                                        key={tagIdx}
                                        className={`px-2.5 py-1 rounded text-xs font-medium bg-white/5 text-gray-300 border border-white/10 ${colors.tagBorder} transition-colors`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
