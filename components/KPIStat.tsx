"use client";
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import clsx from 'clsx';

export function KPIStat({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive?: boolean;
}) {
  return (
    <motion.div
      className="card card-hover p-5"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      layout
    >
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="mt-2 flex items-end justify-between">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-semibold"
        >
          {value}
        </motion.div>
        <div
          className={clsx(
            'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
            positive
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
          )}
        >
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
          {delta}
        </div>
      </div>
    </motion.div>
  );
}
