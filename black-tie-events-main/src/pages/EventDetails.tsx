
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock event data - in a real app, this would come from an API
const eventData = {
  "1": {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    category: "Music",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
    attendees: 2500,
    description: "Join us for an unforgettable evening of music under the stars. This year's Summer Music Festival features incredible artists from around the world, food trucks, and activities for the whole family.",
    highlights: [
      "Live performances by 12+ artists",
      "Food trucks and local vendors",
      "Family-friendly activities",
      "Professional sound and lighting",
      "VIP packages available"
    ],
    organizer: "NYC Events Co.",
    tags: ["Music", "Outdoor", "Family-friendly", "Food & Drinks"]
  }
};

export default function EventDetails() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  const event = eventData[id as keyof typeof eventData];

  if (!event) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Event not found</h2>
          <Button asChild>
            <Link to="/events">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button variant="ghost" asChild>
            <Link to="/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl overflow-hidden mb-8"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-gray-900">
                  {event.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsLiked(!isLiked)}
                  className="bg-white/90 hover:bg-white"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Event Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-8 mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {event.title}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{formatDate(event.date)}</div>
                    <div className="text-sm">at {event.time}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{event.location}</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{event.attendees.toLocaleString()} attendees</div>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Duration: 4 hours</div>
                  </div>
                </div>
              </div>

              <Separator className="my-8" />

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {event.description}
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Highlights</h3>
                <ul className="space-y-2 mb-6">
                  {event.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-black rounded-full mr-3" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${event.price}
                </div>
                <div className="text-gray-600">per ticket</div>
              </div>

              <div className="space-y-4 mb-6">
                <Button asChild size="lg" className="w-full bg-black hover:bg-gray-800">
                  <Link to={`/booking/${event.id}`}>
                    Book Now
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Add to Wishlist
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Organized by:</span>
                  <span className="font-medium text-gray-900">{event.organizer}</span>
                </div>
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-medium text-gray-900">{event.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tickets sold:</span>
                  <span className="font-medium text-gray-900">{Math.floor(event.attendees * 0.7).toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
