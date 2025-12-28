import { Building, GraduationCap } from "lucide-react";

export default function Journey() {
    const experiences = [
        {
            title: 'Senior Full Stack Developer',
            company: 'TechStart Inc.',
            location: 'San Francisco, CA',
            period: '2021 — Present',
            color: 'primary',
            achievements: [
                'Spearheaded the migration of a legacy monolithic architecture to a microservices-based system using Node.js and Docker, improving scalability by 200%.',
                'Improved application performance by 40% through code splitting, lazy loading, and database indexing strategies.',
                'Mentored junior developers and introduced TDD practices to the engineering team.'
            ]
        },
        {
            title: 'Frontend Developer',
            company: 'Creative Agency',
            location: 'Remote',
            period: '2019 — 2021',
            color: 'purple',
            achievements: [
                'Developed interactive and responsive websites for clients ranging from startups to Fortune 500 companies.',
                'Collaborated closely with designers to implement pixel-perfect UI components using React and Tailwind CSS.'
            ]
        }
    ];
    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-[#258cf4]" />
                My Journey
            </h2>

            <div className="relative space-y-12 pl-8 before:absolute before:left-[11px] before:top-2 before:h-[95%] before:w-[2px] before:bg-gradient-to-b before:from-[#258cf4] before:via-purple-500 before:to-transparent">
                {experiences.map((exp, idx) => {
                    const colorMap = {
                        primary: {
                            dot: 'bg-[#258cf4] shadow-[0_0_10px_rgba(37,140,244,0.4)]',
                            hover: 'group-hover:text-[#258cf4]',
                            period: 'text-[#258cf4] bg-[#258cf4]/10 border-[#258cf4]/20',
                            border: 'hover:border-[#258cf4]/20',
                            marker: 'marker:text-[#258cf4]'
                        },
                        purple: {
                            dot: 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]',
                            hover: 'group-hover:text-purple-400',
                            period: 'text-gray-400 bg-white/5 border-white/5 group-hover:border-purple-500/30 group-hover:text-purple-300',
                            border: 'hover:border-purple-500/20',
                            marker: 'marker:text-purple-500'
                        }
                    };

                    const colors = colorMap[exp.color];

                    return (
                        <div key={idx} className="relative group">
                            <div className={`absolute -left-[29px] top-1.5 h-6 w-6 rounded-full border-4 border-[#101922] ${colors.dot} group-hover:scale-125 transition-transform duration-300 z-10`}></div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className={`text-xl font-bold text-white ${colors.hover} transition-colors`}>
                                    {exp.title}
                                </h3>
                                <span className={`text-sm font-mono ${colors.period} px-2 py-1 rounded mt-1 sm:mt-0 w-fit border transition-colors`}>
                                    {exp.period}
                                </span>
                            </div>

                            <div className="text-gray-400 font-medium mb-4 flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                {exp.company} • {exp.location}
                            </div>

                            <div className={`p-5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.07] ${colors.border} transition-all duration-300`}>
                                <ul className={`list-disc list-outside ml-4 space-y-2 text-gray-400 text-sm leading-relaxed ${colors.marker}`}>
                                    {exp.achievements.map((achievement, achIdx) => (
                                        <li key={achIdx}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
