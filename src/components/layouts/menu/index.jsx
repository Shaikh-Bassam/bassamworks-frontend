
import { Link } from 'react-router-dom';
import useMenu from '../../../hooks/useMenu';
import styles from './menu.module.css';
import BRAND from '../../../config/branding';
import archivePoster from '../../../../hsmkrt1996/hsmkrt1996.com/images/hambergermenu-archive.webp';
import ogpPoster from '../../../../hsmkrt1996/hsmkrt1996.com/images/ogp.webp';

const Menu = () => {
    const { isOpen, isDisabled, toggleMenu } = useMenu();
    const menuItems = [
        {
            title: 'About Me',
            desc: 'Who I am, what I work on, and how I help clients and recruiters understand my value.',
            img: ogpPoster,
            href: '/about',
        },
        {
            title: 'My Profile',
            desc: 'A short overview of my stack, experience, and the type of frontend work I do.',
            img: archivePoster,
            href: '/',
        },
        {
            title: 'Skills',
            desc: 'Frontend systems, backend integration, and the tools I use to ship reliable work.',
            img: ogpPoster,
            href: '/skills',
        },
        {
            title: 'Contact',
            desc: 'Availability, collaboration style, and the fastest way to reach me for a new role or project.',
            img: archivePoster,
            href: '/contact',
        },
    ];

    return (
        <div className={styles.menuRoot}>
            <div
                className={`${styles.menuBackdrop} ${isOpen ? styles.menuBackdropOpen : ''}`}
                aria-hidden="true"
                onClick={toggleMenu}
            />

            <aside
                className={`${styles.menuPanel} ${isOpen ? styles.menuPanelOpen : styles.menuPanelClosed}`}
                aria-label="BassamWorks menu"
            >
                <div className={styles.menuGlow} aria-hidden="true">
                    <span className={styles.menuOrbBlue} />
                    <span className={styles.menuOrbGold} />
                </div>

                <button aria-label="close menu" className={styles.menuButton} onClick={toggleMenu}>
                    <span className={styles.menuButtonLines}>
                        <span className={`${styles.menuButtonLine} ${styles.menuButtonLineTop}`} />
                        <span className={`${styles.menuButtonLine} ${styles.menuButtonLineBottom}`} />
                    </span>
                </button>

                <div className={styles.menuScroll} data-lenis-prevent>
                    <div className={styles.menuIntro}>
                        <div className={styles.menuEyebrow}>BassamWorks</div>
                        <h2 className={styles.menuTitle}>Who I am, what I use, and how I work.</h2>
                        <p className={styles.menuSummary}>
                            {BRAND.first} {BRAND.second} is a full-stack engineer working mainly with React and Laravel, focused on clean UI, practical delivery, and a strong client-facing presentation.
                        </p>

                        <div className={styles.menuStats}>
                            <div>
                                <span>Role</span>
                                <strong>Full-stack engineer</strong>
                            </div>
                            <div>
                                <span>Stack</span>
                                <strong>React + Laravel</strong>
                            </div>
                            <div>
                                <span>Experience</span>
                                <strong>{BRAND.experience}+ years</strong>
                            </div>
                        </div>
                    </div>

                    <div className={styles.menuFeatureGrid}>
                        <Link to="/about" onClick={toggleMenu} className={styles.menuFeatureCard}>
                            <span className={styles.menuFeatureLabel}>01</span>
                            <span className={styles.menuFeatureCopy}>Personal overview, working style, and experience.</span>
                        </Link>
                        <Link to="/skills" onClick={toggleMenu} className={styles.menuFeatureCard}>
                            <span className={styles.menuFeatureLabel}>02</span>
                            <span className={styles.menuFeatureCopy}>Stack, tools, and delivery strengths.</span>
                        </Link>
                    </div>

                    <div className={styles.menuWorksHeader}>
                        <span>Selected sections</span>
                        <span>Open the page you need</span>
                    </div>

                    <ul className={styles.menuList}>
                        {menuItems.map((item, index) => (
                            <li key={item.title} className={styles.menuListItem}>
                                <Link
                                    to={item.href}
                                    onClick={toggleMenu}
                                    className={styles.menuItemButton}
                                    style={{ transitionDelay: `${0.04 * index}s` }}
                                >
                                    <span className={styles.menuItemImgWrapper}>
                                        <img src={item.img} alt={item.title} className={styles.menuItemImg} />
                                    </span>
                                    <span className={styles.menuItemBody}>
                                        <span className={styles.menuItemTextTitle}>{item.title}</span>
                                        <span className={styles.menuItemTextDesc}>{item.desc}</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <button
                aria-label="open menu"
                aria-expanded={isOpen}
                className={`${styles.hamburgerButton} ${isDisabled ? styles.hamburgerDisabled : ''} ${isOpen ? styles.hamburgerOpen : styles.hamburgerClosed}`}
                onClick={toggleMenu}
            >
                <span className={styles.hamburgerLabel}>Menu</span>
                <span className={styles.hamburgerLines}>
                    <span className={`${styles.line} ${isOpen ? styles.lineTopOpen : styles.lineTopClosed}`} />
                    <span className={`${styles.line} ${isOpen ? styles.lineBottomOpen : styles.lineBottomClosed}`} />
                </span>
            </button>
        </div>
    );
};

export default Menu;
