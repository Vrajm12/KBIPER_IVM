import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Search, 
  Send, 
  Sparkles,
  BookOpen,
  FlaskConical,
  Coins,
  FileCheck,
  DownloadCloud,
  ChevronRight,
  TrendingUp,
  Bookmark,
  Share2
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface ResearchProject {
  title: string;
  investigator: string;
  agency: string;
  fundingAmount: string;
  duration: string;
  status: "Active" | "Completed";
}

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  type: string;
}

interface Patent {
  title: string;
  appNo: string;
  status: string;
  year: string;
}

const RESEARCH_AREAS = [
  {
    title: "Novel Drug Delivery Systems (NDDS)",
    description: "Developing liposomal, niosomal, and nano-formulation methodologies to improve bioavailability and targeted drug delivery validation.",
    icon: FlaskConical,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Synthetic Organic Chemistry",
    description: "Computer-aided drug design, molecular docking, QSAR modeling, and targeted chemical synthesis of novel bioactive heterocyclic compounds.",
    icon: Sparkles,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
  {
    title: "Pharmacological Screenings",
    description: "In-vivo and in-vitro toxicity models, safety evaluations of new chemical entities, and cellular signaling pathway validations.",
    icon: TrendingUp,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Phytochemistry & Pharmacognosy",
    description: "Extraction, bio-guided isolation, characterization, and therapeutic evaluation of active secondary metabolites from regional flora.",
    icon: BookOpen,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  }
];

const SPONSORED_PROJECTS: ResearchProject[] = [
  {
    title: "Development & Validation of Targeted Liposomal Formulations for Anti-Cancer Deliveries",
    investigator: "Dr. Rekha Patil (Principal Investigator)",
    agency: "AICTE Research Promotion Scheme (RPS)",
    fundingAmount: "₹50 Lakhs",
    duration: "3 Years (2024 - 2027)",
    status: "Active"
  },
  {
    title: "Computational Docking and Synthesis of Novel Heterocyclic Imidazoles as Antibacterials",
    investigator: "Dr. Nilesh Patil (Co-Investigator)",
    agency: "DBATU Collaborative Research Grant",
    fundingAmount: "₹15 Lakhs",
    duration: "2 Years (2023 - 2025)",
    status: "Completed"
  },
  {
    title: "Phytochemical Extraction & Efficacy Profile of Local Weeds for Wound Healing",
    investigator: "Mrs. Priya Deshpande (Investigator)",
    agency: "State Science & Technology Commission",
    fundingAmount: "₹10 Lakhs",
    duration: "2 Years (2025 - 2027)",
    status: "Active"
  }
];

const PUBLICATIONS_DATABASE: Publication[] = [
  {
    title: "AI-driven molecular docking of novel imidazoles against multi-drug resistant S. aureus strains",
    authors: "Patil N., Shinde S., Bhegade S.",
    journal: "Journal of Pharmaceutical Chemistry (Scopus Indexed)",
    year: "2026",
    type: "Review Paper"
  },
  {
    title: "Design and characterization of liposomal docetaxel formulations: scale-up and validation parameters",
    authors: "Patil R., More S., Kulkarni R.",
    journal: "International Journal of Pharmaceutics (PubMed Indexed)",
    year: "2025",
    type: "Research Article"
  },
  {
    title: "Phytochemical profiling and wound healing efficacy of local medicinal weeds extracts in animal models",
    authors: "Deshpande P., Jagtap R.",
    journal: "Journal of Pharmacognosy Research (UGC Care)",
    year: "2025",
    type: "Research Article"
  },
  {
    title: "Good Manufacturing Compliance (GMP) audits: cleanroom validation standard operating guidelines review",
    authors: "Bhegade S., Shinde R.",
    journal: "Indian Journal of Regulatory Science",
    year: "2024",
    type: "Review Paper"
  }
];

const PATENTS_DATA: Patent[] = [
  {
    title: "A novel liposomal formulation for targeted docetaxel delivery and preparation process thereof",
    appNo: "Patent App No: 202521045051 A",
    status: "Filed & Published",
    year: "2025"
  },
  {
    title: "A process for computer-aided computational synthesis of imidazole derivatives as antimicrobials",
    appNo: "Patent App No: 202421038090 A",
    status: "Filed & Published",
    year: "2024"
  }
];

export default function RDPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"areas" | "projects" | "publications" | "patents">("areas");
  const [searchQuery, setSearchQuery] = useState("");

  // Proposal form state
  const [proposerName, setProposerName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [email, setEmail] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredPublications = useMemo(() => {
    if (!searchQuery.trim()) return PUBLICATIONS_DATABASE;
    return PUBLICATIONS_DATABASE.filter(pub => 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const isFormValid = useMemo(() => {
    return proposerName.trim().length > 2 && affiliation.trim().length > 2 && email.trim().includes("@") && projectTitle.trim().length > 5 && abstract.trim().length > 9;
  }, [proposerName, affiliation, email, projectTitle, abstract]);

  const handleDownload = (docName: string) => {
    toast({
      title: "Document Downloaded",
      description: `Downloading paper abstract for "${docName}"`,
    });
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitted(true);
    toast({
      title: "Proposal Received",
      description: "Dear investigator, your collaboration draft has been recorded. Dean R&D office will follow up.",
    });
  };

  const handleResetForm = () => {
    setProposerName("");
    setAffiliation("");
    setEmail("");
    setProjectTitle("");
    setAbstract("");
    setIsSubmitted(false);
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
              <FlaskConical className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Research & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Development</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Cultivating a culture of inquiry, pharmaceutical innovation, peer-reviewed publications, and industrial technology transfers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* R&D Statistics */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Total Research Grants</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                ₹75L+ <span className="text-xs font-normal text-muted-foreground">Sanctioned</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Indexed Publications</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                150+ <span className="text-xs font-normal text-muted-foreground">Papers</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Patents Filed</span>
              <div className="text-2xl font-black text-primary mt-1 tracking-tight flex items-baseline gap-1">
                8+ <span className="text-xs font-normal text-muted-foreground">Applications</span>
              </div>
            </div>
            <div className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm">
              <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block">Active Scholars</span>
              <div className="text-2xl font-black text-accent mt-1 tracking-tight flex items-baseline gap-1">
                25+ <span className="text-xs font-normal text-muted-foreground">Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* R&D Main Dashboard */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Dashboard tab switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("areas")}
                className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "areas" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <FlaskConical className="w-4 h-4" /> Research Areas
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "projects" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Coins className="w-4 h-4" /> Sponsored Projects
              </button>
              <button
                onClick={() => setActiveTab("publications")}
                className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "publications" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <BookOpen className="w-4 h-4" /> Publications
              </button>
              <button
                onClick={() => setActiveTab("patents")}
                className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "patents" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Award className="w-4 h-4" /> Patents
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content Window */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === "areas" && (
                  <motion.div
                    key="areas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    {RESEARCH_AREAS.map((area, idx) => {
                      const IconComp = area.icon;
                      return (
                        <div 
                          key={idx}
                          className="bg-white border border-muted p-5.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 transition-colors duration-300 flex items-start gap-4"
                        >
                          <div className={`p-3 rounded-xl shrink-0 ${area.color}`}>
                            <IconComp className="w-5.5 h-5.5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-primary leading-tight mb-1">{area.title}</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">{area.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                )}

                {activeTab === "projects" && (
                  <motion.div
                    key="projects"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {SPONSORED_PROJECTS.map((proj, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-muted p-6.5 rounded-2xl shadow-sm hover:border-accent/40 transition-all duration-300 space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <span className={`inline-flex px-2 py-0.5 rounded-full text-[9px] font-extrabold border ${
                              proj.status === "Active" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-emerald-50 text-emerald-600 border-emerald-100"
                            } mb-2 uppercase`}>
                              {proj.status}
                            </span>
                            <h3 className="text-sm md:text-base font-extrabold text-primary leading-tight">{proj.title}</h3>
                            <p className="text-[10px] text-muted-foreground font-semibold mt-1">
                              <strong>Investigator:</strong> {proj.investigator}
                            </p>
                          </div>
                          <span className="text-[10px] bg-primary/5 text-primary border border-primary/10 px-2 py-1 rounded font-extrabold shrink-0 self-start sm:self-auto">
                            {proj.fundingAmount}
                          </span>
                        </div>
                        <div className="flex flex-wrap justify-between items-center text-[10px] text-muted-foreground pt-2 border-t border-muted/50 gap-2">
                          <span><strong>Funding Body:</strong> {proj.agency}</span>
                          <span><strong>Duration:</strong> {proj.duration}</span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "publications" && (
                  <motion.div
                    key="publications"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Search inside publications */}
                    <div className="relative">
                      <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search publications by author or keywords..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>

                    <div className="space-y-4">
                      {filteredPublications.map((pub, idx) => (
                        <div 
                          key={idx}
                          className="bg-white border border-muted p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-accent/40 transition-colors duration-300"
                        >
                          <div className="space-y-1">
                            <span className="inline-flex px-1.5 py-0.5 bg-muted text-[8px] text-primary font-bold rounded border border-muted-border mb-1 uppercase">
                              {pub.type} • {pub.year}
                            </span>
                            <h4 className="text-xs md:text-sm font-bold text-primary leading-tight">{pub.title}</h4>
                            <p className="text-[10px] text-muted-foreground"><strong>Authors:</strong> {pub.authors}</p>
                            <p className="text-[10px] text-muted-foreground/80 italic">{pub.journal}</p>
                          </div>

                          <button
                            onClick={() => handleDownload(pub.title)}
                            className="cursor-pointer bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl border border-transparent shadow hover:scale-102 transition-all flex items-center gap-1.5 text-[10px] font-bold shrink-0 self-start sm:self-auto"
                          >
                            <DownloadCloud className="w-3.5 h-3.5 text-accent" /> Download Abstract
                          </button>
                        </div>
                      ))}

                      {filteredPublications.length === 0 && (
                        <p className="text-center py-6 text-xs text-muted-foreground bg-white border border-muted border-dashed rounded-xl">
                          No papers matched your search query.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeTab === "patents" && (
                  <motion.div
                    key="patents"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {PATENTS_DATA.map((pat, idx) => (
                      <div 
                        key={idx}
                        className="bg-white border border-muted p-5 rounded-2xl shadow-sm hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center">
                            <span className="inline-flex px-2 py-0.5 bg-emerald-50 text-[9px] text-emerald-700 font-bold rounded-full border border-emerald-100 uppercase">
                              {pat.status}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{pat.year}</span>
                          </div>
                          <h4 className="text-sm font-extrabold text-primary leading-tight">{pat.title}</h4>
                          <p className="text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-muted-border/30">
                            {pat.appNo}
                          </p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column Research Proposal submission form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <Share2 className="w-5 h-5 text-accent" /> Research Collaboration Desk
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Submit a research draft or proposal to seek collaboration with KBIPER analytical departments.</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Investigator Full Name</label>
                      <input
                        type="text"
                        required
                        value={proposerName}
                        onChange={(e) => setProposerName(e.target.value)}
                        placeholder="e.g. Dr. Rajesh Shinde"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Affiliation / Organization</label>
                      <input
                        type="text"
                        required
                        value={affiliation}
                        onChange={(e) => setAffiliation(e.target.value)}
                        placeholder="e.g. Pune University Department"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Contact Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. rajesh@univ.edu"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Proposed Project Title</label>
                      <input
                        type="text"
                        required
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. Formulation study of nanoparticles"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Project Abstract (Min 10 chars)</label>
                      <textarea
                        required
                        rows={4}
                        value={abstract}
                        onChange={(e) => setAbstract(e.target.value)}
                        placeholder="Provide a brief summary of methodology, deliverables, and required instruments..."
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Send Research Proposal
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <FileCheck className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary">Proposal Recorded</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        Successful submission! An verification receipt has been dispatched to <span className="font-bold text-primary">{email}</span>.
                      </p>
                    </div>
                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      New Submission
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* R&D advisory message block */}
      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/10 via-primary to-[#011a2a]" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-4">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
            <Bookmark className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-extrabold tracking-tight">Institutional Biosafety & Ethical Clearances</h3>
          <p className="text-xs text-white/80 max-w-lg mx-auto leading-relaxed">
            All pharmacological trials and formulation syntheses at KBIPER laboratories comply strictly with CPCSEA approvals and institutional biosafety committees.
          </p>
        </div>
      </section>

    </AppLayout>
  );
}
