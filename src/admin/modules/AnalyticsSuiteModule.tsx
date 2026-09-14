import React, { useState } from 'react';
import { LedMasthead } from '../components/LedMasthead';
import { TelemetryGauge } from '../components/TelemetryGauge';
import { loadAdminStore } from '../store/adminStore';
import { Users, Eye, Smartphone, Monitor, Globe } from 'lucide-react';

export const AnalyticsSuiteModule: React.FC = () => {
  const store = loadAdminStore();
  const [dateRange, setDateRange] = useState('30d');

  const { analytics } = store;

  return (
    <div className="max-w-6xl">
      <LedMasthead
        title="Analytics Suite & Visitor Telemetry"
        subtitle="Real-time web traffic, sessions, traffic acquisition sources, and device breakdowns"
        status="active"
      />

      {/* Control Bar: Date Range Filter & Comparison */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-4 shadow-sm font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#666] uppercase">Time Period:</span>
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-3 py-1.5 rounded transition-colors ${
                dateRange === range
                  ? 'bg-[#10b981] text-white font-bold'
                  : 'bg-[#e0e0df] text-[#1a1a1a] hover:bg-[#d5d5d4]'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="text-[#666]">
          Comparison Mode: <span className="text-[#10b981] font-bold">+14.2% vs Previous Period</span>
        </div>
      </div>

      {/* Metric Cards & SVG Telemetry Gauges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <TelemetryGauge label="Total Visitors" value={85} displayValue={analytics.totalVisitors.toLocaleString()} />
        <TelemetryGauge label="Total Pageviews" value={92} displayValue={analytics.totalPageviews.toLocaleString()} />
        <TelemetryGauge label="Unique Sessions" value={78} displayValue={analytics.uniqueSessions.toLocaleString()} />
        <TelemetryGauge label="Avg Duration" value={65} displayValue={`${analytics.avgDurationMinutes} min`} />
      </div>

      {/* SVG Traffic Distribution Line/Area Chart */}
      <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm mb-8">
        <h2 className="font-mono font-bold text-base text-[#1a1a1a] mb-4 flex items-center gap-2">
          <Eye size={18} className="text-[#10b981]" />
          <span>Traffic Volume & Pageview Trends</span>
        </h2>

        <div className="h-44 w-full relative flex items-end gap-2 pt-6 pb-2 border-b border-[#dcdcdc]">
          {[35, 42, 58, 45, 62, 75, 88, 92, 85, 95, 100, 90, 96].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full bg-[#10b981] group-hover:bg-[#0d9668] rounded-t transition-all"
                style={{ height: `${val}%` }}
              />
              <span className="font-mono text-[9px] text-[#888]">W{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Acquisition Traffic Sources */}
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm font-mono text-xs">
          <h3 className="font-bold text-sm text-[#1a1a1a] mb-4 flex items-center gap-2">
            <Users size={16} className="text-[#10b981]" />
            <span>Traffic Acquisition Sources</span>
          </h3>

          <div className="space-y-3">
            {analytics.trafficSources.map((src, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[#1a1a1a]">
                  <span>{src.source}</span>
                  <span className="font-bold">{src.count.toLocaleString()} ({src.percentage}%)</span>
                </div>
                <div className="w-full bg-[#e0e0df] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10b981] h-full rounded-full" style={{ width: `${src.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm font-mono text-xs">
          <h3 className="font-bold text-sm text-[#1a1a1a] mb-4 flex items-center gap-2">
            <Monitor size={16} className="text-[#10b981]" />
            <span>Device & Display Breakdown</span>
          </h3>

          <div className="space-y-3">
            {analytics.devices.map((dev, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-[#1a1a1a]">
                  <span className="flex items-center gap-2">
                    {dev.device.includes('Desktop') ? <Monitor size={14} /> : <Smartphone size={14} />}
                    {dev.device}
                  </span>
                  <span className="font-bold">{dev.count.toLocaleString()} ({dev.percentage}%)</span>
                </div>
                <div className="w-full bg-[#e0e0df] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3b82f6] h-full rounded-full" style={{ width: `${dev.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Countries & Popular Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-mono text-xs">
        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-[#1a1a1a] mb-3 flex items-center gap-2">
            <Globe size={16} className="text-[#10b981]" />
            <span>Geographic Distribution (Top Countries)</span>
          </h3>
          <div className="space-y-2">
            {analytics.topCountries.map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-[#eaeaea] rounded border border-[#dcdcdc]">
                <span>{c.country} ({c.code})</span>
                <span className="font-bold text-[#1a1a1a]">{c.count.toLocaleString()} visits</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#f4f4f3] border border-[#dcdcdc] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-sm text-[#1a1a1a] mb-3 flex items-center gap-2">
            <Eye size={16} className="text-[#10b981]" />
            <span>Top Performing Projects Showcase</span>
          </h3>
          <div className="space-y-2">
            {analytics.topProjects.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 bg-[#eaeaea] rounded border border-[#dcdcdc]">
                <span>{p.title}</span>
                <span className="font-bold text-[#10b981]">{p.views.toLocaleString()} views</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
