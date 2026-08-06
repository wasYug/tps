import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Calendar,
    CalendarDays,
    Download,
    BookOpen,
    Star,
    Sun,
} from "lucide-react";

const calendarData = [
    {
        month: "April 2026",
        events: [
            { date: "4 Apr", type: "Academic", title: "New Academic Session Begins" },
            { date: "14 Apr", type: "Holiday", title: "Ambedkar Jayanti" },
        ],
    },
    {
        month: "May 2026",
        events: [
            { date: "1 May", type: "Holiday", title: "Labour Day" },
            { date: "15 May - 25 May", type: "Event", title: "Summer Camp" },
            { date: "26 May", type: "Academic", title: "Unit Test I Begins" },
        ],
    },
    {
        month: "June 2026",
        events: [
            { date: "1 Jun - 30 Jun", type: "Holiday", title: "Summer Vacation" },
        ],
    },
    {
        month: "July 2026",
        events: [
            { date: "1 Jul", type: "Academic", title: "School Reopens" },
            { date: "20 Jul", type: "Event", title: "Investiture Ceremony" },
        ],
    },
    {
        month: "August 2026",
        events: [
            { date: "15 Aug", type: "Event", title: "Independence Day Celebration" },
            { date: "26 Aug", type: "Holiday", title: "Janmashtami" },
            { date: "29 Aug", type: "Event", title: "National Sports Day" },
        ],
    },
    {
        month: "September 2026",
        events: [
            { date: "5 Sep", type: "Event", title: "Teachers' Day Celebration" },
            {
                date: "15 Sep",
                type: "Academic",
                title: "Half-Yearly Examinations Begin",
            },
        ],
    },
    {
        month: "October 2026",
        events: [
            { date: "2 Oct", type: "Holiday", title: "Gandhi Jayanti" },
            { date: "20 Oct - 24 Oct", type: "Holiday", title: "Dussehra Break" },
        ],
    },
    {
        month: "November 2026",
        events: [
            { date: "10 Nov - 14 Nov", type: "Holiday", title: "Diwali Break" },
            { date: "14 Nov", type: "Event", title: "Children's Day Fete" },
        ],
    },
    {
        month: "December 2026",
        events: [
            {
                date: "15 Dec",
                type: "Academic",
                title: "Pre-Board Exams (Class X & XII)",
            },
            { date: "25 Dec - 2 Jan", type: "Holiday", title: "Winter Vacation" },
        ],
    },
    {
        month: "January 2027",
        events: [
            { date: "3 Jan", type: "Academic", title: "School Reopens" },
            { date: "26 Jan", type: "Event", title: "Republic Day Celebration" },
        ],
    },
    {
        month: "February 2027",
        events: [
            { date: "15 Feb", type: "Academic", title: "Final Examinations Begin" },
            {
                date: "28 Feb",
                type: "Event",
                title: "National Science Day Exhibition",
            },
        ],
    },
    {
        month: "March 2027",
        events: [
            { date: "15 Mar", type: "Event", title: "Annual Result Declaration" },
            { date: "25 Mar", type: "Holiday", title: "Holi" },
        ],
    },
];

const getTypeStyles = (type) => {
    switch (type) {
        case "Academic":
            return {
                color: "text-[#0f2142]",
                border: "border-[#0f2142]",
                icon: <BookOpen size={13} className="text-[#0f2142] mr-1.5" />,
            };
        case "Holiday":
            return {
                color: "text-[#c11c22]",
                border: "border-[#c11c22]",
                icon: <Sun size={13} className="text-[#c11c22] mr-1.5" />,
            };
        case "Event":
            return {
                color: "text-[#d4af37]",
                border: "border-[#d4af37]",
                icon: <Star size={13} className="text-[#d4af37] mr-1.5" />,
            };
        default:
            return { color: "text-gray-600", border: "border-gray-400", icon: null };
    }
};

