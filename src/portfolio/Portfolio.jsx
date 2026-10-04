import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, ArrowRight, Plus, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog.jsx';
import Opening from './Opening.jsx';
// TODO: confirm the public contact address before launch (also referenced in index.html JSON-LD).
const EMAIL = 'hello@shaikhbassam.com';
// Cards laid out down the tall context section; they scroll past the pinned heading in three waves:
// two, then one centred, then two. Each class sets the card's offset within the section.
const showcase = [
    { src: '/images/plumbing.png', alt: 'Goodflow plumbing website concept', className: 'shot-1' },
    { src: '/images/roofing.png', alt: 'Ridgeline roofing website concept', className: 'shot-2' },
    { src: '/images/showcase-zaap.png', alt: 'Zaap creator page editor', className: 'shot-3' },
    { src: '/images/showcase-genpage.png', alt: 'Genpage campaign builder', className: 'shot-4' },
    { src: '/images/showcase-hvac.png', alt: 'HVAC website concept', className: 'shot-5' },
];
// Heading words carry an index so CSS can light them up one by one from the scroll progress var.
function words(text, offset, trailingBreak) {
    let i = offset;
    const lines = text.split('|');
    return lines.map((line, l) => <span key={l} className="line">{line.split(' ').map(w => <span key={i} className="w" style={{ '--i': i++ }}>{w}</span>).reduce((acc, w, k) => (k ? [...acc, ' ', w] : [w]), [])}{(trailingBreak || l < lines.length - 1) && <br />}</span>);
}
function Shot({ src, alt, className }) {
    const [ok, setOk] = useState(true);
    return <figure className={'intro-card ' + className}>{ok ? <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)}/> : <span className="avatar-slot">ADD /public{src}</span>}</figure>;
}
const projects = [{ id: '01', name: 'ZAAP', label: 'CREATOR PLATFORM', stack: 'LARAVEL / REACT', year: 'PRODUCT DEVELOPMENT', description: 'Building the tools behind a creator business.', detail: 'Full stack development across the page editor, digital products, checkout, email workflows and automations. My work connects React interfaces with Laravel APIs and the background jobs that keep them running.', role: 'Full stack development · Team contribution', url: 'https://zaap.ai', className: 'zaap' }, { id: '02', name: 'GENPAGE', label: 'CAMPAIGN PAGES', stack: 'REACT / LARAVEL', year: 'PRODUCT DEVELOPMENT', description: 'From a campaign idea to a page that works.', detail: 'Development work on a campaign page product, bringing page-building interfaces and application logic together. The focus is on making the experience straightforward for the people creating and managing pages.', role: 'Full stack development · Team contribution', url: null, className: 'genpage' }, { id: '03', name: 'TRADE FOLIO', label: 'INTERACTIVE WEBSITES', stack: 'REACT / CSS MOTION', year: 'CONCEPT SERIES / 2026', description: 'Three trades. Three different personalities.', detail: 'A collection of responsive website concepts for plumbing, roofing and HVAC. Each explores a distinct layout and interaction: issue selection, architectural storytelling and a thermostat you can adjust.', role: 'Website concept development', url: 'https://bassam-trade-concepts.shaikhbassam.chatgpt.site', className: 'trade' }];
export default function Portfolio() {
    const [introPhase, setIntroPhase] = useState('playing');
    const revealIntro = useCallback(() => setIntroPhase('revealing'), []);
    const completeIntro = useCallback(() => setIntroPhase('complete'), []);
    const [project, setProject] = useState(null);
    const [about, setAbout] = useState(false);
    const [active, setActive] = useState(0);
    const [avatar, setAvatar] = useState(true);
    const [emailCopied, setEmailCopied] = useState(false);
    const fill = useRef(null);
    const ctx = useRef(null);
    async function copyEmail() { try {
        await navigator.clipboard.writeText(EMAIL);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2200);
    }
    catch {
        window.location.href = 'mailto:' + EMAIL;
    } }
    const [copied, setCopied] = useState(false);
    const [brief, setBrief] = useState('Hi Bassam,\n\nI would like to discuss a project.\n\nProject: \nWhat I need: \nTimeline: \n');
    const [copyError, setCopyError] = useState(false);
    useEffect(() => { const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
    } }), { threshold: .1 }); document.querySelectorAll('.reveal').forEach(el => obs.observe(el)); return () => obs.disconnect(); }, []);
    // Scroll-driven bits: the blue disc grows until it covers the hero + context wrapper (hsmkrt1996-style),
    // and the pinned context section exposes its progress (--p) and stage (0-2) for the word highlight and cards.
    useEffect(() => {
        const disc = fill.current, pin = ctx.current;
        const wrap = disc.parentElement;
        let max = 1, raf = 0;
        const measure = () => { const r = disc.offsetWidth / 2, cx = disc.offsetLeft + r, cy = disc.offsetTop + r; max = Math.hypot(Math.max(cx, wrap.offsetWidth - cx), Math.max(cy, wrap.offsetHeight - cy)) / r + .05; };
        const update = () => {
            raf = 0;
            const t = Math.min(1, Math.max(0, window.scrollY / (window.innerHeight * .6)));
            disc.style.setProperty('--fill', String(1 + (max - 1) * t * t * (3 - 2 * t)));
            const travel = pin.offsetHeight - window.innerHeight;
            const p = Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / travel));
            pin.style.setProperty('--p', p.toFixed(4));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        const ro = new ResizeObserver(() => { measure(); update(); });
        measure(); update(); ro.observe(wrap); window.addEventListener('scroll', onScroll, { passive: true });
        return () => { ro.disconnect(); window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, []);
    async function copy() { try {
        await navigator.clipboard.writeText(brief);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 2200);
    }
    catch {
        setCopyError(true);
    } }
    return <>
 {introPhase !== 'complete' && <Opening onReveal={revealIntro} onComplete={completeIntro}/>}
 <main className={'portfolio-page intro-' + introPhase} inert={introPhase === 'playing'}>
 <header className="navigation"><a href="#home" className="mini-name">BASSAM<span>®</span></a><span className="nav-center">FULL STACK DEVELOPER<br />LARAVEL & REACT</span><nav><a href="#work">WORK (03)</a><button onClick={() => setAbout(true)}>ABOUT <Plus size={15}/></button><a href="#contact">LET’S TALK <ArrowUpRight size={16}/></a></nav></header>
 <div className="hero-and-about">
 <div className="hero-disc hero-disc-yellow" aria-hidden="true"/><div className="hero-fill" ref={fill} aria-hidden="true"><div className="hero-disc hero-disc-blue"/></div>
 <section id="home" className="hero">
 <div className="hero-grid">
 <div className="hero-lead"><span className="hero-status"><i aria-hidden="true"/>AVAILABLE FOR WORK</span><p className="hero-eyebrow">• 4+ YEARS EXPERIENCE — LARAVEL &amp; REACT</p><h1>Full stack developer based in Karachi</h1></div>
 <div className="hero-figure"><div>{avatar ? <img src="/images/avatar.png" alt="Illustrated portrait of Shaikh Bassam, full stack developer in Karachi" onError={() => setAvatar(false)}/> : <span className="avatar-slot">ADD /public/images/avatar.png<br />(TRANSPARENT PNG)</span>}</div></div>
 <div className="hero-aside"><p>Hi, I’m Shaikh Bassam. I build web products end to end — React interfaces and the Laravel systems behind them.</p><div className="hero-actions"><a href="#work" className="btn-primary"><span><ArrowRight size={18}/></span>See my work</a><a href="#contact" className="btn-outline">Contact</a></div><button type="button" className="hero-email" onClick={copyEmail} aria-label={'Copy email address ' + EMAIL}>{EMAIL}{emailCopied ? <Check size={14}/> : <Copy size={14}/>}<small>{emailCopied ? 'COPIED' : 'CLICK TO COPY'}</small></button></div>
 </div>
 <div className="hero-name" aria-hidden="true"><div>{'BASSAM'.split('').map((letter, i) => <span key={i}>{letter}</span>)}</div></div>
 </section>
 <section className="intro" ref={ctx}>
 <div className="intro-cards" aria-hidden="true">{showcase.map(shot => <Shot key={shot.src} {...shot}/>)}</div>
 <div className="intro-pin">
 <p className="section-label">01 / A LITTLE CONTEXT</p>
 <div><h2 style={{ '--n': 8 }}>{words('GOOD ON THE|SURFACE.', 0, true)}<span className="hood">{words('STRONG UNDER|THE HOOD.', 4, false)}</span></h2><div className="intro-copy"><p>I’m Bassam, a full stack developer based in Karachi. I build web experiences with React and the Laravel systems behind them.</p><p>From a page editor to a checkout flow, I care about the details people see—and the logic they depend on.</p></div></div>
 </div>
 </section>
 </div>
 <section id="work" className="work"><div className="work-heading reveal"><p className="section-label">02 / SELECTED WORK</p><h2>LESS TALK.<br /><span>MORE BUILD.</span></h2><span className="work-count">( 01 — 03 )</span></div>
 <div className="featured reveal"><div className={'project-stage ' + projects[active].className}><button className="project-art" onClick={() => setProject(active)} aria-label={'Read about ' + projects[active].name}>{active === 0 ? <><div className="zaap-ui"><div className="ui-top"><span>zaap.</span><span>YOUR SPACE ON THE INTERNET ↗</span></div><div className="creator-page"><div className="creator-avatar">a.</div><h3>Alex creates.</h3><p>Ideas, resources, and things worth sharing.</p><div className="creator-links"><span>The creative toolkit <ArrowUpRight size={16}/></span><span>Notes from the studio <ArrowUpRight size={16}/></span><span>Let’s work together <ArrowUpRight size={16}/></span></div></div><span className="art-note">ILLUSTRATIVE INTERFACE / NOT A PRODUCT SCREENSHOT</span></div></> : active === 1 ? <div className="campaign-ui"><div>GENPAGE / CAMPAIGN BUILDER <span>01</span></div><h3>ONE IDEA.<br />MANY<br /><em>POSSIBILITIES.</em></h3><p>A PLACE FOR YOUR NEXT CAMPAIGN.</p><span className="art-note">ILLUSTRATIVE INTERFACE</span></div> : <div className="trade-art"><img src="/images/plumbing.png" alt="Goodflow plumbing website design concept"/><img src="/images/roofing.png" alt="Ridgeline roofing website design concept"/></div>}<span className="view-project">VIEW<br />PROJECT <ArrowUpRight size={23}/></span></button></div><div className="featured-info"><p className="section-label">SELECTED PROJECT / {projects[active].id}</p><h3>{projects[active].name}</h3><p>{projects[active].description}</p><span>{projects[active].stack}</span><div className="project-switcher"><button aria-label="Previous project" onClick={() => setActive(a => (a + 2) % 3)}>←</button><span>0{active + 1} / 03</span><button aria-label="Next project" onClick={() => setActive(a => (a + 1) % 3)}>→</button></div></div></div>
 <div className="project-index">{projects.map((p, i) => <button className="project-row" key={p.id} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setProject(i)}><span className="row-id">{p.id}</span><span className="row-name">{p.name}</span><span className="row-description">{p.label}<br />{p.stack}</span><ArrowUpRight className="row-arrow"/></button>)}</div></section>
 <section className="stack reveal"><p className="section-label">03 / HOW I BUILD</p><div className="stack-intro"><h2>FRONT TO BACK.<br /><span>DETAIL TO DETAIL.</span></h2><p>Interfaces, APIs, integrations and the space between them. One connected approach to building for the web.</p></div><div className="stack-lines">{[['01', 'REACT', 'Interfaces & interaction', 'React · Redux · Responsive UI'], ['02', 'LARAVEL', 'The logic underneath', 'PHP · REST APIs · MySQL'], ['03', 'CONNECTED', 'From flow to function', 'Payments · Queues · Automations']].map(([n, name, title, list]) => <div key={n}><span>{n}</span><h3>{name}</h3><p>{title}<small>{list}</small></p></div>)}</div></section>
 <section id="contact" className="contact reveal"><div className="contact-top"><p className="section-label">04 / YOUR NEXT THING</p><span>KARACHI, PAKISTAN<br />WORKING WITH THE WEB.</span></div><h2>LET’S MAKE<br /><span>IT HAPPEN.</span><ArrowUpRight /></h2><div className="contact-bottom"><div><h3>A website. A product.<br />A problem worth solving.</h3><p>Put the essentials into a short project brief.</p><p className="contact-pending">Direct contact details will be added before public launch.</p></div><div className="brief"><label htmlFor="brief">YOUR PROJECT BRIEF</label><textarea id="brief" value={brief} onChange={e => setBrief(e.target.value)} rows={6}/><button onClick={copy}>{copied ? 'BRIEF COPIED' : 'COPY PROJECT BRIEF'}{copied ? <Check size={18}/> : <Copy size={18}/>}</button>{copyError && <p role="status">Select the brief and copy it manually.</p>}</div></div></section>
 <footer><a href="#home">BASSAM®</a><span>FULL STACK DEVELOPER / 2026</span><a href="#home">BACK TO TOP ↑</a></footer>
 <Dialog open={about} onOpenChange={setAbout}><DialogContent className="detail-dialog about-dialog"><DialogTitle>THE PERSON<br />BEHIND THE CODE.</DialogTitle><DialogDescription>BSM / ABOUT ME</DialogDescription><p>I’m Bassam. A full stack developer working with Laravel and React, based in Karachi, Pakistan.</p><p>I work across interfaces and backend systems: page builders, digital products, payments, email workflows and automations. I like turning complicated requirements into things that feel simple to use.</p><div className="dialog-facts"><span>BASED IN<br /><b>KARACHI</b></span><span>CORE STACK<br /><b>LARAVEL + REACT</b></span></div><a className="dialog-link" href="#contact" onClick={() => setAbout(false)}>LET’S BUILD SOMETHING <ArrowUpRight /></a></DialogContent></Dialog>
 <Dialog open={project !== null} onOpenChange={open => { if (!open)
        setProject(null); }}><DialogContent className="detail-dialog">{project !== null && <><DialogTitle>{projects[project].name}</DialogTitle><DialogDescription>{projects[project].label} / {projects[project].year}</DialogDescription><h3>{projects[project].description}</h3><p>{projects[project].detail}</p><div className="dialog-facts"><span>ROLE<br /><b>{projects[project].role}</b></span><span>STACK<br /><b>{projects[project].stack}</b></span></div>{projects[project].url ? <a className="dialog-link" href={projects[project].url} target="_blank" rel="noreferrer">{project === 2 ? 'OPEN CONCEPT PREVIEW' : 'VISIT WEBSITE'}<ArrowUpRight /></a> : <p className="project-note">Further project details available on request.</p>}{project === 2 && <p className="project-note">Concept preview currently requires owner access.</p>}</>}</DialogContent></Dialog>
 </main>
 </>;
}

import './portfolio.css';
