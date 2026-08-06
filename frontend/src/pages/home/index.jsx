import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookMarked,
  Calendar,
  ChevronRight,
  Compass,
  FileText,
  Globe,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  Microscope,
  Phone,
  Quote,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import TakshashilaLoader from "@/components/loader";

import { WorldMapGraphic } from "./utils.jsx";

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

export default function App() {
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNoticeboardAndEvents() {
      try {
        const { data: noticesData, error: noticesError } = await supabase
          .from("noticeboard")
          .select("*")
          .order("id", { ascending: false });

        if (!noticesError && noticesData) {
          setNotices(noticesData);
        } else if (noticesError) {
          console.error("Error fetching noticeboard:", noticesError);
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
        } else if (eventsError) {
          console.error("Error fetching events:", eventsError);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchNoticeboardAndEvents();
  }, []);

  return (
    <div>
      <TakshashilaLoader ready={!loading} />
      <div className="bg-white text-neutral-950 w-full min-h-screen">
        <Navbar />

        {/* ─── HERO ─── */}
        <section className="relative w-full h-[520px] sm:h-[600px] lg:h-[650px] xl:h-[730px] overflow-hidden">
          <video
            src="/video.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="bg-[linear-gradient(90deg,oklch(0.294_0.08_250/.95)_0%,oklch(0.294_0.08_250/.75)_10%,oklch(0.294_0.08_250/.30)_60%)] absolute inset-0" />
          <div className="relative max-w-[1140px] flex mx-auto px-4 sm:px-6 lg:px-8 flex-col justify-center h-full">
            <span className="inline-flex shadow-sm font-semibold uppercase rounded-full bg-[#2F79B8] text-white text-[10px] sm:text-xs leading-4 tracking-[2px] sm:tracking-[3.84px] mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 items-center gap-2 w-fit">
              <Sparkles className="size-3 sm:size-3.5" />
              Established 1999
            </span>
            <h1 className="max-w-xs sm:max-w-xl lg:max-w-2xl font-bold text-white text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
              Shaping Future Leaders
            </h1>
            <p className="max-w-xs sm:max-w-md lg:max-w-xl text-white/80 text-sm sm:text-base leading-6 sm:leading-7 mt-3 sm:mt-4">
              Empowering students through a rigorous academic curriculum,
              state-of-the-art facilities, and a steadfast commitment to moral
              integrity.
            </p>
            <div className="flex flex-col sm:flex-row mt-6 sm:mt-8 items-start sm:items-center gap-3 sm:gap-4">
              <Button
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
                className="bg-[#2F79B8] hover:bg-[#205b8e] text-white gap-2 w-full sm:w-auto cursor-pointer transition-colors duration-300"
              >
                <Compass className="size-4" />
                Explore More
              </Button>
              <Link to="/magazine">
                <Button
                  className="bg-transparent hover:bg-white/15 text-white border-white/30 hover:border-white/60 border border-solid gap-2 w-full sm:w-auto cursor-pointer transition-all duration-300"
                  variant="outline"
                >
                  <BookMarked className="size-4" />
                  School Magazine
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── STATS BAR ─── */}
        <section className="bg-[#F8FAF4] border-b border-neutral-200 border-solid">
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6">
            <div className="flex flex-col items-center gap-1">
              <span className="font-bold text-[#2F79B8] text-3xl sm:text-4xl leading-10">
                7,000+
              </span>
              <span className="font-medium uppercase text-[#294868] text-[10px] sm:text-xs leading-4 tracking-[2px] sm:tracking-[3.84px]">
                Students
              </span>
            </div>
            <div className="sm:border-l border-neutral-200 border-solid flex flex-col items-center gap-1">
              <span className="font-bold text-[#2F79B8] text-3xl sm:text-4xl leading-10">
                150+
              </span>
              <span className="font-medium uppercase text-[#294868] text-[10px] sm:text-xs leading-4 tracking-[2px] sm:tracking-[3.84px]">
                Faculty
              </span>
            </div>
            <div className="sm:border-l border-neutral-200 border-solid flex flex-col items-center gap-1">
              <span className="font-bold text-[#2F79B8] text-3xl sm:text-4xl leading-10">
                10
              </span>
              <span className="font-medium uppercase text-[#294868] text-[10px] sm:text-xs leading-4 tracking-[2px] sm:tracking-[3.84px]">
                Global Labs
              </span>
            </div>
            <div className="sm:border-l border-neutral-200 border-solid flex flex-col items-center gap-1">
              <span className="font-bold text-[#2F79B8] text-3xl sm:text-4xl leading-10">
                150+
              </span>
              <span className="font-medium uppercase text-[#294868] text-[10px] sm:text-xs leading-4 tracking-[2px] sm:tracking-[3.84px]">
                Achievements
              </span>
            </div>
          </div>
        </section>

        {/* ─── LEGACY / ABOUT ─── */}
        <section className="bg-[#F8FAF4]">
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 items-center gap-8 lg:gap-12">
            <div className="relative">
              <div className="size-16 sm:size-24 rounded-2xl bg-[#95BAD4]/30 absolute -left-2 sm:-left-4 -top-2 sm:-top-4" />
              <img
                src="https://images.unsplash.com/photo-1723186051621-5c9de14e1a1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwY2xhc3Nyb29tJTIwYmxhY2slMjBhbmQlMjB3aGl0ZSUyMHZpbnRhZ2V8ZW58MXwyfHx8MTc4MTcxNTQ3OHww&ixlib=rb-4.1.0&q=80&w=800"
                alt="Students studying"
                className="relative aspect-square object-cover grayscale rounded-2xl w-full"
                data-photoid="T1Y9W3ogL9A"
                data-authorname="Khang Nguyen"
                data-authorurl="https://unsplash.com/@kivamyth"
                data-blurhash="LB7Lift.WCs9.9tSW=niHqoJbbae"
              />
            </div>
            <div>
              <span className="font-semibold uppercase text-[#de0a26] text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                Our Legacy
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2">
                An Institution of Academic Prowess
              </h2>
              <p className="text-[#294868] text-sm sm:text-base leading-6 sm:leading-7 mt-4">
                Takshashila stands as a beacon of excellence, blending
                traditional values with cutting-edge pedagogy. Our mission is to
                foster an environment where curiosity meets discipline, creating
                thinkers who are ready to lead on a global stage.
              </p>
              <a
                className="inline-flex font-semibold uppercase text-[#C22715] text-xs sm:text-sm leading-5 tracking-[2px] sm:tracking-[3.84px] mt-5 sm:mt-6 items-center gap-2"
                href="#"
              >
                <span>Read Our Mission</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ─── MILESTONES / STATS CARDS ─── */}
        <section className="bg-[#95BAD4]/20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 items-stretch gap-8">
              {/* Left col – tagline */}
              <div className="lg:col-span-1 flex flex-col justify-center text-center lg:text-left">
                <span className="font-semibold uppercase text-[#DD9808] text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                  A Milestone Of Trust
                </span>
                <div className="items-baseline flex mt-4 gap-2 justify-center lg:justify-start">
                  <span className="font-bold text-[#C22715] text-6xl sm:text-7xl leading-none">
                    26
                  </span>
                  <span className="font-bold text-neutral-950 text-xl sm:text-2xl leading-8">
                    Years
                  </span>
                </div>
                <p className="font-semibold text-base sm:text-lg leading-7 mt-2">{`Of Legacy & Excellence`}</p>
                <p className="text-[#294868] text-xs sm:text-sm leading-6 mt-3">
                  Since 1999, we have nurtured generations of curious minds into
                  confident achievers, shaping a community built on knowledge
                  and integrity.
                </p>
              </div>

              {/* Right col – 6 cards */}
              <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  {
                    icon: Award,
                    color: "#2F79B8",
                    bg: "#2F79B8",
                    val: "98%",
                    label: "Board Success Rate",
                    desc: "Consistent academic distinction across all examination boards.",
                  },
                  {
                    icon: Globe,
                    color: "#DD9808",
                    bg: "#DD9808",
                    val: "40+",
                    label: "Global Tie-ups",
                    desc: "International exchange and collaboration programs worldwide.",
                  },
                  {
                    icon: GraduationCap,
                    color: "#C22715",
                    bg: "#C22715",
                    val: "12K+",
                    label: "Proud Alumni",
                    desc: "A growing network of leaders across diverse industries.",
                  },
                  {
                    icon: Trophy,
                    color: "#DD9808",
                    bg: "#DD9808",
                    val: "320+",
                    label: "National Awards",
                    desc: "Recognized for academic and extracurricular excellence.",
                  },
                  {
                    icon: Microscope,
                    color: "#2F79B8",
                    bg: "#2F79B8",
                    val: "25",
                    label: "Research Labs",
                    desc: "Equipped for hands-on STEM and innovation projects.",
                  },
                  {
                    icon: HeartHandshake,
                    color: "#C22715",
                    bg: "#C22715",
                    val: "100%",
                    label: "Parent Trust",
                    desc: "A legacy of confidence built over two and a half decades.",
                  },
                ].map(({ icon: Icon, color, bg, val, label, desc }) => (
                  <Card key={label} className="p-4 sm:p-6 gap-3 sm:gap-4">
                    <CardHeader className="p-0 gap-2">
                      <div
                        className={`size-9 sm:size-11 rounded-xl flex justify-center items-center`}
                        style={{ background: `${bg}1A`, color }}
                      >
                        <Icon className="size-4 sm:size-5" />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 gap-2">
                      <p className="font-bold text-[#2F79B8] text-2xl sm:text-3xl leading-9">
                        {val}
                      </p>
                      <p className="font-semibold text-xs sm:text-sm leading-5">
                        {label}
                      </p>
                      <p className="text-[#294868] text-xs leading-5 hidden sm:block">
                        {desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── INFRASTRUCTURE ─── */}
        <section className="bg-[#F8FAF4]">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col items-center">
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-center">
                World-Class Infrastructure
              </h2>
              <div className="rounded-full bg-[#DD9808] mt-3 w-12 sm:w-16 h-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 sm:gap-6">
              {/* Smart Classes – wide on large */}
              <div className="relative sm:col-span-2 lg:col-span-2 rounded-2xl h-48 sm:h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNsYXNzcm9vbSUyMG1vZGVybiUyMGludGVyYWN0aXZlJTIwdGVjaG5vbG9neXxlbnwxfDB8fHwxNzgxNzE1NDg4fDA&ixlib=rb-4.1.0&q=80&w=900"
                  alt="Smart Classes"
                  className="object-cover w-full h-full"
                />
                <div className="bg-[linear-gradient(0deg,oklch(0.294_0.08_250/.85)_0%,transparent_70%)] absolute inset-0" />
                <div className="absolute left-0 bottom-0 p-4 sm:p-6">
                  <h3 className="font-bold text-white text-lg sm:text-xl leading-7">
                    Smart Classes
                  </h3>
                  <p className="uppercase text-white/70 text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                    Digitally Integrated Learning
                  </p>
                </div>
              </div>
              {[
                {
                  src: "https://images.unsplash.com/photo-1684259498900-afdea87b1a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnRzJTIwZXhwZXJpbWVudHxlbnwxfDB8fHwxNzgxNzE1NDc4fDA&ixlib=rb-4.1.0&q=80&w=600",
                  alt: "Science Labs",
                  title: "Science Labs",
                  sub: "Experimental Discovery",
                },
                {
                  src: "https://images.unsplash.com/photo-1569653402334-2e98fbaa80ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMHRlY2hub2xvZ3klMjBzdHVkZW50c3xlbnwxfDB8fHwxNzgxNzE1NDc4fDA&ixlib=rb-4.1.0&q=80&w=600",
                  alt: "Computer Lab",
                  title: "Computer Lab",
                  sub: "Computing Excellence",
                },
                {
                  src: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwZm9vdGJhbGwlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfDB8fHwxNzgxNzE1NDc4fDA&ixlib=rb-4.1.0&q=80&w=600",
                  alt: "Sports Academy",
                  title: "Sports Academy",
                  sub: "Physical Excellence",
                },
                {
                  src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzJTIwZ3JhbmR8ZW58MXwwfHx8MTc4MTcxNTQ3OHww&ixlib=rb-4.1.0&q=80&w=600",
                  alt: "Library",
                  title: "Library",
                  sub: "Resource Hub",
                },
              ].map(({ src, alt, title, sub }) => (
                <div
                  key={alt}
                  className="relative rounded-2xl h-48 sm:h-56 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                  />
                  <div className="bg-[linear-gradient(0deg,oklch(0.294_0.08_250/.85)_0%,transparent_70%)] absolute inset-0" />
                  <div className="absolute left-0 bottom-0 p-4 sm:p-6">
                    <h3 className="font-bold text-white text-lg sm:text-xl leading-7">
                      {title}
                    </h3>
                    <p className="uppercase text-white/70 text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                      {sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 sm:mt-10">
              <Link to="/infra">
                <Button className="bg-[#de0a26] hover:bg-[#c0071e] text-white font-semibold gap-2 px-6 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                  <span>Explore Infrastructure</span>
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── NOTICE BOARD + EVENTS ─── */}
        <section className="bg-[#95BAD4]/20">
          <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 gap-8">
            {/* Notice Board */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl sm:text-3xl leading-9 tracking-tight">
                  Notice Board
                </h2>
              </div>
              <div
                className={`flex mt-6 flex-col gap-4 ${
                  notices.length > 2
                    ? "max-h-[380px] overflow-y-auto pr-2"
                    : ""
                }`}
              >
                {notices.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No notices at this time.</p>
                ) : (
                  notices.map((notice) => (
                    <Card
                      key={notice.id}
                      className="border-t-0 border-r-0 border-b-0 border-l-4 border-solid p-4 sm:p-6 gap-2 transition-all hover:shadow-md"
                      style={{ borderLeftColor: notice.color || "#2F79B8" }}
                    >
                      <CardHeader className="p-0 gap-1">
                        <span
                          className="font-semibold uppercase text-[10px] sm:text-xs leading-4 tracking-[3.84px]"
                          style={{ color: notice.color || "#de0a26" }}
                        >
                          {notice.main_heading_1}
                        </span>
                        <h3 className="font-bold text-base sm:text-lg leading-7">
                          {notice.main_heading_2}
                        </h3>
                      </CardHeader>
                      <CardContent className="p-0 gap-2">
                        <p className="text-[#294868] text-xs sm:text-sm leading-6">
                          {notice.content}
                        </p>
                        {notice.date && (
                          <span className="inline-flex font-medium text-[#294868] text-xs leading-4 mt-1 items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            {notice.date}
                          </span>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="font-bold text-2xl sm:text-3xl leading-9 tracking-tight">
                Upcoming Events
              </h2>
              <div
                className={`flex mt-6 flex-col gap-4 ${
                  events.length > 4
                    ? "max-h-[300px] overflow-y-auto pr-2"
                    : ""
                }`}
              >
                {events.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No upcoming events scheduled.</p>
                ) : (
                  events.map((ev) => {
                    const { day, month } = getDayAndMonth(ev.date, ev.day, ev.month);
                    return (
                      <div key={ev.id} className="flex items-center gap-4 transition-all hover:translate-x-1">
                        <div
                          className="size-12 sm:size-14 rounded-xl text-white flex flex-col justify-center items-center shrink-0 shadow-sm"
                          style={{ backgroundColor: ev.color || "#2F79B8" }}
                        >
                          <span className="font-bold text-base sm:text-lg leading-tight">
                            {day}
                          </span>
                          <span className="font-semibold uppercase text-[10px]">
                            {month}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm leading-5">
                            {ev.heading_1}
                          </h4>
                          <p className="text-[#294868] text-xs leading-4 mt-0.5">
                            {ev.venue}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── NEWS SECTION ─── */}
        <section className="relative overflow-hidden bg-[#002147] text-[#ffffff]">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 size-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 size-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
              {/* Map Graphic (Left 5 Cols) */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <WorldMapGraphic />
              </div>

              {/* News Panel (Right 7 Cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="space-y-2">
                  <h2 className="font-extrabold text-[#ffffff] text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
                    NEWS
                  </h2>
                  <p className="text-[#ffffff] text-sm sm:text-base leading-6 font-medium">
                    Stay updated with latest NEWS
                  </p>
                  <div className="w-12 h-1 bg-[#DD9808] rounded-full mt-2" />
                </div>

                {/* Newspaper Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  {/* Card 1 */}
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden p-4 bg-[#95BAD4]/5 flex justify-center items-center">
                      <img
                        src="/news_clipping1.png"
                        alt="UHET Scholarship application"
                        className="w-full h-full object-cover rounded-xl shadow-sm border border-neutral-200 group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="px-5 py-4.5 bg-white border-t border-neutral-100">
                      <h3 className="font-bold text-[#1b344d] text-sm sm:text-base hover:text-[#2F79B8] transition-colors leading-snug line-clamp-1">
                        UHET Scholarship application ...
                      </h3>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-black/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="aspect-[4/3] overflow-hidden p-4 bg-[#95BAD4]/5 flex justify-center items-center">
                      <img
                        src="/news_clipping2.png"
                        alt="STARS DAY 2026"
                        className="w-full h-full object-cover rounded-xl shadow-sm border border-neutral-200 group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </div>
                    <div className="px-5 py-4.5 bg-white border-t border-neutral-100">
                      <h3 className="font-bold text-[#1b344d] text-sm sm:text-base hover:text-[#2F79B8] transition-colors leading-snug line-clamp-1">
                        STARS DAY – 2026
                      </h3>
                    </div>
                  </div>
                </div>

                {/* View All */}
                <div className="mt-8 flex justify-start">
                  <Link
                    to="/gallery"
                    onClick={() => window.scrollTo(0, 0)}
                    className="inline-flex items-center gap-1.5 font-bold uppercase text-[#DD9808] hover:text-[#a66b06] text-xs sm:text-sm tracking-wider transition-colors duration-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD9808] focus-visible:ring-offset-2"
                  >
                    <span>View All</span>
                    <ChevronRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRINCIPAL ─── */}
        <section className="bg-[#F8FAF4]">
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 items-center gap-8 lg:gap-12">
            <div className="order-2 md:order-1">
              <span className="font-semibold uppercase text-[#de0a26] text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                From The Principal's Desk
              </span>
              <blockquote className="italic font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-4">
                "Education is not just about teaching, it's about igniting a
                flame."
              </blockquote>
              <p className="text-[#294868] text-xs sm:text-sm leading-6 mt-5 sm:mt-6">
                At Takshashila, we believe that every child is a unique universe
                waiting to be explored. Our commitment is to provide a
                scaffolding of support, knowledge, and moral ethics that allows
                them to ascend to their highest potential. Welcome to a legacy
                of learning.
              </p>
              <div className="mt-5 sm:mt-6">
                <p className="font-bold text-sm sm:text-base leading-6">
                  Mr. Prakhar Khandelwal
                </p>
                <p className="uppercase text-[#294868] text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                  Educated From Vellore Institute Of Technology
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="relative">
                <div className="size-20 sm:size-32 rounded-2xl bg-[#95BAD4]/30 absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-4" />
                <img
                  src="/prakhar_khandelwal.jpeg"
                  alt="Principal"
                  className="relative object-cover rounded-2xl w-56 sm:w-72 h-72 sm:h-96"
                  data-authorname="LinkedIn Sales Solutions"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ─── CAMPUS LIFE ─── */}
        <section className="bg-[#95BAD4]/20">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-bold text-2xl sm:text-4xl leading-tight tracking-tight">
                  Campus Life
                </h2>
                <p className="text-[#294868] text-xs sm:text-sm leading-5 mt-2">
                  Glimpses into the daily rhythm of Takshashila.
                </p>
              </div>
              <Button className="size-10 sm:size-12 bg-[#2F79B8] text-white p-0">
                <LayoutGrid className="size-4 sm:size-5" />
              </Button>
            </div>
            {/* Photo grid – different layouts per screen */}
            <div className="grid grid-cols-2 sm:grid-cols-4 mt-6 sm:mt-8 gap-3 sm:gap-4">
              <div className="relative col-span-2 row-span-2 rounded-2xl overflow-hidden min-h-[160px] sm:min-h-[288px]">
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzY2hvb2wlMjBzdHVkZW50cyUyMGdyYWR1YXRpb24lMjBjZWxlYnJhdGlvbnxlbnwxfDB8fHwxNzgxNzE1NDg4fDA&ixlib=rb-4.1.0&q=80&w=900"
                  alt="Graduation"
                  className="object-cover w-full h-full"
                />
              </div>
              {[
                {
                  src: "https://images.unsplash.com/photo-1556056504-5c7696c4c28d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtJTIwZm9vdGJhbGwlMjBmaWVsZCUyMGFlcmlhbHxlbnwxfDB8fHwxNzgxNzE1NDc4fDA&ixlib=rb-4.1.0&q=80&w=400",
                  alt: "Sports",
                },
                {
                  src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzJTIwZ3JhbmR8ZW58MXwwfHx8MTc4MTcxNTQ3OHww&ixlib=rb-4.1.0&q=80&w=400",
                  alt: "Library",
                },
                {
                  src: "https://images.unsplash.com/photo-1684259498900-afdea87b1a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMHN0dWRlbnRzJTIwZXhwZXJpbWVudHxlbnwxfDB8fHwxNzgxNzE1NDc4fDA&ixlib=rb-4.1.0&q=80&w=400",
                  alt: "Science",
                },
                {
                  src: "https://images.unsplash.com/photo-1763890763432-17c9a529da20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxzY2hvb2wlMjBjYW1wdXMlMjB0cmVlJTIwcGF0aHdheSUyMHN0dWRlbnRzJTIwd2Fsa2luZ3xlbnwxfDF8fHwxNzgxNzE1NDg4fDA&ixlib=rb-4.1.0&q=80&w=400",
                  alt: "Campus",
                },
              ].map(({ src, alt }) => (
                <div
                  key={alt}
                  className="relative rounded-2xl h-[80px] sm:h-36 overflow-hidden"
                >
                  <img
                    src={src}
                    alt={alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="bg-[#F8FAF4]">
          <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col items-center text-center">
              <span className="font-semibold uppercase text-[#DD9808] text-[10px] sm:text-xs leading-4 tracking-[3.84px]">
                Voice Of The Community
              </span>
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight mt-2">
                Why Families Choose Us
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-4 sm:gap-6">
              {[
                {
                  initials: "SM",
                  color: "#2F79B8",
                  name: "Suresh Menon",
                  role: "Parent Of Grade 10 Student",
                  quote:
                    '"The emphasis on robotics and AI at Takshashila has given my son a clear path towards his future career. The facilities are truly world-class."',
                },
                {
                  initials: "RT",
                  color: "#294868",
                  name: "Dr. Ritu Taneja",
                  role: "Academic Expert",
                  quote:
                    '"As an educator, I appreciate the holistic approach here. It\'s not just about marks, but about developing the character and critical thinking of every child."',
                },
                {
                  initials: "AK",
                  color: "#294868",
                  name: "Ananya Kapoor",
                  role: "Student Council President",
                  quote:
                    "\"The school's atmosphere is incredibly supportive. I've grown so much as a person through the sports and leadership programs offered here.\"",
                },
              ].map(({ initials, color, name, role, quote }) => (
                <Card key={name} className="p-5 sm:p-6 gap-4">
                  <CardHeader className="p-0 gap-2">
                    <Quote className="size-5 sm:size-6 text-[#2F79B8]" />
                  </CardHeader>
                  <CardContent className="p-0 gap-4">
                    <p className="text-[#294868] text-xs sm:text-sm leading-5 sm:leading-6">
                      {quote}
                    </p>
                    <div className="border-neutral-200 border-t border-solid flex pt-4 items-center gap-3">
                      <div
                        className="size-9 sm:size-10 font-bold rounded-full text-white text-xs leading-4 flex justify-center items-center shrink-0"
                        style={{ background: color }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-xs sm:text-sm leading-5">
                          {name}
                        </p>
                        <p className="text-[#294868] text-[10px] sm:text-xs leading-4">
                          {role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BANNER ─── */}
        <section className="bg-[#C22715]">
          <div className="max-w-[1140px] flex flex-col sm:flex-row mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 justify-between items-start sm:items-center gap-6">
            <div>
              <h2 className="font-bold text-white text-2xl sm:text-3xl leading-tight">
                Begin Your Journey With Takshashila
              </h2>
              <p className="text-white/80 text-xs sm:text-sm leading-5 mt-2">
                Admissions for 2026-27 are now open. Secure your child's future
                today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <Link to="/admission" className="w-full sm:w-auto">
                <Button className="bg-white hover:bg-neutral-100 text-[#294868] gap-2 w-full cursor-pointer transition-colors">
                  <FileText className="size-4" />
                  Apply Now
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  className="bg-transparent hover:bg-white/10 text-white border-white/40 hover:border-white/70 border border-solid gap-2 w-full cursor-pointer transition-colors"
                  variant="outline"
                >
                  <Phone className="size-4" />
                  Schedule a Visit
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
