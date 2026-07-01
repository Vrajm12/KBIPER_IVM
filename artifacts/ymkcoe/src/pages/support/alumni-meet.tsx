import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  FileText,
  Users,
  Image as ImageIcon,
  HeartHandshake
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const PAST_MEETS = [
  {
    title: "KBIPER Decennial Reunion 2024",
    date: "January 6, 2024",
    attendees: "180+ Alumni",
    highlights: "Distinguished alumni awards, industrial collaboration roundtables, and student mentoring panel.",
    theme: "Connecting Roots"
  },
  {
    title: "Annual Alumni Meet 2023",
    date: "December 16, 2023",
    attendees: "120+ Alumni",
    highlights: "Interactive labs visits, curriculum advisory committee meeting, and cultural music evening.",
    theme: "Reflections & Horizons"
  }
];

export default function AlumniMeet() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"rsvp" | "past">("rsvp");

  // RSVP Form States
  const [name, setName] = useState("");
  const [batch, setBatch] = useState("");
  const [attendance, setAttendance] = useState("Physically");
  const [guestsCount, setGuestsCount] = useState("0");
  const [isRSVPed, setIsRSVPed] = useState(false);

  const isFormValid = useMemo(() => {
    return name.trim().length > 2 && batch.trim().length > 3;
  }, [name, batch]);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "RSVP Incomplete",
        description: "Please fill out required fields (Name, Batch).",
      });
      return;
    }

    setIsRSVPed(true);
    toast({
      title: "RSVP Submitted",
      description: "We are excited to see you at the KBIPER Alumni Meet!",
    });
  };

  const handleResetForm = () => {
    setName("");
    setBatch("");
    setGuestsCount("0");
    setAttendance("Physically");
    setIsRSVPed(false);
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
              <Calendar className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Reunions</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Welcome back to campus! Join us for reunions to celebrate milestones, share insights, and connect with old friends.
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
                onClick={() => setActiveTab("rsvp")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "rsvp" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <Calendar className="w-4 h-4" /> Upcoming Meet & RSVP
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap inline-flex items-center gap-1.5 ${
                  activeTab === "past" ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Past Reunions Gallery
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "rsvp" && (
              /* =========================================================================
                 🗓️ UPCOMING MEET & RSVP TAB
                 ========================================================================= */
              <motion.div
                key="rsvp-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Event Card Details */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-gradient-to-br from-blue-900 to-[#022c45] text-white rounded-3xl p-6.5 shadow-xl relative overflow-hidden group">
                    <span className="inline-flex items-center px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border bg-accent/25 border-accent/20 text-accent mb-6 animate-pulse">
                      Upcoming Reunion
                    </span>
                    <h3 className="text-xl font-extrabold text-white leading-tight mb-6">Annual Alumni Reunion Meet 2026</h3>

                    <div className="space-y-4 text-xs font-semibold text-white/90">
                      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div>
                          <span className="text-[9px] uppercase text-white/50 block">Event Date</span>
                          <span>Saturday, December 19, 2026</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                        <Clock className="w-5 h-5 text-accent" />
                        <div>
                          <span className="text-[9px] uppercase text-white/50 block">Reporting Hours</span>
                          <span>10:30 AM onwards</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                        <MapPin className="w-5 h-5 text-accent" />
                        <div>
                          <span className="text-[9px] uppercase text-white/50 block">Venue Location</span>
                          <span>KBIPER Seminar Hall & Lawns</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-white/10 my-5" />

                    <p className="text-xs text-white/70 leading-relaxed">
                      Highlight: Silver Jubilee felicitation of Class of 2001 and professional mentorship agreements.
                    </p>
                  </div>
                </div>

                {/* Right: RSVP Form */}
                <div className="lg:col-span-7">
                  {!isRSVPed ? (
                    <form onSubmit={handleRSVPSubmit} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                      <div>
                        <h3 className="text-lg font-extrabold text-primary">Confirm Your Attendance (RSVP)</h3>
                        <p className="text-xs text-muted-foreground mt-1">Please confirm if you are attending the annual meetup on campus or virtually.</p>
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Full Name</label>
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Shraddha More"
                              className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Graduation Year (Batch)</label>
                            <input
                              type="text"
                              required
                              value={batch}
                              onChange={(e) => setBatch(e.target.value)}
                              placeholder="e.g. 2012"
                              className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Attendance Mode</label>
                            <select 
                              value={attendance}
                              onChange={(e) => setAttendance(e.target.value)}
                              className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                              <option>Physically (On-Campus)</option>
                              <option>Virtually (Online Broadcast)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Number of Guests / Family Members</label>
                            <select 
                              value={guestsCount}
                              onChange={(e) => setGuestsCount(e.target.value)}
                              className="flex h-12 w-full rounded-xl bg-white border border-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3 or more</option>
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
                        <Send className="w-4.5 h-4.5" /> Submit RSVP Confirmation
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
                        <h3 className="text-2xl font-bold text-primary">RSVP Successfully Logged</h3>
                        <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">We have registered your details. Looking forward to welcoming you back on campus!</p>
                      </div>

                      <button
                        onClick={handleResetForm}
                        className="cursor-pointer w-full py-3 px-4 bg-primary hover:bg-accent text-white rounded-xl text-xs font-bold transition-all"
                      >
                        Update RSVP Details
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "past" && (
              /* =========================================================================
                 🖼️ PAST REUNIONS GALLERY TAB
                 ========================================================================= */
              <motion.div
                key="past-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6.5"
              >
                {PAST_MEETS.map((meet, idx) => (
                  <div key={idx} className="bg-white border border-muted p-6.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h4 className="text-base font-extrabold text-primary leading-tight">{meet.title}</h4>
                          <span className="text-[9px] uppercase font-bold text-accent tracking-wider block mt-1">Theme: {meet.theme}</span>
                        </div>
                        <span className="inline-flex px-2 py-0.5 bg-muted text-[10px] text-primary font-bold rounded-lg border border-muted-border shrink-0">
                          {meet.date}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground leading-relaxed">{meet.highlights}</p>

                      <div className="p-3 bg-muted/40 border border-muted rounded-xl text-xs flex items-center gap-2 font-bold text-primary">
                        <Users className="w-4 h-4 text-accent" />
                        <span>Registered Attendance: {meet.attendees}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
