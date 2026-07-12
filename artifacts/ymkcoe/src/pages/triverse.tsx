import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, 
  ArrowUpRight,
  ExternalLink,
  Code, 
  Layout, 
  Database, 
  Cloud, 
  Cpu, 
  Sparkles, 
  Users, 
  Check, 
  ChevronRight, 
  Award, 
  Shield, 
  Zap, 
  Lock,
  Search,
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Sliders,
  TrendingUp,
  MapPin,
  Laptop,
  CheckCircle,
  Menu,
  X,
  Star,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Play,
  RotateCcw,
  Sun,
  Moon
} from "lucide-react";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss, 
  SiHtml5, 
  SiCss, 
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiLaravel, 
  SiPhp, 
  SiPython, 
  SiExpress, 
  SiMysql, 
  SiPostgresql, 
  SiFirebase, 
  SiMongodb, 
  SiCloudflare, 
  SiDocker, 
  SiGithub, 
  SiVercel, 
  SiNetlify, 
  SiFigma, 
  SiCanva, 
  SiOpenai, 
  SiGooglegemini, 
  SiClaude, 
  SiN8N, 
  SiMake, 
  SiWhatsapp 
} from "react-icons/si";

// Custom SVGs for Adobe & AWS which aren't in this version of Si icons
const SiAdobephotoshop = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="4" fill="#001E36" stroke="#31A8FF" strokeWidth="1" />
    <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#31A8FF" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="900" letterSpacing="-0.5">Ps</text>
  </svg>
);

const SiAdobeillustrator = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="24" height="24" rx="4" fill="#261300" stroke="#FF9A00" strokeWidth="1" />
    <text x="50%" y="62%" dominantBaseline="middle" textAnchor="middle" fill="#FF9A00" fontSize="10.5" fontFamily="Inter, sans-serif" fontWeight="900" letterSpacing="-0.5">Ai</text>
  </svg>
);

const SiAmazonwebservices = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M5.4 12.3c0-1.8.8-2.6 2-2.6.9 0 1.5.5 1.7 1.1h.1v-1h1.5v5.3H9.2v-.9h-.1c-.3.6-.9 1-1.8 1-1.3-.1-2-.9-2-2.9zm3.8.3v-.6c0-.9-.4-1.3-1-1.3-.6 0-1 .4-1 1.3v.6c0 1 .4 1.4 1 1.4.6-.1 1-.5 1-1.4zM11.6 9.8h1.6l.9 3.2.9-3.2h1.6l.9 3.2.9-3.2h1.6l-1.7 5.3H17l-.9-3.1-.9 3.1h-1.6l-1.8-5.3z" fill="currentColor"/>
    <path d="M4.6 11.2c.4-.3.9-.4 1.4-.4.8 0 1.3.4 1.3 1.2v2.1c0 .7.4.9.7.9.2 0 .3 0 .4-.1v1c-.2.1-.4.1-.7.1-.7 0-1.1-.3-1.2-1h-.1c-.3.6-.9 1.1-1.7 1.1-.9 0-1.6-.5-1.6-1.6 0-1.3.9-1.8 2.5-1.8h.8v-.2c0-.5-.3-.7-.8-.7-.4 0-.8.1-1.1.3l-.2-.9zm2.1 2.3v-.3h-.7c-.9 0-1.3.2-1.3.8 0 .4.3.7.8.7.6.1 1.2-.4 1.2-1.2z" fill="currentColor"/>
    <path d="M2.5 17.5c4.3 2.5 9.7 2.5 14 0" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M16.5 17.5l.5.8h-1.2l.7-.8z" fill="#FF9900"/>
  </svg>
);


