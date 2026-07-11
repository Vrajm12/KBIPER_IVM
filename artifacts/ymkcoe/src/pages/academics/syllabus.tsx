import { AppLayout } from "@/components/layout/AppLayout";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useLocation } from "wouter";
import { 
  BookOpen, 
  GraduationCap, 
  ChevronDown, 
  FileDown, 
  Pill, 
  FlaskConical, 
  Microscope, 
  Leaf, 
  FileCheck, 
  Award, 
  Clock, 
  Layers, 
  Briefcase,
  HelpCircle
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";

interface Subject {
  code: string;
  name: string;
  type: "Theory" | "Practical" | "Theory & Lab";
  domain: "Pharmaceutics" | "Chemistry" | "Pharmacology" | "Pharmacognosy" | "Quality Assurance" | "Practice & Laws";
  credits: number;
  hoursPerWeek: string;
  keyUnits: string[];
  careerRelevance: string;
}

interface SemesterData {
  semesterName: string;
  subjects: Subject[];
}

interface YearData {
  yearName: string;
  semesters: SemesterData[];
}

interface ProgramData {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  bgAccent: string;
  iconColor: string;
  bannerGradient: string;
  stats: {
    totalCredits: string;
    schema: string;
    theoryCount: string;
    labCount: string;
    internship: string;
  };
  downloadUrl: string;
  fileSize: string;
  years: YearData[];
}

const SYLLABUS_DATABASE: Record<string, ProgramData> = {
  bpharm_fy: {
    title: "Bachelor of Pharmacy (FY)",
    subtitle: "B. Pharmacy (Revised Syllabus - FY only)",
    description: "The B.Pharm first year curriculum is designed under Pharmacy Council of India (PCI) guidelines to prepare competent pharmaceutical professionals. It covers the complete drug cycle—from design and organic synthesis to formulation development, analytical testing, pharmacological screening, and clinical trials.",
    accent: "text-blue-500",
    bgAccent: "bg-blue-600 hover:bg-blue-700",
    iconColor: "text-blue-400",
    bannerGradient: "from-blue-600/20 via-primary to-[#011a2a]",
    stats: {
      totalCredits: "50 Credits",
      schema: "Revised PCI Syllabus Schema",
      theoryCount: "8 Theory Modules",
      labCount: "6 Laboratory Practicals",
      internship: "General Orientation"
    },
    downloadUrl: "/documents/B_Pharm_New_Syllabus_FY.pdf",
    fileSize: "1.6 MB",
    years: [
      {
        yearName: "First Year",
        semesters: [
          {
            semesterName: "Semester I",
            subjects: [
              {
                code: "BP101T",
                name: "Human Anatomy and Physiology I",
                type: "Theory",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Integumentary & Skeletal System", "Muscular & Nervous System", "Cardiovascular & Lymphatic System", "Cell and Tissue Physiology"],
                careerRelevance: "Essential physiological foundation required for understanding drug action (Pharmacology) and diagnostics."
              },
              {
                code: "BP102T",
                name: "Pharmaceutical Analysis I",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Acid-Base & Oxidation-Reduction Titrations", "Precipitation & Gravimetric Titrations", "Complexometry & Diazotization Methods", "Sources of Impurities & Limit Tests"],
                careerRelevance: "Crucial for industrial Quality Control (QC) laboratories and testing chemical purities of materials."
              },
              {
                code: "BP103T",
                name: "Pharmaceutics I",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Dosage Forms Classification & Calculations", "Powders, Monophasic & Biphasic Liquids", "Suppositories & Pharmaceutical Incompatibilities", "Historical Background of Pharmacy and Pharmacopoeias"],
                careerRelevance: "The core science of drug compounding, manufacturing, and commercial dosage form formulations."
              },
              {
                code: "BP104T",
                name: "Pharmaceutical Inorganic Chemistry",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Gastrointestinal Agents & Electrolytes", "Topical Agents & Dental Products", "Essential Radiopharmaceuticals", "Limit tests for Heavy Metals & Arsenic"],
                careerRelevance: "Required for synthesis of inorganic drug compounds, minerals research, and diagnostic radiolabels."
              }
            ]
          },
          {
            semesterName: "Semester II",
            subjects: [
              {
                code: "BP201T",
                name: "Human Anatomy and Physiology II",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Central Nervous & Endocrine Systems", "Respiratory & Digestive Systems", "Urinary & Reproductive Systems", "Introduction to Genetics & Reproduction"],
                careerRelevance: "Enables clinical understanding of diseases and biological targets of pharmaceutical therapies."
              },
              {
                code: "BP202T",
                name: "Pharmaceutical Organic Chemistry I",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Isomerism & Nomenclature", "Alkanes, Alkenes & Conjugated Dienes", "Alkyl Halides & Carbonyl Compounds", "Carboxylic acids & Aliphatic Amines"],
                careerRelevance: "Core chemistry principles needed for designing synthetic pathways of API drug molecules."
              },
              {
                code: "BP203T",
                name: "Biochemistry",
                type: "Theory",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Biomolecules & Enzyme Kinetics", "Carbohydrate & Lipid Metabolism", "Biological Oxidation & Amino Acid Pathways", "Nucleic Acid Synthesis & Genetic Coding"],
                careerRelevance: "Essential for laboratory diagnostics, biotechnology research, and enzyme-inhibitor drug discovery."
              },
              {
                code: "BP204T",
                name: "Pathophysiology",
                type: "Theory",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Cell Injury & Inflammation Mechanism", "Cardiovascular & Endocrine Disorders", "Cancer & Immunological Diseases", "Infectious & Neurological Pathologies"],
                careerRelevance: "Provides clinical background on disease progression, vital for medical writers and drug design researchers."
              }
            ]
          }
        ]
      }
    ]
  },
  bpharm_sy_ty_final: {
    title: "Bachelor of Pharmacy (SY, TY & Final)",
    subtitle: "B. Pharmacy (Standard Syllabus - SY, TY & Final Year)",
    description: "The B.Pharm second, third and final year curriculum is designed under Pharmacy Council of India (PCI) guidelines. It covers advanced drug formulations, pharmacology, toxicology, regulatory compliance, quality control, and clinical evaluations.",
    accent: "text-blue-500",
    bgAccent: "bg-blue-600 hover:bg-blue-700",
    iconColor: "text-blue-400",
    bannerGradient: "from-blue-600/20 via-primary to-[#011a2a]",
    stats: {
      totalCredits: "158 Credits",
      schema: "Standard PCI Syllabus Schema",
      theoryCount: "24 Theory Modules",
      labCount: "14 Laboratory Practicals",
      internship: "150 Hours Training"
    },
    downloadUrl: "/documents/B_Pharm_Old_Syllabus_SY_TY_Final.pdf",
    fileSize: "1.6 MB",
    years: [
      {
        yearName: "Second Year",
        semesters: [
          {
            semesterName: "Semester III",
            subjects: [
              {
                code: "BP301T",
                name: "Pharmaceutical Organic Chemistry II",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Benzene & its derivatives", "Phenols & Aromatic Amines", "Fats and Oils Characterization", "Polynuclear Hydrocarbons & Cycloalkanes"],
                careerRelevance: "Used in active pharmaceutical ingredient chemical synthesis and structural properties studies."
              },
              {
                code: "BP302T",
                name: "Physical Pharmaceutics I",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Solubility of Drugs & Distribution Law", "States of Matter & Physicochemical Properties", "Surface & Interfacial Tension", "Complexation & Protein Binding"],
                careerRelevance: "Explains how physical attributes (solubility, stability) dictate a drug molecule's biological action."
              },
              {
                code: "BP303T",
                name: "Pharmaceutical Microbiology",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Structure and Staining of Bacteria/Fungi", "Sterilization Methods & Validation", "Disinfectants Screening & Aseptic Area Rules", "Microbiological Assays of Antibiotics & Vitamins"],
                careerRelevance: "Essential for maintaining sterile manufacturing zones in injectables and biotech production lines."
              },
              {
                code: "BP304T",
                name: "Pharmaceutical Engineering",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Fluid Flow, Heat Transfer & Evaporation", "Drying, Mixing & Size Reduction", "Filtration & Centrifugation operations", "Materials of Plant Construction & Corrosion"],
                careerRelevance: "Prerequisite for designing chemical plants, scaling formulations, and industrial manufacturing machinery."
              }
            ]
          },
          {
            semesterName: "Semester IV",
            subjects: [
              {
                code: "BP401T",
                name: "Pharmaceutical Organic Chemistry III",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Stereoisomerism & Optical Activity", "Geometrical Isomerism & Conformational Analysis", "Heterocyclic Compounds chemistry", "Important Name Reactions & Reagents"],
                careerRelevance: "Key in stereo-specific drug synthesis where stereochemistry alters therapeutic profiles."
              },
              {
                code: "BP402T",
                name: "Medicinal Chemistry I",
                type: "Theory & Lab",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Physicochemical properties in relation to drug action", "Drug metabolism pathways", "Autonomic Nervous System agents", "Sedatives, Hypnotics & Anticonvulsants"],
                careerRelevance: "Core drug discovery science bridging organic chemistry and pharmacological action."
              },
              {
                code: "BP403T",
                name: "Physical Pharmaceutics II",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Colloidal Dispersions & Micelles", "Rheology (Viscosity) & Thixotropy", "Coarse Dispersions (Suspensions & Emulsions)", "Micromeritics (Particle size & powder flow)"],
                careerRelevance: "Vital for designing stable suspensions, emulsions, gels, and optimizing tablet-pressing flow."
              },
              {
                code: "BP404T",
                name: "Pharmacology I",
                type: "Theory",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["General Pharmacology principles", "Pharmacokinetics (ADME)", "Pharmacodynamics (Receptor mechanisms)", "Drugs acting on Peripheral Nervous System"],
                careerRelevance: "Explains how drugs travel in the body and target receptors; fundamental for clinical pharmacy careers."
              }
            ]
          }
        ]
      },
      {
        yearName: "Third Year",
        semesters: [
          {
            semesterName: "Semester V",
            subjects: [
              {
                code: "BP501T",
                name: "Medicinal Chemistry II",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Antihistaminic & Antineoplastic agents", "Cardiovascular agents (Anti-anginals, Anti-hypertensives)", "Diuretics & Oral Hypoglycemic agents", "Thyroid hormones & Steroidal hormones"],
                careerRelevance: "Underpins research in designing cardiovascular and oncology drugs."
              },
              {
                code: "BP502T",
                name: "Industrial Pharmacy I",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Preformulation studies & solubility profiles", "Tablets formulation and coating technologies", "Liquid orals, Capsules & Parenterals (Injectables)", "Cosmetics & Pharmaceutical Packaging materials"],
                careerRelevance: "Translates lab formulations to mass industrial dosage form manufacturing processes."
              },
              {
                code: "BP503T",
                name: "Pharmacology II",
                type: "Theory",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Cardiovascular Pharmacology (CHF, Arrhythmia)", "Hematinics, Anticoagulants & Plasma Expanders", "Autacoids, Inflammation & Anti-gout drugs", "Hormones, Steroids & Thyroid pharmacology"],
                careerRelevance: "Necessary for clinical trial operations and understanding patient medication therapies."
              },
              {
                code: "BP504T",
                name: "Pharmacognosy and Phytochemistry II",
                type: "Theory",
                domain: "Pharmacognosy",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Metabolic Pathways in Plants (Shikimic, Acetate)", "Chemistry & extraction of Glycosides/Alkaloids", "Isolation & chromatography of phytoconstituents", "Industrial production of natural molecules"],
                careerRelevance: "Prepares students for natural medicines formulation, herbal QA, and nutraceutical industries."
              }
            ]
          },
          {
            semesterName: "Semester VI",
            subjects: [
              {
                code: "BP601T",
                name: "Medicinal Chemistry III",
                type: "Theory",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Antibiotics & Chemotherapeutic agents", "Antiviral, Antimalarial & Anti-TB drugs", "Antiseptics, Disinfectants & Antifungals", "Combinatorial Chemistry & QSAR studies"],
                careerRelevance: "Focuses on antimicrobial drug discovery, computer-aided structural optimizations."
              },
              {
                code: "BP602T",
                name: "Pharmacology III",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["Respiratory, Gastrointestinal & Renal drugs", "Chemotherapy & Immunopharmacology", "Toxicology & Chronic toxicity testing rules", "Chronopharmacology mechanisms"],
                careerRelevance: "Critical for safety profiling in pre-clinical studies and toxicity assays."
              },
              {
                code: "BP603T",
                name: "Herbal Drug Technology",
                type: "Theory",
                domain: "Pharmacognosy",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Herbal raw materials standardization & GMP", "Herbal cosmetics and nutraceutical regulations", "Patent laws & traditional knowledge database", "WHO guidelines for herbal assessments"],
                careerRelevance: "Key for Quality Control roles in herbal cosmetics and dietary supplement sectors."
              },
              {
                code: "BP604T",
                name: "Biopharmaceutics and Pharmacokinetics",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Drug absorption, distribution & elimination mechanisms", "Bioavailability and Bioequivalence (BA/BE) studies", "One & Two Compartment Pharmacokinetic models", "Nonlinear Pharmacokinetics & clearance calculations"],
                careerRelevance: "Essential for Clinical Research Organizations (CRO) carrying out human bioequivalence trials."
              }
            ]
          }
        ]
      },
      {
        yearName: "Fourth Year",
        semesters: [
          {
            semesterName: "Semester VII",
            subjects: [
              {
                code: "BP701T",
                name: "Instrumental Methods of Analysis",
                type: "Theory & Lab",
                domain: "Chemistry",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 4 Hours Lab",
                keyUnits: ["UV-Visible & Fluorimetry Spectroscopy", "Infrared & Flame Photometry Analysis", "Gas Chromatography & HPLC separations", "Paper & Thin Layer Chromatography techniques"],
                careerRelevance: "The definitive analytical expertise required for QA/QC chemical analysis in drug manufacturing."
              },
              {
                code: "BP702T",
                name: "Industrial Pharmacy II",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Pilot plant scale-up techniques", "Technology Transfer methodologies", "Regulatory requirements & CDSCO/USFDA filing rules", "Quality Management Systems (QMS, ISO, NABL)"],
                careerRelevance: "Vital for Technology Transfer and Regulatory Affairs positions scaling drugs from lab to factory."
              },
              {
                code: "BP703T",
                name: "Pharmacy Practice",
                type: "Theory",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Hospital Pharmacy & drug distribution systems", "Community Pharmacy & Patient counseling rules", "Therapeutic Drug Monitoring (TDM) & ADR reporting", "Inventory control and budget tracking in pharmacies"],
                careerRelevance: "Prepares students to operate clinical hospital pharmacies and work in community health consulting."
              },
              {
                code: "BP704T",
                name: "Novel Drug Delivery Systems (NDDS)",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Controlled & Sustained release mechanisms", "Microencapsulation & mucosal deliveries", "Targeted nanoparticles, liposomes & monoclonal antibodies", "Transdermal & ocular delivery developments"],
                careerRelevance: "Excellent for cutting-edge Formulation R&D careers focused on smart therapeutics."
              }
            ]
          },
          {
            semesterName: "Semester VIII",
            subjects: [
              {
                code: "BP801T",
                name: "Biostatistics and Research Methodology",
                type: "Theory",
                domain: "Quality Assurance",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Statistical measures & frequency distributions", "Parametric & Non-Parametric tests (t-test, ANOVA)", "Design of Experiments (DoE) in formulation", "Research design and scientific thesis structures"],
                careerRelevance: "Critical for clinical trial data analysis, research designs, and PhD preparations."
              },
              {
                code: "BP802T",
                name: "Social and Preventive Pharmacy",
                type: "Theory",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Concept of Health & Prevention measures", "National Health Programs (HIV, TB, Malaria controls)", "Nutritional health and hygiene principles", "Sociology and drug abuse prevention schemes"],
                careerRelevance: "Required for public health careers, WHO postings, and health NGO leadership."
              },
              {
                code: "BP803ET",
                name: "Pharma Marketing Management",
                type: "Theory",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Pharmaceutical market dynamics", "Product promotion & medical representative alignments", "Pricing policies & DPCO structures", "Sales forecasting & distribution networks"],
                careerRelevance: "Excellent preparation for sales management, product management (PMT), and marketing careers."
              },
              {
                code: "BP804ET",
                name: "Quality Control and Standardization",
                type: "Theory",
                domain: "Quality Assurance",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Quality control of herbal raw materials", "ICH guidelines for stability testing of drugs", "Validation of manufacturing processes", "GLP (Good Laboratory Practices) regulations"],
                careerRelevance: "Qualifies students for Quality Assurance (QA) executive roles in pharmaceutical plants."
              }
            ]
          }
        ]
      }
    ]
  },
  dpharm: {
    title: "Diploma in Pharmacy",
    subtitle: "D. Pharmacy (2-Year Annual Program)",
    description: "The D.Pharm curriculum is designed under Education Regulations 2020 (ER-20) of PCI. It delivers direct technical knowledge and practical training for community pharmacists, hospital store management, and drug dispensing operations.",
    accent: "text-emerald-500",
    bgAccent: "bg-emerald-600 hover:bg-emerald-700",
    iconColor: "text-emerald-400",
    downloadUrl: "/documents/D_Pharm_New_Syllabus.pdf",
    fileSize: "985 KB",
    bannerGradient: "from-emerald-600/20 via-primary to-[#011a2a]",
    stats: {
      totalCredits: "Yearly Scheme",
      schema: "PCI ER-20 Regulations",
      theoryCount: "11 Core Theory Subjects",
      labCount: "10 Practical Laboratories",
      internship: "500 Hours Hospital Pharmacy Training"
    },
    years: [
      {
        yearName: "First Year",
        semesters: [
          {
            semesterName: "Annual Subjects",
            subjects: [
              {
                code: "ER20-11T",
                name: "Pharmaceutics",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Packaging Materials & Preservatives", "Formulation of Tablets, Capsules, Liquids & Ointments", "Immunological Products & Sterilization methods", "Basic pharmaceutical calculations"],
                careerRelevance: "Teaches core compounding skills required to stock and dispense medications safely."
              },
              {
                code: "ER20-12T",
                name: "Pharmaceutical Chemistry",
                type: "Theory & Lab",
                domain: "Chemistry",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Chemical classification of therapeutic agents", "Purity limits & chemical assays", "Structure-Activity relationship guidelines", "Important diagnostic compounds"],
                careerRelevance: "Ensures safety and understanding of medicinal compound structures in dispensing."
              },
              {
                code: "ER20-13T",
                name: "Pharmacognosy",
                type: "Theory & Lab",
                domain: "Pharmacognosy",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Identification of crude natural drugs", "Aromatic oils, resins & plant alkaloids", "Ayurvedic formulation basics", "Natural fibers & surgical dressings"],
                careerRelevance: "Vital for identifying plant-based pharmaceutical materials and herbal supplements."
              },
              {
                code: "ER20-14T",
                name: "Human Anatomy & Physiology",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Cardiorespiratory system mechanics", "Digestive and nervous system operations", "Skeletal joints and muscular models", "Sensory organs and skin functions"],
                careerRelevance: "Ensures understanding of normal human anatomy during patient counseling."
              },
              {
                code: "ER20-15T",
                name: "Social Pharmacy",
                type: "Theory & Lab",
                domain: "Practice & Laws",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Epidemiology, health indicators & disease controls", "Nutrition, demographics & family planning", "First-aid measures and emergency responses", "Psychosocial drug use dynamics"],
                careerRelevance: "Prepares students to act as public health educators in communities."
              }
            ]
          }
        ]
      },
      {
        yearName: "Second Year",
        semesters: [
          {
            semesterName: "Annual Subjects",
            subjects: [
              {
                code: "ER20-21T",
                name: "Pharmacology",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Drug classifications & receptor targets", "Adverse drug reactions and toxicity limits", "Autonomic & Cardiovascular pharmacologies", "Chemotherapeutic agents action"],
                careerRelevance: "Vital for understanding side-effects and counseling patients on prescriptions."
              },
              {
                code: "ER20-22T",
                name: "Community Pharmacy & Management",
                type: "Theory & Lab",
                domain: "Practice & Laws",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Prescription validation & dispensing steps", "Patient counseling and medication adherence", "Retail drug store setups and records", "Digital health platforms in pharmacy"],
                careerRelevance: "Provides direct business and operations training for pharmacy owners."
              },
              {
                code: "ER20-23T",
                name: "Biochemistry & Clinical Pathology",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Pathological components in urine/blood", "Enzymatic diagnostics & enzyme panels", "Lipid & Protein deficiency indicators", "Electrolyte testing & homeostasis"],
                careerRelevance: "Essential for laboratory testing technicians and hospital pharmacists."
              },
              {
                code: "ER20-24T",
                name: "Pharmacotherapeutics",
                type: "Theory & Lab",
                domain: "Pharmacology",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Etiology & drug selection for Hypertension/Diabetes", "Respiratory & Infectious diseases treatments", "Psychiatric medications & skin therapies", "Clinical case reviews and algorithms"],
                careerRelevance: "Focuses on evidence-based drug selection for common diseases."
              },
              {
                code: "ER20-25T",
                name: "Hospital & Clinical Pharmacy",
                type: "Theory & Lab",
                domain: "Practice & Laws",
                credits: 5,
                hoursPerWeek: "3 Hours Theory / 3 Hours Lab",
                keyUnits: ["Inpatient and outpatient distribution", "Clinical workflows and medical records", "Drug information centers & poison reporting", "Radiopharmaceuticals safety controls"],
                careerRelevance: "Direct training for Government & Private hospital pharmacist positions."
              },
              {
                code: "ER20-26T",
                name: "Pharmacy Law & Ethics",
                type: "Theory",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "3 Hours",
                keyUnits: ["Drugs & Cosmetics Act 1940 & Rules 1945", "Pharmacy Act 1948 & regulatory councils", "Narcotic Drugs & Psychotropic Substances (NDPS)", "Code of Pharmaceutical Ethics"],
                careerRelevance: "Teaches compliance, avoiding legal issues, and ethical dispensing."
              }
            ]
          }
        ]
      }
    ]
  },
  mpharm: {
    title: "Master of Pharmacy",
    subtitle: "M. Pharmacy in Pharmaceutics (2-Year PG Program)",
    description: "The M.Pharm program delivers advanced training in research methodologies, product formulations development, and regulatory documentation. It bridges the gap between academic theory and high-tech industrial research & development (R&D).",
    accent: "text-[#F4B609]",
    bgAccent: "bg-[#F4B609] hover:bg-[#db9d00] text-black font-semibold",
    iconColor: "text-[#F4B609]",
    downloadUrl: "/documents/M_Pharm_Syllabus.pdf",
    fileSize: "3.8 MB",
    bannerGradient: "from-[#F4B609]/20 via-primary to-[#011a2a]",
    stats: {
      totalCredits: "95 Credits",
      schema: "PCI PG Curriculum",
      theoryCount: "8 Specialized Theory Modules",
      labCount: "2 Advanced Research Labs",
      internship: "1 Year Dedicated Research Projects"
    },
    years: [
      {
        yearName: "First Year",
        semesters: [
          {
            semesterName: "Semester I",
            subjects: [
              {
                code: "MPH101T",
                name: "Modern Pharmaceutical Analytical Techniques",
                type: "Theory & Lab",
                domain: "Quality Assurance",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 6 Hours Lab",
                keyUnits: ["UV, IR, NMR & Mass Spectrometry principles", "HPLC & Ultra Gas Chromatography methods", "Thermal Analysis (DSC, TGA, DTA)", "X-ray Crystallography structure analysis"],
                careerRelevance: "Equips research scholars to fully characterize and identify newly synthesized compounds."
              },
              {
                code: "MPH102T",
                name: "Drug Delivery System",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Sustained & Controlled Release matrices", "Targeted nanoparticles, liposomes & dendrimers", "Transdermal patch kinetics & design", "Occular and pulmonary drug distributions"],
                careerRelevance: "Core R&D training for developing advanced patentable drug formulations."
              },
              {
                code: "MPH103T",
                name: "Modern Pharmaceutics",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 6 Hours Lab",
                keyUnits: ["Preformulation science & drug-excipient compatibility", "Industrial scaling, validation & pilot plans", "Optimization techniques via Design of Experiments (DoE)", "Physics of tablet compressions & kinetics"],
                careerRelevance: "Necessary for production scientists managing large manufacturing plants."
              },
              {
                code: "MPH104T",
                name: "Regulatory Affairs",
                type: "Theory",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["IND, NDA, and ANDA approval pathways", "ICH stability test requirements", "CTD/eCTD dossier submissions guidelines", "Intellectual Property Rights (IPR) & patents"],
                careerRelevance: "Key for Regulatory Affairs positions managing international global drug exports."
              }
            ]
          },
          {
            semesterName: "Semester II",
            subjects: [
              {
                code: "MPH201T",
                name: "Molecular Pharmaceutics (Nano & Targeted DDS)",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 6 Hours Lab",
                keyUnits: ["Targeted drug deliveries & ligand-receptor binding", "Nanotechnology applications & solid lipid nanoparticles", "Gene therapy vectors and antisense technology", "Biodegradable polymers for implants"],
                careerRelevance: "Prerequisite for biotech research positions and oncology formulation setups."
              },
              {
                code: "MPH202T",
                name: "Advanced Biopharmaceutics & Pharmacokinetics",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Mechanisms of drug absorption & transport", "PK/PD modeling & in-vitro in-vivo correlation (IVIVC)", "Bioavailability (BA) and Bioequivalence (BE) assays", "Compartmental & Non-compartmental analysis"],
                careerRelevance: "Prepares scholars to manage clinical PK databases in pharma CRO research."
              },
              {
                code: "MPH203T",
                name: "Computer Aided Drug Development",
                type: "Theory",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Computers in formulation development & robotics", "Active targets modeling & molecular dockings", "Computational pharmacokinetic predictions (ADMET)", "Virtual trials & optimization modeling"],
                careerRelevance: "Highly relevant for modern dry labs, digital chemistry, and computational R&D."
              },
              {
                code: "MPH204T",
                name: "Cosmetic and Cosmeceuticals",
                type: "Theory & Lab",
                domain: "Pharmaceutics",
                credits: 4,
                hoursPerWeek: "4 Hours Theory / 6 Hours Lab",
                keyUnits: ["Cosmetic raw materials & skin structure biology", "Formulation of skin, hair & oral care cosmetics", "Regulatory control and safety testing of cosmetics", "Herbal and organic cosmeceuticals guidelines"],
                careerRelevance: "Prepares research scientists for careers in large cosmetic manufacturing companies."
              }
            ]
          }
        ]
      },
      {
        yearName: "Second Year",
        semesters: [
          {
            semesterName: "Semester III & IV",
            subjects: [
              {
                code: "MRM301T",
                name: "Research Methodology and Biostatistics",
                type: "Theory",
                domain: "Quality Assurance",
                credits: 4,
                hoursPerWeek: "4 Hours",
                keyUnits: ["Literature reviews & identifying research gaps", "CPCSEA animal ethics & CPCSEA guidelines", "Clinical trial designs & sample sizing", "Declaration of Helsinki guidelines"],
                careerRelevance: "Enables structural research thinking, preparation for dissertation, and thesis publications."
              },
              {
                code: "MJS401",
                name: "Journal Club & Seminar Presentation",
                type: "Practical",
                domain: "Practice & Laws",
                credits: 4,
                hoursPerWeek: "Weekly Reviews",
                keyUnits: ["Critical review of high-impact journal papers", "Presentation skills and research slides formulation", "Scientific argumentation & defense answers"],
                careerRelevance: "Crucial for academic careers and presenting technical details at conferences."
              },
              {
                code: "MRW402",
                name: "Research Work & Dissertation",
                type: "Practical",
                domain: "Pharmaceutics",
                credits: 28,
                hoursPerWeek: "Full-Time Research Lab",
                keyUnits: ["Execution of laboratory research protocols", "Data analysis, figures generation & writing", "Preparation of dissertation thesis and defense viva"],
                careerRelevance: "Provides core training for PhD study, pharmaceutical patents, or industrial formulation research."
              }
            ]
          }
        ]
      }
    ]
  }
};;

export default function Syllabus() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const course = params.course || "bpharm";
  const data = useMemo(() => {
    return SYLLABUS_DATABASE[course as keyof typeof SYLLABUS_DATABASE] || SYLLABUS_DATABASE.bpharm_fy;
  }, [course]);

  const [activeYearIdx, setActiveYearIdx] = useState(0);
  const [activeSemIdx, setActiveSemIdx] = useState(0);
  const [expandedSubjectCode, setExpandedSubjectCode] = useState<string | null>(null);

  // When course changes, reset selections
  useEffect(() => {
    setActiveYearIdx(0);
    setActiveSemIdx(0);
    setExpandedSubjectCode(null);
  }, [course]);

  // When year changes, reset semester to index 0
  useEffect(() => {
    setActiveSemIdx(0);
    setExpandedSubjectCode(null);
  }, [activeYearIdx]);

  const activeYear = data.years[activeYearIdx] || data.years[0];
  const activeSemester = activeYear.semesters[activeSemIdx] || activeYear.semesters[0];

  const handleDownload = (programName: string, filePath: string) => {
    toast({
      title: "Downloading Syllabus",
      description: `Downloading the official curriculum PDF for ${programName}...`,
    });
    
    const link = document.createElement("a");
    link.href = filePath;
    link.download = filePath.split("/").pop() || "syllabus.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getDomainIcon = (domain: Subject["domain"]) => {
    switch (domain) {
      case "Pharmaceutics":
        return <Pill className="w-4 h-4" />;
      case "Chemistry":
        return <FlaskConical className="w-4 h-4" />;
      case "Pharmacology":
        return <Microscope className="w-4 h-4" />;
      case "Pharmacognosy":
        return <Leaf className="w-4 h-4" />;
      case "Quality Assurance":
        return <Award className="w-4 h-4" />;
      case "Practice & Laws":
        return <FileCheck className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDomainColors = (domain: Subject["domain"]) => {
    switch (domain) {
      case "Pharmaceutics":
        return "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-800/30";
      case "Chemistry":
        return "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-800/30";
      case "Pharmacology":
        return "bg-red-50 text-red-700 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-800/30";
      case "Pharmacognosy":
        return "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-800/30";
      case "Quality Assurance":
        return "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-800/30";
      case "Practice & Laws":
        return "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-900/10 dark:text-sky-400 dark:border-sky-800/30";
      default:
        return "bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-800/30";
    }
  };

  return (
    <AppLayout>
      {/* Hero / Header Section */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 bg-primary text-white overflow-hidden">
        {/* Dynamic deep gradient background based on program type */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${data.bannerGradient}`} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
            
            {/* Left: Text Details */}
            <div className="lg:w-7/12 text-left">
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="inline-flex items-center gap-2 px-4.5 py-2 bg-white/10 text-accent rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm"
              >
                <GraduationCap className="w-4 h-4" /> Academic Syllabus
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none mb-4"
              >
                {data.title.split(' ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#e6d080] to-accent drop-shadow-md">
                  {data.title.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -30 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm md:text-base text-white/70 font-light max-w-xl leading-relaxed"
              >
                {data.description}
              </motion.p>
            </div>
            
            {/* Right: Program Quick Stats Dashboard Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-5/12 w-full"
            >
              <div className="relative bg-white/5 border border-white/10 p-6.5 rounded-3xl backdrop-blur-md shadow-2xl overflow-hidden group">
                {/* Background icon blur glow */}
                <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transform group-hover:scale-105 transition-all duration-500 pointer-events-none">
                  <BookOpen className="w-44 h-44 text-white" strokeWidth={0.5} />
                </div>
                
                <h3 className="text-sm font-extrabold uppercase tracking-widest text-accent mb-4 flex items-center gap-2">
                  <Layers className="w-4.5 h-4.5" /> Program Overview
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2.5">
                    <span className="text-white/60 font-medium">Regulation Schema</span>
                    <span className="text-white font-bold">{data.stats.schema}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2.5">
                    <span className="text-white/60 font-medium">Credits / Scope</span>
                    <span className="text-white font-bold">{data.stats.totalCredits}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2.5">
                    <span className="text-white/60 font-medium">Theory Subjects</span>
                    <span className="text-white font-bold">{data.stats.theoryCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2.5">
                    <span className="text-white/60 font-medium">Lab Modules</span>
                    <span className="text-white font-bold">{data.stats.labCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-1">
                    <span className="text-white/60 font-medium">Practical Experience</span>
                    <span className="text-white font-bold text-xs text-accent max-w-[200px] text-right truncate">{data.stats.internship}</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Syllabus Navigator Area */}
      <section className="py-12 md:py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Degree Tabs Switches */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-muted/80 backdrop-blur rounded-2xl border border-muted/50 shadow-sm gap-1.5 overflow-x-auto no-scrollbar max-w-full">
              {([
                { id: "dpharm", label: "D. Pharmacy" },
                { id: "bpharm_fy", label: "B. Pharmacy (FY)" },
                { id: "bpharm_sy_ty_final", label: "B. Pharmacy (SY, TY & Final)" },
                { id: "mpharm", label: "M. Pharmacy" }
              ] as const).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setLocation(`/syllabus/${tab.id}`)}
                  className={`cursor-pointer px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap ${course === tab.id ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-primary"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Download Card Section */}
          <div className="mb-10 bg-white border border-muted p-6 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-4.5">
              <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 text-primary shrink-0">
                <FileCheck className="w-7 h-7 text-accent animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-accent tracking-widest block mb-1">Official PCI Syllabus</span>
                <h2 className="text-lg font-extrabold text-primary leading-tight">{data.title}</h2>
                <p className="text-xs text-muted-foreground mt-0.5 max-w-lg leading-relaxed">{data.subtitle} - Complete curriculum framework details, credits, and rules.</p>
              </div>
            </div>
            <button 
              onClick={() => handleDownload(data.title, data.downloadUrl)}
              className="cursor-pointer w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/95 text-white text-xs font-bold rounded-xl shadow-md transition-all duration-300 hover:scale-[1.01] shrink-0"
            >
              <FileDown className="w-4.5 h-4.5 text-accent" /> Download Curriculum PDF ({data.fileSize})
            </button>
          </div>

          {/* Double Nav (Year Tab select + Sem select) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-muted pb-6 mb-10">
            
            {/* Year selections */}
            <div className="flex gap-2 bg-muted/30 p-1 rounded-xl border border-muted/50 w-full md:w-auto">
              {data.years.map((year, idx) => (
                <button
                  key={year.yearName}
                  onClick={() => setActiveYearIdx(idx)}
                  className={`cursor-pointer flex-1 md:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 ${
                    activeYearIdx === idx 
                      ? "bg-white text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {year.yearName}
                </button>
              ))}
            </div>

            {/* Semester selections */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              {activeYear.semesters.length > 1 && (
                <div className="flex gap-1.5 bg-muted/20 p-0.5 rounded-lg border border-muted/40">
                  {activeYear.semesters.map((sem, idx) => (
                    <button
                      key={sem.semesterName}
                      onClick={() => setActiveSemIdx(idx)}
                      className={`cursor-pointer px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 ${
                        activeSemIdx === idx 
                          ? "bg-primary text-white" 
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {sem.semesterName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Curriculum Listing Container */}
          <div className="space-y-6">
            <h3 className="text-xl font-extrabold text-primary mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-accent" /> Subjects of study in {activeYear.yearName} ({activeSemester.semesterName})
            </h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={`${course}-${activeYearIdx}-${activeSemIdx}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 gap-5"
              >
                {activeSemester.subjects.map((sub, idx) => {
                  const isExpanded = expandedSubjectCode === sub.code;
                  return (
                    <motion.div
                      layout="position"
                      key={sub.code}
                      className={`group border rounded-3xl overflow-hidden transition-all duration-300 bg-white ${
                        isExpanded 
                          ? "border-accent/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                          : "border-muted hover:border-accent/30 hover:shadow-sm"
                      }`}
                    >
                      {/* Interactive Header Block */}
                      <div 
                        onClick={() => setExpandedSubjectCode(isExpanded ? null : sub.code)}
                        className="cursor-pointer p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                      >
                        <div className="flex items-start md:items-center gap-4.5">
                          {/* Subject Code block */}
                          <span className="inline-flex items-center justify-center bg-muted text-primary text-xs font-black tracking-wider uppercase px-3 py-1.5 rounded-xl border border-muted-border">
                            {sub.code}
                          </span>
                          <div>
                            <h4 className="font-bold text-primary text-base md:text-lg group-hover:text-accent transition-colors leading-tight">
                              {sub.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-muted-foreground font-semibold">
                              <span>{sub.type}</span>
                              <span>•</span>
                              <span>{sub.credits} Credits</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {sub.hoursPerWeek}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Domain tag + toggle arrow */}
                        <div className="flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0 border-t border-muted/50 pt-3.5 md:pt-0 md:border-t-0">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${getDomainColors(sub.domain)}`}>
                            {getDomainIcon(sub.domain)} {sub.domain}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180 text-accent" : ""}`} />
                        </div>
                      </div>

                      {/* Expandable Details Container */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden border-t border-muted bg-muted/10"
                          >
                            <div className="p-6 md:p-8 space-y-6 text-sm">
                              {/* Key Syllabus Chapters */}
                              <div className="space-y-3">
                                <h5 className="text-xs font-extrabold uppercase tracking-wider text-accent flex items-center gap-1.5">
                                  <Layers className="w-4 h-4" /> Core Curriculum Units
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 pl-2">
                                  {sub.keyUnits.map((unit, index) => (
                                    <div key={index} className="flex gap-3 items-start">
                                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                        {index + 1}
                                      </div>
                                      <span className="text-primary font-medium">{unit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <hr className="border-muted" />

                              {/* Career / Industry relevance description */}
                              <div className="space-y-2">
                                <h5 className="text-xs font-extrabold uppercase tracking-wider text-accent flex items-center gap-1.5">
                                  <Briefcase className="w-4 h-4" /> Industry Application & Career Value
                                </h5>
                                <p className="text-muted-foreground leading-relaxed pl-2 italic">
                                  {sub.careerRelevance}
                                </p>
                              </div>
                              
                              {/* Extra help notice */}
                              <div className="flex gap-2 px-4 py-3 bg-white/60 border border-muted-border rounded-2xl text-xs text-muted-foreground mt-2">
                                <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                                <span>Note: Detailed laboratory guides, experiments lists, and recommended textbooks are available in the downloadable curriculum PDF.</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </section>
    </AppLayout>
  );
}
