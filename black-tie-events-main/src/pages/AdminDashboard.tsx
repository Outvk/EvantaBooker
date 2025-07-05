
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { HeroImageControl } from "@/components/ui/HeroImageControl";
import { HistoriqueTab, HeroHistoryItem } from "@/components/ui/HistoriqueTab";
import { HeroVideoControl } from "@/components/ui/HeroVideoControl";

const mockStats = {
  totalUsers: 1250,
  totalEvents: 45,
  totalRevenue: 25480,
  activeBookings: 324
};

const mockEvents = [
  {
    id: "1",
    title: "Summer Music Festival 2024",
    date: "2024-07-15",
    status: "active",
    attendees: 2500,
    revenue: 8900,
    category: "Music"
  },
  {
    id: "2",
    title: "Tech Innovation Conference",
    date: "2024-08-22",
    status: "active",
    attendees: 1200,
    revenue: 15600,
    category: "Technology"
  },
  {
    id: "3",
    title: "Food & Wine Expo",
    date: "2024-09-10",
    status: "draft",
    attendees: 0,
    revenue: 0,
    category: "Food"
  }
];

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-15",
    bookings: 5,
    totalSpent: 450
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2024-02-20",
    bookings: 3,
    totalSpent: 320
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    joinDate: "2024-03-10",
    bookings: 8,
    totalSpent: 680
  }
];

import { AdminSidebar } from "@/components/layout/AdminSidebar";

import { useEffect } from "react";

