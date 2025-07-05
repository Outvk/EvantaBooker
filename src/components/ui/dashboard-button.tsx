
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from './button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function DashboardButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed bottom-20 right-8 z-40"
    >
      <Button
        onClick={handleClick}
        size="icon"
        className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground w-12 h-12"
      >
        <LayoutDashboard className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}
