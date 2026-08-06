import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PdfViewer from "@/components/PdfViewer";
import Loader from "@/components/loader";
import { supabase } from "@/lib/supabase";
import { forceDownload } from "@/lib/utils";

import {
  BookOpen,
  Download,
  Calendar,
  ChevronDown,
  FileText,
  Eye,
  Layers,
  Search,
  Mail,
} from "lucide-react";

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

// Get unique years from magazines data (sorted descending)
const getAvailableYears = (mags) => {
  const years = [...new Set(mags.map((m) => m.year))];
  return years.sort((a, b) => String(b).localeCompare(String(a)));
};

// Get available months for a given year
const getAvailableMonths = (mags, year) => {
  return mags
    .filter((m) => m.year === year)
    .map((m) => m.month)
    .sort((a, b) => a - b);
};


/* ─── tiny helper: ordinal suffix ─────────────────────────────────────── */
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/* ─── Custom Select Dropdown ───────────────────────────────────────────── */
function CustomSelect({ label, icon: Icon, value, onChange, options, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative min-w-[180px]">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#294868]/60 mb-2 flex items-center gap-1.5">
        <Icon className="size-3" />
        {label}
      </p>
      <button
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-sm font-semibold transition-all duration-200 ${
          disabled
            ? "bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed"
            : open
            ? "bg-white border-[#2F79B8] shadow-md shadow-[#2F79B8]/10 text-[#294868]"
            : "bg-white border-neutral-200 hover:border-[#2F79B8]/50 text-[#294868] shadow-sm"
        }`}
      >
        <span>{selected ? selected.label : "Select…"}</span>
        <ChevronDown
          className={`size-4 text-[#2F79B8] transition-transform duration-200 shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-neutral-200 rounded-xl shadow-xl shadow-neutral-900/10 z-50 overflow-hidden">
          <div className="h-0.5 bg-gradient-to-r from-[#2F79B8] to-[#294868]" />
          <ul className="max-h-52 overflow-y-auto py-1">
            {options.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() => { onChange(opt.value); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-100 ${
                    opt.value === value
                      ? "bg-[#2F79B8]/8 text-[#2F79B8] font-semibold"
                      : "text-[#294868] hover:bg-neutral-50"
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ─── Magazine Card ────────────────────────────────────────────────────── */
function MagazineCard({ mag, onView }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-md shadow-neutral-200 border border-neutral-100 overflow-hidden hover:shadow-xl hover:shadow-[#2F79B8]/10 hover:-translate-y-1 transition-all duration-300">
      {/* Cover image */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-100">
        {!imgLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-10 rounded-full border-4 border-[#2F79B8]/20 border-t-[#2F79B8] animate-spin" />
          </div>
        )}
        <img
          src={mag.coverImage}
          alt={mag.title}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imgLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2b]/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
          <button
            onClick={() => onView(mag)}
            className="flex items-center gap-2 bg-white text-[#294868] px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-[#2F79B8] hover:text-white transition-colors duration-200"
          >
            <Eye className="size-3.5" /> View
          </button>
          <button
              onClick={(e) => {
                e.preventDefault();
                forceDownload(mag.pdfUrl, `TPS-Magazine-${MONTH_NAMES[mag.month - 1]}-${mag.year}.pdf`);
              }}
              className="flex items-center gap-2 bg-[#2F79B8] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-[#294868] transition-colors duration-200"
            >
              <Download className="size-3.5" /> Download
            </button>
        </div>

        {/* Month badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#294868] text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
          {MONTH_NAMES[mag.month - 1]}
        </div>
        {/* Pages badge */}
        <div className="absolute top-3 right-3 bg-[#2F79B8]/90 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {mag.pages} pgs
        </div>
      </div>

      {/* Card footer */}
      <div className="p-4">
        <h3 className="font-bold text-[#294868] text-base leading-tight mb-1 line-clamp-1">
          {mag.title}
        </h3>
        <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2 mb-3">
          {mag.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#2F79B8] font-semibold">
            {MONTH_NAMES[mag.month - 1]} {mag.year}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onView(mag)}
              className="size-8 flex items-center justify-center rounded-lg bg-neutral-100 hover:bg-[#2F79B8] hover:text-white text-[#294868] transition-colors duration-200"
              title="View PDF"
            >
              <Eye className="size-3.5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                forceDownload(mag.pdfUrl, `TPS-Magazine-${MONTH_NAMES[mag.month - 1]}-${mag.year}.pdf`);
              }}
              className="size-8 flex items-center justify-center rounded-lg bg-[#2F79B8]/10 hover:bg-[#2F79B8] hover:text-white text-[#2F79B8] transition-colors duration-200"
              title="Download PDF"
            >
              <Download className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── Main Page ────────────────────────────────────────────────────────── */
export default function MagazinePage() {
  const [magazines, setMagazines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const { data, error } = await supabase
          .from('magazines')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          const mappedData = data.map(item => ({
            ...item,
            coverImage: item.cover_image,
            pdfUrl: item.pdf_url
          }));
          setMagazines(mappedData);
        }
      } catch (err) {
        console.error("Error fetching magazines:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMagazines();
  }, []);

  const years = getAvailableYears(magazines);

  /* State */
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [viewingMag, setViewingMag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Set initial selected year once data is loaded
  useEffect(() => {
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
  }, [years, selectedYear]);

  /* Derive available months for selected year */
  const availableMonths = getAvailableMonths(magazines, selectedYear);

  /* Reset month when year changes */
  useEffect(() => {
    setSelectedMonth(null);
  }, [selectedYear]);

  /* Filtered and sorted list */
  const filtered = magazines
    .filter((m) => {
      const matchYear = m.year === selectedYear;
      const matchMonth = selectedMonth ? m.month === selectedMonth : true;
      const matchSearch = searchQuery
        ? m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchYear && matchMonth && matchSearch;
    })
    .sort((a, b) => a.month - b.month);

  /* Dropdown options */
  const yearOptions = years.map((y) => ({ value: y, label: String(y) }));
  
  // Ensure unique months and sort them
  const uniqueMonths = [...new Set(availableMonths)].sort((a, b) => a - b);
  
  const monthOptions = [
    { value: null, label: "All Months" },
    ...uniqueMonths.map((m) => ({
      value: m,
      label: MONTH_NAMES[m - 1],
    })),
  ];

  /* Navigate between magazines (in filtered list) */
  const currentIdx = viewingMag ? filtered.findIndex((m) => m.id === viewingMag.id) : -1;
  const goPrev = () => currentIdx > 0 && setViewingMag(filtered[currentIdx - 1]);
  const goNext = () => currentIdx < filtered.length - 1 && setViewingMag(filtered[currentIdx + 1]);

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#294868]">
      <Loader ready={!isLoading} minDisplayMs={500}/>
      <Navbar />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section className="relative pt-48 pb-40 min-h-[50vh] lg:min-h-[60vh] overflow-hidden flex flex-col items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1920&q=80')` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f2142]/95 via-[#1a3350]/90 to-[#1a3350]/90 z-0" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="mag-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mag-grid)" />
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-[#2F79B8]/30 rounded-full blur-3xl pointer-events-none z-0" />
        <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-[#DD9808]/20 rounded-full blur-3xl pointer-events-none z-0" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Icon */}
          


          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-xl">
            TPS <span className="text-[#2F79B8] font-serif italic">Magazine</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-[#2F79B8]/15 border border-[#2F79B8]/30 text-[#2F79B8] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <Layers className="size-3" />
            School Publications
          </div>
          <p className="text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Explore our school's rich archive of magazines — chronicles of achievement,
            creativity, and community spirit across every academic year.
          </p>

          {/* Stats strip */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { label: "Editions Published", value: magazines.length },
              { label: "Years of Publication", value: years.length },
              { label: "Total Pages", value: magazines.reduce((a, m) => a + (m.pages || 0), 0) + "+" },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <div className="text-3xl font-black text-white">{value}</div>
                <div className="text-white/50 text-xs uppercase tracking-widest mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <section className="relative z-30 bg-white border-b border-neutral-200/80 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-end gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[220px]">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#294868]/60 mb-2 flex items-center gap-1.5">
                <Search className="size-3" />
                Search
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search magazines…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-white border border-neutral-200 rounded-xl text-sm text-[#294868] placeholder:text-neutral-400 focus:outline-none focus:border-[#2F79B8] focus:ring-2 focus:ring-[#2F79B8]/10 shadow-sm transition-all"
                />
              </div>
            </div>

            {/* Year selector */}
            <CustomSelect
              label="Year"
              icon={Calendar}
              value={selectedYear}
              onChange={(v) => setSelectedYear(v)}
              options={yearOptions}
            />

            {/* Month selector */}
            <CustomSelect
              label="Month"
              icon={FileText}
              value={selectedMonth}
              onChange={(v) => setSelectedMonth(v)}
              options={monthOptions}
            />

            {/* Result count */}
            <div className="ml-auto self-end pb-1">
              <span className="text-xs text-neutral-500 font-medium">
                {filtered.length} edition{filtered.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Magazine Grid ────────────────────────────────────────────────── */}
      <main className="container mx-auto px-4 py-14">
        {/* Year heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px flex-1 bg-neutral-200" />
          <h2 className="text-sm font-black uppercase tracking-widest text-[#2F79B8]">
            {selectedYear} Editions
            {selectedMonth && ` · ${MONTH_NAMES[selectedMonth - 1]}`}
          </h2>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        {filtered.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-20 bg-neutral-100 rounded-2xl flex items-center justify-center mb-5">
              <BookOpen className="size-10 text-neutral-300" />
            </div>
            <h3 className="text-xl font-bold text-[#294868] mb-2">No Magazines Found</h3>
            <p className="text-neutral-500 text-sm max-w-xs">
              Try adjusting the year, month, or search query to find what you're looking for.
            </p>
            <button
              onClick={() => { setSelectedYear(years[0]); setSelectedMonth(null); setSearchQuery(""); }}
              className="mt-6 px-5 py-2.5 bg-[#2F79B8] text-white rounded-xl text-sm font-semibold hover:bg-[#294868] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((mag) => (
              <MagazineCard key={mag.id} mag={mag} onView={setViewingMag} />
            ))}
          </div>
        )}

        {/* ── Browse All Years ─────────────────────────────────────────── */}
        <div className="mt-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-neutral-200" />
            <h2 className="text-sm font-black uppercase tracking-widest text-neutral-400">
              Browse by Year
            </h2>
            <div className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {years.map((y) => {
              const count = magazines.filter((m) => m.year === y).length;
              return (
                <button
                  key={y}
                  onClick={() => { setSelectedYear(y); setSelectedMonth(null); setSearchQuery(""); }}
                  className={`flex flex-col items-center px-5 py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${
                    y === selectedYear
                      ? "bg-[#2F79B8] border-[#2F79B8] text-white shadow-md shadow-[#2F79B8]/25"
                      : "bg-white border-neutral-200 text-[#294868] hover:border-[#2F79B8]/50 hover:bg-[#2F79B8]/5"
                  }`}
                >
                  {y}
                  <span className={`text-[10px] font-normal mt-0.5 ${y === selectedYear ? "text-white/70" : "text-neutral-400"}`}>
                    {count} edition{count !== 1 ? "s" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* ── Newsletter Section ────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0b1b2b] via-[#1a3350] to-[#294868] py-20 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="newsletter-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#newsletter-grid)" />
          </svg>
        </div>
        
        {/* Decorative Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#2F79B8]/20 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#DD9808]/15 rounded-full blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center size-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl mb-6 shadow-xl">
              <Mail className="size-8 text-white" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Never Miss an Edition
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Subscribe to our newsletter to receive the latest school magazines, updates, and announcements directly to your inbox.
            </p>

            <form 
              onSubmit={(e) => { e.preventDefault(); alert("Successfully subscribed to the newsletter!"); }} 
              className="relative max-w-lg mx-auto flex items-center bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-2xl focus-within:bg-white/15 focus-within:border-white/30 transition-all duration-300"
            >
              <Mail className="absolute left-5 size-5 text-white/50" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-transparent border-none text-white placeholder:text-white/50 px-14 py-4 focus:outline-none focus:ring-0 text-base"
              />
              <button
                type="submit"
                className="shrink-0 bg-[#2F79B8] hover:bg-[#2F79B8]/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-white/40 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── Custom PDF Viewer ─────────────────────────────────────────────── */}
      {viewingMag && (
        <PdfViewer
          mag={viewingMag}
          monthName={MONTH_NAMES[viewingMag.month - 1]}
          onClose={() => setViewingMag(null)}
          onPrev={currentIdx > 0 ? goPrev : undefined}
          onNext={currentIdx < filtered.length - 1 ? goNext : undefined}
          hasPrev={currentIdx > 0}
          hasNext={currentIdx < filtered.length - 1}
        />
      )}
    </div>
  );
}
