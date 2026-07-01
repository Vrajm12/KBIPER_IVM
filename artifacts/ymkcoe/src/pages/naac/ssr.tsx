import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Award, 
  Search, 
  DownloadCloud, 
  ChevronDown, 
  BookOpen, 
  FileText, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Bookmark
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface Metric {
  code: string;
  name: string;
  type: "QlM" | "QnM";
  size: string;
}

interface Criterion {
  id: number;
  title: string;
  codeName: string;
  description: string;
  metrics: Metric[];
}

const SSR_DATABASE: Criterion[] = [
  {
    id: 1,
    title: "Curricular Aspects",
    codeName: "Criterion 1",
    description: "Curriculum planning, feedback systems, and academic flexibility aligned with regulatory standards.",
    metrics: [
      { code: "1.1.1", name: "Curriculum Delivery & Planning Processes", type: "QlM", size: "1.4 MB" },
      { code: "1.2.2", name: "Percentage of Students Enrolled in Certificate/Add-on Programs", type: "QnM", size: "950 KB" },
      { code: "1.4.1", name: "Structured Curriculum Feedback Reports (Alumni, Employer, Student)", type: "QnM", size: "2.1 MB" }
    ]
  },
  {
    id: 2,
    title: "Teaching-Learning and Evaluation",
    codeName: "Criterion 2",
    description: "Catering to student diversity, student-centric learning, teacher quality, and evaluation processes.",
    metrics: [
      { code: "2.1.2", name: "Student Enrollment & Reservation Profiles", type: "QnM", size: "880 KB" },
      { code: "2.3.1", name: "Student Centric Methods: Experiential & Participative Learning", type: "QlM", size: "1.8 MB" },
      { code: "2.6.3", name: "Annual Pass Percentage of Students", type: "QnM", size: "1.2 MB" }
    ]
  },
  {
    id: 3,
    title: "Research, Innovations and Extension",
    codeName: "Criterion 3",
    description: "Mobilization of research grants, innovations ecosystem, extension programs, and industrial collaborations.",
    metrics: [
      { code: "3.1.1", name: "Research Grants Received from Government Agencies", type: "QnM", size: "1.6 MB" },
      { code: "3.3.2", name: "Research Papers Published in UGC Care/Indexed Journals", type: "QnM", size: "2.8 MB" },
      { code: "3.4.3", name: "Extension Outreach Activities in Adopted Villages (NSS Unit)", type: "QlM", size: "3.2 MB" }
    ]
  },
  {
    id: 4,
    title: "Infrastructure and Learning Resources",
    codeName: "Criterion 4",
    description: "Physical facilities, smart classrooms, library resources (e-journals), and IT maintenance budgets.",
    metrics: [
      { code: "4.1.1", name: "Adequacy of Physical Facilities (Labs, Lecture Halls, Machine Room)", type: "QlM", size: "2.5 MB" },
      { code: "4.2.2", name: "Subscription of E-Journals, ShodhSindhu, and DelNet Reports", type: "QnM", size: "920 KB" },
      { code: "4.3.1", name: "Computing Facilities & Available Bandwidth (Wi-Fi access)", type: "QlM", size: "1.1 MB" }
    ]
  },
  {
    id: 5,
    title: "Student Support and Progression",
    codeName: "Criterion 5",
    description: "Scholarship distribution, capability development schemes, placement records, and alumni networks.",
    metrics: [
      { code: "5.1.1", name: "Percentage of Students Benefited by Government Scholarships", type: "QnM", size: "1.5 MB" },
      { code: "5.2.1", name: "Placement & Higher Education Progression Reports", type: "QnM", size: "2.4 MB" },
      { code: "5.4.1", name: "Alumni Association Contribution & Alumni Meet Logs", type: "QlM", size: "1.7 MB" }
    ]
  },
  {
    id: 6,
    title: "Governance, Leadership and Management",
    codeName: "Criterion 6",
    description: "Institutional vision, strategic plans, professional development, and financial audits.",
    metrics: [
      { code: "6.1.1", name: "Governance in Tune with Vision and Mission of KBIPER", type: "QlM", size: "1.3 MB" },
      { code: "6.3.3", name: "Professional Development/Administrative Training Programs Organized", type: "QnM", size: "1.9 MB" },
      { code: "6.5.1", name: "Quality Assurance Initiatives of the Institution", type: "QlM", size: "1.6 MB" }
    ]
  },
  {
    id: 7,
    title: "Institutional Values and Best Practices",
    codeName: "Criterion 7",
    description: "Gender sensitization, environment/energy audits, best practices (Pharma-Fiesta, Sudumbare welfare).",
    metrics: [
      { code: "7.1.1", name: "Gender Equity Promotion Initiatives & Facilities", type: "QlM", size: "2.2 MB" },
      { code: "7.1.3", name: "Environmental/Green Audits and Waste Management Logs", type: "QnM", size: "2.9 MB" },
      { code: "7.2.1", name: "Details of Two Institutional Best Practices", type: "QlM", size: "3.5 MB" }
    ]
  }
];

