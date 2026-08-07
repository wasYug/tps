import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { alumniPageData } from '../../data/alumniData'; 
import { Megaphone, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import TakshashilaLoader from '@/components/loader';

const {
    data: { session },
} = await supabase.auth.getSession();

if (!session) {
    // throw new Error("User is not logged in.");
}


export default function AlumniPage() {
    const [alumniData, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    // Apply to Speak modal state
    const [showSpeakForm, setShowSpeakForm] = useState(false);
    const [speakForm, setSpeakForm] = useState({
        name: '', email: '', phone: '', topic: '', bio: '',
    });
    const [speakErrors, setSpeakErrors] = useState({});
    const [speakSubmitting, setSpeakSubmitting] = useState(false);

    // Newsletter state
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterSubmitting, setNewsletterSubmitting] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAlumni();
    }, []);

    async function fetchAlumni() {
        const { data, error } = await supabase
            .from('alumni')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            setAlumni(data);
        }
        setLoading(false);
    }

    if (loading) return <TakshashilaLoader ready={false}/>;

    const displayedAlumni = showAll ? alumniData : alumniData.slice(0, 6);

    // --- Apply to Speak handlers ---
    const handleSpeakChange = (e) => {
        const { name, value } = e.target;
        setSpeakForm((prev) => ({ ...prev, [name]: value }));
        if (speakErrors[name]) setSpeakErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validateSpeakForm = () => {
        const errs = {};
        if (!speakForm.name.trim()) errs.name = 'Name is required.';
        else if (speakForm.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.';
        else if (speakForm.name.trim().length > 50) errs.name = 'Name must not exceed 50 characters.';

        if (!speakForm.email.trim()) errs.email = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(speakForm.email.trim())) errs.email = 'Please enter a valid email.';

        if (!speakForm.phone.trim()) errs.phone = 'Phone number is required.';
        else {
            const digits = speakForm.phone.trim().replace(/[\s\-+]/g, '');
            const cleaned = digits.startsWith('91') && digits.length > 10 ? digits.slice(2) : digits;
            if (!/^[6-9]\d{9}$/.test(cleaned)) errs.phone = 'Enter a valid 10-digit Indian number.';
        }

        if (!speakForm.topic.trim()) errs.topic = 'Topic is required.';
        else if (speakForm.topic.trim().length < 10) errs.topic = 'Topic must be at least 10 characters.';
        else if (speakForm.topic.trim().length > 500) errs.topic = 'Topic must not exceed 500 characters.';

        if (!speakForm.bio.trim()) errs.bio = 'Bio / Experience is required.';
        else if (speakForm.bio.trim().length < 10) errs.bio = 'Bio must be at least 10 characters.';
        else if (speakForm.bio.trim().length > 500) errs.bio = 'Bio must not exceed 500 characters.';

        return errs;
    };

    const handleSpeakSubmit = async (e) => {
        e.preventDefault();
        const errs = validateSpeakForm();
        setSpeakErrors(errs);
        if (Object.keys(errs).length > 0) {
            toast.error('Please fix the errors before submitting.');
            return;
        }
        setSpeakSubmitting(true);
        try {
            const rawPhone = speakForm.phone.trim().replace(/[\s\-+]/g, '');
            const cleanPhone = rawPhone.startsWith('91') && rawPhone.length > 10 ? rawPhone.slice(2) : rawPhone;

            const payload = {
                name: speakForm.name.trim(),
                email: speakForm.email.trim(),
                phone: cleanPhone,
                workshop_topic: speakForm.topic.trim(),
                experience: speakForm.bio.trim(),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/alumni/`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                    },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                if (errorData?.detail && Array.isArray(errorData.detail)) {
                    const backendErrors = {};
                    const fieldMap = { workshop_topic: 'topic', experience: 'bio' };
                    errorData.detail.forEach((err) => {
                        const field = err.loc?.[err.loc.length - 1];
                        const frontendField = fieldMap[field] || field;
                        backendErrors[frontendField] = err.msg;
                    });
                    setSpeakErrors(backendErrors);
                }
                throw new Error('Submission failed');
            }

            toast.success('Your speaker application has been submitted!');
            setSpeakForm({ name: '', email: '', phone: '', topic: '', bio: '' });
            setSpeakErrors({});
            setShowSpeakForm(false);
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setSpeakSubmitting(false);
        }
    };

    const speakInputClass = (field) => {
        const base = 'w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 bg-gray-50/50 focus:bg-white focus:ring-2';
        return speakErrors[field]
            ? `${base} border-red-500 focus:ring-red-500/20 focus:border-red-500`
            : `${base} border-gray-200 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a]`;
    };

    // --- Newsletter handler ---
    const handleNewsletterSubmit = async (e) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) {
            toast.error('Please enter your email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail.trim())) {
            toast.error('Please enter a valid email address.');
            return;
        }
        setNewsletterSubmitting(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: newsletterEmail.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                if (errorData?.detail && Array.isArray(errorData.detail)) {
                    toast.error(errorData.detail[0].msg || 'Invalid email format.');
                } else {
                    throw new Error('Subscription failed');
                }
                return;
            }

            toast.success('You\'ve been subscribed to our school magazine!');
            setNewsletterEmail('');
        } catch {
            toast.error('Subscription failed. Please try again.');
        } finally {
            setNewsletterSubmitting(false);
        }
    };

    const renderAlumniCard = (alumnus, idx) => (
        <div 
            key={idx} 
            className="bg-white p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 flex flex-col items-center text-center rounded-2xl"
        >
            <div className="relative mb-6 flex flex-col items-center">
                <img 
                    src={alumnus.img} 
                    alt={alumnus.name} 
                    className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover border-[5px] border-[#d4af37] shadow-lg"
                />
                <span className="bg-[#c11c22] text-white text-xs font-bold tracking-wide px-4 py-1.5 rounded-full -mt-5 relative z-10 shadow-md">
                    {alumnus.year_pass_out && `Student of ${String(alumnus.year_pass_out)}-${String(parseInt(alumnus.year_pass_out) + 1).slice(-2)}`}
                </span>
            </div>
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-1">{alumnus.name}</h3>
            <p className="text-gray-500 text-xs font-semibold tracking-widest uppercase mb-1">{alumnus.role}</p>
            {alumnus.company && (
                <p className="text-[#c11c22] text-xs font-bold tracking-widest uppercase mb-4">{alumnus.company}</p>
            )}
            <p className="text-gray-600 italic text-sm leading-relaxed mt-auto pt-4 px-2 relative">
                <span className="text-4xl text-gray-200 absolute top-0 left-0 -translate-x-2 -translate-y-2 font-serif">"</span>
                {alumnus.content}
                <span className="text-4xl text-gray-200 absolute bottom-0 right-0 translate-x-2 translate-y-4 font-serif">"</span>
            </p>
        </div>
    );

    return (
        <div className="bg-[#fafafa] font-sans text-gray-800 antialiased overflow-x-hidden min-h-screen flex flex-col">
            <Navbar theme="transparent" />

            {/* Hero Section */}
            <section className="relative w-full h-[80vh] md:h-[95vh] flex items-center justify-center">
                <div 
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${alumniPageData.hero.image}')` }}
                >
                    <div className="absolute inset-0 bg-[#0f2142]/80"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full flex flex-col items-center mt-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg font-serif">
                        {alumniPageData.hero.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 font-medium drop-shadow-md mb-8 max-w-2xl">
                        {alumniPageData.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => document.getElementById('alumni-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-[#c11c22] hover:bg-[#a0171c] text-white px-8 py-3 font-bold transition-colors cursor-pointer"
                        >
                            Meet Our Alumni
                        </button>
                        <button 
                            onClick={() => document.getElementById('engagement-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-transparent border-2 border-[#2F79B8] text-[#2F79B8] hover:bg-[#2F79B8] hover:text-white px-8 py-3 font-bold transition-colors cursor-pointer"
                        >
                            Ways to Engage
                        </button>
                    </div>
                </div>
            </section>

            <main className="flex-grow">
                {/* Alumni Stats Strip */}
                <section className="relative z-20 w-full max-w-[95%] xl:max-w-7xl mx-auto -mt-12 sm:-mt-16 mb-16">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                        {/* Table Header / Title */}
                        <div className="bg-[#0f2142] py-4 text-center border-b-[3px] border-[#d4af37]">
                            <h3 className="text-white font-serif font-semibold text-lg tracking-wide uppercase">Takshashila Alumni Legacy</h3>
                        </div>
                        {/* Horizontal Table Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 bg-gray-200 gap-[1px]">
                            {[
                                { label: "IIT", value: "20+" },
                                { label: "IIM", value: "5+" },
                                { label: "MBBS/AIIMS", value: "30+" },
                                { label: "Air Force", value: "2+" },
                                { label: "CA", value: "15+" },
                                { label: "UPPSC", value: "2+" },
                                { label: "Startup", value: "20+" },
                                { label: "IIFT (Fashion)", value: "5+" },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center py-8 px-4 bg-white hover:bg-gray-50 transition-colors">
                                    <span className="text-3xl lg:text-4xl font-black text-[#c11c22] mb-2">{stat.value}</span>
                                    <span className="text-gray-600 text-xs font-bold tracking-wider uppercase text-center">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Successful Alumni Section */}
                <section id="alumni-section" className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] font-serif inline-block border-b-2 border-[#d4af37] pb-2">
                            Successful Alumni
                        </h2>
                        <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
                            Exceptional journeys that began within these halls, inspiring the next generation of Takshashila leaders.
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
                            {alumniData.slice(0, 6).map((alumnus, idx) => renderAlumniCard(alumnus, idx))}
                        </div>
                        
                        <div className={`grid transition-[grid-template-rows] duration-1000 ease-in-out ${showAll ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                            <div className="overflow-hidden min-h-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12 mt-8 pb-4">
                                    {alumniData.slice(6).map((alumnus, idx) => renderAlumniCard(alumnus, idx + 6))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {alumniData.length > 6 && (
                        <div className="mt-16 text-center">
                            <button 
                                onClick={() => setShowAll(!showAll)}
                                className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white font-bold py-2.5 px-8 transition-colors"
                            >
                                {showAll ? "Show Less" : "Load More Alumni"}
                            </button>
                        </div>
                    )}
                </section>

                {/* Alumni Engagement */}
                <section id="engagement-section" className="py-20 bg-gray-50/50 border-y border-gray-100">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h2 className="text-3xl font-bold text-[#1e3a8a] font-serif mb-6">
                            {alumniPageData.engagement.title}
                        </h2>
                        <p className="text-gray-500 mb-12">
                            {alumniPageData.engagement.subtitle}
                        </p>

                        <div className="bg-white p-10 md:p-14 shadow-lg rounded-2xl max-w-2xl mx-auto flex flex-col items-center border border-gray-100">
                            <div className="w-16 h-16 bg-[#2F79B8] rounded-full flex items-center justify-center mb-6 shadow-sm">
                                <Megaphone size={28} className="text-gray-900" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{alumniPageData.engagement.card.title}</h3>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                {alumniPageData.engagement.card.description}
                            </p>
                            <button 
                                onClick={() => setShowSpeakForm(true)}
                                className="bg-[#0f2142] hover:bg-[#152e6f] text-white px-10 py-3 font-semibold rounded-lg transition-colors w-full sm:w-auto cursor-pointer"
                            >
                                Apply to Speak
                            </button>
                        </div>
                    </div>
                </section>

                {/* Apply to Speak Modal */}
                {showSpeakForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setShowSpeakForm(false)}
                        />
                        {/* Modal */}
                        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in">
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-5 flex items-center justify-between rounded-t-2xl z-10">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Apply to Speak</h3>
                                    <p className="text-xs text-gray-500 mt-1">Share your expertise with the next generation</p>
                                </div>
                                <button 
                                    onClick={() => setShowSpeakForm(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-gray-500" />
                                </button>
                            </div>
                            {/* Form */}
                            <form onSubmit={handleSpeakSubmit} noValidate className="p-6 space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Full Name <span className="text-red-500">*</span></label>
                                    <input type="text" name="name" value={speakForm.name} onChange={handleSpeakChange} placeholder="Your full name" className={speakInputClass('name')} />
                                    {speakErrors.name && <p className="text-red-600 text-xs font-medium">{speakErrors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                        <input type="email" name="email" value={speakForm.email} onChange={handleSpeakChange} placeholder="you@example.com" className={speakInputClass('email')} />
                                        {speakErrors.email && <p className="text-red-600 text-xs font-medium">{speakErrors.email}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-gray-700">Phone <span className="text-red-500">*</span></label>
                                        <input type="tel" name="phone" value={speakForm.phone} onChange={handleSpeakChange} placeholder="+91 98765 43210" className={speakInputClass('phone')} />
                                        {speakErrors.phone && <p className="text-red-600 text-xs font-medium">{speakErrors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Talk / Workshop Topic <span className="text-red-500">*</span></label>
                                    <input type="text" name="topic" value={speakForm.topic} onChange={handleSpeakChange} placeholder="e.g. Career in Technology" className={speakInputClass('topic')} />
                                    {speakErrors.topic && <p className="text-red-600 text-xs font-medium">{speakErrors.topic}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-gray-700">Short Bio / Experience<span className="text-red-500">*</span></label>
                                    <textarea name="bio" value={speakForm.bio} onChange={handleSpeakChange} rows="3" placeholder="Tell us about yourself and your professional journey..." className={`${speakInputClass('bio')} resize-none`} />
                                    <div className="flex justify-between">
                                        {speakErrors.bio ? <p className="text-red-600 text-xs font-medium">{speakErrors.bio}</p> : <span />}
                                        <p className={`text-xs font-medium ${speakForm.bio.length > 500 ? 'text-red-600' : 'text-gray-400'}`}>{speakForm.bio.length}/500</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowSpeakForm(false)}
                                        className="flex-1 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={speakSubmitting}
                                        className="flex-1 py-3 bg-[#0f2142] hover:bg-[#152e6f] text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {speakSubmitting && (
                                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        )}
                                        {speakSubmitting ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Stay Connected — School Magazine */}
                <section className="py-24 container mx-auto px-4 max-w-6xl">
                    <div className="bg-gradient-to-r from-[#0f2142] to-[#c11c22] rounded-3xl p-8 md:p-12 lg:p-16 border-2 border-[#d4af37]/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10">
                        <div className="text-white max-w-lg text-center lg:text-left">
                            <h2 className="text-3xl font-bold font-serif mb-4">Subscribe to Our School Magazine</h2>
                            <p className="text-white/80 leading-relaxed text-sm md:text-base">
                                Stay updated with the latest school news, student achievements, upcoming events, and inspiring stories from our campus community.
                            </p>
                        </div>
                        <div className="w-full lg:w-auto flex-grow max-w-md">
                            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleNewsletterSubmit} noValidate>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    className="px-5 py-3.5 bg-white/90 hover:bg-white rounded-lg flex-grow outline-none text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-[#d4af37] focus:bg-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                />
                                <button 
                                    type="submit" 
                                    disabled={newsletterSubmitting}
                                    className="bg-[#0f2142] hover:bg-[#152e6f] text-white px-8 py-3.5 font-bold rounded-lg transition-colors border border-white/10 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {newsletterSubmitting ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
