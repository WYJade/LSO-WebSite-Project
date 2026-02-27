import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import WelcomeHeader from '../components/WelcomeHeader';
import MainNavigation, { NavigationModule } from '../components/MainNavigation';
import Overview from './Overview';
import Claim from './Claim';
import AddressBook from '../components/AddressBook';
import UserManagement from '../components/UserManagement';
import TrackPackage from './TrackPackage';
import Billing from './Billing';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, Address, AccountUser, NewUserData } from '../types/models';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState<NavigationModule>('overview');
  
  // Mock data
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [users, setUsers] = useState<AccountUser[]>([]);

  const handleLogoClick = () => {
    navigate('/');
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

  const handleModuleChange = (module: NavigationModule) => {
    setActiveModule(module);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleAddAddress = (address: Address) => {
    setAddresses([...addresses, { ...address, id: Date.now().toString() }]);
  };

  const handleEditAddress = (id: string, address: Address) => {
    setAddresses(addresses.map((a) => (a.id === id ? address : a)));
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleAddUser = (user: NewUserData) => {
    const newUser: AccountUser = {
      ...user,
      id: Date.now().toString(),
      status: 'invited' as any,
      invitedAt: new Date(),
    };
    setUsers([...users, newUser]);
    console.log('Invitation email sent to:', user.email);
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const renderModuleContent = () => {
    switch (activeModule) {
      case 'overview':
        return <Overview onNavigate={handleNavigate} />;
      case 'claim':
        return <Claim />;
      case 'admin':
        return (
          <UserManagement
            users={users}
            onAddUser={handleAddUser}
            onRemoveUser={handleRemoveUser}
          />
        );
      case 'address-book':
        return (
          <AddressBook
            addresses={addresses}
            onAdd={handleAddAddress}
            onEdit={handleEditAddress}
            onDelete={handleDeleteAddress}
          />
        );
      case 'report':
        return <TrackPackage />;
      case 'billing':
        return <Billing />;
      default:
        return <Overview onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="dashboard">
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={handleLogoClick}
        onMenuItemClick={handleMenuItemClick}
        onSearch={handleSearch}
        onLanguageChange={handleLanguageChange}
      />
      <WelcomeHeader userName={currentUser.firstName} />
      <MainNavigation
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
      />
      <div className="dashboard-content">
        {renderModuleContent()}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
