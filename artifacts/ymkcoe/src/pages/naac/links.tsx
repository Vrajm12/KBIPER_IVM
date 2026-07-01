import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building,
  FileCheck,
  DownloadCloud,
  Layers,
  Sparkles,
  BookOpen,
  UserCheck,
  TrendingUp,
  Cpu,
  MonitorCheck,
  Flame,
  HelpCircle,
  Play,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ApprovalLink {
  title: string;
  body: string;
  refNo: string;
  year: string;
}

const REGULATORY_APPROVALS: ApprovalLink[] = [
  {
    title: "AICTE Approval Extension Letter",
    body: "All India Council for Technical Education statutory approval letter for B.Pharm and M.Pharm courses.",
    refNo: "F.No. Western/1-364923/2026/EOA",
    year: "AY 2026-27"
  },
  {
    title: "PCI Approval & Sanction Certificate",
    body: "Pharmacy Council of India approvals for D.Pharm, B.Pharm, and M.Pharm intake allocations.",
    refNo: "PCI-4402/2025-Decision-Board",
    year: "AY 2025-26"
  },
  {
    title: "DBATU Affiliation Approval Statement",
    body: "Dr. Babasaheb Ambedkar Technological University (DBATU) affiliation letters for curriculum validation.",
    refNo: "DBATU/Affilet/KBIPER/2025-26",
    year: "AY 2025-26"
  },
  {
    title: "DTE Maharashtra Intake Clearance",
    body: "Directorate of Technical Education (DTE) code allotment and institutional intake approvals.",
    refNo: "DTE-Code-6902/Admission-Audit",
    year: "AY 2026-27"
  }
];

interface ProposedIntegration {
  id: string;
  name: string;
  purpose: string;
  description: string;
  importance: string;
  status: "Proposed" | "Integrating" | "Linked" | "Simulating Demo";
  icon: any;
}

