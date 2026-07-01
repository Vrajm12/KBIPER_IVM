import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Send, 
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award,
  ShieldAlert
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const SPORTS_TOURNAMENTS = [
  {
    name: "Pharma-Cup Cricket League",
    category: "Outdoor Sport (Boys & Girls)",
    schedule: "Every Afternoon, Jan 15-20, 2026",
    coordinator: "Prof. Sushma Kamble",
    teams: "12 Class Teams Registered"
  },
  {
    name: "KBIPER Football Championship",
    category: "Outdoor Sport (Boys)",
    schedule: "Jan 21-23, 2026",
    coordinator: "Mr. Rohit Jagtap",
    teams: "8 Teams registered"
  },
  {
    name: "Inter-Class Badminton Meet",
    category: "Indoor Sport (Singles & Doubles)",
    schedule: "Jan 18-19, 2026",
    coordinator: "Ms. Ananya Deshpande",
    teams: "32 Singles Players Registered"
  },
  {
    name: "Pharma Mind Chess Tournament",
    category: "Indoor Sport (Singles)",
    schedule: "Jan 15, 2026",
    coordinator: "Dr. Vivek Sharma",
    teams: "24 Players Registered"
  }
];

export default function SportsEvents() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"tournaments" | "register">("tournaments");

  // Registration states
  const [captainName, setCaptainName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedSport, setSelectedSport] = useState("Pharma-Cup Cricket League");
  const [teamSize, setTeamSize] = useState("11 Players (Cricket)");
  const [contact, setContact] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const isFormValid = useMemo(() => {
    return captainName.trim().length > 2 && rollNo.trim().length > 3 && contact.trim().length > 5;
  }, [captainName, rollNo, contact]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill out required fields (Captain Name, Roll No, Contact).",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Sports Registration Completed",
      description: `Your team registration for ${selectedSport} is logged.`,
    });
  };

  const handleResetForm = () => {
    setCaptainName("");
    setRollNo("");
    setContact("");
    setSelectedSport("Pharma-Cup Cricket League");
    setTeamSize("11 Players (Cricket)");
    setIsRegistered(false);
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
              <Trophy className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Pharma <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Cup</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Promoting physical fitness, sportsmanship, and teamwork. KBIPER's annual sports meet features indoor and outdoor athletic competitions.
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
                onClick={() => setActiveTab("tournaments")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "tournaments" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Trophy className="w-4 h-4" /> Tournaments
              </button>
              <button
                onClick={() => {
                  setActiveTab("register");
                  setIsRegistered(false);
                }}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "register" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Send className="w-4 h-4" /> Register Teams
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "tournaments" && (
              /* =========================================================================
                 🏆 TOURNAMENTS TAB
                 ========================================================================= */
              <motion.div
                key="tournaments-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side benchmarks */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-accent" /> Sports Benchmarks
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Total Athletes Enrolled</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">350+ Players</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Sports Categories</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">8 Tournaments</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>For queries, contact Sports Secretary Mr. Rahul Shinde.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side Event List */}
                <div className="lg:col-span-8 space-y-6">
                  {SPORTS_TOURNAMENTS.map((sport, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{sport.name}</h4>
                          <span className="text-[10px] text-muted-foreground font-semibold mt-0.5">{sport.category}</span>
                        </div>
                        <span className="inline-flex px-2.5 py-1 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border shrink-0">
                          {sport.teams}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-muted/50 text-xs text-muted-foreground flex flex-wrap justify-between items-center gap-4">
                        <span><strong>Schedule:</strong> {sport.schedule}</span>
                        <span><strong>Coordinator:</strong> {sport.coordinator}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "register" && (
              /* =========================================================================
                 📝 REGISTER TEAMS TAB
                 ========================================================================= */
              <motion.div
                key="register-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-xl mx-auto"
              >
                {!isRegistered ? (
                  <form onSubmit={handleRegisterSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                    <div>
                      <h3 className="text-lg font-extrabold text-primary">Pharma-Cup Registration Desk</h3>
                      <p className="text-xs text-muted-foreground mt-1">Register your class team or individual entries. All registrations are verified by the Sports Secretary.</p>
                    </div>

                    <div className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Captain / Athlete Full Name</label>
                          <input
                            type="text"
                            required
                            value={captainName}
                            onChange={(e) => setCaptainName(e.target.value)}
                            placeholder="e.g. Rahul Shinde"
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
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Select Sport / Tournament</label>
                          <select 
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Pharma-Cup Cricket League</option>
                            <option>KBIPER Football Championship</option>
                            <option>Inter-Class Badminton Meet</option>
                            <option>Pharma Mind Chess Tournament</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Squad Size Category</label>
                          <select 
                            value={teamSize}
                            onChange={(e) => setTeamSize(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>11 Players (Cricket)</option>
                            <option>7 Players (Football)</option>
                            <option>Douves / Pair (Badminton)</option>
                            <option>Single Entry (Chess/Singles)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Captain Mobile Number</label>
                        <input
                          type="text"
                          required
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          placeholder="e.g. +91 9876543203"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
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
                      <Send className="w-4.5 h-4.5" /> Submit Team Entry
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
                      <h3 className="text-2xl font-bold text-primary">Team Entry Registered</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your team details have been recorded. Schedule tables and draw pairings will be sent to the captain shortly.</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      Register New Team
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
