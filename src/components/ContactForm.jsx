"use client";

import { useState } from "react";

/**
 * Temporary frontend-only contact form.
 * There is no backend yet, so this builds a mailto: link with the user's
 * message. When a backend exists, replace handleSubmit with a fetch() call.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "A valid email address is required.";
    }
    if (!message.trim() || message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    // Frontend-only approach: open the user's email client.
    const subject = encodeURIComponent(`ImageUtility Contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:contact@example.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
        <textarea
          id="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
        {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
      >
        Send Message
      </button>

      {sent && (
        <p className="text-sm text-green-600 dark:text-green-400">
          Your email client should have opened with your message ready to send.
        </p>
      )}
    </form>
  );
}
