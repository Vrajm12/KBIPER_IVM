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
  HeartHandshake,
  Award,
  ChevronRight,
  Printer
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  src: string;
  caption: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/images/alumni_meet_2022/image_1.jpg",
    caption: "Felicitation of Hon. Shri. Ramdasji Kakade by Hon. Principal sir (Lamp Lighting)"
  },
  {
    src: "/images/alumni_meet_2022/image_2.jpg",
    caption: "Inauguration Address by Dignitaries"
  },
  {
    src: "/images/alumni_meet_2022/image_3.jpg",
    caption: "Felicitation and Welcome Ceremony on Stage"
  },
  {
    src: "/images/alumni_meet_2022/image_4.jpg",
    caption: "Alumni and Student Gathering in the Seminar Hall"
  },
  {
    src: "/images/alumni_meet_2022/image_5.jpg",
    caption: "Entertainment Dance Performance by Boys Batch"
  },
  {
    src: "/images/alumni_meet_2022/image_6.jpg",
    caption: "Traditional Cultural Dance by Final Year Students"
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
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Alumni <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Network</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Welcome back to campus! Connecting our proud alumni community, sharing success stories, and inspiring the next generation of pharmacists.
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
                <ImageIcon className="w-4 h-4" /> Past Reunions & Reports
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
                              placeholder="e.g. 2021"
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
                 🖼️ PAST REUNIONS & REPORTS TAB
                 ========================================================================= */
              <motion.div
                key="past-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-12"
              >
                {/* 2022 Meet Official Activity Report */}
                <div className="bg-white border border-muted p-6.5 md:p-9 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-muted-border/60 pb-5 gap-4">
                    <div>
                      <span className="inline-flex px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-md border bg-accent/10 border-accent/25 text-accent mb-2">
                        Activity Report
                      </span>
                      <h3 className="text-2xl font-black text-primary tracking-tight leading-tight">First Alumni Meet of IIPER</h3>
                    </div>
                    
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground p-2 bg-muted/40 rounded-xl border border-muted">
                        <Calendar className="w-4 h-4 text-accent" />
                        <span>Date: 15/10/2022</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground p-2 bg-muted/40 rounded-xl border border-muted">
                        <Users className="w-4 h-4 text-accent" />
                        <span>Attendance: 70 Alumni</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Report details */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-2.5 flex items-center gap-1.5">
                          <Award className="w-4 h-4 text-accent" /> Occasion & Objective
                        </h4>
                        <div className="p-4 bg-muted/30 border border-muted rounded-2xl space-y-3 text-xs leading-relaxed text-muted-foreground font-semibold">
                          <p>
                            <strong className="text-primary font-bold">Occasion:</strong> First Alumni meet of IIPER, for alumni to get together and share their views and success stories with the other students to motivate them.
                          </p>
                          <div className="border-t border-muted/50 pt-2 space-y-1">
                            <span className="text-primary font-bold block mb-1">Objectives:</span>
                            <div className="flex gap-2 font-medium">
                              <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>Motivation of current students from their seniors.</span>
                            </div>
                            <div className="flex gap-2 font-medium">
                              <ChevronRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                              <span>To get knowledge of the professional and corporate world.</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary mb-2.5 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-accent" /> Summary of Activity
                        </h4>
                        <p className="text-xs leading-relaxed text-muted-foreground font-medium bg-white border border-muted p-5.5 rounded-2xl shadow-[0_4px_15px_rgb(0,0,0,0.01)]">
                          We reached the destination at 8:30 AM and checked all arrangements. Alumni registration was completed at the entrance, welcoming each alumnus with a flower as a token of love. 
                          <br /><br />
                          Inauguration of the programme was performed via lamp lighting by Hon. President of IVM Mr. Ramdas Kakade, Secretary Shri. Chandrakantji Shete, Trustee Mrs. Nirupa Kanitkar mam, Dr. Sambhaji Malghe, our Principal Dr. Sanjay Arote and Mr. G. S. Shinde. 
                          <br /><br />
                          Entertainment programmes, including singing and dance performances, were beautifully executed by the current final year students to welcome their seniors.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 border border-muted rounded-xl">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Activity Coordinator</span>
                          <span className="text-xs font-extrabold text-primary block mt-1">Prof. Mugdha A. Joshi</span>
                          <span className="text-[9px] text-muted-foreground/80 font-medium block">Alumni Coordinator & IVM's IIPER Faculty</span>
                        </div>
                        <div className="p-4 bg-muted/30 border border-muted rounded-xl">
                          <span className="text-[10px] uppercase font-bold text-muted-foreground block">Principal</span>
                          <span className="text-xs font-extrabold text-primary block mt-1">Dr. S. R. Arote</span>
                          <span className="text-[9px] text-muted-foreground/80 font-medium block">Principal, IIPER</span>
                        </div>
                      </div>
                    </div>

                    {/* Attendance summary card */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-primary text-white p-6.5 rounded-3xl relative overflow-hidden shadow-lg">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-accent/20 rounded-full blur-[50px] pointer-events-none" />
                        <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent mb-4 block">Attendance Analysis</h4>
                        
                        <div className="space-y-4 text-xs font-semibold">
                          <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span>1st Batch of IIPER (2017-2021)</span>
                            <span className="text-accent font-black">30 Alumni</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-white/10 pb-2">
                            <span>2nd Batch of IIPER (2018-2022)</span>
                            <span className="text-accent font-black">40 Alumni</span>
                          </div>
                          <div className="flex justify-between items-center pt-1 text-sm">
                            <span className="font-extrabold">Total Attendees</span>
                            <span className="text-accent font-black text-lg">70 Registered</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-muted/30 border border-muted p-5.5 rounded-3xl space-y-3 text-xs leading-relaxed text-muted-foreground font-semibold">
                        <h4 className="text-[10px] font-extrabold uppercase text-primary tracking-wider flex items-center gap-1">
                          <HeartHandshake className="w-3.5 h-3.5 text-accent" /> Alumni Networking
                        </h4>
                        <p className="font-medium">
                          The meet served as an interactive launchpad where alumni engaged in active discussions, shared professional insights from the industry, and established mentoring pathways for current students.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Glimpses Gallery */}
                  <div className="border-t border-muted/70 pt-8">
                    <h4 className="text-base font-extrabold text-primary mb-6 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-accent" /> Glimpses of Alumni Meet
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {GALLERY_IMAGES.map((img, idx) => (
                        <div key={idx} className="group relative bg-white border border-muted rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden bg-muted flex items-center justify-center">
                            <img 
                              src={img.src} 
                              alt={img.caption}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-md border border-white/10 uppercase tracking-widest">
                              Photo 0{idx+1}
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center bg-white border-t border-muted/50">
                            <p className="text-[11px] font-extrabold text-primary leading-tight text-center">{img.caption}</p>
                          </div>
                        </div>
                      ))}
                    </div>
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
