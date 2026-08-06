import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
    GraduationCap, 
    Trophy, 
    Palette, 
    HeartHandshake, 
    FileText, 
    UserCheck, 
    BadgeCheck, 
    Download 
} from 'lucide-react';

const scholarships = [
    {
        title: "Academic Merit Scholarship",
        description: "Awarded to students who have demonstrated exceptional academic performance and intellectual curiosity in their previous academic years.",
        icon: <GraduationCap size={36} className="text-[#0f2142]" />,
        eligibility: "90%+ aggregate in previous board/final exams.",
        color: "border-[#0f2142]"
    },
    {
        title: "Sports Excellence Award",
        description: "Recognizing outstanding athletes who have represented at the state or national level and brought laurels to the institution.",
        icon: <Trophy size={36} className="text-[#d4af37]" />,
        eligibility: "State/National level participation & medals.",
        color: "border-[#d4af37]"
    },
    {
        title: "Arts & Culture Scholarship",
        description: "Supporting remarkably talented students in the fields of music, dance, theater, and fine arts to nurture their creative genius.",
        icon: <Palette size={36} className="text-[#c11c22]" />,
        eligibility: "Recognized certifications or portfolio of work.",
        color: "border-[#c11c22]"
    },
    {
        title: "Need-Based Financial Aid",
        description: "Ensuring that financial constraints never stand in the way of a brilliant student's right to quality education and future success.",
        icon: <HeartHandshake size={36} className="text-[#0f2142]" />,
        eligibility: "Income certificate verification & interview.",
        color: "border-[#0f2142]"
    }
];

const steps = [
    {
        step: "01",
        title: "Check Eligibility",
        description: "Review the criteria for each scholarship category to ensure you qualify before applying.",
        icon: <FileText size={20} className="text-[#c11c22]" />
    },
    {
        step: "02",
        title: "Submit Application",
        description: "Fill out the online application form and attach all required supporting documents and certificates.",
        icon: <Download size={20} className="text-[#d4af37]" />
    },
    {
        step: "03",
        title: "Interview / Trial",
        description: "Shortlisted candidates will be invited for a personal interview or a sports/arts trial.",
        icon: <UserCheck size={20} className="text-[#0f2142]" />
    },
    {
        step: "04",
        title: "Award Notification",
        description: "Final recipients will be announced and the scholarship will be applied to the academic fee.",
        icon: <BadgeCheck size={20} className="text-[#c11c22]" />
    }
];

export default function ScholarshipPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fafafa] font-sans text-gray-800 antialiased min-h-screen flex flex-col overflow-x-hidden">
            <Navbar theme="transparent" />

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 bg-gradient-to-b from-[#0f2142] via-[#152e5c] to-[#0f2142] border-b-[6px] border-[#c11c22] overflow-hidden text-center flex flex-col items-center">
                {/* Background Patterns */}
                <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#d4af37] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -translate-y-1/2 -translate-x-1/4"></div>
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c11c22] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 translate-y-1/3 translate-x-1/4"></div>

                <div className="container mx-auto px-4 relative z-10 mt-6">
                    <span className="text-[#d4af37] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block drop-shadow-md">Empowering Excellence</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 font-serif tracking-tight drop-shadow-lg">
                        Scholarships & <span className="text-[#c11c22]">Aid</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                        We believe that true talent should never be held back by financial constraints. Explore our comprehensive scholarship programs designed to reward merit and support dreams.
                    </p>
                </div>
            </section>

            <main className="flex-grow">
                {/* Scholarship Categories */}
                <section className="container mx-auto px-4 py-24 max-w-7xl relative z-20 -mt-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {scholarships.map((scholarship, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-white rounded-2xl p-8 md:p-10 shadow-xl border-t-[6px] ${scholarship.color} hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group`}
                            >
                                <div className="flex flex-col sm:flex-row gap-6 items-start">
                                    <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0 shadow-inner border border-gray-100 group-hover:scale-105 transition-transform duration-300">
                                        {scholarship.icon}
                                    </div>
                                    <div className="flex flex-col h-full">
                                        <h3 className="text-2xl font-bold text-[#0f2142] mb-3 font-serif">{scholarship.title}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                                            {scholarship.description}
                                        </p>
                                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mt-auto">
                                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Eligibility Criteria</span>
                                            <span className="text-sm font-semibold text-[#c11c22]">{scholarship.eligibility}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Application Process */}
                <section className="bg-white border-y border-gray-200 py-24">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl md:text-5xl font-bold text-[#0f2142] font-serif mb-6">How to Apply</h2>
                            <p className="text-gray-500 max-w-2xl mx-auto text-lg">A simple and transparent process to ensure every deserving student gets a fair opportunity.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                            {/* Connecting Line for Desktop */}
                            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[2px] bg-gray-100 -translate-y-[45px] z-0"></div>

                            {steps.map((item, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center text-center bg-white p-6 rounded-2xl hover:bg-gray-50 transition-colors group">
                                    <div className="w-16 h-16 rounded-full bg-white border-[4px] border-[#0f2142] flex items-center justify-center mb-6 shadow-md relative group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-xl font-black text-[#0f2142]">{item.step}</span>
                                        {/* Icon Badge */}
                                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-sm border border-gray-100">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 container mx-auto px-4 max-w-5xl text-center">
                    <div className="bg-gradient-to-r from-[#0f2142] to-[#152e5c] rounded-3xl p-10 md:p-16 border-[3px] border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#c11c22] rounded-full mix-blend-multiply filter blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
                        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#d4af37] rounded-full mix-blend-multiply filter blur-[60px] opacity-20 translate-y-1/2 -translate-x-1/4"></div>
                        
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-serif mb-6 relative z-10">Ready to Take the Next Step?</h2>
                        <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg relative z-10">
                            Download the detailed scholarship brochure and application form to begin your journey towards academic excellence with us.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <button className="bg-[#c11c22] hover:bg-[#a0171c] text-white px-8 py-4 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3">
                                <Download size={20} />
                                Download Application Form
                            </button>
                            <button className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#0f2142] px-8 py-4 font-bold rounded-xl transition-all flex items-center justify-center shadow-lg">
                                View Guidelines
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
