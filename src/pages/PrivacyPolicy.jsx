import React from 'react';
import { ShieldCheck, ChevronRight, Mail, Phone } from 'lucide-react';
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

export default function PrivacyPolicy() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-[#FFF5EE] text-gray-900">

      {/* Page Header */}
      <div className="relative pt-2 pb-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-white/40 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-4">
            <ShieldCheck className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            Legal &amp; Trust
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight mb-4 drop-shadow-sm">
            Privacy Policy
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            We respect your privacy. Here is how we collect, use, and protect your personal information.
          </p>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            Last updated: June 2025 &nbsp;·&nbsp; Team 360
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/70 border border-amber-200 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-sm">

          <Section title="Introduction">
            <p>
              Welcome to <strong className="text-[#2A0D04]">Team 360</strong> ("we", "us", or "our"). We are
              committed to protecting your personal information and your right to privacy. This Privacy Policy
              explains how we collect, use, and share information when you visit our website or purchase our
              courses, workshops, and crystal products.
            </p>
          </Section>

          <Section title="Information We Collect">
            <p>We collect information you give us directly, such as:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Your <strong className="text-[#2A0D04]">name, email address, and phone number</strong> when you fill out a contact or inquiry form.</li>
              <li>Your <strong className="text-[#2A0D04]">billing and shipping address</strong> when you place an order.</li>
              <li>Any <strong className="text-[#2A0D04]">messages or feedback</strong> you send us via WhatsApp, email, or contact forms.</li>
            </ul>
            <p>We also automatically collect certain information when you visit our website, such as your IP address, browser type, and pages visited. This helps us improve your experience.</p>
          </Section>

          <Section title="How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Process your orders and deliver courses or products.</li>
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Send you updates about new courses, workshops, or offers (only if you opt-in).</li>
              <li>Improve our website and services.</li>
            </ul>
            <p>We do <strong className="text-[#2A0D04]">not</strong> sell your personal information to any third party.</p>
          </Section>

          <Section title="Sharing Your Information">
            <p>
              We may share your information with trusted service providers who help us run our business (e.g., payment
              processors, shipping partners). These partners are required to keep your information safe and only use it
              for the services they provide to us.
            </p>
            <p>
              We may also share information if required by law or to protect the rights and safety of our customers
              and our business.
            </p>
          </Section>

          <Section title="Cookies">
            <p>
              Our website may use cookies to improve your browsing experience. Cookies are small files stored on
              your device. You can choose to disable cookies in your browser settings, but some parts of our website
              may not work properly as a result.
            </p>
          </Section>

          <Section title="Data Security">
            <p>
              We take your data security seriously. We use industry-standard measures to protect your personal
              information from unauthorized access, disclosure, or loss. However, no method of transmission over
              the internet is 100% secure, so we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Access the personal information we hold about you.</li>
              <li>Request corrections or deletion of your data.</li>
              <li>Opt out of marketing communications at any time.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:mindsetbadloaurcrorepatibano@gmail.com" className="text-[#6B2D17] hover:underline font-semibold">
                mindsetbadloaurcrorepatibano@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the
              updated date. We encourage you to review this page periodically.
            </p>
          </Section>

          <Section title="Contact Us">
            <p>If you have any questions about this Privacy Policy, please reach out to us:</p>
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
            <Link to="/refund-policy" className="hover:text-[#6B2D17] transition-colors">Refund Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#6B2D17] transition-colors">Terms &amp; Conditions</Link>
            <Link to="/" className="hover:text-[#6B2D17] transition-colors sm:ml-auto w-full sm:w-auto">← Back to Home</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

