import React from 'react';
import './Billing.css';

const Billing: React.FC = () => {
  return (
    <div className="billing-page">
      <div className="coming-soon-container">
        <div className="coming-soon-icon">💳</div>
        <h2>Billing</h2>
        <p className="coming-soon-message">
          This feature is coming soon!
        </p>
        <p className="coming-soon-description">
          We're working hard to bring you a comprehensive billing management system.
          Stay tuned for updates.
        </p>
      </div>
    </div>
  );
};

export default Billing;
