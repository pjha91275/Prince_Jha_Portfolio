import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── System Instruction ───────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `You are the helpful AI assistant integrated into Prince Jha's personal portfolio website.
Your objective is to answer questions about Prince, his projects, skills, education, career, and achievements.

Here is Prince Jha's detailed profile:
- Name: Prince Jha
- Role: 3rd Year Computer Engineering Student & Full Stack Web Developer
- Education: 
  - Bachelor of Engineering (Computer Engineering) at Thakur College of Engineering and Technology, Mumbai University. 3rd Year (2024–2028). CGPI: 9.25.
  - XII (HSC) — Thakur College of Science & Commerce, Maharashtra State Board (2024): 78.83%.
  - X (SSC) — Himalaya High School, Maharashtra State Board (2022): 78.80%.
- Career Goal: To work as a Software Engineer at a top-tier product-based tech company, engineering scalable software and intelligent applications.
- Skills:
  - Programming Languages: C++, Java, JavaScript, TypeScript, Python, C
  - Frontend: React.js, Next.js, Redux Toolkit, HTML, CSS, Tailwind CSS, Bootstrap
  - Backend: Node.js, Express.js, RESTful APIs, EJS
  - Databases: MongoDB, PostgreSQL, MySQL, Mongoose
  - Tools & Platforms: Linux (Ubuntu), Git, GitHub, Postman, MongoDB Atlas, MongoDB Compass, Vercel, Render, VS Code, Antigravity IDE
  - CS Fundamentals: Object-Oriented Programming (OOP), Data Structures & Algorithms (DSA), DBMS, Operating Systems, Computer Networks
  - Data Science Library: NumPy
- Featured Projects:
  1. Quickzy: Full-Stack Quick Commerce Platform built with Next.js, React.js, JavaScript, Tailwind CSS, Node.js, MongoDB, Mongoose, NextAuth.js, Razorpay, Leaflet + LocationIQ address pinning, and a 6-module role-based admin dashboard.
  2. SkillBridge: Placement Preparation Platform built with Next.js, React.js, JavaScript, Tailwind CSS, Node.js, MongoDB, Mongoose, NextAuth.js, featuring a 100-point readiness scoring engine, ATS resume analysis, 10 technical role skill-gap assessments, a 19-topic DSA tracker, and Recharts analytics.
  3. StudentSetu: Student Development Passport Platform built with Next.js, React.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Prisma, NextAuth.js, featuring 5-role RBAC, an 18-model relational schema, individual project contribution tracking, and institutional analytics.
  4. InvestEase AI: Financial Wellness & Virtual Micro-Investment Platform built with Next.js, React.js, TypeScript, Tailwind CSS, MongoDB, Mongoose, NextAuth.js, and Google Gemini API — featuring automated spare-change sweeps, a 5-asset portfolio simulator with volatility market drift, in-browser Tesseract.js OCR receipt scanning, and an AI spending coach.
- Activities & Achievements:
  - 120+ DSA problems solved across LeetCode, CodeChef, GeeksforGeeks, and CodeStudio.
  - 40+ GitHub repositories with 700+ commits.
  - 15+ national-level hackathons participated. Advanced to finals in Odoo × SPIT Hackathon, Mumbai Hacks, IEEE Mega Project 8.0 (Top 8 Finalists), and InnovaHack Chapter 1 2026. Round 2 in Flipkart GRID 8.0.
  - 3rd Rank in Code Contest (competitive programming contest organized by Enginow).
- Contact:
  - Email: pjha91275@gmail.com
  - Phone: +91-8356928772
  - LinkedIn: linkedin.com/in/prince-jha-dev
  - GitHub: github.com/pjha91275
  - Portfolio: https://princejha.vercel.app

Guidelines:
1. Keep responses concise, accurate, and relevant. Format in friendly, professional Markdown.
2. Refer to Prince in third person or as his AI representative.
3. For general programming/tech questions unrelated to Prince, answer them normally and accurately.`;