export default function YearCalendar() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#fafafa] font-sans text-gray-800 antialiased min-h-screen flex flex-col overflow-x-hidden">
            <Navbar theme="transparent" />

            {/* Hero Section */}
            <section className="relative pt-36 pb-24 bg-gradient-to-br from-[#0f2142] via-[#0f2142] to-[#1a365d] border-b-[6px] border-[#c11c22] overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#c11c22] rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/3"></div>

                <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl mt-12">
                    <div className="inline-flex items-center justify-center p-3.5 bg-white/10 rounded-2xl backdrop-blur-md mb-6 border border-white/20 shadow-xl">
                        <CalendarDays className="text-[#d4af37] w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 font-serif tracking-tight drop-shadow-md">
                        Academic Calendar
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light drop-shadow-sm">
                        Stay updated with all the important academic dates, vibrant school
                        events, and upcoming holidays for the 2026-2027 session.
                    </p>
                    <button className="bg-[#c11c22] hover:bg-[#a0171c] text-white px-8 py-3.5 font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 inline-flex items-center gap-3">
                        <Download size={20} />
                        Download PDF
                    </button>
                </div>
            </section>

            {/* Filter Legend */}
            <section className="bg-white border-b border-gray-200 shadow-sm relative z-20">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
                        <div className="flex items-center gap-2.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#0f2142] border border-[#0f2142]/20"></span>
                            <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">
                                Academics & Exams
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#d4af37] border border-[#d4af37]/20"></span>
                            <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">
                                School Events
                            </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#c11c22] border border-[#c11c22]/20"></span>
                            <span className="text-xs font-bold text-gray-700 tracking-wider uppercase">
                                Holidays
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <main className="flex-grow container mx-auto px-4 py-16 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {calendarData.map((monthData, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
                        >
                            {/* Month Header */}
                            <div className="bg-[#0f2142] py-4 px-6 border-b-[4px] border-[#d4af37] flex items-center justify-between">
                                <h3 className="text-xl font-bold text-white tracking-wide font-serif">
                                    {monthData.month}
                                </h3>
                                <Calendar
                                    size={22}
                                    className="text-white/40 group-hover:text-white transition-colors"
                                />
                            </div>

                            {/* Events List */}
                            <div className="p-6 flex-grow flex flex-col pt-8">
                                {monthData.events.map((ev, i) => {
                                    const style = getTypeStyles(ev.type);
                                    return (
                                        <div key={i} className="flex relative">
                                            {/* Date Badge */}
                                            <div className="w-[85px] sm:w-[95px] flex-shrink-0 text-right pr-4 sm:pr-5">
                                                <div className="text-2xl font-black text-[#0f2142] leading-none mb-1">
                                                    {ev.date.split(" ")[0]}
                                                </div>
                                                <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase leading-tight">
                                                    {ev.date.split(" ").slice(1).join(" ")}
                                                </div>
                                            </div>

                                            {/* Timeline Node */}
                                            <div className="relative flex flex-col items-center w-[16px] flex-shrink-0">
                                                <div
                                                    className={`w-3.5 h-3.5 rounded-full border-[3px] bg-white z-10 ${style.border} mt-1.5 absolute top-0`}
                                                ></div>
                                                {i !== monthData.events.length - 1 && (
                                                    <div className="absolute top-5 bottom-0 w-[2px] bg-gray-100 left-1/2 -translate-x-1/2"></div>
                                                )}
                                            </div>

                                            {/* Event Details */}
                                            <div className="flex-grow pl-4 sm:pl-5 pb-8">
                                                <div className="flex items-center mb-1.5">
                                                    {style.icon}
                                                    <span
                                                        className={`text-[10px] font-extrabold uppercase tracking-widest ${style.color}`}
                                                    >
                                                        {ev.type}
                                                    </span>
                                                </div>
                                                <h4 className="text-gray-900 font-bold text-[15px] sm:text-base leading-snug">
                                                    {ev.title}
                                                </h4>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Newsletter / Notice Callout */}
            <section className="bg-gradient-to-r from-[#0f2142] to-[#c11c22] border-t-4 border-[#d4af37] py-20 mt-10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white font-serif mb-5">
                        Never Miss an Update
                    </h2>
                    <p className="text-white/80 mb-10 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                        Dates are subject to change due to unforeseen circumstances. Please
                        subscribe to our newsletter to receive real-time notifications about
                        any calendar adjustments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-6 py-4 rounded-lg bg-white/90 hover:bg-white text-gray-900 w-full focus:ring-2 focus:ring-[#d4af37] outline-none shadow-inner transition-colors placeholder-gray-500 font-medium"
                        />
                        <button className="bg-[#0f2142] hover:bg-[#1a365d] border border-white/20 text-white px-8 py-4 font-bold rounded-lg transition-colors whitespace-nowrap shadow-lg">
                            Subscribe Now
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
