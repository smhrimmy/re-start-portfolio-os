import React, { useState } from 'react';

export const Theme05Expertise: React.FC = () => {
  const [hoveredRow, setHoveredRow] = useState<{ grad: string; x: number; y: number } | null>(null);

  const rows = [
    {
      numIcon: '</>',
      meta: '01 / Development',
      title: 'Creative Development',
      desc: 'Building fast, responsive and scalable interfaces with modern frontend technologies.',
      tags: ['HTML', 'CSS', 'JavaScript'],
      grad: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
    },
    {
      numIcon: '✎',
      meta: '02 / Motion',
      title: 'Motion & Interaction',
      desc: 'Turning static interfaces into expressive experiences through meaningful motion and micro-interactions.',
      tags: ['GSAP', 'ScrollTrigger', 'Lenis'],
      grad: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    },
    {
      numIcon: '▦',
      meta: '03 / Design',
      title: 'UI / UX Design',
      desc: 'Creating clean visual systems with strong hierarchy, usability and a distinctive personality.',
      tags: ['UI Design', 'UX', 'Prototyping'],
      grad: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
    },
    {
      numIcon: '⬢',
      meta: '04 / Engineering',
      title: 'Modern Web Apps',
      desc: 'Developing interactive applications with component-based architecture and dynamic data.',
      tags: ['React', 'TypeScript', 'Vite'],
      grad: 'linear-gradient(135deg, #10b981, #06b6d4)',
    },
  ];

  return (
    <section id="expertise" className="bg-[#0c0c0c] text-white pt-[150px] pb-0 relative">
      <div className="max-w-[1240px] mx-auto px-[6vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-[60px]">
          {/* Left Block */}
          <div className="reveal in">
            <h2 className="font-display-anton text-[clamp(30px,5vw,46px)] leading-[1.05] uppercase">
              <span className="text-[#8c8c8c] block">My</span>
              Expertise
            </h2>
            <p className="mt-[22px] text-[14.5px] leading-[1.7] text-[#8c8c8c] max-w-[340px]">
              I design and build digital experiences where <b className="text-white font-semibold">design, code and motion</b> work as one.
            </p>
            <p className="mt-[14px] text-[14.5px] leading-[1.7] text-[#8c8c8c] max-w-[340px]">
              From expressive interfaces to smooth interactions, I combine frontend engineering with visual design to build digital experiences that feel intentional.
            </p>

            {/* Icon Chips */}
            <div className="flex gap-[14px] mt-[44px]">
              <div className="icon-chip relative w-[46px] h-[46px] rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-[19px] animate-[bob_4s_ease-in-out_infinite] group">
                🔥
                <span className="icon-tag absolute bottom-[56px] left-1/2 transform -translate-x-1/2 translate-y-[6px] bg-[#c9a876] text-[#0c0c0c] text-[10px] font-bold px-[9px] py-[4px] rounded-[4px] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                  JavaScript
                </span>
              </div>
              <div className="icon-chip relative w-[46px] h-[46px] rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-[19px] animate-[bob_4s_ease-in-out_0.4s_infinite] group">
                🎨
                <span className="icon-tag absolute bottom-[56px] left-1/2 transform -translate-x-1/2 translate-y-[6px] bg-[#c9a876] text-[#0c0c0c] text-[10px] font-bold px-[9px] py-[4px] rounded-[4px] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                  Design
                </span>
              </div>
              <div className="icon-chip relative w-[46px] h-[46px] rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-[19px] animate-[bob_4s_ease-in-out_0.8s_infinite] group">
                ⚛️
                <span className="icon-tag absolute bottom-[56px] left-1/2 transform -translate-x-1/2 translate-y-[6px] bg-[#c9a876] text-[#0c0c0c] text-[10px] font-bold px-[9px] py-[4px] rounded-[4px] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                  React
                </span>
              </div>
              <div className="icon-chip relative w-[46px] h-[46px] rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-[19px] animate-[bob_4s_ease-in-out_1.2s_infinite] group">
                🧩
                <span className="icon-tag absolute bottom-[56px] left-1/2 transform -translate-x-1/2 translate-y-[6px] bg-[#c9a876] text-[#0c0c0c] text-[10px] font-bold px-[9px] py-[4px] rounded-[4px] whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                  HTML5
                </span>
              </div>
            </div>
          </div>

          {/* Right Accordion List */}
          <div>
            <div className="border-t border-white/10">
              {rows.map((row, idx) => (
                <div
                  key={idx}
                  className="exp-row relative border-b border-white/10 py-[26px] flex items-start gap-[18px] cursor-pointer group"
                  onMouseEnter={(e) => {
                    setHoveredRow({ grad: row.grad, x: e.clientX + 24, y: e.clientY - 60 });
                  }}
                  onMouseMove={(e) => {
                    setHoveredRow({ grad: row.grad, x: e.clientX + 24, y: e.clientY - 60 });
                  }}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <div className="w-[40px] h-[40px] flex-none rounded-[8px] bg-[#141414] border border-white/10 flex items-center justify-center text-[17px]">
                    {row.numIcon}
                  </div>

                  <div className="flex-1">
                    <div className="text-[10px] tracking-[0.1em] uppercase text-[#8c8c8c] mb-[6px]">
                      {row.meta}
                    </div>
                    <h3 className="text-[22px] font-semibold mb-[6px] group-hover:text-[#c9a876] transition-colors">
                      {row.title}
                    </h3>
                    <p className="text-[13.5px] text-[#8c8c8c] max-w-[480px] leading-[1.6]">
                      {row.desc}
                    </p>
                    <div className="mt-[10px] flex gap-[8px]">
                      {row.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9.5px] tracking-[0.08em] uppercase text-[#8c8c8c] border border-white/10 px-[8px] py-[3px] rounded-[20px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-[16px] text-[#8c8c8c] group-hover:rotate-[45deg] group-hover:text-[#c9a876] transition-all">
                    ↗
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Marquee Strip */}
        <div className="marquee mt-[40px] overflow-hidden border-y border-white/10 py-[16px]">
          <div className="marquee-track flex w-max animate-[marquee_22s_linear_infinite]">
            <span className="font-display-anton text-[15px] text-[#8c8c8c] px-[22px] whitespace-nowrap">
              MOTION DESIGN + UI / UX + INTERACTIVE WEB + CREATIVE DEVELOPMENT +
            </span>
            <span className="font-display-anton text-[15px] text-[#8c8c8c] px-[22px] whitespace-nowrap">
              MOTION DESIGN + UI / UX + INTERACTIVE WEB + CREATIVE DEVELOPMENT +
            </span>
          </div>
        </div>
      </div>

      {/* Floating Preview Card on Hover */}
      {hoveredRow && (
        <div
          className="fixed w-[150px] h-[110px] rounded-[12px] pointer-events-none z-[50] flex items-center justify-center gap-[8px] flex-wrap p-[14px] transition-opacity duration-200"
          style={{
            background: hoveredRow.grad,
            left: `${hoveredRow.x}px`,
            top: `${hoveredRow.y}px`,
          }}
        >
          <div className="bg-white/90 rounded-[20px] px-[10px] py-[6px] text-[11px] text-[#333] flex items-center gap-[5px]">
            ♥ Like
          </div>
          <div className="bg-white/90 rounded-[20px] px-[10px] py-[6px] text-[11px] text-[#333] flex items-center gap-[5px]">
            👍 Rate
          </div>
        </div>
      )}
    </section>
  );
};

