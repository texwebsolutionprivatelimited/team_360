import React from 'react';
import { ScrollText, ChevronRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-base sm:text-lg font-serif font-black text-[#2A0D04] mb-3 flex items-center gap-2">
      <ChevronRight className="w-5 h-5 text-[#6B2D17] shrink-0" />
      {title}
    </h2>
    <div className="text-gray-600 text-sm sm:text-base leading-relaxed space-y-3 pl-0 sm:pl-7">
      {children}
    </div>
  </div>
);

export default function TermsAndConditions() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-[#FFF5EE] text-gray-900">

      {/* Page Header */}
      <div className="relative pt-2 pb-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-white/40 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-4">
            <ScrollText className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            Legal Agreement
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight mb-4 drop-shadow-sm">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Please read these terms carefully before using our website or purchasing our services.
          </p>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            Last updated: June 2026 &nbsp;·&nbsp; Team 360
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/70 border border-amber-200 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-sm">

          <Section title="Acceptance of Terms">
            <p>
              By accessing or using the <strong className="text-[#2A0D04]">Team 360</strong> website, purchasing
              any of our courses, workshops, or books, you agree to be bound by these Terms &amp; Conditions.
              If you do not agree, please do not use our services.
            </p>
          </Section>

          <Section title="Our Services">
            <p>Team 360 offers the following services:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Online and offline mind training courses, spiritual healing programs, and workshops.</li>
              <li>One-on-one healing attunement sessions and consultations with Devendra Sharma (D.D. Sharma).</li>
              <li>Transformational, self-development, and motivational books.</li>
              <li>Guided meditations and spiritual content via our blog and YouTube channels.</li>
            </ul>
            <p>
              We reserve the right to change, suspend, or discontinue any of our services at any time with
              reasonable notice.
            </p>
          </Section>

          <Section title="User Responsibilities">
            <p>When using our website and services, you agree to:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Provide accurate and truthful information when making a purchase or inquiry.</li>
              <li>Use our content, courses, and materials for personal use only — not for resale or redistribution.</li>
              <li>Treat our instructors, staff, and community members with respect.</li>
              <li>Not engage in any activity that could harm, disrupt, or misuse our website or services.</li>
            </ul>
          </Section>

          <Section title="Intellectual Property">
            <p>
              All content on the Team 360 website — including course materials, videos, guided
              meditations, blog posts, images, and branding — is the exclusive property of
              <strong className="text-[#2A0D04]"> Team 360</strong>.
            </p>
            <p>
              You may not copy, share, distribute, or use our content without our
              <strong className="text-[#2A0D04]"> prior written permission</strong>.
            </p>
          </Section>

          <Section title="Payments & Pricing">
            <p>
              All prices on our website are listed in <strong className="text-[#2A0D04]">Indian Rupees (INR)</strong>.
              We accept payments via UPI, bank transfer, credit/debit cards, and other available payment methods.
            </p>
            <p>
              Prices are subject to change at any time. Once a purchase is complete, the price you paid is final
              and will not be affected by future changes.
            </p>
          </Section>

          <Section title="Disclaimer — Spiritual Services">
            <p>
              Our courses, sessions, and books are designed to support your spiritual and personal well-being.
              They are <strong className="text-[#2A0D04]">not a substitute for professional medical, psychological,
              or legal advice</strong>.
            </p>
            <p>
              Results from spiritual healing practices may vary from person to person. We do not guarantee any
              specific outcomes. Always consult a qualified professional for medical or health concerns.
            </p>
          </Section>

          <Section title="Limitation of Liability">
            <p>
              To the fullest extent allowed by law, Team 360 and Devendra Sharma (D.D. Sharma) shall not be liable for
              any indirect, incidental, or consequential damages arising from your use of our services or
              books, even if we have been advised of the possibility of such damages.
            </p>
          </Section>

          <Section title="Third-Party Links">
            <p>
              Our website may contain links to third-party websites (e.g., YouTube, WhatsApp, social media).
              We are not responsible for the content or privacy practices of those sites. We encourage you to
              review their policies.
            </p>
          </Section>

          <Section title="Governing Law">
            <p>
              These Terms &amp; Conditions are governed by the laws of <strong className="text-[#2A0D04]">India</strong>.
              Any disputes will be resolved in the courts of <strong className="text-[#2A0D04]">Jaipur, Rajasthan, India</strong>.
            </p>
          </Section>

          <Section title="Changes to Terms">
            <p>
              We reserve the right to update these Terms &amp; Conditions at any time. Changes will be posted on
              this page with the updated date. Continued use of our services after changes are posted means you
              accept the updated terms.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about these Terms &amp; Conditions, please contact us:</p>
            <ul className="list-none space-y-2">
              <li>
                <a href="mailto:mindsetbadloaurcrorepatibano@gmail.com" className="inline-flex items-center gap-2 text-[#6B2D17] hover:underline font-semibold">
                  <Mail className="w-4 h-4 shrink-0" />
                  mindsetbadloaurcrorepatibano@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+916376779062" className="inline-flex items-center gap-2 text-[#6B2D17] hover:underline font-semibold">
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 63767 79062
                </a>
              </li>
            </ul>
          </Section>

          {/* Bottom links */}
          <div className="mt-10 pt-8 border-t border-amber-100 flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-[#6B2D17] transition-colors">Privacy Policy</Link>
            <Link to="/refund-policy" className="hover:text-[#6B2D17] transition-colors">Refund Policy</Link>
            <Link to="/" className="hover:text-[#6B2D17] transition-colors sm:ml-auto w-full sm:w-auto">← Back to Home</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

