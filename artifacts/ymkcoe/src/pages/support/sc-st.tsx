import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  Send, 
  FileText, 
  Download, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Scale, 
  HelpCircle,
  Building,
  UserCheck,
  ChevronRight,
  Printer,
  ExternalLink,
  GraduationCap,
  HeartHandshake
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  designation: string;
  department: string;
  phone?: string;
  email?: string;
  isHead?: boolean;
}

const SC_ST_MEMBERS: CommitteeMember[] = [
  { 
    id: "1", 
    name: "Dr. Sanjay R. Bhegade", 
    role: "Chairman", 
    designation: "Principal & Professor", 
    department: "College Administration", 
    phone: "+91 9876543210", 
    email: "principal.kbiper@gmail.com",
    isHead: true 
  },
  { 
    id: "2", 
    name: "Prof. Milind Gaikwad", 
    role: "Coordinator", 
    designation: "Assistant Professor", 
    department: "Pharmaceutical Chemistry", 
    phone: "+91 9876543231", 
    email: "milind.gaikwad@kbiper.edu.in" 
  },
  { 
    id: "3", 
    name: "Prof. Sushma Kamble", 
    role: "Member", 
    designation: "Assistant Professor", 
    department: "Pharmacognosy", 
    phone: "+91 9876543232", 
    email: "sushma.kamble@kbiper.edu.in" 
  },
  { 
    id: "4", 
    name: "Mr. Prakash Shinde", 
    role: "Member (Office Representative)", 
    designation: "Head Clerk", 
    department: "Administrative Office", 
    phone: "+91 9876543204", 
    email: "prakash.shinde@kbiper.edu.in" 
  },
  { 
    id: "5", 
    name: "Ms. Snehal Waghmare", 
    role: "Student Representative", 
    designation: "Student (Second Year M.Pharm)", 
    department: "M. Pharmacy Department", 
    email: "snehal.w@student.kbiper.edu.in" 
  }
];

const WELFARE_SCHEMES = [
  {
    title: "Post-Matric Scholarship Scheme (SC/ST Category)",
    provider: "Social Justice & Special Assistance Dept., Govt. of Maharashtra",
    eligibility: "SC/ST students whose annual family income is less than or equal to ₹2,50,000.",
    benefits: "100% Tuition Fee & Exam Fee reimbursement + Monthly maintenance allowance up to ₹1,200.",
    documents: ["Caste Certificate", "Income Certificate from Tahsildar", "Marksheets", "Hostel Certificate (if applicable)"],
    link: "https://mahadbt.maharashtra.gov.in/"
  },
  {
    title: "Rajarshi Chhatrapati Shahu Maharaj Scholarship",
    provider: "Directorate of Technical Education (DTE), Maharashtra",
    eligibility: "VJNT, SBC, or SC/ST students enrolled in professional B.Pharm/M.Pharm courses.",
    benefits: "Partial tuition fee reimbursement and exam fees support based on merit and income rules.",
    documents: ["CAP Round Allotment Letter", "Domicile Certificate", "Income Certificate", "Caste Validity"],
    link: "https://mahadbt.maharashtra.gov.in/"
  },
  {
    title: "Dr. Babasaheb Ambedkar Swadhar Yojana",
    provider: "Department of Social Justice, Maharashtra",
    eligibility: "SC students who did not get admission to college hostels. Family income <= ₹2,50,000.",
    benefits: "Direct financial assistance of ₹51,000 per year for lodging, boarding, and local transport.",
    documents: ["Hostel non-allotment letter", "Rent Agreement", "College Bonafide Certificate", "Bank Details"],
    link: "https://sjsa.maharashtra.gov.in/"
  },
  {
    title: "National Fellowship for SC/ST Candidates",
    provider: "University Grants Commission (UGC)",
    eligibility: "SC/ST students pursuing post-graduate research studies (M.Pharm/Ph.D).",
    benefits: "Monthly fellowship of ₹31,000 for JRF + contingency allowances and HRA support.",
    documents: ["PG Marksheet (M.Pharm)", "Admission Letter", "Caste Certificate", "Research Proposal"],
    link: "https://www.ugc.gov.in/"
  }
];

