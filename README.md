# Prince Jha | AI-Powered Personal Portfolio

A premium, interactive, and responsive developer portfolio website engineered with a modern Next.js single-project architecture. It features a fully integrated conversational AI assistant grounded on Prince Jha's background, projects, and skills.

---

## 🚀 Tech Stack

- **Frontend Framework**: [Next.js 14+](https://nextjs.org/) (App Router, React, JavaScript)
- **Styling & Theme**: [Tailwind CSS v4](https://tailwindcss.com/) + custom CSS variables for premium glassmorphism
- **Icon Suite**: [Lucide React](https://lucide.dev/)
- **Database Engine**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Large Language Model (LLM)**: [Google Gemini 3.5 Flash](https://aistudio.google.com/) via the official `@google/generative-ai` SDK

---

## ✨ Key Features

- **Dark Glassmorphic UI**: Curated color palettes (`#090d16` background, primary blue hover glows, dynamic background orbs, and custom scrollbars) ensuring a modern, fluid visual experience.
- **Dynamic AI Chatbot Assistant**:
  - **Context Grounding**: The model is seeded with system instructions detailing Prince's profile, academic marks (CGPI 9.25), personal highlights, projects, and tech stack.
  - **Custom Key Support**: Users can insert their own Gemini API key through the settings drawer in the chat panel, which gets saved securely in `localStorage`.
  - **Local Rule-Based Fallback**: If the Gemini API experiences a timeout/error or no key is provided, the chatbot automatically falls back to an offline JavaScript regular expression matching engine.
- **Intersection Observer Statistics**: Counters in the achievements section dynamically count up to their target values once they enter the viewport.
- **Contact Message Persistence**: Built-in contact form delivering payloads directly to MongoDB via a backend Next.js API route, providing real-time feedback states (Sending, Success, Error).
- **Serverless API Routes**: No separate Express.js server needed. All endpoints run as unified Next.js App Router API routes under `app/api/`.

---

## 🛠️ Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and [MongoDB](https://www.mongodb.com/) installed and running locally.

### 1. Environment Configuration

Copy the example environment file to create a local configuration file:

```bash
cp .env.example .env.local
```

Open `.env.local` and specify your credentials:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/prince_portfolio
```

*Note: You can obtain a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).*

### 2. Install Dependencies

Install the npm packages:

```bash
npm install
```

### 3. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

---

## 📁 Project Structure

```
Prince_Jha_Portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.js     # POST - AI chatbot conversational endpoint
│   │   ├── status/route.js   # GET - Server health check & key detection
│   │   └── contact/route.js  # POST - Form submit route to MongoDB
│   ├── globals.css           # Custom glassmorphic designs & Tailwind imports
│   ├── layout.jsx            # HTML wrappers, SEO tags, and Google Fonts
│   └── page.jsx              # Main home page component
├── components/               # Sub-section React components:
│   ├── Header.jsx            # Nav links & live backend status badge
│   ├── HeroSection.jsx       # Hero titles, bio, and animated orbitals
│   ├── AboutSection.jsx      # Overview cards & highlights list
│   ├── EducationSection.jsx  # BE, HSC, SSC timeline markers
│   ├── SkillsSection.jsx     # Technical skill chip grids
│   ├── ProjectsSection.jsx   # Featured projects cards
│   ├── AchievementsSection.jsx# Counter cards with observer animations
│   ├── ContactSection.jsx    # Contact forms with API connection
│   ├── Footer.jsx            # Copright details
│   └── ChatbotWidget.jsx     # Floating widget, drawer options, and markdown
├── lib/
│   ├── api.js                # Relative path fetch wrapper utility
│   └── db.js                 # Mongoose singleton connector
├── models/
│   └── Contact.js            # Mongoose Contact collection schema
├── public/
│   └── assets/
│       └── resume/           # Contains Prince_Jha_Resume.pdf
├── package.json
└── next.config.mjs
```

---

## 🚀 Deployment

The portfolio is designed to be easily deployed to [Vercel](https://vercel.com/):

1. Host the project repository on GitHub.
2. Link the repository to your Vercel account.
3. Configure the environment variables (`GEMINI_API_KEY` and `MONGODB_URI` from MongoDB Atlas) under the project settings.
4. Deploy! Next.js will automatically build the client code and deploy the serverless functions.
