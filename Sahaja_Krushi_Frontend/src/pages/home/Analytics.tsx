import React from 'react';
import { Users, UserCheck, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  // Mock data - replace with real API calls
  const analyticsData = {
    totalAdmins: 15,
    totalFarmers: 1247,
    totalQueries: 342,
    solvedQueries: 289,
    pendingQueries: 53
  };

  const StatCard = ({ title, value, icon: Icon, bgColor, iconColor }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 ${bgColor} rounded-lg mr-3`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            System Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of administrative and farmer management statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Total Admins"
            value={analyticsData.totalAdmins}
            icon={UserCheck}
            bgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard
            title="Total Farmers"
            value={analyticsData.totalFarmers.toLocaleString()}
            icon={Users}
            bgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard
            title="Total Queries"
            value={analyticsData.totalQueries}
            icon={MessageSquare}
            bgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
          <StatCard
            title="Solved Queries"
            value={analyticsData.solvedQueries}
            icon={CheckCircle}
            bgColor="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Pending Queries"
            value={analyticsData.pendingQueries}
            icon={Clock}
            bgColor="bg-orange-100"
            iconColor="text-orange-600"
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Query Resolution Summary */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Resolution Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Queries Raised</span>
                <span className="font-semibold text-gray-900">{analyticsData.totalQueries}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Queries Solved</span>
                <span className="font-semibold text-green-600">{analyticsData.solvedQueries}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Queries Pending</span>
                <span className="font-semibold text-orange-600">{analyticsData.pendingQueries}</span>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Resolution Rate</span>
                <span className="font-bold text-blue-600">
                  {((analyticsData.solvedQueries / analyticsData.totalQueries) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* System Overview */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <UserCheck className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">Administrative Staff</span>
                </div>
                <span className="font-semibold text-blue-600">{analyticsData.totalAdmins}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-700">Registered Farmers</span>
                </div>
                <span className="font-semibold text-green-600">{analyticsData.totalFarmers.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-gray-700">Active Issues</span>
                </div>
                <span className="font-semibold text-orange-600">{analyticsData.pendingQueries}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Query Resolution Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(analyticsData.solvedQueries / analyticsData.totalQueries) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>0</span>
            <span className="font-medium">
              {analyticsData.solvedQueries} of {analyticsData.totalQueries} queries resolved
            </span>
            <span>{analyticsData.totalQueries}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;