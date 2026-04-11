import { ArrowRight, MoveRight, Sparkles } from "lucide-react";
import useScrollReveal from "../hooks/useScrollReveal";
import { BRAND } from "../config/branding";
import SeoManager from "../components/seo/SeoManager";
import ProjectShowcase from "../components/sections/ProjectShowcase";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import GithubSection from "../components/sections/GithubSection";

import heroPoster from "../../hsmkrt1996/hsmkrt1996.com/images/ogp.webp";

function StatPill({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-black/10 bg-white/70 px-5 py-4 shadow-[0_12px_35px_rgba(14,18,28,0.06)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="text-[10px] uppercase tracking-[0.32em] text-black/45 dark:text-white/45">{label}</div>
      <div className="mt-2 text-lg font-semibold tracking-tight text-black dark:text-white">{value}</div>
    </div>
  );
}

export default function Home() {
  useScrollReveal("[data-hsmkrt-reveal]");
  useScrollReveal("[data-hsmkrt-stagger]", { stagger: 0.12, fromY: 30 });

  return (
    <>
      <SeoManager
        title="Full Stack Developer Portfolio"
        description="Full stack developer portfolio showcasing React and Laravel projects, testimonials, GitHub work, and production-ready delivery."
        path="/"
        keywords={["Bento Grid", "Three.js", "Portfolio", "Web Development"]}
      />

      <div className="hsmkrt-shell relative overflow-hidden pt-24 text-black dark:text-white">
        <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--blue" />
        <div aria-hidden="true" className="hsmkrt-orb hsmkrt-orb--yellow" />
        <div aria-hidden="true" className="hsmkrt-grid-overlay" />

        <section className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 px-4 pb-16 md:px-10 lg:min-h-[calc(100svh-7rem)] lg:justify-center lg:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8" data-hsmkrt-reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.34em] text-black/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:text-white/70">
                <span className="size-2 rounded-full bg-[#58a7ff] shadow-[0_0_0_4px_rgba(88,167,255,0.14)]" />
                {BRAND.expertise}
              </div>

              <div className="space-y-5">
                <p className="text-xs font-medium uppercase tracking-[0.42em] text-black/45 dark:text-white/45">Full stack profile</p>
                <h1 className="hsmkrt-title max-w-4xl text-[clamp(4.4rem,13vw,10rem)] leading-[0.88] tracking-[-0.05em] text-black dark:text-white">
                  <span className="block">Hi, I&apos;m</span>
                  <span className="block text-[#58a7ff]">Bassam</span>
                  <span className="block text-[#ffd74f]">Full-Stack Engineer</span>
                </h1>
                <p className="max-w-2xl text-base leading-8 text-black/70 md:text-lg dark:text-white/72">
                  I build modern web products with React, Laravel, Tailwind, and GSAP. This portfolio highlights production projects, API integration, accessibility standards, and frontend architecture for teams hiring serious engineering talent.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-3 rounded-full bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-black/90 dark:bg-white dark:text-black"
                  href="#work"
                >
                  View projects
                  <ArrowRight className="size-4" />
                </a>
                <a
                  className="inline-flex items-center gap-3 rounded-full border border-black/15 bg-white/70 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-black transition-transform duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
                  href="/contact"
                >
                  Contact me
                  <MoveRight className="size-4" />
                </a>
              </div>

              <div className="grid gap-3 sm:grid-cols-3" data-hsmkrt-stagger>
                <StatPill label="Experience" value={`${BRAND.experience}+ years`} />
                <StatPill label="Core stack" value="React + Laravel" />
                <StatPill label="Projects" value="12+ delivered" />
              </div>
            </div>

            <div className="relative" data-hsmkrt-reveal>
              <div className="absolute -inset-4 rounded-[2rem] bg-[radial-gradient(circle_at_20%_20%,rgba(88,167,255,0.28),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(255,215,79,0.32),transparent_30%)] blur-2xl" />

              <div className="hsmkrt-poster group relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#101114] p-3 shadow-[0_30px_90px_rgba(10,12,18,0.22)] dark:border-white/10">
                <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-between rounded-full bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.34em] text-white/70 backdrop-blur-md">
                  <span>{BRAND.name}</span>
                  <span>Available for work</span>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#d7e8ff]">
                  <img
                    alt="Portfolio preview"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    src={heroPoster}
                  />

                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.04)_0%,rgba(8,10,14,0.18)_42%,rgba(8,10,14,0.62)_100%)]" />

                  <div className="absolute left-4 top-16 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] uppercase tracking-[0.28em] text-white backdrop-blur-md">
                    <Sparkles className="size-3" />
                    Frontend specialist
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/15 bg-black/45 p-4 text-white backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-white/45">Current direction</p>
                      <p className="mt-2 text-lg font-semibold leading-tight">Shipping performance-first web products.</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/75 p-4 text-black backdrop-blur-md">
                      <p className="text-[10px] uppercase tracking-[0.32em] text-black/45">Tech stack</p>
                      <p className="mt-2 text-lg font-semibold leading-tight">React, Laravel, APIs, automation, deployment workflows.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProjectShowcase />
        <TestimonialsSection />
        <GithubSection />
      </div>
    </>
  );
}
