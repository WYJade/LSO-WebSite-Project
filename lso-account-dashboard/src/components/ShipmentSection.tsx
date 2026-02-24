import React, { useState } from 'react';
import { ShipmentSectionProps } from '../types/components';
import './ShipmentSection.css';

const ShipmentSection: React.FC<ShipmentSectionProps> = ({
  shipments,
  onOptionSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="shipment-section" data-testid="shipment-section">
      <div className="section-header">
        <h2 className="section-title">Your shipments</h2>
        <div className="dropdown-container">
          <button
            className="dropdown-button"
            onClick={toggleDropdown}
            data-testid="shipment-dropdown"
          >
            Your shipment options
            <span className={`arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu" data-testid="dropdown-menu">
              <button onClick={() => handleOptionClick('view-all')}>
                View All Shipments
              </button>
              <button onClick={() => handleOptionClick('create-new')}>
                Create New Shipment
              </button>
              <button onClick={() => handleOptionClick('track')}>
                Track Shipment
              </button>
              <button onClick={() => handleOptionClick('history')}>
                Shipment History
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="shipment-content">
        {shipments.length === 0 ? (
          <div className="empty-state" data-testid="empty-state">
            <p>No shipments found. Create your first shipment to get started.</p>
          </div>
        ) : (
          <div className="shipment-list">
            {shipments.map((shipment) => (
              <div key={shipment.id} className="shipment-item">
                <div className="shipment-info">
                  <span className="tracking-number">
                    {shipment.trackingNumber}
                  </span>
                  <span className={`status ${shipment.status}`}>
                    {shipment.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="shipment-details">
                  <span>
                    From: {shipment.origin.city}, {shipment.origin.state}
                  </span>
                  <span>
                    To: {shipment.destination.city}, {shipment.destination.state}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentSection;
