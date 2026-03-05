import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Overview from './pages/Overview';
import TrackPackage from './pages/TrackPackage';
import ShipWithAccount from './pages/ShipWithAccount';
import CalculateRates from './pages/CalculateRates';
import SchedulePickup from './pages/SchedulePickup';
import CancelPickup from './pages/CancelPickup';
import ProofOfDelivery from './pages/ProofOfDelivery';
import ShipmentDetails from './pages/ShipmentDetails';
import Preferences from './pages/Preferences';
import Claim from './pages/Claim';
import Reports from './pages/Reports';
import Billing from './pages/Billing';
import AddressBook from './components/AddressBook';
import UserManagement from './components/UserManagement';
import { User, UserRole, Address, AccountUser, NewUserData, UserStatus } from './types/models';
import './styles/theme.css';
import './styles/global.css';
import './App.css';

function App() {
  // Mock current user - in production, this would come from authentication
  const currentUser: User = {
    id: '1',
    firstName: 'Andy',
    lastName: 'Smith',
    email: 'andy.smith@example.com',
    role: UserRole.ADMIN,
    language: 'EN',
    region: 'US',
  };

  // Mock users data
  const [users, setUsers] = useState<AccountUser[]>([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      accountNumber: 'ACC-001234',
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
      invitedAt: new Date('2024-01-15'),
      lastLogin: new Date('2026-03-04'),
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      accountNumber: 'ACC-001235',
      role: UserRole.USER,
      status: UserStatus.ACTIVE,
      invitedAt: new Date('2024-02-20'),
      lastLogin: new Date('2026-03-03'),
    },
    {
      id: '3',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      accountNumber: 'ACC-001236',
      role: UserRole.VIEWER,
      status: UserStatus.INVITED,
      invitedAt: new Date('2026-03-01'),
    },
  ]);

  const handleAddUser = (userData: NewUserData) => {
    const newUser: AccountUser = {
      id: `${users.length + 1}`,
      ...userData,
      status: UserStatus.INVITED,
      invitedAt: new Date(),
    };
    setUsers([...users, newUser]);
  };

  const handleRemoveUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<DashboardLayout currentUser={currentUser} />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="tracking" element={<TrackPackage />} />
            <Route path="ship-with-account" element={<ShipWithAccount />} />
            <Route path="schedule-pickup" element={<SchedulePickup />} />
            <Route path="cancel-pickup" element={<CancelPickup />} />
            <Route path="calculate-rates" element={<CalculateRates />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="claim" element={<Claim />} />
            <Route path="admin" element={<UserManagement users={users} onAddUser={handleAddUser} onRemoveUser={handleRemoveUser} />} />
            <Route path="address-book" element={<AddressBook addresses={[]} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} />} />
            <Route path="reports" element={<Reports />} />
            <Route path="billing" element={<Billing />} />
            <Route path="shipment-details/:trackingNumber" element={<ShipmentDetails />} />
            <Route path="proof-of-delivery" element={<ProofOfDelivery />} />
          </Route>
          
          {/* Public routes outside dashboard layout */}
          <Route path="/shipping" element={<div>Shipping Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
