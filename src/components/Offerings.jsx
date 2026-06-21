import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { useAdminContent } from '../admin/contentStore';
import mahaLaxmiImg from '../assets/maha_laxmi_wealth.png';
import dragonMasteryImg from '../assets/dragon_protection.png';
import akashicRecordsImg from '../assets/akashic_records.png';
import unicornTherapyImg from '../assets/unicorn_healing.png';

export default function Offerings({ onOpenModal }) {
  const allWorkshops = useAdminContent('courses');
  const workshops = allWorkshops.filter(w => !(w.isRecorded || w.type === 'Recorded Session'));
  // Get 4 prominent featured programs to display on the Home page
  const featuredIds = ['maha-laxmi-workshop', 'dragon-mastery', 'akashic-records', 'unicorn-therapy'];
  const featuredPrograms = featuredIds.map(id => workshops.find(w => w.id === id)).filter(Boolean);
  const programs = featuredPrograms.length === featuredIds.length
    ? featuredPrograms
    : workshops.slice(0, 4);

  const imageMap = {
    'maha-laxmi-workshop': mahaLaxmiImg,
    'dragon-mastery': dragonMasteryImg,
    'akashic-records': akashicRecordsImg,
    'unicorn-therapy': unicornTherapyImg
  };

  return (
    <section id="programs" className="relative pt-12 pb-8 sm:pb-10 bg-[#FFF5EE] overflow-hidden">

      {/* Space left-right inside container */}
      <div className="max-w-[95%] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-[#6B2D17] uppercase mb-3 animate-tagline-blink">
            <Sparkles className="w-3.5 h-3.5 text-[#6B2D17]" />
            Certified Classes &amp; Workshops
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A0D04] mb-3">
            Our Programs
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] mx-auto rounded-full mb-4" />
          <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-2xl mx-auto leading-relaxed">
            Start your spiritual journey today. Choose from our certified online courses, powerful workshops, and personal 1-on-1 sessions. Learn to attract wealth, heal emotional pain, and find deep peace.
          </p>
        </div>

        {/* Offerings Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${
          programs.length === 3 ? 'lg:grid-cols-3 max-w-5xl' : 'lg:grid-cols-4'
        } gap-4 md:gap-6 mx-auto items-stretch justify-center`}>
          {programs.map((prog) => (
            <Link
              key={prog.id}
              to={`/courses/${prog.id}`}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(107,45,23,0.05)] hover:shadow-[0_20px_40px_rgba(107,45,23,0.12)] border-2 border-[#6B2D17]/50 hover:border-[#6B2D17] transition-all duration-300 flex flex-col justify-between h-full hover:-translate-y-1.5 cursor-pointer"
            >
              <div>
                {/* Card Image */}
                <div className="relative h-48 sm:h-64 overflow-hidden bg-[#2A0D04]">
                  <img
                    src={prog.image || imageMap[prog.id]}
                    alt={prog.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-500 brightness-95"
                  />
                  <span className="absolute top-4 left-4 max-w-[calc(100%-2rem)] text-[8px] xs:text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-[#2A0D04]/90 text-[#FAF7F2] border border-[#FAF7F2]/20 px-3.5 py-1.5 rounded-xl backdrop-blur-md whitespace-nowrap">
                    {prog.category}
                  </span>
                </div>

                {/* Card Info */}
                <div className="p-4 sm:p-6">
                  <h3 className="font-serif text-lg font-bold text-[#2A0D04] group-hover:text-[#6B2D17] leading-snug mb-1 line-clamp-2 transition-colors duration-300">
                    {prog.title}
                  </h3>
                  <h4 className="text-[11px] font-semibold text-[#2A0D04] tracking-wide mb-3 uppercase">
                    {prog.subtitle}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4">
                    {prog.description}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 sm:p-6 pt-0">
                <div className="w-full bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] hover:from-[#120502] hover:to-[#2A0D04] text-white font-bold py-3 rounded-xl text-center text-xs transition-all duration-300 uppercase tracking-wider shadow-md hover:shadow-lg whitespace-nowrap">
                  See Course Details
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* See More CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2A0D04] to-[#6B2D17] hover:from-[#120502] hover:to-[#2A0D04] text-white font-bold text-xs sm:text-sm px-4 sm:px-8 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 uppercase tracking-wider whitespace-nowrap"
          >
            <span className="hidden sm:inline">View All Courses &amp; Workshops</span>
            <span className="inline sm:hidden">View All Courses</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>

      </div>

    </section>
  );
}
