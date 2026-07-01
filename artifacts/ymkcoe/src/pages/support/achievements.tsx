import { AppLayout } from "@/components/layout/AppLayout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Star, 
  Award, 
  Medal, 
  Grid, 
  List, 
  Search, 
  Calendar, 
  GraduationCap, 
  Briefcase, 
  Building,
  HeartHandshake,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  title: string;
  category: "Institutional" | "Research & Grants" | "Student Success" | "Placement Excellence";
  year: string;
  description: string;
  detailText: string;
  icon: any;
  colorClass: string;
}

const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: "1",
    title: "Best Pharmacy Institute Award 2024",
    category: "Institutional",
    year: "2024",
    description: "Awarded by the State Education Board for excellence in pharmaceutical education and research infrastructure.",
    detailText: "Evaluated across 50+ professional institutes, KBIPER secured first rank in infrastructure expansion and academic indicators.",
    icon: Trophy,
    colorClass: "from-yellow-400 to-yellow-600"
  },
  {
    id: "2",
    title: "First Prize - National Pharma Hackathon",
    category: "Student Success",
    year: "2025",
    description: "Our final year B.Pharm team won 1st prize for their innovative AI-driven drug interaction checker app.",
    detailText: "Team members Rohit Jagtap and Sneha Kulkarni presented to corporate drug developers and won a cash prize of ₹1,00,000.",
    icon: Medal,
    colorClass: "from-slate-300 to-slate-500"
  },
  {
    id: "3",
    title: "100% Placement Milestone Record",
    category: "Placement Excellence",
    year: "2024",
    description: "Achieved 100% placement for the M.Pharm batch of 2023-24 with top multinational pharmaceutical companies.",
    detailText: "Recruiters included Lupin, Cipla, Serum Institute, and Sun Pharma with annual packages going up to ₹8.5 LPA.",
    icon: Briefcase,
    colorClass: "from-amber-500 to-orange-600"
  },
  {
    id: "4",
    title: "Research Excellence Grant",
    category: "Research & Grants",
    year: "2025",
    description: "Received a research grant of ₹50 Lakhs from AICTE for advanced study in novel drug delivery systems.",
    detailText: "Project headed by Dr. Rekha Patil focuses on liposomal formulations and targeted cellular drug delivery validation.",
    icon: Award,
    colorClass: "from-emerald-400 to-emerald-600"
  },
  {
    id: "5",
    title: "Outstanding NSS Outreach Unit Award",
    category: "Institutional",
    year: "2025",
    description: "Recognized as the best NSS unit by the university for blood camps and village adaptation initiatives.",
    detailText: "Under coordinator Mr. Vicky Salve, the unit organized 12 health camps and adopted Sudumbare village for development.",
    icon: HeartHandshake,
    colorClass: "from-pink-500 to-red-600"
  },
  {
    id: "6",
    title: "GPAT National Rankers Board",
    category: "Student Success",
    year: "2024",
    description: "Over 12 students qualified in the GPAT National level examination, ranking in the top percentiles.",
    detailText: "Student Rohit Joshi secured an All India Rank (AIR) of 45, the highest achieved in Pune district schools.",
    icon: GraduationCap,
    colorClass: "from-blue-500 to-indigo-600"
  }
];

