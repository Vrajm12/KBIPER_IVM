import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ArrowLeft, CheckCircle2, XCircle, FileCheck, Send, User, GraduationCap, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 'personal', title: "Personal Profile", icon: User },
  { id: 'academics', title: "Academic Credentials", icon: GraduationCap },
  { id: 'documents', title: "Mandatory Documents", icon: FileCheck },
  { id: 'result', title: "Eligibility Result", icon: ShieldAlert }
];

const DOCUMENTS_LIST = [
  "Aadhaar Card",
  "10th Marksheet",
  "12th Marksheet",
  "MHT-CET / NEET Scorecard",
  "Leaving Certificate (TC)",
  "Domicile Certificate",
  "Caste Certificate (If applicable)"
];

export default function CheckEligibility() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "B.Pharm",
    score12th: "",
    entranceScore: "",
    documents: [] as string[]
  });

  const [eligibilityResult, setEligibilityResult] = useState<{isEligible: boolean, missing: string[]}>({ isEligible: false, missing: [] });

  const nextStep = () => {
    setDirection(1);
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(s => Math.max(s - 1, 0));
  };

  const handleDocumentToggle = (doc: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.includes(doc) 
        ? prev.documents.filter(d => d !== doc)
        : [...prev.documents, doc]
    }));
  };

  const calculateEligibility = () => {
    setIsProcessing(true);
    setDirection(1);
    setStep(3); // Go to Result Step
    
    // Simulate server processing time
    setTimeout(() => {
      const missing = [];
      const score = parseFloat(formData.score12th);
      
      // Basic Eligibility Logic
      if (isNaN(score) || score < 45) {
        missing.push("Minimum 45% required in 12th Standard (PCB/PCM).");
      }
      
      if (!formData.documents.includes("12th Marksheet")) {
        missing.push("12th Marksheet is mandatory.");
      }
      if (!formData.documents.includes("MHT-CET / NEET Scorecard") && (formData.course === "B.Pharm" || formData.course === "M.Pharm")) {
        missing.push("A valid Entrance Scorecard (CET/NEET/GPAT) is required for this course.");
      }
      if (!formData.documents.includes("Domicile Certificate")) {
        missing.push("Domicile Certificate is required for Maharashtra State candidature.");
      }

      setEligibilityResult({
        isEligible: missing.length === 0,
        missing
      });
      setIsProcessing(false);
    }, 2500); // 2.5 seconds of fake loading for "Wow" factor
  };

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0
    })
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-muted/20 py-20 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Check Your <span className="text-accent">Eligibility</span></h1>
            <p className="text-muted-foreground text-lg">Use our interactive tool to instantly verify if you meet the criteria for your desired course.</p>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between mb-12 relative px-4 md:px-12">
            <div className="absolute left-8 right-8 md:left-16 md:right-16 top-1/2 -translate-y-1/2 h-1 bg-border z-0" />
            <div 
              className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 h-1 bg-accent z-0 transition-all duration-500 ease-out" 
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%`, maxWidth: 'calc(100% - 4rem)' }}
            />
            
            {STEPS.map((s, i) => {
              const StepIcon = s.icon;
              const isActive = i === step;
              const isPast = i < step;
              return (
                <div key={s.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-sm
                    ${isActive ? 'bg-primary border-primary text-white scale-110' : 
                      isPast ? 'bg-accent border-accent text-primary' : 'bg-white border-border text-muted-foreground'}`}
                  >
                    {isPast ? <CheckCircle2 className="w-6 h-6" /> : <StepIcon className="w-5 h-5" />}
                  </div>
                  <span className={`absolute top-14 text-xs font-semibold whitespace-nowrap transition-colors duration-300 hidden md:block
                    ${isActive ? 'text-primary' : isPast ? 'text-primary/80' : 'text-muted-foreground'}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-xl border border-muted overflow-hidden min-h-[500px] relative">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="p-8 md:p-12 absolute inset-0 overflow-y-auto"
              >
                
                {/* STEP 1: PERSONAL INFO */}
                {step === 0 && (
                  <div className="h-full flex flex-col justify-center max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-primary mb-6">Personal Details</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-sm font-semibold text-primary mb-1 block">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                          placeholder="e.g. Rahul Sharma"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="text-sm font-semibold text-primary mb-1 block">Email Address</label>
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                            placeholder="rahul@example.com"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-semibold text-primary mb-1 block">Phone Number</label>
                          <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                            placeholder="+91"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-primary mb-1 block">Course Interested In</label>
                        <select 
                          value={formData.course}
                          onChange={e => setFormData({...formData, course: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                        >
                          <option value="B.Pharm">B. Pharmacy (4 Years)</option>
                          <option value="D.Pharm">D. Pharmacy (2 Years)</option>
                          <option value="M.Pharm">M. Pharmacy (2 Years)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: ACADEMICS */}
                {step === 1 && (
                  <div className="h-full flex flex-col justify-center max-w-lg mx-auto">
                    <h2 className="text-2xl font-bold text-primary mb-2">Academic Scores</h2>
                    <p className="text-muted-foreground mb-6">Enter your latest academic results accurately for the evaluation engine.</p>
                    <div className="space-y-6">
                      <div className="bg-muted/30 p-6 rounded-2xl border border-muted">
                        <label className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center">1</span>
                          12th Standard (HSC) Score %
                        </label>
                        <p className="text-xs text-muted-foreground mb-3 pl-8">Aggregate percentage in PCB (Physics, Chemistry, Biology) or PCM.</p>
                        <input 
                          type="number" 
                          value={formData.score12th}
                          onChange={e => setFormData({...formData, score12th: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-lg font-bold text-primary"
                          placeholder="e.g. 65.5"
                        />
                      </div>
                      
                      <div className="bg-muted/30 p-6 rounded-2xl border border-muted">
                        <label className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center">2</span>
                          Entrance Exam Score (Optional)
                        </label>
                        <p className="text-xs text-muted-foreground mb-3 pl-8">MHT-CET percentile or NEET score.</p>
                        <input 
                          type="number" 
                          value={formData.entranceScore}
                          onChange={e => setFormData({...formData, entranceScore: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl border border-border focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all text-lg font-bold text-primary"
                          placeholder="e.g. 82.4"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DOCUMENTS */}
                {step === 2 && (
                  <div className="h-full flex flex-col justify-start max-w-2xl mx-auto pt-4">
                    <h2 className="text-2xl font-bold text-primary mb-2 text-center">Document Checklist</h2>
                    <p className="text-muted-foreground mb-8 text-center">Select the documents you currently possess. Missing documents may affect eligibility.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {DOCUMENTS_LIST.map(doc => {
                        const isSelected = formData.documents.includes(doc);
                        return (
                          <div 
                            key={doc}
                            onClick={() => handleDocumentToggle(doc)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 hover:shadow-md
                              ${isSelected ? 'border-accent bg-accent/5' : 'border-border bg-white hover:border-muted-foreground/30'}`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors
                              ${isSelected ? 'bg-accent text-primary' : 'bg-muted border border-border text-transparent'}`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className={`font-medium ${isSelected ? 'text-primary' : 'text-muted-foreground'}`}>
                              {doc}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: RESULT */}
                {step === 3 && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    {isProcessing ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-24 h-24 relative mb-6">
                          <div className="absolute inset-0 border-4 border-muted rounded-full" />
                          <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldAlert className="w-8 h-8 text-primary animate-pulse" />
                          </div>
                        </div>
                        <h2 className="text-2xl font-bold text-primary mb-2">Analyzing Profile...</h2>
                        <p className="text-muted-foreground">Checking criteria against current admission rules.</p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg"
                      >
                        {eligibilityResult.isEligible ? (
                          <>
                            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-green-50">
                              <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-4">Congratulations, {formData.name || 'Student'}!</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                              Based on the data provided, you appear to be <strong>eligible</strong> for the {formData.course} program. 
                              Your profile has been forwarded to our admission counsellors.
                            </p>
                            <div className="p-6 bg-accent/10 rounded-2xl border border-accent/20 mb-8">
                              <div className="flex items-center justify-center gap-3 text-accent font-bold mb-2">
                                <Send className="w-5 h-5" /> Details Sent Securely
                              </div>
                              <p className="text-sm text-primary/80">Our team will contact you at <strong>{formData.email || 'your email'}</strong> within 24 hours to guide you through the next steps.</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-red-50">
                              <XCircle className="w-12 h-12" />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-4">Action Required</h2>
                            <p className="text-lg text-muted-foreground mb-8">
                              Currently, your profile does not meet all the mandatory requirements for the {formData.course} program.
                            </p>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-left mb-8">
                              <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5" /> What's Missing:
                              </h3>
                              <ul className="space-y-3">
                                {eligibilityResult.missing.map((issue, idx) => (
                                  <li key={idx} className="flex items-start gap-3 text-red-800">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                    {issue}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                        <Button 
                          onClick={() => { setStep(0); setFormData({...formData, score12th: "", entranceScore: "", documents: []}); }}
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-white"
                        >
                          Check Another Profile
                        </Button>
                      </motion.div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Controls Footer */}
          {step < 3 && (
            <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto px-2">
              <Button 
                variant="ghost" 
                onClick={prevStep}
                disabled={step === 0}
                className={`gap-2 ${step === 0 ? 'opacity-0' : 'opacity-100'}`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              
              {step < 2 ? (
                <Button 
                  onClick={nextStep}
                  className="bg-primary text-white hover:bg-primary/90 gap-2 px-8 py-6 rounded-full shadow-lg"
                >
                  Next Step <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  onClick={calculateEligibility}
                  className="bg-accent text-primary hover:bg-accent/90 gap-2 px-8 py-6 rounded-full shadow-[0_0_30px_rgba(244,182,9,0.3)] font-bold"
                >
                  <ShieldAlert className="w-5 h-5" /> Check Eligibility Now
                </Button>
              )}
            </div>
          )}

        </div>
      </div>
    </AppLayout>
  );
}
