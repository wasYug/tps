import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Banknote,
  ShieldCheck,
  CreditCard,
  Award,
  ArrowRight,
  Printer,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  AlertCircle,
  FileText,
  Calendar,
  School,
  Percent,
  Info,
  Bus,
  Utensils,
  Receipt,
  GraduationCap
} from 'lucide-react';

// ── Dummy Fee Structure Database ───────────────────────────────────────────────
const CLASS_OPTIONS = [
  { id: 'nursery', name: 'Nursery', category: 'Pre-Primary' },
  { id: 'lkg', name: 'LKG (Lower KG)', category: 'Pre-Primary' },
  { id: 'ukg', name: 'UKG (Upper KG)', category: 'Pre-Primary' },
  { id: 'class-1', name: 'Class 1', category: 'Primary School' },
  { id: 'class-2', name: 'Class 2', category: 'Primary School' },
  { id: 'class-3', name: 'Class 3', category: 'Primary School' },
  { id: 'class-4', name: 'Class 4', category: 'Primary School' },
  { id: 'class-5', name: 'Class 5', category: 'Primary School' },
  { id: 'class-6', name: 'Class 6', category: 'Middle School' },
  { id: 'class-7', name: 'Class 7', category: 'Middle School' },
  { id: 'class-8', name: 'Class 8', category: 'Middle School' },
  { id: 'class-9', name: 'Class 9', category: 'Secondary School' },
  { id: 'class-10', name: 'Class 10', category: 'Secondary School' },
  { id: 'class-11', name: 'Class 11', category: 'Senior Secondary', hasStreams: true },
  { id: 'class-12', name: 'Class 12', category: 'Senior Secondary', hasStreams: true },
];

const STREAM_OPTIONS = [
  {
    id: 'pcm',
    name: 'Science (PCM)',
    badge: 'STEM',
    description: 'Physics, Chemistry, Mathematics, Computer Science / Physical Education',
    labFee: 14000,
    quarterlyTuition: 31000,
  },
  {
    id: 'pcb',
    name: 'Science (PCB)',
    badge: 'Medical',
    description: 'Physics, Chemistry, Biology, Psychology / Physical Education',
    labFee: 14000,
    quarterlyTuition: 31000,
  },
  {
    id: 'commerce',
    name: 'Commerce',
    badge: 'Business',
    description: 'Accountancy, Business Studies, Economics, Mathematics / Informatics Practices',
    labFee: 7000,
    quarterlyTuition: 28000,
  },
  {
    id: 'humanities',
    name: 'Humanities / Arts',
    badge: 'Liberal Arts',
    description: 'History, Political Science, Psychology / Sociology, Economics',
    labFee: 5000,
    quarterlyTuition: 26500,
  },
];

