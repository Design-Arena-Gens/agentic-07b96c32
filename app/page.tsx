"use client";
import { useEffect, useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { KPIStat } from '../components/KPIStat';
import { InteractiveCard } from '../components/InteractiveCard';
import { TrendChart } from '../components/TrendChart';
import dayjs from 'dayjs';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Workflow, Clock, BadgeCheck } from 'lucide-react';

function useMetrics(range: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/metrics?range=${range}`)
      .then((r) => r.json())
      .then((d) => {
        if (!active) return;
        setData(d);
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [range]);
  return { loading, data } as const;
}

export default function Page() {
  const [selected, setSelected] = useState('overview');
  const [range, setRange] = useState('7d');
  const { loading, data } = useMetrics(range);

  const chart = useMemo(() => {
    const labels = (data?.series ?? []).map((s: any) => dayjs(s.t).format('MMM D'));
    const points = (data?.series ?? []).map((s: any) => s.v);
    return { labels, points };
  }, [data]);

  return (
    <div className="min-h-screen">
      <Header onRangeChange={setRange} />
      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 md:grid-cols-[auto,1fr] gap-4">
        <Sidebar selected={selected} onSelect={setSelected} />
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {selected === 'overview' && (
              <motion.section key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KPIStat label="Active Users" value={data?.stats?.users ?? '—'} delta={data?.stats?.usersDelta ?? '—'} positive />
                  <KPIStat label="Conversion" value={data?.stats?.conversion ?? '—'} delta={data?.stats?.conversionDelta ?? '—'} positive={false} />
                  <KPIStat label="MRR" value={data?.stats?.mrr ?? '—'} delta={data?.stats?.mrrDelta ?? '—'} positive />
                  <KPIStat label="NPS" value={data?.stats?.nps ?? '—'} delta={data?.stats?.npsDelta ?? '—'} positive />
                </div>

                <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <InteractiveCard>
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">Trend</div>
                      <div className="text-xs text-slate-500">{range}</div>
                    </div>
                    <TrendChart labels={chart.labels} data={chart.points} />
                  </InteractiveCard>

                  <InteractiveCard>
                    <div className="font-semibold mb-2">Upcoming Launches</div>
                    <ul className="space-y-3">
                      {[1,2,3].map((i) => (
                        <li key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Rocket className="h-4 w-4 text-brand-600" />
                            <div>
                              <div className="text-sm font-medium">Feature {i}</div>
                              <div className="text-xs text-slate-500">{dayjs().add(i, 'day').format('MMM D')}</div>
                            </div>
                          </div>
                          <button className="btn btn-ghost text-xs">View</button>
                        </li>
                      ))}
                    </ul>
                  </InteractiveCard>

                  <InteractiveCard>
                    <div className="font-semibold mb-2">Automation Health</div>
                    <div className="space-y-3">
                      {[
                        { icon: Workflow, label: 'Onboarding Flow', status: 'Healthy' },
                        { icon: Clock, label: 'Retry Queue', status: 'SLA OK' },
                        { icon: BadgeCheck, label: 'Billing Sync', status: 'Verified' },
                      ].map(({ icon: Icon, label, status }) => (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-brand-600" />
                            <span className="text-sm font-medium">{label}</span>
                          </div>
                          <span className="text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1">{status}</span>
                        </div>
                      ))}
                    </div>
                  </InteractiveCard>
                </div>
              </motion.section>
            )}

            {selected === 'performance' && (
              <motion.section key="performance" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <InteractiveCard>
                  <div className="font-semibold mb-2">Latency Percentiles</div>
                  <div className="text-sm text-slate-500">p50: 120ms · p95: 340ms · p99: 540ms</div>
                </InteractiveCard>
              </motion.section>
            )}

            {selected === 'automation' && (
              <motion.section key="automation" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <InteractiveCard>
                  <div className="font-semibold mb-2">Automation Runs</div>
                  <div className="text-sm text-slate-500">Last 24h: 12,345 · Errors: 12 (0.09%)</div>
                </InteractiveCard>
              </motion.section>
            )}

            {selected === 'settings' && (
              <motion.section key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                <InteractiveCard>
                  <div className="font-semibold mb-2">Preferences</div>
                  <div className="text-sm text-slate-500">Adjust theme, notifications, and defaults.</div>
                </InteractiveCard>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
