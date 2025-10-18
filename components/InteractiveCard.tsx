"use client";
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function InteractiveCard({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="card p-5"
      whileHover={{ y: -3, boxShadow: '0 10px 30px -12px rgba(17,24,39,0.35)' }}
      whileTap={{ scale: 0.99, y: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      layout
    >
      {children}
    </motion.div>
  );
}
