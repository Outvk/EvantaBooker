import React from "react";

import { Link } from "react-router-dom";

const eventData = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop"
  }
  // Add more events here if needed
];

const Events = () => {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Upcoming Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventData.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
              <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                <div className="text-gray-600 mb-1"><b>Date:</b> {new Date(event.date).toLocaleDateString()}</div>
                <div className="text-gray-600 mb-1"><b>Time:</b> {event.time}</div>
                <div className="text-gray-600 mb-4"><b>Location:</b> {event.location}</div>
                <div className="text-lg font-bold text-black mb-4">${event.price}</div>
                <Link
                  to={`/booking/${event.id}`}
                  className="inline-block mt-auto px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
