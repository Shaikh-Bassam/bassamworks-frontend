import React from 'react';
import HeroSection from '../components/layouts/about/HeroSection';
import StatsSection from '../components/layouts/about/StatsSection';
import TechStack from '../components/layouts/about/TechStack';
import Journey from '../components/layouts/about/Journey';
import CTASection from '../components/layouts/about/CTASection';

const About = () => {
    return (
        <main className="pt-24 pb-12">

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-[1400px] mx-auto">
                    <section className="px-8 py-12 md:px-12 lg:px-20 space-y-16">

                        {/* Hero Section */}
                        <HeroSection/>

                        {/* Stats Section */}
                        <StatsSection/>

                        {/* Technical Arsenal */}
                        <TechStack/>

                        {/* Journey Timeline */}
                        <Journey/>

                        {/* CTA Section */}
                        <CTASection/>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default About;