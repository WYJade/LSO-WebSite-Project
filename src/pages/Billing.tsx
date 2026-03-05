import React from 'react';
import './Billing.css';

const Billing: React.FC = () => {
  return (
    <div className="billing-page">
      {/* Feature Cards Section */}
      <div className="billing-features">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">Invoice History</h3>
          <p className="feature-description">
            View and download all your past invoices and billing statements
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3 className="feature-title">Payment Methods</h3>
          <p className="feature-description">
            Manage your payment methods and set up automatic billing
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3 className="feature-title">Spending Analytics</h3>
          <p className="feature-description">
            Track your shipping costs and analyze spending patterns
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔔</div>
          <h3 className="feature-title">Billing Alerts</h3>
          <p className="feature-description">
            Get notified about upcoming payments and billing updates
          </p>
        </div>
      </div>

      {/* Coming Soon Banner */}
      <div className="coming-soon-banner">
        <div className="banner-content">
          <div className="banner-badge">Coming Soon</div>
          <h2 className="banner-title">We're Building Something Great</h2>
          <p className="banner-description">
            Our comprehensive billing management system is currently under development. 
            We're working hard to bring you powerful tools to manage your invoices, 
            track expenses, and streamline your payment processes.
          </p>
          <div className="banner-features">
            <div className="banner-feature-item">
              <span className="check-icon">✓</span>
              <span>Real-time invoice generation</span>
            </div>
            <div className="banner-feature-item">
              <span className="check-icon">✓</span>
              <span>Multiple payment options</span>
            </div>
            <div className="banner-feature-item">
              <span className="check-icon">✓</span>
              <span>Detailed spending reports</span>
            </div>
            <div className="banner-feature-item">
              <span className="check-icon">✓</span>
              <span>Automated billing reminders</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
