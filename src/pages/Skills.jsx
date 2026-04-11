import React from 'react'
import { BadgeCheck, Cpu, Globe2, ShieldCheck } from 'lucide-react'
import useScrollReveal from '../hooks/useScrollReveal'
import { BRAND } from '../config/branding'
import SeoManager from '../components/seo/SeoManager'

const skillGroups = [
    {
        title: 'Frontend',
        description: 'React, reusable components, responsive layouts, and motion-aware interactions.',
        items: ['React', 'Vite', 'Tailwind', 'GSAP'],
        icon: Globe2,
    },
    {
        title: 'Backend',
        description: 'Laravel, APIs, data handling, and server-side structure for product work.',
        items: ['Laravel', 'REST APIs', 'MySQL', 'PHP'],
        icon: Cpu,
    },
    {
        title: 'Delivery',
        description: 'Production-safe implementation, clean handoff, and maintainable development patterns.',
        items: ['Git', 'Responsive UI', 'Code review', 'Performance'],
        icon: ShieldCheck,
    },
]

const strengths = [
    'Building interfaces that look sharp and stay maintainable.',
    'Translating design intent into working product UI quickly.',
    'Balancing motion, clarity, and performance in frontend delivery.',
]

const Skills = () => {
    useScrollReveal('[data-skills-reveal]')
    useScrollReveal('[data-skills-stagger]', { stagger: 0.12, fromY: 28 })

    return (
        <>
            <SeoManager
                title="Skills"
                description="Skills, stack depth, and delivery strengths across React, Laravel, APIs, performance, and frontend systems."
                path="/skills"
                keywords={["React Skills", "Laravel Skills", "Frontend Engineer Stack"]}
            />
        <main className="hsmkrt-shell relative overflow-hidden pt-24 text-black dark:text-white">
            <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--blue" />
            <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--yellow hsmkrt-orb--about" />
            <div aria-hidden="true" className="hsmkrt-grid-overlay" />

            <section className="mx-auto w-full max-w-[1480px] px-4 pb-20 md:px-10 lg:pb-28">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="space-y-6" data-skills-reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-black/45">Stack</p>
                        <h1 className="hsmkrt-title text-[clamp(4rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.05em] text-black">
                            <span className="block">What I</span>
                            <span className="block text-[#58a7ff]">Work on</span>
                            <span className="block text-[#ffd74f]">Daily</span>
                        </h1>
                        <p className="max-w-xl text-base leading-8 text-black/70 md:text-lg">
                            I am currently working as a full-stack engineer with a frontend-heavy focus. My main stack is React, Laravel, Tailwind, GSAP, and modern UI tooling. I have {BRAND.experience}+ years of experience across product-oriented work.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2" data-skills-stagger>
                        {skillGroups.map((group) => {
                            const Icon = group.icon

                            return (
                                <div key={group.title} className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm" data-skills-stagger>
                                    <Icon className="size-5 text-[#58a7ff]" />
                                    <h2 className="mt-4 text-lg font-semibold tracking-tight">{group.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-black/65">{group.description}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <span key={item} className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-black/60">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-10 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]" data-skills-reveal>
                    <div className="rounded-[1.5rem] border border-black/10 bg-[#101114] p-6 text-white shadow-[0_20px_45px_rgba(0,0,0,0.14)]">
                        <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">Experience snapshot</p>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <BadgeCheck className="size-5 text-[#ffd74f]" />
                                <div>
                                    <p className="text-sm font-semibold">Frontend-first delivery</p>
                                    <p className="text-sm text-white/60">Fast, polished UI work for product teams.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                                <BadgeCheck className="size-5 text-[#58a7ff]" />
                                <div>
                                    <p className="text-sm font-semibold">Client-ready communication</p>
                                    <p className="text-sm text-white/60">Clear updates, simple handoff, and practical thinking.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3" data-skills-stagger>
                        {strengths.map((strength, index) => (
                            <div key={strength} className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                                <div className="text-xs font-semibold uppercase tracking-[0.34em] text-black/45">0{index + 1}</div>
                                <p className="mt-3 text-sm leading-7 text-black/70">{strength}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}

export default Skills