export default function Achievements() {
  const { toast } = useToast();
  const [layoutMode, setLayoutMode] = useState<"showcase" | "grid">("showcase");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"]
  });

  // Transform horizontal translation based on vertical scroll
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const filteredAchievements = useMemo(() => {
    return ACHIEVEMENTS_DATA.filter(item => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.year.includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleShareAchievement = (title: string) => {
    toast({
      title: "Achievement Shared",
      description: `Link to "${title}" has been copied to your clipboard.`,
    });
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Trophy className="w-4 h-4 text-accent animate-bounce" />
            <span className="text-sm font-medium tracking-wide uppercase text-accent">KBIPER Milestones</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Achievements</span>
          </h1>
          <p className="text-base md:text-lg text-white/70 max-w-2xl font-light">
            Explore the awards, national milestones, research grants, and student innovations that define our pursuit of excellence in pharmacy education.
          </p>
        </div>
      </section>

      {/* Control Bar - Search & Layout Switcher */}
      <section className="py-8 bg-muted/20 border-b border-muted/50">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 md:pb-0 max-w-full">
            {["All", "Institutional", "Research & Grants", "Student Success", "Placement Excellence"].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category 
                    ? "bg-primary text-white shadow-md" 
                    : "bg-white border border-muted hover:border-accent/40 text-muted-foreground hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search and Layout Toggles */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-muted-foreground/60 absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search achievements..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Desktop Layout Toggles */}
            <div className="hidden md:inline-flex p-1 bg-muted/80 rounded-xl border border-muted shadow-sm gap-1">
              <button
                onClick={() => setLayoutMode("showcase")}
                className={`cursor-pointer p-2 rounded-lg transition-colors ${
                  layoutMode === "showcase" ? "bg-white text-primary shadow" : "text-muted-foreground hover:text-primary"
                }`}
                title="Showcase View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode("grid")}
                className={`cursor-pointer p-2 rounded-lg transition-colors ${
                  layoutMode === "grid" ? "bg-white text-primary shadow" : "text-muted-foreground hover:text-primary"
                }`}
                title="Grid Board View"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Board Body */}
      <section className="bg-background relative min-h-[60vh]">
        {layoutMode === "showcase" ? (
          /* =========================================================================
             SHOWCASE NARRATIVE TIMELINE VIEW (DESKTOP SCROLL)
             ========================================================================= */
          <div className="hidden lg:block">
            <div className="bg-primary min-h-[160vh]" ref={scrollContainerRef}>
              <div className="sticky top-[80px] h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-center">
                
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                
                {/* Horizontal scrolling track */}
                <motion.div style={{ x: xTransform }} className="flex gap-8 px-12 w-[220vw] items-center">
                  {filteredAchievements.map((item, idx) => (
                    <div key={item.id} className="w-[600px] shrink-0 relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl transform rotate-1 group-hover:rotate-2 transition-transform duration-500" />
                      
                      <div className="relative bg-white/5 border border-white/10 backdrop-blur-xl p-10 rounded-3xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(244,182,9,0.15)] flex flex-col justify-between h-[380px]">
                        
                        <div className={`absolute -right-10 -top-10 w-48 h-48 bg-gradient-to-br ${item.colorClass} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
                        
                        <div className="flex items-start gap-6 relative z-10">
                          <div className={`w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br ${item.colorClass} flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                            <item.icon className="w-8 h-8 text-white" />
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/5">
                                {item.category}
                              </span>
                              <span className="text-xs font-bold text-accent">{item.year}</span>
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-2 leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-white/70 text-sm leading-relaxed mb-4">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-white/60 leading-relaxed mt-auto relative z-10 flex items-start gap-2">
                          <TrendingUp className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p>{item.detailText}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
                
              </div>
            </div>
          </div>
        ) : null}

        {/* =========================================================================
           STRUCTURED GRID / MOBILE FALLBACK VIEW
           ========================================================================= */}
        <div className={`py-16 container mx-auto px-4 max-w-6xl ${layoutMode === "showcase" ? "lg:hidden" : ""}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAchievements.map((item) => (
              <div 
                key={item.id}
                className="group relative flex flex-col h-full"
              >
                <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 ease-out" />
                
                <div className="relative bg-white border border-muted p-7 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] group-hover:border-accent/40 transition-all duration-300 flex flex-col h-full overflow-hidden z-10">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded bg-muted text-muted-foreground border border-muted-border">
                      {item.category}
                    </span>
                    <span className="text-xs font-black text-accent flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-accent" /> {item.year}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.colorClass} flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>

                  <h4 className="text-base font-extrabold text-primary group-hover:text-accent transition-colors leading-tight mb-2">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>

                  <div className="p-3 bg-muted/40 border border-muted rounded-xl text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2 mt-auto">
                    <TrendingUp className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                    <span>{item.detailText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredAchievements.length === 0 && (
            <div className="text-center py-20">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto border border-muted-border mb-4 text-muted-foreground">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-primary">No Milestones Found</h4>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">No logged achievements matching category or keyword searches were found. Try another query.</p>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
}
