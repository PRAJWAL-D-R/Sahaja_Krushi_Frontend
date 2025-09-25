import {
  Shield,
  Menu,
  X,
  Home,
  Users,
  UserPlus,
  FileImage,
  Activity,
  UserCircle,
  LogOut,
  MapPin,
  Phone,
  Clock,
  Languages,
  ChevronDown,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Wheat,
  Sprout,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth: string;
  gender: string;
  profileImage: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ManagementItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
}

const loginResponse = {
  success: true,
  message: "Login successful",
  data: {
    user: {
      id: 2,
      username: "Prajwal",
      email: "prajju@gmail.com",
      role: "ADMIN",
      firstName: "Prajwal ",
      lastName: "D R",
      phone: "7975946713",
      address: "Hirehalli, Tumkur",
      district: "Tumkur",
      state: "Karnataka",
      postalCode: "572104",
      country: "India",
      dateOfBirth: "2003-05-12T00:00:00.000Z",
      gender: "MALE",
      profileImage: null,
      isActive: true,
      createdAt: "2025-09-11T04:48:18.000Z",
      updatedAt: "2025-09-11T04:48:18.000Z",
    },
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJwcmFqanVAZ21haWwuY29tIiwidXNlcm5hbWUiOiJQcmFqd2FsIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzU4NTU4MjA4LCJleHAiOjE3NTg2NDQ2MDh9.tkpAjQsMQTc7JNUVQTl8yAHH4paDOsWWJgoSYws8FUo",
  },
};

const SimpleGovernmentNavbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showFarmersDropdown, setShowFarmersDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "kn">("en");
  const [currentTime, setCurrentTime] = useState(new Date());

  const farmersRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  // Initialize user from login response and trim spaces on names
  const [user, setUser] = useState<User>({
    ...loginResponse.data.user,
    firstName: loginResponse.data.user.firstName.trim(),
    lastName: loginResponse.data.user.lastName.trim(),
  });

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Translations
  const translations = {
    en: {
      govKarnataka: "Government of Karnataka",
      deptAgriculture: "Department of Agriculture",
      status: "Status",
      active: "Active",
      helpline: "Helpline: 1800-xxx-xxxx",
      home: "Dashboard",
      about: "About",
      farmerManagement: "Farmer Management",
      farmerRegistration: "Farmer Registration",
      farmerDirectory: "Farmer Directory",
      farmerReports: "Farmer Reports",
      supportRequests: "Support Requests",
      administrator: "Admin",
      profile: "Profile",
      viewProfile: "View Profile",
      profileDetails: "Profile Details",
      logout: "Logout",
      language: "Language",
      english: "English",
      kannada: "ಕನ್ನಡ",
      email: "Email",
      phone: "Phone",
      address: "Address",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      userId: "User ID",
      username: "Username",
      role: "Role",
      joinedOn: "Joined On",
      lastUpdated: "Last Updated",
      accountStatus: "Account Status",
      portalName: "Sahaja Krushi Portal",
      portalSubtitle: "Karnataka Government",
      formerQuery: "Former Query",
      pendingQuery: "Pending Query",
      solvedQuery: "Solved Query",
      RejectedQuery: "Rejected Query",
    },
    kn: {
      govKarnataka: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
      deptAgriculture: "ಕೃಷಿ ಇಲಾಖೆ",
      status: "ಸ್ಥಿತಿ",
      active: "ಸಕ್ರಿಯ",
      helpline: "ಸಹಾಯವಾಣಿ: 1800-xxx-xxxx",
      home: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      about: "ಬಗ್ಗೆ",
      farmerManagement: "ರೈತ ನಿರ್ವಹಣೆ",
      farmerRegistration: "ರೈತ ನೋಂದಣಿ",
      farmerDirectory: "ರೈತ ಡೈರೆಕ್ಟರಿ",
      farmerReports: "ರೈತ ವರದಿಗಳು",
      supportRequests: "ಸಹಾಯ ಅರ್ಜಿಗಳು",
      administrator: "ನಿರ್ವಾಹಕ",
      profile: "ಪ್ರೊಫೈಲ್",
      viewProfile: "ಪ್ರೊಫೈಲ್ ನೋಡಿ",
      profileDetails: "ಪ್ರೊಫೈಲ್ ವಿವರಗಳು",
      logout: "ಲಾಗ್ ಔಟ್",
      language: "ಭಾಷೆ",
      english: "English",
      kannada: "ಕನ್ನಡ",
      email: "ಇಮೇಲ್",
      phone: "ದೂರವಾಣಿ",
      address: "ವಿಳಾಸ",
      dateOfBirth: "ಹುಟ್ಟಿದ ದಿನಾಂಕ",
      gender: "ಲಿಂಗ",
      userId: "ಬಳಕೆದಾರ ID",
      username: "ಬಳಕೆದಾರ ಹೆಸರು",
      role: "ಪಾತ್ರ",
      joinedOn: "ಸೇರಿದ ದಿನಾಂಕ",
      lastUpdated: "ಕೊನೆಯ ಬಾರಿ ನವೀಕರಣ",
      accountStatus: "ಖಾತೆ ಸ್ಥಿತಿ",
      portalName: "ಸಹಜ ಕೃಷಿ ಪೋರ್ಟಲ್",
      portalSubtitle: "ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
      formerQuery: "ಹಳೆಯ ಪ್ರಶ್ನೆಗಳು",
      pendingQuery: "ಬಾಕಿಯಿರುವ ಪ್ರಶ್ನೆಗಳು",
      solvedQuery: "ಪರಿಹರಿಸಿದ ಪ್ರಶ್ನೆಗಳು",
      RejectedQuery: "ತಿರಸ್ಕೃತ ಪ್ರಶ್ನೆಗಳು",
    },
  };

  const t = translations[currentLanguage];

  // Farmer Management items
  const farmerManagement: ManagementItem[] = [
    {
      name: t.farmerRegistration,
      icon: UserPlus,
      href: "/admin/register",
    },
    {
      name: t.farmerDirectory,
      icon: Users,
      href: "/admin/farmer-management",
    },
  ];

  // Dashboard sections
  const dashboardSections: NavItem[] = [
    { name: t.home, icon: Home, href: "/admin/home" },
    { name: t.about, icon: FileImage, href: "/admin/about" },
  ];

  // Handle closing dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        farmersRef.current &&
        !farmersRef.current.contains(event.target as Node)
      ) {
        setShowFarmersDropdown(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const DropdownItem: React.FC<{
    icon: React.ComponentType<{ className?: string }>;
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }> = ({ icon: Icon, href, children, onClick }) => (
    <button
      type="button"
      onClick={() => {
        if (onClick) onClick();
        navigate(href);
      }}
      className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition text-gray-700 hover:text-green-700 border-b last:border-b-0 group w-full text-left"
    >
      <Icon className="h-4 w-4 text-green-700 flex-shrink-0 group-hover:text-green-900 transition-colors" />
      <span className="text-sm font-medium">{children}</span>
    </button>
  );

  const handleLanguageChange = (lang: "en" | "kn") => {
    setCurrentLanguage(lang);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === "kn" ? "kn-IN" : "en-IN",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    sessionStorage.clear();
    navigate("/auth/login");
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-gradient-to-r from-green-800 via-green-600 to-orange-400 shadow-md sticky top-0 z-50">
      {/* Top Government Header */}
      <div className="bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-4 text-sm">
              {/* Optionally can include Shield and Department text */}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-300" />
                <span>
                  {currentTime.toLocaleTimeString(
                    currentLanguage === "kn" ? "kn-IN" : "en-IN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "Asia/Kolkata",
                    }
                  )}
                </span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Phone className="h-3 w-3" />
                <span>{t.helpline}</span>
              </div>
              {/* Language Selector */}
              <div className="flex items-center space-x-1 bg-green-800/50 px-1 py-0 rounded-full">
                <Languages className="h-3 w-3 text-yellow-300" />
                <span className="text-[10px] font-medium mr-1">{t.language}:</span>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={`px-1 py-0 rounded text-[10px] font-medium transition-all duration-200 ${
                    currentLanguage === "en"
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-green-700 text-green-100 hover:bg-green-600"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => handleLanguageChange("kn")}
                  className={`px-1 py-0 rounded text-[10px] font-medium transition-all duration-200 ${
                    currentLanguage === "kn"
                      ? "bg-yellow-600 text-white shadow-md"
                      : "bg-green-700 text-green-100 hover:bg-green-600"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <Sprout className="h-10 w-10 text-green-400" />
            <div>
              <h1 className="text-xl font-bold text-white">{t.portalName}</h1>
              <p className="text-xs text-green-100">{t.portalSubtitle}</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {dashboardSections.map((section, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 text-white hover:text-green-200 font-medium px-3 py-2 rounded-lg hover:bg-green-700/50 transition-all duration-200"
                onClick={() => navigate(section.href)}
              >
                <section.icon className="h-4 w-4" />
                <span>{section.name}</span>
              </button>
            ))}

            {/* Farmers Management Dropdown */}
            <div className="relative" ref={farmersRef}>
              <button
                type="button"
                onClick={() => setShowFarmersDropdown(!showFarmersDropdown)}
                className="flex items-center space-x-2 text-white hover:text-green-200 font-medium px-3 py-2 rounded-lg hover:bg-green-700/50 transition-all duration-200"
              >
                <Users className="h-4 w-4" />
                <span>{t.farmerManagement}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    showFarmersDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showFarmersDropdown && (
                <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-green-200 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  {farmerManagement.map((item, index) => (
                    <DropdownItem
                      key={index}
                      icon={item.icon}
                      href={item.href}
                      onClick={() => setShowFarmersDropdown(false)}
                    >
                      {item.name}
                    </DropdownItem>
                  ))}
                </div>
              )}
            </div>

            {/* Former Query as simple button */}
            <button
              onClick={() => navigate("/admin/former-query/all")}
              className="flex items-center space-x-2 text-white hover:text-green-200 font-medium px-3 py-2 rounded-lg hover:bg-green-700/50 transition-all duration-200"
            >
              <BookOpen className="h-4 w-4" />
              <span>{t.formerQuery}</span>
            </button>
          </div>

          {/* Right Side - User Profile */}
          <div className="flex items-center space-x-4">
            {/* User Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 bg-re-400 px-3 py-2 rounded-lg transition-all duration-200"
              >
                <div className="flex items-center space-x-2">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {getInitials(user.firstName, user.lastName)}
                    </div>
                  )}
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-green-200">{user.role}</p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-green-200" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-green-200 z-50 animate-in slide-in-from-top-2 duration-200">
                  {/* Profile Header */}
                  <div className="px-4 py-4 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-100">
                    <div className="flex items-center space-x-3">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg font-medium">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold ">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm ">@{user.username}</p>
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mt-1">
                          {user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Profile Details */}
                  <div className="px-4 py-3 max-h-64 overflow-y-auto">
                    <h4 className="text-sm font-semibold  mb-3">
                      {t.profileDetails}
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4  flex-shrink-0" />
                        <div>
                          <span className=" text-xs">{t.email}:</span>
                          <span className=" ml-2">{user.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4  flex-shrink-0" />
                        <div>
                          <span className=" text-xs">{t.phone}:</span>
                          <span className=" ml-2">{user.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 text-sm">
                        <MapPin className="h-4 w-4  flex-shrink-0 mt-0.5" />
                        <div>
                          <span className=" text-xs block">{t.address}:</span>
                          <div className=" mt-1">
                            <div>{user.address}</div>
                            <div>
                              {user.district}, {user.state} - {user.postalCode}
                            </div>
                            <div>{user.country}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4  flex-shrink-0" />
                        <div>
                          <span className=" text-xs">{t.dateOfBirth}:</span>
                          <span className=" ml-2">
                            {formatDate(user.dateOfBirth)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <UserCircle className="h-4 w-4  flex-shrink-0" />
                        <div>
                          <span className=" text-xs">{t.gender}:</span>
                          <span className=" ml-2">{user.gender}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Logout Button */}
                  <div className="px-4 py-3 border-t border-green-100">
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm">{t.logout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="text-green-50 p-2 rounded-lg hover:bg-green-700 transition-all"
              >
                {showMobileMenu ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="lg:hidden bg-green-50 rounded-lg mt-2 border border-green-200 p-4 mb-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-2">
              {dashboardSections.map((section, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(section.href);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg font-medium transition-all text-green-800 hover:bg-white hover:text-green-600 w-full text-left"
                >
                  <section.icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              ))}
              <div className="border-t border-green-200 pt-2 mt-2">
                <p className="text-sm font-medium text-green-700 px-3 py-1">
                  {t.farmerManagement}
                </p>
                {farmerManagement.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      navigate(item.href);
                      setShowMobileMenu(false);
                    }}
                    className="flex items-center space-x-3 px-6 py-2 rounded-lg transition-all text-green-600 hover:bg-green-100 hover:text-green-900 w-full text-left"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
              <div className="border-t border-green-200 pt-2 mt-2">
                <button
                  onClick={() => {
                    navigate("/admin/former-query/all");
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center space-x-3 px-6 py-2 rounded-lg transition-all text-green-600 hover:bg-green-100 hover:text-green-900 w-full text-left"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">{t.formerQuery}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default SimpleGovernmentNavbar;
