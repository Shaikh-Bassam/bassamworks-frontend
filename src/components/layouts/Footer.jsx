import React, { Fragment } from 'react'
import Logo from '../branding/Logo'
import BRAND from '../../config/branding'
import Active from '../common/status/Active'
import BorderButton from '../common/buttons/BorderButton'
import GradientLine from '../common/GradientLine'
import Icon from '../branding/Icon'

const Footer = () => {
    const socials = [
        { name: 'Github', link: 'https://github.com/johndoe', icon: 'code' },
        { name: 'Linkedin', link: 'https://linkedin.com/in/johndoe', icon: 'work' },
        { name: 'Twitter', link: 'https://twitter.com/johndoe', icon: 'mail' },
    ]
    return (
        <footer className="relative w-full bg-white bg-primary  overflow-hidden mt-auto">
            {/* <GradientLine /> */}
            {/* Glowing Top Border Effect */}
            <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 align-top">
                    {/* Left Column: Branding & Identity */}
                    <div className="md:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center gap-3 group/brand cursor-pointer">
                            <Icon/>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold tracking-tight leading-none text-slate-900 dark:text-white">
                                    <Logo />
                                </span>
                                <span className="text-xs text-[var(--link-color)] font-medium tracking-widest uppercase mt-1">{BRAND.expertise}</span>
                            </div>
                        </div>
                        <p className="text-slate-500 dark:text-[#9cabba] text-base leading-relaxed max-w-sm">
                            Crafting pixel-perfect, scalable digital experiences with a focus on performance and modern design principles.
                        </p>
                        <div className="mt-auto pt-2">
                            <p className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                                © {new Date().getFullYear()} {BRAND.name}. <br className="hidden lg:block" />All Rights Reserved.
                            </p>
                        </div>
                    </div>
                    {/* Center Column: Minimal Nav & Ethos */}
                    <div className="md:col-span-4 flex flex-col md:items-center pt-2">
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Explore</h3>
                                <nav className="flex flex-col gap-3">
                                    <a className="text-slate-600 dark:text-[#9cabba] hover:text-[var(--link-color)] dark:hover:text-[var(--link-color)] transition-all duration-200 font-medium hover:translate-x-1 flex items-center gap-2 group" href="#">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 group-hover:bg-[var(--link-color)] transition-colors"></span>
                                        Home
                                    </a>
                                    <a className="text-slate-600 dark:text-[#9cabba] hover:text-[var(--link-color)] dark:hover:text-[var(--link-color)] transition-all duration-200 font-medium hover:translate-x-1 flex items-center gap-2 group" href="#">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 group-hover:bg-[var(--link-color)] transition-colors"></span>
                                        Projects
                                    </a>
                                    <a className="text-slate-600 dark:text-[#9cabba] hover:text-[var(--link-color)] dark:hover:text-[var(--link-color)] transition-all duration-200 font-medium hover:translate-x-1 flex items-center gap-2 group" href="#">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 group-hover:bg-[var(--link-color)] transition-colors"></span>
                                        Experience
                                    </a>
                                    <a className="text-slate-600 dark:text-[#9cabba] hover:text-[var(--link-color)] dark:hover:text-[var(--link-color)] transition-all duration-200 font-medium hover:translate-x-1 flex items-center gap-2 group" href="#">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-700 group-hover:bg-[var(--link-color)] transition-colors"></span>
                                        Resume
                                    </a>
                                </nav>
                            </div>
                            <BorderButton direction='column' justify='start' align='start' className="block p-4 max-w-xs">
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Status</p>
                                <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    <Active />
                                    Open to new opportunities
                                </div>
                            </BorderButton>
                        </div>
                    </div>
                    {/* Right Column: Socials & Back to Top */}
                    <div className="md:col-span-4 flex flex-col md:items-end gap-8 pt-2">
                        <div className="flex flex-col md:items-end gap-4 w-full">
                            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">Connect</h3>
                            <div className="flex flex-wrap gap-3">
                                {
                                    socials.map((social, index) => (
                                        <Fragment key={index}>
                                            <BorderButton
                                                aria-label={social.name}
                                                size="lg"
                                                href="#">
                                                <span className="material-symbols-outlined text-2xl transition-transform group-hover:scale-110">{social.icon}</span>
                                            </BorderButton>
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mt-auto w-full flex justify-start md:justify-end pt-8 md:pt-0">
                            <BorderButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                                size='xl'
                                className="group transition-all duration-300 border border-slate-200 dark:border-white/10 hover:border-primary dark:hover:border-primary hover:shadow-lg hover:shadow-primary/25">
                                <span className="truncate">Back to Top</span>
                                <span className="material-symbols-outlined text-xl group-hover:-translate-y-1 transition-transform">arrow_upward</span>
                            </BorderButton>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <span className="text-xs text-slate-400 dark:text-slate-600 font-medium">Built with React, Tailwind &amp; Passion.</span>

                </div>
            </div>
        </footer>
    )
}

export default Footer