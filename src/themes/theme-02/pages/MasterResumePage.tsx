import React, { useState } from 'react';
import { FileText, Download, Printer, Briefcase, GraduationCap, Award } from 'lucide-react';
import { ControlDeckButton } from '../components/ControlDeckButton';
import { getTheme02StoreData, Theme02Experience } from '../utils/theme02DataAdapter';

export const MasterResumePage: React.FC = () => {
  const [adminData] = useState(() => getTheme02StoreData());
  const { ownerProfile, experiences, resumeConfig } = adminData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0A0D10] text-[#C9D1D9] font-mono py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Header Telemetry */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#30363D] pb-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-bold mb-1">
            <FileText className="w-4 h-4" />
            <span>[SYSTEM_MASTER_RESUME]</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
            ENGINEERING <span className="text-[#00F0FF]">RESUME</span> CONSOLE
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <ControlDeckButton
            variant="secondary"
            size="sm"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            PRINT DOCUMENT
          </ControlDeckButton>
          <a href={resumeConfig.pdfUrl || '#'} target="_blank" rel="noopener noreferrer">
            <ControlDeckButton
              variant="primary"
              size="sm"
              icon={<Download className="w-3.5 h-3.5" />}
            >
              DOWNLOAD PDF
            </ControlDeckButton>
          </a>
        </div>
      </div>

      {/* Printable Master Document Surface */}
      <div className="bg-[#161B22] border border-[#30363D] p-6 sm:p-8 rounded-sm space-y-6 shadow-2xl print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b border-[#30363D] pb-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white print:text-black uppercase">
                {ownerProfile.name}
              </h2>
              <div className="text-sm font-bold text-[#00F0FF] print:text-blue-700">
                {ownerProfile.title}
              </div>
            </div>
            <div className="text-xs text-[#8B949E] print:text-gray-600 sm:text-right space-y-0.5">
              <div>{ownerProfile.email}</div>
              <div>{ownerProfile.location}</div>
              <div>{ownerProfile.github}</div>
            </div>
          </div>
          <p className="text-xs text-[#C9D1D9] print:text-gray-800 pt-2 leading-relaxed">
            {ownerProfile.bio}
          </p>
        </div>

        {/* Work Experience Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] print:text-blue-700 uppercase tracking-wider border-b border-[#30363D] pb-1">
            <Briefcase className="w-4 h-4" />
            <span>[WORK_EXPERIENCE]</span>
          </div>

          <div className="space-y-4">
            {experiences.map((exp: Theme02Experience) => (
              <div key={exp.id} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                  <div className="font-bold text-white print:text-black">
                    {exp.role} — <span className="text-[#00F0FF] print:text-blue-600">{exp.company}</span>
                  </div>
                  <div className="text-[#8B949E] print:text-gray-600 text-[11px]">{exp.period}</div>
                </div>
                <p className="text-xs text-[#8B949E] print:text-gray-700 leading-relaxed">
                  {exp.description}
                </p>

                {exp.achievements && (
                  <ul className="list-disc list-inside text-xs text-[#C9D1D9] print:text-gray-800 space-y-0.5 pl-2">
                    {exp.achievements.map((ach: string, i: number) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#30363D]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] print:text-blue-700 uppercase tracking-wider border-b border-[#30363D] pb-1">
              <GraduationCap className="w-4 h-4" />
              <span>[EDUCATION]</span>
            </div>
            <div className="text-xs">
              <div className="font-bold text-white print:text-black">B.S. IN COMPUTER SCIENCE</div>
              <div className="text-[#8B949E] print:text-gray-600">State University • 2017 - 2021</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF] print:text-blue-700 uppercase tracking-wider border-b border-[#30363D] pb-1">
              <Award className="w-4 h-4" />
              <span>[CERTIFICATIONS]</span>
            </div>
            <div className="text-xs space-y-1">
              <div className="font-bold text-white print:text-black">AWS Solutions Architect Professional</div>
              <div className="font-bold text-white print:text-black">Google Cloud Professional Cloud Architect</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
