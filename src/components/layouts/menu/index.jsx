
import React from 'react';
import useMenu from '../../../hooks/useMenu';
import styles from './menu.module.css';
import BRAND from '../../../config/branding';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
    const { isOpen, isDisabled, toggleMenu } = useMenu();
    const navigate = useNavigate();
    const menuItems = [
        {
            title: 'Who I AM',
            desc: 'Who I am, what I do, and how I think about building products',
            img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=360&h=360&fit=crop',
            href: '/about'
        },
        {
            title: 'M-TRUST',
            desc: 'M-TRUST IS A COMPANY WITH HIGH-SKILLED PROFESSIONALS WHO SOLVE SOCIAL ISSUES FROM THE REAL ESTATE BUSINESS',
            img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=360&h=360&fit=crop'
        },
        {
            title: 'KETAKUMA',
            desc: 'JAPANESE CHARACTER KETAKUMA, A BEAR WHO LIVES FOR MOVING AGGRESSIVELY, AND HIS FRIEND KETAWAN.',
            img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=360&h=360&fit=crop'
        },
        {
            title: 'RED & GREEN',
            desc: 'RED AND GREEN CO.,LTD IS THE TOTAL COORDINATOR OF THE PRODUCT PLANNING, BRANDING, AND CIRCULATION TO SALES.',
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=360&h=360&fit=crop'
        },
        {
            title: 'ASOVISION',
            desc: 'ASOVISION IS A COMPANY THAT MAKES A GAME CHANGE TO A SOCIETY WHERE EVERYONE CAN PLAY A LEADING ROLE.',
            img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=360&h=360&fit=crop'
        },
        {
            title: 'BASTA',
            desc: 'BASTA IS A PRODUCT OF BASF, AN INTERNATIONAL CHEMICAL MANUFACTURER HEADQUARTERED IN GERMANY.',
            img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=360&h=360&fit=crop'
        },
        {
            title: 'FRONTIER',
            desc: 'FRONTIER INC. IS A COMPANY THAT CREATES PLACES TO CHALLENGE, COLORS THE THOUGHTS OF ALL PEOPLE.',
            img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=360&h=360&fit=crop'
        },
        {
            title: 'YAKUDOH',
            desc: 'YAKUDO MEANS DYNAMISM IN JAPANESE. YAKUDO IS COMPANY WANT TO OFFER MORE DYNAMISM TO PEOPLE.',
            img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=360&h=360&fit=crop'
        },
        {
            title: 'ARCHIVE',
            desc: 'I\'M PUTTING TOGETHER A DYNAMIC ARCHIVE PAGE OF THE WORK I\'M SUBMITTING TO CODEPEN.',
            img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=360&h=360&fit=crop'
        }
    ];

    return (
        <div>
            <div className={`${styles.menuContainer} ${isOpen ? styles.menuContainerOpen : styles.menuContainerClosed} ${isDisabled ? styles.menuDisabled : ''}`}>
                {/* Background Overlays */}
                <div className={`${styles.bgOverlay1} ${isOpen ? styles.bgOverlay1Open : styles.bgOverlay1Closed}`}></div>
                <div className={`${styles.bgOverlay2} ${isOpen ? styles.bgOverlay2Open : styles.bgOverlay2Closed}`}>
                    {/* Menu Contents */}
                    <div className={`${styles.menuContents} ${isOpen ? styles.menuContentsOpen : styles.menuContentsClosed} ${styles.scrollbar}`}>
                        {/* Title */}
                        <div className={styles.title}>
                            <div onClick={() => {
                                navigate("/");
                            }} className={styles.animatedtext}>
                                <div
                                    className={styles.titleBlock}
                                    style={{
                                        // transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                        transitionDelay: isOpen ? '0.7s' : '0s'
                                    }}
                                >
                                    {BRAND.first} {BRAND.second}
                                </div>
                            </div>
                            <div className={styles.animatedtext}>

                                <div
                                    className={styles.titleInline}
                                    style={{
                                        // transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                        transitionDelay: isOpen ? '0.4s' : '0s'
                                    }}
                                >
                                    Menu
                                </div>
                            </div>
                        </div>

                        {/* Section Title */}
                        <div className={styles.sectionTitle}>
                            <span className={styles.sectionTitleDot}
                                style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)', transitionDelay: isOpen ? '0.5s' : '0s' }}
                            >・</span>
                            <span className={styles.sectionTitleText}
                                style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)', transitionDelay: isOpen ? '0.6s' : '0s' }}
                            >
                                FEATURED WORKS
                            </span>
                        </div>

                        {/* Menu Items */}
                        <ul className="list-none">
                            {menuItems.map((item, index) => (
                                <li key={index} className={styles.menuItemWrapper}>
                                    <div
                                        className="cursor-pointer"
                                        style={{
                                            transform: isOpen ? 'translateY(0)' : 'translateY(180px)',
                                            transitionDelay: isOpen ? `${0.1 * (index + 7)}s` : '0s'
                                        }}
                                    >
                                        <button className={styles.menuItemButton}
                                            onClick={() => {
                                                toggleMenu();
                                                navigate(item.href);
                                            }}
                                        >
                                            <span className={styles.menuItemImgWrapper}>
                                                <img src={item.img} alt={item.title} className={styles.menuItemImg} />
                                            </span>
                                            <span>
                                                <span className={styles.menuItemTextTitle}>{item.title}</span>
                                                <span className={styles.menuItemTextDesc}>{item.desc}</span>
                                            </span>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* Hamburger Button */}
                <button
                    aria-label="hamburger menu button"
                    className={`${styles.hamburgerButton} ${isDisabled ? styles.hamburgerDisabled : ''} ${isOpen ? styles.hamburgerOpen : styles.hamburgerClosed}`}
                    onClick={toggleMenu}
                >
                    {/* <span className={styles.hamburgerInner}> */}
                    <span className={styles.hamburgerLines}>
                        <span className={`${styles.line} ${isOpen ? styles.lineTopOpen : styles.lineTopClosed}`}></span>
                        <span className={`${styles.line} ${isOpen ? styles.lineBottomOpen : styles.lineBottomClosed}`}></span>
                    </span>
                    {/* </span> */}
                </button>
            </div>
        </div>
    );
};

export default Menu;
