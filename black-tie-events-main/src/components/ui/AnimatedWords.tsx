import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedWordsProps {
  words: string[];
  intervalMs?: number;
}

export function AnimatedWords({ words, intervalMs = 1800 }: AnimatedWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <span style={{ minWidth: 90, display: 'inline-block', position: 'relative' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="font-bold px-1 bg-gray-900 rounded-xl shadow-sm"
          style={{ position: 'absolute', left: 0, top: 0, padding: '0.25rem 0.75rem 0.25em' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}