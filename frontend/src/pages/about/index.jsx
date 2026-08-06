import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {Eye, Rocket, Scale, Trophy, Lightbulb } from 'lucide-react';


const aboutData = {
    hero: {
        title: "Nurturing Tomorrow's Leaders",
        subtitle: "A vibrant community where excellence meets enthusiasm in every performance and competition."
    },
    welcome: {
        paragraphs: [
            "Takshashila Public School stands as a beacon of academic excellence and character building. Founded on the principles of holistic development, we bridge the gap between traditional values and modern technological advancements.",
            "Our institution is dedicated to creating a nurturing environment where every child is encouraged to explore their unique talents. With a rich history of pedagogical success, we continue to set benchmarks in the educational landscape."
        ],
        heritage: {
            title: "Our Heritage",
            quote: "\"Established in 1995, TPS has evolved from a local school to a center of global learning, maintaining its commitment to rigorous academic standards and personal integrity.\""
        }
    },
    visionMission: {
        vision: "To be a world-class institution that transforms young minds into global citizens who are intellectually competent, morally upright, and socially committed.",
        mission: "We strive to provide a balanced education that promotes critical thinking, fosters creativity, and encourages physical well-being through integrated learning pathways."
    },
    coreValues: [
        {
            title: "Integrity",
            description: "Upholding the highest moral standards in all personal and professional interactions.",
            icon: "gavel" 
        },
        {
            title: "Excellence",
            description: "Relentless pursuit of perfection in academic, athletic, and artistic endeavors.",
            icon: "emoji_events"
        },
        {
            title: "Innovation",
            description: "Encouraging curiosity and the courage to think differently and creatively.",
            icon: "lightbulb"
        }
    ],
    infrastructure: [
        {
            title: "Digital Classrooms",
            description: "Equipped with the latest interactive smart boards and high-speed connectivity to facilitate immersive digital learning.",
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&w=800&q=80"
        },
        {
            title: "Sports Complex",
            description: "Featuring Olympic-standard tracks, multi-purpose courts, and professional training equipment for all major sports.",
            image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&w=800&q=80"
        }
    ],
    achievements: [
        { value: "25+", label: "YEARS OF EXCELLENCE" },
        { value: "5000+", label: "GLOBAL ALUMNI" },
        { value: "200+", label: "AWARDS WON" },
        { value: "85%", label: "DISTINCTION RATE" }
    ]
};

