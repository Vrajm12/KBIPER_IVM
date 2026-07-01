import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  Send, 
  CheckCircle,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  Users,
  Award
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const CULTURAL_EVENTS = [
  {
    day: "Day 1: Fine Arts & Scientific Poster",
    date: "February 10, 2026",
    events: ["Rangoli & Face Painting", "Scientific Poster Presentation", "Group Debate on Pharmacy Ethics"],
    coordinator: "Prof. Anjali Jadhav"
  },
  {
    day: "Day 2: Music & Literary fests",
    date: "February 11, 2026",
    events: ["Solo & Duet Singing", "Elocution Competition", "Stand-up Comedy & Mimicry"],
    coordinator: "Ms. Ananya Deshpande"
  },
  {
    day: "Day 3: Performing Arts & Fashion Show",
    date: "February 12, 2026",
    events: ["Solo / Group Dance Showcase", "Traditional Wear Ramp Walk", "Pharma-Fiesta Drama Night"],
    coordinator: "Mr. Rohit Jagtap"
  }
];

export default function Cultural() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"fiesta" | "register">("fiesta");

  // Registration Form State
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("Solo / Group Dance");
  const [category, setCategory] = useState("Solo");
  const [isRegistered, setIsRegistered] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && rollNo.trim().length > 3;
  }, [name, rollNo]);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Registration Incomplete",
        description: "Please fill out required fields (Name, Roll No).",
      });
      return;
    }

    setIsRegistered(true);
    toast({
      title: "Cultural Registration Recorded",
      description: `Your application to participate in ${selectedEvent} has been registered!`,
    });
  };

  const handleResetForm = () => {
    setName("");
    setRollNo("");
    setSelectedEvent("Solo / Group Dance");
    setCategory("Solo");
    setIsRegistered(false);
  };

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <Music className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Pharma <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Fiesta</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Celebrating creativity and cultural diversity. KBIPER's annual cultural week showcases student talent in performing arts, literature, and design.
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
                onClick={() => setActiveTab("fiesta")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "fiesta" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Music className="w-4 h-4" /> Event Schedule
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
                <Send className="w-4 h-4" /> Register for Events
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "fiesta" && (
              /* =========================================================================
                 🎭 EVENT SCHEDULE TAB
                 ========================================================================= */
              <motion.div
                key="fiesta-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left side: Highlight */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-primary text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                      <Sparkles className="w-48 h-48" strokeWidth={0.5} />
                    </div>

                    <h3 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-6 flex items-center gap-2">
                      <Award className="w-4.5 h-4.5 text-accent" /> Fiesta Benchmarks
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Participant Registrations</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">400+ Students</div>
                      </div>

                      <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                        <span className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">Total Event categories</span>
                        <div className="text-3xl font-black text-accent mt-1 tracking-tight">15 Competitions</div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <div className="text-xs text-white/70 leading-relaxed flex gap-2">
                      <Users className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span>Need details? Reach out to Cultural Secretary Ms. Ananya Deshpande.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Event List */}
                <div className="lg:col-span-8 space-y-6">
                  {CULTURAL_EVENTS.map((event, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-muted p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 space-y-4"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{event.day}</h4>
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block mt-1">Coordinator: {event.coordinator}</span>
                        </div>
                        <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border shrink-0">
                          {event.date}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-muted/50">
                        <span className="text-[9px] uppercase font-bold text-primary tracking-wider block mb-2">Competitions & Performances:</span>
                        <div className="flex flex-wrap gap-2">
                          {event.events.map((evt, index) => (
                            <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted text-[10px] font-bold text-muted-foreground rounded-lg border border-muted-border">
                              ★ {evt}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "register" && (
              /* =========================================================================
                 📝 REGISTER FOR EVENTS TAB
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
                      <h3 className="text-lg font-extrabold text-primary">Pharma-Fiesta Registration Form</h3>
                      <p className="text-xs text-muted-foreground mt-1">Register to participate in the upcoming cultural competitions. Limited slots per competition.</p>
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
                            placeholder="e.g. Ananya Deshpande"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Roll Number / ID</label>
                          <input
                            type="text"
                            required
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g. KB-2024-112"
                            className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Choose Competition / Event</label>
                          <select 
                            value={selectedEvent}
                            onChange={(e) => setSelectedEvent(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Solo / Group Dance</option>
                            <option>Solo / Duet Singing</option>
                            <option>Traditional Ramp Walk</option>
                            <option>Drama / Skit Night</option>
                            <option>Scientific Poster Exhibition</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Performance Type</label>
                          <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            <option>Solo Performance</option>
                            <option>Group / Duet Performance</option>
                          </select>
                        </div>
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
                      <Send className="w-4.5 h-4.5" /> Submit Event RSVP
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
                      <h3 className="text-2xl font-bold text-primary">Registration Completed</h3>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">Your participation details are saved in the cultural ledger catalog. Prepare your props/presentation materials!</p>
                    </div>

                    <button
                      onClick={handleResetForm}
                      className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                    >
                      New Registration
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
