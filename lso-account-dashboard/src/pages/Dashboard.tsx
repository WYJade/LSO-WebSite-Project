import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import WelcomeHeader from '../components/WelcomeHeader';
import TabNavigation from '../components/TabNavigation';
import OverviewTab from './OverviewTab';
import AddressBook from '../components/AddressBook';
import UserManagement from '../components/UserManagement';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, Shipment, Address, AccountUser, NewUserData } from '../types/models';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const [shipments] = useState<Shipment[]>([]);
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

  const handleTrackPackage = () => {
    navigate('/tracking');
  };

  const handleViewReports = () => {
    navigate('/tracking?tab=reports');
  };

  const handleViewProofOfDelivery = () => {
    navigate('/delivery-proof');
  };

  const handleShipmentOptionSelect = (option: string) => {
    console.log('Shipment option selected:', option);
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

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <OverviewTab
          shipments={shipments}
          onTrackPackage={handleTrackPackage}
          onViewReports={handleViewReports}
          onViewProofOfDelivery={handleViewProofOfDelivery}
          onShipmentOptionSelect={handleShipmentOptionSelect}
        />
      ),
    },
    {
      id: 'datahub',
      label: 'Datahub',
      content: <div>Datahub content coming soon...</div>,
    },
    {
      id: 'add-user',
      label: 'Add additional user',
      content: (
        <UserManagement
          users={users}
          onAddUser={handleAddUser}
          onRemoveUser={handleRemoveUser}
        />
      ),
    },
    {
      id: 'address-book',
      label: 'Address book',
      content: (
        <AddressBook
          addresses={addresses}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onDelete={handleDeleteAddress}
        />
      ),
    },
    {
      id: 'group-maintenance',
      label: 'Group maintenance',
      content: <div>Group maintenance content coming soon...</div>,
    },
  ];

  return (
    <div className="dashboard">
      {/* <TopBar /> */}
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={handleLogoClick}
        onMenuItemClick={handleMenuItemClick}
        onSearch={handleSearch}
        onLanguageChange={handleLanguageChange}
      />
      <WelcomeHeader userName={currentUser.firstName} />
      <TabNavigation
        tabs={tabs}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
