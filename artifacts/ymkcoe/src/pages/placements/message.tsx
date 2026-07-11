import { AppLayout } from "@/components/layout/AppLayout";
import { motion } from "framer-motion";
import { 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Target, 
  Users, 
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Send,
  Briefcase,
  Quote,
  CheckCircle,
  ThumbsUp,
  FileCheck,
  Building
} from "lucide-react";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

const PILLARS = [
  {
    title: "Regular Skill Training",
    description: "Arranging structured workshops with industry experts to develop student personality, confidence, and career readiness.",
    icon: Sparkles,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
  },
  {
    title: "Industry Expert Lectures",
    description: "Hosting guest sessions by industry officials to guide students on current advancements and opportunities in the pharma sector.",
    icon: Users,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
  },
  {
    title: "SWOT & KASH Analysis",
    description: "Conducting dynamic Knowledge, Attitude, Skills, and Habits (KASH) mapping along with SWOT analysis to evaluate core competencies.",
    icon: Target,
    color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
  },
  {
    title: "Grooming & Mock Interviews",
    description: "Conducting mock panels for T.Y. and Final Year students, categorizing candidates into 'Job Seekers' and 'Job Creators' for focused grooming.",
    icon: Award,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
  }
];

export default function PlacementsMessage() {
  const { toast } = useToast();
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [className, setClassName] = useState("");
  const [purpose, setPurpose] = useState("Counseling Session");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = useMemo(() => {
    return studentName.trim().length > 2 && studentEmail.trim().includes("@") && className.trim().length > 1 && message.trim().length > 5;
  }, [studentName, studentEmail, className, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Validation Error",
        description: "Please fill out all fields accurately (Message must be at least 6 characters).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    toast({
      title: "Counseling Request Sent",
      description: `Dear ${studentName}, your request for a ${purpose} has been successfully scheduled with Mr. Shyam S. Awate.`,
    });
  };

  const handleReset = () => {
    setStudentName("");
    setStudentEmail("");
    setClassName("");
    setPurpose("Counseling Session");
    setMessage("");
    setIsSubmitted(false);
  };

  return (
    <AppLayout>
      {/* Hero Banner */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/20 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-5 border border-accent/20 backdrop-blur-md">
              <Briefcase className="w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              TPO <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Message</span> & Vision
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Connecting pharmaceutical talents with industry leaders to cultivate careers of research, formulation, and academic excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* TPO Message Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: TPO Info Card */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-muted shadow-lg rounded-3xl p-6.5 text-center relative overflow-hidden group"
              >
                {/* Visual Avatar */}
                <div className="w-36 h-36 rounded-2xl overflow-hidden mx-auto mb-5 border border-muted shadow-md transform group-hover:scale-103 transition-transform duration-300">
                  <img 
                    src="/images/tpo_shyam_awate.jpg" 
                    alt="Mr. Shyam S. Awate" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-base font-extrabold text-primary">Mr. Shyam S. Awate</h3>
                <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-4">Dean Training & Placement & III ED Cell</p>
                
                <div className="border-t border-muted/50 pt-4 space-y-3 text-left text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span className="truncate text-[11px] lg:text-xs">placement.iiper@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>+91 95457 13667</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4.5 h-4.5 text-accent shrink-0" />
                    <span>Placement Desk, Ground Floor, KBIPER</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-muted/50 bg-muted/20 -mx-6 -mb-6 p-4 text-[10px] text-muted-foreground flex justify-around items-center">
                  <div className="text-center">
                    <span className="block font-extrabold text-primary text-sm">15+ Yrs</span>
                    <span>Experience</span>
                  </div>
                  <div className="h-6 w-px bg-muted-border" />
                  <div className="text-center">
                    <span className="block font-extrabold text-primary text-sm">90%+</span>
                    <span>Placements</span>
                  </div>
                </div>
              </motion.div>

              {/* TPO Counseling Schedule Card */}
              <div className="bg-primary text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
                  <BookOpen className="w-48 h-48" strokeWidth={0.5} />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <Clock className="w-4.5 h-4.5" /> Counseling Hours
                </h4>
                <div className="space-y-3 text-xs text-white/80">
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span>Monday - Wednesday</span>
                    <span className="font-bold text-accent">02:30 PM - 04:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1.5">
                    <span>Thursday - Friday</span>
                    <span className="font-bold text-accent">11:00 AM - 01:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday (Prior Appt)</span>
                    <span className="font-bold text-accent">10:00 AM - 12:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: TPO Message & Vision */}
            <div className="lg:col-span-8 space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-muted p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-6"
              >
                <div className="inline-flex px-3 py-1 bg-accent/15 text-accent text-[10px] uppercase font-bold rounded-lg tracking-wider border border-accent/20">
                  TPO Perspective
                </div>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-primary leading-tight">
                  Welcome to KBIPER Training & Placement Cell
                </h2>

                {/* Styled Quote Box */}
                <div className="relative p-6 bg-muted/40 border-l-4 border-accent rounded-r-2xl my-4 text-xs md:text-sm font-semibold italic text-primary leading-relaxed">
                  <Quote className="absolute -top-3 -left-2 w-7 h-7 text-accent/20 pointer-events-none" />
                  "If we train the students right, they will be placed right."
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Dear Students, Recruiter Partners, and Academicians,
                  </p>
                  <p>
                    The Training and Placement Cell is the most vibrant department of our college. We want our students to be able to choose a career according to their choice and train them to achieve their respective career goals to be a responsible pharmacist, as well as a citizen of India.
                  </p>
                  <p>
                    Our approach is centered on preparing students dynamically. We conduct focused mock interviews, groom them according to their liking and family backgrounds, and categorize them into Job Seekers and Job Creators. Through active collaborations and hands-on industrial training, we build bridges between science and career growth.
                  </p>
                  <p>
                    We welcome leading corporate recruiters to visit our campus and meet our high-performing graduates. We assure you of unmatched professionalism and execution competency.
                  </p>
                  <p className="font-extrabold text-primary">
                    Warm Regards,<br />
                    Mr. Shyam S. Awate<br />
                    <span className="text-xs text-muted-foreground font-medium">Dean Training & Placement & III ED Cell, IVM's KBIPER</span>
                  </p>
                </div>
              </motion.div>

              {/* Pillars Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold text-primary">Core Initiatives of Career Development</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {PILLARS.map((pillar, idx) => {
                    const IconComp = pillar.icon;
                    return (
                      <div key={idx} className="bg-white border border-muted p-5.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)] hover:border-accent/40 transition-colors duration-300 flex items-start gap-4">
                        <div className={`p-3 rounded-xl shrink-0 ${pillar.color}`}>
                          <IconComp className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-primary leading-tight mb-1">{pillar.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Student Career Counseling Request Form */}
              <div id="counseling-form" className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-primary">Interactive Counseling Request Portal</h3>
                  <p className="text-xs text-muted-foreground mt-1">Book an appointment or submit queries to the TPO regarding placements, mock interviews, or industry tie-ups.</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Email Address</label>
                        <input
                          type="email"
                          required
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="e.g. amit@gmail.com"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Academic Year / Department</label>
                        <input
                          type="text"
                          required
                          value={className}
                          onChange={(e) => setClassName(e.target.value)}
                          placeholder="e.g. Final Year B.Pharm"
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Inquiry Purpose</label>
                        <select
                          value={purpose}
                          onChange={(e) => setPurpose(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                        >
                          <option value="Counseling Session">Career Counseling Session</option>
                          <option value="Resume Review">Resume Review & Critique</option>
                          <option value="Mock Prep">Mock Interview Registration</option>
                          <option value="Internship Log">Summer Internship Clarification</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-primary mb-1 uppercase tracking-wide">Describe your career query</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail your queries regarding industry openings, requirements, or resume screening..."
                        className="w-full px-4 py-3 rounded-xl border border-muted bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent placeholder:text-muted-foreground/35"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="cursor-pointer w-full py-3.5 bg-primary hover:bg-primary/95 text-white font-bold rounded-xl shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                    >
                      <Send className="w-4 h-4" /> Submit Inquiry
                    </button>
                  </form>
                ) : (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6.5 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-500/20">
                      <Calendar className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-primary">Inquiry Logged Successfully</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                        Your request has been routed to Mr. Shyam S. Awate's desk. A confirmation email with a calendar slot has been dispatched to <span className="font-bold text-primary">{studentEmail}</span>.
                      </p>
                    </div>
                    <button
                      onClick={handleReset}
                      className="cursor-pointer px-5 py-2.5 bg-primary text-white font-bold rounded-xl text-xs hover:bg-primary/95 transition-colors"
                    >
                      Send Another Request
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
