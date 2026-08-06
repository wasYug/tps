import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { topFacilities, scienceLabs, midFacilities, sportsFacilities, bottomFacilities } from '../../data/infrastructureData';
import './infrastructure.css';


export default function InfrastructurePage() {
    useEffect(() => {
        function reveal() {
            var reveals = document.querySelectorAll(".reveal");
            for (var i = 0; i < reveals.length; i++) {
                var windowHeight = window.innerHeight;
                var elementTop = reveals[i].getBoundingClientRect().top;
                var elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add("active");
                }
            }
        }
        window.addEventListener("scroll", reveal);
        reveal(); // Initial check

        return () => window.removeEventListener("scroll", reveal);
    }, []);

    return (
        <div className="bg-background text-on-surface font-body-md overflow-x-hidden">
            {/* Header */}
            <Navbar theme='light'/>
            {/* Hero */}
            <section className="relative pt-48 pb-24 px-gutter bg-gradient-to-b from-white to-background text-center">
                <div className="max-w-4xl mx-auto reveal active">
                    <span className="inline-block px-4 py-1.5 bg-[#1e3a8a]/20 text-[#1e3a8a] rounded-full font-bold text-sm uppercase tracking-widest mb-6">Our Campus</span>
                    <h1 className="font-display-lg text-4xl md:text-6xl text-secondary mb-8 leading-tight">
                        Our World-Class <span className="text-primary">Infrastructure</span>
                    </h1>
                    <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                        At Takshashila, we believe that the learning environment is the "third teacher." Our campus is meticulously designed to provide students with state-of-the-art facilities that foster curiosity, creativity, and holistic growth.
                    </p>
                </div>
            </section>
            {/* Infrastructure List (Zig-Zag) */}
            <main className="pb-section-gap-desktop container mx-auto px-gutter space-y-16 md:space-y-32">
                
                {topFacilities.map((facility, idx) => (
                    <section key={idx} className="reveal alternate-row active">
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 content-wrapper">
                            <div className="w-full md:w-1/2 image-zoom overflow-hidden rounded-2xl shadow-xl">
                                <img alt={facility.title} className="w-full aspect-video object-cover transition-transform duration-700" src={facility.image} />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">{facility.title}</h2>
                                <p className="text-on-surface-variant leading-relaxed">{facility.description}</p>
                                <div className={`flex items-center gap-2 ${facility.iconColor} font-bold`}>
                                    <span className="material-symbols-outlined">{facility.icon}</span>
                                    <span className="">{facility.iconText}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                <section className="reveal active py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">Scientific Excellence Centers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {scienceLabs.map((lab, idx) => (
                            <div key={idx} className="space-y-6">
                                <div className="image-zoom overflow-hidden rounded-2xl shadow-xl">
                                    <img alt={lab.title} className="w-full aspect-video object-cover transition-transform duration-700" src={lab.image} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-headline-lg text-secondary">{lab.title}</h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed">{lab.description}</p>
                                    <div className={`flex items-center gap-2 ${lab.iconColor} font-bold text-sm`}>
                                        <span className="material-symbols-outlined">{lab.icon}</span>
                                        <span className="">{lab.iconText}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {midFacilities.map((facility, idx) => (
                    <section key={`mid-${idx}`} className="reveal alternate-row active">
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 content-wrapper">
                            <div className="w-full md:w-1/2 image-zoom overflow-hidden rounded-2xl shadow-xl">
                                <img alt={facility.title} className="w-full aspect-video object-cover transition-transform duration-700" src={facility.image} />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">{facility.title}</h2>
                                <p className="text-on-surface-variant leading-relaxed">{facility.description}</p>
                                <div className={`flex items-center gap-2 ${facility.iconColor} font-bold`}>
                                    <span className="material-symbols-outlined">{facility.icon}</span>
                                    <span className="">{facility.iconText}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                <section className="reveal active py-12">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">Elite Sports & Athletics</h2>
                    </div>
                    <div className="space-y-16 md:space-y-32">
                        {sportsFacilities.map((sport, idx) => (
                            <div key={idx} className="alternate-row">
                                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 content-wrapper">
                                    <div className="w-full md:w-1/2 image-zoom overflow-hidden rounded-2xl shadow-xl">
                                        <img alt={sport.title} className="w-full aspect-video object-cover transition-transform duration-700" src={sport.image} />
                                    </div>
                                    <div className="w-full md:w-1/2 space-y-6">
                                        <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">{sport.title}</h2>
                                        <p className="text-on-surface-variant leading-relaxed">{sport.description}</p>
                                        <div className={`flex items-center gap-2 ${sport.iconColor} font-bold`}>
                                            <span className="material-symbols-outlined">{sport.icon}</span>
                                            <span className="">{sport.iconText}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {bottomFacilities.map((facility, idx) => (
                    <section key={`bot-${idx}`} className="reveal alternate-row active">
                        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 content-wrapper">
                            <div className="w-full md:w-1/2 image-zoom overflow-hidden rounded-2xl shadow-xl">
                                <img alt={facility.title} className="w-full aspect-video object-cover transition-transform duration-700" src={facility.image} />
                            </div>
                            <div className="w-full md:w-1/2 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-headline-lg text-secondary">{facility.title}</h2>
                                <p className="text-on-surface-variant leading-relaxed">{facility.description}</p>
                                <div className={`flex items-center gap-2 ${facility.iconColor} font-bold`}>
                                    <span className="material-symbols-outlined">{facility.icon}</span>
                                    <span className="">{facility.iconText}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

            </main>
            {/* Footer */}
            <Footer />
        </div>
    );
}
