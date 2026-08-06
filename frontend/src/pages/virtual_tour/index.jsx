import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  MapPin,
  Sparkles,
  Compass,
  Info,
  X,
  List,
  Building2,
  FlaskConical,
  Monitor,
  Trophy,
  ShieldCheck,
  Eye,
  Check
} from "lucide-react";

const locationsData = [
  {
    id: 1,
    name: "Main Gate & Entrance",
    category: "Campus Entrance",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-27_23-50-33.jpg",
    description: "The welcoming portal to our campus, featuring 24/7 security, lush green landscaping, and a safe drop-off zone for students.",
    highlight: "24/7 Monitored Security & Safe Zone",
    icon: Building2
  },
  {
    id: 2,
    name: "Chemistry Laboratory",
    category: "Academic & Labs",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-27_23-53-33.jpg",
    description: "Our state-of-the-art chemistry lab equipped with modern apparatus, fume hoods, and comprehensive safety gear for practical experimentation.",
    highlight: "Advanced Analytical Equipment",
    icon: FlaskConical
  },
  {
    id: 3,
    name: "Computer Science Lab",
    category: "Academic & Labs",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-27_23-53-33%20(1).jpg",
    description: "High-speed workstations with latest educational software, coding environments, and high-speed internet to foster digital literacy and innovation.",
    highlight: "1:1 Student to PC Ratio & High-Speed Wi-Fi",
    icon: Monitor
  },
  {
    id: 4,
    name: "Biology Laboratory",
    category: "Academic & Labs",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-03_21-48-13.jpg",
    description: "Spacious biology lab featuring compound microscopes, 3D anatomical models, and preserved specimens for interactive biological inquiry.",
    highlight: "Interactive 3D Anatomy Models & Specimens",
    icon: FlaskConical
  },
  {
    id: 5,
    name: "Basketball Court",
    category: "Sports & Outdoors",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-27_23-56-54.jpg",
    description: "Professional-grade outdoor basketball court with synthetic all-weather flooring, floodlights, and stadium-style spectator seating.",
    highlight: "All-Weather Synthetic Flooring & Floodlights",
    icon: Trophy
  },
  {
    id: 6,
    name: "Main Sports Ground",
    category: "Sports & Outdoors",
    img: "https://avdmanedgdntxwqosnwy.supabase.co/storage/v1/object/public/School%20Tour/photo_2026-07-27_23-56-54%20(1).jpg",
    description: "A sprawling multi-sport athletics ground supporting football, cricket, and annual track-and-field school championships and outdoor events.",
    highlight: "Multi-Sport Athletics Arena & Track",
    icon: Trophy
  }
];

const categories = ["All", "Campus Entrance", "Academic & Labs", "Sports & Outdoors"];

