import React from "react";
import ContactView from "@/components/ContactView";

export const metadata = {
  title: "Contact Us | Art Gallery",
  description: "Get in touch with our Rosewood salon for bespoke curation and personalized gifting services.",
};

export default function ContactPage() {
  return (
    <main className="pt-12 md:pt-24 pb-24 min-h-screen bg-artBg">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center pt-8">
        <span className="text-[10px] tracking-[0.25em] font-semibold text-artDark/50 uppercase mb-3 block">
          Get In Touch
        </span>
        <h1 className="font-serif text-3xl md:text-5xl text-artDark font-light tracking-wide mb-4">
          Contact Us
        </h1>
        <div className="w-12 h-[2px] bg-artRose-dark/40 mx-auto" />
      </div>
      <ContactView />
    </main>
  );
}
