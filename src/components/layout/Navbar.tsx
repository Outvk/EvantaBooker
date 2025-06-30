
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Create Event', href: '/create-event' },
    { name: 'Book', href: '/help' },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <Calendar className="h-6 w-6 text-primary-foreground transition-transform duration-500 hover:rotate-360" />
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
              <Link to="/events" className="text-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link to="/create-event" className="text-foreground hover:text-primary transition-colors">
                Create Event
              </Link>
              <Link to="/help" className="text-foreground hover:text-primary transition-colors">
                Book
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
                to="/events"
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
    </nav>
  );
}
