import React, { useState, useEffect } from "react";
import {
    Plus,
    Trash2,
    Edit3,
    Eye,
    EyeOff,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Calendar,
    Bell,
    RotateCcw,
    Search,
    ArrowUpRight,
    Check,
    Filter,
    Layers,
    LayoutGrid,
    Clock,
    MapPin,
    Tag,
    ArrowRight,
    Info,
    CheckSquare,
    Square,
    X,
    PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabase";

const getDayAndMonth = (dateString, fallbackDay, fallbackMonth) => {
    if (dateString && typeof dateString === "string") {
        const parts = dateString.split("-");
        if (parts.length === 3) {
            const day = parts[2];
            const monthIndex = parseInt(parts[1], 10) - 1;
            const months = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const month = months[monthIndex] || "---";
            return { day, month };
        }
    }
    return { day: fallbackDay || "--", month: fallbackMonth || "---" };
};


const COLOR_PRESETS = [
    { label: "School Blue", hex: "#2F79B8", bg: "#2F79B81A" },
    { label: "Navy Blue", hex: "#294868", bg: "#2948681A" },
    { label: "Amber Gold", hex: "#DD9808", bg: "#DD98081A" },
    { label: "Crimson Red", hex: "#C22715", bg: "#C227151A" },
    { label: "Slate Blue", hex: "#95BAD4", bg: "#95BAD430" },
    { label: "Emerald Teal", hex: "#0d9488", bg: "#0d94881A" },
    { label: "Royal Purple", hex: "#7c3aed", bg: "#7c3aed1A" },
];

const QUICK_BADGES = [
    "Admissions 2026",
    "Examinations",
    "Academics",
    "Sports",
    "Events & Fests",
    "Urgent Alert",
    "General Notice",
];

const MONTH_PRESETS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function HomePage() {
    // Navigation / View state
    const [activeTab, setActiveTab] = useState("all"); // 'all', 'notices', 'events'
    const [searchQuery, setSearchQuery] = useState("");

    // Data State
    const [notices, setNotices] = useState([]);
    const [events, setEvents] = useState([]);

    const fetchNoticeboardAndEvents = async () => {
        try {
            const { data: noticesData, error: noticesError } = await supabase
                .from("noticeboard")
                .select("*")
                .order("id", { ascending: false });

            if (!noticesError && noticesData) {
                setNotices(noticesData);
            }
        } catch (err) {
            console.error("Error fetching noticeboard:", err);
        }

        try {
            const { data: eventsData, error: eventsError } = await supabase
                .from("events")
                .select("*")
                .order("id", { ascending: false });

            if (!eventsError && eventsData) {
                setEvents(eventsData);
            }
        } catch (err) {
            console.error("Error fetching events:", err);
        }
    };

    useEffect(() => {
        fetchNoticeboardAndEvents();
    }, []);

    // Notice Form State
    const [noticeForm, setNoticeForm] = useState({
        id: "",
        badge: "Admissions 2026",
        title: "",
        content: "",
        date: new Date().toISOString().slice(0, 10),
        color: "#2F79B8",
    });
    const [isEditingNotice, setIsEditingNotice] = useState(false);

    // Event Form State
    const [eventForm, setEventForm] = useState({
        id: "",
        date: new Date().toISOString().slice(0, 10),
        title: "",
        venue: "Venue: Main Campus Auditorium, 10:00 AM",
        color: "#2F79B8",
    });
    const [isEditingEvent, setIsEditingEvent] = useState(false);

    // ─── NOTICE ACTIONS ───
    const handleSaveNotice = async (e) => {
        e.preventDefault();
        if (!noticeForm.title.trim() || !noticeForm.content.trim()) {
            toast.error("Please fill in both the Title and Content fields!");
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const headers = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const payload = {
                main_heading_1: noticeForm.badge,
                main_heading_2: noticeForm.title,
                content: noticeForm.content,
                date: noticeForm.date || new Date().toISOString().slice(0, 10),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/noticeboard`, {
                method: "POST",
                headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create notice");
            }

            toast.success("New notice published to Homepage!");
            resetNoticeForm();
            fetchNoticeboardAndEvents();
        } catch (err) {
            console.error("Error creating notice:", err);
            toast.error("Error publishing notice. Please try again.");
        }
    };

    const handleDeleteNotice = async (id) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const headers = {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/noticeboard/${id}`, {
                method: "DELETE",
                headers,
            });

            if (!response.ok) {
                throw new Error("Failed to delete notice");
            }

            setNotices((prev) => prev.filter((item) => item.id !== id));
            toast.success("Notice removed!");
            if (noticeForm.id === id) resetNoticeForm();
        } catch (err) {
            console.error("Error deleting notice:", err);
            toast.error("Error deleting notice. Please try again.");
        }
    };

    const resetNoticeForm = () => {
        setNoticeForm({
            id: "",
            badge: QUICK_BADGES[0],
            title: "",
            content: "",
            date: new Date().toISOString().slice(0, 10),
            color: "#2F79B8",
        });
        setIsEditingNotice(false);
    };

    // ─── EVENT ACTIONS ───
    const handleSaveEvent = async (e) => {
        e.preventDefault();
        if (!eventForm.title.trim() || !eventForm.venue.trim()) {
            toast.error("Please fill in Event Title and Venue/Time!");
            return;
        }

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const headers = {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const payload = {
                heading_1: eventForm.title,
                venue: eventForm.venue,
                date: eventForm.date || new Date().toISOString().slice(0, 10),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/events`, {
                method: "POST",
                headers,
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to create event");
            }

            toast.success("New event scheduled on Homepage!");
            resetEventForm();
            fetchNoticeboardAndEvents();
        } catch (err) {
            console.error("Error creating event:", err);
            toast.error("Error scheduling event. Please try again.");
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;
            const headers = {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            };

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/events/${id}`, {
                method: "DELETE",
                headers,
            });

            if (!response.ok) {
                throw new Error("Failed to delete event");
            }

            setEvents((prev) => prev.filter((item) => item.id !== id));
            toast.success("Event removed!");
            if (eventForm.id === id) resetEventForm();
        } catch (err) {
            console.error("Error deleting event:", err);
            toast.error("Error deleting event. Please try again.");
        }
    };

    const resetEventForm = () => {
        setEventForm({
            id: "",
            date: new Date().toISOString().slice(0, 10),
            title: "",
            venue: "Venue: Main Campus Auditorium, 10:00 AM",
            color: "#2F79B8",
        });
        setIsEditingEvent(false);
    };

    // Reset all to school defaults
    const handleResetToDefaults = () => {
        fetchNoticeboardAndEvents();
        toast.success("Refreshed from Supabase!");
    };

    // Filtered lists
    const filteredNotices = notices.filter((n) => {
        const title = n.title || n.main_heading_2 || "";
        const content = n.content || "";
        const badge = n.badge || n.main_heading_1 || "";
        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            badge.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const filteredEvents = events.filter((e) => {
        const title = e.title || e.heading_1 || "";
        const venue = e.venue || "";
        const date = e.date || "";
        return (
            title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
            date.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen bg-[#F8FAF4] text-neutral-900 pb-20">
            {/* ─── PREMIUM HERO BANNER ─── */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#002147] via-[#1a3a60] to-[#2F79B8] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-xl">
                {/* Decorative background circles */}
                <div className="absolute top-0 right-10 size-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 left-20 size-60 bg-[#DD9808]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="max-w-[1240px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#DD9808]">
                            <Sparkles className="size-3.5" />
                            <span>Homepage Content Command Center</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Notice Board & Upcoming Events
                        </h1>
                        <p className="text-white/80 max-w-2xl text-sm sm:text-base leading-relaxed">
                            Create, edit, and organize announcements and calendar events.
                            Experience real-time previews and manage visibility so you can
                            easily decide what to showcase on the live website.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            onClick={handleResetToDefaults}
                            variant="outline"
                            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm gap-2 transition-all cursor-pointer"
                        >
                            <RotateCcw className="size-4" />
                            <span>Reset Defaults</span>
                        </Button>
                        <a href="/" target="_blank" rel="noreferrer">
                            <Button className="bg-[#DD9808] hover:bg-[#c58506] text-white font-semibold gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                                <span>View Live Homepage</span>
                                <ArrowUpRight className="size-4" />
                            </Button>
                        </a>
                    </div>
                </div>

                {/* STATS STRIP */}
                <div className="max-w-[1240px] mx-auto mt-8 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-xs border border-white/10">
                        <div className="size-10 rounded-lg bg-[#2F79B8]/40 flex items-center justify-center text-white">
                            <Bell className="size-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{notices.length}</p>
                            <p className="text-xs text-white/70 font-medium">Total Notices</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl backdrop-blur-xs border border-white/10">
                        <div className="size-10 rounded-lg bg-[#DD9808]/40 flex items-center justify-center text-white">
                            <Calendar className="size-5" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{events.length}</p>
                            <p className="text-xs text-white/70 font-medium">Total Events</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                {/* ─── VIEW TAB SELECTOR & TOOLBAR ─── */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-neutral-200/80 mb-8">
                    <div className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200 overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "all"
                                    ? "bg-[#002147] text-white shadow-md"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                                }`}
                        >
                            <LayoutGrid className="size-4" />
                            <span>All-in-One Grid View</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("notices")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "notices"
                                    ? "bg-[#2F79B8] text-white shadow-md"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                                }`}
                        >
                            <Bell className="size-4" />
                            <span>Noticeboard Only ({notices.length})</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("events")}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === "events"
                                    ? "bg-[#294868] text-white shadow-md"
                                    : "text-neutral-600 hover:text-neutral-900 hover:bg-white/60"
                                }`}
                        >
                            <Calendar className="size-4" />
                            <span>Events Only ({events.length})</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative flex-1 sm:w-64">
                            <Search className="size-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search titles, badges, venue..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F79B8] focus:bg-white transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
                                >
                                    <X className="size-3.5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── SECTION 1: NOTICE BOARD CREATION & LIST ─── */}
                {(activeTab === "all" || activeTab === "notices") && (
                    <div className="mb-14">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 rounded-xl bg-[#2F79B8]/10 text-[#2F79B8] flex items-center justify-center">
                                <Bell className="size-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#002147] tracking-tight">
                                    Noticeboard Management
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500">
                                    Add new announcements, check what to take, or remove outdated
                                    notices.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* LEFT/TOP: SMART INPUT FORM (5 Cols on Large) */}
                            <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-md border border-neutral-200/80 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                                    style={{ backgroundColor: noticeForm.color }}
                                />

                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                                        {isEditingNotice ? (
                                            <>
                                                <Edit3 className="size-4 text-[#DD9808]" />
                                                <span>Edit Notice Card</span>
                                            </>
                                        ) : (
                                            <>
                                                <PlusCircle className="size-4 text-[#2F79B8]" />
                                                <span>Add New Notice</span>
                                            </>
                                        )}
                                    </h3>
                                    {isEditingNotice && (
                                        <button
                                            onClick={resetNoticeForm}
                                            className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer font-medium"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSaveNotice} className="space-y-4">
                                    {/* Category / Badge */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            1. Small Heading / Category Badge
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Admissions 2026, Examinations, Sports..."
                                            value={noticeForm.badge}
                                            onChange={(e) =>
                                                setNoticeForm({ ...noticeForm, badge: e.target.value })
                                            }
                                            className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F79B8] font-medium"
                                            required
                                        />
                                        {/* Quick Badge Chips */}
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {QUICK_BADGES.map((b) => (
                                                <button
                                                    key={b}
                                                    type="button"
                                                    onClick={() =>
                                                        setNoticeForm({ ...noticeForm, badge: b })
                                                    }
                                                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-medium ${noticeForm.badge === b
                                                            ? "bg-[#2F79B8] text-white border-[#2F79B8]"
                                                            : "bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100"
                                                        }`}
                                                >
                                                    {b}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            2. Main Heading / Notice Title
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Portal open for Academic Session 2026-27"
                                            value={noticeForm.title}
                                            onChange={(e) =>
                                                setNoticeForm({ ...noticeForm, title: e.target.value })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#2F79B8]"
                                            required
                                        />
                                    </div>

                                    {/* Content / Body */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            3. Notice Content / Description
                                        </label>
                                        <textarea
                                            rows="3"
                                            placeholder="Enter the full details of the notice..."
                                            value={noticeForm.content}
                                            onChange={(e) =>
                                                setNoticeForm({
                                                    ...noticeForm,
                                                    content: e.target.value,
                                                })
                                            }
                                            className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#2F79B8] resize-none leading-relaxed"
                                            required
                                        />
                                    </div>

                                    {/* Date & Color Row */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                                4. Date Display
                                            </label>
                                            <div className="relative">
                                                <Calendar className="size-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={noticeForm.date}
                                                    onChange={(e) =>
                                                        setNoticeForm({
                                                            ...noticeForm,
                                                            date: e.target.value,
                                                        })
                                                    }
                                                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F79B8]"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                                5. Accent Color Theme
                                            </label>
                                            <div className="flex items-center gap-2 pt-1">
                                                {COLOR_PRESETS.slice(0, 5).map((cp) => (
                                                    <button
                                                        key={cp.hex}
                                                        type="button"
                                                        onClick={() =>
                                                            setNoticeForm({ ...noticeForm, color: cp.hex })
                                                        }
                                                        className={`size-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${noticeForm.color === cp.hex
                                                                ? "border-neutral-900 scale-110 shadow-sm"
                                                                : "border-transparent hover:scale-105 opacity-80"
                                                            }`}
                                                        style={{ backgroundColor: cp.hex }}
                                                        title={cp.label}
                                                    >
                                                        {noticeForm.color === cp.hex && (
                                                            <Check className="size-3.5 text-white" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Notice Form fields completed */}

                                    {/* Form Submit Button */}
                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            className={`w-full py-6 rounded-xl font-bold gap-2 text-white shadow-md hover:shadow-lg transition-all cursor-pointer ${isEditingNotice
                                                    ? "bg-[#DD9808] hover:bg-[#c58506]"
                                                    : "bg-[#2F79B8] hover:bg-[#205b8e]"
                                                }`}
                                        >
                                            {isEditingNotice ? (
                                                <>
                                                    <Check className="size-5" />
                                                    <span>Update Notice Item</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="size-5" />
                                                    <span>Publish Notice to Homepage</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* ─── LIVE PREVIEW BOX (UNDER FORM) ─── */}
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                                            Live Homepage Preview
                                        </span>
                                        <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                                            Exact Styling
                                        </span>
                                    </div>
                                    <Card
                                        className="border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-4 sm:p-5 gap-2 shadow-sm bg-neutral-50/50"
                                        style={{ borderLeftColor: noticeForm.color }}
                                    >
                                        <CardHeader className="p-0 gap-1">
                                            <span
                                                className="font-semibold uppercase text-[10px] sm:text-xs leading-4 tracking-[3.84px]"
                                                style={{ color: noticeForm.color }}
                                            >
                                                {noticeForm.badge || "Badge / Category"}
                                            </span>
                                            <h3 className="font-bold text-base sm:text-lg leading-7 text-neutral-900">
                                                {noticeForm.title || "Notice Title Will Appear Here"}
                                            </h3>
                                        </CardHeader>
                                        <CardContent className="p-0 gap-2">
                                            <p className="text-[#294868] text-xs sm:text-sm leading-6">
                                                {noticeForm.content ||
                                                    "Notice description content will be previewed here..."}
                                            </p>
                                            <span className="inline-flex font-medium text-[#294868] text-xs leading-4 mt-1 items-center gap-1.5">
                                                <Calendar className="size-3.5" />
                                                {noticeForm.date || "Date"}
                                            </span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>

                            {/* RIGHT: ALL NOTICES INSPECTION LIST (7 Cols on Large) */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="flex justify-between items-center bg-white px-5 py-3 rounded-xl border border-neutral-200 shadow-xs">
                                    <span className="font-bold text-sm text-neutral-700">
                                        Existing Notice Items ({filteredNotices.length})
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        Review and decide what to keep or remove
                                    </span>
                                </div>

                                {filteredNotices.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-neutral-300">
                                        <AlertCircle className="size-12 text-neutral-300 mx-auto mb-3" />
                                        <p className="font-bold text-lg text-neutral-700">
                                            No notice items found
                                        </p>
                                        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                                            {searchQuery
                                                ? "Try clearing your search query to see all items."
                                                : "Use the creation form on the left to add your first notice card!"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredNotices.map((item) => (
                                            <div
                                                key={item.id}
                                                className={`group bg-white rounded-2xl border border-neutral-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden ${noticeForm.id === item.id ? "ring-2 ring-[#DD9808] border-[#DD9808]" : ""}`}
                                            >
                                                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                    {/* Main Notice Info Preview */}
                                                    <div
                                                        className="flex-1 min-w-0 border-l-4 pl-4"
                                                        style={{ borderLeftColor: item.color }}
                                                    >
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span
                                                                className="font-semibold uppercase text-[10px] sm:text-xs tracking-[2px]"
                                                                style={{ color: item.color }}
                                                            >
                                                                {item.badge || item.main_heading_1}
                                                            </span>
                                                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                                <Eye className="size-3" />
                                                                Live
                                                            </span>
                                                        </div>
                                                        <h4 className="font-bold text-base sm:text-lg text-neutral-900 leading-snug">
                                                            {item.title || item.main_heading_2}
                                                        </h4>
                                                        <p className="text-neutral-600 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                                                            {item.content}
                                                        </p>
                                                        <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400 font-medium">
                                                            <span className="inline-flex items-center gap-1">
                                                                <Calendar className="size-3.5" />
                                                                {item.date}
                                                            </span>
                                                            <span>•</span>
                                                            <span>ID: {item.id}</span>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons ("Easy to check what to remove and what to take") */}
                                                    <div className="flex sm:flex-col justify-end items-center sm:items-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                onClick={() => handleDeleteNotice(item.id)}
                                                                className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all cursor-pointer"
                                                                title="Permanently delete this notice"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── SECTION 2: UPCOMING EVENTS CREATION & LIST ─── */}
                {(activeTab === "all" || activeTab === "events") && (
                    <div>
                        <div className="flex items-center gap-3 mb-6 pt-4 border-t border-neutral-200/80">
                            <div className="size-10 rounded-xl bg-[#294868]/10 text-[#294868] flex items-center justify-center">
                                <Calendar className="size-5" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-[#002147] tracking-tight">
                                    Upcoming Events Management
                                </h2>
                                <p className="text-xs sm:text-sm text-neutral-500">
                                    Schedule school events, athletics meets, and competitions
                                    displayed in the right column of the homepage.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            {/* LEFT/TOP: SMART EVENT FORM (5 Cols on Large) */}
                            <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-md border border-neutral-200/80 relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 right-0 h-1.5 transition-colors duration-300"
                                    style={{ backgroundColor: eventForm.color }}
                                />

                                <div className="flex justify-between items-center mb-5">
                                    <h3 className="font-bold text-lg text-neutral-900 flex items-center gap-2">
                                        {isEditingEvent ? (
                                            <>
                                                <Edit3 className="size-4 text-[#DD9808]" />
                                                <span>Edit Event Item</span>
                                            </>
                                        ) : (
                                            <>
                                                <PlusCircle className="size-4 text-[#294868]" />
                                                <span>Schedule New Event</span>
                                            </>
                                        )}
                                    </h3>
                                    {isEditingEvent && (
                                        <button
                                            onClick={resetEventForm}
                                            className="text-xs text-neutral-500 hover:text-neutral-800 underline cursor-pointer font-medium"
                                        >
                                            Cancel Edit
                                        </button>
                                    )}
                                </div>

                                <form onSubmit={handleSaveEvent} className="space-y-4">
                                    {/* Date Input */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            1. Event Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="size-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="date"
                                                value={eventForm.date}
                                                onChange={(e) =>
                                                    setEventForm({
                                                        ...eventForm,
                                                        date: e.target.value,
                                                    })
                                                }
                                                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#294868]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            3. Event Title / Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Annual Athletics Meet, Robo-Quest..."
                                            value={eventForm.title}
                                            onChange={(e) =>
                                                setEventForm({ ...eventForm, title: e.target.value })
                                            }
                                            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm font-bold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#294868]"
                                            required
                                        />
                                    </div>

                                    {/* Venue / Time */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            4. Venue & Time Details
                                        </label>
                                        <div className="relative">
                                            <MapPin className="size-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Venue: Main Stadium, 9:00 AM"
                                                value={eventForm.venue}
                                                onChange={(e) =>
                                                    setEventForm({ ...eventForm, venue: e.target.value })
                                                }
                                                className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#294868]"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Badge Color */}
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1.5">
                                            5. Date Box Badge Color
                                        </label>
                                        <div className="flex items-center gap-2 pt-1">
                                            {COLOR_PRESETS.slice(0, 5).map((cp) => (
                                                <button
                                                    key={cp.hex}
                                                    type="button"
                                                    onClick={() =>
                                                        setEventForm({ ...eventForm, color: cp.hex })
                                                    }
                                                    className={`size-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${eventForm.color === cp.hex
                                                            ? "border-neutral-900 scale-110 shadow-sm"
                                                            : "border-transparent hover:scale-105 opacity-80"
                                                        }`}
                                                    style={{ backgroundColor: cp.hex }}
                                                    title={cp.label}
                                                >
                                                    {eventForm.color === cp.hex && (
                                                        <Check className="size-3.5 text-white" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Event Form fields completed */}

                                    {/* Form Submit Button */}
                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            className={`w-full py-6 rounded-xl font-bold gap-2 text-white shadow-md hover:shadow-lg transition-all cursor-pointer ${isEditingEvent
                                                    ? "bg-[#DD9808] hover:bg-[#c58506]"
                                                    : "bg-[#294868] hover:bg-[#1b344d]"
                                                }`}
                                        >
                                            {isEditingEvent ? (
                                                <>
                                                    <Check className="size-5" />
                                                    <span>Update Event Item</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="size-5" />
                                                    <span>Schedule Event on Homepage</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </form>

                                {/* ─── LIVE PREVIEW BOX (UNDER EVENT FORM) ─── */}
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400">
                                            Live Event Row Preview
                                        </span>
                                        <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full border border-blue-200">
                                            Exact Styling
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-neutral-50/70 p-4 rounded-xl border border-neutral-200/80">
                                        <div
                                            className="size-12 sm:size-14 rounded-xl text-white flex flex-col justify-center items-center shrink-0 shadow-sm transition-colors duration-300"
                                            style={{ backgroundColor: eventForm.color }}
                                        >
                                            {(() => {
                                                const { day, month } = getDayAndMonth(eventForm.date);
                                                return (
                                                    <>
                                                        <span className="font-bold text-base sm:text-lg leading-tight">
                                                            {day}
                                                        </span>
                                                        <span className="font-semibold uppercase text-[10px]">
                                                            {month}
                                                        </span>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm leading-5 text-neutral-900">
                                                {eventForm.title || "Event Title Will Appear Here"}
                                            </h4>
                                            <p className="text-[#294868] text-xs leading-4 mt-0.5">
                                                {eventForm.venue || "Venue and time details..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT: ALL EVENTS INSPECTION LIST (7 Cols on Large) */}
                            <div className="lg:col-span-7 space-y-4">
                                <div className="flex justify-between items-center bg-white px-5 py-3 rounded-xl border border-neutral-200 shadow-xs">
                                    <span className="font-bold text-sm text-neutral-700">
                                        Scheduled Events ({filteredEvents.length})
                                    </span>
                                    <span className="text-xs text-neutral-500">
                                        Review dates and locations
                                    </span>
                                </div>

                                {filteredEvents.length === 0 ? (
                                    <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-neutral-300">
                                        <AlertCircle className="size-12 text-neutral-300 mx-auto mb-3" />
                                        <p className="font-bold text-lg text-neutral-700">
                                            No scheduled events found
                                        </p>
                                        <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                                            {searchQuery
                                                ? "Try clearing your search query to see all events."
                                                : "Use the form on the left to schedule your first upcoming event!"}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredEvents.map((item) => {
                                            const { day, month } = getDayAndMonth(item.date, item.day, item.month);
                                            return (
                                            <div
                                                key={item.id}
                                                className={`group bg-white rounded-2xl border border-neutral-200 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden ${eventForm.id === item.id ? "ring-2 ring-[#DD9808] border-[#DD9808]" : ""}`}
                                            >
                                                <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                    {/* Event Preview Badge & Text */}
                                                    <div className="flex items-center gap-4 min-w-0 flex-1">
                                                        <div
                                                            className="size-14 rounded-xl text-blue-600 flex flex-col justify-center items-center shrink-0 shadow-sm"
                                                            style={{ backgroundColor: item.color }}
                                                        >
                                                            <span className="font-bold text-lg leading-tight">
                                                                {day}
                                                            </span>
                                                            <span className="font-semibold uppercase text-[10px]">
                                                                {month}
                                                            </span>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <h4 className="font-bold text-base sm:text-lg text-neutral-900 truncate">
                                                                    {item.title || item.heading_1}
                                                                </h4>
                                                            </div>
                                                            <p className="text-neutral-600 text-xs sm:text-sm flex items-center gap-1.5 leading-snug">
                                                                <MapPin className="size-3.5 text-[#294868] shrink-0" />
                                                                <span className="truncate">{item.venue}</span>
                                                            </p>
                                                            <div className="flex items-center gap-2 mt-2 text-[11px] text-neutral-400 font-medium">
                                                                <span>ID: {item.id}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex sm:flex-col justify-end items-center sm:items-end gap-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <button
                                                                onClick={() => handleDeleteEvent(item.id)}
                                                                className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-all cursor-pointer"
                                                                title="Permanently delete this event"
                                                            >
                                                                <Trash2 className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ─── QUICK TIPS / HELP GUIDE FOOTER ─── */}
                <div className="mt-12 bg-gradient-to-br from-[#002147]/5 to-[#2F79B8]/10 rounded-2xl p-6 border border-[#2F79B8]/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="size-12 rounded-2xl bg-[#002147] text-[#DD9808] flex items-center justify-center shrink-0 shadow-md">
                        <Info className="size-6" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-base text-[#002147]">
                            How does this Admin Board sync with the live website?
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                            All items created here are saved immediately to your browser's
                            local storage and synced to the homepage. Use the{" "}
                            <strong>"Trash"</strong> button to permanently delete an item.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
