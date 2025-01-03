'use client';
import { useState } from 'react';
import { Container } from '@/components/Container';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message || 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.error || 'Failed to send the message.');
      }
    } catch (error) {
      setResponseMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-[#ED2939] dark:text-[#FF7070] mb-4">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Have questions or feedback? Reach out to us using the form below, and we’ll get back to you as soon as possible.
        </p>
      </div>

      {/* Response Message */}
      {responseMessage && (
        <div className="mb-6 text-center text-green-600 dark:text-green-400 font-semibold">
          {responseMessage}
        </div>
      )}

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
              disabled={isSubmitting}
              className={`px-6 py-3 text-white font-semibold rounded-md ${
                isSubmitting
                  ? 'bg-gray-400 dark:bg-gray-600'
                  : 'bg-[#ED2939] hover:bg-[#C62631] dark:bg-[#FF7070] dark:hover:bg-[#D44A4A]'
              } focus:outline-none transition duration-200`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
