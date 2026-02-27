import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Overview.css';

interface OverviewProps {
  onNavigate?: (path: string) => void;
}

const Overview: React.FC<OverviewProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResults, setTrackingResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    
    if (!trackingInput.trim()) {
      setError('Please enter at least one tracking number');
      return;
    }

    // Parse comma-separated tracking numbers
    const numbers = trackingInput
      .split(',')
      .map(n => n.trim())
      .filter(n => n.length > 0);

    if (numbers.length > 30) {
      setError('Maximum 30 tracking numbers allowed');
      return;
    }

    // Mock search results
    const mockResults = numbers.map((num, index) => ({
      id: `${index + 1}`,
      trackingNumber: num,
      status: index % 3 === 0 ? 'Delivered' : index % 3 === 1 ? 'In Transit' : 'Out For Delivery',
      serviceType: 'Ground',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      pickupDate: new Date(2024, 1, 10 + index),
      deliveredTime: index % 3 === 0 ? new Date(2024, 1, 15 + index) : undefined,
      signedBy: index % 3 === 0 ? 'John Doe' : undefined,
    }));

    setTrackingResults(mockResults);
  };

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  const actionCards = [
    {
      id: 'create-shipment',
      title: 'Create Shipment',
      icon: '📦',
      path: '/ship-with-account',
    },
    {
      id: 'schedule-pickup',
      title: 'Schedule Pickup',
      icon: '🚚',
      path: '/schedule-pickup',
    },
    {
      id: 'calculate-rates',
      title: 'Calculate Rates',
      icon: '💰',
      path: '/calculate-rates',
    },
    {
      id: 'track-package',
      title: 'Track Package',
      icon: '🔍',
      action: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.querySelector('.tracking-search-input')?.focus();
      },
    },
  ];

  return (
    <div className="overview-page">
      {/* Tracking Search Section */}
      <div className="tracking-search-section">
        <h2>Track Your Shipments</h2>
        <div className="tracking-search-box">
          <textarea
            className="tracking-search-input"
            placeholder="Enter up to 30 tracking numbers, separated by commas"
            value={trackingInput}
            onChange={(e) => setTrackingInput(e.target.value)}
            rows={3}
          />
          <button className="search-button" onClick={handleSearch}>
            <span className="search-icon">🔍</span>
            Search
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* Tracking Results */}
      {trackingResults.length > 0 && (
        <div className="tracking-results-section">
          <h3>Tracking Results ({trackingResults.length})</h3>
          <div className="tracking-results-list">
            {trackingResults.map((result) => (
              <div key={result.id} className="tracking-result-card">
                <div className="result-header">
                  <div className="result-tracking-number">
                    <strong>Tracking #:</strong> {result.trackingNumber}
                  </div>
                  <div className="result-badges">
                    <span className="service-type-badge">{result.serviceType}</span>
                    <span className={`status-badge status-${result.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {result.status}
                    </span>
                  </div>
                </div>
                <div className="result-details">
                  <div className="result-row">
                    <span className="label">Origin:</span>
                    <span className="value">{result.origin}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Destination:</span>
                    <span className="value">{result.destination}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Pickup Date:</span>
                    <span className="value">{result.pickupDate.toLocaleDateString()}</span>
                  </div>
                  {result.status === 'Delivered' && result.deliveredTime && (
                    <div className="result-row">
                      <span className="label">Delivered time:</span>
                      <span className="value">{result.deliveredTime.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Action Cards */}
      <div className="action-cards-section">
        <h3>Quick Actions</h3>
        <div className="action-cards-grid">
          {actionCards.map((card) => (
            <div
              key={card.id}
              className="action-card"
              onClick={() => card.action ? card.action() : handleNavigate(card.path!)}
            >
              <div className="action-card-icon">{card.icon}</div>
              <div className="action-card-title">{card.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
