import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,
  Building,
  Briefcase,
  Users,
  Award,
  Send,
  Sparkles,
  ChevronRight,
  Upload,
  User,
  CheckCircle,
  TrendingUp,
  Heart
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface Recruiter {
  name: string;
  category: "R&D & Formulation" | "Quality Control" | "Marketing" | "Clinical Research";
  hiresCount: number;
  packageRange: string;
  testimonial: string;
  hrName: string;
}

const RECRUITERS_DATA: Recruiter[] = [
  {
    name: "Lupin Research Park",
    category: "R&D & Formulation",
    hiresCount: 35,
    packageRange: "3.6 - 6.5 LPA",
    testimonial: "KBIPER graduates show strong pilot formulation values, logical reasoning capabilities, and solid lab ethics.",
    hrName: "Dr. Sunil Patil (Head HR)"
  },
  {
    name: "Cipla Limited",
    category: "Quality Control",
    hiresCount: 42,
    packageRange: "3.2 - 5.8 LPA",
    testimonial: "The analytical calibration expertise shown by final year B.Pharm students during audits is truly commendable.",
    hrName: "Mr. Satish Shinde (QC Director)"
  },
  {
    name: "Sun Pharmaceutical Industries",
    category: "R&D & Formulation",
    hiresCount: 28,
    packageRange: "3.8 - 6.2 LPA",
    testimonial: "Highly impressed by the research mindset and regulatory USFDA compliance understandings of M.Pharm candidates.",
    hrName: "Mrs. Anjali Joshi (Senior Recruiter)"
  },
  {
    name: "Pfizer Global Supply",
    category: "Clinical Research",
    hiresCount: 15,
    packageRange: "4.2 - 7.5 LPA",
    testimonial: "KBIPER candidates demonstrate absolute proficiency in pharmacovigilance safety coding and clinical data logging.",
    hrName: "Mr. Ramesh More (Clinical HR)"
  },
  {
    name: "Abbott Healthcare",
    category: "Marketing",
    hiresCount: 24,
    packageRange: "3.0 - 5.5 LPA",
    testimonial: "Energetic graduates displaying outstanding pharmaceutical verbal skills, confidence, and brand knowledge.",
    hrName: "Mr. Vivek Deshmukh (Marketing Lead)"
  },
  {
    name: "Dr. Reddy's Laboratories",
    category: "Quality Control",
    hiresCount: 18,
    packageRange: "3.5 - 6.0 LPA",
    testimonial: "Strong alignment with good manufacturing laboratory validations (GMP) and cleanroom protocols.",
    hrName: "Dr. R. K. Nair (Recruitment Panel)"
  }
];

