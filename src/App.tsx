import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PublicTracking from './pages/PublicTracking';
import PublicShipmentDetails from './pages/PublicShipmentDetails';
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
import { User, UserRole, AccountUser, NewUserData, UserStatus } from './types/models';
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
      loginUsername: 'johndoe',
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
      loginUsername: 'janesmith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      accountNumber: 'ACC-001235',
      role: UserRole.STANDARD_USER,
      status: UserStatus.ACTIVE,
      invitedAt: new Date('2024-02-20'),
      lastLogin: new Date('2026-03-03'),
    },
    {
      id: '3',
      loginUsername: 'bobjohnson',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@example.com',
      accountNumber: 'ACC-001236',
      role: UserRole.STANDARD_USER,
      status: UserStatus.INACTIVE,
      invitedAt: new Date('2026-03-01'),
    },
  ]);

  const handleAddUser = (userData: NewUserData) => {
    const newUser: AccountUser = {
      id: `${users.length + 1}`,
      loginUsername: userData.loginUsername,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      accountNumber: userData.accountNumber,
      role: userData.role,
      status: UserStatus.ACTIVE,
      invitedAt: new Date(),
    };
    setUsers([...users, newUser]);
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === UserStatus.ACTIVE ? UserStatus.INACTIVE : UserStatus.ACTIVE }
        : user
    ));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public home page */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* Public tracking pages */}
          <Route path="/tracking" element={<PublicTracking />} />
          <Route path="/tracking/:trackingNumber" element={<PublicShipmentDetails />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<DashboardLayout currentUser={currentUser} />}>
            <Route index element={<Navigate to="/dashboard/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="tracking" element={<TrackPackage />} />
            <Route path="ship-with-account" element={<ShipWithAccount />} />
            <Route path="schedule-pickup" element={<SchedulePickup />} />
            <Route path="cancel-pickup" element={<CancelPickup />} />
            <Route path="calculate-rates" element={<CalculateRates />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="claim" element={<Claim />} />
            <Route path="admin" element={<UserManagement users={users} onAddUser={handleAddUser} onToggleStatus={handleToggleUserStatus} />} />
            <Route path="address-book" element={<AddressBook addresses={[]} onAdd={() => {}} onEdit={() => {}} onDelete={() => {}} />} />
            <Route path="reports" element={<Reports />} />
            <Route path="billing" element={<Billing />} />
            <Route path="shipment-details/:trackingNumber" element={<ShipmentDetails />} />
            <Route path="proof-of-delivery" element={<ProofOfDelivery />} />
          </Route>
          
          {/* Legacy routes - redirect to dashboard */}
          <Route path="/overview" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/ship-with-account" element={<Navigate to="/dashboard/ship-with-account" replace />} />
          <Route path="/calculate-rates" element={<Navigate to="/dashboard/calculate-rates" replace />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
