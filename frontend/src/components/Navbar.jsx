import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import {
  Home,
  Info,
  BookOpen,
  FileText,
  Users,
  Mail,
  PenLine,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  Building2,
  School,
  GalleryHorizontal,
  LogIn,
  LogOut,
  Newspaper,
  Compass,
  Calendar
} from "lucide-react";

// ── Desktop plain NavLink item ───────────────────────────────────────────────
function NavLinkItem({ to, label, Icon, isLight }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={() => window.scrollTo(0, 0)}
      className={({ isActive }) =>
        `relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
          isActive
            ? isLight
              ? "bg-[#2F79B8]/10 text-[#2F79B8] font-semibold"
              : "bg-white/18 text-white font-semibold shadow-sm shadow-black/10"
            : isLight
              ? "text-[#294868] hover:bg-neutral-100 hover:text-[#2F79B8]"
              : "text-white/80 hover:bg-white/12 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`size-3.5 transition-transform duration-200 group-hover:scale-110 ${
              isActive ? "" : "opacity-70 group-hover:opacity-100"
            }`}
          />
          {label}
          {isActive && (
            <span
              className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full transition-all duration-300 ${
                isLight ? "bg-[#2F79B8]" : "bg-[#DD9808]"
              }`}
            />
          )}
        </>
      )}
    </NavLink>
  );
}

