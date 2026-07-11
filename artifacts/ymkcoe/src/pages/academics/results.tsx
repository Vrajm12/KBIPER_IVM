import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Award, 
  BookOpen,
  Target,
  FileSpreadsheet,
  GraduationCap
} from "lucide-react";

export default function Results() {
  const [activeTab, setActiveTab] = useState<"dpharm" | "bpharm" | "mpharm">("bpharm");
  const [bpharmYear, setBpharmYear] = useState<"24-25" | "23-24">("24-25");
  const [mpharmYear, setMpharmYear] = useState<"24-25" | "23-24">("24-25");

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700/15 via-primary to-[#011a2a]" />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/10 backdrop-blur-md">
              <Trophy className="w-7 h-7 text-accent animate-bounce" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              Results & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#e6d080]">Rankers</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-2xl mx-auto">
              Celebrating our students' outstanding performance and academic achievements across all pharmaceutical disciplines.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Main Course Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1.5">
              {([
                { id: "bpharm", label: "B. Pharmacy Rankers" },
                { id: "mpharm", label: "M. Pharmacy Rankers" },
                { id: "dpharm", label: "D. Pharmacy Analysis" }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer px-5.5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-md" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* D. PHARMACY ANALYSIS */}
            {activeTab === "dpharm" && (
              <motion.div
                key="dpharm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-12"
              >
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider rounded-full mb-2">
                    Summer-2026 Board Examinations
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-primary">D. Pharmacy Board Results Analysis</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* DCP II YEAR */}
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-6">
                    <div className="flex items-center justify-between border-b border-muted pb-4">
                      <h3 className="text-lg font-black text-primary">DCP II Year Result</h3>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                        79.16% Pass Rate
                      </span>
                    </div>

                    {/* Stats Box */}
                    <div className="grid grid-cols-3 gap-4 bg-muted/30 p-4.5 rounded-2xl">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Appeared</span>
                        <span className="text-lg font-black text-primary">24</span>
                      </div>
                      <div className="text-center border-x border-muted-border">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Passed</span>
                        <span className="text-lg font-black text-primary">19</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Distinction</span>
                        <span className="text-lg font-black text-emerald-600">42% <span className="text-xs font-medium text-muted-foreground block">(8 Stud.)</span></span>
                      </div>
                    </div>

                    {/* Toppers list */}
                    <div>
                      <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-4">Top 5 Rankers</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-semibold">
                          <thead>
                            <tr className="border-b border-muted text-muted-foreground font-bold">
                              <th className="pb-3.5 pl-2">Rank</th>
                              <th className="pb-3.5">Student Name</th>
                              <th className="pb-3.5 text-right pr-2">Percentage</th>
                            </tr>
                          </thead>
                          <tbody className="text-primary">
                            {([
                              { rank: "1st Rank", name: "Saloni Mohan", pct: "85.46%" },
                              { rank: "2nd Rank", name: "Yadav Priti Sanjaykumar", pct: "83.82%" },
                              { rank: "3rd Rank", name: "Tapkir Snehal Devidas", pct: "82.82%" },
                              { rank: "4th Rank", name: "Badhale Sakshi Gulab", pct: "80.09%" },
                              { rank: "5th Rank", name: "Yadav Gauri Maharajsingh", pct: "82.09%" }
                            ]).map((top, idx) => (
                              <tr key={idx} className="border-b border-muted/50 last:border-0 hover:bg-muted/10">
                                <td className="py-3 pl-2 flex items-center gap-1.5">
                                  {idx < 3 ? <Trophy className={`w-3.5 h-3.5 ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : 'text-amber-700'}`} /> : <Award className="w-3.5 h-3.5 text-blue-500" />}
                                  <span>{top.rank}</span>
                                </td>
                                <td className="py-3">{top.name}</td>
                                <td className="py-3 text-right pr-2 text-accent font-bold">{top.pct}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  {/* DCP I YEAR */}
                  <div className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] space-y-6">
                    <div className="flex items-center justify-between border-b border-muted pb-4">
                      <h3 className="text-lg font-black text-primary">DCP I Year Result</h3>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100">
                        78.37% Pass Rate
                      </span>
                    </div>

                    {/* Stats Box */}
                    <div className="grid grid-cols-3 gap-4 bg-muted/30 p-4.5 rounded-2xl">
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Appeared</span>
                        <span className="text-lg font-black text-primary">37</span>
                      </div>
                      <div className="text-center border-x border-muted-border">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Passed/ATKT</span>
                        <span className="text-lg font-black text-primary">29</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider block mb-1">Distinction</span>
                        <span className="text-lg font-black text-emerald-600">20.68% <span className="text-xs font-medium text-muted-foreground block">(6 Stud.)</span></span>
                      </div>
                    </div>

                    {/* Toppers list */}
                    <div>
                      <h4 className="text-xs font-extrabold text-accent uppercase tracking-widest mb-4">Top 5 Rankers</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs font-semibold">
                          <thead>
                            <tr className="border-b border-muted text-muted-foreground font-bold">
                              <th className="pb-3.5 pl-2">Rank</th>
                              <th className="pb-3.5">Student Name</th>
                              <th className="pb-3.5 text-right pr-2">Percentage</th>
                            </tr>
                          </thead>
                          <tbody className="text-primary">
                            {([
                              { rank: "1st Rank", name: "Pawar Omkar Prabhu", pct: "86.00%" },
                              { rank: "2nd Rank", name: "Shaikh Sadiya Javed", pct: "80.40%" },
                              { rank: "3rd Rank", name: "Kale Rohini Madanrao", pct: "77.70%" },
                              { rank: "4th Rank", name: "Kendale Shamal Santosh", pct: "75.70%" },
                              { rank: "5th Rank", name: "Nikam Sanskruti Ashok", pct: "73.50%" }
                            ]).map((top, idx) => (
                              <tr key={idx} className="border-b border-muted/50 last:border-0 hover:bg-muted/10">
                                <td className="py-3 pl-2 flex items-center gap-1.5">
                                  {idx < 3 ? <Trophy className={`w-3.5 h-3.5 ${idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : 'text-amber-700'}`} /> : <Award className="w-3.5 h-3.5 text-blue-500" />}
                                  <span>{top.rank}</span>
                                </td>
                                <td className="py-3">{top.name}</td>
                                <td className="py-3 text-right pr-2 text-accent font-bold">{top.pct}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* B. PHARMACY TO PERS */}
            {activeTab === "bpharm" && (
              <motion.div
                key="bpharm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Year switches */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setBpharmYear("24-25")}
                    className={`cursor-pointer px-5.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      bpharmYear === "24-25" 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-white text-muted-foreground border-muted hover:text-primary"
                    }`}
                  >
                    A.Y. 2024-25 Toppers
                  </button>
                  <button
                    onClick={() => setBpharmYear("23-24")}
                    className={`cursor-pointer px-5.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      bpharmYear === "23-24" 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-white text-muted-foreground border-muted hover:text-primary"
                    }`}
                  >
                    A.Y. 2023-24 Toppers
                  </button>
                </div>

                <div className="text-center pb-4">
                  <h2 className="text-2xl font-black text-primary">Bachelor of Pharmacy (B.Pharm) Rankers</h2>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Academic Year {bpharmYear === "24-25" ? "2024-25" : "2023-24"}</p>
                </div>

                {/* Toppers Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(bpharmYear === "24-25" ? [
                    {
                      class: "First Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Sonavne Shruti Somnath", score: "8.57 CGPA" },
                        { rank: "2nd", name: "Ms. Dabhade Samruddhi Shekhar", score: "8.52 CGPA" },
                        { rank: "3rd", name: "Ms. Chauhan Roshni Suryadev", score: "8.36 CGPA" }
                      ]
                    },
                    {
                      class: "Second Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Mr. Gade Yash Yogesh", score: "8.46 CGPA" },
                        { rank: "2nd", name: "Ms. Ghotkule Siddhi Sanjay", score: "8.30 CGPA" },
                        { rank: "3rd", name: "Ms. Thombre Kaveri Chandrakant", score: "8.12 CGPA" }
                      ]
                    },
                    {
                      class: "Third Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Rakshe Vaishnavi S. / Ms. Phule Sanskruti V.", score: "8.39 CGPA" },
                        { rank: "2nd", name: "Mr. Pukle Pranay Namdev", score: "8.26 CGPA" },
                        { rank: "3rd", name: "Ms. Mandave Namrata Ganpat", score: "8.22 CGPA" }
                      ]
                    },
                    {
                      class: "Final Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Navale Sakshi Bhausaheb", score: "8.75 CGPA" },
                        { rank: "2nd", name: "Ms. Bhondave Sakshi Uddhav", score: "8.38 CGPA" },
                        { rank: "3rd", name: "Ms. Gupta Muskan Sunil", score: "8.28 CGPA" }
                      ]
                    }
                  ] : [
                    {
                      class: "First Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Ghumare Sneha Sanjivan", score: "8.91 CGPA" },
                        { rank: "2nd", name: "Ms. Chorge Vedeeka Shyam", score: "8.77 CGPA" },
                        { rank: "3rd", name: "Ms. Gade Yash Yogesh", score: "8.50 CGPA" }
                      ]
                    },
                    {
                      class: "Second Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Rakshe Vaishnavi Sandip", score: "8.55 CGPA" },
                        { rank: "2nd", name: "Ms. Jadhav Shravasti Kaluram", score: "8.42 CGPA" },
                        { rank: "3rd", name: "Mr. Kajale Sanket Sabaji", score: "8.37 CGPA" }
                      ]
                    },
                    {
                      class: "Third Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Navale Sakshi Bhausaheb", score: "8.76 CGPA" },
                        { rank: "2nd", name: "Ms. Bhondave Sakshi Uddhav", score: "8.47 CGPA" },
                        { rank: "3rd", name: "Ms. Gupta Muskan Sunil", score: "8.27 CGPA" }
                      ]
                    },
                    {
                      class: "Final Year B.Pharm",
                      ranks: [
                        { rank: "1st", name: "Ms. Pragati Sambhaji Bhote", score: "8.90 CGPA" },
                        { rank: "2nd", name: "Mr. Vivek N. Singh / Ms. Shrushti N. Tilekar", score: "8.64 CGPA" },
                        { rank: "3rd", name: "Ms. Racchana Satish Lokhande", score: "8.62 CGPA" }
                      ]
                    }
                  ]).map((cls, idx) => (
                    <div key={idx} className="bg-white border border-muted p-5 md:p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5 hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2.5 border-b border-muted pb-3.5">
                        <GraduationCap className="w-5 h-5 text-accent" />
                        <h3 className="font-extrabold text-primary text-sm leading-tight">{cls.class}</h3>
                      </div>
                      <div className="space-y-4">
                        {cls.ranks.map((r, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-full text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5 ${
                              rIdx === 0 
                                ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                                : rIdx === 1 
                                  ? "bg-slate-400/10 text-slate-600 border border-slate-400/20" 
                                  : "bg-amber-700/10 text-amber-800 border border-amber-700/20"
                            }`}>
                              {r.rank}
                            </span>
                            <div>
                              <p className="text-xs font-semibold text-primary leading-snug">{r.name}</p>
                              <p className="text-[10px] font-bold text-accent mt-0.5">{r.score}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* M. PHARMACY TO PERS */}
            {activeTab === "mpharm" && (
              <motion.div
                key="mpharm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Year switches */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setMpharmYear("24-25")}
                    className={`cursor-pointer px-5.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      mpharmYear === "24-25" 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-white text-muted-foreground border-muted hover:text-primary"
                    }`}
                  >
                    A.Y. 2024-25 Toppers
                  </button>
                  <button
                    onClick={() => setMpharmYear("23-24")}
                    className={`cursor-pointer px-5.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                      mpharmYear === "23-24" 
                        ? "bg-primary text-white border-primary shadow-sm" 
                        : "bg-white text-muted-foreground border-muted hover:text-primary"
                    }`}
                  >
                    A.Y. 2023-24 Toppers
                  </button>
                </div>

                <div className="text-center pb-4">
                  <h2 className="text-2xl font-black text-primary">Master of Pharmacy (M.Pharm) Rankers</h2>
                  <p className="text-xs text-muted-foreground font-semibold mt-1">Academic Year {mpharmYear === "24-25" ? "2024-25" : "2023-24"}</p>
                </div>

                {/* Toppers Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(mpharmYear === "24-25" ? [
                    {
                      class: "M.Pharm (Pharmaceutics)",
                      ranks: [
                        { rank: "S.Y. 1st", name: "Ms. Pole Mayuri Namdeo / Ms. Shinde Dipali Bapurao", score: "8.37 CGPA" },
                        { rank: "S.Y. 2nd", name: "Ms. Giri Rasika Ravindra", score: "8.28 CGPA" },
                        { rank: "S.Y. 3rd", name: "Ms. Shinde Vaishnavi Shankar", score: "8.12 CGPA" },
                        { rank: "F.Y. 1st", name: "Ms. Patil Dimpal Ravindra", score: "8.54 CGPA" },
                        { rank: "F.Y. 2nd", name: "Ms. Maske Snehal Vikas", score: "8.31 CGPA" },
                        { rank: "F.Y. 3rd", name: "Ms. Medankar Ruchira Gurudas", score: "8.15 CGPA" }
                      ]
                    },
                    {
                      class: "M.Pharm (Pharmacology)",
                      ranks: [
                        { rank: "S.Y. 1st", name: "Ms. Shinde Shivanjali Bhau", score: "8.97 CGPA" },
                        { rank: "S.Y. 2nd", name: "Ms. Parhad Pooja Vilas", score: "8.84 CGPA" },
                        { rank: "S.Y. 3rd", name: "Ms. Kharmate Priyanka Bhimrao", score: "8.82 CGPA" },
                        { rank: "F.Y. 1st", name: "Ms. Dikole Dhanashree Rohidas", score: "8.58 CGPA" },
                        { rank: "F.Y. 2nd", name: "Mr. Dhavale Shubham Hanumant", score: "8.15 CGPA" },
                        { rank: "F.Y. 3rd", name: "Ms. Kudale Anushka Anil", score: "8.08 CGPA" }
                      ]
                    }
                  ] : [
                    {
                      class: "M.Pharm (Pharmaceutics)",
                      ranks: [
                        { rank: "F.Y. 1st", name: "Ms. Pole Mayuri Namdeo", score: "7.77 CGPA" },
                        { rank: "F.Y. 2nd", name: "Ms. Shinde Dipali Bapurao / Mr. Pawar Varun Satish", score: "7.69 CGPA" },
                        { rank: "F.Y. 3rd", name: "Ms. Shinde Dipali Bapurao", score: "7.62 CGPA" }
                      ]
                    },
                    {
                      class: "M.Pharm (Pharmacology)",
                      ranks: [
                        { rank: "F.Y. 1st", name: "Ms. Shinde Shivanjali Bhau", score: "8.77 CGPA" },
                        { rank: "F.Y. 2nd", name: "Ms. Parhad Pooja Vilas", score: "8.54 CGPA" },
                        { rank: "F.Y. 3rd", name: "Ms. Kamble Saloni A. / Ms. Sontakke Sakshi P. / Ms. Shinde Nilima B.", score: "8.38 CGPA" }
                      ]
                    }
                  ]).map((cls, idx) => (
                    <div key={idx} className="bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-6 hover:border-accent/40 transition-colors">
                      <div className="flex items-center gap-2.5 border-b border-muted pb-4">
                        <GraduationCap className="w-5 h-5 text-accent" />
                        <h3 className="font-extrabold text-primary text-base leading-tight">{cls.class}</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
                        {cls.ranks.map((r, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-3 border-b border-muted/30 pb-3 last:border-0">
                            <span className="w-11.5 h-6 rounded-full text-[9px] font-black uppercase tracking-wider bg-primary/5 text-primary border border-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                              {r.rank.split(" ")[0]} {r.rank.split(" ")[1]}
                            </span>
                            <div>
                              <p className="font-semibold text-primary leading-snug">{r.name}</p>
                              <p className="font-bold text-accent mt-0.5 text-[10px]">{r.score}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>
    </AppLayout>
  );
}
