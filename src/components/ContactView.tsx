"use client";

import React, { useState } from "react";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! We will get back to you shortly.`);
    setFormData({ name: "", email: "", message: "" });
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
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Isabella Mercer"
                className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. isabella@example.com"
                className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-artDark/50 mb-2">
                How can we assist you?
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your inquiry or customized gifting request..."
                className="w-full bg-artBg/50 border border-artRose-light/60 rounded-xl px-4 py-3 text-sm text-artDark focus:border-artRose focus:ring-1 focus:ring-artRose/50 outline-none transition-all duration-300 placeholder:text-artDark/30 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-artDark text-white font-medium tracking-wider uppercase py-4 rounded-full shadow-sm hover:bg-artRose-dark transition-all duration-300 hover:scale-[1.01] active:scale-98"
            >
              Submit Inquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