export default function PlacementsLinks() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"approvals" | "integrations">("approvals");
  
  // Stateful Proposed integrations
  const [integrations, setIntegrations] = useState<ProposedIntegration[]>([
    {
      id: "lms",
      name: "Learning Management System (LMS)",
      purpose: "Moodle & Canvas Integration",
      description: "A centralized portal for pharmacy students to download daily lecture handouts, upload assignments, take quizzes, and track syllabus coverage lists.",
      importance: "Reduces paper dependency, automates continuous evaluation metrics, and offers 24/7 access to curriculum materials.",
      status: "Integrating",
      icon: BookOpen
    },
    {
      id: "erp",
      name: "Student ERP & Attendance Hub",
      purpose: "Real-time Student Profiling & Fees Clearing",
      description: "A database tracking student details, daily lecture attendance indices, official transcripts printing, and secure online fee clearance gates.",
      importance: "Integrates administrative operations, provides parents with direct updates, and streamlines exam hall ticket validations.",
      status: "Proposed",
      icon: UserCheck
    },
    {
      id: "vlab",
      name: "AICTE/MHRD Virtual Lab Integration",
      purpose: "Wet Lab Simulations",
      description: "Bilateral APIs linking students with national virtual lab environments for simulating organic drug syntheses and high-risk pharmacology animal model experiments.",
      importance: "Reduces chemical hazards, enables endless repeat runs for student practice, and complements actual laboratory classes.",
      status: "Proposed",
      icon: Cpu
    },
    {
      id: "dspace",
      name: "Institutional Research Repository (DSpace)",
      purpose: "Digital Research & Publication Archive",
      description: "An archival repository index hosting all faculty research publications, student project theses, patents, and historical college news magazines.",
      importance: "Improves institutional citations count, secures research intellectual property, and serves as an open-access library catalog.",
      status: "Proposed",
      icon: Layers
    },
    {
      id: "gov",
      name: "E-Governance Compliance Dashboard",
      purpose: "Live Accreditation Indicators",
      description: "A dynamic dashboard reporting real-time faculty feedback scores, research budgets, student pass rates, and regulatory documentation statuses.",
      importance: "Ensures transparent governance, aids in quick preparation for NAAC/PCI inspections, and maps budget outlays directly.",
      status: "Proposed",
      icon: MonitorCheck
    }
  ]);

  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const handleDownload = (docName: string) => {
    toast({
      title: "Regulatory Letter Downloaded",
      description: `Downloading approval file for "${docName}"`,
    });
  };

  const handleDemoRequest = (id: string, name: string) => {
    setSimulatingId(id);
    toast({
      title: "Initializing Simulator",
      description: `Opening simulation API channel for ${name}...`,
    });

    setTimeout(() => {
      setIntegrations(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === "Simulating Demo" ? "Proposed" : "Simulating Demo"
          };
        }
        return item;
      }));
      setSimulatingId(null);
      toast({
        title: "Simulation Successful",
        description: `Successfully loaded simulated mock interface for "${name}".`,
      });
    }, 1500);
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
              <Layers className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Approvals & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Roadmap</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Regulatory compliance approvals alongside our strategic roadmap for integrating state-of-the-art academic portals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Switcher & Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("approvals")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "approvals" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <FileCheck className="w-4 h-4" /> Statutory Approvals
              </button>
              <button
                onClick={() => setActiveTab("integrations")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "integrations" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <MonitorCheck className="w-4 h-4" /> Digital Campus Roadmap
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "approvals" && (
              <motion.div
                key="approvals-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {REGULATORY_APPROVALS.map((app, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-muted p-6.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-2">
                        <span className="inline-flex px-1.5 py-0.5 bg-primary/10 text-[9px] text-primary font-bold rounded border border-primary/20 uppercase tracking-wide">
                          {app.year}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-semibold">Ref: {app.refNo}</span>
                      </div>
                      <h3 className="text-sm md:text-base font-extrabold text-primary leading-tight">{app.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{app.body}</p>
                    </div>

                    <button
                      onClick={() => handleDownload(app.title)}
                      className="cursor-pointer mt-6 w-full py-2.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-sm transition-colors text-xs inline-flex items-center justify-center gap-1.5"
                    >
                      <DownloadCloud className="w-4 h-4 text-accent" /> Download Compliance File
                    </button>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "integrations" && (
              <motion.div
                key="integrations-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                <div className="bg-primary/5 p-6 rounded-3xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
                  <div className="space-y-1.5 text-xs md:text-sm">
                    <h3 className="font-extrabold text-primary flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-accent animate-spin" /> Institutional Integration Proposals
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      A modern statutory pharmacy website needs unified portals for academic excellence and governance. Below is our proposed digital roadmap. Toggle any module to run a simulated client connection.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {integrations.map((item) => {
                    const IconComp = item.icon;
                    const isSimulating = simulatingId === item.id;
                    return (
                      <div 
                        key={item.id}
                        className="bg-white border border-muted p-5.5 rounded-2xl shadow-sm hover:border-accent/40 transition-colors duration-300 flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                              <IconComp className="w-5.5 h-5.5 text-accent" />
                            </div>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase border ${
                              item.status === "Linked" 
                                ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                                : item.status === "Integrating" 
                                ? "bg-blue-50 text-blue-600 border-blue-100 animate-pulse" 
                                : item.status === "Simulating Demo"
                                ? "bg-purple-50 text-purple-600 border-purple-100"
                                : "bg-amber-50 text-amber-600 border-amber-100"
                            }`}>
                              {item.status}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-sm font-extrabold text-primary leading-tight">{item.name}</h4>
                            <span className="text-[9px] font-bold text-accent uppercase tracking-wider block mt-0.5">{item.purpose}</span>
                          </div>

                          <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                          
                          <div className="bg-muted/30 p-3 rounded-xl border border-muted-border/30 text-[10px] text-muted-foreground">
                            <strong>Why it's essential:</strong> {item.importance}
                          </div>
                        </div>

                        <button
                          onClick={() => handleDemoRequest(item.id, item.name)}
                          disabled={isSimulating}
                          className={`cursor-pointer w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-300 inline-flex items-center justify-center gap-1.5 shadow-sm ${
                            item.status === "Simulating Demo"
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-primary hover:bg-primary/95 text-white"
                          }`}
                        >
                          {isSimulating ? (
                            <>
                              <Flame className="w-4 h-4 text-accent animate-bounce" /> Connecting...
                            </>
                          ) : item.status === "Simulating Demo" ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-accent" /> Disconnect Mock Channel
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4 text-accent" /> Run Simulated Connection
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

    </AppLayout>
  );
}
