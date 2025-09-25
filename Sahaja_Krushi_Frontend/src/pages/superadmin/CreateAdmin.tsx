import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { UserPlus, ArrowLeft, CheckCircle, AlertCircle, Mail, User, Lock, Shield, Phone, MapPin, Calendar, UserCircle, Building2 } from "lucide-react";
import { createUser, clearError } from "../../store/feature/Auth/AuthSlice";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    district: "",
    state: "",
    postalCode: "",
    country: "India",
    dateOfBirth: "",
    gender: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic account fields
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Personal information fields
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian phone number";
    }

    // Address fields
    if (!formData.address) {
      newErrors.address = "Address is required";
    } else if (formData.address.length < 10) {
      newErrors.address = "Please provide a complete address";
    }

    if (!formData.district) {
      newErrors.district = "District is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.postalCode) {
      newErrors.postalCode = "Postal code is required";
    } else if (!/^[1-9][0-9]{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = "Please enter a valid 6-digit postal code";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    // Optional fields validation
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        newErrors.dateOfBirth = "Admin must be at least 18 years old";
      } else if (age > 100) {
        newErrors.dateOfBirth = "Please enter a valid date of birth";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setErrors({});
    dispatch(clearError());
    
    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: "ADMIN" as const,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: formData.address,
        district: formData.district,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
        dateOfBirth: formData.dateOfBirth || undefined,
        gender: (formData.gender as 'MALE' | 'FEMALE' | 'OTHER') || undefined
      };
      
      await dispatch(createUser(userData)).unwrap();
      
      setSuccess(true);
      setTimeout(() => {
        navigate("/superadmin/admin-management");
      }, 2000);
    } catch (error: any) {
      setErrors({
        general: error || "Failed to create admin"
      });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-green-100 p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-subtle">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Admin Created Successfully!</h2>
          <p className="text-gray-600 mb-6">The new admin account has been created and can now login to the system.</p>
          <button
            onClick={() => navigate("/superadmin/admin-management")}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            View All Admins
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
      {/* Animated Header */}
      <div className="flex items-center space-x-4 mb-8 animate-slide-down">
        <button
          onClick={() => navigate("/superadmin/admin-management")}
          className="p-3 hover:bg-white hover:shadow-md rounded-xl transition-all duration-300 group border border-gray-200"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
        </button>
        
        <div className="flex items-center space-x-4">
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create New Admin</h1>
            <p className="text-green-600 font-medium">Add a new admin user to ಸಹಜ ಕೃಷಿ </p>
          </div>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden animate-slide-up">
          
          {/* Form Header */}
          {/* <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Admin Account Details</h2>
            </div>
            <p className="text-green-100 text-sm mt-1">Fill in the information below to create a new admin account</p>
          </div> */}

          <div className="p-8">
            {(errors.general || error) && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center animate-shake">
                <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-red-600 font-medium">{errors.general || error}</span>
              </div>
            )}

            {/* Account Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Account Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2 text-green-600" />
                    Username *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter admin username"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.username ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.username && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="w-4 h-4 inline mr-2 text-green-600" />
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="admin@sahajakrushi.com"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.email ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Lock className="w-4 h-4 inline mr-2 text-green-600" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter secure password"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.password ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">Minimum 6 characters required</p>
                </div>

                {/* Confirm Password Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Lock className="w-4 h-4 inline mr-2 text-green-600" />
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm password"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <UserCircle className="w-5 h-5 mr-2 text-green-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2 text-green-600" />
                    First Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.firstName ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <User className="w-4 h-4 inline mr-2 text-green-600" />
                    Last Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.lastName ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Phone className="w-4 h-4 inline mr-2 text-green-600" />
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.phone ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">10-digit Indian mobile number</p>
                </div>

                {/* Date of Birth Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2 text-green-600" />
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.dateOfBirth ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>

                {/* Gender Field */}
                <div className="group md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <UserCircle className="w-4 h-4 inline mr-2 text-green-600" />
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                        errors.gender ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    >
                      <option value="">Select Gender</option>
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <UserCircle className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Address Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {/* Address Field */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                    Complete Address *
                  </label>
                  <div className="relative">
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter complete address including house number, street, area"
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none ${
                        errors.address ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                      }`}
                    />
                    <div className="absolute top-3 right-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* District Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Building2 className="w-4 h-4 inline mr-2 text-green-600" />
                      District *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="Enter district"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          errors.district ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.district && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.district}
                      </p>
                    )}
                  </div>

                  {/* State Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <Building2 className="w-4 h-4 inline mr-2 text-green-600" />
                      State *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter state"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          errors.state ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <Building2 className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.state}
                      </p>
                    )}
                  </div>

                  {/* Postal Code Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                      Postal Code *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="560001"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          errors.postalCode ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.postalCode && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.postalCode}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">6-digit postal code</p>
                  </div>

                  {/* Country Field */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPin className="w-4 h-4 inline mr-2 text-green-600" />
                      Country *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="India"
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                          errors.country ? "border-red-300 bg-red-50" : "border-gray-300 group-hover:border-green-300"
                        }`}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.country && (
                      <p className="mt-2 text-sm text-red-600 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <h3 className="text-sm font-bold text-green-800 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Admin Account Privileges
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-green-700">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Access to admin dashboard and controls
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Manage farmers and agricultural data
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Monitor system activities and reports
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Support farmers with queries and issues
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/superadmin/admin-management")}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl font-semibold transform hover:scale-105 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Create Admin Account</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-5px);
          }
          60% {
            transform: translateY(-3px);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(2px);
          }
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style> */}
    </div>
  );
};

export default CreateAdmin;