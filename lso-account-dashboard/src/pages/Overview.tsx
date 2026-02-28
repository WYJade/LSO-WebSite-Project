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
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);

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

    // Mock search results with different sender/receiver names
    const senderNames = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'Jessica Martinez', 'James Anderson', 'Jennifer Taylor', 'Robert Thomas', 'Linda Jackson'];
    const receiverNames = ['William White', 'Mary Harris', 'Richard Martin', 'Patricia Thompson', 'Charles Garcia', 'Nancy Rodriguez', 'Joseph Lee', 'Karen Walker', 'Thomas Hall', 'Betty Allen'];
    
    const mockResults = numbers.map((num, index) => ({
      id: `${index + 1}`,
      trackingNumber: num,
      status: index % 3 === 0 ? 'Delivered' : index % 3 === 1 ? 'In Transit' : 'Out For Delivery',
      serviceType: 'LSO Ground™',
      origin: 'Los Angeles, CA',
      destination: 'New York, NY',
      pickupDate: new Date(2024, 1, 10 + index),
      deliveredTime: index % 3 === 0 ? new Date(2024, 1, 15 + index) : undefined,
      sender: senderNames[index % senderNames.length],
      receiver: receiverNames[index % receiverNames.length],
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

  const handlePrintReady = () => {
    window.print();
  };

  const handleExport = () => {
    console.log('Exporting tracking results...');
    alert('Export functionality will be implemented');
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleServiceTypeToggle = (serviceType: string) => {
    setSelectedServiceTypes(prev => 
      prev.includes(serviceType) 
        ? prev.filter(s => s !== serviceType)
        : [...prev, serviceType]
    );
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedServiceTypes([]);
  };

  const handleApplyFilters = () => {
    setShowFilterMenu(false);
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
      id: 'manage-pickup',
      title: 'Manage Pickup',
      icon: '📋',
      path: '/cancel-pickup',
    },
    {
      id: 'rate',
      title: 'Rate',
      icon: '💰',
      path: '/calculate-rates',
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
          <div className="results-header-bar">
            <h3 className="results-title">Tracking Results ({trackingResults.length})</h3>
            <div className="results-actions">
              <button className="print-ready-btn" onClick={handlePrintReady}>
                📄 See Print-ready option
              </button>
              <button className="export-icon-btn" onClick={handleExport}>📤 Export</button>
              <button className="filter-icon-btn" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                🔽 Filter
              </button>
            </div>
          </div>

          {showFilterMenu && (
            <div className="filter-modal-overlay" onClick={() => setShowFilterMenu(false)}>
              <div className="filter-modal-panel" onClick={(e) => e.stopPropagation()}>
                <div className="filter-panel-header">
                  <h4>Filter Options</h4>
                  <button className="filter-close-btn" onClick={() => setShowFilterMenu(false)}>✕</button>
                </div>
                
                <div className="filter-panel-body">
                  <div className="filter-section">
                    <div className="filter-section-title">Status</div>
                    <div className="filter-checkbox-group">
                      {[
                        { value: 'delivered', label: 'Delivered' },
                        { value: 'in-transit', label: 'In Transit' },
                        { value: 'out-for-delivery', label: 'Out For Delivery' },
                      ].map(status => (
                        <label key={status.value} className="filter-checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedStatuses.includes(status.value)}
                            onChange={() => handleStatusToggle(status.value)}
                          />
                          <span>{status.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="filter-section">
                    <div className="filter-section-title">Service Type</div>
                    <div className="filter-checkbox-group">
                      {[
                        'LSO Ground™',
                        'LSO Priority Next Day™',
                        'LSO 2nd Day™',
                      ].map(serviceType => (
                        <label key={serviceType} className="filter-checkbox-item">
                          <input
                            type="checkbox"
                            checked={selectedServiceTypes.includes(serviceType)}
                            onChange={() => handleServiceTypeToggle(serviceType)}
                          />
                          <span>{serviceType}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="filter-panel-footer">
                  <button className="filter-clear-btn" onClick={handleClearFilters}>
                    Clear All
                  </button>
                  <button className="filter-apply-btn" onClick={handleApplyFilters}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

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
                    <div className="location-person">{result.sender}</div>
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
                    <div className="location-person">{result.receiver}</div>
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