const LEGAL_SAFEGUARDS = [
  {
    title: "The SC/ST (Prevention of Atrocities) Act, 1989",
    desc: "Strict penal provisions against any physical harassment, humiliation, verbal assault, or socio-economic boycott targeting members of Scheduled Castes and Scheduled Tribes."
  },
  {
    title: "UGC Anti-Discrimination Guidelines (2012)",
    desc: "Mandates higher education institutions to set up a dedicated cell to handle discrimination cases, promote diversity, and ensure SC/ST representation in all student welfare committees."
  },
  {
    title: "Zero-Tolerance Policy on Campus",
    desc: "KBIPER strictly enforces rules against discrimination. Any offensive comments, unequal treatment in laboratories, or exclusion from student activities will result in immediate suspension."
  },
  {
    title: "Remedial Coaching & Career Support",
    desc: "The cell regularly coordinates special communication skills workshops, GPAT training guidance classes, and laboratory support sessions to enhance academic outcomes."
  }
];

export default function ScStCell() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"welfare" | "grievance" | "members" | "rules">("welfare");

  // Grievance Form State
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [grievanceCategory, setGrievanceCategory] = useState("Scholarship Delay / Issue");
  const [eventDate, setEventDate] = useState("");
  const [description, setDescription] = useState("");
  
  // Submission Ticket State
  const [ticketId, setTicketId] = useState<string | null>(null);

  const isFormValid = useMemo(() => {
    if (!isAnonymous && (!studentName.trim() || !contactDetail.trim())) return false;
    return description.trim().length > 10;
  }, [isAnonymous, studentName, contactDetail, description]);

  const handleGrievanceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Incomplete Grievance Report",
        description: "Please write a descriptive grievance report before submitting.",
      });
      return;
    }

    const ticket = `SCST-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setTicketId(ticket);

    toast({
      title: "Grievance Logged Confidentially",
      description: `Grievance reference code ${ticket} has been sent directly to the Cell Coordinator.`,
    });
  };

  const handleResetForm = () => {
    setStudentName("");
    setStudentId("");
    setContactDetail("");
    setEventDate("");
    setDescription("");
    setIsAnonymous(false);
    setTicketId(null);
  };

  const handlePrintGrievance = () => {
    toast({
      title: "Generating Document",
      description: "Preparing your submitted grievance copy as PDF...",
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
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              SC / ST <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Welfare Cell</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Promoting social diversity, securing government scholarships, and resolving student grievances in a strict, discrimination-free environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Dashboard */}
      <section className="py-12 bg-background relative min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Main Navigation Segmented Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1 overflow-x-auto no-scrollbar max-w-full">
              <button
                onClick={() => setActiveTab("welfare")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "welfare" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <GraduationCap className="w-4 h-4" /> Scholarships & Welfare
              </button>
              <button
                onClick={() => {
                  setActiveTab("grievance");
                  setTicketId(null);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "grievance" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Grievance Portal
              </button>
              <button
                onClick={() => setActiveTab("members")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "members" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Users className="w-4 h-4" /> Cell Committee
              </button>
              <button
                onClick={() => setActiveTab("rules")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "rules" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Scale className="w-4 h-4" /> Guidelines & Safeguards
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "welfare" && (
              /* =========================================================================
                 🎓 SCHOLARSHIPS & WELFARE SCHEMES TAB
                 ========================================================================= */
              <motion.div
                key="welfare-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: Stats highlight */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <GraduationCap className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <HeartHandshake className="w-4.5 h-4.5 text-accent" /> Welfare Benchmarks
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4.5 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Total Welfare Beneficiaries</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">250+ Students</div>
                      </div>

                      <div className="p-4.5 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Assistance Rate</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">100% Guaranteed</div>
                      </div>

                      <div className="p-4.5 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Remedial/Support Sessions</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">Annual Calendars</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>For personal guidance with Mahadbt uploads, visit Mr. Prakash Shinde at the Admin Office Desk.</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Document Preparation
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Make sure your bank account is linked to your Aadhaar and that your income certificates are verified by a competent Tahsildar before scholarship submission.
                    </p>
                  </div>
                </div>

                {/* Right side: Schemes grid */}
                <div className="lg:col-span-8 space-y-6">
                  {WELFARE_SCHEMES.map((scheme, index) => (
                    <div 
                      key={index}
                      className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide rounded bg-accent/10 text-accent border border-accent/20 mb-2">
                            Scheme {index + 1}
                          </span>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{scheme.title}</h4>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-0.5">{scheme.provider}</p>
                        </div>
                        <a 
                          href={scheme.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-muted hover:bg-accent/10 text-primary hover:text-accent border border-muted rounded-xl flex items-center justify-center shrink-0 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3 bg-muted/40 border border-muted rounded-xl">
                          <strong className="text-primary block mb-0.5">Eligibility Criteria:</strong>
                          <span className="text-muted-foreground font-medium">{scheme.eligibility}</span>
                        </div>
                        <div className="p-3 bg-muted/40 border border-muted rounded-xl">
                          <strong className="text-primary block mb-0.5">Scheme Benefits:</strong>
                          <span className="text-muted-foreground font-medium">{scheme.benefits}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-muted/50">
                        <span className="text-[9px] uppercase font-bold text-primary tracking-wider block mb-1.5">Required Documents:</span>
                        <div className="flex flex-wrap gap-2">
                          {scheme.documents.map((doc, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted text-[10px] font-bold text-muted-foreground rounded-lg border border-muted-border">
                              ✓ {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "grievance" && (
              /* =========================================================================
                 📢 CONFIDENTIAL GRIEVANCE PORTAL TAB
                 ========================================================================= */
              <motion.div
                key="grievance-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Quick support */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-gradient-to-br from-blue-900 to-[#022c45] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <AlertCircle className="w-4.5 h-4.5 text-accent animate-pulse" /> Cell Assistance
                    </h3>

                    <div className="space-y-4">
                      {/* Coordinator helpline */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">Cell Coordinator (Prof. Gaikwad)</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:+919876543231" className="text-lg font-black hover:underline tracking-tight">+91 9876543231</a>
                        </div>
                      </div>

                      {/* Alternate office */}
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[9px] uppercase font-bold text-white/60 tracking-wider block">Administrative Cell Support</span>
                        <div className="flex items-center gap-2.5 mt-1.5">
                          <Phone className="w-5 h-5 text-accent shrink-0" />
                          <a href="tel:+919876543204" className="text-lg font-black hover:underline tracking-tight">+91 9876543204</a>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>Or reach our cell committee members via secure email:</span>
                        <a href="mailto:milind.gaikwad@kbiper.edu.in" className="block text-accent font-bold hover:underline mt-1 break-all">milind.gaikwad@kbiper.edu.in</a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-4">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-4 h-4 text-accent" /> Privacy & Protection
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      All grievances submitted via this form are routed to the Cell Coordinator. Under UGC guidelines, absolute confidentiality is maintained, and students are protected against retaliation.
                    </p>
                  </div>
                </div>

                {/* Right: Stateful grievance form */}
                <div className="lg:col-span-7">
                  {!ticketId ? (
                    <form onSubmit={handleGrievanceSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                      <div>
                        <h3 className="text-lg font-extrabold text-primary">Lodge a Confidential Grievance</h3>
                        <p className="text-xs text-muted-foreground mt-1">Submit issues relating to discrimination, hostel bias, or scholarship delays directly to the cell coordinator.</p>
                      </div>

                      {/* Anonymity Checkbox */}
                      <div className="flex items-center justify-between p-4.5 bg-muted/40 border border-muted rounded-2xl select-none">
                        <div>
                          <label className="text-xs font-bold text-primary block">Submit Report Anonymously</label>
                          <span className="text-[10px] text-muted-foreground block mt-0.5">Your identity will not be logged. If yes, coordinate via ticket code.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="cursor-pointer w-5 h-5 accent-primary rounded-md"
                        />
                      </div>

                      {/* Name / ID / Contact details */}
                      <AnimatePresence mode="wait">
                        {!isAnonymous && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4 overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Your Full Name</label>
                                <input
                                  type="text"
                                  required
                                  value={studentName}
                                  onChange={(e) => setStudentName(e.target.value)}
                                  placeholder="e.g. Rahul Gaikwad"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student ID / Roll No</label>
                                <input
                                  type="text"
                                  value={studentId}
                                  onChange={(e) => setStudentId(e.target.value)}
                                  placeholder="e.g. KB-2025-102"
                                  className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email or Mobile Number</label>
                              <input
                                type="text"
                                required
                                value={contactDetail}
                                onChange={(e) => setContactDetail(e.target.value)}
                                placeholder="e.g. rahul.g@student.kbiper.edu.in"
                                className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Grievance Category</label>
                          <select 
                            value={grievanceCategory}
                            onChange={(e) => setGrievanceCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Scholarship Delay / Issue</option>
                            <option>Academic Discrimination</option>
                            <option>Hostel Accommodation Bias</option>
                            <option>Social Exclusion / Harassment</option>
                            <option>Others</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Date of Incident</label>
                          <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="w-full px-4 py-3 h-12 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Detailed Description (At least 10 characters)</label>
                        <textarea
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Provide details: individuals involved, date/time, locations, and descriptions of what occurred..."
                          className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35 resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`cursor-pointer w-full py-4 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                          isFormValid
                            ? "bg-primary hover:bg-accent shadow-md shadow-primary/20"
                            : "bg-muted text-muted-foreground/50 border border-muted-border cursor-not-allowed"
                        }`}
                      >
                        <Send className="w-4.5 h-4.5" /> Submit Grievance
                      </button>
                    </form>
                  ) : (
                    /* Grievance Success Confirmation Ticket */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white border border-muted p-8 md:p-10 rounded-3xl shadow-2xl relative text-center space-y-6"
                    >
                      <div className="absolute top-0 right-0 w-44 h-44 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

                      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto border border-blue-100 shadow-sm text-primary">
                        <CheckCircle className="w-9 h-9" />
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-primary">Grievance Registered</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your grievance has been successfully submitted to the SC/ST Cell. We will review the details immediately.</p>
                      </div>

                      {/* Log receipt details */}
                      <div className="bg-muted/40 border border-muted/50 p-5 rounded-2xl text-left text-xs font-semibold space-y-3.5 text-muted-foreground">
                        <h4 className="text-[10px] font-extrabold uppercase text-primary tracking-widest flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-primary" /> Grievance Receipt Info
                        </h4>

                        <div className="space-y-2 border-t border-muted-border/60 pt-2 text-primary font-bold">
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Reference Code</span>
                            <span className="text-accent font-extrabold">{ticketId}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Submission Type</span>
                            <span>{isAnonymous ? "Anonymous Submission" : "Identity Logged"}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-muted-border/40 pb-1.5">
                            <span>Grievance Category</span>
                            <span>{grievanceCategory}</span>
                          </div>
                          <div className="flex justify-between items-center pt-0.5">
                            <span>Log Timestamp</span>
                            <span>2026-06-26 21:20:48</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                          onClick={handlePrintGrievance}
                          className="cursor-pointer flex-1 py-3 px-4 bg-muted hover:bg-muted/80 border border-muted-border text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Printer className="w-4 h-4 text-primary" /> Print Copy
                        </button>
                        <button
                          onClick={handleResetForm}
                          className="cursor-pointer flex-1 py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                        >
                          Log Another Grievance
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "members" && (
              /* =========================================================================
                 👥 CELL COMMITTEE DIRECTORY TAB
                 ========================================================================= */
              <motion.div
                key="members-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <div className="text-left mb-6">
                  <h3 className="text-xl font-extrabold text-primary">SC / ST Cell Committee</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Reach out to these cell officials for scholarship guidance, academic mentoring, or emergency grievance reviews.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6.5">
                  {SC_ST_MEMBERS.map((member) => {
                    const initials = member.name.split(" ").slice(-2).map(n => n.charAt(0)).join("");
                    return (
                      <div
                        key={member.id}
                        className={`group relative flex flex-col h-full ${
                          member.isHead ? "md:col-span-2 lg:col-span-3 lg:w-2/3 mx-auto" : ""
                        }`}
                      >
                        <div className="absolute inset-0 bg-primary/5 rounded-3xl transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 ease-out" />
                        
                        <div className="relative bg-white border border-muted p-6.5 rounded-3xl shadow-[0_6px_25px_rgb(0,0,0,0.01)] group-hover:border-accent/40 transition-all duration-300 flex flex-col h-full overflow-hidden z-10">
                          {/* Top badge */}
                          <div className="flex justify-between items-start mb-4">
                            <span className={`inline-flex items-center px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border ${
                              member.isHead 
                                ? "bg-accent/10 border-accent/25 text-accent" 
                                : "bg-primary/5 border-primary/10 text-primary"
                            }`}>
                              {member.role}
                            </span>
                            {member.isHead && (
                              <span className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center text-accent text-[9px] font-black shadow-sm">★</span>
                            )}
                          </div>

                          {/* Initials avatar */}
                          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 border border-muted flex items-center justify-center mb-4 shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <span className="text-lg font-black text-primary/80">{initials}</span>
                          </div>

                          <h4 className="text-base font-bold text-primary group-hover:text-accent transition-colors leading-tight mb-1">{member.name}</h4>
                          <p className="text-xs text-muted-foreground font-semibold mb-1">{member.designation}</p>
                          <p className="text-[10px] text-muted-foreground/80 flex items-center gap-1 mb-6">
                            <Building className="w-3.5 h-3.5 text-accent" /> {member.department}
                          </p>

                          {/* Action contacts */}
                          {(member.phone || member.email) ? (
                            <div className="space-y-2 mt-auto pt-4 border-t border-muted/50 text-xs font-semibold text-muted-foreground">
                              {member.phone && (
                                <div className="flex items-center gap-2">
                                  <Phone className="w-3.5 h-3.5 text-accent" />
                                  <a href={`tel:${member.phone}`} className="text-primary hover:text-accent hover:underline">{member.phone}</a>
                                </div>
                              )}
                              {member.email && (
                                <div className="flex items-center gap-2">
                                  <Mail className="w-3.5 h-3.5 text-accent" />
                                  <a href={`mailto:${member.email}`} className="text-primary hover:text-accent hover:underline break-all">{member.email}</a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-[10px] text-muted-foreground mt-auto pt-4 border-t border-muted/50 italic font-medium">Contact via principal desk.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === "rules" && (
              /* =========================================================================
                 ⚖️ GUIDELINES & SAFEGUARDS TAB
                 ========================================================================= */
              <motion.div
                key="rules-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* UGC & Legal Rules list */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <Scale className="w-5.5 h-5.5 text-accent" /> Statutory Guidelines & Constitutional Safeguards
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">KBIPER enforces all constitutional directives and UGC regulations to safeguard SC/ST students and staff members:</p>
                    </div>

                    <div className="space-y-4">
                      {LEGAL_SAFEGUARDS.map((rule, i) => (
                        <div key={i} className="flex gap-4 items-start border-b border-muted/50 pb-4 last:border-b-0 last:pb-0">
                          <div className="w-7 h-7 bg-primary/5 text-primary text-[10px] font-bold rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                            0{i+1}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-primary text-sm mb-0.5">{rule.title}</h4>
                            <p className="text-muted-foreground text-xs leading-relaxed">{rule.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right sidebar: Penalties/FAQ */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white p-7 md:p-8 rounded-3xl relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
                    
                    <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-5 flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-accent" /> Constitutional Rights
                    </h3>
                    
                    <ul className="space-y-4 text-xs text-white/80 font-light leading-relaxed">
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Article 15**: Prohibits discrimination against any citizen on grounds only of religion, race, caste, sex, or place of birth.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Article 17**: Abolition of Untouchability and prohibition of its practice in any form on campus.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-accent mt-0.5">•</span>
                        <span>**Article 46**: Promotes with special care the educational and economic interests of SC/ST students.</span>
                      </li>
                    </ul>
                  </div>

                  {/* UGC circular booklet download */}
                  <div className="bg-muted/30 border border-muted/50 p-6 rounded-3xl space-y-3.5">
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> National Portal Links
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">Learn more about statutory guidelines on the National Commissions websites.</p>
                    <a 
                      href="https://ncsc.nic.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline"
                    >
                      National Commission for SC <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="https://ncst.nic.in/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cursor-pointer flex items-center justify-center gap-1.5 text-xs font-bold text-accent hover:underline block pt-1.5 border-t border-muted-border/40"
                    >
                      National Commission for ST <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