export default function VirtualTourPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isFading, setIsFading] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const viewerRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Filter locations based on active category
  const filteredLocations = activeCategory === "All"
    ? locationsData
    : locationsData.filter(item => item.category === activeCategory);

  // Ensure current location is valid when category changes
  const currentLocation = locationsData[currentIndex] || locationsData[0];

  // Helper to trigger smooth slide transition
  const goToIndex = useCallback((targetIndex) => {
    if (targetIndex === currentIndex || isFading) return;
    setIsFading(true);
    setImageError(false);
    setTimeout(() => {
      setCurrentIndex(targetIndex);
      setIsFading(false);
    }, 250);
  }, [currentIndex, isFading]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % locationsData.length;
    goToIndex(nextIdx);
  }, [currentIndex, goToIndex]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + locationsData.length) % locationsData.length;
    goToIndex(prevIdx);
  }, [currentIndex, goToIndex]);

  // Handle category tab change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category !== "All") {
      const firstInCategory = locationsData.findIndex(item => item.category === category);
      if (firstInCategory !== -1 && locationsData[currentIndex]?.category !== category) {
        goToIndex(firstInCategory);
      }
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        handleNext();
      }, 4500);
    } else {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => clearInterval(autoPlayTimerRef.current);
  }, [autoPlay, handleNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && isDirectoryOpen) setIsDirectoryOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, isDirectoryOpen]);

  // Fullscreen listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="bg-[#f8faf4] min-h-screen flex flex-col font-sans text-neutral-800 antialiased selection:bg-[#2f79b8]/20 selection:text-[#2f79b8]">
      {/* Navbar */}
      <Navbar theme="light" />

      {/* Main Container */}
      <main className="flex-1 pt-24 md:pt-32 pb-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2f79b8]/10 text-[#2f79b8] font-semibold text-xs tracking-wide uppercase">
            <Compass className="size-4 animate-spin-slow" />
            <span>Interactive Campus Tour</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#294868] tracking-tight">
            Explore Our World-Class Campus
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Step inside TPS and experience our vibrant academic atmosphere, cutting-edge laboratories, and premier athletic facilities from anywhere.
          </p>
        </section>

        {/* Category Filter Pills */}
        <section className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm ${
                  isActive
                    ? "bg-[#2f79b8] text-white shadow-[#2f79b8]/30 scale-105"
                    : "bg-white text-[#294868] hover:bg-neutral-100 border border-neutral-200/70"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </section>

        {/* Main Virtual Tour Stage Card */}
        <section 
          ref={viewerRef}
          className={`relative bg-[#131e33] rounded-3xl overflow-hidden shadow-2xl border border-neutral-800/40 transition-all duration-300 ${
            isFullscreen ? "rounded-none w-screen h-screen flex flex-col justify-between" : "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] min-h-[420px] max-h-[720px]"
          }`}
        >
          {/* Top Auto-Play Progress Bar */}
          {autoPlay && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/40 z-30">
              <div className="h-full bg-[#dd9808] animate-pulse transition-all duration-500" style={{ width: "100%" }} />
            </div>
          )}

          {/* Photo Display / Fallback */}
          <div className="absolute inset-0 bg-[#1c2b45] flex items-center justify-center">
            {!imageError ? (
              <img
                src={currentLocation.img}
                alt={currentLocation.name}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover transition-all duration-300 transform ${
                  isFading ? "opacity-0 scale-105 blur-sm" : "opacity-100 scale-100 blur-0"
                }`}
              />
            ) : (
              <div className="text-center p-8 bg-[#131e33]/90 border-2 border-dashed border-[#dd9808]/40 rounded-2xl max-w-md mx-4">
                <Compass className="size-12 text-[#dd9808] mx-auto mb-3 opacity-80 animate-bounce" />
                <h3 className="text-xl font-bold text-white mb-1">Photo Unavailable</h3>
                <p className="text-sm text-neutral-300">
                  We couldn't load the preview for <span className="text-[#dd9808] font-semibold">{currentLocation.name}</span>.
                </p>
              </div>
            )}
          </div>

          {/* Scrim Overlays for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131e33] via-[#131e33]/30 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#131e33]/60 via-transparent to-transparent h-32 pointer-events-none z-10" />

          {/* Top Bar Controls (inside stage) */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex items-center justify-between pointer-events-auto">
            {/* Location Pill & Counter */}
            <div className="flex items-center gap-2.5 bg-[#131e33]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-white shadow-lg">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dd9808] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dd9808]"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                {currentLocation.category}
              </span>
              <span className="text-neutral-500">|</span>
              <span className="text-xs font-mono font-bold text-[#dd9808]">
                {String(currentIndex + 1).padStart(2, "0")} / {String(locationsData.length).padStart(2, "0")}
              </span>
            </div>

            {/* Action Buttons (AutoPlay, Fullscreen, Directory) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                title={autoPlay ? "Pause Auto-Play" : "Start Auto-Play"}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold backdrop-blur-md transition-all border shadow-lg ${
                  autoPlay
                    ? "bg-[#dd9808] text-neutral-950 border-[#dd9808] shadow-[#dd9808]/20"
                    : "bg-[#131e33]/70 text-white border-white/15 hover:bg-[#1c2b45]"
                }`}
              >
                {autoPlay ? <Pause className="size-3.5" /> : <Play className="size-3.5 fill-current" />}
                <span className="hidden sm:inline">{autoPlay ? "Playing" : "Auto-Tour"}</span>
              </button>

              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                className="p-2 rounded-xl bg-[#131e33]/70 hover:bg-[#1c2b45] text-white border border-white/15 backdrop-blur-md transition-all shadow-lg"
              >
                {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
              </button>

              <button
                onClick={() => setIsDirectoryOpen(true)}
                title="Open Location Directory"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#2f79b8] hover:bg-[#256193] text-white font-semibold text-xs shadow-lg shadow-[#2f79b8]/30 transition-all"
              >
                <List className="size-3.5" />
                <span className="hidden sm:inline">All Stops</span>
              </button>
            </div>
          </div>

          {/* Center Navigation Arrows */}
          <div className="absolute inset-y-0 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              aria-label="Previous location"
              className="pointer-events-auto size-11 sm:size-14 rounded-full bg-[#131e33]/70 hover:bg-[#2f79b8] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl group"
            >
              <ChevronLeft className="size-6 sm:size-7 transition-transform group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next location"
              className="pointer-events-auto size-11 sm:size-14 rounded-full bg-[#131e33]/70 hover:bg-[#2f79b8] text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl group"
            >
              <ChevronRight className="size-6 sm:size-7 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Bottom Location Details Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 z-20 pointer-events-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#dd9808] font-medium text-xs sm:text-sm bg-[#dd9808]/15 border border-[#dd9808]/30 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                <Sparkles className="size-3.5" />
                <span>{currentLocation.highlight}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
                {currentLocation.name}
              </h2>
              <p className="text-sm sm:text-base text-neutral-200/90 leading-relaxed drop-shadow max-w-xl">
                {currentLocation.description}
              </p>
            </div>

            {/* Quick Next/Prev Indicator on Desktop */}
            <div className="hidden lg:flex flex-col items-end text-right shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider font-semibold mb-1">
                Next Stop
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                {locationsData[(currentIndex + 1) % locationsData.length].name}
                <ChevronRight className="size-4 text-[#dd9808]" />
              </span>
            </div>
          </div>
        </section>

        {/* Interactive Bottom Thumbnails Carousel */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Eye className="size-4 text-[#2f79b8]" />
              <span>Select a Stop ({filteredLocations.length})</span>
            </h3>
            <span className="text-xs text-neutral-400 font-medium">Use arrow keys ◄ ► to navigate</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {filteredLocations.map((item) => {
              const actualIndex = locationsData.findIndex(loc => loc.id === item.id);
              const isSelected = actualIndex === currentIndex;
              const IconComponent = item.icon || Building2;

              return (
                <button
                  key={item.id}
                  onClick={() => goToIndex(actualIndex)}
                  className={`group relative rounded-2xl overflow-hidden aspect-[4/3] text-left transition-all duration-200 border-2 ${
                    isSelected
                      ? "border-[#2f79b8] ring-4 ring-[#2f79b8]/20 shadow-lg scale-[1.02] bg-[#294868]"
                      : "border-transparent hover:border-neutral-300 shadow bg-neutral-900 opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top category indicator icon */}
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-white/80">
                    <IconComponent className="size-3.5" />
                  </div>

                  {/* Active Badge */}
                  {isSelected && (
                    <div className="absolute top-2 left-2 bg-[#2f79b8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                      <Check className="size-2.5 stroke-[3]" />
                      <span>Viewing</span>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-xs font-bold text-white truncate drop-shadow">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-[#dd9808] font-medium truncate">
                      {String(actualIndex + 1).padStart(2, "0")} • {item.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Facility Highlights Grid / Why TPS Infrastructure */}
        <section className="pt-8 border-t border-neutral-200">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#294868]">
              Designed for Excellence &amp; Holistic Growth
            </h2>
            <p className="text-sm sm:text-base text-neutral-600">
              Our infrastructure is thoughtfully constructed to provide a secure, inspiring, and engaging environment for every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="size-12 rounded-2xl bg-[#2f79b8]/10 text-[#2f79b8] flex items-center justify-center font-bold">
                <FlaskConical className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#294868]">Modern Laboratories</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Spacious physics, chemistry, biology, and computer labs designed to encourage hands-on discovery and safety-first experimentation.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="size-12 rounded-2xl bg-[#dd9808]/10 text-[#dd9808] flex items-center justify-center font-bold">
                <Trophy className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#294868]">Championship Athletics</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Dedicated synthetic basketball courts, sprawling multi-sport grounds, and indoor facilities designed to nurture teamwork and fitness.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-200/70 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="size-12 rounded-2xl bg-[#294868]/10 text-[#294868] flex items-center justify-center font-bold">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-[#294868]">24/7 Monitored Campus</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Comprehensive security protocols, perimeter surveillance, and trained staff ensuring peace of mind and safety for all students and visitors.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Directory Slide-Over Drawer */}
      {isDirectoryOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsDirectoryOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#131e33] text-white shadow-2xl flex flex-col justify-between border-l border-neutral-800 animate-slide-left">
              
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#1c2b45]">
                <div className="flex items-center gap-2">
                  <Compass className="size-5 text-[#dd9808]" />
                  <h3 className="font-bold text-lg text-white">Campus Directory</h3>
                </div>
                <button
                  onClick={() => setIsDirectoryOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Drawer List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                <p className="text-xs uppercase font-semibold text-neutral-400 tracking-wider mb-2">
                  Select a location to visit
                </p>
                {locationsData.map((item, idx) => {
                  const isSelected = idx === currentIndex;
                  const IconComp = item.icon || Building2;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        goToIndex(idx);
                        setIsDirectoryOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 p-3 rounded-2xl border text-left transition-all duration-200 ${
                        isSelected
                          ? "bg-[#2f79b8] border-[#2f79b8] text-white shadow-lg shadow-[#2f79b8]/20"
                          : "bg-[#1c2b45]/60 border-white/5 hover:bg-[#1c2b45] text-neutral-200"
                      }`}
                    >
                      <div className="relative size-14 rounded-xl overflow-hidden shrink-0 bg-black/40">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#2f79b8]/40 flex items-center justify-center">
                            <Check className="size-5 text-white drop-shadow" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] font-mono font-bold text-[#dd9808] bg-[#dd9808]/15 px-1.5 py-0.5 rounded">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-xs text-neutral-400 truncate">{item.category}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                      </div>

                      <ChevronRight className={`size-4 shrink-0 ${isSelected ? "text-white" : "text-neutral-500"}`} />
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-white/10 bg-[#1c2b45]/40 text-center">
                <p className="text-xs text-neutral-400">
                  Welcome to Tagore Public School Campus
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}
