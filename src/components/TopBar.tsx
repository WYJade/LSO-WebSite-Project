import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-container">
        <div className="top-bar-left">
          <button className="ship-now-btn">Ship With LSO Now</button>
        </div>
        <div className="top-bar-right">
          <a href="/alerts" className="top-bar-link">
            <span className="icon">⚠️</span> Alerts
          </a>
          <a href="/sales" className="top-bar-link">Sales</a>
          <a href="/customer-service" className="top-bar-link">Customer Service</a>
          <div className="locations-dropdown">
            <button className="top-bar-link">
              <span className="icon">📍</span> Locations ▼
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
