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
    bio: "I am a passionate Computer Engineering student focused on Full Stack Web Development, problem solving, and building scalable software solutions. I enjoy transforming innovative ideas into real-world projects.",
    resumeLink: "https://drive.google.com/file/d/1zSXDfPcrSPvWcmVW1YmSAWW1mpBpWy0e/view?usp=drive_link",
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
            "Languages": ["C++", "Java", "JavaScript", "Python"],
            "Frontend": ["React.js", "Next.js", "Tailwind CSS"],
            "Backend": ["Node.js", "Express.js", "REST APIs"],
            "Database": ["MongoDB", "MySQL", "Mongoose"]
        }

    def get_career_goal(self):
        return "Software Engineer at a top-tier product-based company."`
  },

  aboutBio: {
    mainParagraphs: [
      "I am currently a 3rd Year Computer Engineering Student pursuing my Bachelor's degree at Thakur College of Engineering and Technology (TCET), Mumbai. My academic journey is fueled by an intense passion for Software Engineering and emerging AI technologies.",
      "I thrive in fast-paced environments, actively participating in hackathons to engineer functional solutions in competitive timelines. I love continuous learning and adapting to modern software stacks."
    ],
    careerGoal: "Become a Software Engineer at a top-tier product-based company, driving impactful tech initiatives.",
    highlights: [
      { text: "Based in Mumbai, Maharashtra", icon: "MapPin" },
      { text: "Focused on Full Stack & AI Integrations", icon: "Code2" },
      { text: "Strong Problem-Solving & Algorithmic Mindset", icon: "Lightbulb" },
      { text: "Active Hackathon Participant & Collaborator", icon: "Users" },
      { text: "Constantly learning new architectures", icon: "TrendingUp" }
    ]
  },

  education: [
    { period: "2023 - Present", degree: "Bachelor of Engineering", field: "Computer Engineering", institute: "Thakur College of Engineering and Technology (TCET)", scoreLabel: "CGPI", scoreValue: "9.25" },
    { period: "2021 - 2023", degree: "Higher Secondary Certificate (HSC)", field: "Science Stream", institute: "Thakur College of Science & Commerce", scoreLabel: "Percentage", scoreValue: "78.83%" },
    { period: "2020 - 2021", degree: "Secondary School Certificate (SSC)", field: "General Education", institute: "Himalaya High School", scoreLabel: "Percentage", scoreValue: "78.80%" },
  ],

  skillCategories: [
    {
      iconKey: "Binary",
      title: "Languages",
      chips: ["C++", "Java", "JavaScript", "Python", "C"],
    },
    {
      iconKey: "Layout",
      title: "Web Frontend",
      chips: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"],
    },
    {
      iconKey: "Server",
      title: "Web Backend",
      chips: ["Node.js", "Express.js", "REST APIs", "EJS"],
    },
    {
      iconKey: "Database",
      title: "Databases",
      chips: ["MongoDB", "MySQL", "Mongoose"],
    },
    {
      iconKey: "Wrench",
      title: "Tools & Platforms",
      chips: ["Linux (Ubuntu)", "Git", "GitHub", "Postman", "MongoDB Atlas", "MongoDB Compass", "Vercel", "Render", "VS Code", "Antigravity IDE"],
    },
    {
      iconKey: "BookOpen",
      title: "CS Fundamentals",
      chips: ["Object-Oriented Programming", "DSA", "DBMS", "Operating Systems", "Computer Networks"],
    },
    {
      iconKey: "BarChart2",
      title: "Data Science",
      chips: ["NumPy"],
    },
  ],

  projects: [
    {
      iconKey: "GraduationCap",
      title: "SkillBridge",
      type: "Placement Preparation Platform",
      desc: "An intelligent web ecosystem designed to streamline placement prep for students.",
      features: ["Resume Analysis", "Placement Readiness Score", "Skill Gap Analysis", "Roadmaps & DSA Tracker"],
      tech: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "MongoDB", "Mongoose", "NextAuth.js"],
      github: "https://github.com/pjha91275/SkillBridge",
      demo: "https://skillbridgehq.vercel.app",
      image: "/assets/projects/skillbridge_dashboard.png"
    },
    {
      iconKey: "ShoppingBag",
      title: "Quickzy",
      type: "Quick Commerce Platform",
      desc: "High-performance quick-commerce web app built for rapid ordering and item delivery.",
      features: ["Secure Authentication", "Cart & Wishlist System", "Razorpay Payment Gateway", "Admin Product Dashboard"],
      tech: ["Next.js", "React.js", "Tailwind CSS", "Node.js", "MongoDB", "Mongoose", "NextAuth.js"],
      github: "https://github.com/pjha91275/Quickzy",
      demo: "https://quickzy-zap.vercel.app",
      image: "/assets/projects/quickzy.png"
    },
    {
      iconKey: "FileText",
      title: "Blog Management System",
      type: "Full Stack Blog Platform",
      desc: "A full stack content platform allowing developers to read, write, and render blogs.",
      features: ["JWT Secure Authentication", "Full Blog CRUD Actions", "Express Backend", "Markdown Blog Rendering"],
      tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express.js", "EJS", "MongoDB", "Mongoose", "JWT"],
      github: "https://github.com/pjha91275/Blog-Management-System",
      demo: "https://blog-management-system-kns5.onrender.com",
      image: "/assets/projects/blog.png"
    },
  ],

  achievements: {
    counters: [
      { iconKey: "Code", target: 100, label: "DSA Problems Solved" },
      { iconKey: "FolderGit2", target: 30, label: "GitHub Repositories" },
      { iconKey: "GitCommit", target: 550, label: "GitHub Commits" },
      { iconKey: "Trophy", target: 10, label: "Hackathons Participated" },
    ],
    highlight: {
      title: "Top 8",
      subtitle: "IEEE Mega Project Finalist",
      desc: "Qualified for offline final rounds of SPIT Hackathon, Mumbai Hacks and IEEE Mega Project 8.0."
    }
  }
};
