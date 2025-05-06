'use client';
import { useState } from 'react';
import { Container } from '@/components/Container';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto URL with form data
    const subject = `Contact from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
    const mailtoUrl = `mailto:empirefootballgroupllc@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's email client
    window.location.href = mailtoUrl;
  };

  return (
    <Container className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] dark:text-[#FF7070] mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Have questions or feedback? Reach out to us using the form below, and we&apos;ll get back to you as soon as possible.
        </p>
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg max-w-3xl mx-auto">
          <p>Note: This form will open your email client to send your message while our contact system is being updated.</p>
        </div>
      </div>

      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#FF7070]"
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#FF7070]"
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-lg font-semibold text-gray-700 dark:text-gray-300"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ED2939] dark:focus:ring-[#FF7070]"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 text-white font-semibold rounded-md bg-[#ED2939] hover:bg-[#C62631] dark:bg-[#FF7070] dark:hover:bg-[#D44A4A] focus:outline-none transition duration-200"
            >
              Send Message via Email
            </button>
          </div>
          
          {/* Direct Email Link */}
          <div className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Or email us directly at:{' '}
            <a 
              href="mailto:empirefootballgroupllc@gmail.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              empirefootballgroupllc@gmail.com
            </a>
          </div>
        </div>
      </form>
    </Container>
  );
}