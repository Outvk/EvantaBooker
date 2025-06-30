
import { Calendar, Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white rounded-lg">
                <Calendar className="h-6 w-6 text-black" />
              </div>
              <span className="text-xl font-bold">EventBooker</span>
            </div>
            <p className="text-gray-400 text-sm">
              Discover and book amazing events happening around you. From concerts to conferences, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events" className="text-gray-400 hover:text-white transition-colors">Browse Events</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">My Bookings</Link></li>
              <li><Link to="/create-event" className="text-gray-400 hover:text-white transition-colors">Create Event</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events?category=music" className="text-gray-400 hover:text-white transition-colors">Music</Link></li>
              <li><Link to="/events?category=business" className="text-gray-400 hover:text-white transition-colors">Business</Link></li>
              <li><Link to="/events?category=tech" className="text-gray-400 hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/events?category=sports" className="text-gray-400 hover:text-white transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get notifications about new events and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button size="sm" className="bg-white text-black hover:bg-gray-200">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 EventBooker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
