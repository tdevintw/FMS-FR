import React, { JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import {UserProvider, useUser} from "./context/UserContext";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/auth/LoginPage.tsx";
import RegisterPage from "./pages/auth/RegisterPage.tsx";
import ForgetPasswordPage from "./pages/auth/ForgetPasswordPage.tsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.tsx";
import ManagerDashboardPage from "./pages/manager/ManagerDashboardPage.tsx";
import SupplierDashboardPage from "./pages/supplier/SupplierDashboardPage.tsx";
import CategoryPage from "./pages/admin/CategoryPage.tsx";
import FoodPage from "./pages/admin/FoodPage.tsx";
import CityPage from "./pages/admin/CityPage.tsx";
import CountryPage from "./pages/admin/CountryPage.tsx";
import BuildingPage from "./pages/manager/BuildingPage.tsx";
import InventoryPage from "./pages/supplier/InventoryPage.tsx";


const PublicRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/profile" replace /> : element;
};

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" replace />;
};

const ProtectedRouteAdmin: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useUser();
    return user?.role === "ADMIN" ? element : <Navigate to="/404" replace />;
};

const ProtectedRouteManager: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user?.role === "MANAGER" ? element :<Navigate to="/404" replace />;
};

const ProtectedRouteSupplier: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { user } = useAuth();
    return user?.role === "SUPPLIER" ? element : <Navigate to="/404" replace />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <UserProvider>
                <Router>
                    <div className="app-container">
                        <Routes>
                            <Route path="/login" element={<PublicRoute element={<LoginPage />} />} />
                            <Route path="/register" element={<PublicRoute element={<RegisterPage />} />} />
                            <Route path="/forget-password" element={<PublicRoute element={<ForgetPasswordPage />} />} />
                            <Route path="/reset-password" element={<PublicRoute element={<ResetPasswordPage />} />} />
                            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                            <Route path="/admin" element={<ProtectedRouteAdmin element={<AdminDashboardPage />} />} />
                            <Route path="/manager" element={<ProtectedRouteManager element={<ManagerDashboardPage />} />} />
                            <Route path="/supplier" element={<ProtectedRouteSupplier element={<SupplierDashboardPage />} />} />
                            <Route path="/admin/categories" element={<ProtectedRouteAdmin element={<CategoryPage />} />} />
                            <Route path="/admin/foods" element={<ProtectedRouteAdmin element={<FoodPage />} />} />
                            <Route path="/admin/countries" element={<ProtectedRouteAdmin element={<CountryPage />} />} />
                            <Route path="/admin/cities" element={<ProtectedRouteAdmin element={<CityPage />} />} />
                            <Route path="/manager/buildings" element={<ProtectedRouteManager element={<BuildingPage />} />} />
                            <Route path="/supplier/inventories" element={<ProtectedRouteSupplier element={<InventoryPage />} />} />
                            <Route path="/" element={<HomePage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </div>
                </Router>
            </UserProvider>
        </AuthProvider>
    );
};
export default App;
