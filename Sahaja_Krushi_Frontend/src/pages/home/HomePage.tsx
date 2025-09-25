import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Plus,
  UserPlus,
  BarChart3,
  Award,
  Leaf,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../lib/network/axiosClient";

// Agriculture images for slider
const images = [
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=1920&h=600&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1920&h=600&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&h=600&fit=crop&crop=center",
];

const AdminHomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const [statsData, setStatsData] = useState({
    totalFarmers: 0,
    activeFarmers: 0,
    pendingQueries: 0,
    completedQueries: 0,
  });

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Manual navigation
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  // Load dashboard stats from API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Farmers stats
        const farmersRes = await axiosClient.get("/farmers/stats");
        const farmersStats = farmersRes?.data?.data || {};
        const totalFarmers = Number(farmersStats.totalFarmers || 0);
        const activeFarmers = Number(farmersStats.activeFarmers || 0);

        // Queries listing to derive counts
        let pendingQueries = 0;
        let completedQueries = 0;
        try {
          const queriesRes = await axiosClient.get("/queries");
          const queries = Array.isArray(queriesRes?.data?.data)
            ? queriesRes.data.data
            : [];
          pendingQueries = queries.filter((q: any) => q.status === "open").length;
          completedQueries = queries.filter((q: any) => q.status === "answered" || q.status === "closed").length;
        } catch (_) {}

        setStatsData({ totalFarmers, activeFarmers, pendingQueries, completedQueries });
      } catch (_) {
        // leave defaults on error
      }
    };
    fetchStats();
  }, []);

  // Stats cards to render
  const stats = [
    {
      title: "Total Farmers",
      value: String(statsData.totalFarmers),
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Farmers",
      value: String(statsData.activeFarmers),
      icon: <FileText className="w-6 h-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Pending Queries",
      value: String(statsData.pendingQueries),
      icon: <Clock className="w-6 h-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed Queries",
      value: String(statsData.completedQueries),
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  // Services data
  const services = [
    {
      title: "Farmer Registration",
      description: "Register new farmers and manage their profiles",
      icon: <UserPlus className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Scheme Management",
      description: "Create and manage agricultural schemes",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      title: "Analytics & Reports",
      description: "View detailed analytics and generate reports",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      title: "Certification",
      description: "Issue and manage agricultural certifications",
      icon: <Award className="w-8 h-8" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Slider */}
      <div className="relative h-96 overflow-hidden">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Agriculture scene ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
              Admin Dashboard
            </h1>
            <h2 className="text-xl md:text-2xl mb-2 opacity-90">
              ಕರ್ನಾಟಕ ಸರ್ಕಾರ - ಕೃಷಿ ಇಲಾಖೆ
            </h2>
            <p className="text-lg md:text-xl opacity-80">
              Karnataka Department of Agriculture
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Add Farmer Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Add New Farmer
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Register farmers quickly and efficiently with our streamlined
              process
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-2xl text-center cursor-pointer hover:from-green-600 hover:to-green-700 transition-all duration-300 group">
              <UserPlus className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">Register New Farmer</h3>
              <p className="text-green-100 mb-4">
                Click here to add a new farmer to the system
              </p>
              <button
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => navigate("/admin/register")}
              >
                Start Registration
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Dashboard Statistics
            </h2>
            <p className="text-gray-600 text-lg">
              Key metrics and performance indicators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl ${stat.bgColor} ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
    

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Karnataka Agriculture</h3>
                  <p className="text-gray-400 text-sm">
                    Department of Agriculture
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {/* Empowering farmers through innovative technology, sustainable
                practices, and comprehensive support services for agricultural
                excellence in Karnataka. */}
                Supported by the Department of Agriculture, Department of
                Horticulture, KVK, RDPR, and Gandhi Sahaja Krushi Besaya Shaale
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Farmer Registration
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Schemes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4" />
                  <span>1800-123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4" />
                  <span>admin@karnataka-agri.gov.in</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4" />
                  <span>Bengaluru, Karnataka</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative  border-gray-800 mt-2 pt-6 text-center">
            <p className="text-gray-400">
              © 2025 Government of Karnataka - Sahaja Krushi. All rights
              reserved.
            </p>
            <span className="absolute right-4 bottom-2 text-gray-400 text-xs italic opacity-40 pointer-events-none">
              Developed by Prajwal D R 
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminHomePage;
