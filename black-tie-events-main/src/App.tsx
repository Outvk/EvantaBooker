
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTopWithSync } from "@/components/ui/scroll-to-top";
import { DashboardSyncButtons } from "./DashboardSyncButtons";
import { ScrollToTopOnRoute } from "@/components/ui/scroll-to-top-on-route";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Search from "./pages/Search";
import EventDetails from "./pages/EventDetails";
import Booking from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HelpCenter from "./pages/HelpCenter";
import CreateEvent from "./pages/CreateEvent";
import NotFound from "./pages/NotFound";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { DashboardButton } from "./components/ui/dashboard-button";

const queryClient = new QueryClient();

import { useLocation } from "react-router-dom";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/dashboard", "/admin-dashboard", "/AdminDashboard"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ScrollToTopOnRoute />
      <DashboardSyncButtons />
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