export default function SSRPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCriterionId, setExpandedCriterionId] = useState<number | null>(null);

  const filteredCriteria = useMemo(() => {
    if (!searchQuery.trim()) return SSR_DATABASE;
    
    const query = searchQuery.toLowerCase();
    return SSR_DATABASE.map(crit => {
      // Check if title, description, codeName matches
      const titleMatches = crit.title.toLowerCase().includes(query) || crit.description.toLowerCase().includes(query);
      
      // Filter metrics inside that match the query code or name
      const matchingMetrics = crit.metrics.filter(met => 
        met.code.includes(query) || met.name.toLowerCase().includes(query)
      );

      if (titleMatches || matchingMetrics.length > 0) {
        return {
          ...crit,
          // If title matches, show all metrics, otherwise show only matching ones
          metrics: titleMatches ? crit.metrics : matchingMetrics
        };
      }
      return null;
    }).filter((crit): crit is Criterion => crit !== null);
  }, [searchQuery]);

  const handleDownload = (metricCode: string, metricName: string) => {
    toast({
      title: "Metric Download Initiated",
      description: `Downloading NAAC SSR Metric ${metricCode}: "${metricName}"`,
    });
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
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Self Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Report</span> (SSR)
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Access quantitative and qualitative metrics across NAAC Criteria. Search files and download compliance reports.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview & Search Banners */}
      <section className="py-12 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white border border-muted rounded-3xl p-6.5 shadow-sm space-y-6">
            <div className="text-center space-y-1.5 text-xs md:text-sm">
              <h2 className="text-lg font-extrabold text-primary flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-accent animate-pulse" /> NAAC Accreditation Data Hub
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                KBIPER maintains transparent standards of governance, curriculum delivery, and student support. Search the database below to download individual metrics for the SSR accreditation cycles.
              </p>
            </div>

            {/* Custom Search bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search metrics by code (e.g. 2.1) or keyword..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SSR Criteria List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-4">
            {filteredCriteria.map((crit, idx) => {
              const isExpanded = expandedCriterionId === crit.id;
              return (
                <div 
                  key={crit.id}
                  className="bg-white border border-muted rounded-2xl.5 overflow-hidden transition-all duration-300 shadow-sm hover:border-accent/40"
                >
                  <button
                    onClick={() => setExpandedCriterionId(isExpanded ? null : crit.id)}
                    className="w-full p-5.5 flex justify-between items-center text-left hover:bg-muted/10 transition-colors"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-accent tracking-wider block">
                        {crit.codeName}
                      </span>
                      <h3 className="text-sm md:text-base font-extrabold text-primary leading-tight">
                        {crit.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 hidden md:block">
                        {crit.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      <span className="text-[10px] bg-primary/5 text-primary border border-primary/10 px-2 py-0.5 rounded font-semibold hidden sm:inline-block">
                        {crit.metrics.length} Metrics
                      </span>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "transform rotate-180" : ""
                      }`} />
                    </div>
                  </button>

                  <div className={`transition-all duration-300 ease-in-out ${
                    isExpanded ? "max-h-[800px] border-t border-muted/50 p-5.5 bg-muted/10" : "max-h-0 overflow-hidden"
                  }`}>
                    {/* Inner mobile description */}
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 md:hidden">
                      {crit.description}
                    </p>

                    <div className="space-y-3">
                      {crit.metrics.map((metric) => (
                        <div 
                          key={metric.code}
                          className="bg-white border border-muted p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs hover:border-accent/30 transition-colors"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-primary text-xs tracking-tight bg-muted px-2 py-0.5 rounded border border-muted-border">
                                Metric {metric.code}
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                metric.type === "QlM" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                              }`}>
                                {metric.type === "QlM" ? "Qualitative" : "Quantitative"}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-foreground leading-tight">{metric.name}</h4>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-muted/40 sm:border-t-0 shrink-0">
                            <span className="text-[10px] text-muted-foreground font-semibold">Size: {metric.size}</span>
                            <button
                              onClick={() => handleDownload(metric.code, metric.name)}
                              className="cursor-pointer bg-primary hover:bg-primary/95 text-white p-2 rounded-lg border border-transparent shadow-sm hover:scale-102 transition-all flex items-center gap-1 text-[10px] font-bold"
                            >
                              <DownloadCloud className="w-3.5 h-3.5 text-accent" /> Download File
                            </button>
                          </div>
                        </div>
                      ))}

                      {crit.metrics.length === 0 && (
                        <p className="text-center py-4 text-xs text-muted-foreground">No metrics matched your query under this Criterion.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredCriteria.length === 0 && (
              <div className="text-center py-16 text-muted-foreground bg-white border border-muted border-dashed rounded-3xl">
                No matching SSR criteria or metric files found. Try refining your keywords.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Institutional Quality Commitment banner */}
      <section className="py-12 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-700/10 via-primary to-[#011a2a]" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 space-y-4">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
            <Bookmark className="w-5 h-5 text-accent" />
          </div>
          <h3 className="text-lg font-extrabold tracking-tight">Excellence in Pharmaceutical Governance</h3>
          <p className="text-xs text-white/80 max-w-lg mx-auto leading-relaxed">
            KBIPER aligns all academic operations to national NAAC specifications. All criteria reports are certified by the internal cell and external review bodies.
          </p>
        </div>
      </section>
    </AppLayout>
  );
}
