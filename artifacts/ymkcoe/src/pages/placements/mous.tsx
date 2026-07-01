import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
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
  MapPin
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface MouItem {
  partner: string;
  location: string;
  signedDate: string;
  validity: string;
  scope: string[];
  achievements: string;
}

const MOUS_DATA: MouItem[] = [
  {
    partner: "Lupin Research Park",
    location: "Nande, Pune",
    signedDate: "October 12, 2024",
    validity: "5 Years (Active)",
    scope: [
      "Student formulation research projects at R&D centers.",
      "Priority recruitment slots for KBIPER toppers.",
      "Annual guest lectures on Novel Drug Delivery Systems."
    ],
    achievements: "12 student research projects completed, 8 graduates placed directly in Lupin R&D."
  },
  {
    partner: "Cipla Limited",
    location: "Kurkumbh, MIDC",
    signedDate: "July 05, 2023",
    validity: "5 Years (Active)",
    scope: [
      "HPLC calibration and quality control instrument hands-on drills.",
      "Regulatory affairs and USFDA auditing guest seminars.",
      "Summer internships for B.Pharm students."
    ],
    achievements: "45 students trained in HPLC systems, 14 graduates placed in QA/QC."
  },
  {
    partner: "Emcure Pharmaceuticals",
    location: "Bhosari, Pune",
    signedDate: "January 20, 2025",
    validity: "3 Years (Active)",
    scope: [
      "Product management and pharmaceutical marketing internships.",
      "Case studies evaluations and marketing strategy drills.",
      "Sponsorship of academic webinars."
    ],
    achievements: "6 students completed summer marketing internships, 4 placed in corporate PMT."
  },
  {
    partner: "Serum Institute of India",
    location: "Hadapsar, Pune",
    signedDate: "March 18, 2024",
    validity: "5 Years (Active)",
    scope: [
      "Biotechnology formulation practices and industrial sterile validations.",
      "Tours of automated bioreactor assemblies.",
      "Sponsorship of state-level scientific conferences."
    ],
    achievements: "Joint seminar on Vaccine Delivery Systems hosted; industrial visits completed for 40 students."
  }
];

export default function PlacementsMOUs() {
  const { toast } = useToast();
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
      description: `Thank you ${contactPerson} from ${companyName}. Prof. Sandeep R. Bhegade will reach out to schedule a preliminary meeting.`,
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

      {/* Main MOUs listing */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* List of MOUs */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-primary flex items-center gap-2">
                  <Handshake className="w-6 h-6 text-accent" /> Active Memorandums of Understanding
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Explore signed agreements outlining academic partnerships and research guidelines.</p>
              </div>

              <div className="space-y-6">
                {MOUS_DATA.map((mou, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-muted p-6.5 rounded-2xl.5 shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h3 className="text-base font-extrabold text-primary leading-tight">{mou.partner}</h3>
                        <p className="text-[10px] text-muted-foreground font-semibold mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> {mou.location}
                        </p>
                      </div>
                      <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border self-start sm:self-auto">
                        Signed: {mou.signedDate}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs text-muted-foreground">
                      <div className="bg-muted/30 p-4 rounded-xl border border-muted/30 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-primary tracking-wide block">Deliverables & Scope of Work:</span>
                        <ul className="space-y-1 list-none pl-0 text-[11px]">
                          {mou.scope.map((item, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-1.5">
                              <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-primary bg-accent/5 p-3.5 rounded-xl border border-accent/20">
                        <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                        <span><strong>Key Outcomes:</strong> {mou.achievements}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-muted/50 text-[10px] text-muted-foreground flex justify-between items-center">
                      <span><strong>Agreement Validity:</strong> {mou.validity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar proposal form */}
            <div className="lg:col-span-4">
              <div className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sticky top-28">
                <div>
                  <h3 className="text-base font-extrabold text-primary flex items-center gap-1.5">
                    <FileText className="w-5 h-5 text-accent" /> Corporate Partnership Portal
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">Is your pharmaceutical company looking to collaborate or sign an academic MOU? Submit a proposal below.</p>
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
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Collaboration Details</label>
                      <textarea
                        required
                        rows={4}
                        value={proposalDetails}
                        onChange={(e) => setProposalDetails(e.target.value)}
                        placeholder="Briefly state your academic collaboration intent..."
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Send MOU Proposal
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-primary">Proposal Submitted</h4>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-normal">
                        Your collaboration request was saved. An automated receipt has been sent to <span className="font-bold text-primary">{email}</span>. We will follow up.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="cursor-pointer px-4 py-2 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      Send Another Proposal
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