// ── Desktop Dropdown NavItem (hover-triggered flyout) ────────────────────────
function DropdownNavItem({ label, Icon, isLight, children }) {
  const isAnyChildActive = children.some(
    (c) =>
      window.location.pathname === c.to ||
      window.location.pathname.startsWith(c.to + "/"),
  );

  return (
    <div className="relative group">
      {/* Trigger */}
      <button
        className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isAnyChildActive
            ? isLight
              ? "bg-[#2F79B8]/10 text-[#2F79B8] font-semibold"
              : "bg-white/18 text-white font-semibold shadow-sm shadow-black/10"
            : isLight
              ? "text-[#294868] hover:bg-neutral-100 hover:text-[#2F79B8]"
              : "text-white/80 hover:bg-white/12 hover:text-white"
        }`}
      >
        <Icon
          className={`size-3.5 transition-transform duration-200 ${
            isAnyChildActive ? "" : "opacity-70"
          }`}
        />
        {label}
        <ChevronDown className="size-3 transition-transform duration-300 group-hover:rotate-180" />
        {isAnyChildActive && (
          <span
            className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-3 rounded-full ${
              isLight ? "bg-[#2F79B8]" : "bg-[#DD9808]"
            }`}
          />
        )}
      </button>

      {/* Flyout panel */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 translate-y-1 group-hover:translate-y-0 z-50">
        <div className="bg-white/98 backdrop-blur-xl border border-neutral-200/60 rounded-2xl shadow-xl shadow-neutral-900/10 p-1.5 min-w-[200px] overflow-hidden">
          {/* decorative top accent */}
          <div className="h-0.5 w-full bg-gradient-to-r from-[#2F79B8] to-[#294868] rounded-full mb-1.5" />
          {children.map(({ to, label: childLabel, Icon: ChildIcon, desc }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => window.scrollTo(0, 0)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 group/item ${
                  isActive
                    ? "bg-[#2F79B8]/10 text-[#2F79B8] font-semibold"
                    : "text-[#294868] hover:bg-[#2F79B8]/8 hover:text-[#2F79B8]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#2F79B8] text-white"
                        : "bg-neutral-100 text-[#294868] group-hover/item:bg-[#2F79B8]/15 group-hover/item:text-[#2F79B8]"
                    }`}
                  >
                    <ChildIcon className="size-3.5" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium leading-tight">
                      {childLabel}
                    </span>
                    {desc && (
                      <span className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                        {desc}
                      </span>
                    )}
                  </div>
                  <ChevronRight
                    className={`size-3 ml-auto transition-all duration-150 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 ${
                      isActive ? "opacity-100 translate-x-0" : ""
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile plain NavLink item ─────────────────────────────────────────────────
function MobileNavLinkItem({ to, label, Icon, isClosing, delay, onClick }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      style={{ animationDelay: isClosing ? "0ms" : `${delay}ms` }}
      className={({ isActive }) =>
        `${isClosing ? "nav-mobile-item-closing" : "nav-mobile-item"} flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
          isActive
            ? "bg-[#2F79B8]/10 text-[#2F79B8]"
            : "text-[#294868] hover:bg-neutral-50 hover:translate-x-1"
        }`
      }
      onClick={(e) => {
        window.scrollTo(0, 0);
        if (onClick) onClick(e);
      }}
    >
      {({ isActive }) => (
        <>
          <span
            className={`size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isActive
                ? "bg-[#2F79B8] text-white shadow-sm shadow-[#2F79B8]/40"
                : "bg-neutral-100 text-[#294868]"
            }`}
          >
            <Icon className="size-3.5" />
          </span>
          <span>{label}</span>
          {isActive && (
            <ChevronRight className="size-3.5 ml-auto text-[#2F79B8]" />
          )}
        </>
      )}
    </NavLink>
  );
}

// ── Mobile Dropdown item (accordion) ─────────────────────────────────────────
function MobileDropdownItem({
  label,
  Icon,
  isClosing,
  delay,
  children,
  onClick,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ animationDelay: isClosing ? "0ms" : `${delay}ms` }}
      className={`${isClosing ? "nav-mobile-item-closing" : "nav-mobile-item"}`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-[#294868] hover:bg-neutral-50"
      >
        <span className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-neutral-100 text-[#294868]">
          <Icon className="size-3.5" />
        </span>
        <span>{label}</span>
        <ChevronDown
          className={`size-3.5 ml-auto text-[#294868]/60 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Accordion children */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 pl-4 border-l-2 border-[#2F79B8]/20 mt-0.5 mb-1 flex flex-col gap-0.5">
          {children.map(({ to, label: childLabel, Icon: ChildIcon, desc }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? "bg-[#2F79B8]/10 text-[#2F79B8] font-semibold"
                    : "text-[#294868] hover:bg-neutral-50 hover:translate-x-1"
                }`
              }
              onClick={(e) => {
                window.scrollTo(0, 0);
                if (onClick) onClick(e);
              }}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`size-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive
                        ? "bg-[#2F79B8] text-white"
                        : "bg-neutral-100 text-[#294868]"
                    }`}
                  >
                    <ChildIcon className="size-3" />
                  </span>
                  <div className="flex flex-col">
                    <span className="font-medium leading-tight">
                      {childLabel}
                    </span>
                    {desc && (
                      <span className="text-[10px] text-neutral-400">
                        {desc}
                      </span>
                    )}
                  </div>
                  {isActive && (
                    <ChevronRight className="size-3 ml-auto text-[#2F79B8]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ theme = "transparent" }) {
  const { user } = useAuth();

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Logged out successfully!");
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isLight = scrolled || theme === "light";
  const [useMobileView, setUseMobileView] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1280 : false,
  );

  const navWrapperRef = useRef(null);
  const containerRef = useRef(null);

  const navItems = [
    { icon: Home, label: "Home", to: "/" },
    {
      icon: Info,
      label: "About",
      dropdown: true,
      children: [
        {
          to: "/about",
          label: "About TPS",
          Icon: School,
          desc: "Our story, vision & values",
        },
        {
          to: "/infra",
          label: "Infrastructure",
          Icon: Building2,
          desc: "Campus, labs & facilities",
        },
        {
          to: "/faculty",
          label: "Faculty",
          Icon: Users,
          desc: "Our teachers, our pride",
        },
        {
          to: "/mission",
          label: "Mission",
          Icon: BookOpen,
          desc: "Our Mission",
        },
        {
          to: "/news",
          label: "News & Events",
          Icon: Newspaper,
          desc: "Newspaper archive & updates",
        },
      ],
    },
    { icon: BookOpen, label: "Academics", dropdown: true, children : [
      {
          to: "/result",
          label: "Result",
          Icon: BookOpen,
          desc: "Result of TPS",
        },
        {
          to: "/calendar",
          label: "Annual Calendar",
          Icon: Calendar,
          desc: "Annual Calendar of TPS",
        },
        {
          to: "/co-curricular-clubs",
          label: "Co-curricular Clubs",
          Icon: Users,
          desc: "Co-curricular Clubs of TPS",
        }
    ] },
    { icon: FileText, label: "Admissions", to: "/admission" },
    {
      icon: Users,
      label: "Campus Life",
      dropdown: true,
      children: [
        {
          to: "/gallery",
          label: "Gallery",
          Icon: GalleryHorizontal,
          desc: "Events, achievements & memories",
        },
        {
          to: "/alumni",
          label: "Alumni",
          Icon: Users,
          desc: "Our graduates & legacy",
        },
        {
          to: "/virtual-tour",
          label: "Virtual Tour",
          Icon: Compass,
          desc: "Interactive campus walkthrough",
        },
        {
          to: "/magazine",
          label: "Magazine",
          Icon: BookOpen,
          desc: "Our school magazine",
        },
      ],
    },
    { icon: Mail, label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1280px)");
    const onChange = (e) => setUseMobileView(!e.matches);
    setUseMobileView(!mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileMenuOpen(false);
      setIsClosing(false);
    }, 280);
  };

  useEffect(() => {
    if (!useMobileView) {
      closeMenu();
    }
  }, [useMobileView]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileMenuOpen &&
        !isClosing &&
        navWrapperRef.current &&
        !navWrapperRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen, isClosing]);

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-16px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0)    scaleY(1); }
        }
        @keyframes slideUp {
          from { opacity: 1; transform: translateY(0)    scaleY(1); }
          to   { opacity: 0; transform: translateY(-16px) scaleY(0.95); }
        }
        @keyframes fadeInItem {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeOutItem {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-10px); }
        }
        @keyframes navGlow {
          0%, 100% { box-shadow: 0 0 18px 2px rgba(47,121,184,0.18); }
          50%       { box-shadow: 0 0 32px 6px rgba(47,121,184,0.32); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position:  200% center; }
        }
        .nav-pill-float { animation: navGlow 3s ease-in-out infinite; }
        .nav-mobile-drawer         { animation: slideDown 0.3s cubic-bezier(0.34,1.56,0.64,1) both; transform-origin: top; }
        .nav-mobile-drawer-closing { animation: slideUp  0.28s cubic-bezier(0.4,0,0.6,1)       both; transform-origin: top; }
        .nav-mobile-item         { animation: fadeInItem  0.22s cubic-bezier(0.4,0,0.2,1) both; }
        .nav-mobile-item-closing { animation: fadeOutItem 0.18s cubic-bezier(0.4,0,0.6,1) both; }
        .nav-cta-shimmer {
          background: linear-gradient(110deg, #C22715 40%, #e8432e 50%, #C22715 60%);
          background-size: 200% auto;
          animation: shimmer 2.4s linear infinite;
        }
      `}</style>

      <header
        ref={navWrapperRef}
        className="fixed z-50 top-0 left-0 right-0 w-full"
      >
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            scrolled
              ? "mx-0 mt-0 rounded-none"
              : "mx-3 sm:mx-6 lg:mx-10 mt-3 rounded-2xl"
          }`}
        >
          <div
            className={`transition-all duration-500 ${
              scrolled
                ? "bg-white/96 backdrop-blur-xl shadow-lg border-b border-neutral-200/80 rounded-none"
                : theme === "light"
                  ? "bg-white/90 backdrop-blur-md border border-neutral-200/50 shadow-sm rounded-2xl nav-pill-float"
                  : "bg-gradient-to-r from-white/22 via-white/8 to-white/22 backdrop-blur-md border border-white/20 rounded-2xl nav-pill-float"
            }`}
          >
            <div
              ref={containerRef}
              className="max-w-[1400px] flex mx-auto px-4 sm:px-5 lg:px-8 py-2.5 sm:py-3 justify-between items-center gap-4"
            >
              <div className="flex items-center gap-2.5 shrink-0">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="size-16 sm:size-18 object-contain shrink-0"
                />
                <div className="flex flex-col leading-none">
                  <span
                    className={`font-extrabold text-sm sm:text-base tracking-tight transition-colors duration-300 ${
                      isLight ? "text-[#de0a26]" : "text-[#de0a26] drop-shadow"
                    }`}
                  >
                    <span className="text-xl">Takshashila</span>
                    <span
                      className={`ml-1 transition-colors duration-300 ${
                        isLight ? "text-[#2F79B8]" : "text-[#2F79B8]"
                      }`}
                    >
                      Public School
                    </span>
                  </span>
                  <span
                    className={`font-medium uppercase text-[8px] sm:text-[9px] tracking-[2.5px] mt-0.5 transition-colors duration-300 ${
                      isLight ? "text-[#294868]/70" : "text-white/60"
                    }`}
                  >
                    Bijlipura · Shahjahanpur
                  </span>
                </div>
              </div>

              <nav
                className={`items-center gap-2 transition-opacity duration-300 ${
                  useMobileView ? "hidden" : "flex"
                }`}
              >
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    <DropdownNavItem
                      key={item.label}
                      label={item.label}
                      Icon={item.icon}
                      isLight={isLight}
                      children={item.children}
                    />
                  ) : (
                    <NavLinkItem
                      key={item.label}
                      to={item.to}
                      label={item.label}
                      Icon={item.icon}
                      isLight={isLight}
                    />
                  ),
                )}
              </nav>

              {!user ? (
                <NavLink
                  to="/login"
                  className={`items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0 ${
                    useMobileView ? "hidden" : "inline-flex"
                  } ${
                    isLight
                      ? "nav-cta-shimmer text-white shadow-md shadow-[#C22715]/25 hover:shadow-lg hover:shadow-[#C22715]/35 hover:scale-105"
                      : "bg-white/18 text-white border border-white/30 hover:bg-white/28 hover:scale-105"
                  }`}
                >
                  <LogIn className="size-4" />
                  Login
                </NavLink>
              ) : (
                <button
                  onClick={handleLogout}
                  className={`items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shrink-0 ${
                    useMobileView ? "hidden" : "inline-flex"
                  } ${
                    isLight
                      ? "nav-cta-shimmer text-white shadow-md shadow-[#C22715]/25 hover:shadow-lg hover:shadow-[#C22715]/35 hover:scale-105"
                      : "bg-white/18 text-white border border-white/30 hover:bg-white/28 hover:scale-105"
                  }`}
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              )}

              <button
                className={`p-2 rounded-xl transition-all duration-200 active:scale-90 ${
                  useMobileView ? "block" : "hidden"
                } ${
                  isLight
                    ? "text-[#294868] bg-neutral-100 hover:bg-neutral-200"
                    : "text-white bg-white/15 border border-white/20 hover:bg-white/25"
                }`}
                onClick={() =>
                  mobileMenuOpen ? closeMenu() : setMobileMenuOpen(true)
                }
                aria-label="Toggle menu"
              >
                <span className="relative block size-5">
                  <span
                    className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen || isClosing ? "opacity-100 rotate-0" : "opacity-0 rotate-90"}`}
                  >
                    <X className="size-5" />
                  </span>
                  <span
                    className={`absolute inset-0 transition-all duration-200 ${mobileMenuOpen || isClosing ? "opacity-0 -rotate-90" : "opacity-100 rotate-0"}`}
                  >
                    <Menu className="size-5" />
                  </span>
                </span>
              </button>
            </div>
          </div>

          {(mobileMenuOpen || isClosing) && useMobileView && (
            <div
              className={`overflow-hidden ${scrolled ? "rounded-none" : "rounded-b-2xl"} ${
                isClosing ? "nav-mobile-drawer-closing" : "nav-mobile-drawer"
              }`}
            >
              <div className="bg-white/98 backdrop-blur-xl px-3 py-3 flex flex-col gap-0.5">
                {navItems.map((item, i) =>
                  item.dropdown ? (
                    <MobileDropdownItem
                      key={item.label}
                      label={item.label}
                      Icon={item.icon}
                      isClosing={isClosing}
                      delay={i * 45}
                      children={item.children}
                      onClick={closeMenu}
                    />
                  ) : (
                    <MobileNavLinkItem
                      key={item.label}
                      to={item.to}
                      label={item.label}
                      Icon={item.icon}
                      isClosing={isClosing}
                      delay={i * 45}
                      onClick={closeMenu}
                    />
                  ),
                )}
              </div>

              {/* CTA */}
              <div className="bg-white/98 backdrop-blur-xl px-3 pb-4 flex flex-col gap-2">
                {!user ? (
                  <NavLink
                    to="/login"
                    style={{ animationDelay: isClosing ? "0ms" : "290ms" }}
                    className={`${isClosing ? "nav-mobile-item-closing" : "nav-mobile-item"} nav-cta-shimmer w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-[#C22715]/25 hover:shadow-lg transition-all active:scale-95`}
                    onClick={() => closeMenu()}
                  >
                    <LogIn className="size-4" />
                    Login
                  </NavLink>
                ) : (
                  <button
                    style={{ animationDelay: isClosing ? "0ms" : "290ms" }}
                    className={`${isClosing ? "nav-mobile-item-closing" : "nav-mobile-item"} nav-cta-shimmer w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white shadow-md shadow-[#C22715]/25 hover:shadow-lg transition-all active:scale-95`}
                    onClick={() => {
                      handleLogout();
                      closeMenu();
                    }}
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
