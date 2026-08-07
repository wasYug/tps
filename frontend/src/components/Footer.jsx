import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
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

      toast.success('Successfully subscribed to the newsletter!');
      setEmail("");
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#1b344d] via-[#203f5d] to-[#122436] text-white border-t border-white/10">
      {/* Subtle Ambient Glow Circles */}
      <div className="absolute top-0 left-1/4 size-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 size-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/2" />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="size-20 object-contain shrink-0 filter"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-[#de0a26] text-2xl tracking-tight leading-tight">
                Takshashila
              </span>
              <span className="text-[12px] px-1 text-[#2F79B8] uppercase tracking-[1.5px] font-semibold">
                Public School
              </span>
            </div>
          </div>
          <p className="text-white/70 text-xs sm:text-sm leading-6">
            Nurturing excellence and leading the path to a brighter, more
            innovative future since 1999. Dedicated to quality education and holistic growth.
          </p>
          <div className="flex gap-3 pt-2">
            {[
              { name: "Facebook", svg: (
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              ), link: "https://www.facebook.com/tps.shahjahanpur" },
              { name: "Instagram", svg: (
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.885.06 1.096.049 1.697.234 2.093.388.523.203.896.443 1.29.837.393.393.634.767.837 1.29.155.396.34.997.388 2.093.05 1.102.059 1.457.059 3.885 0 2.43-.009 2.784-.059 3.885-.049 1.096-.234 1.697-.388 2.093a4.49 4.49 0 0 1-.837 1.29 4.49 4.49 0 0 1-1.29.837c-.396.155-.997.34-2.093.388-1.102.05-1.457.059-3.885.059-2.43 0-2.784-.009-3.885-.059-1.096-.049-1.697-.234-2.093-.388a4.49 4.49 0 0 1-1.29-.837 4.49 4.49 0 0 1-.837-1.29c-.155-.396-.34-.997-.388-2.093C2.008 14.784 2 14.43 2 12c0-2.43.008-2.784.06-3.885.049-1.096.234-1.697.388-2.093a4.49 4.49 0 0 1 .837-1.29 4.49 4.49 0 0 1 1.29-.837c.396-.155.997-.34 2.093-.388 1.102-.05 1.457-.059 3.885-.059m0-.195c-2.478 0-2.788.01-3.763.054a6.687 6.687 0 0 0-2.213.424 6.727 6.727 0 0 0-2.42 1.576A6.727 6.727 0 0 0 2.27 6.339a6.687 6.687 0 0 0-.424 2.213C1.81 9.53 1.8 9.84 1.8 12.315c0 2.478.01 2.788.054 3.763.04.975.18 1.637.424 2.213a6.72 6.72 0 0 0 1.576 2.42 6.72 6.72 0 0 0 2.42 1.576c.576.244 1.238.384 2.213.424.975.044 1.285.054 3.763.054s2.788-.01 3.763-.054c.975-.04 1.637-.18 2.213-.424a6.73 6.73 0 0 0 2.42-1.576 6.73 6.73 0 0 0 1.576-2.42c.244-.576.384-1.238.424-2.213.044-.975.054-1.285.054-3.763s-.01-2.788-.054-3.763a6.685 6.685 0 0 0-.424-2.213 6.727 6.727 0 0 0-1.576-2.42 6.727 6.727 0 0 0-2.42-1.576 6.687 6.687 0 0 0-2.213-.424C15.1 1.81 14.79 1.8 12.315 1.8z" clipRule="evenodd" />
                <path fillRule="evenodd" d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16.2a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" clipRule="evenodd" />
              </svg>
            ), link: "https://www.instagram.com/tps.shahjahanpur/" },
            { name: "X", svg: (
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            ), link: "https://x.com/TakshashilaPub1" },
            { name: "YouTube", svg: (
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.688 22 12 22 12s0 3.313-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.5.42-7.812.42-7.812.42s-6.313 0-7.814-.42a2.507 2.507 0 0 1-1.768-1.768C2 15.313 2 12 2 12s0-3.313.42-4.814a2.507 2.507 0 0 1 1.768-1.768c1.5-.42 7.814-.42 7.814-.42s6.312 0 7.812.42zm-11.109 9.87l6.587-3.288-6.587-3.287v6.575z" clipRule="evenodd" />
              </svg>
            ), link: "https://www.youtube.com/@takshashilapublicschoolsha986/videos" }
          ].map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="size-9 rounded-full bg-white/5 hover:bg-[#F2E0AB] hover:text-[#1b344d] transition-all duration-300 flex justify-center items-center border border-white/10 hover:border-transparent hover:scale-110 shadow-lg cursor-pointer"
            >
              {social.svg}
            </a>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-bold uppercase text-xs sm:text-sm leading-5 tracking-[3px] text-[#F2E0AB] border-b border-white/10 pb-2 mb-4">
          Quick Links
        </h4>
        <ul className="text-white/70 text-xs sm:text-sm leading-6 flex flex-col gap-3">
          {[
            { label: "School Infrastructure", path: "/infra" },
            { label: "Admission Process", path: "/admission" },
            { label: "School Magazine", path: "/magazine" },
            { label: "Faculty Directory", path: "/faculty" },
            { label: "Contact", path: "/contact" },
          ].map((l) => (
            <li key={l.label}>
              <Link
                to={l.path}
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-[#F2E0AB] hover:translate-x-1.5 cursor-pointer"
              >
                <ChevronRight className="size-3 text-[#F2E0AB]/60 group-hover:text-[#F2E0AB] transition-colors" />
                <span>{l.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-bold uppercase text-xs sm:text-sm leading-5 tracking-[3px] text-[#F2E0AB] border-b border-white/10 pb-2 mb-4">
          Contact Info
        </h4>
        <ul className="text-white/70 text-xs sm:text-sm leading-6 flex flex-col gap-4">
          <li className="flex items-start gap-3 group">
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex justify-center items-center shrink-0 mt-0.5 group-hover:bg-[#F2E0AB]/10 transition-colors">
              <MapPin className="size-4 text-[#F2E0AB] shrink-0" />
            </div>
            <span className="group-hover:text-white transition-colors">
              Bijlipura, Shahjahanpur, India
            </span>
          </li>
          <li className="flex items-center gap-3 group">
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex justify-center items-center shrink-0 group-hover:bg-[#F2E0AB]/10 transition-colors">
              <Phone className="size-4 text-[#F2E0AB] shrink-0" />
            </div>
            <span className="group-hover:text-white transition-colors">
              05842-224555, 9335006888
            </span>
          </li>
          <li className="flex items-center gap-3 group">
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex justify-center items-center shrink-0 group-hover:bg-[#F2E0AB]/10 transition-colors">
              <Mail className="size-4 text-[#F2E0AB] shrink-0" />
            </div>
            <span className="group-hover:text-white transition-colors">
                tps_spn@rediffmail.com
            </span>
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 size-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full pointer-events-none" />
        <h4 className="font-bold uppercase text-xs sm:text-sm leading-5 tracking-[3px] text-[#F2E0AB]">
          Newsletter
        </h4>
        <p className="text-white/70 text-xs sm:text-sm leading-6 mt-3">
          Subscribe to receive the latest academic news, notifications, and event updates.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="flex mt-4 gap-2 relative z-10" noValidate>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-lg bg-white/10 border border-white/20 focus:border-[#F2E0AB] focus:ring-1 focus:ring-[#F2E0AB] text-white text-xs sm:text-sm leading-5 px-3 w-full h-10 transition-all outline-none disabled:opacity-50"
            placeholder="Email Address"
            disabled={isSubmitting}
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="size-10 shrink-0 bg-[#de0a26] hover:bg-[#c11c22] text-white hover:text-slate-900 shadow-md hover:scale-105 transition-all p-0 disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <svg className="animate-spin size-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
      </div>
    </div>

    <div className="border-white/10 border-t border-solid relative z-10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <p className="text-white/50 text-[10px] sm:text-xs leading-4">
          © 2026 Takshashila Public School. All rights reserved.
        </p>
        <div className="flex gap-6 text-[10px] sm:text-xs text-white/50">
          <Link to="/privacy" className="hover:text-[#F2E0AB] transition-colors">Privacy Policy</Link>
          <Link to="/terms-of-use" className="hover:text-[#F2E0AB] transition-colors">Terms of Use</Link>
        </div>
      </div>
    </div>
  </footer>
  );
}
