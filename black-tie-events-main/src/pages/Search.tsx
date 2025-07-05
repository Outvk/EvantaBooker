import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EventCard } from "@/components/events/EventCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const eventData = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    time: "18:00",
    location: "Central Park, New York",
    category: "Music",
    price: 89,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop"
  },
  {
    id: "2",
    title: "Tech Innovation Conference",
    date: "2024-08-22",
    time: "09:00",
    location: "Convention Center, SF",
    category: "Technology",
    price: 199,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
  },
  {
    id: "3",
    title: "Food & Wine Expo",
    date: "2024-09-10",
    time: "12:00",
    location: "Downtown Plaza, LA",
    category: "Food",
    price: 45,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop"
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "2024-07-28",
    time: "14:00",
    location: "Business District, Chicago",
    category: "Business",
    price: 25,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop"
  }
];

const categories = ["All", "Music", "Technology", "Food", "Business"];

export default function Search() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  const filteredEvents = eventData.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || event.category === category;
    const matchesDate = !date || event.date === date;
    const matchesPlace = !place || event.location.toLowerCase().includes(place.toLowerCase());
    return matchesSearch && matchesCategory && matchesDate && matchesPlace;
  });

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search and discover the best events happening near you. Filter by category, date, or location to find something that matches your interests!
          </p>
        </div>
        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 bg-white p-6 rounded-xl shadow">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by name or keyword"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full h-10">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-left text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date ? new Date(date) : undefined}
                  onSelect={d => setDate(d ? format(d, "yyyy-MM-dd") : "")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="place">Place</Label>
            <Input
              id="place"
              placeholder="Enter location"
              value={place}
              onChange={e => setPlace(e.target.value)}
            />
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg">No events found.</div>
          ) : (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={{ ...event, attendees: event.attendees ?? 0 }} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
