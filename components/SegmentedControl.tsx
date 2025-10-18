"use client";
import { motion } from 'framer-motion';
import clsx from 'clsx';

export function SegmentedControl({
  segments,
  value,
  onChange,
}: {
  segments: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const idx = segments.indexOf(value);
  return (
    <div className="relative inline-flex rounded-lg border border-slate-200 dark:border-slate-800 p-1 bg-white dark:bg-slate-900">
      <motion.div
        className="absolute top-1 bottom-1 rounded-md bg-slate-100 dark:bg-slate-800"
        initial={false}
        animate={{ left: `calc(${idx} * (100% / ${segments.length}))`, width: `calc(100% / ${segments.length})` }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      />
      {segments.map((s) => (
        <button
          key={s}
          className={clsx('relative z-10 px-3 py-1 text-sm font-medium rounded-md transition-colors', value === s ? 'text-slate-900 dark:text-slate-100' : 'text-slate-500 dark:text-slate-400')}
          onClick={() => onChange(s)}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
