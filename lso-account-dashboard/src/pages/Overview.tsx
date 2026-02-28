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
      serviceType: 'LSO Ground™',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      pickupDate: new Date(2024, 1, 10 + index),
      deliveredTime: index % 3 === 0 ? new Date(2024, 1, 15 + index) : undefined,
      signedBy: index % 3 === 0 ? 'John Doe' : 'Jane Smith',
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
      id: 'create-airbill',
      title: 'Create airbill',
      icon: '📦',
      path: '/ship-with-account',
    },
    {
      id: 'schedule-pickup',
      title: 'Schedule pickup',
      icon: '🚚',
      path: '/schedule-pickup',
    },
    {
      id: 'cancel-pickup',
      title: 'Cancel a scheduled pickup',
      icon: '❌',
      path: '/cancel-pickup',
    },
    {
      id: 'proof-of-delivery',
      title: 'Proof of Delivery',
      icon: '📋',
      path: '/proof-of-delivery',
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
                  <div className="result-tracking-info">
                    <span className="result-tracking-number">Tracking # {result.trackingNumber}</span>
                    <span className="result-service-type-badge">{result.serviceType}</span>
                    <span className={`result-status-badge status-${result.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {result.status}
                    </span>
                  </div>
                  {result.status === 'Delivered' && result.deliveredTime && (
                    <div className="result-sign-time">Delivered time: {result.deliveredTime.toLocaleString()}</div>
                  )}
                </div>
                <div className="result-route">
                  <div className="result-location from-location">
                    <div className="location-label">FROM</div>
                    <div className="location-city">{result.origin.split(',')[0]}</div>
                    <div className="location-person">{result.signedBy || 'Sender'}</div>
                  </div>
                  <div className="result-arrow">
                    <svg className="route-arrow-icon" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <marker id={`arrowhead-${result.id}`} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                          <polygon points="0 3, 12 6, 0 9" fill="#d0d0d0" />
                        </marker>
                      </defs>
                      <line x1="10" y1="20" x2="190" y2="20" stroke="#d0d0d0" strokeWidth="3" markerEnd={`url(#arrowhead-${result.id})`} />
                    </svg>
                  </div>
                  <div className="result-location to-location">
                    <div className="location-label">TO</div>
                    <div className="location-city">{result.destination.split(',')[0]}</div>
                    <div className="location-person">{result.signedBy || 'Receiver'}</div>
                  </div>
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
              onClick={() => handleNavigate(card.path)}
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
