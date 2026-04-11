import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import BRAND from "../../config/branding";
import BorderButton from "../common/buttons/BorderButton";
import Logo from "../branding/Logo";
import Icon from "../branding/Icon";

const Footer = () => {
    return (
        <footer className="hsmkrt-shell relative mt-auto overflow-hidden border-t border-black/10 bg-[#f0efeb] text-[#101114]">
            <div className="hsmkrt-grid-overlay" />
            <span className="hsmkrt-orb hsmkrt-orb--blue -z-10 opacity-60" />
            <span className="hsmkrt-orb hsmkrt-orb--yellow -z-10 opacity-70" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />
            <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-10 px-4 py-12 md:px-10 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.9fr_0.9fr]">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Icon />
                            <div>
                                <Logo className="text-sm uppercase tracking-[0.32em] text-[#101114]" />
                                <p className="mt-1 text-xs uppercase tracking-[0.28em] text-[#101114]/55">{BRAND.expertise}</p>
                            </div>
                        </div>
                        <p className="max-w-md text-sm leading-7 text-[#101114]/70">
                            BassamWorks is my personal profile space. It shows who I am, what I work on, and why clients or recruiters should care about the stack and experience behind the work.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#101114]/50">Navigate</p>
                        <div className="flex flex-wrap gap-3 text-sm text-[#101114]/80">
                            <Link className="rounded-full border border-black/15 bg-white/60 px-4 py-2 transition-colors hover:border-black/35 hover:text-black" to="/">
                                Home
                            </Link>
                            <Link className="rounded-full border border-black/15 bg-white/60 px-4 py-2 transition-colors hover:border-black/35 hover:text-black" to="/about">
                                About
                            </Link>
                            <Link className="rounded-full border border-black/15 bg-white/60 px-4 py-2 transition-colors hover:border-black/35 hover:text-black" to="/skills">
                                Skills
                            </Link>
                            <Link className="rounded-full border border-black/15 bg-white/60 px-4 py-2 transition-colors hover:border-black/35 hover:text-black" to="/contact">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#101114]/50">Contact</p>
                        <div className="flex flex-wrap gap-3">
                            <BorderButton as="a" href="mailto:hello@bassamworks.dev" variant="default" className="border-black/15 bg-white/60 text-[#101114] hover:border-black/35 hover:bg-white/90">
                                <Mail className="size-4" />
                                Email
                            </BorderButton>
                            <BorderButton as="a" href="https://github.com" variant="default" className="border-black/15 bg-white/60 text-[#101114] hover:border-black/35 hover:bg-white/90">
                                <Github className="size-4" />
                                GitHub
                            </BorderButton>
                        </div>
                        <BorderButton as="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full justify-between border-black/15 bg-white/60 text-[#101114] hover:border-black/35 hover:bg-white/90">
                            <span>Back to top</span>
                            <ArrowUpRight className="size-4" />
                        </BorderButton>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-black/15 pt-6 text-xs uppercase tracking-[0.28em] text-[#101114]/50 md:flex-row md:items-center md:justify-between">
                    <span>Built with React, Tailwind, and a strong frontend-first approach.</span>
                    <span>{new Date().getFullYear()} {BRAND.name}</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;