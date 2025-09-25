import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layout/auth/AuthLayout';
import Login from '../pages/auth/Login';
import NotFoundPage from '../pages/notfound/NotFoundPage';
import AdminMainLayout from '../layout/admin/AdminMainLayout';
import SuperAdminMainLayout from '../layout/superadmin/SuperAdminMainLayout';
import HomePage from '../pages/home/HomePage';
import FormerRegister from '../pages/Former Register/FormerRegister';
import AnalyticsPage from '../pages/home/Analytics';
import FarmerManagementPage from '../pages/Former Register/FarmerManagement';
import CropManagementPage from '../pages/home/CropManagement';
import AboutPage from '../pages/home/News';
import AdminManagement from '../pages/superadmin/AdminManagement';
import CreateAdmin from '../pages/superadmin/CreateAdmin';
import SuperAdminHome from '../pages/superadmin/SuperAdminHome';
import FarmersList from '../pages/superadmin/FarmersList';
import FarmerDetail from '../pages/superadmin/FarmerDetail';
import AllQuery from '../pages/FormerQuery/AllQuery';
import QueryDetail from '../pages/FormerQuery/QueryDetail';

const Router = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminMainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="farmer-management" element={<FarmerManagementPage />} />
        <Route path="crop-management" element={<CropManagementPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="register" element={<FormerRegister />} />
        <Route path="former-query/all" element={<AllQuery />} />
        <Route path="former-query/:id" element={<QueryDetail />} />
      </Route>

     <Route path="/superadmin" element={<SuperAdminMainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<SuperAdminHome />} />
        <Route path="admin-management" element={<AdminManagement />} />
        <Route path="create-admin" element={<CreateAdmin />} />
        <Route path="farmers" element={<FarmersList />} />
        <Route path="farmers/:id" element={<FarmerDetail />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="farmer-management" element={<FarmerManagementPage />} />
        <Route path="crop-management" element={<CropManagementPage />} />
        <Route path="register" element={<FormerRegister />} />
      </Route>

     {/* <Route path="/former" element={<FormerMainLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<HomePage />} />
      </Route> */}

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
