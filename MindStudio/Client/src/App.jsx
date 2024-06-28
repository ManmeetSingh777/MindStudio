import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SpecializationPage from './pages/SpecializationPage';
import AboutUs from './pages/AboutUsPage';
import FaqPage from './pages/FAQPage';
import ContactUs from './pages/ContactUsPage';
import Events from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import BookingComponent from './pages/BookingPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/MagicNavbar';
import './App.css';
import { AuthProvider, AuthContext } from './context/AuthContext';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    }
  }, [navigate]);

  return null;
};

const AdminRoute = ({ element }) => {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/specializations" element={<SpecializationPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking/:therapistId" element={<BookingComponent />} />
          <Route path="/oauth/callback" element={<OAuthCallback />} />
          <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