// Helper to compute fee amounts dynamically based on class and stream
const getFeeDataForClass = (classId, streamId) => {
  const isSenior = classId === 'class-11' || classId === 'class-12';
  const isSecondary = classId === 'class-9' || classId === 'class-10';
  const isMiddle = ['class-6', 'class-7', 'class-8'].includes(classId);
  const isPrimary = ['class-1', 'class-2', 'class-3', 'class-4', 'class-5'].includes(classId);
  const isPrePrimary = ['nursery', 'lkg', 'ukg'].includes(classId);

  // One-time charges
  let admissionFee = 32000;
  let cautionMoney = 10000; // refundable
  let registrationFee = 2000;
  let welfareFund = 1500;

  // Annual components
  let quarterlyTuition = 21000;
  let labTechFee = 4000;
  let examFee = 3500;
  let libraryDigitalFee = 3000;
  let sportsActivityFee = 4500;

  if (isPrePrimary) {
    admissionFee = 25000;
    cautionMoney = 8000;
    quarterlyTuition = 16500;
    labTechFee = 2000; // Activity kit & toy lab
    examFee = 2000;
    libraryDigitalFee = 2000;
    sportsActivityFee = 3500;
  } else if (isPrimary) {
    admissionFee = 30000;
    quarterlyTuition = 19500;
    labTechFee = 3500;
    examFee = 2500;
    libraryDigitalFee = 2500;
    sportsActivityFee = 4000;
  } else if (isMiddle) {
    admissionFee = 35000;
    quarterlyTuition = 23000;
    labTechFee = 5500;
    examFee = 3500;
    libraryDigitalFee = 3000;
    sportsActivityFee = 4500;
  } else if (isSecondary) {
    admissionFee = 38000;
    cautionMoney = 12000;
    quarterlyTuition = 26500;
    labTechFee = 7500;
    examFee = 4500;
    libraryDigitalFee = 3500;
    sportsActivityFee = 5000;
  } else if (isSenior) {
    admissionFee = 42000;
    cautionMoney = 12000;
    const stream = STREAM_OPTIONS.find((s) => s.id === streamId) || STREAM_OPTIONS[0];
    quarterlyTuition = stream.quarterlyTuition;
    labTechFee = stream.labFee;
    examFee = 5500;
    libraryDigitalFee = 4000;
    sportsActivityFee = 5000;
  }

  const annualTuition = quarterlyTuition * 4;
  const totalOneTime = registrationFee + admissionFee + cautionMoney + welfareFund;
  const totalAnnualAcademic = annualTuition + labTechFee + examFee + libraryDigitalFee + sportsActivityFee;

  // Installments calculation
  const q1 = quarterlyTuition + Math.round(labTechFee * 0.5) + Math.round(examFee * 0.5) + libraryDigitalFee;
  const q2 = quarterlyTuition;
  const q3 = quarterlyTuition + Math.round(labTechFee * 0.5) + Math.round(examFee * 0.5) + sportsActivityFee;
  const q4 = quarterlyTuition;

  return {
    admissionFee,
    cautionMoney,
    registrationFee,
    welfareFund,
    totalOneTime,
    quarterlyTuition,
    annualTuition,
    labTechFee,
    examFee,
    libraryDigitalFee,
    sportsActivityFee,
    totalAnnualAcademic,
    grandTotalFirstYear: totalOneTime + totalAnnualAcademic,
    installments: [
      {
        quarter: 'Quarter 1',
        period: 'April – June',
        dueDate: 'April 10, 2025',
        amount: q1,
        breakdown: '1st Qtr Tuition + Lab Fee (50%) + Library & Digital E-learning + Exam (50%)',
        badge: 'Term Commencement',
      },
      {
        quarter: 'Quarter 2',
        period: 'July – September',
        dueDate: 'July 10, 2025',
        amount: q2,
        breakdown: '2nd Qtr Tuition Fee',
        badge: 'Mid Academic',
      },
      {
        quarter: 'Quarter 3',
        period: 'October – December',
        dueDate: 'October 10, 2025',
        amount: q3,
        breakdown: '3rd Qtr Tuition + Sports & Co-Curricular Fee + Lab Fee (50%) + Exam (50%)',
        badge: 'Autumn Term',
      },
      {
        quarter: 'Quarter 4',
        period: 'January – March',
        dueDate: 'January 10, 2026',
        amount: q4,
        breakdown: '4th Qtr Tuition Fee',
        badge: 'Final Term',
      },
    ],
  };
};

const OPTIONAL_SERVICES = [
  {
    icon: Bus,
    title: 'School Bus Transport Facility',
    subtitle: 'GPS tracked, air-conditioned fleet with CCTV and female attendants',
    pricing: 'Zone 1 (0-5 km): ₹18,000/yr • Zone 2 (5-12 km): ₹24,000/yr • Zone 3 (12+ km): ₹30,000/yr',
    frequency: 'Billed Quarterly',
    tag: 'Optional',
  },
  {
    icon: Utensils,
    title: 'Nutritious Cafeteria & Meal Plan',
    subtitle: 'Hygienic, dietician-approved hot breakfast and lunch cooked fresh daily',
    pricing: '₹22,000 per academic year (₹5,500 / quarter)',
    frequency: 'Billed Quarterly',
    tag: 'Optional',
  },
  {
    icon: GraduationCap,
    title: 'Remedial & Competitive Exam Coaching',
    subtitle: 'Dedicated post-school mentoring for Olympiads, JEE, NEET, and CUET by top faculty',
    pricing: '₹16,000 per academic year',
    frequency: 'Annual / Bi-annual',
    tag: 'Optional',
  },
];

