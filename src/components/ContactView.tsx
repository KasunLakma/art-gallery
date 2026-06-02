"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({
          type: "success",
          message: `Thank you for reaching out! We have received your inquiry.`,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        // Automatically hide notification after 5 seconds
        setTimeout(() => {
          setNotification(null);
        }, 5000);
      } else {
        setNotification({
          type: "error",
          message: data.error || "Failed to submit inquiry. Please try again.",
        });
      }
    } catch (error: any) {
      setNotification({
        type: "error",
        message: "An unexpected network error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Business Metadata Display */}
        <div className="space-y-8">
          <div>
            <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/40 uppercase mb-3 block">
              Boutique Location
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-artDark font-light tracking-wide mb-6">
              Our Rosewood Salon
            </h2>
            <p className="text-sm md:text-base text-artDark/60 leading-relaxed font-light mb-8 max-w-md">
              We welcome you to visit our physical showroom to experience the texture, fragrance, and craft of our curated keepsakes in person.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-artDark/50 mb-1">
                  Salon Address
                </h4>
                <p className="font-serif text-base text-artDark font-light">
                  128 Artistry Way, Suite 400<br />Rosewood, CA 90210
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-artDark/50 mb-1">
                  General & Support Email
                </h4>
                <p className="font-serif text-base text-artDark font-light hover:text-artRose-dark transition-colors duration-200">
                  hello@artgalleryboutique.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-artDark/50 mb-1">
                  Boutique Hotline
                </h4>
                <p className="font-serif text-base text-artDark font-light">
                  +1 (800) 555-0199
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-artRose-light/30 flex items-center justify-center text-artRose-dark flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-wider font-semibold text-artDark/50 mb-1">
                  Salon Hours
                </h4>
                <p className="font-serif text-base text-artDark font-light">
                  Mon – Sat: 10:00 AM – 7:00 PM<br />Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-white border border-artRose-light/30 rounded-2xl p-8 md:p-10 shadow-xs">
          <h3 className="font-serif text-lg md:text-xl text-artDark font-light tracking-wide mb-6 border-b border-artRose-light/20 pb-4">
            Send A Message
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 pt-6 pb-2 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300"
              />
              <label
                htmlFor="name"
                className="absolute left-4 top-1.5 text-[9px] font-semibold uppercase tracking-wider text-artRose-dark pointer-events-none transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-artDark/40 peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-artRose-dark"
              >
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 pt-6 pb-2 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-1.5 text-[9px] font-semibold uppercase tracking-wider text-artRose-dark pointer-events-none transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-artDark/40 peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-artRose-dark"
              >
                Email Address
              </label>
            </div>

            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 pt-6 pb-2 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300"
              />
              <label
                htmlFor="subject"
                className="absolute left-4 top-1.5 text-[9px] font-semibold uppercase tracking-wider text-artRose-dark pointer-events-none transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-artDark/40 peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-artRose-dark"
              >
                Subject
              </label>
            </div>

            <div className="relative">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 pt-6 pb-2 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-4 top-1.5 text-[9px] font-semibold uppercase tracking-wider text-artRose-dark pointer-events-none transition-all duration-200 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-artDark/40 peer-placeholder-shown:top-3.5 peer-focus:top-1.5 peer-focus:text-[9px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-artRose-dark"
              >
                How can we assist you?
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 hover:scale-[1.01] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border transition-all duration-500 animate-slide-in-right ${
          notification.type === "success" 
            ? "bg-white border-emerald-100 text-emerald-800" 
            : "bg-white border-rose-100 text-rose-800"
        }`}>
          {notification.type === "success" ? (
            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold uppercase tracking-wider">
              {notification.type === "success" ? "Message Sent" : "Submission Failed"}
            </span>
            <span className="text-sm font-light text-artDark/70">{notification.message}</span>
          </div>
          <button 
            type="button"
            onClick={() => setNotification(null)}
            className="ml-4 text-artDark/30 hover:text-artDark/60 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Animation Styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translate3d(100%, 0, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
