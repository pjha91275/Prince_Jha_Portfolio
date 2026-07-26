import "./globals.css";

export const metadata = {
  title: "Prince Jha | AI-Powered Personal Portfolio",
  description:
    "Personal Portfolio of Prince Jha — Computer Engineering student at TCET Mumbai and Full Stack Web Developer, featuring an integrated AI Chatbot powered by Google Gemini API.",
  keywords: ["Prince Jha", "Portfolio", "Full Stack Developer", "React", "Next.js", "TCET"],
  authors: [{ name: "Prince Jha" }],
  icons: {
    icon: "/icon.png?v=3",
    shortcut: "/icon.png?v=3",
    apple: "/icon.png?v=3",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