// ─── Local Rule-Based Fallback ────────────────────────────────────────────────
function localPortfolioResponse(msg) {
  const m = msg.toLowerCase().trim();

  if (/\b(hello|hi|hey|greet|good morning|good afternoon)\b/.test(m))
    return "Hi there! I am Prince Jha's AI Portfolio Assistant.\n\nHow can I help you explore Prince's projects, skills, education, or career goals today?";

  if (/\b(portfolio|website|chat|agent|bot|purpose)\b/.test(m))
    return "This portfolio showcases Prince Jha's projects, skills, and achievements, featuring an AI assistant powered by Google Gemini API.";

  if (/\b(prince|about|who is|profile)\b/.test(m))
    return "**Prince Jha** is a 3rd Year Computer Engineering student at Thakur College of Engineering and Technology (TCET), Mumbai University (CGPI: 9.25). He is a Full Stack Web Developer proficient in Next.js, TypeScript, Node.js, PostgreSQL, and MongoDB, aiming to work as a Software Engineer at a top-tier product-based company.";

  if (/\b(education|study|college|tcet|cgpi|hsc|ssc)\b/.test(m))
    return "Prince Jha's academics:\n\n- **BE Computer Engineering (3rd Year, 2024–2028)** at TCET, Mumbai University — CGPI: **9.25**\n- **XII (HSC, 2024)** — Thakur College of Science & Commerce | **78.83%**\n- **X (SSC, 2022)** — Himalaya High School | **78.80%**";

  if (/\b(skills|languages|technologies|frontend|backend|database|tools)\b/.test(m))
    return "Prince Jha's technical skillset:\n\n- **Languages:** C++, Java, JavaScript, TypeScript, Python, C\n- **Frontend:** React.js, Next.js, Redux Toolkit, HTML, CSS, Tailwind CSS, Bootstrap\n- **Backend:** Node.js, Express.js, RESTful APIs, EJS\n- **Databases:** MongoDB, PostgreSQL, MySQL, Mongoose\n- **Tools:** Linux (Ubuntu), Git, GitHub, Postman, MongoDB Atlas, MongoDB Compass, Vercel, Render, VS Code, Antigravity IDE\n- **CS Fundamentals:** OOP, Data Structures & Algorithms, DBMS, OS, Computer Networks\n- **Data Science:** NumPy";

  if (/\b(projects|work|build|develop)\b/.test(m))
    return "Prince has built:\n\n- **Quickzy** — Full-stack quick commerce platform with Leaflet geolocation & Razorpay payments\n- **SkillBridge** — Placement preparation platform with 100-point readiness engine & ATS resume analysis\n- **StudentSetu** — Student Development Passport platform with 5-role RBAC & institutional analytics\n- **InvestEase AI** — Financial wellness & micro-investment platform with auto-sweeps, portfolio simulator & Gemini AI spending coach\n\nAsk me about a specific project for details!";

  if (/\b(investease|invest ease|finance|investment|micro-invest)\b/.test(m))
    return "💰 **InvestEase AI** is a Financial Wellness & Micro-Investment Platform:\n- Automatic spare-change sweeps on transactions (e.g. ₹0.35 saved on ₹421.65)\n- Real-time 5-asset portfolio simulator (Index, Mutual Funds, Stocks, Gold, Crypto) with market drift\n- In-browser Tesseract.js client-side OCR receipt scanner\n- Google Gemini AI Spending Coach & Financial Health Scoring Engine (0-100)\n\nLive Demo: [investease-ai.vercel.app](https://investease-ai.vercel.app/) | Code: [GitHub](https://github.com/pjha91275/InvestEase-AI)";

  if (/\b(quickzy|quick commerce)\b/.test(m))
    return "🛒 **Quickzy** is a Full-Stack Quick Commerce Platform:\n- Passwordless email auth with NextAuth.js & Brevo\n- Leaflet + LocationIQ geolocation address pinning\n- Persistent cart, wishlist, and Razorpay payment gateway\n- 6-module role-based admin dashboard with Next.js Server Actions & MongoDB";

  if (/\b(skillbridge|placement prep)\b/.test(m))
    return "🚀 **SkillBridge** is a Placement Preparation Platform:\n- 100-point readiness scoring engine & ATS resume analysis\n- Skill-gap assessment across 10 technical roles & learning roadmaps\n- 19-topic DSA tracker, Kanban goal tracking, and Recharts analytics";

  if (/\b(studentsetu|student setu|passport)\b/.test(m))
    return "🎓 **StudentSetu** is a Student Development Passport Platform:\n- Centralized, evidence-based verification workflows with 5-role RBAC\n- Individual project contribution tracking and demonstrated skills\n- 18-model relational schema with Prisma & PostgreSQL\n- Dynamic institutional analytics and print-ready NAAC/NBA reports";

  if (/\b(achievements|dsa|hackathon|ieee|contest|competit)\b/.test(m))
    return "Prince Jha's achievements:\n\n- **120+** DSA problems solved across LeetCode, CodeChef, GFG, and CodeStudio\n- **40+** GitHub repositories with **700+** commits\n- **15+** national hackathons participated (Top 8 Finalists at IEEE Mega Project 8.0, Finalist at Odoo × SPIT & Mumbai Hacks, Flipkart GRID 8.0 Round 2)\n- **3rd Rank** in Code Contest by Enginow";

  if (/\b(contact|email|phone|linkedin|github|reach)\b/.test(m))
    return "Reach Prince Jha:\n\n- 📧 **pjha91275@gmail.com**\n- 📞 **+91-8356928772**\n- 🐙 [github.com/pjha91275](https://github.com/pjha91275)\n- 💼 [linkedin.com/in/prince-jha-dev](https://linkedin.com/in/prince-jha-dev)\n- 🌐 [princejha.vercel.app](https://princejha.vercel.app)";

  return "🤖 *Local Fallback Mode Active*\n\nI can answer questions about Prince's **skills**, **education**, **projects** (Quickzy, SkillBridge, StudentSetu, InvestEase AI), **achievements**, and **contact details**. Try asking: *'Tell me about InvestEase AI'*.";
}

// ─── API Key Helper ───────────────────────────────────────────────────────────
function getApiKey(request) {
  const headerKey = request.headers.get("x-api-key");
  if (headerKey && headerKey.trim() && !headerKey.startsWith("your_"))
    return headerKey.trim();

  const envKey = process.env.GEMINI_API_KEY;
  if (envKey && envKey.trim() && !envKey.startsWith("your_"))
    return envKey.trim();

  return null;
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { message, history = [] } = body;

  if (!message || !message.trim()) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const apiKey = getApiKey(request);

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-3.5-flash",
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      // Map history to Gemini format
      const geminiHistory = history
        .filter((item) => item.text && item.text.trim())
        .map((item) => ({
          role: item.role === "assistant" ? "model" : "user",
          parts: [{ text: item.text }],
        }));

      const chat = model.startChat({ history: geminiHistory });
      const result = await chat.sendMessage(message);

      return NextResponse.json({
        response: result.response.text(),
        source: "gemini-api",
      });
    } catch (error) {
      console.error("Gemini API error:", error.message);
      const fallback = localPortfolioResponse(message);
      return NextResponse.json({
        response: `*(Gemini API error — falling back to local reasoning)*\n\n${fallback}`,
        source: "local-fallback",
        error: error.message,
      });
    }
  } else {
    return NextResponse.json({
      response: localPortfolioResponse(message),
      source: "local-fallback",
    });
  }
}
