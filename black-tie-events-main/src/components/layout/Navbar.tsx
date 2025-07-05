
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import "./Navbar.css";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarScale, setNavbarScale] = useState(1);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Create Event', href: '/create-event' },
    { name: 'Book', href: '/help' },
  ];

  // Scroll logic for hide/show and resize
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down, show on scroll up
      setShow(currentScrollY < 20 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      // If at the very top, restore scale and style
      if (currentScrollY === 0) {
        setNavbarScale(1);
      } else {
        setNavbarScale(currentScrollY > 60 ? 0.92 : 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <motion.nav
        initial={{ y: 0, scale: 1, opacity: 1 }}
        animate={{
          y: show ? 0 : -80,
          scale: navbarScale,
          opacity: show ? 1 : 0.7,
          boxShadow: window.scrollY === 0 ? '0 4px 24px 0 rgba(0, 0, 0, 0)' : '0 8px 32px 0 rgba(0,0,0,0.18)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky z-50 transition-all duration-300
          ${window.scrollY === 0 ? 'w-full top-0 left-0 right-0 rounded-none max-w-full' : 'top-4 mx-auto rounded-2xl max-w-5xl'}`}
        style={window.scrollY === 0 ? {} : { left: 0, right: 0 }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <img src="/ticket-use-svgrepo-com.svg" alt="EventBooker Logo" className="h-6 w-6 logo-spin-white" />
              </div>
              <span className="text-xl font-bold">EventBooker</span>
            </Link>

          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/search" className="text-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/create-event" className="text-foreground hover:text-primary transition-colors">
                Create Event
              </Link>
              <Link to="/help" className="text-foreground hover:text-primary transition-colors">
                Help
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <Button onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/create-event"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
              <Link
                to="/help"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors hover:bg-accent rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Book
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-2">
                <Button variant="ghost" onClick={() => { navigate('/login'); setIsOpen(false); }}>
                  Login
                </Button>
                <Button onClick={() => { navigate('/signup'); setIsOpen(false); }}>
                  Sign Up
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    <div className="fixed left-4 top-20 z-40">
      <Link to="/dashboard">
        <Button className="px-4 py-1 h-7 min-w-[120px] rounded-full bg-primary/80 text-primary-foreground flex items-center gap-2 shadow-none text-xs font-semibold">
          <span className="mr-1">Dashboard</span>
          <LayoutDashboard className="h-4 w-4" />
        </Button>
      </Link>
    </div>
    </>
  );
}
