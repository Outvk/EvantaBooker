
import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import { Button } from './button';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function DashboardButtonWithScrollSync({ isScrollButtonVisible }: { isScrollButtonVisible: boolean }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dashboard');
  };

  return (
    <motion.div
      initial={false}
      animate={{
        right: isScrollButtonVisible ? 96 : 32, // right-24 or right-8 (in px)
        bottom: 32, // bottom-8
        position: 'fixed',
        zIndex: 50,
        scale: 1,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
      style={{ position: 'fixed' }}
    >
      <Button
        onClick={handleClick}
        size="icon"
        className="rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
        aria-label="Dashboard"
      >
        <LayoutDashboard className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

