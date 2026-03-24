import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PublicShipmentDetails.css';

const PublicShipmentDetails: React.FC = () => {
  const { trackingNumber } = useParams<{ trackingNumber: string }>();
  const navigate = useNavigate();

  const handleBackToList = () => {
    navigate('/tracking');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Mock shipment data
  const shipmentData = {
    trackingNumber: trackingNumber || 'qwee',
    status: 'Delivered',
    serviceType: 'LSO Ground™',
    createTime: '12/16/2025 07:25 PM CST',
    trackingStatus: 'Delivered',
    deliveryDate: '12/16/2025 07:25 PM',
    billingRef: 'REF23456',
    weight: '25.6 lbs',
    dimensions: '12 in × 8 in × 6 in',
    signedBy: 'Emily Johnson',
    deliveryAddress: '1515 Pine Blvd, Los Angeles, CA 90048',
    sender: {
      name: 'John Smith',
      address: '742 Evergreen Terrace',
      city: 'New York, NY 10001'
    },
    receiver: {
      name: 'Emily Johnson',
      address: '1515 Pine Boulevard',
      city: 'Los Angeles, CA 90001'
    },
    trackingHistory: [
      { status: 'Data Transmitted', time: '01/08/2025 06:28 PM', location: 'NEW YORK' },
      { status: 'Picked Up', time: '01/08/2025 11:20 PM', location: 'NEW YORK' },
      { status: 'Inbound scan at destination', time: '01/09/2025 12:15 AM', location: 'LOS ANGELES' },
      { status: 'Delivered', time: '12/16/2025 07:25 PM', location: 'LOS ANGELES' }
    ]
  };

  return (
    <div className="public-shipment-details-page">
      {/* Top Navigation Bar */}
      <div className="public-nav-bar">
        <div className="public-nav-container">
          <div className="public-nav-left">
            <div className="public-logo" onClick={handleBackToHome}>
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="45" fill="#0066CC"/>
                <path d="M30 35h40v30H30z" fill="white"/>
              </svg>
              <span className="public-logo-text">LSO</span>
            </div>
          </div>
          <div className="public-nav-center">
            <button className="public-nav-link">Shipping</button>
            <button className="public-nav-link">Services</button>
            <button className="public-nav-link active">Tracking</button>
            <button className="public-nav-link">About Us</button>
          </div>
          <div className="public-nav-right">
            <button className="public-login-btn" onClick={handleBackToHome}>
              Login / Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="public-details-content">
        <div className="public-details-container">
          {/* Back Button */}
          <button className="public-back-btn" onClick={handleBackToList}>
            ← Back to the list
          </button>

          {/* Page Title */}
          <h1 className="public-details-title">Shipment Details</h1>

          {/* Tracking Number Header */}
          <div className="public-tracking-header">
            <div className="tracking-number-section">
              <span className="tracking-number-large">#{shipmentData.trackingNumber}</span>
            </div>
            <div className="tracking-badges">
              <span className="tracking-badge status-delivered">{shipmentData.status}</span>
              <span className="tracking-badge service-type">{shipmentData.serviceType}</span>
            </div>
          </div>

          {/* Three Column Layout */}
          <div className="public-three-column-layout">
            {/* Column 1: Shipment Information */}
            <div className="public-column">
              <h2 className="column-title">Shipment Information</h2>
              <div className="column-content">
                <div className="info-item">
                  <span className="info-item-label">Create Time</span>
                  <span className="info-item-value">{shipmentData.createTime}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Tracking Status</span>
                  <span className="info-item-value">{shipmentData.trackingStatus}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Service Type</span>
                  <span className="info-item-value">{shipmentData.serviceType}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Billing Ref</span>
                  <span className="info-item-value">{shipmentData.billingRef}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Weight</span>
                  <span className="info-item-value">{shipmentData.weight}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Dimensions</span>
                  <span className="info-item-value">{shipmentData.dimensions}</span>
                </div>

                <h3 className="subsection-title">Sender</h3>
                <div className="person-block">
                  <div className="person-name">{shipmentData.sender.name}</div>
                  <div className="person-address">{shipmentData.sender.address}</div>
                  <div className="person-address">{shipmentData.sender.city}</div>
                </div>

                <h3 className="subsection-title">Receiver</h3>
                <div className="person-block">
                  <div className="person-name">{shipmentData.receiver.name}</div>
                  <div className="person-address">{shipmentData.receiver.address}</div>
                  <div className="person-address">{shipmentData.receiver.city}</div>
                </div>
              </div>
            </div>

            {/* Column 2: Delivery Information */}
            <div className="public-column">
              <h2 className="column-title">Delivery Information</h2>
              <div className="column-content">
                <div className="info-item">
                  <span className="info-item-label">Delivery Date</span>
                  <span className="info-item-value">{shipmentData.deliveryDate}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Signed By</span>
                  <span className="info-item-value">{shipmentData.signedBy}</span>
                </div>
                <div className="info-item">
                  <span className="info-item-label">Billing Ref</span>
                  <span className="info-item-value">{shipmentData.billingRef}</span>
                </div>
                <div className="delivery-links">
                  <a href="#" className="delivery-link">View Signature</a>
                  <a href="#" className="delivery-link">View Image</a>
                </div>
              </div>
            </div>

            {/* Column 3: Tracking History */}
            <div className="public-column">
              <h2 className="column-title">Tracking History</h2>
              <div className="column-content">
                <div className="history-timeline">
                  {shipmentData.trackingHistory.map((event, index) => (
                    <div key={index} className="history-item">
                      <div className="history-dot"></div>
                      <div className="history-content">
                        <div className="history-status">{event.status}</div>
                        <div className="history-time">{event.time}</div>
                        <div className="history-location">{event.location}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="public-action-buttons">
            <button className="public-action-btn track-another" onClick={handleBackToList}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Track Another
            </button>
            <button className="public-action-btn print-details" onClick={() => window.print()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicShipmentDetails;
