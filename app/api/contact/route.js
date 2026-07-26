import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Contact from "@/models/Contact";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { name, email, subject, message } = body;

  if (!name || !email || !subject || !message) {
    return NextResponse.json(
      { error: "All fields (name, email, subject, message) are required." },
      { status: 400 }
    );
  }

  // 1. Submit to Formspree
  let formspreeSuccess = false;
  try {
    const formspreeRes = await fetch("https://formspree.io/f/mwvgavwj", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message }),
    });
    formspreeSuccess = formspreeRes.ok;
  } catch (formspreeError) {
    console.error("Formspree submission error:", formspreeError.message);
  }

  // 2. Submit to MongoDB
  try {
    await connectDB();
    await Contact.create({ name, email, subject, message });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received! Prince will get back to you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact save error:", error.message);
    
    // Gracefully handle if MongoDB is not configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.startsWith("your_")) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received! Prince will get back to you shortly.",
        },
        { status: 200 }
      );
    }
    
    if (formspreeSuccess) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been sent via email successfully!",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Failed to save message. Please try again." },
      { status: 500 }
    );
  }
}
