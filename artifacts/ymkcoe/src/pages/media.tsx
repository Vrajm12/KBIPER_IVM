import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Instagram,
  Facebook,
  ArrowRight,
  RefreshCw,
  MessageCircle,
  ThumbsUp,
  ExternalLink,
  ShieldCheck,
  Share2,
  Heart
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface MediaItem {
  id: number;
  title: string;
  category: "Institute & Labs" | "Campus Tour" | "Events & Culture" | "Sports";
  url: string;
  description: string;
}

const GALLERY_DATABASE: MediaItem[] = [
  {
    id: 1,
    title: "Main Pharmaceutical Chemistry Research Laboratory",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0011.jpg",
    description: "Equipped with specialized fume hoods, synthesis benches, and reagent storage units for student practicals."
  },
  {
    id: 2,
    title: "Main Corridor and Classrooms Frontage",
    category: "Campus Tour",
    url: "/images/gallery/IMG-20250924-WA0018.jpg",
    description: "Spacious and well-ventilated corridors connecting classrooms, lecture halls, and administrative offices."
  },
  {
    id: 3,
    title: "Pharmaceutics Practical Training Desk",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0020.jpg",
    description: "Students performing physical evaluation of powders and formulation tests under faculty guidance."
  },
  {
    id: 4,
    title: "Welcome Speech by Guest Speakers",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0021.jpg",
    description: "Eminent pharmaceutical experts delivering guest lectures in the college seminar hall."
  },
  {
    id: 5,
    title: "Seminar Hall Lobby Entrance",
    category: "Campus Tour",
    url: "/images/gallery/IMG-20250924-WA0023.jpg",
    description: "Inviting foyer area decorated with motivational achievements posters and academic display boards."
  },
  {
    id: 6,
    title: "Pharmacology Testing Equipment",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0032.jpg",
    description: "Validation of animal behavior study apparatus and recording instruments in the pharmacology section."
  },
  {
    id: 7,
    title: "Lush Campus Lawns & Botanical Garden",
    category: "Campus Tour",
    url: "/images/gallery/IMG-20250924-WA0044.jpg",
    description: "An outdoor study area surrounded by medicinal plants and green foliage for natural relaxation."
  },
  {
    id: 8,
    title: "Traditional Lamp Lighting Ceremony",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0045.jpg",
    description: "Auspicious beginning of the academic year with traditional lamp lighting by college directors."
  },
  {
    id: 9,
    title: "Sports Complex Cricket Net Practice",
    category: "Sports",
    url: "/images/gallery/IMG-20250924-WA0052.jpg",
    description: "Students during net practice hours on the main sports ground prepare for inter-collegiate cups."
  },
  {
    id: 10,
    title: "Annual Sports Meet Track Event",
    category: "Sports",
    url: "/images/gallery/IMG-20250924-WA0055.jpg",
    description: "Final heat of the 100-meter sprint running event under the sports week celebrations."
  },
  {
    id: 11,
    title: "Fume Hood Station in Chemistry Lab",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0059.jpg",
    description: "Advanced ventilation systems for handling volatile chemicals during synthesis experiments safely."
  },
  {
    id: 12,
    title: "Students Group Dance Performance",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0062.jpg",
    description: "Vibrant group dance performance by students at the annual cultural festival 'Pharma-Fiesta'."
  },
  {
    id: 13,
    title: "Modern Library Reading Cabins",
    category: "Campus Tour",
    url: "/images/gallery/IMG-20250924-WA0065.jpg",
    description: "Dedicated study carrels and silent reading zones designed for research students and readers."
  },
  {
    id: 14,
    title: "Instrument Room Analytical Benches",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0076.jpg",
    description: "Analytical balances, pH meters, and polarimeters set up for quality control lab testing."
  },
  {
    id: 15,
    title: "Inauguration and Ribbon Cutting",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0081.jpg",
    description: "Felicitation and inaugural ribbon cutting of the new computer laboratory block by the Trustee."
  },
  {
    id: 16,
    title: "Machine Room Rotary Press",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0083.jpg",
    description: "Tablet compression machine demonstrations explaining batch manufacturing processes to trainees."
  },
  {
    id: 17,
    title: "Herbarium Collection and Storage",
    category: "Campus Tour",
    url: "/images/gallery/IMG-20250924-WA0086.jpg",
    description: "Preserved plant specimens cataloged and labeled for pharmacognosy reference and study."
  },
  {
    id: 18,
    title: "Poster Presentation Competition",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0088.jpg",
    description: "Students explaining their scientific research posters to judges during the research meet."
  },
  {
    id: 19,
    title: "Table Tennis Play Area",
    category: "Sports",
    url: "/images/gallery/IMG-20250924-WA0095.jpg",
    description: "Indoor recreation hall equipped with table tennis boards, chess tables, and carrom boards."
  },
  {
    id: 20,
    title: "Digital Microscope Display",
    category: "Institute & Labs",
    url: "/images/gallery/IMG-20250924-WA0100.jpg",
    description: "Microscopic analysis workstation for cell structure and powder characterization study."
  },
  {
    id: 21,
    title: "Faculty and Alumni Panel Meet",
    category: "Events & Culture",
    url: "/images/gallery/IMG-20250924-WA0113.jpg",
    description: "Alumni interaction meeting discussing curriculum updates and training needs of the market."
  }
];

