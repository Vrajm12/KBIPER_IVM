import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookMarked, 
  Layers, 
  Search, 
  MonitorPlay, 
  Users, 
  BookmarkCheck,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  X
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  callNo: string;
  location: string;
  status: "Available" | "Issued" | "Reference Only";
  dueDate?: string;
}

interface EResource {
  name: string;
  desc: string;
  url: string;
  type: string;
}

const BOOKS_CATALOG: Book[] = [
  {
    id: "1",
    title: "Essentials of Medical Pharmacology",
    author: "K. D. Tripathi",
    callNo: "615.1 TRI",
    location: "Rack A-3 (Pharmacology Section)",
    status: "Available"
  },
  {
    id: "2",
    title: "The Theory and Practice of Industrial Pharmacy",
    author: "Leon Lachman & Herbert A. Lieberman",
    callNo: "615.19 LAC",
    location: "Rack B-1 (Pharmaceutics Section)",
    status: "Available"
  },
  {
    id: "3",
    title: "Martin's Physical Pharmacy and Pharmaceutical Sciences",
    author: "Patrick J. Sinko",
    callNo: "615.19 SIN",
    location: "Rack B-2 (Pharmaceutics Section)",
    status: "Issued",
    dueDate: "July 12, 2026"
  },
  {
    id: "4",
    title: "Trease and Evans Pharmacognosy",
    author: "William Charles Evans",
    callNo: "615.32 EVA",
    location: "Rack C-1 (Pharmacognosy Section)",
    status: "Available"
  },
  {
    id: "5",
    title: "Cooper and Gunn's Tutorial Pharmacy",
    author: "S. J. Carter",
    callNo: "615.4 CAR",
    location: "Rack A-1 (Pharmaceutics Section)",
    status: "Available"
  },
  {
    id: "6",
    title: "Wilson and Gisvold's Textbook of Organic Medicinal and Pharmaceutical Chemistry",
    author: "John M. Beale & John H. Block",
    callNo: "615.19 WIL",
    location: "Rack D-2 (Chemistry Section)",
    status: "Available"
  },
  {
    id: "7",
    title: "Remington: The Science and Practice of Pharmacy",
    author: "Adeboye Adejare",
    callNo: "615.1 REM",
    location: "Reference Block (Shelf 1)",
    status: "Reference Only"
  },
  {
    id: "8",
    title: "Ross & Wilson Anatomy and Physiology in Health and Illness",
    author: "Anne Waugh & Allison Grant",
    callNo: "612 ROS",
    location: "Rack A-2 (Anatomy Section)",
    status: "Issued",
    dueDate: "July 08, 2026"
  }
];

const E_RESOURCES: EResource[] = [
  {
    name: "DELNET Database Access",
    desc: "Developing Library Network. Access online resources, inter-library loan requests, and union catalogs of books and journals.",
    url: "https://delnet.in",
    type: "Union Catalog"
  },
  {
    name: "K-Hub Pharmacy Portal",
    desc: "A comprehensive digital library gateway offering access to 1500+ national and international e-journals, e-books, and videos.",
    url: "https://k-hub.in",
    type: "E-Journal Gateway"
  },
  {
    name: "National Digital Library (NDL)",
    desc: "An initiative by Ministry of Education, hosting millions of academic publications, video lectures, and textbook chapters.",
    url: "https://ndl.gov.in",
    type: "National Repository"
  },
  {
    name: "Elsevier ScienceDirect Pharmacy",
    desc: "Access core scientific research papers, pharmacotherapy publications, and clinical drug screening reports.",
    url: "https://sciencedirect.com",
    type: "Research Database"
  }
];

