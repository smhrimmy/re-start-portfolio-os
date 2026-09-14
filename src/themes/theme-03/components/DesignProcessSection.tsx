import React from 'react';

export const DesignProcessSection: React.FC = () => {
  return (
    <section id="process" className="w-full mt-16 sm:mt-24">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
        <h2 className="font-serif-instrument text-[2.5rem] sm:text-[3.2rem] font-normal text-[#18203A] leading-tight">
          My design process
        </h2>
        <p className="font-sans-satoshi text-[0.95rem] text-[#536083] m-0">
          Understand the problem. Explore the possibilities. Make it work.
        </p>
      </div>

      {/* Outer Lime Frame (#C8FF48) */}
      <div className="bg-[#C8FF48] rounded-[38px] p-4 sm:p-8 w-full">
        {/* Inner Paper Surface (#FCFCFA) */}
        <div className="bg-[#FCFCFA] border-t-[7px] border-[#18203A] rounded-tl-[48px] rounded-tr-[28px] rounded-b-[28px] px-6 sm:px-[34px] pt-10 pb-[64px]">
          {/* 3 Process Cards Grid */}
          <div className="process-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[34px] relative">
            {/* Card 01 */}
            <div className="relative flex flex-col items-center text-center bg-[#F0F0EF] rounded-[28px] px-5 py-[26px] pb-[52px]">
              <span className="font-sans-satoshi text-xs font-bold text-[#18203A]/60 uppercase tracking-widest mb-3">
                01 / DISCOVER
              </span>
              <h3 className="font-serif-instrument text-[1.4rem] font-normal text-[#18203A] leading-snug mb-2">
                Start with the right questions.
              </h3>
              <p className="font-sans-satoshi text-[0.88rem] text-[#536083] leading-relaxed m-0 max-w-[260px]">
                Understand who it’s for, what they need, and what’s getting in their way.
              </p>

              {/* Overlapping Sticker */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                <span
                  className="process-sticker bg-[#C8FF48] text-[#18203A] font-sans-satoshi text-xs font-bold px-4 py-2 rounded-full border border-[#18203A]/15 shadow-sm whitespace-nowrap"
                  style={{ '--rest-rot': '-5deg' } as React.CSSProperties}
                >
                  People before pixels
                </span>
              </div>
            </div>

            {/* Connecting Arrow 1 (Yellow #ECAB16) */}
            <div className="hidden md:block absolute left-[31%] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C12 2 28 2 38 12" stroke="#ECAB16" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 12L38 12L34 4" stroke="#ECAB16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Card 02 */}
            <div className="relative flex flex-col items-center text-center bg-[#F0F0EF] rounded-[28px] px-5 py-[26px] pb-[52px]">
              <span className="font-sans-satoshi text-xs font-bold text-[#18203A]/60 uppercase tracking-widest mb-3">
                02 / DESIGN
              </span>
              <h3 className="font-serif-instrument text-[1.4rem] font-normal text-[#18203A] leading-snug mb-2">
                Give the idea something to stand on.
              </h3>
              <p className="font-sans-satoshi text-[0.88rem] text-[#536083] leading-relaxed m-0 max-w-[260px]">
                Map the flow, sketch a few directions, and build a prototype to try.
              </p>

              {/* Overlapping Sticker */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                <span
                  className="process-sticker bg-[#8296EB] text-white font-sans-satoshi text-xs font-bold px-4 py-2 rounded-full border border-[#18203A]/15 shadow-sm whitespace-nowrap"
                  style={{ '--rest-rot': '2deg' } as React.CSSProperties}
                >
                  Sketch → Prototype
                </span>
              </div>
            </div>

            {/* Connecting Arrow 2 (Pink #EFACCB) */}
            <div className="hidden md:block absolute left-[64%] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C12 22 28 22 38 12" stroke="#EFACCB" strokeWidth="3" strokeLinecap="round" />
                <path d="M30 12L38 12L34 20" stroke="#EFACCB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Card 03 */}
            <div className="relative flex flex-col items-center text-center bg-[#F0F0EF] rounded-[28px] px-5 py-[26px] pb-[52px]">
              <span className="font-sans-satoshi text-xs font-bold text-[#18203A]/60 uppercase tracking-widest mb-3">
                03 / REFINE
              </span>
              <h3 className="font-serif-instrument text-[1.4rem] font-normal text-[#18203A] leading-snug mb-2">
                Try it. Then make it better.
              </h3>
              <p className="font-sans-satoshi text-[0.88rem] text-[#536083] leading-relaxed m-0 max-w-[260px]">
                Test the experience, listen to feedback, and refine the details before handoff.
              </p>

              {/* Overlapping Sticker */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10">
                <span
                  className="process-sticker bg-[#C8FF48] text-[#18203A] font-sans-satoshi text-xs font-bold px-4 py-2 rounded-full border border-[#18203A]/15 shadow-sm whitespace-nowrap"
                  style={{ '--rest-rot': '5deg' } as React.CSSProperties}
                >
                  Test. Learn. Refine.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
