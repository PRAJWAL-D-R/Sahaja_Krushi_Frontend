import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Shield, Mail, Lock, Eye, EyeOff, CheckCircle,
  AlertCircle, Wheat, Crown, User
} from "lucide-react";
import { loginUser, clearError } from "../../store/feature/Auth/AuthSlice";
import type { AppDispatch, RootState } from "../../store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginStatus, setLoginStatus] = useState<"success" | "error" | null>(null);
  const [loginType, setLoginType] = useState<"admin" | "superadmin">("admin");

  // Super Admin Credentials (from backend seeder)
  const SUPER_ADMIN_CREDENTIALS = {
    email: "superadmin@sahajakrushi.com",
    password: "superadmin123"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoginStatus(null);
    dispatch(clearError());

    try {
      const result = await dispatch(loginUser({
        email: formData.email,
        password: formData.password
      })).unwrap();

      setLoginStatus("success");
      
      // Redirect based on user role
      setTimeout(() => {
        if (result.user.role === 'SUPER_ADMIN') {
          navigate("/superadmin/home");
        } else {
          navigate("/admin/home");
        }
      }, 1000);
    } catch (error) {
      setLoginStatus("error");
      setErrors({
        general: (error as string) || "Login failed. Please check your credentials."
      });
    }
  };

  const handleLoginTypeChange = (type: "admin" | "superadmin") => {
    setLoginType(type);
    setErrors({});
    setLoginStatus(null);
    dispatch(clearError());
    
    // Pre-fill super admin credentials for demo
    if (type === "superadmin") {
      setFormData({
        email: SUPER_ADMIN_CREDENTIALS.email,
        password: SUPER_ADMIN_CREDENTIALS.password,
        rememberMe: false
      });
    } else {
      setFormData({
        email: "",
        password: "",
        rememberMe: false
      });
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Left Kannada Panel */}
      <div className="w-1/2 h-full bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 text-white flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          {loginType === 'superadmin' ? (
            <Crown className="w-10 h-10 text-yellow-300" />
          ) : (
            <Wheat className="w-10 h-10 text-yellow-300" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">ಸಹಜ ಕೃಷಿ</h1>
        <p className="text-lg text-green-100">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</p>
        <p className="text-green-200 text-xs text-center">
          {loginType === 'superadmin' ? 'ಸೂಪರ್ ಆಡ್ಮಿನ್ ಪೋರ್ಟಲ್' : 'ಆಡ್ಮಿನ್ ಪೋರ್ಟಲ್'}
        </p>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-sm text-green-100 mt-2 max-w-sm">
          {loginType === 'superadmin' 
            ? "ಸೂಪರ್ ಆಡ್ಮಿನ್ ಮೂಲಕ ಸಿಸ್ಟಮ್ ನಿರ್ವಹಣೆ ಮತ್ತು ಆಡ್ಮಿನ್ ಖಾತೆಗಳ ನಿರ್ವಹಣೆ"
            : "ಸಹಜ ಕೃಷಿ ವಿಧಾನಗಳ ಮೂಲಕ ಗ್ರಾಮೀಣ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ರೈತರ ಬಾಳ ಸುಧಾರಣೆ"
          }
        </div>
      </div>

      {/* Right - Login */}
      <div className="w-1/2 h-full flex items-center justify-center bg-white">
        <div className="w-full max-w-sm px-6">
          {/* Login Type Toggle */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleLoginTypeChange("admin")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginType === "admin"
                  ? "bg-white text-green-700 shadow-sm border border-green-200"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => handleLoginTypeChange("superadmin")}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                loginType === "superadmin"
                  ? "bg-white text-green-700 shadow-sm border border-green-200"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Super Admin</span>
            </button>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-full text-white shadow-lg mb-2">
              {loginType === 'superadmin' ? (
                <Crown className="w-6 h-6" />
              ) : (
                <Shield className="w-6 h-6" />
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-800">
              {loginType === 'superadmin' ? 'Super Admin Portal' : 'Admin Portal'}
            </h2>
            <p className="text-gray-600 text-xs">
              {loginType === 'superadmin' ? 'Access super admin dashboard' : 'Access your admin dashboard'}
            </p>
          </div>

          <div className="space-y-3 mt-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={loginType === 'superadmin' ? 'superadmin@sahajakrushi.com' : 'admin@sahajakrushi.com'}
                  className="w-full pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-2 rounded-lg text-sm border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 rounded focus:ring-2"
              />
              <label className="ml-2 text-xs text-gray-700">Remember me</label>
            </div>

            {(errors.general || error) && (
              <p className="text-xs text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.general || error}
              </p>
            )}

            {loginStatus === "success" && (
              <p className="text-xs text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Login successful! Redirecting...
              </p>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm font-semibold disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              {isLoading ? "Authenticating..." : `Access ${loginType === 'superadmin' ? 'Super Admin' : 'Admin'} Dashboard`}
            </button>
          </div>

          {/* {loginType === 'superadmin' && (
            <div className="text-center text-xs text-gray-500 mt-4 bg-green-50 p-3 rounded-lg border border-green-100">
              <p className="mb-2 font-semibold text-green-700">Default Super Admin Credentials:</p>
              <p className="font-mono bg-white p-2 rounded text-xs border">
                <span className="text-green-600">Email:</span> superadmin@sahajakrushi.com<br />
                <span className="text-green-600">Password:</span> superadmin123
              </p>
            </div>
          )} */}

          <div className="text-center text-xs text-gray-400 mt-4">
            &copy; 2024 ಕೃಷಿ ಇಲಾಖೆ, ಭಾರತ ಸರ್ಕಾರ.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;