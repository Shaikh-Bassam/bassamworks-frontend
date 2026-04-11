import React from "react";
import { ArrowRight, Code2, Layers3, Sparkles } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import SeoManager from "../components/seo/SeoManager";

export default function About() {
    useScrollReveal("[data-about-reveal]");
    useScrollReveal("[data-about-stagger]", { stagger: 0.12, fromY: 28 });

    const principles = [
        {
            title: "Who I am",
            text: "I am a full-stack engineer with a frontend-first mindset. I care about product quality, speed, and maintainable code.",
            icon: Sparkles,
        },
        {
            title: "How I work",
            text: "I turn business requirements into clear UI flows, reusable components, and predictable development timelines.",
            icon: Layers3,
        },
        {
            title: "Experience focus",
            text: "My main stack is React, Laravel, Tailwind, and GSAP, with emphasis on responsive UX and production readiness.",
            icon: Code2,
        },
    ];

    return (
        <>
            <SeoManager
                title="About"
                description="About Bassam: full-stack engineer focused on scalable React interfaces, Laravel APIs, and delivery-focused collaboration."
                path="/about"
                keywords={["About Developer", "Frontend Architecture", "Laravel Integration"]}
            />

        <main className="hsmkrt-shell relative overflow-hidden pt-24 text-black dark:text-white">
            <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--blue" />
            <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--yellow hsmkrt-orb--about" />

            <section className="mx-auto w-full max-w-[1480px] px-4 pb-20 md:px-10 lg:pb-28">
                <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="space-y-6" data-about-reveal>
                        <p className="text-xs font-semibold uppercase tracking-[0.38em] text-black/45">About</p>
                        <h1 className="hsmkrt-title text-[clamp(4rem,11vw,8.5rem)] leading-[0.9] tracking-[-0.05em] text-black">
                            <span className="block">About</span>
                            <span className="block text-[#58a7ff]">Bassam</span>
                            <span className="block text-[#ffd74f]">Engineer profile</span>
                        </h1>
                        <p className="max-w-xl text-base leading-8 text-black/70 md:text-lg">
                            I build user-focused web products for startups and growing teams. My work combines clean frontend architecture, practical backend integration, and visual polish that supports business goals.
                        </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2" data-about-stagger>
                        <div className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:row-span-2">
                            <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">Professional summary</p>
                            <div className="mt-4 space-y-4 text-sm leading-7 text-black/70">
                                <p>
                                    I enjoy solving product problems through clear UX, robust frontend structure, and scalable implementation decisions.
                                </p>
                                <p>
                                    I collaborate closely with designers, founders, and teams to ship features that are useful, reliable, and easy to maintain.
                                </p>
                            </div>
                            <a className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-colors hover:text-[#58a7ff]" href="#contact">
                                Let&apos;s connect
                                <ArrowRight className="size-4" />
                            </a>
                        </div>

                        {principles.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="rounded-[1.5rem] border border-black/10 bg-white/75 p-5 shadow-[0_14px_35px_rgba(0,0,0,0.06)] backdrop-blur-sm" data-about-stagger>
                                    <Icon className="size-5 text-[#58a7ff]" />
                                    <h2 className="mt-4 text-lg font-semibold tracking-tight">{item.title}</h2>
                                    <p className="mt-3 text-sm leading-7 text-black/65">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}