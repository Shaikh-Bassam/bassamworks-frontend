import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// A choreographed opening, rather than a dependency on remote page assets.
// Font readiness is bounded; skipping, reduced motion and cleanup all reveal the page.
export default function Opening({ onReveal, onComplete }) {
    const [running, setRunning] = useState(false);
    const finished = useRef(false);
    const complete = useRef(onComplete);
    useLayoutEffect(() => { complete.current = onComplete; }, [onComplete]);
    useEffect(() => {
        let cancelled = false;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const timers = [];
        const previousOverflow = document.body.style.overflow;
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        const end = () => { if (finished.current || cancelled)
            return; finished.current = true; onReveal(); complete.current(); };
        const key = (e) => { if (e.key === 'Escape')
            end(); };
        const change = () => { if (reduced.matches)
            end(); };
        window.addEventListener('keydown', key);
        reduced.addEventListener('change', change);
        if (reduced.matches) {
            end();
        }
        else {
            const wait = new Promise(resolve => { timers.push(setTimeout(resolve, 1200)); });
            Promise.race([document.fonts.load('60px "Six Caps"').catch(() => []), wait]).then(() => {
                if (cancelled || finished.current)
                    return;
                setRunning(true);
                timers.push(setTimeout(onReveal, 7240));
                timers.push(setTimeout(end, 8240));
            });
        }
        return () => { cancelled = true; timers.forEach(clearTimeout); document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', key); reduced.removeEventListener('change', change); };
    }, [onReveal]);
    const skip = () => { if (finished.current)
        return; finished.current = true; onReveal(); onComplete(); };
    return <div className={'opening-screen ' + (running ? 'opening-running' : 'opening-waiting')} role="region" aria-label="Portfolio introduction">
  <div className="opening-paper" aria-hidden="true"/>
  <div className="opening-colours" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <div key={i} className={'opening-orbit orbit-' + i} style={{ '--order': i }}><span /></div>)}</div>
  <div className="opening-odometer" aria-label="Opening portfolio" role="status"><div className="counter-clip" aria-hidden="true"><div className="counter-first"><span>0</span><span>1</span></div></div><div className="counter-clip" aria-hidden="true"><div className="counter-second">{'0123456789'.split('').map((n, i) => <span key={i}>{n}</span>)}</div><span className="counter-zero">0</span></div><div className="counter-clip" aria-hidden="true"><div className="counter-third">{'01234567890123456789'.split('').map((n, i) => <span key={i}>{n}</span>)}</div><span className="counter-zero">0</span></div><span className="counter-percent" aria-hidden="true">%</span></div>
  <div className="opening-streak streak-top" aria-hidden="true"/><div className="opening-streak streak-bottom" aria-hidden="true"/><div className="opening-ring" aria-hidden="true"/>
  <div className="opening-name" aria-label="Shaikh Bassam">{'SHAIKHBASSAM'.split('').map((letter, i) => <span key={i} style={{ '--letter': i }}>{letter}</span>)}</div>
  <div className="opening-folio">FULL STACK DEVELOPER</div>
  <button className="skip-opening" onClick={skip}>SKIP INTRO ↗</button>
 </div>;
}
