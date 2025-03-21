import React, {JSX} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {AuthProvider, useAuth} from "./context/AuthContext";
import {UserProvider} from "./context/UserContext";

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
import OrderPage from "./pages/manager/OrderPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import OrderFoodPage from "./pages/manager/OrderFoodPage.tsx";

const PublicRoute: React.FC<{ element: JSX.Element }> = ({element}) => {
    const {user} = useAuth();
    return user ? <Navigate to="/profile" replace/> : element;
};

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({element}) => {
    const {user} = useAuth();
    return user ? element : <Navigate to="/login" replace/>;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Routes>
                        <Route path="/login" element={<PublicRoute element={<LoginPage/>}/>}/>
                        <Route path="/order" element={<OrderPage />}/>
                        <Route path="/order/food/:id" element={<OrderFoodPage />}/>
                        <Route path="/about" element={<AboutPage />}/>
                        <Route path="/contact-us" element={<ContactUs />}/>
                        <Route path="/register" element={<PublicRoute element={<RegisterPage/>}/>}/>
                        <Route path="/forget-password" element={<PublicRoute element={<ForgetPasswordPage/>}/>}/>
                        <Route path="/reset-password" element={<PublicRoute element={<ResetPasswordPage/>}/>}/>
                        <Route path="/profile" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <ProfilePage/>
                                </UserProvider>
                            }/>
                        }/>

                        <Route path="/admin" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <AdminDashboardPage/>
                                </UserProvider>
                            }/>
                        }/>


                        <Route path="/manager" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <ManagerDashboardPage/>
                                </UserProvider>
                            }/>
                        }/>

                        <Route path="/supplier" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <SupplierDashboardPage/>
                                </UserProvider>
                            }/>

                        }/>

                        <Route path="/admin/categories" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <CategoryPage/>
                                </UserProvider>
                            }/>

                        }/>

                        <Route path="/admin/foods" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <FoodPage/>
                                </UserProvider>
                            }/>

                        }/>

                        <Route path="/admin/countries" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <CountryPage/>
                                </UserProvider>
                            }/>

                        }/>

                        <Route path="/admin/cities" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <CityPage/>
                                </UserProvider>
                            }/>

                        }/>

                        <Route path="/manager/buildings" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <BuildingPage/>
                                </UserProvider>
                            }/>

                        }/>
                        <Route path="/supplier/inventories" element={
                            <ProtectedRoute element={
                                <UserProvider>
                                    <InventoryPage/>
                                </UserProvider>
                            }/>

                        }/>


                        <Route path="/" element={<HomePage/>}/>

                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;