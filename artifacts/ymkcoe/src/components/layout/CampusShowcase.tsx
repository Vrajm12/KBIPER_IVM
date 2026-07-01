import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  FlaskConical, 
  Building2, 
  Sparkles, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  CheckCircle2, 
  Compass,
  X,
  Play
} from "lucide-react";

interface ShowcaseItem {
  id: number;
  title: string;
  category: "Academic Labs" | "Campus Facilities" | "Student Vibe" | "Sports & Wellness";
  url: string;
  description: string;
  quickStats: string;
  specs: string[];
}

const SHOWCASE_DATABASE: ShowcaseItem[] = [
  {
    id: 1,
    title: "Formulation Science & Machine Lab",
    category: "Academic Labs",
    url: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=1200&auto=format&fit=crop",
    description: "Trainees handling rotary tablet punching machines and coating pans during lab hours under strict supervision.",
    quickStats: "12+ Workstations | High-Speed Centrifuges",
    specs: [
      "Industrial rotary tablet punching machinery",
      "Modern coating pans & granulator desks",
      "Strict Biosafety Level compliance standards",
      "Real-time formulation performance analytics"
    ]
  },
  {
    id: 2,
    title: "Advanced Research & HPLC Lab",
    category: "Academic Labs",
    url: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?q=80&w=1200&auto=format&fit=crop",
    description: "Equipped with HPLC, UV-Spectrophotometer, and dissolution testers for high-precision validation and analytical research.",
    quickStats: "HPLC & UV-Vis Spec | Research Focused",
    specs: [
      "High Performance Liquid Chromatography (HPLC)",
      "High-precision UV-Visible Spectroscopic validation",
      "Dedicated stability chambers for drug testing",
      "Collaborative project spaces for postgraduate research"
    ]
  },
  {
    id: 3,
    title: "Central Library & E-Reading Zone",
    category: "Campus Facilities",
    url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1200&auto=format&fit=crop",
    description: "Hosting 5000+ reference volumes, subscription e-journals (DelNet), and a quiet research lobby for learning.",
    quickStats: "5,000+ Volumes | E-Journal Hub",
    specs: [
      "Access to international journals & DelNet subscriptions",
      "Modern e-library terminal workstations",
      "Soundproof discussion rooms for study groups",
      "Ergonomic seating arrangements for 150+ students"
    ]
  },
  {
    id: 4,
    title: "KBIPER Campus Block & Courtyard",
    category: "Campus Facilities",
    url: `${import.meta.env.BASE_URL}hero-building.png`, // uses existing high-res asset
    description: "Krishnarao Bhegade Institute main educational block at Talegaon Dabhade, Pune featuring modern classrooms.",
    quickStats: "Modern Facade | 15-Acre Green Campus",
    specs: [
      "Smart digital whiteboard lecture theatres",
      "Spacious and naturally lit academic corridors",
      "Lush landscaped central student courtyard",
      "Comprehensive Wi-Fi connectivity campus-wide"
    ]
  },
  {
    id: 5,
    title: "Pharma-Fiesta Cultural Celebrations",
    category: "Student Vibe",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    description: "Students participating in annual group dances, dramatic arts, scientific model displays, and research posters.",
    quickStats: "Annual Mega Gala | Creative Expression",
    specs: [
      "State-level model exhibition championships",
      "Theatrical dramatics and dance competitions",
      "Annual college magazine release ceremony",
      "Eminent healthcare leadership guest panels"
    ]
  },
  {
    id: 6,
    title: "NSS Social Awareness Camps",
    category: "Student Vibe",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
    description: "NSS volunteers performing village health check-ups, orientation drives, and blood donation camps in local rural sectors.",
    quickStats: "Social Upliftment | NSS Board Certified",
    specs: [
      "Free medical checkups and diagnostic support",
      "Street plays explaining health hygiene basics",
      "Rural tree plantation and environment drives",
      "Collaborations with government medical associations"
    ]
  },
  {
    id: 7,
    title: "Cricket Championship Turf Ground",
    category: "Sports & Wellness",
    url: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop",
    description: "Annual Sports Week Cricket Tournament finals held at the Indrayani Vidya Mandir complex turf ground.",
    quickStats: "Turf Pitch Field | Inter-Department Cup",
    specs: [
      "Full-sized athletic track surrounding turf",
      "Professional-grade sports gears and coaching kits",
      "Grandstands for cheering student crowds",
      "Trophy presentation events and awards"
    ]
  },
  {
    id: 8,
    title: "Student Recreation & Wellness Hall",
    category: "Sports & Wellness",
    url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    description: "KBIPER student recreation lobby featuring table tennis, badminton double courts, chess, and carrom spaces.",
    quickStats: "Indoor Sports Center | Wellness Gym",
    specs: [
      "Professional double badminton wooden courts",
      "Indoor board games recreation corner",
      "Equipped physical fitness gym area",
      "Yoga and mindfulness weekly sessions"
    ]
  }
];

