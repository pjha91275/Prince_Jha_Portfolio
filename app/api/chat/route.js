import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ─── System Instruction ───────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `You are the helpful AI assistant integrated into Prince Jha's personal portfolio website.
Your objective is to answer questions about Prince, his projects, skills, education, career, and achievements.

Here is Prince Jha's detailed profile:
- Name: Prince Jha
- Role: 3rd Year Computer Engineering Student & Full Stack Web Developer
- Education: Bachelor of Engineering (Computer Engineering) at Thakur College of Engineering and Technology (TCET), Mumbai. CGPI: 9.25. HSC: 78.83%. SSC: 78.80%.
- Career Goal: To work as a Software Engineer at a top-tier product-based tech company, engineering scalable software and intelligent applications.
- Skills:
  - Programming Languages: C++, Java, JavaScript, Python, C
  - Frontend: React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap
  - Backend: Node.js, Express.js, REST APIs, EJS
  - Databases: MongoDB, MySQL, Mongoose
  - Tools & Platforms: Linux (Ubuntu), Git, GitHub, Postman, MongoDB Atlas, MongoDB Compass, Vercel, Render, VS Code, Antigravity IDE
  - CS Fundamentals: Object-Oriented Programming (OOP), DSA, DBMS, Operating Systems, Computer Networks
  - Data Science Library: NumPy
- Featured Projects:
  1. SkillBridge: Placement preparation dashboard with resume parsing/analysis, readiness scoring, skill gap analysis, learning roadmaps, and DSA trackers.
  2. Quickzy: Quick Commerce storefront with secure auth, shopping cart, wishlist, Razorpay API, and admin dashboards.
  3. Blog Management System: Full stack blog with JWT auth, CRUD, Node/Express backend, MongoDB, and Markdown rendering.
- Achievements:
  - 100+ DSA problems solved.
  - 30+ GitHub repositories, 550+ commits.
  - 10+ hackathons participated.
  - Top 8 Finalist at IEEE Mega Project competition.
- Contact:
  - Email: pjha91275@gmail.com
  - Phone: +91 83569 28772
  - LinkedIn: linkedin.com/in/prince-jha-dev
  - GitHub: github.com/pjha91275/
  - Portfolio: https://princejha.vercel.appp

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
    return "**Prince Jha** is a 3rd Year Computer Engineering student at TCET, Mumbai. He is a Full Stack Web Developer and AI enthusiast aiming to work as a Software Engineer at a top-tier product-based company.";

  if (/\b(education|study|college|tcet|cgpi|hsc|ssc)\b/.test(m))
    return "Prince Jha's academics:\n\n- **BE Computer Engineering** at TCET, Mumbai — CGPI: **9.25**\n- **HSC** — Maharashtra State Board | **78.83%**\n- **SSC** — Maharashtra State Board | **78.80%**";

  if (/\b(skills|languages|technologies|frontend|backend|database|tools)\b/.test(m))
    return "Prince Jha's technical skillset:\n\n- **Languages:** C++, Java, JavaScript, Python, C\n- **Frontend:** React.js, Next.js, HTML, CSS, Tailwind CSS, Bootstrap\n- **Backend:** Node.js, Express.js, REST APIs, EJS\n- **Databases:** MongoDB, MySQL, Mongoose\n- **Tools:** Linux, Git, GitHub, Postman, MongoDB Atlas, Vercel, Render, VS Code\n- **CS Fundamentals:** OOP, DSA, DBMS, OS, CN\n- **Data Science:** NumPy";

  if (/\b(projects|work|build|develop)\b/.test(m))
    return "Prince has built:\n\n- **SkillBridge** — Placement prep with AI resume analysis & DSA tracker\n- **Quickzy** — Quick-commerce app with Razorpay payments\n- **Blog Management System** — Full stack blog with JWT auth & MongoDB\n\nAsk me about a specific project for details!";

  if (/\b(skillbridge|placement prep)\b/.test(m))
    return "🚀 **SkillBridge** is a Placement Preparation Platform:\n- AI Resume Analysis & Readiness Score\n- Skill Gap Analysis & learning roadmaps\n- DSA tracker & resume sync";

  if (/\b(quickzy|quick commerce)\b/.test(m))
    return "🛒 **Quickzy** is a Quick Commerce Platform:\n- JWT authentication & sessions\n- Shopping cart & wishlist\n- Razorpay payment integration\n- Admin product dashboard";

  if (/\b(blog|blogging)\b/.test(m))
    return "📝 **Blog Management System**:\n- JWT Secure Authentication\n- Full CRUD for blog articles\n- Node.js/Express backend with MongoDB\n- Markdown blog rendering";

  if (/\b(achievements|dsa|hackathon|ieee)\b/.test(m))
    return "Prince Jha's achievements:\n\n- **100+** DSA problems solved\n- **30+** GitHub repos, **550+** commits\n- **10+** hackathons participated\n- **Top 8 Finalist** at IEEE Mega Project";

  if (/\b(contact|email|phone|linkedin|github|reach)\b/.test(m))
    return "Reach Prince Jha:\n\n- 📧 **pjha91275@gmail.com**\n- 📞 **+91 83569 28772**\n- 🐙 [github.com/pjha91275](https://github.com/pjha91275/)\n- 💼 [linkedin.com/in/prince-jha-dev](https://linkedin.com/in/prince-jha-dev)";

  return "🤖 *Local Fallback Mode Active*\n\nI can answer questions about Prince's **skills**, **education**, **projects**, **achievements**, and **contact details**. Try asking: *'What is SkillBridge?'*";
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
