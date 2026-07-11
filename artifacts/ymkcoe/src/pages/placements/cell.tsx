import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Users,
  ShieldAlert,
  HelpCircle,
  Mail,
  User,
  GraduationCap,
  Scale,
  CheckCircle,
  Building,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Coordinator {
  name: string;
  role: string;
  deptOrClass: string;
  email: string;
  type: "Faculty" | "Student";
}

const COORDINATORS: Coordinator[] = [
  {
    name: "Mr. Shyam S. Awate",
    role: "Dean Training & Placement & III ED Cell",
    deptOrClass: "T&P Cell Head",
    email: "placement.iiper@gmail.com",
    type: "Faculty"
  },
  {
    name: "Ms. Vilasini Pandav",
    role: "Assistant Professor & Faculty Coordinator",
    deptOrClass: "Pharmacology & Placement",
    email: "vilasini.pandav@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Ms. Mugdha A. Joshi",
    role: "Assistant Professor & Alumni Coordinator",
    deptOrClass: "Pharmacognosy & Alumni relations",
    email: "mugdha.joshi@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Prof. Shraddha S. Satkar",
    role: "Assistant Professor & Faculty Coordinator",
    deptOrClass: "Pharmaceutical Chemistry",
    email: "shraddha.satkar@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Prof. Amol S. Deshmukh",
    role: "Assistant Professor & Faculty Coordinator",
    deptOrClass: "Pharmaceutics & Analysis",
    email: "amol.deshmukh@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Mr. Mayur Lohkare",
    role: "Assistant Professor & Faculty Coordinator",
    deptOrClass: "Pharma Practices & Skills",
    email: "mayur.lohkare@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Ms. P. A. Panmand",
    role: "Assistant Professor & Faculty Coordinator",
    deptOrClass: "Quality Assurance & Placement Support",
    email: "pratibha.panmand@indrayanividyamandir.org",
    type: "Faculty"
  },
  {
    name: "Mr. Rohit Jagtap",
    role: "Student Placement Coordinator",
    deptOrClass: "Final Year B.Pharm",
    email: "rohit.jagtap@student.kbiper.org",
    type: "Student"
  },
  {
    name: "Ms. Snehal Shinde",
    role: "Student Placement Coordinator",
    deptOrClass: "Final Year B.Pharm",
    email: "snehal.shinde@student.kbiper.org",
    type: "Student"
  },
  {
    name: "Mr. Vivek Awate",
    role: "Student Placement Coordinator",
    deptOrClass: "Second Year D.Pharm",
    email: "vivek.awate@student.kbiper.org",
    type: "Student"
  }
];

const GUIDELINES = [
  {
    title: "1. Eligibility Criteria for Registrants",
    icon: GraduationCap,
    details: "All Final Year B.Pharm, M.Pharm, and Second Year D.Pharm students with a minimum CGPA of 6.0 and no active backlogs are eligible to register. Active backlog students can register for off-campus support but cannot sit for on-campus core rounds."
  },
  {
    title: "2. The 'One Student One Job' Placement Rule",
    icon: CheckCircle,
    details: "To ensure equal distribution of career options, a student who secures an offer of ₹3.5 LPA or higher will be opted out of subsequent drives. An exception is made only if the subsequent drive offers a package differential of ₹2.0 LPA or higher."
  },
  {
    title: "3. Pre-Placement Talks (PPT) Attendance",
    icon: Building,
    details: "Attendance at Pre-Placement Talks conducted by visiting organizations is compulsory for registered students. Failure to attend PPT without a written medical/academic clearance will result in debarment from that drive and subsequent interview slots."
  },
  {
    title: "4. Professional Conduct & Dress Code",
    icon: Scale,
    details: "Registered candidates must be in complete college formal uniform (blazer, tie, formal shoes) during all recruitment stages. Any candidate displaying misconduct, late arrival, or absenteeism during technical or HR rounds will face disciplinary suspension."
  }
];

const FAQS = [
  {
    q: "How do I register myself with the T&P Cell?",
    a: "Registration links are sent to all eligible final year students at the start of the academic semester. You need to upload your verified semester grade sheets and a formatted resume signed by your faculty advisor."
  },
  {
    q: "Can I apply for placement drives if I have a backlog?",
    a: "Companies set their own eligibility filters. While most MNCs require clear academic profiles, several medium-scale pharma companies allow candidates with active backlogs to attend interviews."
  },
  {
    q: "What training does the college offer for aptitude rounds?",
    a: "We conduct 40+ hours of Quantitative Aptitude, Logical Reasoning, and Verbal drills in collaboration with Apex Soft Skills Consultants. These are scheduled during the third-year and final-year academic calendar."
  },
  {
    q: "Is summer internship mandatory?",
    a: "Yes, under Pharmacy Council of India guidelines, all B.Pharm students must complete a minimum of 150 hours of industrial training/internship at a licensed pharmacy facility or pharmaceutical industry during their vacations."
  }
];

