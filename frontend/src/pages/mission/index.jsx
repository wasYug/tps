import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Award, Users, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

const defaultMissionData = {
  hero: {
    title: "Transforming Young Minds into Global Citizens",
    desc: "To be a world-class institution that transforms young minds into global citizens who are intellectually competent, morally upright, and socially committed.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80"
  },
  mission: {
    statement: "We strive to provide a balanced education that promotes critical thinking, fosters creativity, and encourages physical well-being through integrated learning pathways."
  },
  values: [
    { title: "Integrity", tag: "Character First", desc: "We uphold honesty, accountability, and respect in every academic and personal endeavor." },
    { title: "Excellence", tag: "Aim Higher", desc: "We pursue high standards in scholarship, athletics, and the arts through discipline and dedication." },
    { title: "Community", tag: "Belong Together", desc: "We foster belonging, encouragement, and shared responsibility across our entire school family." },
    { title: "Innovation", tag: "Think Forward", desc: "We embrace new ideas and tools that prepare students for a changing, dynamic world." }
  ],
  cta: {
    title: "Your Future Starts Here.",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&w=1920&q=80"
  }
};

export default function MissionPage() {
  const [missionData, setMissionData] = useState(defaultMissionData);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchSiteSettings() {
      try {
        const keysToFetch = [
          "mission_hero_title", "mission_hero_desc", "mission_hero_image",
          "mission_statement"
        ];
        


        const { data: settingsData, error: settingsError } = await supabase
          .from("site_settings")
          .select("key, value")
          .in("key", keysToFetch);

        if (!settingsError && settingsData) {
          const settingsMap = settingsData.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
          }, {});

          setMissionData(prevData => {
            const newData = JSON.parse(JSON.stringify(prevData));
            
            if (settingsMap.mission_hero_title) newData.hero.title = settingsMap.mission_hero_title;
            if (settingsMap.mission_hero_desc) newData.hero.desc = settingsMap.mission_hero_desc;
            if (settingsMap.mission_hero_image) newData.hero.image = settingsMap.mission_hero_image;

            if (settingsMap.mission_statement) newData.mission.statement = settingsMap.mission_statement;

            return newData;
          });
        }
      } catch (err) {
        console.error("Error fetching site settings for mission page:", err);
      }
    }

    fetchSiteSettings();
  }, []);

  return (
    <div className="min-h-screen font-sans bg-zinc-50 flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-20">
        {/* ── Hero Section ──────────────────────────────────────────────────────── */}
        <section className="flex flex-col lg:flex-row min-h-[80vh]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 bg-[#0f2142] text-white p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#294868] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 max-w-xl">
              <div className="w-12 h-1 bg-[#fb2c36] mb-6"></div>
              <p className="text-[#de0a26] font-bold tracking-widest text-sm uppercase mb-4">Our Mission</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-serif leading-tight mb-6">
                {missionData.hero.title}
              </h1>
              <p className="text-lg text-white/80 mb-10 leading-relaxed max-w-md">
                {missionData.hero.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-[#de0a26] hover:bg-[#c40707] text-black font-bold px-8 py-6 rounded-md">
                  <Link to="/about">Explore Our Story</Link>
                </Button>
                <Button asChild variant="outline" className="border-black/30 text-black hover:bg-white/10 px-8 py-6 rounded-md gap-2">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative">
            <img 
              src={missionData.hero.image} 
              alt="Academic Building" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Subtle gradient overlay to blend edges */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f2142]/40 lg:from-[#0f2142] lg:via-transparent to-transparent"></div>
          </div>
        </section>

        {/* ── Mission Section ────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 bg-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-[#fb2c36] font-bold tracking-widest text-sm uppercase mb-4">Our Foundation</p>
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-[#0f2142] mb-10">Our Mission</h2>
            
            <div className="space-y-6 text-[#0f2142] text-xl md:text-2xl leading-relaxed font-serif italic">
              <p>
                "{missionData.mission.statement}"
              </p>
            </div>

            <div className="mt-12">
              <Button 
                onClick={() => document.getElementById('core-values')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline" 
                className="border-[#fb2c36] text-[#fb2c36] hover:bg-[#fb2c36]/5 px-8 py-6 rounded-md gap-2 font-bold uppercase tracking-wider text-sm cursor-pointer"
              >
                Discover Our Core Values <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── Core Values Section ───────────────────────────────────────────────── */}
        <section id="core-values" className="py-24 px-6 bg-zinc-50 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif text-[#0f2142] mb-12 relative inline-block">
              The Core Values of Takshashila
              <div className="absolute -bottom-4 left-0 w-16 h-1 bg-[#fb2c36]"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Integrity */}
              <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#0f2142] rounded-lg flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck className="w-6 h-6 text-[#DD9808]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2142] mb-2">{missionData.values[0].title}</h3>
                <p className="text-[#fb2c36] text-xs font-bold tracking-widest uppercase mb-4">{missionData.values[0].tag}</p>
                <p className="text-gray-600 leading-relaxed">
                  {missionData.values[0].desc}
                </p>
              </div>

              {/* Excellence (Highlighted) */}
              <div className="bg-white p-10 rounded-xl shadow-xl hover:-translate-y-1 transition-transform duration-300 text-white transform lg:scale-105 z-10">
                <div className="w-12 h-12 bg-[#0f2142] rounded-lg flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Award className="w-6 h-6 text-[#DD9808]" />
                </div>
                <h3 className="text-black font-bold text-2xl mb-2">{missionData.values[1].title}</h3>
                <p className="text-[#fb2c36] text-xs font-bold tracking-widest uppercase mb-4">{missionData.values[1].tag}</p>
                <p className="text-black/90 leading-relaxed">
                  {missionData.values[1].desc}
                </p>
              </div>

              {/* Community */}
              <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#0f2142] rounded-lg flex items-center justify-center mb-6 shadow-md">
                  <Users className="w-6 h-6 text-[#DD9808]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2142] mb-2">{missionData.values[2].title}</h3>
                <p className="text-[#fb2c36] text-xs font-bold tracking-widest uppercase mb-4">{missionData.values[2].tag}</p>
                <p className="text-gray-600 leading-relaxed">
                  {missionData.values[2].desc}
                </p>
              </div>

              {/* Innovation */}
              <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-12 h-12 bg-[#0f2142] rounded-lg flex items-center justify-center mb-6 shadow-md">
                  <Lightbulb className="w-6 h-6 text-[#DD9808]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0f2142] mb-2">{missionData.values[3].title}</h3>
                <p className="text-[#fb2c36] text-xs font-bold tracking-widest uppercase mb-4">{missionData.values[3].tag}</p>
                <p className="text-gray-600 leading-relaxed">
                  {missionData.values[3].desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Section ───────────────────────────────────────────────────────── */}
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${missionData.cta.image}')` }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0f2142]/80 z-0 mix-blend-multiply"></div>
          
          <div className="relative z-10 text-center px-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white mb-10 shadow-sm">
              {missionData.cta.title}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-[#fb2c36] hover:bg-[#d6242d] text-white font-bold px-8 py-6 rounded-md text-base">
                <Link to="/admission">Schedule a Tour</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white hover:bg-zinc-100 text-[#0f2142] border-transparent font-bold px-8 py-6 rounded-md text-base">
                <Link to="/contact">Request Info</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