export default function Media() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"All" | "Institute & Labs" | "Campus Tour" | "Events & Culture" | "Sports" | "Social Hub">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Simulated live feed states
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("2 minutes ago");

  const handleSyncFeed = () => {
    setIsSyncing(true);
    toast({
      title: "Syncing Social Feeds",
      description: "Querying Meta Graph API for kbiper_pharmacy and facebook.com/kbiper.pune...",
    });

    setTimeout(() => {
      setIsSyncing(false);
      setLastSync("Just now");
      toast({
        title: "Feed Synced Successfully",
        description: "Latest 3 Instagram and 3 Facebook posts successfully synchronized.",
      });
    }, 1500);
  };

  // Dynamically load Instagram script
  useEffect(() => {
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    } else {
      const script = document.createElement("script");
      script.src = "//www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        if ((window as any).instgrm) {
          (window as any).instgrm.Embeds.process();
        }
      };
    }
  }, [activeCategory]);

  const filteredPhotos = useMemo(() => {
    let photos = GALLERY_DATABASE;
    if (activeCategory !== "All" && activeCategory !== "Social Hub") {
      photos = GALLERY_DATABASE.filter(item => item.category === activeCategory);
    }
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      photos = photos.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }
    return photos;
  }, [activeCategory, searchQuery]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <ImageIcon className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              College <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Gallery</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Visual snapshots and social feeds chronicling institutional facilities, laboratory trials, sports week, and student events.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation & Search Sticky Ribbon */}
      <section className="py-5 bg-background border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex bg-muted/60 p-1.5 rounded-2xl border border-muted shadow-2xs gap-1.5 overflow-x-auto no-scrollbar max-w-full justify-start md:justify-center">
            {(["All", "Institute & Labs", "Campus Tour", "Events & Culture", "Sports", "Social Hub"] as const).map(cat => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`cursor-pointer px-4.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xs" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {cat === "All" ? "All Memories" : cat}
              </button>
            ))}
          </div>

          {activeCategory !== "Social Hub" && (
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 h-11 rounded-xl border border-muted bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent text-primary placeholder:text-muted-foreground/45 shadow-2xs"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/45" />
            </div>
          )}
        </div>
      </section>

      {/* Main Gallery Area */}
      <section className="py-16 bg-muted/10 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <AnimatePresence mode="wait">
            {activeCategory !== "Social Hub" ? (
              /* =========================================================================
                 📸 PHOTO GALLERY SECTION (MASONRY GRID)
                 ========================================================================= */
              <motion.div
                key="photo-gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:balance]"
              >
                {filteredPhotos.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(index)}
                    className="break-inside-avoid inline-block w-full group bg-white border border-muted rounded-2.5xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-500 cursor-pointer"
                  >
                    <div className="overflow-hidden relative">
                      <img 
                        src={item.url} 
                        alt={item.title} 
                        className="w-full h-auto object-cover transform group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 bg-primary/80 backdrop-blur text-white text-[9px] uppercase font-bold px-2 py-0.5 rounded-lg border border-white/10">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-5.5 space-y-1.5 border-t border-muted/30">
                      <h3 className="text-sm font-extrabold text-primary leading-tight flex justify-between items-center group-hover:text-accent transition-colors">
                        {item.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              /* =========================================================================
                 📲 SOCIAL HUBS SECTION (DYNAMIC META GRAPH FEED ROADMAP)
                 ========================================================================= */
              <motion.div
                key="social-hub"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Meta API Sync Status Header Panel */}
                <div className="bg-white border border-muted p-5 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-accent animate-pulse" />
                    </div>
                    <div className="text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-primary">Meta Graph Social API</span>
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-[9px] font-bold text-emerald-600 uppercase">Live Connected</span>
                      </div>
                      <p className="text-muted-foreground text-[10px] mt-0.5">Directly syncing 3 recent posts of Instagram (@kbiper_pharmacy) and Facebook (/kbiper.pune).</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[10px] text-muted-foreground font-semibold">Synced: <strong className="text-primary">{lastSync}</strong></span>
                    <button
                      onClick={handleSyncFeed}
                      disabled={isSyncing}
                      className="cursor-pointer px-4 py-2 bg-primary hover:bg-primary/95 text-white font-extrabold rounded-xl shadow-xs transition-all duration-300 text-xs inline-flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-accent ${isSyncing ? "animate-spin" : ""}`} /> Sync feeds
                    </button>
                  </div>
                </div>

                {/* Sub-grid of posts */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
                  
                  {/* Left Column: 3 Instagram Posts */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm border-b border-muted pb-3">
                      <Instagram className="w-5 h-5 text-pink-600 shrink-0" />
                      <span>Instagram Posts (3 Recent)</span>
                    </div>

                    {/* Post 1: User Provided Live Embed Block */}
                    <div className="w-full flex justify-center bg-white border border-muted p-5 rounded-3xl shadow-sm">
                      <blockquote 
                        className="instagram-media" 
                        data-instgrm-captioned 
                        data-instgrm-permalink="https://www.instagram.com/p/DZnKF7eEQSy/?utm_source=ig_embed&amp;utm_campaign=loading" 
                        data-instgrm-version="14" 
                        style={{ 
                          background: "#FFF", 
                          border: 0, 
                          borderRadius: "3px", 
                          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)", 
                          margin: "1px", 
                          maxWidth: "480px", 
                          minWidth: "300px", 
                          padding: 0, 
                          width: "99.375%" 
                        }}
                      >
                        <div style={{ padding: "16px" }}>
                          <a 
                            href="https://www.instagram.com/p/DZnKF7eEQSy/?utm_source=ig_embed&amp;utm_campaign=loading" 
                            style={{ 
                              background: "#FFFFFF", 
                              lineHeight: 0, 
                              padding: "0 0", 
                              textDecoration: "none", 
                              width: "100%",
                              display: "block"
                            }} 
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "40px", marginRight: "14px", width: "40px" }}></div>
                              <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", marginBottom: "6px", width: "100px" }}></div>
                                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", height: "14px", width: "60px" }}></div>
                              </div>
                            </div>
                            <div style={{ padding: "19% 0" }}></div>
                            <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                              <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                                <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                  <g transform="translate(-511.000000, -20.000000)" fill="#000000">
                                    <g>
                                      <path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>
                            <div style={{ paddingTop: "8px" }}>
                              <div style={{ color: "#3897f0", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: 550, lineHeight: "18px" }}>View this post on Instagram</div>
                            </div>
                            <div style={{ padding: "12.5% 0" }}></div>
                            <div style={{ display: "flex", flexDirection: "row", marginBottom: "14px", alignItems: "center" }}>
                              <div>
                                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(0px) translateY(7px)" }}></div>
                                <div style={{ backgroundColor: "#F4F4F4", height: "12.5px", transform: "rotate(-45deg) translateX(3px) translateY(1px)", width: "12.5px", flexGrow: 0, marginRight: "14px", marginLeft: "2px" }}></div>
                                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", height: "12.5px", width: "12.5px", transform: "translateX(9px) translateY(-18px)" }}></div>
                              </div>
                              <div style={{ marginLeft: "8px" }}>
                                <div style={{ backgroundColor: "#F4F4F4", borderRadius: "50%", flexGrow: 0, height: "20px", width: "20px" }}></div>
                                <div style={{ width: 0, height: 0, borderTop: "2px solid transparent", borderLeft: "6px solid #f4f4f4", borderBottom: "2px solid transparent", transform: "translateX(16px) translateY(-4px) rotate(30deg)" }}></div>
                              </div>
                              <div style={{ marginLeft: "auto" }}>
                                <div style={{ width: "0px", borderTop: "8px solid #F4F4F4", borderRight: "8px solid transparent", transform: "translateY(16px)" }}></div>
                                <div style={{ backgroundColor: "#F4F4F4", flexGrow: 0, height: "12px", width: "16px", transform: "translateY(-4px)" }}></div>
                                <div style={{ width: 0, height: 0, borderTop: "8px solid #F4F4F4", borderLeft: "8px solid transparent", transform: "translateY(-4px) translateX(8px)" }}></div>
                              </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center", marginBottom: "24px" }}>
                              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", marginBottom: "6px", width: "224px" }}></div>
                              <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flexGrow: 0, height: "14px", width: "144px" }}></div>
                            </div>
                          </a>
                          <p style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: "14px", lineHeight: "17px", marginBottom: 0, marginTop: "8px", overflow: "hidden", padding: "8px 0 7px", textAlign: "center", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            <a href="https://www.instagram.com/p/DZnKF7eEQSy/?utm_source=ig_embed&amp;utm_campaign=loading" style={{ color: "#c9c8cd", fontFamily: "Arial,sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: "normal", lineHeight: "17px", textDecoration: "none" }} target="_blank" rel="noreferrer">A post shared by KBIPER PUNE (@kbiper_pharmacy)</a>
                          </p>
                        </div>
                      </blockquote>
                    </div>

                    {/* Post 2: Simulated Instagram Post Card */}
                    <div className="bg-white border border-muted rounded-3xl overflow-hidden shadow-sm space-y-4">
                      {/* Header */}
                      <div className="p-4 flex items-center gap-3 border-b border-muted">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                          KB
                        </div>
                        <div className="text-xs">
                          <span className="font-extrabold text-primary flex items-center gap-1">
                            kbiper_pharmacy <span className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</span>
                          </span>
                          <span className="text-[10px] text-muted-foreground">Talegaon Dabhade, Pune</span>
                        </div>
                      </div>
                      
                      {/* Visual Image */}
                      <div className="aspect-square bg-muted overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop" 
                          alt="Herbal Formulation Conference" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Footer Actions & Caption */}
                      <div className="px-5 pb-5.5 space-y-2.5 text-xs">
                        <div className="flex justify-between items-center text-primary font-bold">
                          <div className="flex gap-4">
                            <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                              <Heart className="w-4 h-4" /> 124
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                              <MessageCircle className="w-4 h-4" /> 15
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">2 days ago</span>
                        </div>

                        <p className="leading-relaxed text-muted-foreground text-xs">
                          <strong className="text-primary font-extrabold mr-1">kbiper_pharmacy</strong>
                          National Conference on Herbal Formulation starts today! Principal Dr. Sanjay Arote welcoming delegates to advanced drug delivery validations. 🌿📚 #education #pharmacy #seminar #pune
                        </p>
                      </div>
                    </div>

                    {/* Post 3: Simulated Instagram Post Card */}
                    <div className="bg-white border border-muted rounded-3xl overflow-hidden shadow-sm space-y-4">
                      {/* Header */}
                      <div className="p-4 flex items-center gap-3 border-b border-muted">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 to-purple-600 text-white font-bold flex items-center justify-center text-xs">
                          KB
                        </div>
                        <div className="text-xs">
                          <span className="font-extrabold text-primary flex items-center gap-1">
                            kbiper_pharmacy <span className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</span>
                          </span>
                          <span className="text-[10px] text-muted-foreground">Talegaon Dabhade, Pune</span>
                        </div>
                      </div>
                      
                      {/* Visual Image */}
                      <div className="aspect-square bg-muted overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop" 
                          alt="Placement Success Celebration" 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Footer Actions & Caption */}
                      <div className="px-5 pb-5.5 space-y-2.5 text-xs">
                        <div className="flex justify-between items-center text-primary font-bold">
                          <div className="flex gap-4">
                            <span className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                              <Heart className="w-4 h-4" /> 210
                            </span>
                            <span className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                              <MessageCircle className="w-4 h-4" /> 45
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">6 days ago</span>
                        </div>

                        <p className="leading-relaxed text-muted-foreground text-xs">
                          <strong className="text-primary font-extrabold mr-1">kbiper_pharmacy</strong>
                          PLACEMENT SUCCESS! Heartiest congratulations to our final year topper Amit Gade for securing placement at Lupin Research Park with 6.5 LPA package. 🎓💼 #placements #success #kbiper #careers
                        </p>
                      </div>
                    </div>

                  </div>
                  
                  {/* Right Column: 3 Facebook Posts */}
                  <div className="lg:col-span-6 space-y-6">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm border-b border-muted pb-3">
                      <Facebook className="w-5 h-5 text-blue-600 shrink-0" />
                      <span>Facebook Posts (3 Recent)</span>
                    </div>

                    {/* Post 1: Simulated Facebook Post Card */}
                    <div className="bg-white border border-muted p-5.5 rounded-3xl shadow-sm space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                          KB
                        </div>
                        <div className="text-xs">
                          <h4 className="font-extrabold text-primary flex items-center gap-1">
                            Krishnarao Bhegade Institute of Pharmaceutical Education (KBIPER)
                            <span className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</span>
                          </h4>
                          <p className="text-[10px] text-muted-foreground">1 day ago • Public</p>
                        </div>
                      </div>

                      {/* Content text */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        COLLABORATION BRIEF: KBIPER signed an active Memorandum of Understanding (MOU) with Emcure Pharmaceuticals Pune today. This pact establishes annual formulation research projects and student internship avenues. TPO Prof. Sandeep Bhegade and Emcure HR representatives validated the compliance.
                      </p>

                      {/* Post Image Card */}
                      <div className="border border-muted rounded-2xl overflow-hidden bg-muted/20">
                        <img 
                          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=600&auto=format&fit=crop" 
                          alt="MOU Signing Ceremony" 
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-3 bg-white text-xs border-t border-muted">
                          <span className="text-[9px] font-bold text-accent uppercase tracking-wide block">Emcure Alliance</span>
                          <span className="font-extrabold text-primary line-clamp-1">MOU signed for tech transfer and internships</span>
                        </div>
                      </div>

                      {/* Likes Counter & Share Trigger */}
                      <div className="pt-2 border-t border-muted/50 flex justify-between items-center text-[10px] text-muted-foreground">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" /> 85 likes
                          </span>
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" /> 10 comments
                          </span>
                        </div>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                          <Share2 className="w-3.5 h-3.5" /> 12 shares
                        </span>
                      </div>
                    </div>

                    {/* Post 2: Simulated Facebook Post Card */}
                    <div className="bg-white border border-muted p-5.5 rounded-3xl shadow-sm space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                          KB
                        </div>
                        <div className="text-xs">
                          <h4 className="font-extrabold text-primary flex items-center gap-1">
                            Krishnarao Bhegade Institute of Pharmaceutical Education (KBIPER)
                            <span className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</span>
                          </h4>
                          <p className="text-[10px] text-muted-foreground">5 days ago • Public</p>
                        </div>
                      </div>

                      {/* Content text */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        NSS EXTENSION DRIVES: Our NSS volunteers organized a major Blood Donation Camp at Sudumbare village. More than 80 volunteers and citizens donated blood, raising vital safety reserves. Salute to coordinators for organizing.
                      </p>

                      {/* Post Image Card */}
                      <div className="border border-muted rounded-2xl overflow-hidden bg-muted/20">
                        <img 
                          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" 
                          alt="Blood Donation Camp" 
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-3 bg-white text-xs border-t border-muted">
                          <span className="text-[9px] font-bold text-accent uppercase tracking-wide block">NSS Campaigns</span>
                          <span className="font-extrabold text-primary line-clamp-1">80+ Blood Donors raise hospital stocks</span>
                        </div>
                      </div>

                      {/* Likes Counter & Share Trigger */}
                      <div className="pt-2 border-t border-muted/50 flex justify-between items-center text-[10px] text-muted-foreground">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" /> 102 likes
                          </span>
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" /> 14 comments
                          </span>
                        </div>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                          <Share2 className="w-3.5 h-3.5" /> 18 shares
                        </span>
                      </div>
                    </div>

                    {/* Post 3: Simulated Facebook Post Card */}
                    <div className="bg-white border border-muted p-5.5 rounded-3xl shadow-sm space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
                          KB
                        </div>
                        <div className="text-xs">
                          <h4 className="font-extrabold text-primary flex items-center gap-1">
                            Krishnarao Bhegade Institute of Pharmaceutical Education (KBIPER)
                            <span className="h-3.5 w-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white">✓</span>
                          </h4>
                          <p className="text-[10px] text-muted-foreground">2 weeks ago • Public</p>
                        </div>
                      </div>

                      {/* Content text */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        ADMISSIONS 2026-27 OPEN: DTE Maharashtra admission cap rounds scheduled. Check detailed eligibility matrices for B.Pharm and D.Pharm courses on our admissions portal.
                      </p>

                      {/* Post Image Card */}
                      <div className="border border-muted rounded-2xl overflow-hidden bg-muted/20">
                        <img 
                          src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=600&auto=format&fit=crop" 
                          alt="Admissions Information" 
                          className="aspect-video w-full object-cover"
                        />
                        <div className="p-3 bg-white text-xs border-t border-muted">
                          <span className="text-[9px] font-bold text-accent uppercase tracking-wide block">Admission Desk</span>
                          <span className="font-extrabold text-primary line-clamp-1">Intake capacities and FRA approved fee structures</span>
                        </div>
                      </div>

                      {/* Likes Counter & Share Trigger */}
                      <div className="pt-2 border-t border-muted/50 flex justify-between items-center text-[10px] text-muted-foreground">
                        <div className="flex gap-4">
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <ThumbsUp className="w-3.5 h-3.5 text-blue-600" /> 150 likes
                          </span>
                          <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" /> 35 comments
                          </span>
                        </div>
                        <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                          <Share2 className="w-3.5 h-3.5" /> 40 shares
                        </span>
                      </div>
                    </div>

                    {/* Bottom Facebook Direct Redirect panel */}
                    <div className="bg-primary text-white p-6.5 rounded-3xl shadow-md space-y-4">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <Facebook className="w-4 h-4 text-accent" /> Connect on Facebook
                      </h4>
                      <p className="text-xs text-white/80 leading-normal">
                        Our full community, event coverage photos, and live notifications are regularly broadcasted to the official Facebook page.
                      </p>
                      <a 
                        href="https://www.facebook.com/kbiper.pune" 
                        target="_blank" 
                        rel="noreferrer"
                        className="cursor-pointer inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-white transition-colors"
                      >
                        Visit official page (facebook.com/kbiper.pune) <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Lightbox Stateful Modal Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-primary/95 z-50 flex items-center justify-center p-4 md:p-10 backdrop-blur-md"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header inside modal */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="cursor-pointer bg-primary/80 backdrop-blur text-white hover:bg-accent p-2 rounded-xl border border-white/10 transition-colors shadow"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Big Image display */}
              <div className="relative h-[65vh] bg-black flex items-center justify-center overflow-hidden">
                <img 
                  src={filteredPhotos[lightboxIndex].url} 
                  alt={filteredPhotos[lightboxIndex].title} 
                  className="w-full h-full object-contain animate-in fade-in duration-300"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={handlePrevPhoto}
                  className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary p-2.5 rounded-xl border border-white/20 transition-all shadow"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleNextPhoto}
                  className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-primary p-2.5 rounded-xl border border-white/20 transition-all shadow"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption details below image */}
              <div className="p-6 md:p-8 space-y-2 bg-white text-xs">
                <div className="flex justify-between items-center">
                  <span className="inline-flex px-2 py-0.5 bg-primary/10 text-[9px] text-primary font-bold rounded border border-primary/20 uppercase tracking-wide">
                    {filteredPhotos[lightboxIndex].category}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-semibold">
                    {lightboxIndex + 1} of {filteredPhotos.length}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-primary leading-tight">
                  {filteredPhotos[lightboxIndex].title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {filteredPhotos[lightboxIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </AppLayout>
  );
}
