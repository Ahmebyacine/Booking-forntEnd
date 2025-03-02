import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from "@/Component/Layout";
import Login from '@/Pages/Auth/Login';
import Signup from '@/Pages/Auth/Signup';
import Landing from '@/Pages/Common/Landing';
import Booking from '@/Pages/Users/Booking';
import BookingUsers from '@/Pages/Users/BookingUsers';
import Bookings from '@/Pages/Admin/BookingsCRUD';
import Service from '@/Pages/Admin/ServiceCRUD';
import Customers from '@/Pages/Admin/Customers';
import Statistic from '@/Pages/Admin/Statistic';
import BookingEmployee from '@/Pages/Employee/BookingEmployee';
import CustomersEmployee from '@/Pages/Employee/CustomersEmployee';
import StatisticEmployee from '@/Pages/Employee/StatisticEmployee';
import SettingPage from '@/Pages/Common/SettingPage';
import PersonalInfoForm from '@/Layouts/Setting/PersonalInfoForm';
import ChangePasswordForm from '@/Layouts/Setting/ChangePasswordForm';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('isAuthenticated') === 'true');
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, [isAuthenticated]);

  const login = useCallback(() => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    setRole(localStorage.getItem('role'));
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }, []);

  const ProtectedRoute = useCallback(({ element, allowedRoles }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      if (role === 'user') {
        return <Navigate to="/booking" />;
      }
      if (role === 'admin') {
        return <Navigate to="/all-bookings" />;
      }
      if (role === 'employee') {
        return <Navigate to="/employee/all-bookings" />;
      }
    }

    return element;
  }, [isAuthenticated, role]);

  return (
    <Router>
      <Layout isOpen={isOpen} setIsOpen={setIsOpen} isAuthenticated={isAuthenticated} logout={logout} role={role}>
        <Routes>

          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/signup" element={<Signup onLogin={login}/>} />

          <Route path="/" element={<Landing/>} />


          <Route path="/booking" element={<ProtectedRoute element={<Booking />} allowedRoles={['user']} />} />
          <Route path="/your-booking" element={<ProtectedRoute element={<BookingUsers />} allowedRoles={['user']} />} />


          <Route path="/all-bookings" element={<ProtectedRoute element={<Bookings />} allowedRoles={['admin']} />} />
          <Route path="/services" element={<ProtectedRoute element={<Service />} allowedRoles={['admin']} />} />
          <Route path="/customers" element={<ProtectedRoute element={<Customers />} allowedRoles={['admin']} />} />
          <Route path="/statistic" element={<ProtectedRoute element={<Statistic />} allowedRoles={['admin']} />} />

          <Route path="/employee/customers" element={<ProtectedRoute element={<CustomersEmployee />} allowedRoles={['employee']} />} />
          <Route path="/employee/all-bookings" element={<ProtectedRoute element={<BookingEmployee />} allowedRoles={['employee']} />} />
          <Route path="/employee/statistic" element={<ProtectedRoute element={<StatisticEmployee />} allowedRoles={['employee']} />} />
         
         
          <Route path="/setting" element={<ProtectedRoute element={<SettingPage  />}  />} />
          <Route path="/settings/account" element={<ProtectedRoute element={<PersonalInfoForm  />}  />} />
          <Route path="/settings/privacy" element={<ProtectedRoute element={<ChangePasswordForm  />}  />} />

        </Routes>
      </Layout>
    </Router>
  );
}
export default App;