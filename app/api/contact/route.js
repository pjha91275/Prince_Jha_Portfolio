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
          message: "Message received! (Note: DB not configured, message not persisted)",
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
