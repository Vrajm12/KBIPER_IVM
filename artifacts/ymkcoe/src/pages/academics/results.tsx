import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { 
  Trophy, 
  DownloadCloud, 
  FileText, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ExternalLink,
  Award,
  BookOpen
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface Topper {
  rank: 1 | 2 | 3;
  name: string;
  score: string;
  degree: string;
}

interface ResultsDoc {
  name: string;
  degree: "B. Pharmacy" | "D. Pharmacy" | "M. Pharmacy";
  date: string;
  size: string;
  passRate: string;
}

interface YearResultsData {
  toppers: Topper[];
  stats: {
    passRate: string;
    avgSgpa: string;
    graduatedCount: number;
  };
  documents: ResultsDoc[];
}

const RESULTS_DATABASE: Record<string, YearResultsData> = {
  "2021-22": {
    toppers: [
      { rank: 1, name: "Ms. Snehal A. Shinde", score: "9.84 SGPA", degree: "B. Pharmacy" },
      { rank: 2, name: "Mr. Amit K. Gade", score: "9.75 SGPA", degree: "B. Pharmacy" },
      { rank: 3, name: "Ms. Pooja S. Patil", score: "9.62 SGPA", degree: "M. Pharmacy (Pharmaceutics)" }
    ],
    stats: {
      passRate: "98.4%",
      avgSgpa: "8.24",
      graduatedCount: 132
    },
    documents: [
      { name: "B. Pharmacy - 8th Semester End Examinations", degree: "B. Pharmacy", date: "August 10, 2022", size: "1.2 MB", passRate: "99.2%" },
      { name: "B. Pharmacy - 6th Semester Examinations", degree: "B. Pharmacy", date: "August 05, 2022", size: "1.5 MB", passRate: "97.5%" },
      { name: "D. Pharmacy - 2nd Year Board Examinations", degree: "D. Pharmacy", date: "July 28, 2022", size: "850 KB", passRate: "96.0%" },
      { name: "M. Pharmacy - 4th Semester (Pharmaceutics)", degree: "M. Pharmacy", date: "July 20, 2022", size: "2.1 MB", passRate: "100%" },
      { name: "M. Pharmacy - 4th Semester (Quality Assurance)", degree: "M. Pharmacy", date: "July 20, 2022", size: "1.9 MB", passRate: "100%" }
    ]
  },
  "2020-21": {
    toppers: [
      { rank: 1, name: "Mr. Rajesh V. Patil", score: "9.88 SGPA", degree: "B. Pharmacy" },
      { rank: 2, name: "Ms. Tanvi D. Deshmukh", score: "9.70 SGPA", degree: "B. Pharmacy" },
      { rank: 3, name: "Mr. Vivek S. Awate", score: "9.65 SGPA", degree: "D. Pharmacy" }
    ],
    stats: {
      passRate: "97.8%",
      avgSgpa: "8.15",
      graduatedCount: 128
    },
    documents: [
      { name: "B. Pharmacy - 8th Semester End Examinations", degree: "B. Pharmacy", date: "August 14, 2021", size: "1.1 MB", passRate: "98.8%" },
      { name: "B. Pharmacy - 6th Semester Examinations", degree: "B. Pharmacy", date: "August 09, 2021", size: "1.4 MB", passRate: "96.8%" },
      { name: "D. Pharmacy - 2nd Year Board Examinations", degree: "D. Pharmacy", date: "August 01, 2021", size: "880 KB", passRate: "95.5%" },
      { name: "M. Pharmacy - 4th Semester (Pharmaceutics)", degree: "M. Pharmacy", date: "July 25, 2021", size: "2.0 MB", passRate: "100%" },
      { name: "M. Pharmacy - 4th Semester (Quality Assurance)", degree: "M. Pharmacy", date: "July 25, 2021", size: "1.8 MB", passRate: "100%" }
    ]
  },
  "2019-20": {
    toppers: [
      { rank: 1, name: "Ms. Kirti R. Bhegade", score: "9.81 SGPA", degree: "B. Pharmacy" },
      { rank: 2, name: "Mr. Sachin P. Kadam", score: "9.72 SGPA", degree: "M. Pharmacy" },
      { rank: 3, name: "Ms. Rutuja D. More", score: "9.58 SGPA", degree: "B. Pharmacy" }
    ],
    stats: {
      passRate: "96.5%",
      avgSgpa: "7.98",
      graduatedCount: 125
    },
    documents: [
      { name: "B. Pharmacy - 8th Semester End Examinations", degree: "B. Pharmacy", date: "October 15, 2020", size: "1.3 MB", passRate: "97.2%" },
      { name: "D. Pharmacy - 2nd Year Board Examinations", degree: "D. Pharmacy", date: "October 10, 2020", size: "840 KB", passRate: "94.8%" },
      { name: "M. Pharmacy - 4th Semester (Pharmaceutics)", degree: "M. Pharmacy", date: "September 28, 2020", size: "1.9 MB", passRate: "100%" },
      { name: "M. Pharmacy - 4th Semester (Quality Assurance)", degree: "M. Pharmacy", date: "September 28, 2020", size: "1.7 MB", passRate: "100%" }
    ]
  },
  "2018-19": {
    toppers: [
      { rank: 1, name: "Mr. Mayur K. Lohkare", score: "9.76 SGPA", degree: "B. Pharmacy" },
      { rank: 2, name: "Ms. Swati S. Satkar", score: "9.64 SGPA", degree: "B. Pharmacy" },
      { rank: 3, name: "Mr. Ajay P. Deshmukh", score: "9.52 SGPA", degree: "D. Pharmacy" }
    ],
    stats: {
      passRate: "95.9%",
      avgSgpa: "7.92",
      graduatedCount: 120
    },
    documents: [
      { name: "B. Pharmacy - 8th Semester End Examinations", degree: "B. Pharmacy", date: "June 28, 2019", size: "1.2 MB", passRate: "96.5%" },
      { name: "B. Pharmacy - 6th Semester Examinations", degree: "B. Pharmacy", date: "June 22, 2019", size: "1.3 MB", passRate: "95.0%" },
      { name: "D. Pharmacy - 2nd Year Board Examinations", degree: "D. Pharmacy", date: "June 15, 2019", size: "780 KB", passRate: "94.0%" },
      { name: "M. Pharmacy - 4th Semester (Pharmaceutics)", degree: "M. Pharmacy", date: "June 10, 2019", size: "1.8 MB", passRate: "100%" }
    ]
  },
  "2017-18": {
    toppers: [
      { rank: 1, name: "Ms. Ankita V. Berde", score: "9.70 SGPA", degree: "B. Pharmacy" },
      { rank: 2, name: "Mr. Rohan D. Gade", score: "9.58 SGPA", degree: "B. Pharmacy" },
      { rank: 3, name: "Ms. Pallavi S. Patil", score: "9.48 SGPA", degree: "D. Pharmacy" }
    ],
    stats: {
      passRate: "94.8%",
      avgSgpa: "7.85",
      graduatedCount: 115
    },
    documents: [
      { name: "B. Pharmacy - 8th Semester End Examinations", degree: "B. Pharmacy", date: "June 25, 2018", size: "1.1 MB", passRate: "95.8%" },
      { name: "B. Pharmacy - 6th Semester Examinations", degree: "B. Pharmacy", date: "June 20, 2018", size: "1.3 MB", passRate: "94.2%" },
      { name: "D. Pharmacy - 2nd Year Board Examinations", degree: "D. Pharmacy", date: "June 12, 2018", size: "750 KB", passRate: "93.5%" },
      { name: "M. Pharmacy - 4th Semester (Pharmaceutics)", degree: "M. Pharmacy", date: "June 05, 2018", size: "1.7 MB", passRate: "100%" }
    ]
  }
};

const YEARS_LIST = ["2021-22", "2020-21", "2019-20", "2018-19", "2017-18"];
const PROGRAM_FILTERS = ["All", "B. Pharmacy", "D. Pharmacy", "M. Pharmacy"];

export default function Results() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const year = params.year || "2021-22";
  const data = useMemo(() => {
    return RESULTS_DATABASE[year] || RESULTS_DATABASE["2021-22"];
  }, [year]);

  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredDocs = useMemo(() => {
    if (activeFilter === "All") return data.documents;
    return data.documents.filter(doc => doc.degree === activeFilter);
  }, [data, activeFilter]);

  const handleDownload = (docName: string) => {
    toast({
      title: "Downloading Result Ledger",
      description: `Downloading result sheet for ${docName}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Download Started",
        description: `PDF spreadsheet for ${docName} downloaded successfully.`,
      });
    }, 1500);
  };

  const getRankBadge = (rank: Topper["rank"]) => {
    switch (rank) {
      case 1:
        return "bg-amber-100 text-amber-800 border-amber-300 shadow-amber-200 dark:bg-amber-950/20 dark:text-amber-400";
      case 2:
        return "bg-slate-100 text-slate-800 border-slate-300 shadow-slate-200 dark:bg-slate-900/20 dark:text-slate-400";
      case 3:
        return "bg-amber-700/10 text-amber-900 border-amber-700/20 dark:text-amber-300";
    }
  };

  const getRankName = (rank: Topper["rank"]) => {
    switch (rank) {
      case 1:
        return "Gold Medalist (Rank 1)";
      case 2:
        return "Silver Medalist (Rank 2)";
      case 3:
        return "Bronze Medalist (Rank 3)";
    }
  };

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 backdrop-blur-md">
              <Trophy className="w-7 h-7 text-accent animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Results</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Celebrating institutional academic excellence and providing secure, transparent access to annual university result sheets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Results Canvas */}
      <section className="py-12 bg-background min-h-[70vh] relative">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Segmented Year Controller */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              {YEARS_LIST.map((yr) => (
                <button
                  key={yr}
                  onClick={() => {
                    setLocation(`/results/${yr}`);
                    setActiveFilter("All");
                  }}
                  className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                    year === yr ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  AY {yr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Left: Toppers Merit Board (Gold, Silver, Bronze) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-muted rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" /> Toppers Merit Board • AY {year}
                </h3>
                
                <div className="space-y-4">
                  {data.toppers.map((topper) => {
                    const initials = topper.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                    return (
                      <div 
                        key={topper.rank} 
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4.5 rounded-2xl border border-muted bg-muted/10 hover:border-accent/30 transition-all duration-300 gap-4"
                      >
                        <div className="flex items-center gap-4">
                          {/* Rank Medal Initials */}
                          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${getRankBadge(topper.rank)}`}>
                            {initials}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-0.5">
                              {getRankName(topper.rank)}
                            </span>
                            <h4 className="font-extrabold text-primary text-base leading-tight">
                              {topper.name}
                            </h4>
                            <span className="text-xs text-muted-foreground font-semibold">
                              {topper.degree}
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-primary/5 border border-primary/10 px-4 py-2 rounded-xl text-center self-stretch sm:self-auto flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Score</span>
                          <span className="text-sm font-black text-primary">{topper.score}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: Institutional Stats Summary Dashboard */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-gradient-to-br from-primary to-[#0c3149] text-white rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                  <Trophy className="w-48 h-48" strokeWidth={0.5} />
                </div>
                
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5" /> Performance Dashboard
                </h3>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl backdrop-blur-sm">
                    <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Pass Rate</span>
                    <span className="text-2xl font-black text-accent">{data.stats.passRate}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl backdrop-blur-sm">
                    <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Avg SGPA</span>
                    <span className="text-2xl font-black text-white">{data.stats.avgSgpa}</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4.5 rounded-2xl backdrop-blur-sm">
                    <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block mb-1">Graduated</span>
                    <span className="text-2xl font-black text-white">{data.stats.graduatedCount}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 text-xs text-white/70 flex gap-2 items-start leading-relaxed">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Verified by the University Examinations Cell. Highlights reflect combined values for D.Pharm, B.Pharm, and M.Pharm degrees.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Results Tables / Downloads */}
          <div className="space-y-6">
            
            {/* Filter and Title Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-muted pb-5">
              <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                <FileText className="w-5.5 h-5.5 text-accent" /> Examination Result Ledgers
              </h3>

              {/* Program Filters Switcher */}
              <div className="flex flex-wrap gap-2">
                {PROGRAM_FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`cursor-pointer px-4.5 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-primary border-primary text-white shadow-md"
                        : "bg-muted/50 border-muted text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {filter === "All" ? "All Programs" : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Table */}
            <div className="bg-white border border-muted rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
              <AnimatePresence mode="wait">
                {filteredDocs.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="bg-muted/40 text-muted-foreground font-bold border-b border-muted text-xs uppercase tracking-wider">
                          <th className="py-4 px-6">Program Type</th>
                          <th className="py-4 px-6">Result Ledger / Semester</th>
                          <th className="py-4 px-6">Declaration Date</th>
                          <th className="py-4 px-6">Pass Percentage</th>
                          <th className="py-4 px-6 text-right">Download</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-muted text-primary font-medium">
                        {filteredDocs.map((doc, idx) => (
                          <tr key={idx} className="hover:bg-muted/20 transition-colors group">
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-xs font-extrabold rounded-md border border-primary/10">
                                {doc.degree}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-sm text-primary font-bold group-hover:text-accent transition-colors">
                              {doc.name}
                            </td>
                            <td className="py-4 px-6 text-muted-foreground text-xs whitespace-nowrap">
                              {doc.date}
                            </td>
                            <td className="py-4 px-6 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 text-emerald-600 font-extrabold text-xs">
                                <CheckCircle className="w-3.5 h-3.5" /> {doc.passRate}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleDownload(doc.name)}
                                className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 bg-muted hover:bg-accent hover:text-white rounded-xl text-xs font-bold text-primary transition-all duration-300"
                              >
                                <DownloadCloud className="w-3.5 h-3.5" /> PDF ({doc.size})
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-16 text-center text-muted-foreground">
                    <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="font-semibold text-primary">No results found</p>
                    <p className="text-xs text-muted-foreground mt-0.5">No ledger records matched the selected degree filter.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* University verification link */}
            <div className="bg-muted/20 border border-muted/50 p-6 rounded-3xl flex flex-col md:flex-row gap-5 items-start md:items-center justify-between mt-8">
              <div className="space-y-1">
                <h4 className="text-sm font-extrabold text-primary flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-accent" /> DBATU University Examinations Portal
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">Students can verify individual marksheets, re-evaluations, and photo-copy applications directly on the university portal using their Permanent Registration Number (PRN).</p>
              </div>
              <a 
                href="https://dbatu.ac.in/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline shrink-0"
              >
                Visit DBATU Portal <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>
      </section>
    </AppLayout>
  );
}
