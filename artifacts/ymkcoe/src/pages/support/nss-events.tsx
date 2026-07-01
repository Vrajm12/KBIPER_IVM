import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeartHandshake, 
  Send, 
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award,
  Plus
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const SOCIAL_CAMPS = [
  {
    title: "Mega Blood Donation Camp",
    date: "March 15, 2026",
    donors: "120+ Donors Enrolled",
    desc: "Coordinated in collaboration with Pune District General Blood Bank. Collected 110 units of blood in a single day.",
    status: "Completed"
  },
  {
    title: "Village Adaptation & Health Survey",
    date: "February 1-7, 2026",
    donors: "50 Volunteers",
    desc: "A week-long residential camp in adaptation village Sudumbare. Organized free diabetes checks, water hygiene talks, and tree plantation.",
    status: "Completed"
  },
  {
    title: "Tuberculosis Awareness rally",
    date: "December 20, 2025",
    donors: "150+ Students",
    desc: "Street plays and distribution of TB awareness leaflets in Talegaon Dabhade Chowk in association with rural health centers.",
    status: "Completed"
  }
];

export default function NssEvents() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"camps" | "enroll">("camps");

  // Enrollment form states
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [bloodGroup, setBloodGroup] = useState("O +ve");
  const [motivation, setMotivation] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && rollNo.trim().length > 3 && motivation.trim().length > 5;
  }, [name, rollNo, motivation]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Enrollment Incomplete",
        description: "Please fill out required fields (Name, Roll No, Experience/Motivation).",
      });
      return;
    }

    setIsEnrolled(true);
    toast({
      title: "Enrollment Recorded",
      description: "You have been successfully registered as an NSS unit candidate.",
    });
  };

  const handleResetForm = () => {
    setName("");
    setRollNo("");
    setMotivation("");
    setBloodGroup("O +ve");
    setIsEnrolled(false);
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
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              NSS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Social Desk</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Cultivating social responsibility. The National Service Scheme (NSS) unit at KBIPER organizes community development initiatives and health camps.
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
                onClick={() => setActiveTab("camps")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "camps" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <HeartHandshake className="w-4 h-4" /> Outreach Camps
              </button>
              <button
                onClick={() => {
                  setActiveTab("enroll");
                  setIsEnrolled(false);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "enroll" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Join NSS Unit
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "camps" && (
              /* =========================================================================
                 📊 OUTREACH CAMPS TAB
                 ========================================================================= */
              <motion.div
                key="camps-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left metrics */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-accent" /> Social Impact Metrics
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">NSS Volunteers Enrolled</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">100+ Volunteers</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Outreach Camps conducted</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">5+ Camps Annually</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>Under direction of Program officer Mr. Vicky Salve.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Camps List */}
                <div className="lg:col-span-8 space-y-6">
                  {SOCIAL_CAMPS.map((camp, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{camp.title}</h4>
                          <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">NSS Outreach Camp</span>
                        </div>
                        <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border shrink-0">
                          {camp.date}
                        </span>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{camp.desc}</p>

                      <div className="pt-2 border-t border-muted/50 text-xs text-muted-foreground flex flex-wrap justify-between items-center gap-4">
                        <span><strong>Participation Index:</strong> {camp.donors}</span>
                        <span><strong>Camp Status:</strong> {camp.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "enroll" && (
              /* =========================================================================
                 📝 JOIN NSS UNIT TAB
                 ========================================================================= */
              <motion.div
                key="enroll-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto"
              >
                {!isEnrolled ? (
                  <form onSubmit={handleEnrollSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-primary">NSS Volunteer Enrollment Form</h3>
                      <p className="text-xs text-muted-foreground mt-1">Enroll to register for upcoming community development works and residential camps.</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Student Full Name</label>
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Vicky Salve"
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
                            placeholder="e.g. KB-2024-032"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Blood Group</label>
                          <select 
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>A +ve</option>
                            <option>B +ve</option>
                            <option>O +ve</option>
                            <option>AB +ve</option>
                            <option>A -ve</option>
                            <option>B -ve</option>
                            <option>O -ve</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Motivation for Joining NSS (At least 6 characters)</label>
                        <textarea
                          required
                          value={motivation}
                          onChange={(e) => setMotivation(e.target.value)}
                          placeholder="Describe your previous social services experience or why you are motivated to join the NSS unit..."
                          className="w-full min-h-[140px] px-4 py-3.5 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35 resize-none"
                        />
                      </div>
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
                      <Send className="w-4.5 h-4.5" /> Submit Volunteer Enrollment
                    </button>
                  </form>
                ) : (
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
                      <h3 className="text-2xl font-bold text-primary">Enrollment Logged Successfully</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your details are saved in the NSS unit database. Candidates will be notified for verification camps.</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Enroll Another Candidate
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
