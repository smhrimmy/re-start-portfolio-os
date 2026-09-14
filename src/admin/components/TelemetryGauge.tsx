import React from 'react';

interface TelemetryGaugeProps {
  label: string;
  value: number; // 0 to 100
  unit?: string;
  displayValue?: string;
}

export const TelemetryGauge: React.FC<TelemetryGaugeProps> = ({ label, value, unit = '%', displayValue }) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const strokeDashoffset = 251.2 - (251.2 * normalizedValue) / 100;

  return (
    <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-5 shadow-sm flex flex-col items-center">
      <div className="relative w-32 h-32 flex items-center justify-center mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e0e0df"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Gauge progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#10b981"
            strokeWidth="8"
            strokeDasharray="251.2"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
          <span className="text-xl font-bold text-[#1a1a1a]">
            {displayValue || `${normalizedValue}${unit}`}
          </span>
        </div>
      </div>

      <span className="text-xs uppercase tracking-wider text-[#666666] font-semibold text-center">
        {label}
      </span>
    </div>
  );
};