export default function PlacementsCell() {
  const { toast } = useToast();
  const [openGuidelineIdx, setOpenGuidelineIdx] = useState<number | null>(null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  // Quick inquiry state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  const isFormValid = name.trim().length > 2 && email.trim().includes("@") && subject.trim().length > 3 && msg.trim().length > 5;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSent(true);
    toast({
      title: "Query Registered",
      description: "We have received your query. A T&P student or faculty coordinator will respond shortly.",
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
              <Users className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              T & P <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Cell</span> Organization
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Our structured Training and Placement Cell comprises experienced educators and committed student coordinators driving placement campaigns.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Roster Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          
          <div>
            <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
              <Users className="w-6 h-6 text-accent" /> Placement Committee Roster
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">Meet the faculty and student representatives coordinating our training drives.</p>
          </div>

          {/* Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COORDINATORS.map((coordinator, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-muted rounded-2xl.5 p-5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shrink-0 ${
                    coordinator.type === "Faculty" ? "bg-primary" : "bg-accent"
                  }`}>
                    {coordinator.name.split(" ").pop()?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-primary leading-tight">{coordinator.name}</h3>
                    <p className="text-[11px] font-bold text-accent mt-0.5">{coordinator.role}</p>
                    <p className="text-[10px] text-muted-foreground">{coordinator.deptOrClass}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-muted/50 flex justify-between items-center text-[10px] text-muted-foreground">
                  <a href={`mailto:${coordinator.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                    <Mail className="w-3.5 h-3.5 text-accent" /> {coordinator.email}
                  </a>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    coordinator.type === "Faculty" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                  }`}>
                    {coordinator.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Rules & Guidelines Segment */}
      <section className="py-16 bg-muted/20 border-t border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Rules Accordions */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-accent" /> Recruitment Rules & Policies
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Please review the disciplinary regulations and structural processes carefully.</p>
              </div>

              <div className="space-y-3">
                {GUIDELINES.map((item, idx) => {
                  const IconComp = item.icon;
                  const isOpen = openGuidelineIdx === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white border border-muted rounded-xl overflow-hidden transition-all duration-300 shadow-sm"
                    >
                      <button
                        onClick={() => setOpenGuidelineIdx(isOpen ? null : idx)}
                        className="w-full px-5 py-4 flex justify-between items-center font-bold text-sm text-primary hover:text-accent transition-colors text-left"
                      >
                        <span className="flex items-center gap-3">
                          <IconComp className="w-4.5 h-4.5 text-accent" /> {item.title}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? "transform rotate-185" : ""
                        }`} />
                      </button>
                      
                      <div className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[300px] border-t border-muted/50 p-5 bg-muted/10" : "max-h-0 overflow-hidden"
                      }`}>
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.details}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Side FAQ section */}
            <div className="lg:col-span-4 space-y-6 bg-white border border-muted p-6.5 rounded-3xl shadow-sm">
              <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                <HelpCircle className="w-5 h-5 text-accent" /> Placement FAQs
              </h3>
              
              <div className="space-y-4">
                {FAQS.map((faq, idx) => {
                  const isFaqOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border-b border-muted pb-3.5 last:border-0 last:pb-0 text-xs">
                      <button
                        onClick={() => setOpenFaqIdx(isFaqOpen ? null : idx)}
                        className="w-full flex justify-between items-start text-left font-bold text-primary hover:text-accent transition-colors gap-2"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5 transition-transform ${
                          isFaqOpen ? "transform rotate-180" : ""
                        }`} />
                      </button>
                      
                      {isFaqOpen && (
                        <p className="text-[11px] text-muted-foreground leading-normal mt-2 bg-muted/40 p-2.5 rounded-lg border border-muted-border">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Coordination Inquiries Desk */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-md space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-extrabold text-primary">T&P Desk Coordinator Contact</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">Are you a corporate HR recruiter or a student needing structural clarification? Drop your message below.</p>
            </div>

            {!sent ? (
              <form onSubmit={handleInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name / Organization</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Lupin Recruitment Desk"
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
                      className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      placeholder="e.g. recruit@lupin.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Inquiry Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Seeking Campus Recruitment Schedule"
                    className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Inquiry Message</label>
                  <textarea
                    required
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Provide details about registration queries or drive timelines..."
                    className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <User className="w-4 h-4" /> Submit Desk Query
                </button>
              </form>
            ) : (
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6.5 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-primary">Inquiry Registered</h4>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    We have successfully logged your desk query. A placement cell staff member will contact you.
                  </p>
                </div>
                <button
                  onClick={() => setSent(false)}
                  className="cursor-pointer px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

    </AppLayout>
  );
}
