
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Star, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/events/EventCard";

const trendingEvents = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    category: "Music",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=300&fit=crop",
    attendees: 2500
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "2024-07-28",
    time: "14:00",
    location: "Business District, Chicago",
    category: "Business",
    price: 25,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    attendees: 300
  },
  {
    id: "2",
    title: "Tech Innovation Conference",
    date: "2024-08-22",
    time: "09:00",
    location: "Convention Center, SF",
    category: "Technology",
    price: 199,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
    attendees: 1200
  },
  {
    id: "3",
    title: "Food & Wine Expo",
    date: "2024-09-10",
    time: "12:00",
    location: "Downtown Plaza, LA",
    category: "Food",
    price: 45,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop",
    attendees: 800
  }
];

const benefits = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book tickets in just a few clicks with our streamlined process"
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Join thousands of happy customers who trust us with their events"
  },
  {
    icon: Star,
    title: "Premium Events",
    description: "Access to exclusive and high-quality events in your area"
  },
  {
    icon: CheckCircle,
    title: "Secure Payments",
    description: "Your payments are protected with bank-level security"
  }
];

import "./Home.css";
import { useState, useRef, useEffect } from "react";
import { VideoDialog } from "./VideoDialog";
import { HeroMediaVisualizer } from "@/components/ui/HeroMediaVisualizer";
import { AnimatedWords } from "@/components/ui/AnimatedWords";
import { LogoCarousel } from "@/components/ui/LogoCarousel";

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const learnMoreRef = useRef<HTMLDivElement | null>(null);
  // Hero video state
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>("https://www.w3schools.com/html/mov_bbb.mp4");
  useEffect(() => {
    const storedVideoUrl = localStorage.getItem('heroVideoUrl');
    if (storedVideoUrl) setHeroVideoUrl(storedVideoUrl);
  }, []);

  // Hero image state
  const [heroImageUrl, setHeroImageUrl] = useState<string>("/hero-party.jpg");
  useEffect(() => {
    const storedUrl = localStorage.getItem('heroImageUrl');
    if (storedUrl) setHeroImageUrl(storedUrl);
  }, []);

  useEffect(() => {
    if (!showLearnMore) return;
    function onScroll() {
      if (!learnMoreRef.current) return;
      const rect = learnMoreRef.current.getBoundingClientRect();
      if (rect.bottom < 0) {
        setShowLearnMore(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [showLearnMore]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight flex flex-wrap items-center gap-2">
                Discover
                <span className="inline-block text-gray-300 relative w-32 align-top" style={{ top: '-0.98em' }}>
                  <AnimatedWords words={["Exciting", "Inspiring", "Unique", "Incredible"]} />
                </span>
                <span className="inline text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  Events Near You
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 max-w-lg">
                From intimate gatherings to large festivals, find and book the perfect events that match your interests.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
                  <Link to="/search">
                    Explore Events
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={() => setShowLearnMore(true)}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={heroImageUrl}
                  alt="Saturday Party Hero"
                  className="w-full h-full object-cover hero-cursor-img"
                  onClick={() => setVideoOpen(true)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learn More Section (conditional) */}
      <motion.section
        id="learn-more"
        className="relative py-20 bg-gradient-to-br from-sky-50/80 to-white/70 backdrop-blur-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={showLearnMore ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 50, pointerEvents: 'none' }}
        transition={{ duration: 0.5, type: 'spring' }}
        style={{ display: showLearnMore ? 'block' : 'none' }}
        ref={learnMoreRef as any}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl bg-white/60 shadow-xl border border-sky-100 p-10 md:p-16 flex flex-col items-center text-center backdrop-blur-lg"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-sky-600 mb-4 drop-shadow-sm">
              Welcome to EventBooker
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl">
              EventBooker is your gateway to discovering, booking, and enjoying the best events in your city. Our platform is designed for ease, security, and unforgettable experiences. Whether you love concerts, food festivals, tech meetups, or exclusive parties, we bring them all to your fingertips.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-2xl">
              <li className="flex items-center gap-4 bg-sky-50/70 rounded-xl p-4 shadow-sm">
                <Calendar className="h-6 w-6 text-sky-400" />
                <span className="font-medium text-gray-800">Curated events for every interest</span>
              </li>
              <li className="flex items-center gap-4 bg-sky-50/70 rounded-xl p-4 shadow-sm">
                <CheckCircle className="h-6 w-6 text-sky-400" />
                <span className="font-medium text-gray-800">Safe, secure, and easy booking</span>
              </li>
              <li className="flex items-center gap-4 bg-sky-50/70 rounded-xl p-4 shadow-sm">
                <Users className="h-6 w-6 text-sky-400" />
                <span className="font-medium text-gray-800">Join a vibrant community</span>
              </li>
              <li className="flex items-center gap-4 bg-sky-50/70 rounded-xl p-4 shadow-sm">
                <Star className="h-6 w-6 text-sky-400" />
                <span className="font-medium text-gray-800">Premium experiences & exclusive access</span>
              </li>
            </ul>
            <div>
              <Button asChild size="lg" className="bg-sky-500 hover:bg-sky-600 text-white rounded-full shadow-md px-8">
                <a href="/events">
                  Start Exploring
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-200/20 to-white/0 rounded-3xl blur-2xl" aria-hidden="true" />
      </motion.section>

      {/* Trending Events */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Events
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't miss out on these popular events happening soon
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


   

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EventBooker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make event discovery and booking simple, secure, and enjoyable
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                  <benefit.icon className="h-6 w-6 text-gray-900" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="my-16"
    >
      <LogoCarousel />
    </motion.div>
      <VideoDialog open={videoOpen} onOpenChange={setVideoOpen} videoUrl={heroVideoUrl} />
    </div>
  );
}
