import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
    ShieldCheck, 
    HeartPulse, 
    Siren, 
    Users, 
    HandHeart, 
    Handshake, 
    Sparkles, 
    MonitorDot, 
    Leaf
} from 'lucide-react';

const clubsList = [
    {
        title: "Anti-Ragging Cell",
        description: "Ensuring a safe, inclusive, and welcoming environment for all students through strict zero-tolerance policies and awareness campaigns.",
        icon: <ShieldCheck size={26} className="text-[#0f2142]" />,
        bgColor: "bg-blue-50/50 group-hover:bg-blue-100",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Health & Hygiene",
        description: "Promoting physical wellness, mental health, and sanitary practices through workshops, camps, and daily campus initiatives.",
        icon: <HeartPulse size={26} className="text-[#c11c22]" />,
        bgColor: "bg-red-50/50 group-hover:bg-red-100",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Disaster Management",
        description: "Equipping students with essential life-saving skills, emergency response protocols, and mock drills for real-world readiness.",
        icon: <Siren size={26} className="text-[#d4af37]" />,
        bgColor: "bg-yellow-50/50 group-hover:bg-yellow-100",
        image: "https://images.unsplash.com/photo-1626025345711-20948cdce0c5?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Alumni Attractive",
        description: "Fostering lifelong bonds between past and present students, organizing networking events, and sharing alumni success stories.",
        icon: <Users size={26} className="text-[#0f2142]" />,
        bgColor: "bg-blue-50/50 group-hover:bg-blue-100",
        image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Social Survival",
        description: "Developing crucial interpersonal skills, community empathy, and social awareness to thrive in modern society.",
        icon: <HandHeart size={26} className="text-[#c11c22]" />,
        bgColor: "bg-red-50/50 group-hover:bg-red-100",
        image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Management & Parents",
        description: "Bridging the gap between the school administration and parents to collaboratively shape the academic ecosystem.",
        icon: <Handshake size={26} className="text-[#d4af37]" />,
        bgColor: "bg-yellow-50/50 group-hover:bg-yellow-100",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Women Empowerment",
        description: "Championing gender equality, leadership workshops, and confidence-building programs for the young women of tomorrow.",
        icon: <Sparkles size={26} className="text-[#0f2142]" />,
        bgColor: "bg-blue-50/50 group-hover:bg-blue-100",
        image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Cyber TPS",
        description: "Exploring the digital frontier with cybersecurity practices, tech innovations, and responsible digital citizenship.",
        icon: <MonitorDot size={26} className="text-[#c11c22]" />,
        bgColor: "bg-red-50/50 group-hover:bg-red-100",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80"
    },
    {
        title: "Eco Club",
        description: "Advocating for a greener campus, environmental conservation projects, and sustainable habits for future generations.",
        icon: <Leaf size={26} className="text-[#d4af37]" />,
        bgColor: "bg-yellow-50/50 group-hover:bg-yellow-100",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
    }
];

export default function CoCurricularClubs() {
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
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c11c22] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c11c22] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 translate-y-1/3 -translate-x-1/4"></div>

                <div className="container mx-auto px-4 relative z-10 mt-6">
                    <span className="text-[#c11c22] font-bold tracking-[0.2em] uppercase text-sm md:text-base mb-4 block drop-shadow-md">Beyond The Classroom</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 font-serif tracking-tight drop-shadow-lg">
                        Co-Curricular <span className="text-[#c11c22]">Clubs</span>
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                        Discover your passion, develop leadership skills, and make a lasting impact. Our diverse range of clubs and committees ensures holistic development for every student.
                    </p>
                </div>
            </section>

            <main className="flex-grow container mx-auto px-4 py-20 max-w-7xl relative -mt-16 z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {clubsList.map((club, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col sm:flex-row h-full overflow-hidden"
                        >
                            {/* Image Side */}
                            <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden flex-shrink-0">
                                <img 
                                    src={club.image} 
                                    alt={club.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-[#0f2142]/10 mix-blend-overlay"></div>
                            </div>
                            
                            {/* Content Side */}
                            <div className="w-full sm:w-3/5 p-6 md:p-8 flex flex-col flex-grow justify-center">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-colors duration-300 flex-shrink-0 ${club.bgColor}`}>
                                        {club.icon}
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-[#0f2142] font-serif leading-tight">{club.title}</h3>
                                </div>
                                
                                <p className="text-gray-600 leading-relaxed flex-grow mb-6 text-sm md:text-base">
                                    {club.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Additional Info Callout */}
                <div className="mt-24 bg-gradient-to-r from-[#0f2142] to-[#c11c22] rounded-3xl p-10 md:p-16 border-[3px] border-[#d4af37]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
                    <div className="text-white max-w-2xl text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-4">Start Your Own Initiative!</h2>
                        <p className="text-white/80 leading-relaxed text-sm md:text-base">
                            Don't see a club that fits your interests? We encourage our students to take the lead. Pitch your idea to the student council and you could be the founder of our newest campus club.
                        </p>
                    </div>
                    <div className="w-full lg:w-auto flex-shrink-0">
                        <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#0f2142] px-8 py-4 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                            Pitch an Idea
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}