const TICKER_ITEMS = [
  "🏆 B.Pharm team wins the Inter-departmental Cricket Trophy finals!",
  "🔬 NSS volunteers complete rural health camp at Sudumbare village, checking 100+ seniors.",
  "🎓 Placement Drive: Top 5 pharmaceutical MNCs select 24 candidates this week.",
  "📚 Library upgrade: Integrated new DelNet server database with 300+ new international e-journals.",
  "🧪 Analytical Research Lab adds high-efficiency liquid chromatograph software updates.",
  "🌟 Alumni meet scheduled for next month - Register via alumni page today!"
];

export function CampusShowcase() {
  const [activeCategory, setActiveCategory] = useState<ShowcaseItem["category"]>("Academic Labs");
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = SHOWCASE_DATABASE.filter(item => item.category === activeCategory);
  const activeItem = filteredItems[activeCardIndex] || filteredItems[0];

  const categories: ShowcaseItem["category"][] = [
    "Academic Labs",
    "Campus Facilities",
    "Student Vibe",
    "Sports & Wellness"
  ];

  const getCategoryIcon = (category: ShowcaseItem["category"]) => {
    switch (category) {
      case "Academic Labs":
        return <FlaskConical className="h-4.5 w-4.5" />;
      case "Campus Facilities":
        return <Building2 className="h-4.5 w-4.5" />;
      case "Student Vibe":
        return <Sparkles className="h-4.5 w-4.5" />;
      case "Sports & Wellness":
        return <Trophy className="h-4.5 w-4.5" />;
    }
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleOpenLightbox = () => {
    const originalIndex = SHOWCASE_DATABASE.findIndex(item => item.id === activeItem.id);
    setLightboxIndex(originalIndex !== -1 ? originalIndex : 0);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold tracking-wide uppercase">
            <Compass className="h-4 w-4 animate-spin-[20s] linear infinite" /> Interactive Campus Tour
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#d4af37]">College Infrastructure</span> & Life
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Take a deep-dive into our modern labs, dynamic student communities, sporting assets, and green campus. Touch the tabs to explore.
          </p>
        </div>

        {/* Dynamic Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveCardIndex(0);
                }}
                className={`relative flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? "text-white shadow-lg shadow-accent/20 cursor-default" 
                    : "bg-white text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground cursor-pointer"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryBg"
                    className="absolute inset-0 bg-accent rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {getCategoryIcon(category)}
                {category}
              </button>
            );
          })}
        </div>

        {/* 2-Column Split Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: Large Animated Visual Showcase & Controls */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border border-border bg-muted">
              
              {/* Glassmorphic Stats Badge */}
              <div className="absolute top-4 right-4 z-20 backdrop-blur-md bg-black/40 border border-white/20 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs font-semibold text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                {activeItem.quickStats}
              </div>

              {/* Animated Image Wrapper */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <img
                    src={activeItem.url}
                    alt={activeItem.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-750"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dark Overlay & Title Hover Reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex justify-between items-end">
                <div className="space-y-1 pr-4">
                  <span className="text-xs font-bold text-accent tracking-widest uppercase">{activeItem.category}</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{activeItem.title}</h3>
                </div>
                
                {/* Maximize / Lightbox Action */}
                <button
                  onClick={handleOpenLightbox}
                  className="p-3 bg-white/15 hover:bg-white/25 border border-white/20 text-white rounded-full transition-colors backdrop-blur-sm shadow-lg shrink-0 cursor-pointer"
                  title="Fullscreen Gallery"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>

              {/* Previous / Next Arrows inside Card */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-20 backdrop-blur-sm border border-white/10 cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-20 backdrop-blur-sm border border-white/10 cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Indicator Dots */}
            {filteredItems.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {filteredItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCardIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeCardIndex === i ? "w-8 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Interactive Information Hub */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent uppercase tracking-widest">
                {getCategoryIcon(activeCategory)}
                {activeCategory}
              </div>
              <h3 className="text-3xl font-extrabold text-primary leading-tight">
                {activeItem.title}
              </h3>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            {/* Specifications & Key Features Grid */}
            <div className="bg-white border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <h4 className="font-bold text-primary text-sm tracking-wider uppercase flex items-center gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 text-accent" /> Key Features & Standards
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeItem.specs.map((spec, index) => (
                  <motion.div
                    key={spec}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />
                    <span>{spec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action Grid */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleOpenLightbox}
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary hover:bg-primary/95 text-white font-semibold shadow-md transition-colors cursor-pointer"
              >
                <Play className="h-4 w-4 animate-pulse" /> View Full Gallery
              </button>
              <Link href="/media" className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-border bg-white hover:bg-muted/50 text-foreground font-semibold transition-all cursor-pointer">
                  Go to Social Hub →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM MARQUEE: Live Campus Pulse Ticker */}
      <div className="mt-20 border-y border-border bg-white/70 backdrop-blur-md py-4 overflow-hidden relative select-none">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="container mx-auto px-4 flex items-center gap-6">
          <div className="flex items-center gap-2 shrink-0 bg-accent/15 border border-accent/20 rounded-md px-3 py-1 font-bold text-xs text-accent uppercase tracking-wider shadow-sm z-20">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Live Campus Pulse
          </div>

          <div className="overflow-hidden flex flex-1">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 35
              }}
              whileHover={{ x: 0 }} // subtle pause mechanism
              className="flex gap-16 whitespace-nowrap text-sm font-semibold text-muted-foreground"
            >
              {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, index) => (
                <span key={index} className="flex items-center gap-2">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX DIALOG */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6 select-none"
          >
            {/* Header: Title and Close */}
            <div className="flex justify-between items-center text-white border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-accent tracking-widest uppercase">
                  {SHOWCASE_DATABASE[lightboxIndex].category}
                </span>
                <h4 className="text-lg md:text-xl font-bold">
                  {SHOWCASE_DATABASE[lightboxIndex].title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content: Image Frame and Left/Right Nav */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              
              <button
                onClick={() => setLightboxIndex((prev) => (prev! - 1 + SHOWCASE_DATABASE.length) % SHOWCASE_DATABASE.length)}
                className="absolute left-0 md:left-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20 backdrop-blur-md border border-white/10 cursor-pointer"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={SHOWCASE_DATABASE[lightboxIndex].url}
                alt={SHOWCASE_DATABASE[lightboxIndex].title}
                className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/5"
              />

              <button
                onClick={() => setLightboxIndex((prev) => (prev! + 1) % SHOWCASE_DATABASE.length)}
                className="absolute right-0 md:right-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20 backdrop-blur-md border border-white/10 cursor-pointer"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>

            {/* Footer: Description and Counter */}
            <div className="text-center text-white max-w-2xl mx-auto space-y-2 border-t border-white/10 pt-4 w-full">
              <p className="text-white/80 text-sm md:text-base">
                {SHOWCASE_DATABASE[lightboxIndex].description}
              </p>
              <div className="text-xs text-white/40 font-semibold uppercase tracking-wider">
                Photo {lightboxIndex + 1} of {SHOWCASE_DATABASE.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
