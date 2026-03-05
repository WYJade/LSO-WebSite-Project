import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User } from '../types/models';
import './DashboardLayout.css';

interface DashboardLayoutProps {
  currentUser: User;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ currentUser }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/overview');
  };

  const handleMenuItemClick = (menuItem: MenuItem) => {
    navigate(menuItem.href);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/tracking?q=${encodeURIComponent(query)}`);
    }
  };

  const handleLanguageChange = (language: string) => {
    console.log('Language changed to:', language);
  };

  return (
    <div className="dashboard-layout">
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={handleLogoClick}
        onMenuItemClick={handleMenuItemClick}
        onSearch={handleSearch}
        onLanguageChange={handleLanguageChange}
      />
      <div className="dashboard-body">
        <Sidebar currentUser={currentUser} />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
