"use client";
import { ThemeToggle } from './ThemeToggle';
import { SegmentedControl } from './SegmentedControl';
import { useState } from 'react';
import { Search } from 'lucide-react';

export function Header({ onRangeChange }: { onRangeChange: (r: string) => void }) {
  const [range, setRange] = useState('7d');
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search metrics, automations, teams..."
              className="pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <SegmentedControl
            segments={["24h", "7d", "30d", "90d"]}
            value={range}
            onChange={(v) => {
              setRange(v);
              onRangeChange(v);
            }}
          />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
