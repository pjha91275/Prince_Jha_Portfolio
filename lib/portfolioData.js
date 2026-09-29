export const portfolioData = {
  personalInfo: {
    name: "Prince Jha",
    title: "Full-stack by day. Debugging by night. Shipping always.",
    role: "Computer Engineering Student",
    subtitles: [
      "Computer Engineering Student",
      "Full Stack Developer",
      "Aspiring Software Engineer"
    ],
    bio: "Third-year Computer Engineering student and full-stack software developer with hands-on experience building web applications across e-commerce, placement preparation, and student development platforms. Passionate about problem solving with 120+ DSA problems solved and participation in 15+ hackathons.",
    resumeLink: "/assets/resume/Prince_Jha_Resume.pdf",
    email: "pjha91275@gmail.com",
    github: "https://github.com/pjha91275",
    linkedin: "https://linkedin.com/in/prince-jha-dev",
    location: "Mumbai, India",
    phone: "+91-8356928772"
  },
  
  aboutCodeMockup: {
    fileName: "profile.py",
    code: `class PrinceJha:
    def __init__(self):
        self.name = "Prince Jha"
        self.role = "Computer Engineering Student"
        self.location = "Mumbai, India"
        
        # Tech Stack highlights
        self.skills = {
            "Languages": ["C++", "Java", "JavaScript", "TypeScript", "Python"],
            "Frontend": ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"],
            "Backend": ["Node.js", "Express.js", "RESTful APIs"],
            "Database": ["MongoDB", "PostgreSQL", "MySQL", "Mongoose"]
        }

    def get_career_goal(self):
        return "Software Engineer at a top-tier product-based company."`
  },

  aboutBio: {
    mainParagraphs: [
      "I am currently a 3rd Year Computer Engineering Student pursuing my Bachelor's degree at Thakur College of Engineering and Technology (TCET), Mumbai University (CGPI: 9.25). My technical expertise spans full-stack web development using Next.js, React.js, JavaScript, TypeScript, Node.js, MongoDB, and PostgreSQL.",
      "I develop production-ready platforms across e-commerce, placement preparation, and student development workflows, implementing secure authentication, payments, analytics, RBAC, and data-driven architectures. An avid problem solver, I have solved 120+ DSA problems and actively competed in 15+ national hackathons."
    ],
    careerGoal: "Become a Software Engineer at a top-tier product-based company, driving impactful tech initiatives.",
    highlights: [
      { text: "Based in Mumbai, India", icon: "MapPin" },
      { text: "Full Stack Developer (Next.js, TypeScript, PostgreSQL)", icon: "Code2" },
      { text: "120+ DSA Problems Solved & Strong CS Fundamentals", icon: "Lightbulb" },
      { text: "15+ Hackathons Participated & IEEE Mega Project Top 8", icon: "Users" },
      { text: "40+ Repositories & 700+ Commits on GitHub", icon: "TrendingUp" }
    ]
  },

  education: [
    { period: "3rd Year (2024 - 2028)", degree: "Bachelor of Engineering", field: "Computer Engineering", institute: "Thakur College of Engineering and Technology, Mumbai University", scoreLabel: "CGPI", scoreValue: "9.25" },
    { period: "2024", degree: "Higher Secondary Certificate (HSC)", field: "Science Stream", institute: "Thakur College of Science & Commerce, Maharashtra State Board", scoreLabel: "Percentage", scoreValue: "78.83%" },
    { period: "2022", degree: "Secondary School Certificate (SSC)", field: "General Education", institute: "Himalaya High School, Maharashtra State Board", scoreLabel: "Percentage", scoreValue: "78.80%" },
  ],

  skillCategories: [
    {
      iconKey: "Binary",
      title: "Languages",
      chips: ["C++", "Java", "JavaScript", "TypeScript", "Python", "C"],
    },
    {
      iconKey: "Layout",
      title: "Web Frontend",
      chips: ["React.js", "Next.js", "Redux Toolkit", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
    },
    {
      iconKey: "Server",
      title: "Web Backend",
      chips: ["Node.js", "Express.js", "RESTful APIs", "EJS"],
    },
    {
      iconKey: "Database",
      title: "Databases",
      chips: ["MongoDB", "PostgreSQL", "MySQL", "Mongoose"],
    },
    {
      iconKey: "Wrench",
      title: "Tools & Platforms",
      chips: ["Linux (Ubuntu)", "Git", "GitHub", "Postman", "MongoDB Atlas", "MongoDB Compass", "Vercel", "Render", "VS Code", "Antigravity IDE"],
    },
    {
      iconKey: "BookOpen",
      title: "CS Fundamentals",
      chips: ["Object-Oriented Programming", "Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
    },
    {
      iconKey: "BarChart2",
      title: "Data Science Library",
      chips: ["NumPy"],
    },
  ],

  projects: [
    {
      iconKey: "ShoppingBag",
      title: "Quickzy",
      type: "Full-Stack Quick Commerce Platform",
      desc: "Engineered a quick commerce platform featuring passwordless email authentication, geolocation with Leaflet + LocationIQ for delivery address pinning, persistent cart/wishlist, Razorpay payments, and an under 15-minute simulated delivery display with 4-state order flow.",
      features: [
        "Passwordless Auth via NextAuth.js & Brevo",
        "Leaflet + LocationIQ Geolocation Pinning",
        "Persistent Cart, Wishlist & Razorpay Payments",
        "6-Module Role-Based Admin Dashboard (Server Actions)"
      ],
      tech: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "Node.js", "MongoDB", "Mongoose", "NextAuth.js"],
      github: "https://github.com/pjha91275/Quickzy",
      demo: "https://quickzy-zap.vercel.app",
      image: "/assets/projects/quickzy.png"
    },
    {
      iconKey: "GraduationCap",
      title: "SkillBridge",
      type: "Placement Preparation Platform",
      desc: "Engineered a placement preparation platform with a 100-point readiness scoring engine, ATS resume analysis, company readiness evaluation, skill-gap assessment across 10 technical roles, career roadmaps, and curated study resources.",
      features: [
        "100-Point Readiness Scoring & ATS Resume Analysis",
        "Skill-Gap Assessment Across 10 Technical Roles",
        "19-Topic DSA Tracker & Kanban Goal Tracking",
        "Recharts Analytics & Role-Based Administration"
      ],
      tech: ["Next.js", "React.js", "JavaScript", "Tailwind CSS", "Node.js", "MongoDB", "Mongoose", "NextAuth.js"],
      github: "https://github.com/pjha91275/SkillBridge",
      demo: "https://skillbridgehq.vercel.app",
      image: "/assets/projects/skillbridge_dashboard.png"
    },
    {
      iconKey: "FileText",
      title: "StudentSetu",
      type: "Student Development Passport Platform",
      desc: "Engineered a centralized Student Development Passport platform for comprehensive student activity records, featuring 5-role RBAC, individual project contribution tracking, evidence-based verification workflows, and dynamic institutional analytics.",
      features: [
        "5-Role RBAC & Evidence-Based Verification Workflows",
        "Individual Project Contribution & Role Tracking",
        "18-Model Relational Schema with Prisma & PostgreSQL",
        "Dynamic Institutional Analytics & Print-Ready NAAC/NBA Reports"
      ],
      tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Prisma", "NextAuth.js"],
      github: "https://github.com/pjha91275/SIH_2026",
      demo: "https://student-setu-iota.vercel.app",
      image: "/assets/projects/studentsetu.png"
    },
    {
      iconKey: "TrendingUp",
      title: "InvestEase AI",
      type: "Financial Wellness & Micro-Investment Platform",
      desc: "A premium financial wellness and virtual micro-investment platform featuring automated spare-change sweeps, a 5-asset portfolio simulator with market drift, client-side Tesseract OCR receipt scanning, and a Gemini AI spending coach.",
      features: [
        "Automated Spare-Change Sweeps on Transaction Clearances",
        "5-Asset Portfolio Simulator with Volatility Market Drift",
        "In-Browser Client-Side Tesseract.js OCR Receipt Scanner",
        "Interactive Gemini AI Spending Coach & Health Scoring (0-100)"
      ],
      tech: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "MongoDB", "Mongoose", "NextAuth.js", "Google Gemini API"],
      github: "https://github.com/pjha91275/InvestEase-AI",
      demo: "https://investease-ai.vercel.app/",
      image: "/assets/projects/investease.png"
    },
  ],

  achievements: {
    counters: [
      { iconKey: "Code", target: 120, label: "DSA Problems Solved" },
      { iconKey: "FolderGit2", target: 40, label: "GitHub Repositories" },
      { iconKey: "GitCommit", target: 700, label: "GitHub Commits" },
      { iconKey: "Trophy", target: 15, label: "Hackathons Participated" },
    ],
    highlight: {
      title: "Top 8",
      subtitle: "IEEE Mega Project 8.0 Finalist & 15+ Hackathons Finalist",
      desc: "Finalist in Odoo × SPIT Hackathon, Mumbai Hacks, IEEE Mega Project 8.0 (Top 8 Finalists), InnovaHack Chapter 1 2026, Flipkart GRID 8.0 Round 2, and 3rd Rank in Enginow Code Contest."
    }
  }
};
