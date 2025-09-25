import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Crown, Users, BarChart3, Shield, Activity, UserPlus, Settings, Database } from "lucide-react";
import { fetchUsers } from "../../store/feature/Auth/AuthSlice";
import type { RootState } from "../../store";

const SuperAdminHome = () => {
  const dispatch = useDispatch();
  const { user, users, usersLoading } = useSelector((state: RootState) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    return () => clearInterval(timer);
  }, [dispatch]);



  const stats = [
    {
      label: "Total Admins",
      value: users.length,
      icon: Users,
      color: "text-blue-600"
    },
    {
      label: "Active Today",
      value: users.filter(admin => admin.isActive).length,
      icon: Activity,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-6">
      {/* Animated Header */}
      <div className="mb-12 text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg animate-bounce-subtle">
          <Crown className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-2 animate-slide-up">
          {greeting}, {user?.username}!
        </h1>
        
        <p className="text-xl text-green-600 mb-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
          Welcome to ಸಹಜ ಕೃಷಿ Super Admin Portal
        </p>
        
        <div className="text-sm text-gray-500 animate-slide-up" style={{animationDelay: '0.2s'}}>
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} • {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex justify-center mb-12">
        <div className="flex space-x-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="text-center animate-scale-in"
                style={{animationDelay: `${0.3 + index * 0.1}s`}}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-3 mx-auto hover:scale-110 transition-transform duration-300">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
     
        

        {/* Welcome Message */}
        <div className="mt-12 text-center bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-2 text-white animate-fade-in" style={{animationDelay: '0.8s'}}>
          <Crown className="w-8 h-6 mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-bold mb-3">Super Admin Control Center</h3>
          <p className="text-green-100 text-lg mb-4">
            You have complete administrative control over the ಸಹಜ ಕೃಷಿ platform
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes card-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }

        .animate-card-up {
          animation: card-up 0.6s ease-out;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminHome;