import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building,
  Calendar,
  CheckCircle,
  FileText,
  Handshake,
  Send,
  HelpCircle,
  Sparkles,
  ChevronRight,
  TrendingUp,
  MapPin,
  Search,
  UserCheck,
  Globe
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface MouItem {
  partner: string;
  location: string;
  signedDate: string;
  validity: string;
  signatory: string;
  category: "Pharma & R&D" | "Healthcare & Hospitals" | "Skills & Training" | "International Collaborations";
  scope: string[];
}

const MOUS_DATA: MouItem[] = [
  {
    partner: "Varma Pharmacy Pvt. Ltd.",
    location: "Hadapsar, Pune",
    signedDate: "12.09.2017",
    validity: "12.09.2017 - 11.09.2020",
    signatory: "Mr. Varma (Director)",
    category: "Pharma & R&D",
    scope: ["Industrial formulation testing", "Student laboratory visits & QA guidance", "Standard raw materials testing drills"]
  },
  {
    partner: "Generic Healthcare Pvt. Ltd.",
    location: "Shivajinagar, Pune",
    signedDate: "18.05.2023",
    validity: "18.05.2023 - 17.05.2026",
    signatory: "Mr. Deshmukh (Project Head)",
    category: "Pharma & R&D",
    scope: ["Export documentation mentoring", "QC instrumental analysis training", "QA auditing processes awareness"]
  },
  {
    partner: "Vagmine Healthcare Pvt. Ltd.",
    location: "Talegaon Dabhade, Maval, Pune",
    signedDate: "01.09.2020",
    validity: "01.09.2020 - 30.08.2023",
    signatory: "Mr. Amarjit Dhalpe (Director)",
    category: "Pharma & R&D",
    scope: ["Local manufacturing setup exposure", "Industrial safety regulations compliance guidance", "Summer technical placements"]
  },
  {
    partner: "Sovarian Clinical Research",
    location: "Bibvewadi, Pune",
    signedDate: "01.09.2021",
    validity: "01.09.2021 - 30.08.2024",
    signatory: "Mrs. Hemlata Chavan (Director)",
    category: "Pharma & R&D",
    scope: ["Clinical data management courses", "Bio-safety standards and regulatory compliance documentation", "Pharmacovigilance workshops"]
  },
  {
    partner: "Inventia Healthcare",
    location: "B T Kawade Road, Pune",
    signedDate: "01.09.2021",
    validity: "01.09.2021 - 30.08.2024",
    signatory: "Dr. Seema Kawade (Director)",
    category: "Pharma & R&D",
    scope: ["Novel drug delivery systems (NDDS) training", "Patents and intellectual property rights basics", "Pilot-scale formulation trials"]
  },
  {
    partner: "Ingenious Healthcare",
    location: "Hadapsar, Pune",
    signedDate: "01.09.2021",
    validity: "01.09.2021 - 30.08.2024",
    signatory: "Ms. Parnavi Salve (Director)",
    category: "Pharma & R&D",
    scope: ["Drug safety monitoring guidelines", "Medical coding seminars", "Clinical trials report validation"]
  },
  {
    partner: "Evonext Healthcare Pvt. Ltd.",
    location: "Ambegaon Pathar, Haveli, Pune",
    signedDate: "30.03.2022",
    validity: "Active (Forever till discontinued)",
    signatory: "Mr. Shivam R. Banarase (M.D.) & Mr. Ganesh B. Pete (Co-founder)",
    category: "Pharma & R&D",
    scope: ["Joint drug development programs", "R&D scale validation modules", "Direct recruitment pipeline"]
  },
  {
    partner: "Pawana Hospital",
    location: "Somatne Phata, Tal-Maval, Pune",
    signedDate: "01.10.2022",
    validity: "01.10.2022 - 30.09.2027",
    signatory: "Dr. Satyajit Wadhokar",
    category: "Healthcare & Hospitals",
    scope: ["Clinical pharmacy practices", "Hospital pharmacy management & storage", "Pharmacy practice workshops for students"]
  },
  {
    partner: "Talegaon General Hospital",
    location: "Talegaon Dabhade, Maval, Pune",
    signedDate: "17.09.2022",
    validity: "17.09.2022 - 16.09.2027",
    signatory: "Hon. Shri. Shailesh K. Shah",
    category: "Healthcare & Hospitals",
    scope: ["Practical hospital rotations", "Patient counseling protocols", "Dispensing audit practices"]
  },
  {
    partner: "Skill Academy by Testbook",
    location: "Online Portal",
    signedDate: "07.10.2022",
    validity: "07.10.2022 - 06.10.2023",
    signatory: "Mr. Ashutosh Kumar",
    category: "Skills & Training",
    scope: ["Quantitative aptitude drills", "Logical reasoning preparation for MNCs", "General IT skills certifications"]
  },
  {
    partner: "Prado Preclinical Research & Development Org Pvt. Ltd.",
    location: "Urse, Pune",
    signedDate: "04.11.2022",
    validity: "Active (Forever till discontinued)",
    signatory: "Dr. Wangikar",
    category: "Pharma & R&D",
    scope: ["Preclinical toxicology studies exposure", "Animal handling protocols and ethics guidelines", "Joint bio-analytical research projects"]
  },
  {
    partner: "Rubicon Skill Development Pvt. Ltd.",
    location: "Pune",
    signedDate: "12.01.2023",
    validity: "12.01.2023 - 11.01.2024",
    signatory: "Mr. Pravir Kumar (CEO) & Ms. Dipika Patil (Asst. Manager)",
    category: "Skills & Training",
    scope: ["Soft skills and presentation techniques", "Corporate groomings & mock interviews", "Global career mentorship modules"]
  },
  {
    partner: "CSAS Programming Inc.",
    location: "Mumbai",
    signedDate: "30.01.2023",
    validity: "Active (Forever till discontinued)",
    signatory: "Mr. Rohankumar A. Borade",
    category: "Skills & Training",
    scope: ["Clinical SAS programming training", "Data management analytical tools", "Placement drives in Pharma IT"]
  },
  {
    partner: "Magic Bus India Pvt. Ltd.",
    location: "Pune",
    signedDate: "01.04.2023",
    validity: "Active (Forever till discontinued)",
    signatory: "Ms. Jyoti Waghchaure",
    category: "Skills & Training",
    scope: ["Employability training for rural students", "Workplace soft skills drills", "Mentorship programs"]
  },
  {
    partner: "Premium Serums and Vaccines Pvt. Ltd.",
    location: "Narayangaon, Pune",
    signedDate: "15.04.2023",
    validity: "Active (Forever till discontinued)",
    signatory: "Dr. Nitin Salvi",
    category: "Pharma & R&D",
    scope: ["Immunological products manufacturing tours", "Anti-sera validation processes", "Cold-chain logistical training"]
  },
  {
    partner: "Shri Swami Samarth Institute of Pharmacy",
    location: "Malvadi (Bota), Sangamner, Ahmednagar",
    signedDate: "04.11.2023",
    validity: "04.11.2023 - 03.11.2024",
    signatory: "Dr. Ramdas B. Rode",
    category: "Pharma & R&D",
    scope: ["Bilateral academic exchange programs", "Joint student research webinars", "Lab resource sharing validation"]
  },
  {
    partner: "Wp/Pili/Lakshapathiya Shikshadana Mahavidyalaya",
    location: "Moratuwa, Sri Lanka",
    signedDate: "21.12.2023",
    validity: "21.12.2023 - 20.12.2026",
    signatory: "Mrs. Gunawardhana",
    category: "International Collaborations",
    scope: ["Cross-border pharmacy academic sharing", "Joint webinars on global clinical guidelines", "Cultural and educational exchanges"]
  },
  {
    partner: "Lions Club of Colombo Elvitigala",
    location: "Colombo, District 306C2, Sri Lanka",
    signedDate: "21.12.2023",
    validity: "21.12.2023 - 20.12.2026",
    signatory: "Mr. Prabha Manjusri Dharmaratne",
    category: "International Collaborations",
    scope: ["Global healthcare extension campaigns", "Community health checkup models", "Sponsorship of medical relief drives"]
  },
  {
    partner: "MIMER Medical College & Dr. BSTR Hospital",
    location: "Talegaon Dabhade, Pune",
    signedDate: "25.01.2024",
    validity: "25.01.2024 - 24.01.2025",
    signatory: "Mrs. Sandhya Kulkarni (Principal)",
    category: "Healthcare & Hospitals",
    scope: ["Clinical laboratory observations", "Inter-professional healthcare research rounds", "Access to medical reference journals"]
  },
  {
    partner: "St. Joseph's Secondary School",
    location: "Biratnagar, Nepal",
    signedDate: "01.04.2024",
    validity: "01.04.2024 - 31.03.2027",
    signatory: "Mr. Aman Sitoula (Managing Director)",
    category: "International Collaborations",
    scope: ["Basic health sciences mentorship", "Cross-border educational guidelines counseling", "Student academic webinars"]
  },
  {
    partner: "Kathmandu International School",
    location: "Kathmandu, Nepal",
    signedDate: "29.04.2024",
    validity: "29.04.2024 - 28.04.2027",
    signatory: "Mr. Pratik Kaiki (Chief Administrator)",
    category: "International Collaborations",
    scope: ["Student health awareness projects", "Scientific poster exchanges", "Joint educational symposiums"]
  },
  {
    partner: "Human Harmony Nepal",
    location: "Kathmandu, Nepal",
    signedDate: "01.04.2024",
    validity: "01.04.2024 - 31.03.2027",
    signatory: "Namita Ghimire (CEO)",
    category: "International Collaborations",
    scope: ["Holistic health and community medicine", "Sponsorship of social health projects", "Bilateral counseling sessions"]
  }
];

