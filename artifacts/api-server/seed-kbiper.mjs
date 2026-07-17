import dotenv from "dotenv";
import pg from "pg";
import { createHash } from "crypto";

dotenv.config();

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Clear existing data
    await client.query("DELETE FROM placements");
    await client.query("DELETE FROM faculty");
    await client.query("DELETE FROM courses");
    await client.query("DELETE FROM news");
    await client.query("DELETE FROM admins");

    // 1. ADMIN
    const secret = process.env.SESSION_SECRET || "dev-secret";
    const hash = createHash("sha256").update("admin123" + secret).digest("hex");
    await client.query(
      "INSERT INTO admins (username, password_hash) VALUES ($1, $2)",
      ["admin", hash]
    );
    console.log("✓ Admin credentials seeded");

    // 2. COURSES (KBIPER Pharmacy Programs)
    const courses = [
      {
        name: "D. Pharmacy",
        department: "Diploma",
        type: "Diploma",
        duration: "2 Years",
        seats: 60,
        description: "Diploma in Pharmacy is a 2-year entry-level diploma course that provides the essential knowledge and skills required to practice as a pharmacist.",
        eligibility: "10+2 with Science",
        fees: "As per DTE / State Govt norms",
        is_active: true
      },
      {
        name: "B. Pharmacy",
        department: "Undergraduate",
        type: "Degree",
        duration: "4 Years",
        seats: 100,
        description: "Bachelor of Pharmacy is a 4-year undergraduate program focusing on health, clinical, and chemical sciences, preparing students for professional pharmacy roles.",
        eligibility: "10+2 with PCB/PCM and MHT-CET / NEET",
        fees: "As per Shikshan Shulka Samiti norms",
        is_active: true
      },
      {
        name: "M. Pharmacy (Pharmaceutics)",
        department: "Postgraduate",
        type: "Master",
        duration: "2 Years",
        seats: 15,
        description: "Specialized master program focusing on drug formulation, dosage design, and the process of turning a new chemical entity into a safe medication.",
        eligibility: "B.Pharm from PCI-approved college with GPAT score",
        fees: "As per Shikshan Shulka Samiti norms",
        is_active: true
      },
      {
        name: "M. Pharmacy (Pharmacology)",
        department: "Postgraduate",
        type: "Master",
        duration: "2 Years",
        seats: 15,
        description: "Specialized master program focusing on drug action, behavioral toxicology, cardiovascular screening, and how medicines interact with biological systems.",
        eligibility: "B.Pharm from PCI-approved college with GPAT score",
        fees: "As per Shikshan Shulka Samiti norms",
        is_active: true
      }
    ];

    for (const c of courses) {
      await client.query(
        `INSERT INTO courses (name, department, type, duration, seats, description, eligibility, fees, is_active)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [c.name, c.department, c.type, c.duration, c.seats, c.description, c.eligibility, c.fees, c.is_active]
      );
    }
    console.log("✓ 4 pharmacy courses seeded");

    // 3. FACULTY (KBIPER actual faculty)
    const faculty = [
      {
        name: "Dr. Sanjay R. Arote",
        designation: "Principal",
        department: "Pharmacology",
        qualification: "M. Pharm",
        specialization: "Advanced Pharmaceutical Research, Pharmacology validation",
        experience: 8,
        email: "sanjayr.arote@kbiper.edu.in",
        bio: "Dr. Sanjay R. Arote is a dedicated Principal in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Dr. Yogesh B. Zambare",
        designation: "Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Neuropharmacology, Behavioral Toxicology, Cardiovascular Screening",
        experience: 13,
        email: "yogesh.zambare@kbiper.edu.in",
        bio: JSON.stringify({
          bio: "Dr. Yogesh Zambare leads the pharmacology department and oversees the CPCSEA animal house facility. His research explores target receptors in neurodegenerative diseases like Alzheimer's and Parkinson's.",
          publications: "20+ Research and review articles in indexed journals",
          projects: "Collaborating with local hospitals for clinical research safety evaluations"
        }),
        isHOD: true
      },
      {
        name: "Dr. Amol S. Rakte",
        designation: "Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "amols.rakte@kbiper.edu.in",
        bio: "Dr. Amol S. Rakte is a dedicated Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: true
      },
      {
        name: "Dr. Ganesh R. Phadtare",
        designation: "Assoc. Professor",
        department: "Pharmacology",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Synthetic Organic Chemistry, Computer-Aided Drug Design (CADD), Spectroscopy",
        experience: 18,
        email: "ganesh.phadtare@kbiper.edu.in",
        bio: JSON.stringify({
          bio: "Dr. Phadtare specializes in the design and synthesis of bioactive molecules targeting metabolic disorders. His expertise lies in molecular docking, spectroscopic analysis, and chemical process optimization.",
          publications: "25+ Publications in high-impact international journals",
          projects: "Investigating lead molecules with potential anti-diabetic activities"
        }),
        isHOD: true
      },
      {
        name: "Dr. Mayuri V. Gurav",
        designation: "Assistant Professor",
        department: "Pharmacology",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacology validation",
        experience: 8,
        email: "mayuriv.gurav@kbiper.edu.in",
        bio: "Dr. Mayuri V. Gurav is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Dr. Payal K. Thorat",
        designation: "Assoc. Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "payalk.thorat@kbiper.edu.in",
        bio: "Dr. Payal K. Thorat is a dedicated Assoc. Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Mr. Shyam S. Awate",
        designation: "Assoc. Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "shyams.awate@kbiper.edu.in",
        bio: "Mr. Shyam S. Awate is a dedicated Assoc. Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Mugdha A. Joshi",
        designation: "Assoc. Professor",
        department: "Pharmacognosy",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacognosy validation",
        experience: 8,
        email: "mugdhaa.joshi@kbiper.edu.in",
        bio: "Ms. Mugdha A. Joshi is a dedicated Assoc. Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: true
      },
      {
        name: "Ms. Kadambari S. Ghatpande",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "kadambaris.ghatpande@kbiper.edu.in",
        bio: "Ms. Kadambari S. Ghatpande is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Priyanka A. Panmand",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "priyankaa.panmand@kbiper.edu.in",
        bio: "Ms. Priyanka A. Panmand is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Mrinali A. Kale",
        designation: "Assistant Professor",
        department: "Pharmacognosy",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacognosy validation",
        experience: 8,
        email: "mrinalia.kale@kbiper.edu.in",
        bio: "Ms. Mrinali A. Kale is a dedicated Assistant Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Shraddha S. Satkar",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "shraddhas.satkar@kbiper.edu.in",
        bio: "Ms. Shraddha S. Satkar is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Vikranti W. Koli",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "vikrantiw.koli@kbiper.edu.in",
        bio: "Ms. Vikranti W. Koli is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Sharda S. Kulkarni",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "shardas.kulkarni@kbiper.edu.in",
        bio: "Ms. Sharda S. Kulkarni is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Godavari K. Brahma",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "godavarik.brahma@kbiper.edu.in",
        bio: "Ms. Godavari K. Brahma is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Ashwini Joshi",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "ashwinijoshi@kbiper.edu.in",
        bio: "Ms. Ashwini Joshi is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Mr. Mahesh B. Gawade",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "maheshb.gawade@kbiper.edu.in",
        bio: "Mr. Mahesh B. Gawade is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Reshma B. Nehere",
        designation: "Assistant Professor",
        department: "Pharmacology",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacology validation",
        experience: 8,
        email: "reshmab.nehere@kbiper.edu.in",
        bio: "Ms. Reshma B. Nehere is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Pooja N. Sawant",
        designation: "Assistant Professor",
        department: "Pharmacology",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacology validation",
        experience: 8,
        email: "poojan.sawant@kbiper.edu.in",
        bio: "Ms. Pooja N. Sawant is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Nilam S. Patangare",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "nilams.patangare@kbiper.edu.in",
        bio: "Ms. Nilam S. Patangare is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Rasika R. Giri",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "rasikar.giri@kbiper.edu.in",
        bio: "Ms. Rasika R. Giri is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Vilasini R. Pandav",
        designation: "Assistant Professor",
        department: "Pharmacognosy",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacognosy validation",
        experience: 8,
        email: "vilasinir.pandav@kbiper.edu.in",
        bio: "Ms. Vilasini R. Pandav is a dedicated Assistant Professor in the Department of Pharmacognosy at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Reshma P. Dhakate",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "reshmap.dhakate@kbiper.edu.in",
        bio: "Ms. Reshma P. Dhakate is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Yogita C. Saraf",
        designation: "Assistant Professor",
        department: "Pharmaceutics",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutics validation",
        experience: 8,
        email: "yogitac.saraf@kbiper.edu.in",
        bio: "Ms. Yogita C. Saraf is a dedicated Assistant Professor in the Department of Pharmaceutics at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Mr. Dadagouda M. Birajdar",
        designation: "Assistant Professor",
        department: "Pharmaceutical Chemistry",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmaceutical Chemistry validation",
        experience: 8,
        email: "dadagoudam.birajdar@kbiper.edu.in",
        bio: "Mr. Dadagouda M. Birajdar is a dedicated Assistant Professor in the Department of Pharmaceutical Chemistry at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Ms. Sandhya V. Patil",
        designation: "Assistant Professor",
        department: "Pharmacology",
        qualification: "M. Pharm, Ph.D.",
        specialization: "Advanced Pharmaceutical Research, Pharmacology validation",
        experience: 8,
        email: "sandhyav.patil@kbiper.edu.in",
        bio: "Ms. Sandhya V. Patil is a dedicated Assistant Professor in the Department of Pharmacology at KBIPER, committed to academic mentoring and practical laboratory guidance.",
        isHOD: false
      },
      {
        name: "Dr. Gulab S. Shinde",
        designation: "HOD & Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "gulabs.shinde@kbiper.edu.in",
        bio: "Dr. Gulab S. Shinde is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: true
      },
      {
        name: "Mr. Mayur K. Lohkare",
        designation: "Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "mayurk.lohkare@kbiper.edu.in",
        bio: "Mr. Mayur K. Lohkare is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: false
      },
      {
        name: "Ms. Sohini A. Ganguly",
        designation: "Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "sohinia.ganguly@kbiper.edu.in",
        bio: "Ms. Sohini A. Ganguly is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: false
      },
      {
        name: "Ms. Ankita Vilas Berde",
        designation: "Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "ankitavilasberde@kbiper.edu.in",
        bio: "Ms. Ankita Vilas Berde is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: false
      },
      {
        name: "Ms. Komal A. Thakar",
        designation: "Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "komala.thakar@kbiper.edu.in",
        bio: "Ms. Komal A. Thakar is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: false
      },
      {
        name: "Ms. Shweta M. Mantri",
        designation: "Lecturer",
        department: "D. Pharmacy",
        qualification: "M. Pharm",
        specialization: "Dispensing, Drug Store & Business Management",
        experience: 5,
        email: "shwetam.mantri@kbiper.edu.in",
        bio: "Ms. Shweta M. Mantri is a Lecturer in the D. Pharmacy division at KBIPER, focusing on retail and hospital pharmacy training.",
        isHOD: false
      }
    ];

    for (const f of faculty) {
      await client.query(
        `INSERT INTO faculty (name, department, designation, qualification, specialization, experience, email, photo_url, bio, is_hod)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [f.name, f.department, f.designation, f.qualification, f.specialization, f.experience, f.email, f.photoUrl || null, f.bio, f.isHOD]
      );
    }
    console.log(`✓ ${faculty.length} faculty seeded`);

    // 4. PLACEMENTS (Realistic KBIPER Pharmacy Placements)
    const placements = [
      {
        student_name: "Amit Sharma",
        company: "Cipla",
        package: "4.2 LPA",
        role: "Quality Control Analyst",
        department: "B. Pharmacy",
        year: 2025,
        testimonial: "The rigorous formulation labs at KBIPER gave me the practical knowledge to ace my placement interview with Cipla."
      },
      {
        student_name: "Sneha Jagtap",
        company: "Sun Pharmaceutical Industries",
        package: "4.8 LPA",
        role: "Production Officer",
        department: "B. Pharmacy",
        year: 2025,
        testimonial: "Very thankful for the soft skills workshops organized by our placement cell which helped me speak confidently in the interview."
      },
      {
        student_name: "Rohan Deshpande",
        company: "Dr. Reddy's Laboratories",
        package: "5.5 LPA",
        role: "Research Associate",
        department: "M. Pharmacy (Pharmaceutics)",
        year: 2025,
        testimonial: "My PG dissertation project at KBIPER in drug delivery systems directly aligned with Dr. Reddy's R&D requirements."
      },
      {
        student_name: "Kirti Mahajan",
        company: "Lupin Limited",
        package: "4.0 LPA",
        role: "Management Trainee",
        department: "B. Pharmacy",
        year: 2025,
        testimonial: "An amazing journey at KBIPER. Faculty support and hands-on exposure in analytical chemistry made all the difference."
      },
      {
        student_name: "Aditya Jadhav",
        company: "Cognizant Life Sciences",
        package: "4.5 LPA",
        role: "Pharmacovigilance Executive",
        department: "M. Pharmacy (Pharmacology)",
        year: 2025,
        testimonial: "Pharmacology sessions at KBIPER built my data analysis and adverse reaction logging skills, critical for this role."
      },
      {
        student_name: "Pratiksha Kulkarni",
        company: "Zydus Lifesciences",
        package: "3.8 LPA",
        role: "Quality Assurance Officer",
        department: "B. Pharmacy",
        year: 2024,
        testimonial: "KBIPER has state-of-the-art laboratory instrumentation which prepared me for standard operating procedures in QC."
      },
      {
        student_name: "Abhishek Shinde",
        company: "Macleods Pharmaceuticals",
        package: "3.6 LPA",
        role: "Production Officer",
        department: "B. Pharmacy",
        year: 2024,
        testimonial: "The college placement team guided us through mock aptitude tests and group discussions which was extremely beneficial."
      },
      {
        student_name: "Trupti Patil",
        company: "Cipla",
        package: "4.0 LPA",
        role: "Quality Control Analyst",
        department: "B. Pharmacy",
        year: 2024,
        testimonial: "Doing my internship at a local manufacturing plant (via KBIPER's MoUs) gave me industry exposure before graduating."
      },
      {
        student_name: "Nilesh Ghadge",
        company: "Glenmark Pharmaceuticals",
        package: "5.2 LPA",
        role: "Research Associate",
        department: "M. Pharmacy (Pharmaceutics)",
        year: 2024,
        testimonial: "Mastering HPLC and dissolution calibration during my training course helped me stand out in the Glenmark panel interview."
      },
      {
        student_name: "Priya Rokade",
        company: "Cognizant Life Sciences",
        package: "4.2 LPA",
        role: "Pharmacovigilance Executive",
        department: "B. Pharmacy",
        year: 2023,
        testimonial: "Fascinating curriculum and placement prep. Glad to land a clinical data analyst job straight out of college."
      }
    ];

    for (const p of placements) {
      await client.query(
        `INSERT INTO placements (student_name, company, package, role, department, year, testimonial)
         VALUES ($1,$2,$3,$4,$5,$6,$7)`,
        [p.student_name, p.company, p.package, p.role, p.department, p.year, p.testimonial]
      );
    }
    console.log(`✓ ${placements.length} placements seeded`);

    // 5. NEWS / ANNOUNCEMENTS
    const news = [
      {
        title: "Admissions Open for Pharmacy Programs 2026-27",
        content: "Krishnarao Bhegade Institute of Pharmaceutical Education and Research (KBIPER) invites applications for admissions for academic year 2026-27. Programs offered: D. Pharmacy (60 seats), B. Pharmacy (100 seats), M. Pharmacy Pharmaceutics (15 seats), and M. Pharmacy Pharmacology (15 seats). AICTE Approved & PCI Recognized. Secure your seat today!",
        category: "announcement",
        published_at: new Date("2026-05-01"),
        is_pinned: true
      },
      {
        title: "National Conference on Future Horizons in Pharmaceutical Research",
        content: "KBIPER is organizing a 2-day national level conference on 'Future Horizons in Drug Formulation & Clinical Pharmacology' on 18th-19th September 2026. Renowned scientists and researchers from major pharma research labs will share insights. Abstract submission opens on August 1st.",
        category: "event",
        published_at: new Date("2026-06-15"),
        is_pinned: true
      },
      {
        title: "100% Placements Record in M.Pharm Batch",
        content: "KBIPER Training and Placement Cell is proud to announce 100% placement for our postgraduate students of M.Pharm (Pharmaceutics and Pharmacology) in leading companies including Sun Pharma, Cipla, and Cognizant. Heartiest congratulations to all our young pharmacists!",
        category: "achievement",
        published_at: new Date("2026-04-10"),
        is_pinned: false
      }
    ];

    for (const n of news) {
      await client.query(
        `INSERT INTO news (title, content, category, published_at, is_pinned)
         VALUES ($1,$2,$3,$4,$5)`,
        [n.title, n.content, n.category, n.published_at, n.is_pinned]
      );
    }
    console.log("✓ News announcements seeded");

    await client.query("COMMIT");
    console.log("\n✅ Database seeded successfully with KBIPER Pharmacy data!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Seed failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