export default function AboutPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fafafa] font-sans text-gray-800 antialiased overflow-x-hidden min-h-screen flex flex-col">
            <Navbar theme="light" />

            {/* Hero Section */}
            <section className="relative w-full h-[85vh] md:h-[95vh] flex items-center justify-center pt-20">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/image.png')` }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg font-serif">
                        {aboutData.hero.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 font-medium drop-shadow-md">
                        {aboutData.hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Main Content Area */}
            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24 max-w-6xl">
                
                {/* Welcome Section */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-[#1e3a8a] border-l-4 border-[#1e3a8a] pl-4 font-serif">
                            Welcome to Takshashila Public School
                        </h2>
                        {aboutData.welcome.paragraphs.map((para, idx) => (
                            <p key={idx} className="text-gray-600 leading-relaxed text-[15px]">
                                {para}
                            </p>
                        ))}
                    </div>
                    <div className="bg-[#f5f5f5] border-l-4 border-[#c11c22] p-8 lg:p-10 mt-8 lg:mt-0">
                        <h3 className="text-xl font-bold text-[#c11c22] mb-4">
                            {aboutData.welcome.heritage.title}
                        </h3>
                        <p className="text-gray-500 italic leading-relaxed text-[15px]">
                            {aboutData.welcome.heritage.quote}
                        </p>
                    </div>
                </section>

                {/* Vision & Mission */}
                <section className="bg-white border border-gray-100 rounded-xl p-8 lg:p-12 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        <div className="space-y-4 md:pr-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="text-[#1e3a8a]" size={32} />
                                <h3 className="text-2xl font-bold text-[#1e3a8a]">Our Vision</h3>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-[15px]">
                                {aboutData.visionMission.vision}
                            </p>
                        </div>
                        <div className="space-y-4 md:pl-8 pt-8 md:pt-0">
                            <div className="flex items-center gap-3 mb-4">
                                <Rocket className="text-[#c11c22]" size={32} />
                                <h3 className="text-2xl font-bold text-[#c11c22]">Our Mission</h3>
                            </div>
                            <p className="text-gray-500 leading-relaxed text-[15px]">
                                {aboutData.visionMission.mission}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="space-y-8">
                    <h2 className="text-3xl font-bold text-[#1e3a8a] border-l-4 border-[#1e3a8a] pl-4 font-serif">
                        Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {aboutData.coreValues.map((value, idx) => {
                            const IconComponent = 
                                value.icon === 'gavel' ? Scale : 
                                value.icon === 'emoji_events' ? Trophy : Lightbulb;
                            const colors = ['text-[#1e3a8a]', 'text-[#c11c22]', 'text-[#1e3a8a]'];
                            const bgColors = ['bg-[#1e3a8a]/10', 'bg-[#c11c22]/10', 'bg-[#1e3a8a]/10'];
                            
                            return (
                                <div key={idx} className="bg-white border border-gray-100 p-8 shadow-sm rounded-sm">
                                    <div className={`w-10 h-10 flex items-center justify-center rounded-sm ${bgColors[idx]} ${colors[idx]} mb-5`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Our Infrastructure */}
                <section className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <h2 className="text-3xl font-bold text-[#1e3a8a] border-l-4 border-[#1e3a8a] pl-4 font-serif">
                            Our Infrastructure
                        </h2>
                        <Link 
                            to="/infra" 
                            className="inline-flex items-center justify-center gap-2 bg-white border border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm w-fit"
                        >
                            Explore Campus
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {aboutData.infrastructure.map((infra, idx) => (
                            <div key={idx} className="bg-white shadow-sm border-b-4 border-[#c11c22] flex flex-col h-full rounded-t-sm">
                                <div className="aspect-[16/9] w-full overflow-hidden">
                                    <img 
                                        src={infra.image} 
                                        alt={infra.title} 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 flex-grow">
                                    <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{infra.title}</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {infra.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Leadership Messages */}
            <section className="w-full bg-white py-20 border-t border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-20">
                    <h2 className="text-3xl font-bold text-[#1e3a8a] border-l-4 border-[#1e3a8a] pl-4 font-serif">
                        Messages from Our Leadership
                    </h2>

                    {/* Principal's Message */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Photo Column */}
                        <div className="lg:col-span-2 flex flex-col items-center text-center">
                            <div className="w-72 h-80 rounded-2xl overflow-hidden border-4 border-[#1e3a8a]/15 shadow-xl mb-5 bg-gray-100">
                                <img
                                    src="/prakhar_khandelwal.jpeg"
                                    alt="Prakhar Khandelwal — Principal"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Prakhar Khandelwal</h3>
                            <p className="text-sm font-semibold text-[#c11c22] uppercase tracking-wider mt-1">The Principal</p>
                        </div>

                        {/* Message Column */}
                        <div className="lg:col-span-3 relative">
                            <div className="absolute -top-4 -left-2 text-[#1e3a8a]/10 text-8xl font-serif leading-none select-none">"</div>
                            <div className="bg-[#f8f9fc] border border-gray-100 rounded-xl p-8 lg:p-10 space-y-4">
                                <h3 className="text-xl font-bold text-[#1e3a8a] mb-4">Message from the Principal</h3>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    At TPS, we are committed to preparing students for the challenges of the 21st century. While we accord priority to academic excellence, we also lay strong emphasis on their wholesome development by achieving a balance among academic, physical and artistic pursuits. Our aim is to provide an enriching curriculum in a conducive learning environment.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    The world-class facilities at our beautiful campus, with an efficient administrative backup and a team of competent, passionate teachers substantiate our commitment to quality.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    We strive to provide globally competent education by blending the traditional education with modern communication. We seek and encourage learning out of the confines of the four walls and support the learners by instructional scaffolding so that the child not only learns independently but appreciates divergent thinking and applies the knowledge correctly.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    The aim to provide skills to achieve goals and staying relevant in a dynamic environment is achieved through embracing ever-evolving technologies and sensibilities in the teaching-learning process.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    We also believe in social inclusion and positive reflection to ensure Takshashila Public School remains the centre of excellence and creativity — a place where dreams find home without losing out our cultural wealth and experiences.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-24 h-0.5 bg-gray-200 mx-auto"></div>

                    {/* Manager's Message */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                        {/* Message Column (comes first on desktop for alternating layout) */}
                        <div className="lg:col-span-3 relative order-2 lg:order-1">
                            <div className="absolute -top-4 -right-2 text-[#c11c22]/10 text-8xl font-serif leading-none select-none text-right w-full">"</div>
                            <div className="bg-[#fdf5f5] border border-gray-100 rounded-xl p-8 lg:p-10 space-y-4">
                                <h3 className="text-xl font-bold text-[#c11c22] mb-4">Message from the Manager</h3>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    A school imparts knowledge to children, develops their skills, instills in them sound values, and nurtures their curiosity for lifelong learning. It sets the context for their future learning, and prepares them to be self-motivated and self-directed learners.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    It also shapes their physical and mental health, and provides them with the environment for the holistic development and well-being. Our vision and everything that we do are guided by these educational precepts and practices, inspiring us to provide children with opportunities to grow to their full potential.
                                </p>
                                <p className="text-gray-600 leading-relaxed text-[15px]">
                                    Our dedicated and caring educators teach our children not just with their minds but also with their hearts, making learning enjoyable, purposeful, and inclusive, and shape in them to be emotionally intelligent. They inspire our children to believe in themselves and think big with a growth mindset.
                                </p>
                            </div>
                        </div>

                        {/* Photo Column */}
                        <div className="lg:col-span-2 flex flex-col items-center text-center order-1 lg:order-2">
                            <div className="w-72 h-80 rounded-2xl overflow-hidden border-4 border-[#c11c22]/15 shadow-xl mb-5 bg-gray-100">
                                <img
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=400&q=80"
                                    alt="Manu Khandelwal — Manager"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Manu Khandelwal</h3>
                            <p className="text-sm font-semibold text-[#c11c22] uppercase tracking-wider mt-1">The Manager</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements & Milestones */}
            <section className="w-full bg-gradient-to-r from-[#2161af] to-[#b91e23] py-16 mt-8">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-3 font-serif">
                        Achievements & Milestones
                    </h2>
                    <div className="w-12 h-0.5 bg-white/60 mx-auto mb-12"></div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/20">
                        {aboutData.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center text-white space-y-2">
                                <span className="text-4xl md:text-5xl font-extrabold">{achievement.value}</span>
                                <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] uppercase opacity-90">{achievement.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}