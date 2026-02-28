import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TrackPackage from './pages/TrackPackage';
import ShipWithAccount from './pages/ShipWithAccount';
import CalculateRates from './pages/CalculateRates';
import SchedulePickup from './pages/SchedulePickup';
import CancelPickup from './pages/CancelPickup';
import ProofOfDelivery from './pages/ProofOfDelivery';
import ShipmentDetails from './pages/ShipmentDetails';
import Preferences from './pages/Preferences';
import { User, UserRole } from './types/models';
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

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard currentUser={currentUser} />} />
          <Route path="/tracking" element={<TrackPackage />} />
          <Route path="/ship-with-account" element={<ShipWithAccount />} />
          <Route path="/calculate-rates" element={<CalculateRates />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/cancel-pickup" element={<CancelPickup />} />
          <Route path="/proof-of-delivery" element={<ProofOfDelivery />} />
          <Route path="/shipment-details/:trackingNumber" element={<ShipmentDetails />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/reports" element={<div>Reports Page</div>} />
          <Route path="/delivery-proof" element={<div>Delivery Proof Page</div>} />
          <Route path="/shipping" element={<div>Shipping Page</div>} />
          <Route path="/services" element={<div>Services Page</div>} />
          <Route path="/about" element={<div>About Us Page</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
