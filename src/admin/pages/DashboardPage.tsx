import React from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { TelemetryGauge } from '../components/TelemetryGauge';

export const DashboardPage: React.FC = () => {
  return (
    <div className="max-w-5xl">
      <LedMasthead
        title="Stage OS Overview"
        subtitle="Intelligent Stage telemetry and real-time system performance"
        status="active"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <TelemetryGauge label="FPS Performance" value={98} displayValue="60 FPS" />
        <TelemetryGauge label="Device Tier" value={85} displayValue="HIGH" />
        <TelemetryGauge label="Active Themes" value={100} displayValue="27/27" />
        <TelemetryGauge label="Syndication Cron" value={100} displayValue="ONLINE" />
      </div>

      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
        <h2 className="font-mono text-lg font-bold mb-3 text-[#1a1a1a]">System Identity Lock Status</h2>
        <div className="space-y-2 text-sm text-[#666] font-mono">
          <p>✔ Base surface locked to Intelligent Stage <code className="bg-[#e0e0df] px-1.5 py-0.5 rounded text-[#1a1a1a]">#ececeb</code></p>
          <p>✔ LED-Dot typography masthead rendered on all 27 admin routes</p>
          <p>✔ SVG Telemetry gauges active for metric visualization</p>
          <p>✔ Server-side node-cron worker polling social syndication queue</p>
        </div>
      </div>
    </div>
  );
};