export default function AdminDashboard() {
  const [heroHistory, setHeroHistory] = useState<HeroHistoryItem[]>(() => {
    const stored = localStorage.getItem("heroHistory");
    return stored ? JSON.parse(stored) : [];
  });

  // Save new image to history
  const handleSaveHeroImage = () => {
    localStorage.setItem('heroImageUrl', heroImageUrl);
    const newItem: HeroHistoryItem = { type: 'image', url: heroImageUrl, savedAt: new Date().toISOString() };
    const updated = [newItem, ...heroHistory.filter(h => !(h.type==='image' && h.url===heroImageUrl))].slice(0, 30);
    setHeroHistory(updated);
    localStorage.setItem('heroHistory', JSON.stringify(updated));
  };
  // Save new video to history
  const handleSaveHeroVideo = () => {
    localStorage.setItem('heroVideoUrl', heroVideoUrl);
    const newItem: HeroHistoryItem = { type: 'video', url: heroVideoUrl, savedAt: new Date().toISOString() };
    const updated = [newItem, ...heroHistory.filter(h => !(h.type==='video' && h.url===heroVideoUrl))].slice(0, 30);
    setHeroHistory(updated);
    localStorage.setItem('heroHistory', JSON.stringify(updated));
  };

  const [heroImageUrl, setHeroImageUrl] = useState<string>(localStorage.getItem("heroImageUrl") || "");
  const [heroVideoUrl, setHeroVideoUrl] = useState<string>(localStorage.getItem("heroVideoUrl") || "");
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Optional: When switching between cards, show the latest saved value by default
  useEffect(() => {
    if (previewType === 'image') setPreviewUrl(heroImageUrl);
    if (previewType === 'video') setPreviewUrl(heroVideoUrl);
    // eslint-disable-next-line
  }, [previewType]);
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 flex">
      {/* Admin Sidebar (left) */}
      {sidebarOpen && (
        <AdminSidebar
          activeTab={activeTab}
          onTabChange={tab => {
            if (tab === 'toggle-sidebar') setSidebarOpen(false);
            else setActiveTab(tab);
          }}
        />
      )}
      {/* Sidebar toggle button for mobile */}
      {!sidebarOpen && (
        <button
          className="fixed top-6 left-4 z-50 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow p-2 focus:outline-none lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open Sidebar"
        >
          <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white mb-1"></span>
          <span className="block w-5 h-0.5 bg-gray-800 dark:bg-white"></span>
        </button>
      )}
      {/* Main dashboard content, shifts right when sidebar open */}
      <div className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage events, users, and analytics</p>
            </div>
            <Button className="bg-black hover:bg-gray-800">
              <Plus className="h-4 w-4 mr-2" />
              Add New Event
            </Button>
          </div>
        </motion.div>

        <div id="overview"></div>
        <Tabs defaultValue="dashboard" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              {/* Left: Controls */}
              <div className="flex flex-col gap-8 w-full lg:max-w-xl">
                {/* Hero Image Control */}
                <div className="p-6 bg-white rounded-xl shadow border border-gray-200">
                  <h2 className="text-lg font-bold mb-2">Home Hero Image</h2>
                  <p className="mb-4 text-gray-600 text-sm">Set the image URL for the hero section on the Home page.</p>
                  <div className="flex flex-col gap-2">
                    <HeroImageControl
                      value={heroImageUrl}
                      onChange={url => {
                        setHeroImageUrl(url);
                        setPreviewType('image');
                        setPreviewUrl(url);
                      }}
                      onSave={handleSaveHeroImage}
                      onShowPreview={() => {
                        setPreviewType('image');
                        setPreviewUrl(heroImageUrl);
                      }}
                    />
                  </div>
                </div>
                {/* Hero Video Control */}
                <div className="p-6 bg-white rounded-xl shadow border border-gray-200 mb-8">
                  <h2 className="text-lg font-bold mb-2">Home Hero Video</h2>
                  <p className="mb-4 text-gray-600 text-sm">Set the video URL for the hero section modal on the Home page.</p>
                  <div className="flex flex-col gap-2">
                    <HeroVideoControl
                      value={heroVideoUrl}
                      onChange={url => {
                        setHeroVideoUrl(url);
                        setPreviewType('video');
                        setPreviewUrl(url);
                      }}
                      onSave={handleSaveHeroVideo}
                      onShowPreview={() => {
                        setPreviewType('video');
                        setPreviewUrl(heroVideoUrl);
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Right: Preview Panel */}
              <div className="flex-1 flex justify-center items-start pt-6">
                {previewType === 'image' && previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Image Preview"
                    className="rounded-xl border border-gray-200 max-h-[400px] max-w-full object-contain bg-white shadow"
                    onError={e => (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image')}
                  />
                ) : previewType === 'video' && previewUrl ? (
                  <video
                    src={previewUrl}
                    controls
                    className="rounded-xl border border-gray-200 max-h-[400px] max-w-full object-contain bg-black shadow"
                    onError={e => (e.currentTarget.poster = 'https://via.placeholder.com/400x300?text=No+Video')}
                  >
                    Sorry, your browser does not support embedded videos.
                  </video>
                ) : (
                  <div className="text-gray-400 text-center w-full">No preview selected</div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="historique">
            <HistoriqueTab heroHistory={heroHistory} />
          </TabsContent>
        </Tabs>

        <div id="events"></div>
        <div id="users"></div>
        <div id="settings"></div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.totalEvents}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${mockStats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{mockStats.activeBookings}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Manage Events</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Music</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Technology</span>
                        <span className="font-semibold">30%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">Food</span>
                        <span className="font-semibold">25%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {mockEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                              <Badge className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Date:</span> {formatDate(event.date)}
                              </div>
                              <div>
                                <span className="font-medium">Category:</span> {event.category}
                              </div>
                              <div>
                                <span className="font-medium">Attendees:</span> {event.attendees.toLocaleString()}
                              </div>
                              <div>
                                <span className="font-medium">Revenue:</span> ${event.revenue.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4 md:mt-0">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {mockUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{user.name}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Email:</span> {user.email}
                              </div>
                              <div>
                                <span className="font-medium">Joined:</span> {formatDate(user.joinDate)}
                              </div>
                              <div>
                                <span className="font-medium">Bookings:</span> {user.bookings}
                              </div>
                              <div>
                                <span className="font-medium">Total Spent:</span> ${user.totalSpent}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4 md:mt-0">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow p-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Admin Settings</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="Admin Name" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Email</label>
                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="admin@email.com" />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">Change Password</label>
                    <input type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white" placeholder="New Password" />
                  </div>
                  <button type="submit" className="w-full px-4 py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition">Save Settings</button>
                </form>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