export default function Library() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [activeTab, setActiveTab] = useState<"catalog" | "digital" | "facilities">("catalog");

  const libraryStats = [
    { value: "15,000+", label: "Printed Books", icon: Layers },
    { value: "50+", label: "Journals & Magazines", icon: BookMarked },
    { value: "20+", label: "Digital Lab Terminals", icon: MonitorPlay },
    { value: "150+", label: "Seating Capacity", icon: Users },
  ];

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return BOOKS_CATALOG.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.callNo.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Empty Search Query",
        description: "Please enter a book name, author, or call number to search.",
      });
      return;
    }
    setSearchTriggered(true);
    
    // Scroll smoothly to book finder section
    const element = document.getElementById("book-finder-results");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getStatusBadge = (status: Book["status"], dueDate?: string) => {
    switch (status) {
      case "Available":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
            <CheckCircle className="w-3.5 h-3.5" /> Available
          </span>
        );
      case "Issued":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold rounded-full">
            <AlertCircle className="w-3.5 h-3.5" /> Issued (Due {dueDate})
          </span>
        );
      case "Reference Only":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold rounded-full">
            <BookmarkCheck className="w-3.5 h-3.5" /> Reference Block Only
          </span>
        );
    }
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-24 md:py-32 relative overflow-hidden">
        {/* Faded overlay image */}
        <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none">
          <img src={`${import.meta.env.BASE_URL}hero-building.png`} alt="Library Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-primary to-[#011a2a] z-0" />
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10 backdrop-blur-md">
                <BookMarked className="w-8 h-8 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                Central <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Library</span>
              </h1>
              <p className="text-base md:text-lg text-white/80 font-light mb-10 leading-relaxed">
                Empowering pharmaceutical learning and research with comprehensive physical archives and high-speed digital research terminals.
              </p>
              
              {/* Catalog Search Bar Form */}
              <form onSubmit={handleSearchSubmit} className="flex bg-white rounded-2xl p-1.5 shadow-2xl relative z-20 max-w-xl mx-auto border border-muted">
                <div className="flex-1 flex items-center px-4 relative">
                  <Search className="w-5 h-5 text-muted-foreground/60 absolute left-4.5" />
                  <input 
                    type="text"
                    placeholder="Search books by title, author, Call No..." 
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value.trim()) setSearchTriggered(false);
                    }}
                    className="w-full pl-8 pr-4 py-3 bg-transparent text-primary text-sm focus:outline-none placeholder:text-muted-foreground/50"
                  />
                  {searchQuery && (
                    <button 
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchTriggered(false);
                      }} 
                      className="absolute right-3.5 p-0.5 rounded-full hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button 
                  type="submit"
                  className="cursor-pointer rounded-xl px-6 bg-accent hover:bg-accent/90 text-white font-bold text-sm transition-all duration-300 shadow-lg shadow-accent/20"
                >
                  Search
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section (Overlapping Hero) */}
      <section className="py-10 bg-background relative -mt-10 z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryStats.map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-muted flex flex-col items-center text-center group hover:border-accent/40 hover:shadow-[0_12px_45px_rgb(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-1">{stat.value}</h3>
                <p className="text-muted-foreground font-semibold uppercase tracking-wider text-[10px] md:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs Switches */}
      <div className="flex justify-center mb-10 mt-10">
        <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1.5">
          {([
            { id: "catalog", label: "Catalog Search & Stats" },
            { id: "digital", label: "DELNET & E-Resources" },
            { id: "facilities", label: "Reading Rooms & Rules" }
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-md" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Content */}
      <AnimatePresence mode="wait">
        {activeTab === "catalog" && (
          <motion.div
            key="catalog"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Book Finder Results Section (Revealed on Search) */}
      <AnimatePresence>
        {searchTriggered && (
          <motion.section 
            id="book-finder-results"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="py-12 bg-muted/10 border-b border-muted overflow-hidden"
          >
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                  <BookOpen className="w-5.5 h-5.5 text-accent" /> Book Finder Catalog Matches ({filteredBooks.length})
                </h3>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSearchTriggered(false);
                  }}
                  className="cursor-pointer text-xs font-bold text-muted-foreground hover:text-primary border border-muted px-3 py-1.5 rounded-lg bg-white"
                >
                  Clear Results
                </button>
              </div>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredBooks.map((book) => (
                    <motion.div 
                      key={book.id}
                      initial={{ scale: 0.97 }}
                      animate={{ scale: 1 }}
                      className="bg-white p-6 rounded-3xl border border-muted shadow-sm hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <span className="inline-block px-2.5 py-1 bg-primary/5 text-primary text-xs font-bold rounded-lg border border-primary/10">
                            Call No: {book.callNo}
                          </span>
                          {getStatusBadge(book.status, book.dueDate)}
                        </div>
                        <h4 className="text-base md:text-lg font-bold text-primary mb-1 leading-snug">{book.title}</h4>
                        <p className="text-xs text-muted-foreground font-semibold mb-4">Author: {book.author}</p>
                      </div>

                      <div className="pt-3.5 border-t border-muted/50 flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-primary" /> {book.location}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-white border border-muted rounded-3xl max-w-xl mx-auto p-6">
                  <AlertCircle className="w-10 h-10 text-muted-foreground/45 mx-auto mb-3" />
                  <h4 className="font-bold text-primary text-base">No books matched your query</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">Try typing broad terms like "Pharmacology", "Tripathi", "Lachman", or "Chemistry".</p>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

          </motion.div>
        )}

        {activeTab === "digital" && (
          <motion.div
            key="digital"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Digital Library & E-Resources Section */}
            <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              Digital E-Resources Portal
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Institutionally subscribed journal access networks. Connect to academic papers and Union databases from these online nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {E_RESOURCES.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex flex-col justify-between bg-white border border-muted p-7 md:p-8 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-[0_10px_35px_rgb(0,0,0,0.03)] transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-[10px] uppercase tracking-wider rounded-md border border-accent/20">
                      {resource.type}
                    </span>
                    <BookMarked className="w-5 h-5 text-muted-foreground/30 group-hover:text-accent/40 transition-colors" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors leading-tight">
                    {resource.name}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed mb-6">
                    {resource.desc}
                  </p>
                </div>

                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-accent group-hover:underline w-fit mt-auto"
                >
                  Open Resource Link <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          </motion.div>
        )}

        {activeTab === "facilities" && (
          <motion.div
            key="facilities"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Library Sections & Guidelines */}
            <section className="py-12 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Sections List */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-extrabold text-primary tracking-tight">Library Sections</h2>
                <p className="text-muted-foreground text-sm mt-1 leading-relaxed">Structured zones designed to offer optimal reading environment and specialized pharmacy literature reference blocks.</p>
              </div>

              <div className="space-y-5">
                {[
                  { title: "Reference Compendia Room", desc: "Houses the official Pharmacopoeias (IP, BP, USP) along with dictionaries, rare chemical catalogs, and toxicology reference books." },
                  { title: "Spacious Reading Hall", desc: "Quiet study hall accommodating 150+ students with comfortable seating, proper ventilation, and ambient reading lights." },
                  { title: "Digital Library Block", desc: "Equipped with high-speed internet computers, DELNET portal terminals, and e-journal databases search monitors." },
                  { title: "Automated Circulation Desk", desc: "Self-issue and return counter utilizing advanced library management system with barcodes for swift transactions." }
                ].map((sec, i) => (
                  <div 
                    key={i} 
                    className="flex gap-4 p-4.5 rounded-2xl border border-transparent hover:border-muted-border hover:bg-white transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 text-primary font-bold group-hover:bg-accent group-hover:text-white transition-colors duration-300 text-sm">
                      0{i+1}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-primary mb-1 flex items-center gap-1.5 group-hover:text-accent transition-colors">
                        {sec.title} <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed">{sec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Library Rules Panel */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-white p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-xl"
            >
              {/* Backglow blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] pointer-events-none" />
              
              <h2 className="text-2xl md:text-3xl font-bold mb-8 relative z-10 flex items-center gap-2">
                <ShieldCheck className="w-6.5 h-6.5 text-accent" /> Library Regulations
              </h2>
              
              <ul className="space-y-5.5 relative z-10 text-white/80 font-light text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                  <span>Valid institutional student ID cards are mandatory for entry and issuing books.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                  <span>Students can issue up to **3 books** concurrently for a maximum period of **15 days**.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                  <span>Reference compendias (Pharmacopoeias, encyclopedias) cannot be issued home and are study-room only.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                  <span>Strict silence must be observed in the Reading and Digital Library rooms.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0 mt-2.5" />
                  <span>Overdue book returns attract a late fee of **Rs. 2 per day** per volume.</span>
                </li>
              </ul>
              
              {/* Help notice */}
              <div className="flex gap-2.5 bg-white/10 border border-white/15 p-4.5 rounded-2xl text-xs text-white/70 mt-8.5">
                <HelpCircle className="w-5.5 h-5.5 text-accent shrink-0" />
                <span>To request digital login credentials for DELNET or K-Hub portals, kindly visit the librarian's desk during college office hours.</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