const FAQS = [
  {
    q: 'What is the refund policy regarding Caution Money and Admission Fees?',
    a: 'The Caution Money (Security Deposit) is 100% refundable when the student leaves the institution, subject to clearance of all pending dues and library returns. The Registration and Admission fees are one-time administrative charges and are non-refundable.',
  },
  {
    q: 'Are there any discounts available for siblings enrolled together?',
    a: 'Yes! Takshashila Public School offers a 10% sibling concession on the composite tuition fee for the younger sibling as long as both children are concurrently enrolled at the school.',
  },
  {
    q: 'What modes of payment are accepted for fee transactions?',
    a: 'Parents can pay fees conveniently via the Online Parent Portal using UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, or by Demand Draft drawn in favor of "Takshashila Public School". Cash payments are discouraged for security reasons.',
  },
  {
    q: 'What happens if a quarterly fee installment is paid after the due date?',
    a: 'A 10-day grace period is provided after each quarterly deadline (up to the 20th of the due month). Payments made after the grace period incur a nominal late fee of ₹50 per day to maintain administrative schedules.',
  },
];

export default function FeeStructurePage() {
  const [selectedClass, setSelectedClass] = useState('class-11');
  const [selectedStream, setSelectedStream] = useState('pcm');
  const [activeTab, setActiveTab] = useState('breakdown'); // 'breakdown' | 'installments'
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentClassObj = useMemo(
    () => CLASS_OPTIONS.find((c) => c.id === selectedClass) || CLASS_OPTIONS[0],
    [selectedClass]
  );

  const currentStreamObj = useMemo(
    () => STREAM_OPTIONS.find((s) => s.id === selectedStream) || STREAM_OPTIONS[0],
    [selectedStream]
  );

  const feeData = useMemo(
    () => getFeeDataForClass(selectedClass, selectedStream),
    [selectedClass, selectedStream]
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#fafafa] font-sans text-gray-800 antialiased min-h-screen flex flex-col overflow-x-hidden selection:bg-[#d4af37]/20 selection:text-[#0f2142]">
      {/* Navbar with Transparent Theme */}
      <Navbar theme="transparent" />

      {/* ── BEGIN: Hero Section (Royal Navy & Gold Theme) ────────────────── */}
      <section className="relative pt-36 md:pt-44 pb-28 md:pb-36 bg-gradient-to-b from-[#0f2142] via-[#152e5c] to-[#0f2142] border-b-[6px] border-[#c11c22] overflow-hidden text-center flex flex-col items-center">
        {/* Decorative Grid & Ambient Glow Orbs */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#d4af37] rounded-full mix-blend-screen filter blur-[120px] opacity-20 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-[#c11c22] rounded-full mix-blend-screen filter blur-[100px] opacity-15 translate-y-1/3 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#d4af37] text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            Academic Year 2025–2026 • Transparent Tuition Policy
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 font-serif tracking-tight drop-shadow-md">
            Comprehensive & Transparent{' '}
            <span className="text-[#d4af37] italic">Fee Structure</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-blue-100/90 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            At Takshashila Public School, we uphold complete fiscal clarity. Our fee schedule covers world-class academics, digital infrastructure, sports, and holistic development with zero hidden surcharges.
          </p>

          {/* Key Value Metric Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-[#d4af37]/20 flex items-center justify-center shrink-0 text-[#d4af37]">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="text-xs text-blue-200">Policy</div>
                <div className="text-sm font-bold text-white">100% Transparent</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-300">
                <Calendar className="size-5" />
              </div>
              <div>
                <div className="text-xs text-blue-200">Convenience</div>
                <div className="text-sm font-bold text-white">4 Quarterly Terms</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-[#c11c22]/20 flex items-center justify-center shrink-0 text-red-300">
                <Percent className="size-5" />
              </div>
              <div>
                <div className="text-xs text-blue-200">Concession</div>
                <div className="text-sm font-bold text-white">10% Sibling Benefit</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-[#d4af37]/20 flex items-center justify-center shrink-0 text-[#d4af37]">
                <Award className="size-5" />
              </div>
              <div>
                <div className="text-xs text-blue-200">Merit Support</div>
                <div className="text-sm font-bold text-white">Scholarships Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ── END: Hero Section ────────────────────────────────────────────── */}

      {/* ── BEGIN: Main Content & Controls Container ─────────────────────── */}
      <main className="flex-grow pb-24">
        <div className="container mx-auto px-4 max-w-7xl relative z-20">

          {/* ── Floating Controls Bar (-mt-12) ── */}
          <div className="-mt-12 sm:-mt-14 mb-10 bg-white rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/80 p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
              
              {/* Dropdowns Group */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">
                {/* Class Dropdown */}
                <div className="flex-1 min-w-[220px]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                    <School className="size-3.5 text-[#2f79b8]" />
                    Select Grade / Class
                  </label>
                  <div className="relative">
                    <select
                      id="class-select"
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full h-12 appearance-none rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white focus:bg-white px-4 pr-10 text-sm font-semibold text-[#0f2142] focus:outline-none focus:ring-2 focus:ring-[#2f79b8]/30 focus:border-[#2f79b8] transition-all cursor-pointer shadow-sm"
                    >
                      {CLASS_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.category})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="size-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Stream Dropdown (Conditional for Class 11 and 12) */}
                {currentClassObj.hasStreams && (
                  <div className="flex-1 min-w-[240px] animate-fade-in-up">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="size-3.5 text-[#dd9808]" />
                      Select Academic Stream
                    </label>
                    <div className="relative">
                      <select
                        id="stream-select"
                        value={selectedStream}
                        onChange={(e) => setSelectedStream(e.target.value)}
                        className="w-full h-12 appearance-none rounded-xl border-2 border-[#dd9808]/40 bg-amber-50/30 hover:bg-white focus:bg-white px-4 pr-10 text-sm font-semibold text-[#0f2142] focus:outline-none focus:ring-2 focus:ring-[#dd9808]/30 focus:border-[#dd9808] transition-all cursor-pointer shadow-sm"
                      >
                        {STREAM_OPTIONS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name} ({s.badge})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="size-4 text-[#dd9808] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>

              {/* View Mode Toggle Buttons */}
              <div className="flex items-center gap-2 bg-slate-100/90 p-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('breakdown')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'breakdown'
                      ? 'bg-white text-[#0f2142] shadow-sm font-bold'
                      : 'text-slate-600 hover:text-[#0f2142]'
                  }`}
                >
                  <Receipt className="size-4 text-[#2f79b8]" />
                  Fee Breakdown (Tabular)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('installments')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'installments'
                      ? 'bg-white text-[#0f2142] shadow-sm font-bold'
                      : 'text-slate-600 hover:text-[#0f2142]'
                  }`}
                >
                  <Calendar className="size-4 text-[#dd9808]" />
                  Quarterly Installments
                </button>
              </div>

            </div>

            {/* Currently Active Banner */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-slate-800">Displaying Fee Schedule for:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2f79b8]/10 text-[#2f79b8] font-bold">
                  {currentClassObj.name}
                </span>
                {currentClassObj.hasStreams && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dd9808]/15 text-[#9e6d04] font-bold">
                    Stream: {currentStreamObj.name}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="size-3.5 text-emerald-600" /> All charges in Indian Rupees (₹)
                </span>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 text-[#2f79b8] hover:text-[#0f2142] font-semibold hover:underline cursor-pointer"
                >
                  <Printer className="size-3.5" />
                  Print Fee Chart
                </button>
              </div>
            </div>
          </div>

          {/* ── Summary High-Level Numbers ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-100 hover:border-[#2f79b8]/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">One-Time at Admission</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2f79b8]">Payable Once</span>
              </div>
              <div className="text-3xl font-extrabold text-[#0f2142] font-serif">
                ₹{feeData.totalOneTime.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Includes Admission, Registration, Welfare Fund &amp; <span className="text-emerald-700 font-medium">₹{feeData.cautionMoney.toLocaleString('en-IN')} Refundable Deposit</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md shadow-slate-100 hover:border-[#dd9808]/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Annual Academic Tuition</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-[#9e6d04]">4 Installments</span>
              </div>
              <div className="text-3xl font-extrabold text-[#0f2142] font-serif">
                ₹{feeData.annualTuition.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-slate-400 font-sans ml-1">/ year</span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Payable as <strong className="text-slate-700">₹{feeData.quarterlyTuition.toLocaleString('en-IN')}</strong> per quarter (April, July, Oct, Jan)
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0f2142] to-[#1c3b6e] rounded-2xl p-6 text-white shadow-lg shadow-[#0f2142]/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37] rounded-full blur-2xl opacity-15 pointer-events-none" />
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Total Annual Academic Fee</span>
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37]">All-Inclusive</span>
              </div>
              <div className="text-3xl font-extrabold text-white font-serif">
                ₹{feeData.totalAnnualAcademic.toLocaleString('en-IN')}
                <span className="text-xs font-normal text-blue-200 font-sans ml-1">/ year</span>
              </div>
              <p className="text-xs text-blue-200/80 mt-2">
                Includes Tuition, Labs, Digital Library, Sports &amp; Continuous Assessments
              </p>
            </div>
          </div>

          {/* ── CONDITIONAL VIEW: TAB 1 (TABULAR BREAKDOWN) ── */}
          {activeTab === 'breakdown' && (
            <div className="space-y-12">
              
              {/* TABLE 1: ONE-TIME CHARGES */}
              <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0f2142] font-serif flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#c11c22]"></span>
                      1. One-Time Charges (At the Time of Admission)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Applicable exclusively for newly enrolled students at the time of confirmed admission.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#c11c22] bg-red-50 border border-red-100 px-3 py-1 rounded-full w-fit">
                    Subtotal: ₹{feeData.totalOneTime.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-3.5 px-6">S.No.</th>
                        <th className="py-3.5 px-6">Fee Component</th>
                        <th className="py-3.5 px-6">Description / Remarks</th>
                        <th className="py-3.5 px-6">Nature</th>
                        <th className="py-3.5 px-6 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">01</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Registration &amp; Prospectus Kit</td>
                        <td className="py-4 px-6 text-slate-600">Application processing, entrance assessment &amp; syllabus handbook</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Non-refundable
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.registrationFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">02</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Admission Fee</td>
                        <td className="py-4 px-6 text-slate-600">Institutional enrolment, seat allocation, and administration processing</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Non-refundable
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.admissionFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">03</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142] flex items-center gap-1.5">
                          Refundable Caution Money
                          <ShieldCheck className="size-4 text-emerald-600" />
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          Security deposit held against school equipment/library; returned upon TC issuance
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            100% Refundable
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-emerald-700">
                          ₹{feeData.cautionMoney.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">04</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Student Welfare &amp; PTA Membership</td>
                        <td className="py-4 px-6 text-slate-600">Annual parent-teacher guild, emergency medical aid &amp; insurance</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Non-refundable
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.welfareFund.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="bg-slate-50/90 font-bold text-slate-900">
                        <td colSpan={4} className="py-4 px-6 text-right text-xs uppercase tracking-wider text-slate-600">
                          Total One-Time Fee (Payable at Admission):
                        </td>
                        <td className="py-4 px-6 text-right text-base text-[#0f2142]">
                          ₹{feeData.totalOneTime.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TABLE 2: ANNUAL ACADEMIC RECURRING CHARGES */}
              <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0f2142] font-serif flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#2f79b8]"></span>
                      2. Annual Academic &amp; Composite Tuition Fees
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Includes comprehensive instruction, modern digital smart classrooms, specialized stream laboratories, and term exams.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#2f79b8] bg-blue-50 border border-blue-100 px-3 py-1 rounded-full w-fit">
                    Annual Total: ₹{feeData.totalAnnualAcademic.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-3.5 px-6">S.No.</th>
                        <th className="py-3.5 px-6">Fee Head</th>
                        <th className="py-3.5 px-6">Coverage &amp; Scope</th>
                        <th className="py-3.5 px-6">Billing Mode</th>
                        <th className="py-3.5 px-6 text-right">Annual Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">01</td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-[#0f2142] block">Composite Tuition Fee</span>
                          <span className="text-xs text-slate-500">₹{feeData.quarterlyTuition.toLocaleString('en-IN')} / quarter</span>
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          Curriculum delivery, smart classrooms, qualified pedagogy, and experiential workshops
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#2f79b8]">
                            Quarterly (4x)
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.annualTuition.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">02</td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-[#0f2142] block">
                            {currentClassObj.hasStreams
                              ? `${currentStreamObj.name} Lab & Tech Fee`
                              : 'Science & Computer Lab Charges'}
                          </span>
                          <span className="text-xs text-amber-600 font-medium">
                            {currentClassObj.hasStreams ? currentStreamObj.badge : 'STEM & Robotics'}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-slate-600">
                          {currentClassObj.hasStreams
                            ? currentStreamObj.description
                            : 'Hands-on practical physics, chemistry, biology, coding, and robotics labs'}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Split (Q1 &amp; Q3)
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.labTechFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">03</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Library &amp; Digital Learning Resources</td>
                        <td className="py-4 px-6 text-slate-600">
                          Access to 25,000+ physical books, e-journals, subscription databases &amp; multimedia library
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Annual (Q1)
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.libraryDigitalFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">04</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Examination &amp; Continuous Assessment</td>
                        <td className="py-4 px-6 text-slate-600">
                          Periodic term tests, pre-boards, CBSE registration charges &amp; analytical performance reports
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Split (Q1 &amp; Q3)
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.examFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-400">05</td>
                        <td className="py-4 px-6 font-semibold text-[#0f2142]">Sports, Co-curricular &amp; Cultural Fund</td>
                        <td className="py-4 px-6 text-slate-600">
                          Professional sports coaching, inter-school festivals, debate societies, art &amp; music studios
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                            Annual (Q3)
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right font-bold text-slate-900">
                          ₹{feeData.sportsActivityFee.toLocaleString('en-IN')}
                        </td>
                      </tr>

                      <tr className="bg-slate-50/90 font-bold text-slate-900">
                        <td colSpan={4} className="py-4 px-6 text-right text-xs uppercase tracking-wider text-slate-600">
                          Total Annual Academic Fee (Per Annum):
                        </td>
                        <td className="py-4 px-6 text-right text-base text-[#2f79b8]">
                          ₹{feeData.totalAnnualAcademic.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* CARD: OPTIONAL VALUE-ADDED ALLIED SERVICES */}
              <div className="bg-white rounded-2xl shadow-md shadow-slate-200/50 border border-slate-200/80 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0f2142] font-serif flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#dd9808]"></span>
                      3. Optional &amp; Value-Added Facilities (On Request)
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Available on an optional opt-in basis; charges applied only if availed by parents.
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#9e6d04] border border-amber-200/80 w-fit">
                    Non-Mandatory
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {OPTIONAL_SERVICES.map((srv, idx) => {
                    const IconComp = srv.icon;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 p-5 bg-slate-50/40 hover:bg-white hover:border-[#2f79b8]/40 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="size-11 rounded-xl bg-[#2f79b8]/10 text-[#2f79b8] flex items-center justify-center mb-4">
                            <IconComp className="size-5" />
                          </div>
                          <h4 className="font-bold text-[#0f2142] text-base mb-1.5">{srv.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4">{srv.subtitle}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-200/70">
                          <span className="text-xs font-bold text-[#0f2142] block mb-1">{srv.pricing}</span>
                          <span className="text-[11px] font-medium text-slate-400">{srv.frequency}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ACTION FOOTER */}
              <div className="bg-gradient-to-r from-blue-50/60 via-slate-50 to-amber-50/60 rounded-2xl p-6 sm:p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-[#0f2142] font-serif mb-1">
                    Ready to Apply for {currentClassObj.name}?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    Admissions are open for Academic Year 2025–26. Book your campus interaction and complete the registration online.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all shadow-sm cursor-pointer"
                  >
                    <Printer className="size-4" />
                    Print Breakdown
                  </button>
                  <Link
                    to="/admission"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#c11c22] hover:bg-[#a5151b] text-white text-sm font-bold shadow-md shadow-red-900/10 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Apply for Admission
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

            </div>
          )}

          {/* ── CONDITIONAL VIEW: TAB 2 (QUARTERLY INSTALLMENT SCHEDULE) ── */}
          {activeTab === 'installments' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-5 flex items-start gap-4">
                <Info className="size-5 text-[#2f79b8] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#0f2142]">Quarterly Installment Guide:</strong> Academic charges are divided into four manageable terms. Payments must be remitted between the 1st and 10th of the starting month of each quarter. Late fees apply after the 10-day grace period.
                </div>
              </div>

              {/* Installment Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {feeData.installments.map((inst, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-md shadow-slate-100 flex flex-col justify-between hover:-translate-y-1 hover:border-[#2f79b8]/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Top colored strip */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2f79b8] to-[#dd9808]" />

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          {inst.period}
                        </span>
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {inst.badge}
                        </span>
                      </div>

                      <h4 className="text-xl font-extrabold text-[#0f2142] font-serif mb-1">{inst.quarter}</h4>

                      <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md font-semibold mb-4">
                        <Calendar className="size-3.5" />
                        Due: {inst.dueDate}
                      </div>

                      <div className="text-3xl font-extrabold text-[#0f2142] font-serif mb-3">
                        ₹{inst.amount.toLocaleString('en-IN')}
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed min-h-[48px]">
                        {inst.breakdown}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                      <span className="text-slate-400">Status</span>
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="size-3.5" /> Payable Online
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Installments Summary Table */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                      ₹
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#0f2142]">Cumulative 4-Quarter Annual Total</h4>
                      <p className="text-xs text-slate-500">
                        Sum of all 4 installments for {currentClassObj.name} {currentClassObj.hasStreams ? `(${currentStreamObj.name})` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#0f2142] font-serif">
                      ₹{feeData.totalAnnualAcademic.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-slate-400 block">Excluding one-time admission charges</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── BEGIN: Scholarship Bridge Section ───────────────────────────── */}
          <section className="mt-20 relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0f2142] via-[#1a386b] to-[#0f2142] p-8 sm:p-12 lg:p-16 border-2 border-[#d4af37]/30 text-white shadow-2xl">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c11c22] rounded-full blur-[90px] opacity-15 pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl text-center lg:text-left">
                {/* Scholarship Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-4">
                  <Award className="size-3.5" />
                  Merit &amp; Need-Based Financial Aid
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-white mb-4 leading-tight">
                  Financial Constraints Should <span className="text-[#d4af37] italic">Never Hinder</span> True Potential
                </h2>

                <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed mb-6 font-light">
                  We believe that brilliance deserves opportunity. Takshashila Public School awards scholarships offering up to a <strong className="text-white font-semibold">100% Tuition Fee Waiver</strong> for academic toppers, state/national sports champions, exceptional artists, and deserving candidates.
                </p>

                {/* 4 Pillars Mini Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-[#d4af37] font-bold uppercase block mb-1">Academic</span>
                    <span className="text-xs text-white">90%+ in Board Exams</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-[#d4af37] font-bold uppercase block mb-1">Sports</span>
                    <span className="text-xs text-white">State / National Medals</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-[#d4af37] font-bold uppercase block mb-1">Arts</span>
                    <span className="text-xs text-white">Recognized Certifications</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <span className="text-[11px] text-[#d4af37] font-bold uppercase block mb-1">Need-Based</span>
                    <span className="text-xs text-white">Income Support Grant</span>
                  </div>
                </div>
              </div>

              {/* Action Side */}
              <div className="shrink-0 flex flex-col items-center gap-4 text-center">
                <div className="size-24 rounded-2xl bg-gradient-to-tr from-[#d4af37] to-amber-200 p-0.5 shadow-xl shadow-amber-900/30">
                  <div className="w-full h-full bg-[#0f2142] rounded-2xl flex items-center justify-center">
                    <Award className="size-12 text-[#d4af37]" />
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-200 block">Up to 100% Fee Waiver</span>
                  <span className="text-lg font-bold text-white font-serif">Scholarship Program</span>
                </div>
                <Link
                  to="/scholarship"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e1af61] hover:from-[#c29c29] hover:to-[#d4af37] text-[#0f2142] font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
                >
                  Explore Scholarships &amp; Apply
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </section>
          {/* ── END: Scholarship Bridge Section ─────────────────────────────── */}

          {/* ── BEGIN: Payment Guidelines, Sibling Discounts & FAQs ─────────── */}
          <section className="mt-20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-[#c11c22] uppercase tracking-widest block mb-2">
                Clear Policies
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2142] font-serif mb-3">
                Payment Policies &amp; FAQs
              </h2>
              <p className="text-sm text-slate-500">
                Key regulations governing admissions, fee remissions, sibling concessions, and refunds.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                    >
                      <span className="font-bold text-[#0f2142] text-sm sm:text-base flex items-center gap-3">
                        <HelpCircle className="size-5 text-[#2f79b8] shrink-0" />
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`size-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#2f79b8]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/40">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
          {/* ── END: Payment Guidelines & FAQs ─────────────────────────────── */}

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}