export default function PlacementsRecruiters() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | "R&D & Formulation" | "Quality Control" | "Marketing" | "Clinical Research">("All");
  
  // Resume form state
  const [studentName, setStudentName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [preferredRole, setPreferredRole] = useState("Formulation / R&D");
  const [resumeName, setResumeName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredRecruiters = useMemo(() => {
    return RECRUITERS_DATA.filter(rec => {
      const matchesSearch = rec.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || rec.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a resume smaller than 2MB.",
          variant: "destructive"
        });
        return;
      }
      setResumeName(file.name);
      toast({
        title: "Resume Selected",
        description: `Successfully loaded "${file.name}" for upload.`,
      });
    }
  };

  const isFormValid = useMemo(() => {
    return studentName.trim().length > 2 && rollNo.trim().length > 3 && email.trim().includes("@") && resumeName !== "";
  }, [studentName, rollNo, email, resumeName]);

  const handleResumeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsSubmitted(true);
    toast({
      title: "Profile Dispatched",
      description: `Dear ${studentName}, your resume has been indexed under "${preferredRole}" for upcoming campus placement drives.`,
    });
  };

  const handleResetForm = () => {
    setStudentName("");
    setRollNo("");
    setEmail("");
    setPreferredRole("Formulation / R&D");
    setResumeName("");
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
              <Building className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Recruiters</span> & Partners
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Proud alliances with top multinational pharmaceutical companies, clinical research centers, and global formulation labs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Database Search & List */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Recruiters List */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                
                {/* Search */}
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search recruitment partners..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-muted bg-white text-xs focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                {/* Filter Selector */}
                <div className="flex bg-muted p-1 rounded-xl border border-muted gap-1 overflow-x-auto no-scrollbar max-w-full">
                  {(["All", "R&D & Formulation", "Quality Control", "Marketing", "Clinical Research"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`cursor-pointer px-3.5 py-2 rounded-lg text-[10px] font-bold transition-all duration-200 whitespace-nowrap ${
                        activeCategory === cat ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {cat === "All" ? "All Sectors" : cat.split(" & ").pop()}
                    </button>
                  ))}
                </div>

              </div>

              {/* Recruiter cards grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="wait">
                  {filteredRecruiters.map((rec, idx) => (
                    <motion.div
                      key={rec.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25, delay: idx * 0.03 }}
                      className="bg-white border border-muted p-5.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-extrabold text-primary leading-tight">{rec.name}</h3>
                            <span className="text-[9px] uppercase font-bold text-accent tracking-wide block mt-0.5">{rec.category}</span>
                          </div>
                          <span className="text-[10px] bg-primary/5 text-primary px-2 py-0.5 rounded font-semibold border border-primary/10 shrink-0">
                            {rec.packageRange}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground italic leading-relaxed bg-muted/20 p-3 rounded-xl border border-muted/30">
                          "{rec.testimonial}"
                        </p>
                      </div>

                      <div className="pt-3 mt-4 border-t border-muted/50 flex justify-between items-center text-[9px] text-muted-foreground">
                        <span className="font-semibold text-primary">{rec.hrName}</span>
                        <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold border border-emerald-100 flex items-center gap-1 shrink-0">
                          <TrendingUp className="w-3 h-3" /> {rec.hiresCount}+ Hired
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredRecruiters.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-muted-foreground bg-white border border-muted border-dashed rounded-2xl">
                    No recruiters found matching the criteria.
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Resume Submission form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <Briefcase className="w-5 h-5 text-accent" /> Student Resume submission
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Submit your latest formatted resume to register for upcoming corporate recruitment rounds.</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleResumeSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student Full Name</label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="e.g. Amit K. Gade"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Roll Number / Class ID</label>
                      <input
                        type="text"
                        required
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="e.g. KB-2024-055"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. amit.gade@student.org"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Preferred Job Function</label>
                      <select
                        value={preferredRole}
                        onChange={(e) => setPreferredRole(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      >
                        <option value="Formulation / R&D">Formulation / R&D Division</option>
                        <option value="Quality Control / QA">Quality Control / QA Lab</option>
                        <option value="Regulatory Affairs">Regulatory Compliance & Auditing</option>
                        <option value="Product Marketing">PMT / Medical Sales</option>
                        <option value="Pharmacovigilance">Pharmacovigilance & Data Operations</option>
                      </select>
                    </div>
                    
                    {/* Simulated File Upload */}
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Upload Resume (PDF, Max 2MB)</label>
                      <div className="relative border border-dashed border-muted hover:border-accent/40 rounded-xl p-4 transition-colors text-center bg-muted/10">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="space-y-1.5 text-muted-foreground">
                          <Upload className="w-6 h-6 text-accent mx-auto" />
                          <div className="text-[11px] leading-normal">
                            {resumeName ? (
                              <span className="font-extrabold text-primary block truncate">{resumeName}</span>
                            ) : (
                              <span>Click or drag file to upload</span>
                            )}
                          </div>
                          <span className="text-[9px] text-muted-foreground/50 block">Only PDF or DOCX formats</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Submit Profile
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary">Profile Indexed</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        Your CV has been successfully uploaded and categorized under <span className="font-bold text-primary">{preferredRole}</span>. We will alert you on scheduled dates.
                      </p>
                    </div>
                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      Upload New CV
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </AppLayout>
  );
}
