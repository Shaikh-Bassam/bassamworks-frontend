import React, { useState, useEffect } from 'react';
import useMenu from '../../../hooks/useMenu';
import '../../../styles/sidebar.css'

// Hamburger Menu Component
const Menu = ({ isDisabled, toggleMenu, isOpen } ) => {
    const menuItems = [
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
        <>
            {/* Hamburger Menu Container */}
            <div
                className={`fixed top-0 right-2.5 bottom-0 w-28 h-[calc(100%-20px)] my-auto z-50 transition-all duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-[120px]'
                    } ${isDisabled ? 'pointer-events-none' : ''}`}
            >
                {/* Background Overlay 1 */}
                <div
                    className={`absolute top-0 left-0 w-full h-full bg-[#dfded9] transition-all duration-700 ease-in-out origin-right ${isOpen ? 'scale-x-100 rounded-[10px]' : 'scale-x-0 rounded-none'
                        }`}
                    style={{
                        boxShadow: isOpen ? 'inset 2px 35px 16px 5px rgba(24, 23, 13, 0.2)' : 'none'
                    }}
                />

                {/* Background Overlay 2 */}
                <div
                    className={`absolute top-0 right-0 w-[510px] h-full bg-[#bcbbb4] transition-all duration-700 ease-in-out origin-right overflow-hidden ${isOpen ? 'scale-x-100 rounded-[10px]' : 'scale-x-0 rounded-none'
                        }`}
                    style={{
                        boxShadow: 'inset 35px 60px 50px 20px rgba(24, 23, 13, 0.5)'
                    }}
                />

                {/* Menu Contents */}
                <div
                    className={`absolute top-0 right-0 w-[510px] h-full py-12 px-4 overflow-y-auto transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                        }`}
                >
                    <style jsx>{`
            div::-webkit-scrollbar {
              width: 4px;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #89877c;
              border-radius: 10px;
            }
          `}</style>

                    {/* Title */}
                    <div className="relative mb-9 text-[#302c1a] text-[120px] font-bold tracking-tight z-10">
                        <div
                            className="block cursor-pointer overflow-hidden"
                            style={{
                                transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.8s cubic-bezier(0.43, 0.05, 0.17, 1)',
                                transitionDelay: isOpen ? '0.3s' : '0s'
                            }}
                        >
                            MENU
                        </div>
                        <div
                            className="inline-block cursor-pointer overflow-hidden mt-2 text-6xl"
                            style={{
                                transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                transition: 'transform 0.8s cubic-bezier(0.43, 0.05, 0.17, 1)',
                                transitionDelay: isOpen ? '0.4s' : '0s'
                            }}
                        >
                            PROJECTS
                        </div>
                    </div>

                    {/* Section Title */}
                    <div className="relative mb-9 z-10">
                        <div className="text-[#302c1a] text-xs overflow-hidden">
                            <span
                                className="inline-block text-4xl leading-[0.79]"
                                style={{
                                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                    transition: 'transform 0.8s cubic-bezier(0.43, 0.05, 0.17, 1)',
                                    transitionDelay: isOpen ? '0.5s' : '0s'
                                }}
                            >
                                ・
                            </span>
                            <span
                                className="ml-1"
                                style={{
                                    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
                                    transition: 'transform 0.8s cubic-bezier(0.43, 0.05, 0.17, 1)',
                                    transitionDelay: isOpen ? '0.6s' : '0s'
                                }}
                            >
                                FEATURED WORKS
                            </span>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div>
                        <ul className="list-none">
                            {menuItems.map((item, index) => (
                                <li key={index} className="relative overflow-hidden mb-5 last:mb-0">
                                    <div
                                        className="cursor-pointer"
                                        style={{
                                            transform: isOpen ? 'translateY(0)' : 'translateY(180px)',
                                            transition: 'transform 0.8s cubic-bezier(0.43, 0.05, 0.17, 1)',
                                            transitionDelay: isOpen ? `${0.1 * (index + 7)}s` : '0s'
                                        }}
                                    >
                                        <button className="flex items-center w-full text-left hover:opacity-80 transition-opacity">
                                            <span className="relative flex-shrink-0 w-[180px] h-[180px] mr-5 overflow-hidden rounded-[14px]">
                                                <img
                                                    src={item.img}
                                                    alt={item.title}
                                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                                />
                                            </span>
                                            <span>
                                                <span className="block -mt-3 mb-5 text-[#302c1a] text-[56px] font-bold text-center">
                                                    {item.title}
                                                </span>
                                                <span className="block text-[#302c1a] text-[10px] leading-[1.3] tracking-[0.02em] text-center">
                                                    {item.desc}
                                                </span>
                                            </span>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;
