import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD,     // Your Gmail App Password
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,   // Your Gmail address
      to: process.env.RECIPIENT_EMAIL,    // Where you want to receive the emails
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    });

    return NextResponse.json(
      { message: 'Your message has been sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to send the message. Please try again later.' },
      { status: 500 }
    );
  }
}