// CountUp Component for stats
function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, isVisible]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Triverse() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [demoStatus, setDemoStatus] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const isDark = theme === "dark";

  // Bento Interactive States
  const [bentoHover, setBentoHover] = useState<number | null>(null);
  const [activeTechCategory, setActiveTechCategory] = useState("All");

  const filteredTech = TECHNOLOGIES.filter((tech) => {
    if (activeTechCategory === "All") return true;
    if (activeTechCategory === "Frontend") return tech.category === "Frontend";
    if (activeTechCategory === "Backend") return tech.category === "Backend" || tech.category === "Database";
    if (activeTechCategory === "Cloud") return tech.category === "Cloud";
    if (activeTechCategory === "Design & AI") return tech.category === "Design" || tech.category === "AI";
    return true;
  });

  // Custom Cursor and Mouse Glow tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDemoRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoStatus("success");
    setTimeout(() => setDemoStatus(null), 4000);
  };

  const techList = [
    "React", "Next.js", "Vue", "Tailwind", "Node.js", "Laravel", "PHP", 
    "Python", "PostgreSQL", "MySQL", "Firebase", "AWS", "Cloudflare", 
    "Vercel", "Figma", "GitHub", "OpenAI", "Claude", "Gemini"
  ];

  return (
    <div 
      className={`min-h-screen transition-colors duration-500 font-sans overflow-x-hidden relative ${
        isDark 
          ? "bg-[#0B1020] text-white selection:bg-[#6C3CF0]/30 selection:text-white" 
          : "bg-[#F8F9FA] text-slate-900 selection:bg-[#6C3CF0]/10 selection:text-slate-900"
      }`}
      style={{
        "--grid-image": isDark 
          ? "linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)"
          : "linear-gradient(to right, rgba(15, 23, 42, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(15, 23, 42, 0.02) 1px, transparent 1px)"
      } as React.CSSProperties}
    >
      
      {/* Dynamic Keyframes for Marquee & Animations */}
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left {
          display: inline-flex;
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          display: inline-flex;
          animation: marquee-right 45s linear infinite;
        }
        .noise-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.015;
        }
        .grid-bg {
          background-size: 50px 50px;
          background-image: var(--grid-image);
        }
      `}</style>

      {/* Noise Overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50" />

      {/* Custom Cursor */}
      <div 
        className={`fixed pointer-events-none z-50 rounded-full border transition-all duration-150 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center ${
          isDark 
            ? "border-[#8B5CF6]/50 bg-[#6C3CF0]/10 mix-blend-screen" 
            : "border-[#6C3CF0]/50 bg-[#6C3CF0]/5 mix-blend-multiply"
        } ${
          cursorHovered ? "w-24 h-24 bg-[#6C3CF0]/20 scale-100" : "w-6 h-6 scale-75"
        }`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      >
        {cursorHovered && cursorText && (
          <span className={`text-[10px] uppercase font-bold tracking-widest animate-pulse ${isDark ? 'text-[#dca5ff]' : 'text-[#6C3CF0]'}`}>
            {cursorText}
          </span>
        )}
      </div>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#6C3CF0] via-[#8B5CF6] to-pink-500 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Background Interactive Mesh Gradients */}
      <div className={`absolute top-0 inset-x-0 h-[1000px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_50%_0px,rgba(108,60,240,0.18),transparent_50%)]' : 'bg-[radial-gradient(circle_at_50%_0px,rgba(108,60,240,0.05),transparent_50%)]'}`} />
      <div className={`absolute top-[1800px] right-0 w-[600px] h-[600px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.06),transparent_60%)]' : 'bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.02),transparent_60%)]'}`} />
      <div className={`absolute top-[3800px] left-0 w-[800px] h-[800px] pointer-events-none z-0 transition-opacity duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(108,60,240,0.06),transparent_65%)]' : 'bg-[radial-gradient(circle_at_center,rgba(108,60,240,0.02),transparent_65%)]'}`} />

      {/* Alert Overlay */}
      <AnimatePresence>
        {demoStatus === "success" && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className={`fixed bottom-10 right-10 z-50 backdrop-blur-2xl px-6 py-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm border transition-colors ${
              isDark ? 'bg-[#0B1020]/95 border-[#8B5CF6]/50 text-white' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isDark ? 'bg-[#6C3CF0]/25 border-[#8B5CF6]/30' : 'bg-slate-100 border-slate-200'
            }`}>
              <Check className={`w-5 h-5 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
            </div>
            <div>
              <h5 className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Consultation Initiated</h5>
              <p className={`text-xs mt-0.5 ${isDark ? 'text-white/50' : 'text-slate-500'}`}>We will reach out to you via your email calendar soon.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Navigation Bar */}
      <header className={`sticky top-0 w-full z-40 backdrop-blur-md border-b transition-colors duration-500 ${isDark ? 'bg-[#0B1020]/75 border-white/5 text-white' : 'bg-white/75 border-slate-200/85 text-slate-900'}`}>
        <div className="container mx-auto px-8 md:px-16 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C3CF0] to-[#8B5CF6] flex items-center justify-center font-black text-white text-base tracking-tighter">
              T
            </div>
            <span className={`font-extrabold text-sm tracking-widest uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Triverse
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-10">
            <a href="#about" className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>01 / Studio</a>
            <a href="#services" className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>02 / Bento</a>
            <a href="#projects" className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>03 / Case Studies</a>
            <a href="#process" className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>04 / Workflow</a>
            <a href="#testimonials" className={`text-xs font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/50 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>05 / Reviews</a>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] uppercase font-bold tracking-widest transition-all ${
                isDark 
                  ? "bg-white/5 border-white/10 text-white/80 hover:bg-white/10" 
                  : "bg-black/5 border-slate-200 text-slate-800 hover:bg-black/10"
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{isDark ? "Light Theme" : "Current Theme"}</span>
            </button>

            <Link href="/">
              <span className={`text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${isDark ? 'text-white/40 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                <ChevronLeft className="w-4 h-4" /> Client Site
              </span>
            </Link>
            <a 
              href="#contact"
              className={`cursor-pointer px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg ${
                isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 cursor-pointer transition-colors ${isDark ? 'text-white/80 hover:text-white' : 'text-slate-700 hover:text-slate-950'}`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`lg:hidden w-full border-b px-8 py-8 transition-colors duration-500 ${isDark ? 'bg-[#0B1020]/95 border-white/5' : 'bg-white/95 border-slate-200'}`}
            >
              <nav className="flex flex-col gap-6">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>01 / Studio</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>02 / Bento</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>03 / Case Studies</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>04 / Workflow</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>05 / Reviews</a>
                <hr className={`transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`} />
                
                <button
                  onClick={() => {
                    setTheme(isDark ? "light" : "dark");
                    setMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-full border text-xs uppercase font-bold tracking-widest transition-all ${
                    isDark 
                      ? "bg-white/5 border-white/10 text-white" 
                      : "bg-black/5 border-slate-200 text-slate-800"
                  }`}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  <span>{isDark ? "Light Theme" : "Current Theme"}</span>
                </button>

                <Link href="/">
                  <span className={`text-xs flex items-center gap-1 cursor-pointer transition-colors ${isDark ? 'text-white/40' : 'text-slate-500 hover:text-slate-800'}`}>
                    <ChevronLeft className="w-4 h-4" /> Return to Client Site
                  </span>
                </Link>
                <a 
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-4 rounded-full font-bold text-center text-xs tracking-widest uppercase mt-2 transition-all ${
                    isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Start Project
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cinematic Hero */}
      <section className="relative min-h-[95vh] flex items-center pt-10 pb-20 overflow-hidden grid-bg z-10">
        <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500 ${isDark ? 'from-[#0B1020] via-transparent to-[#0B1020]' : 'from-[#F8F9FA] via-transparent to-[#F8F9FA]'}`} />
        
        {/* Dynamic Glow Spotlight (Desktop only, reactive to cursor) */}
        <div 
          className={`absolute w-[800px] h-[800px] pointer-events-none z-0 hidden lg:block transition-all duration-300 ${isDark ? 'bg-[radial-gradient(circle,rgba(108,60,240,0.08),transparent_70%)]' : 'bg-[radial-gradient(circle,rgba(108,60,240,0.03),transparent_70%)]'}`}
          style={{ left: mousePos.x - 400, top: mousePos.y - 400 }}
        />

        <div className="container mx-auto px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Headline Block */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-colors ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-200/50 border-slate-300/30'}`}>
                <div className={`w-1.5 h-1.5 rounded-full animate-ping ${isDark ? 'bg-[#8B5CF6]' : 'bg-[#6C3CF0]'}`} />
                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isDark ? 'text-white/60' : 'text-slate-600'}`}>Triverse Solutions v2.0</span>
              </div>

              <h1 className={`text-5xl md:text-7xl lg:text-[88px] font-black tracking-tighter leading-[0.9] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                WE DESIGN<br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDark ? 'from-[#6C3CF0] via-[#8B5CF6] to-[#dca5ff]' : 'from-[#6C3CF0] via-[#8B5CF6] to-[#a268ff]'}`}>
                  DIGITAL
                </span><br />
                ECOSYSTEMS.
              </h1>

              <p className={`text-lg md:text-2xl font-light leading-relaxed max-w-xl transition-colors duration-500 ${isDark ? 'text-white/60' : 'text-slate-650'}`}>
                We craft bespoke branding, high-performance web products, ERP automation, and conversion architecture that scale institutions and businesses.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <a 
                  href="#projects"
                  onMouseEnter={() => { setCursorHovered(true); setCursorText("Go"); }}
                  onMouseLeave={() => { setCursorHovered(false); setCursorText(""); }}
                  className="w-full sm:w-auto bg-[#6C3CF0] hover:bg-[#5b2fdd] text-white px-8 py-5 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all shadow-xl shadow-[#6C3CF0]/25 flex items-center justify-center gap-3 group"
                >
                  Explore Studio Work
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="#contact"
                  className={`w-full sm:w-auto border px-8 py-5 rounded-full text-xs font-extrabold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    isDark 
                      ? 'border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white' 
                      : 'border-slate-200 hover:border-slate-350 bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  Let's Collaborate
                </a>
              </div>
            </div>

            {/* Immersive Floating Mockup (3D Tilted Glassware mockup) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute w-80 h-80 bg-[#6C3CF0]/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl shadow-2xl p-6 transform -rotate-2 hover:rotate-0 transition-transform duration-700 hover:shadow-cyan-500/5 group">
                {/* Interface Header Bar */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/40" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                    <span className="w-3 h-3 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">triverse_studio_shell</span>
                </div>

                {/* Simulated Figma Dashboard */}
                <div className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <div className="h-2 w-16 bg-[#8B5CF6]/50 rounded-full" />
                    <div className="h-5 w-40 bg-white/10 rounded-lg" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                      <div className="h-6 w-6 rounded-lg bg-[#6C3CF0]/40 flex items-center justify-center text-[10px] font-bold">QA</div>
                      <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                      <div className="h-3 w-16 bg-white/10 rounded-md" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                      <div className="h-6 w-6 rounded-lg bg-[#8B5CF6]/40 flex items-center justify-center text-[10px] font-bold">ERP</div>
                      <div className="h-1.5 w-12 bg-white/20 rounded-full" />
                      <div className="h-3 w-16 bg-white/10 rounded-md" />
                    </div>
                  </div>

                  <div className="p-4.5 rounded-2xl bg-[#6C3CF0]/10 border border-[#8B5CF6]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#dca5ff]" />
                      <span className="text-[10px] font-mono text-white/70">UX System Active</span>
                    </div>
                    <span className="text-[9px] font-mono text-[#8B5CF6] uppercase font-bold animate-pulse">Running</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Editorial About (Magazine Layout) */}
      <section id="about" className={`py-32 border-t relative z-10 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Col (Architectural Sidebar) */}
            <div className="lg:col-span-4 space-y-4">
              <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>01 / CONCEPT</span>
              <h3 className={`text-4xl md:text-5xl font-black tracking-tight leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                WE DO NOT BUILD TEMPLATES.
              </h3>
            </div>

            {/* Right Col (Editorial copy blocks & Asymmetrical offsets) */}
            <div className="lg:col-span-8 space-y-12">
              <p className={`text-2xl md:text-4xl font-extralight leading-relaxed max-w-2xl transition-colors ${isDark ? 'text-white/80' : 'text-slate-800'}`}>
                Generic sites fail to build authority. We construct custom digital architectures combining editorial layouts with enterprise capabilities to drive real user conversion.
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <div className="space-y-4">
                  <h4 className={`text-lg font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Bespoke Architectural Engineering</h4>
                  <p className={`text-xs leading-relaxed font-light transition-colors ${isDark ? 'text-white/55' : 'text-slate-650'}`}>
                    Every pixel of our layout grid is built by hand. We map user journeys, research bottlenecks, and draft custom-coded frameworks that load within milliseconds.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className={`text-lg font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Enterprise-Grade Automation</h4>
                  <p className={`text-xs leading-relaxed font-light transition-colors ${isDark ? 'text-white/55' : 'text-slate-650'}`}>
                    From complex college admissions pipelines to bespoke database-driven student ERP platforms, we construct tools that scale administrative tasks securely.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid (Services Section) */}
      <section id="services" className={`py-32 border-t relative z-10 scroll-mt-20 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-[#F8F9FA] border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="mb-20 space-y-4 text-left">
            <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>02 / CORE SPECIALTIES</span>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>High-Performance Bento Grid.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Card 1: Double Size */}
            <div 
              onMouseEnter={() => setBentoHover(1)}
              onMouseLeave={() => setBentoHover(null)}
              className={`md:col-span-2 relative p-8 md:p-12 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between group min-h-[350px] ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:border-[#6C3CF0]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-[#6C3CF0]/35 hover:bg-white/95 shadow-sm'
              }`}
            >
              <div className={`absolute -right-10 -bottom-10 w-64 h-64 rounded-full blur-[80px] group-hover:bg-[#6C3CF0]/25 transition-all duration-500 ${isDark ? 'bg-[#6C3CF0]/10' : 'bg-[#6C3CF0]/5'}`} />
              
              <div className="space-y-6">
                <Globe className={`w-10 h-10 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
                <div className="space-y-2">
                  <h3 className={`text-2xl font-black transition-colors ${isDark ? 'text-white group-hover:text-[#dca5ff]' : 'text-slate-900 group-hover:text-[#6C3CF0]'}`}>Custom Web Architectures</h3>
                  <p className={`text-sm leading-relaxed font-light max-w-lg transition-colors ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                    High-performance platforms deployed on edge networks, built from the ground up for speed, visual authority, and zero template footprint.
                  </p>
                </div>
              </div>

              {/* Graphical Showcase in Card */}
              <div className="flex gap-2 pt-6">
                {["React", "Next.js", "Tailwind", "Vercel"].map(tech => (
                  <span 
                    key={tech} 
                    className={`text-[9px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                      isDark ? 'bg-white/5 border-white/5 text-white/60' : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Card 2: Single Size */}
            <div 
              onMouseEnter={() => setBentoHover(2)}
              onMouseLeave={() => setBentoHover(null)}
              className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between group min-h-[350px] ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:border-[#6C3CF0]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-[#6C3CF0]/35 hover:bg-white/95 shadow-sm'
              }`}
            >
              <div className="space-y-6">
                <Layout className={`w-10 h-10 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-[#dca5ff]' : 'text-slate-900 group-hover:text-[#6C3CF0]'}`}>UI/UX Craftsmanship</h3>
                  <p className={`text-xs leading-relaxed font-light transition-colors ${isDark ? 'text-white/55' : 'text-slate-500'}`}>
                    Every layout layout grid broken intentionally. Interactive mouse tracking, glass structures, and typography that flows architecturally.
                  </p>
                </div>
              </div>

              <div className={`w-full h-1 rounded-full overflow-hidden transition-colors ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                <div className={`h-full bg-[#8B5CF6] transition-all duration-500 ${bentoHover === 2 ? "w-full" : "w-1/3"}`} />
              </div>
            </div>

            {/* Card 3: Single Size */}
            <div 
              onMouseEnter={() => setBentoHover(3)}
              onMouseLeave={() => setBentoHover(null)}
              className={`relative p-8 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between group min-h-[350px] ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:border-[#6C3CF0]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-[#6C3CF0]/35 hover:bg-white/95 shadow-sm'
              }`}
            >
              <div className="space-y-6">
                <Cpu className={`w-10 h-10 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold transition-colors ${isDark ? 'text-white group-hover:text-[#dca5ff]' : 'text-slate-900 group-hover:text-[#6C3CF0]'}`}>Admission Pipelines</h3>
                  <p className={`text-xs leading-relaxed font-light transition-colors ${isDark ? 'text-white/55' : 'text-slate-500'}`}>
                    Frictionless option filling, document parsing, and automatic transactional status updates built for massive student scales.
                  </p>
                </div>
              </div>

              <div className={`flex justify-between items-center text-[10px] font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-400'}`}>
                <span>Verification Workflow</span>
                <span className={isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}>Active</span>
              </div>
            </div>

            {/* Card 4: Double Size */}
            <div 
              onMouseEnter={() => setBentoHover(4)}
              onMouseLeave={() => setBentoHover(null)}
              className={`md:col-span-2 relative p-8 md:p-12 rounded-3xl border transition-all duration-500 overflow-hidden flex flex-col justify-between group min-h-[350px] ${
                isDark ? 'bg-white/[0.02] border-white/5 hover:border-[#6C3CF0]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200 hover:border-[#6C3CF0]/35 hover:bg-white/95 shadow-sm'
              }`}
            >
              <div className={`absolute -left-10 -top-10 w-64 h-64 rounded-full blur-[80px] group-hover:bg-[#8B5CF6]/25 transition-all duration-500 ${isDark ? 'bg-[#8B5CF6]/10' : 'bg-[#6C3CF0]/5'}`} />
              
              <div className="space-y-6">
                <Database className={`w-10 h-10 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
                <div className="space-y-2">
                  <h3 className={`text-2xl font-black transition-colors ${isDark ? 'text-white group-hover:text-[#dca5ff]' : 'text-slate-900 group-hover:text-[#6C3CF0]'}`}>ERP &amp; CRM Integrations</h3>
                  <p className={`text-sm leading-relaxed font-light max-w-lg transition-colors ${isDark ? 'text-white/50' : 'text-slate-500'}`}>
                    Full-cycle lead tracking, student databases, administrative grids, and scheduler tools built to replace complex legacy software.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-6">
                {["Node.js", "Laravel", "Postgres"].map(tech => (
                  <span 
                    key={tech} 
                    className={`text-[9px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                      isDark ? 'bg-white/5 border-white/5 text-white/60' : 'bg-slate-100 border-slate-200 text-slate-500'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Portfolio (Horizontal storytelling, Behance case study style) */}
      <section id="projects" className={`py-32 border-t relative z-10 scroll-mt-20 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="mb-24 space-y-4 text-left">
            <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>03 / HANDCRAFTED PROJECTS</span>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight uppercase transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Selected Case Studies.</h2>
          </div>

          <div className="space-y-40">
            
            {/* Case Study 1: Asymmetrical Left-heavy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative group">
              <div className="lg:col-span-5 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>CASE STUDY 01</span>
                  <span className={`h-[1px] w-8 ${isDark ? 'bg-white/20' : 'bg-slate-200'}`} />
                  <span className={`text-xs uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}>ERP Architecture</span>
                </div>
                
                <h3 className={`text-4xl md:text-5xl font-black leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Trihub ERP Platform
                </h3>
                
                <p className={`font-light leading-relaxed text-sm md:text-base transition-colors ${isDark ? 'text-white/60' : 'text-slate-650'}`}>
                  An enterprise resource database built to manage complete student Lifecycles, documents, administrative grids, and schedule algorithms for prominent universities.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Postgres", "Tailwind"].map(t => (
                    <span 
                      key={t} 
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                        isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-8">
                  <div>
                    <span className={`block text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>40%+</span>
                    <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Process Automation</span>
                  </div>
                  <div>
                    <span className={`block text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>100K+</span>
                    <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Active Users</span>
                  </div>
                </div>

                <button 
                  onClick={handleDemoRequest}
                  className={`cursor-pointer inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors pt-2 ${
                    isDark ? 'text-[#8B5CF6] hover:text-[#dca5ff]' : 'text-[#6C3CF0] hover:text-[#8B5CF6]'
                  }`}
                >
                  Request Demo Access <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              {/* Large Mockup display right */}
              <div 
                onMouseEnter={() => { setCursorHovered(true); setCursorText("Demo"); }}
                onMouseLeave={() => { setCursorHovered(false); setCursorText(""); }}
                className="lg:col-span-7 relative flex justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#6C3CF0]/10 to-transparent blur-3xl rounded-full" />
                <div className={`relative w-full aspect-[16/10] rounded-3xl border shadow-2xl p-4 overflow-hidden transform hover:scale-[1.02] hover:-rotate-1 transition-all duration-700 ${
                  isDark ? 'bg-white/[0.02] border-white/10 hover:border-[#6C3CF0]/30 shadow-black/50' : 'bg-slate-50 border-slate-200/80 hover:border-[#6C3CF0]/35 shadow-slate-200'
                }`}>
                  <div className={`w-full h-full rounded-2xl flex flex-col justify-between p-6 transition-colors duration-500 ${isDark ? 'bg-[#0B1020]/90' : 'bg-white'}`}>
                    <div className={`flex justify-between items-center text-[10px] font-mono pb-4 border-b ${isDark ? 'text-white/40 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                      <span>TRIHUB ERP SYSTEM v1.2</span>
                      <span>SECURE PIPELINE</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <Laptop className={`w-16 h-16 transition-colors ${isDark ? 'text-[#8B5CF6]/30' : 'text-[#6C3CF0]/30'}`} />
                    </div>
                    <div className={`h-6 w-full rounded-lg ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Case Study 2: Asymmetrical Right-heavy */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative group">
              {/* Large Mockup display left (Desktop first) */}
              <div 
                onMouseEnter={() => { setCursorHovered(true); setCursorText("Visit"); }}
                onMouseLeave={() => { setCursorHovered(false); setCursorText(""); }}
                className="lg:col-span-7 lg:order-1 order-2 relative flex justify-start"
              >
                <div className="absolute inset-0 bg-gradient-to-bl from-[#8B5CF6]/10 to-transparent blur-3xl rounded-full" />
                <div className={`relative w-full aspect-[16/10] rounded-3xl border shadow-2xl p-4 overflow-hidden transform hover:scale-[1.02] hover:rotate-1 transition-all duration-700 ${
                  isDark ? 'bg-white/[0.02] border-white/10 hover:border-[#8B5CF6]/30 shadow-black/50' : 'bg-slate-50 border-slate-200/80 hover:border-[#8B5CF6]/35 shadow-slate-200'
                }`}>
                  <div className={`w-full h-full rounded-2xl flex flex-col justify-between p-6 transition-colors duration-500 ${isDark ? 'bg-[#0B1020]/90' : 'bg-white'}`}>
                    <div className={`flex justify-between items-center text-[10px] font-mono pb-4 border-b ${isDark ? 'text-white/40 border-white/5' : 'text-slate-400 border-slate-100'}`}>
                      <span>KBIPER PORTAL LIVE</span>
                      <span>PRODUCTION</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center gap-3">
                      <span className={`text-xl font-black text-transparent bg-clip-text transition-colors duration-500 ${
                        isDark ? 'bg-gradient-to-r from-white to-white/40' : 'bg-gradient-to-r from-slate-900 to-slate-400'
                      }`}>KBIPER PHARMACY</span>
                      <span className={`text-[10px] font-mono uppercase ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>Responsive Layout</span>
                    </div>
                    <div className={`h-4 w-1/3 rounded-full ${isDark ? 'bg-white/10' : 'bg-slate-100'}`} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 lg:order-2 order-1 space-y-6 text-left">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>CASE STUDY 02</span>
                  <span className={`h-[1px] w-8 ${isDark ? 'bg-white/20' : 'bg-slate-200'}`} />
                  <span className={`text-xs uppercase ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Academic Portal</span>
                </div>
                
                <h3 className={`text-4xl md:text-5xl font-black leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  KBIPER College Ecosystem
                </h3>
                
                <p className={`font-light leading-relaxed text-sm md:text-base transition-colors ${isDark ? 'text-white/60' : 'text-slate-650'}`}>
                  A high-fidelity academic website structure showcasing courses, faculty directories, results logs, and administrative options with lightning-fast load times.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"].map(t => (
                    <span 
                      key={t} 
                      className={`text-[10px] font-mono px-2.5 py-1 rounded-md border transition-colors ${
                        isDark ? 'bg-white/5 border-white/5 text-white/40' : 'bg-slate-100 border-slate-200 text-slate-500'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex items-center gap-8">
                  <div>
                    <span className={`block text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>99%</span>
                    <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Lighthouse Score</span>
                  </div>
                  <div>
                    <span className={`block text-2xl font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>0.3s</span>
                    <span className={`text-[10px] uppercase tracking-widest font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Avg Load Speed</span>
                  </div>
                </div>

                <Link href="/">
                  <span className={`cursor-pointer inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors pt-2 ${
                    isDark ? 'text-[#8B5CF6] hover:text-[#dca5ff]' : 'text-[#6C3CF0] hover:text-[#8B5CF6]'
                  }`}>
                    Visit Live Site <ExternalLink className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Handcrafted Technology Wall Section */}
      <section className={`py-32 border-t relative z-10 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-[#F8F9FA] border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-4">
              <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>04 / THE STACK</span>
              <h2 className={`text-4xl md:text-6xl font-black tracking-tight uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Technology Wall.</h2>
              <p className={`font-light text-sm md:text-base max-w-xl transition-colors ${isDark ? 'text-white/50' : 'text-slate-650'}`}>
                We design with industry-vetted platforms. Explore the visual ecosystem of backend databases, responsive frameworks, and automation hooks we deploy.
              </p>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 z-20">
              {["All", "Frontend", "Backend", "Cloud", "Design & AI"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTechCategory(cat)}
                  className={`cursor-pointer px-4.5 py-2.5 rounded-xl text-[10px] uppercase font-bold tracking-widest transition-all border ${
                    activeTechCategory === cat 
                      ? "bg-[#6C3CF0] border-[#6C3CF0] text-white shadow-lg shadow-[#6C3CF0]/25" 
                      : isDark
                        ? "bg-white/5 border-white/5 text-white/50 hover:text-white hover:bg-white/10"
                        : "bg-black/5 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-black/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Double Row Marquee Wrapper */}
        <div className="relative w-full overflow-hidden py-4 select-none">
          {/* Shadow Gradient overlays on side masks */}
          <div className={`absolute inset-y-0 left-0 w-32 md:w-44 bg-gradient-to-r z-10 pointer-events-none transition-all duration-500 ${isDark ? 'from-[#0B1020]' : 'from-[#F8F9FA]'}`} />
          <div className={`absolute inset-y-0 right-0 w-32 md:w-44 bg-gradient-to-l z-10 pointer-events-none transition-all duration-500 ${isDark ? 'from-[#0B1020]' : 'from-[#F8F9FA]'}`} />

          {/* Row 1: Leftward Marquee */}
          <div className="w-full overflow-hidden whitespace-nowrap relative py-4 mb-4">
            <div className="flex gap-4 min-w-max hover:[animation-play-state:paused] animate-marquee-left">
              {filteredTech.filter((_, i) => i % 2 === 0).concat(filteredTech.filter((_, i) => i % 2 === 0)).map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div 
                    key={tech.name + "-row1-" + idx}
                    className={`inline-flex group relative px-8 py-5 rounded-2xl border transition-all duration-500 items-center gap-4 min-w-[220px] ${
                      isDark ? 'bg-white/[0.01] border-white/5 hover:border-[var(--hover-color)]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200/80 hover:border-[var(--hover-color)]/35 hover:bg-white shadow-sm hover:shadow-lg hover:shadow-slate-200/20'
                    }`}
                    style={{ 
                      '--hover-color': tech.color
                    } as React.CSSProperties}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(120px at center, ${tech.color}, transparent 80%)`
                      }}
                    />
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${isDark ? 'text-white/30 group-hover:text-[var(--hover-color)]' : 'text-slate-400 group-hover:text-[var(--hover-color)]'}`} />
                    <div>
                      <span className={`block text-[11px] font-bold transition-colors ${isDark ? 'text-white/80 group-hover:text-white' : 'text-slate-850 group-hover:text-slate-950'}`}>{tech.name}</span>
                      <span className={`block text-[8px] font-mono transition-colors mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{tech.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Row 2: Rightward Marquee */}
          <div className="w-full overflow-hidden whitespace-nowrap relative py-4">
            <div className="flex gap-4 min-w-max hover:[animation-play-state:paused] animate-marquee-right">
              {filteredTech.filter((_, i) => i % 2 !== 0).concat(filteredTech.filter((_, i) => i % 2 !== 0)).map((tech, idx) => {
                const Icon = tech.icon;
                return (
                  <div 
                    key={tech.name + "-row2-" + idx}
                    className={`inline-flex group relative px-8 py-5 rounded-2xl border transition-all duration-500 items-center gap-4 min-w-[220px] ${
                      isDark ? 'bg-white/[0.01] border-white/5 hover:border-[var(--hover-color)]/30 hover:bg-white/[0.04]' : 'bg-white border-slate-200/80 hover:border-[var(--hover-color)]/35 hover:bg-white shadow-sm hover:shadow-lg hover:shadow-slate-200/20'
                    }`}
                    style={{ 
                      '--hover-color': tech.color
                    } as React.CSSProperties}
                  >
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{
                        background: `radial-gradient(120px at center, ${tech.color}, transparent 80%)`
                      }}
                    />
                    <Icon className={`w-7 h-7 transition-colors duration-300 ${isDark ? 'text-white/30 group-hover:text-[var(--hover-color)]' : 'text-slate-400 group-hover:text-[var(--hover-color)]'}`} />
                    <div>
                      <span className={`block text-[11px] font-bold transition-colors ${isDark ? 'text-white/80 group-hover:text-white' : 'text-slate-850 group-hover:text-slate-950'}`}>{tech.name}</span>
                      <span className={`block text-[8px] font-mono transition-colors mt-0.5 ${isDark ? 'text-white/30' : 'text-slate-400'}`}>{tech.category}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetrical Sticky Process Timeline */}
      <section id="process" className={`py-32 border-t relative z-10 scroll-mt-20 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Sticky Column */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>05 / THE METHOD</span>
              <h2 className={`text-4xl md:text-5xl font-black tracking-tight leading-none uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                The Product Pipeline.
              </h2>
              <p className={`font-light text-sm md:text-base transition-colors ${isDark ? 'text-white/50' : 'text-slate-650'}`}>
                How we navigate from discovery definitions to robust container deployments.
              </p>
            </div>

            {/* Right Scrolling Column */}
            <div className={`lg:col-span-8 space-y-16 pl-0 md:pl-12 border-l transition-colors duration-500 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
              {[
                { step: "01", title: "Discovery & Scope", desc: "A series of deep sessions defining operational targets, business processes, and tech stack boundaries." },
                { step: "02", title: "Research & Blueprinting", desc: "Analyzing competitive structures, database needs, user access layers, and information security limits." },
                { step: "03", title: "Visual & System Architecture", desc: "Designing visual layouts, component schemas, typography, custom icons, and interactive mockups." },
                { step: "04", title: "Frictionless Development", desc: "Writing clean, production-grade typescript components with responsive layout grids." },
                { step: "05", title: "Testing & Deploy", desc: "Validating speed metrics, Lighthouse constraints, database security, and cloud CDN routes." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-4">
                  <span className={`text-xs font-mono font-bold ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>{item.step} / INTERACTION</span>
                  <h3 className={`text-2xl font-black transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed font-light transition-colors ${isDark ? 'text-white/50' : 'text-slate-600'}`}>{item.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Floating Statistics (Architectural numbers) */}
      <section className={`py-24 border-t relative z-10 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-[#F8F9FA] border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            {[
              { value: 40, suffix: "+", label: "DELIVERED SYSTEMS", desc: "High-grade ERPs, portals, and websites launched." },
              { value: 100, suffix: "K+", label: "USERS REACHED", desc: "Active students, staff, and customers using our dashboards daily." },
              { value: 98, suffix: "%", label: "CLIENT RETENTION", desc: "Trust earned through consistent operational performance." }
            ].map((stat, idx) => (
              <div key={idx} className={`space-y-4 border-t pt-8 transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                <span className={`text-[10px] font-mono tracking-widest font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>{stat.label}</span>
                <h3 className={`text-6xl md:text-7xl font-black leading-none transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </h3>
                <p className={`text-xs font-light leading-relaxed transition-colors ${isDark ? 'text-white/50' : 'text-slate-650'}`}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Triverse (Architectural offset cards) */}
      <section className={`py-32 border-t relative z-10 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="mb-20 space-y-4 text-left">
            <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>06 / DESIGN STANDARDS</span>
            <h2 className={`text-4xl md:text-6xl font-black tracking-tight uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Why Partner with Us.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Layout, title: "Pure Figma Craftsmanship", desc: "Bespoke user interface grids with generous whitespace and custom vector icons." },
              { icon: Zap, title: "Lighthouse Optimized Speed", desc: "We target sub-second page loads and pure typescript compilation parameters." },
              { icon: Shield, title: "Security & Vault Architectures", desc: "Ensuring secure token authentication protocols, SQL sanitation, and TLS endpoints." }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-8 rounded-3xl border transition-all duration-500 space-y-4 ${
                    isDark ? 'bg-white/[0.02] border-white/5 hover:border-white/10' : 'bg-[#F8F9FA] border-slate-200 hover:border-slate-350 shadow-sm'
                  }`}
                >
                  <Icon className={`w-8 h-8 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`} />
                  <h3 className={`text-lg font-bold uppercase tracking-wider transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                  <p className={`text-xs leading-relaxed font-light transition-colors ${isDark ? 'text-white/50' : 'text-slate-650'}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials (Magazine Quote Slider) */}
      <section id="testimonials" className={`py-32 border-t relative z-10 scroll-mt-20 transition-colors duration-500 ${isDark ? 'bg-[#0b1020]/90 border-white/5' : 'bg-[#F8F9FA] border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-5xl text-left">
          <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block mb-12 ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>07 / ENDORSEMENTS</span>
          
          <div className="space-y-12">
            <p className={`text-3xl md:text-5xl font-light italic leading-snug transition-colors duration-500 ${isDark ? 'text-white/90' : 'text-slate-800'}`}>
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-8 border-t transition-colors ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
              <div>
                <h4 className={`text-lg font-bold transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{testimonials[activeTestimonial].author}</h4>
                <p className={`text-xs uppercase tracking-widest font-mono transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{testimonials[activeTestimonial].role} &mdash; {testimonials[activeTestimonial].institution}</p>
              </div>

              {/* Slider Toggles */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className={`p-3 rounded-full border cursor-pointer text-white transition-all ${
                    isDark ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-slate-200/50 hover:bg-slate-200/80 border-slate-300 text-slate-800'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveTestimonial(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className={`p-3 rounded-full border cursor-pointer text-white transition-all ${
                    isDark ? 'bg-white/5 hover:bg-white/10 border-white/5' : 'bg-slate-200/50 hover:bg-slate-200/80 border-slate-300 text-slate-800'
                  }`}
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Fullscreen CTA */}
      <section id="contact" className={`relative py-40 border-t overflow-hidden z-10 transition-colors duration-500 ${isDark ? 'bg-[#0B1020] border-white/5' : 'bg-[#F8F9FA] border-slate-200'}`}>
        <div className={`absolute inset-0 pointer-events-none transition-all duration-500 ${isDark ? 'bg-[radial-gradient(circle_at_center,rgba(108,60,240,0.12),transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(108,60,240,0.04),transparent_70%)]'}`} />
        
        <div className="container mx-auto px-8 md:px-16 max-w-4xl text-center relative z-10 space-y-12">
          <span className={`text-[11px] font-mono tracking-widest uppercase font-bold block ${isDark ? 'text-[#8B5CF6]' : 'text-[#6C3CF0]'}`}>08 / COLLABORATION</span>
          
          <h2 className={`text-5xl md:text-8xl font-black tracking-tighter leading-none transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            LET'S BUILD SOMETHING EXTRAORDINARY.
          </h2>

          <form onSubmit={handleDemoRequest} className="max-w-md mx-auto space-y-4 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                required
                placeholder="Enter your institutional email address" 
                className={`flex-1 border px-6 py-4 text-xs font-semibold focus:outline-none transition-all rounded-full ${
                  isDark 
                    ? 'bg-white/5 border-white/10 hover:border-white/20 focus:border-[#6C3CF0] placeholder:text-white/30 text-white' 
                    : 'bg-white border-slate-200 hover:border-slate-350 focus:border-[#6C3CF0] placeholder:text-slate-400 text-slate-800'
                }`}
              />
              <button 
                type="submit"
                className={`cursor-pointer px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase transition-all shrink-0 ${
                  isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                Initiate Roadmap
              </button>
            </div>
            <p className={`text-[10px] tracking-wider transition-colors ${isDark ? 'text-white/30' : 'text-slate-400'}`}>No obligation design drafts provided for qualified partners.</p>
          </form>
        </div>
      </section>

      {/* Brand Footer */}
      <footer className={`border-t py-16 relative z-10 transition-colors duration-500 ${isDark ? 'bg-[#070b16] border-white/5' : 'bg-[#F1F5F9] border-slate-200'}`}>
        <div className="container mx-auto px-8 md:px-16 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#6C3CF0] to-[#8B5CF6] flex items-center justify-center font-black text-white text-sm tracking-tighter">
                  T
                </div>
                <span className={`font-extrabold text-sm tracking-widest uppercase transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>TRIVERSE</span>
              </div>
              <p className={`text-xs leading-relaxed font-light max-w-xs transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                Building digital ecosystems that drive growth. Custom web product, branding, and ERP workflow architectures.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-8">
              <div className="space-y-4">
                <h5 className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Navigation</h5>
                <ul className={`space-y-2 text-xs font-light transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                  <li><a href="#about" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Studio</a></li>
                  <li><a href="#services" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Bento Grid</a></li>
                  <li><a href="#projects" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Case Studies</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h5 className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect</h5>
                <ul className={`space-y-2 text-xs font-light transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                  <li><a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>LinkedIn</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>GitHub</a></li>
                  <li><a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>Figma</a></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h5 className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>Contact</h5>
                <ul className={`space-y-2 text-xs font-light transition-colors ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
                  <li><a href="mailto:hello@triverse.solutions" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-900'}`}>hello@triverse.solutions</a></li>
                  <li><span className={isDark ? 'text-white/80' : 'text-slate-700'}>Pune, MH, India</span></li>
                </ul>
              </div>
            </div>

          </div>

          <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-wider transition-colors duration-500 ${
            isDark ? 'border-white/5 text-white/30' : 'border-slate-200 text-slate-400'
          }`}>
            <p>&copy; {new Date().getFullYear()} Triverse Solutions. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/">
                <span className={`transition-colors cursor-pointer flex items-center gap-1 ${isDark ? 'hover:text-white' : 'hover:text-slate-800'}`}>
                  <ChevronLeft className="w-3.5 h-3.5" /> Return to KBIPER site
                </span>
              </Link>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-800'}`}>Privacy Policy</a>
              <a href="#" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-slate-800'}`}>Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

// Testimonials data
const testimonials = [
  {
    quote: "Triverse Solutions rebuilt our digital presence from scratch. Their expertise in educational workflows, ERP integrations, and admission automation has saved us hundreds of operational hours. The UI is stunning and our students love it.",
    author: "Dr. Sanjay R. Arote",
    role: "Principal",
    institution: "KBIPER Pharmacy College",
    rating: 5
  },
  {
    quote: "The team at Triverse is top-tier. They don't just write code; they strategize. The CRM platform they custom-built has revolutionized how we handle incoming admission enquiries and coordinate counseling rounds.",
    author: "Prof. Sandeep R. Bhegade",
    role: "IQAC Coordinator",
    institution: "Indrayani Vidya Mandir Trust",
    rating: 5
  },
  {
    quote: "Our website is now incredibly fast, fully secure, and handles massive spikes of traffic during exam result declarations without a hiccup. Triverse is our long-term digital partner.",
    author: "Mrs. Priya Deshpande",
    role: "Registrar Liaison",
    institution: "YMKCOE Institute",
    rating: 5
  }
];

const TECHNOLOGIES = [
  // Frontend
  { name: "React", icon: SiReact, color: "#61DAFB", category: "Frontend" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", category: "Frontend" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", category: "Frontend" },
  { name: "CSS3", icon: SiCss, color: "#1572B6", category: "Frontend" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", category: "Frontend" },

  // Backend
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", category: "Backend" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "Backend" },
  { name: "PHP", icon: SiPhp, color: "#777BB4", category: "Backend" },
  { name: "Python", icon: SiPython, color: "#3776AB", category: "Backend" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF", category: "Backend" },

  // Database
  { name: "MySQL", icon: SiMysql, color: "#4479A1", category: "Database" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", category: "Database" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28", category: "Database" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", category: "Database" },

  // Cloud & DevOps
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900", category: "Cloud" },
  { name: "Cloudflare", icon: SiCloudflare, color: "#F38020", category: "Cloud" },
  { name: "Docker", icon: SiDocker, color: "#2496ED", category: "Cloud" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF", category: "Cloud" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF", category: "Cloud" },
  { name: "Netlify", icon: SiNetlify, color: "#00C8FF", category: "Cloud" },

  // Design
  { name: "Figma", icon: SiFigma, color: "#F24E1E", category: "Design" },
  { name: "Photoshop", icon: SiAdobephotoshop, color: "#31A8FF", category: "Design" },
  { name: "Illustrator", icon: SiAdobeillustrator, color: "#FF9A00", category: "Design" },
  { name: "Canva", icon: SiCanva, color: "#00C4CC", category: "Design" },

  // AI & Automation
  { name: "OpenAI", icon: SiOpenai, color: "#74A57F", category: "AI" },
  { name: "Gemini", icon: SiGooglegemini, color: "#8E75FF", category: "AI" },
  { name: "Claude", icon: SiClaude, color: "#D97706", category: "AI" },
  { name: "n8n", icon: SiN8N, color: "#FF6C37", category: "AI" },
  { name: "Make", icon: SiMake, color: "#EA2E88", category: "AI" },
  { name: "WhatsApp API", icon: SiWhatsapp, color: "#25D366", category: "AI" }
];