export default function PlacementsMOUs() {
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"All" | "Pharma & R&D" | "Healthcare & Hospitals" | "Skills & Training" | "International Collaborations">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Proposal Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [proposalScope, setProposalScope] = useState("Research Collaboration");
  const [proposalDetails, setProposalDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isFormValid = useMemo(() => {
    return companyName.trim().length > 2 && contactPerson.trim().length > 2 && email.trim().includes("@") && proposalDetails.trim().length > 5;
  }, [companyName, contactPerson, email, proposalDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
    toast({
      title: "MOU Proposal Logged",
      description: `Thank you ${contactPerson} from ${companyName}. Mr. Shyam S. Awate will reach out to schedule a preliminary meeting.`,
    });
  };

  const handleReset = () => {
    setCompanyName("");
    setContactPerson("");
    setEmail("");
    setProposalScope("Research Collaboration");
    setProposalDetails("");
    setSubmitted(false);
  };

  const filteredMous = useMemo(() => {
    return MOUS_DATA.filter(mou => {
      const matchesSearch = 
        mou.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mou.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mou.signatory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || mou.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <Handshake className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Industrial <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">MOUs</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Strengthening academic foundations through bilateral agreements, industrial research projects, and active recruitment corridors.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Sticky Ribbon */}
      <section className="py-5 bg-background border-b border-border sticky top-0 z-40 shadow-xs">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex bg-muted/60 p-1.5 rounded-2xl border border-muted shadow-2xs gap-1.5 overflow-x-auto no-scrollbar max-w-full justify-start md:justify-center">
            {([
              "All", 
              "Pharma & R&D", 
              "Healthcare & Hospitals", 
              "Skills & Training", 
              "International Collaborations"
            ] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`cursor-pointer px-4.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xs" 
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {cat === "All" ? `All Collaborations (${MOUS_DATA.length})` : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search agreements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 h-11 rounded-xl border border-muted bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent text-primary placeholder:text-muted-foreground/45 shadow-2xs"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-muted-foreground/45" />
          </div>
        </div>
      </section>

      {/* Main MOUs listing */}
      <section className="py-16 bg-muted/10 min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* List of MOUs */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
                  <Handshake className="w-6 h-6 text-accent" /> Active Memorandums of Understanding
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Explore signed agreements outlining academic partnerships, research projects, and student training corridors.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredMous.map((mou, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white border border-muted p-5.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start gap-2">
                          <div className={`p-2.5 rounded-xl text-white ${
                            mou.category === "International Collaborations" ? "bg-accent/90" : "bg-primary/95"
                          }`}>
                            {mou.category === "International Collaborations" ? (
                              <Globe className="w-5 h-5" />
                            ) : (
                              <Building className="w-5 h-5" />
                            )}
                          </div>
                          <span className="inline-flex px-2 py-0.5 bg-muted text-[9px] text-primary font-bold rounded border border-muted-border shrink-0 uppercase tracking-wider">
                            {mou.category}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-sm font-extrabold text-primary leading-snug tracking-tight">{mou.partner}</h3>
                          <p className="text-[10px] text-muted-foreground font-semibold mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-accent shrink-0" /> {mou.location}
                          </p>
                        </div>

                        <div className="border-t border-muted/50 pt-3 space-y-2 text-[11px] text-muted-foreground">
                          <div className="flex gap-1.5 items-start">
                            <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span><strong>Signatory:</strong> {mou.signatory}</span>
                          </div>
                          <div className="flex gap-1.5 items-start">
                            <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                            <span><strong>Duration:</strong> {mou.validity}</span>
                          </div>
                        </div>

                        {mou.scope && mou.scope.length > 0 && (
                          <div className="bg-muted/30 p-3 rounded-lg border border-muted/30 text-[10px] text-muted-foreground space-y-1">
                            <span className="font-bold text-primary block">Scope of Partnership:</span>
                            {mou.scope.map((item, sIdx) => (
                              <div key={sIdx} className="flex gap-1">
                                <span className="text-accent shrink-0">•</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {filteredMous.length === 0 && (
                  <div className="col-span-2 text-center py-16 bg-white border border-muted rounded-3xl text-muted-foreground text-sm font-medium">
                    No agreements found matching your search.
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar proposal form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <FileText className="w-5 h-5 text-accent" /> Corporate Partnership Portal
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Is your pharmaceutical company or clinic looking to sign an academic MOU? Submit a proposal below.</p>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Company / Lab Name</label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Pfizer Global Labs"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Contact Person Designation</label>
                      <input
                        type="text"
                        required
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        placeholder="e.g. Dr. Ramesh More (HR Director)"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Corporate Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. ramesh.more@pfizer.com"
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Proposed MOU Scope</label>
                      <select
                        value={proposalScope}
                        onChange={(e) => setProposalScope(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      >
                        <option value="Research Collaboration">Joint Research & Analytics</option>
                        <option value="Student Internships">Summer Internships & Training</option>
                        <option value="Campus Drives">On-Campus Recruitment drives</option>
                        <option value="Equipment Usage">Laboratory Support & Calibration</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Brief Collaboration Details</label>
                      <textarea
                        required
                        rows={4}
                        value={proposalDetails}
                        onChange={(e) => setProposalDetails(e.target.value)}
                        placeholder="Outline details regarding training programs, guest speaker exchanges, or clinical rotations..."
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Submit MOU Proposal
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-4 text-xs">
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-primary">Proposal Logged Successfully</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                        Your partnership proposal has been dispatched. Mr. Shyam S. Awate (TPO Desk) will contact you shortly at <span className="font-bold text-primary">{email}</span>.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="cursor-pointer px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      Submit Another Proposal
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
