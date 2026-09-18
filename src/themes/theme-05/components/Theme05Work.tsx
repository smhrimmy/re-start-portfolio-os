import React from 'react';
import { Project } from '@/types/portfolio';

interface Theme05WorkProps {
  projects: Project[];
  onOpenDetail: (project: Project) => void;
}

export const Theme05Work: React.FC<Theme05WorkProps> = ({ projects, onOpenDetail }) => {
  return (
    <section id="work" className="bg-[#0c0c0c] text-white pt-[110px] pb-[130px] relative overflow-hidden">
      {/* Top Marquee */}
      <div className="marquee overflow-hidden border-y border-white/10 py-[16px] mb-[60px]">
        <div className="marquee-track flex w-max animate-[marquee_22s_linear_infinite]">
          <span className="font-display-anton text-[15px] text-[#8c8c8c] px-[22px] whitespace-nowrap">
            INTERACTIVE WEB + CREATIVE DEVELOPMENT + MOTION DESIGN + UI / UX +
          </span>
          <span className="font-display-anton text-[15px] text-[#8c8c8c] px-[22px] whitespace-nowrap">
            INTERACTIVE WEB + CREATIVE DEVELOPMENT + MOTION DESIGN + UI / UX +
          </span>
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-[6vw]">
        {/* Work Head */}
        <div className="text-center my-[50px] reveal in">
          <h2 className="font-script-caveat text-[clamp(38px,6vw,64px)] text-[#c9a876]">
            My Work
          </h2>
        </div>

        {/* Work List */}
        <div className="flex flex-col gap-[26px]">
          {projects.map((proj, idx) => {
            const cardBgGradients = [
              'linear-gradient(135deg,#2b2b2b,#0b0b0b 60%),radial-gradient(circle at 80% 20%,rgba(201,168,118,.25),transparent 50%)',
              'linear-gradient(135deg,#242424,#050505 70%),radial-gradient(circle at 20% 80%,rgba(139,92,246,.25),transparent 55%)',
              'linear-gradient(135deg,#262626,#070707 65%),radial-gradient(circle at 70% 75%,rgba(236,72,153,.2),transparent 55%)',
            ];
            const bgGrad = cardBgGradients[idx % cardBgGradients.length];

            return (
              <div
                key={proj.id || idx}
                onClick={() => onOpenDetail(proj)}
                style={{ background: bgGrad }}
                className="project-card relative min-h-[420px] rounded-[14px] overflow-hidden flex items-end p-[40px] border border-white/10 cursor-pointer group transition-transform duration-300 hover:scale-[1.01]"
              >
                <div className="absolute inset-0 bg-black/40 z-0" />

                <div className="relative z-[2] max-w-[560px]">
                  <div className="text-[10.5px] tracking-[0.12em] uppercase text-[#c9a876] mb-[12px]">
                    {proj.role || 'Portfolio System'} · 0{idx + 1}
                  </div>
                  <h3 className="text-[clamp(28px,4vw,44px)] font-bold mb-[10px] group-hover:text-[#c9a876] transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-[13.5px] text-[#cfcfcf] leading-[1.6] mb-[16px] max-w-[440px]">
                    {proj.summary}
                  </p>
                  <div className="flex gap-[8px] flex-wrap">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[9.5px] tracking-[0.08em] uppercase bg-white/[0.08] px-[10px] py-[5px] rounded-[20px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Orbit Badge */}
                <a
                  href={proj.liveUrl || proj.githubUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="orbit-badge absolute right-[26px] bottom-[26px] z-[3] w-[104px] h-[104px] flex items-center justify-center group/badge"
                >
                  <svg className="ring absolute inset-0 w-full h-full animate-spin-badge" viewBox="0 0 100 100">
                    <defs>
                      <path
                        id={`circlePathWork-${idx}`}
                        d="M50,50 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
                      />
                    </defs>
                    <text fontSize="8.6" letterSpacing="2" fill="#ffffff" fontWeight="600">
                      <textPath href={`#circlePathWork-${idx}`}>VIEW LIVE DEMO • VIEW LIVE DEMO • </textPath>
                    </text>
                  </svg>
                  <div className="arrow-c w-[30px] h-[30px] rounded-full bg-[#c9a876] text-[#0c0c0c] flex items-center justify-center text-[15px] relative z-[2]">
                    ↗
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

