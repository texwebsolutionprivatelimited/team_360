import React from 'react';
import { RefreshCw, ChevronRight, Mail } from 'lucide-react';
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

export default function RefundPolicy() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-[#FFF5EE] text-gray-900">

      {/* Page Header */}
      <div className="relative pt-2 pb-6 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-white/40 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-4">
            <RefreshCw className="w-4 h-4 text-[#6B2D17] animate-pulse" />
            Returns &amp; Refunds
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2A0D04] leading-tight mb-4 drop-shadow-sm">
            Refund Policy
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto text-sm sm:text-base leading-relaxed font-medium">
            Your satisfaction matters to us. Read our clear and fair refund guidelines below.
          </p>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            Last updated: June 2025 &nbsp;·&nbsp; Team 360
          </p>
        </div>
      </div>

      {/* Content Card */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white/70 border border-amber-200 rounded-2xl sm:rounded-3xl p-5 sm:p-12 shadow-sm">

          <Section title="Our Refund Philosophy">
            <p>
              At <strong className="text-[#2A0D04]">Team 360</strong>, we put our heart and soul into every
              course, workshop, attunement, and crystal product we offer. We want every customer to feel completely
              happy and confident with their purchase. Please read our refund policy carefully before making a purchase.
            </p>
          </Section>

          <Section title="Digital Courses & Workshops">
            <p>
              Because our digital courses and workshop recordings are delivered <strong className="text-[#2A0D04]">instantly</strong> upon
              purchase, we generally do not offer refunds once the content has been accessed or downloaded.
            </p>
            <p>
              However, if you experience a <strong className="text-[#2A0D04]">technical issue</strong> that prevents you from accessing
              the content, or if the course content is significantly different from what was described, please contact us within
              <strong className="text-[#2A0D04]"> 7 days</strong> of purchase and we will do our best to resolve the issue or offer a replacement.
            </p>
          </Section>

          <Section title="Live Sessions & 1-on-1 Attunements">
            <p>For live 1-on-1 healing sessions or attunements, a refund can be requested if:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>You cancel at least <strong className="text-[#2A0D04]">48 hours before</strong> the scheduled session.</li>
              <li>The session is cancelled by us due to unforeseen circumstances.</li>
            </ul>
            <p>
              Cancellations made <strong className="text-[#2A0D04]">less than 48 hours</strong> before the session are
              non-refundable, but we are happy to reschedule for you.
            </p>
          </Section>

          <Section title="Crystal Products & Physical Items">
            <p>
              We accept returns for physical crystal products within <strong className="text-[#2A0D04]">7 days</strong> of
              delivery if:
            </p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>The item arrives <strong className="text-[#2A0D04]">damaged or broken</strong> (please share a photo or video as proof).</li>
              <li>You received the <strong className="text-[#2A0D04]">wrong item</strong>.</li>
            </ul>
            <p>
              Items must be returned in their original packaging and unused condition. Return shipping costs are the
              responsibility of the customer unless the return is due to our error.
            </p>
            <p>
              We do <strong className="text-[#2A0D04]">not</strong> accept returns for change of mind on physical products.
            </p>
          </Section>

          <Section title="How to Request a Refund">
            <p>To start a refund or return request, please contact us within the applicable timeframe:</p>
            <ul className="list-none space-y-2">
              <li>
                <a href="mailto:mindsetbadloaurcrorepatibano@gmail.com" className="inline-flex items-center gap-2 text-[#6B2D17] hover:underline font-semibold">
                  <Mail className="w-4 h-4 shrink-0" />
                  mindsetbadloaurcrorepatibano@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/916376779062?text=${encodeURIComponent("Hello! I would like to request a refund for my recent purchase.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#6B2D17] hover:underline font-semibold"
                >
                  <svg className="w-4 h-4 shrink-0 fill-[#6B2D17]" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
                  WhatsApp: +91 63767 79062
                </a>
              </li>
            </ul>
            <p>
              Please include your <strong className="text-[#2A0D04]">order details, the reason for the refund</strong>, and
              any supporting photos or videos. We aim to respond within <strong className="text-[#2A0D04]">2–3 business days</strong>.
            </p>
          </Section>

          <Section title="Refund Processing Time">
            <p>
              Once a refund is approved, it will be processed to your original payment method within
              <strong className="text-[#2A0D04]"> 5–10 business days</strong>, depending on your bank or payment provider.
            </p>
          </Section>

          <Section title="Non-Refundable Items">
            <p>The following are not eligible for refunds:</p>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Accessed or downloaded digital courses and workshop content.</li>
              <li>Completed live or recorded sessions.</li>
              <li>Items damaged by the customer after delivery.</li>
              <li>Sale or discounted items (unless defective).</li>
            </ul>
          </Section>

          {/* Bottom links */}
          <div className="mt-10 pt-8 border-t border-amber-100 flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <Link to="/privacy-policy" className="hover:text-[#6B2D17] transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-[#6B2D17] transition-colors">Terms &amp; Conditions</Link>
            <Link to="/" className="hover:text-[#6B2D17] transition-colors sm:ml-auto w-full sm:w-auto">← Back to Home</Link>
          </div>
        </div>
      </div>

    </div>
  );
}

