import React from 'react';
import './ShipmentActions.css';

interface ShipmentActionsProps {
  onCreateAirbill: () => void;
  onSchedulePickup: () => void;
  onCancelPickup: () => void;
}

const ShipmentActions: React.FC<ShipmentActionsProps> = ({
  onCreateAirbill,
  onSchedulePickup,
  onCancelPickup,
}) => {
  return (
    <div className="shipment-actions-grid">
      <div className="action-card" onClick={onCreateAirbill}>
        <div className="action-icon">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <rect x="15" y="20" width="30" height="25" stroke="#4A90E2" strokeWidth="2" fill="none"/>
            <path d="M20 15 L25 20 L35 20 L40 15" stroke="#4A90E2" strokeWidth="2" fill="none"/>
            <line x1="25" y1="28" x2="35" y2="28" stroke="#4A90E2" strokeWidth="2"/>
            <line x1="25" y1="33" x2="35" y2="33" stroke="#4A90E2" strokeWidth="2"/>
          </svg>
        </div>
        <h3 className="action-title">Create airbill</h3>
        <button className="action-button">Click Here</button>
      </div>

      <div className="action-card" onClick={onSchedulePickup}>
        <div className="action-icon">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="18" stroke="#4A90E2" strokeWidth="2" fill="none"/>
            <path d="M30 20 L30 30 L38 30" stroke="#4A90E2" strokeWidth="2"/>
            <circle cx="30" cy="30" r="2" fill="#4A90E2"/>
          </svg>
        </div>
        <h3 className="action-title">Schedule pickup</h3>
        <button className="action-button">Click Here</button>
      </div>

      <div className="action-card" onClick={onCancelPickup}>
        <div className="action-icon">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="18" stroke="#4A90E2" strokeWidth="2" fill="none"/>
            <path d="M22 22 L38 38 M38 22 L22 38" stroke="#4A90E2" strokeWidth="2"/>
          </svg>
        </div>
        <h3 className="action-title">Cancel a scheduled pickup</h3>
        <button className="action-button">Click Here</button>
      </div>
    </div>
  );
};

export default ShipmentActions;
