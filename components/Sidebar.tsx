"use client";
import { motion } from 'framer-motion';
import { Home, Gauge, Settings, Zap, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const items = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'performance', label: 'Performance', icon: Gauge },
  { key: 'automation', label: 'Automation', icon: Zap },
  { key: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ onSelect, selected }: { onSelect: (key: string) => void; selected: string }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <motion.aside
      layout
      className={clsx('card h-full p-3 mr-4 sticky top-4', expanded ? 'w-64' : 'w-16')}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Home className="h-5 w-5 text-brand-600" />
          {expanded && <span className="font-semibold">MicroDash</span>}
        </div>
        <button className="btn btn-ghost" onClick={() => setExpanded((e) => !e)}>
          {expanded ? '‹' : '›'}
        </button>
      </div>
      <nav className="space-y-1">
        {items.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={clsx('w-full flex items-center gap-3 rounded-lg px-2 py-2 transition-colors', selected === key ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-200' : 'hover:bg-slate-100 dark:hover:bg-slate-800')}
          >
            <Icon className="h-5 w-5" />
            {expanded && <span className="text-sm font-medium">{label}</span>}
          </button>
        ))}
      </nav>
    </motion.aside>
  );
}
