import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ShipmentDetails.css';

const ShipmentDetails: React.FC = () => {
  const navigate = useNavigate();
  const { trackingNumber } = useParams<{ trackingNumber: string }>();

  // Mock shipment data
  const shipmentData = {
    trackingNumber: trackingNumber || 'QY326068',
    status: 'DELIVERED',
    serviceType: 'LSO Ground™',
    airbillNo: 'QY326068',
    trackingStatus: 'Delivered',
    deliveryDate: '2025-12-16 19:25',
    signedBy: 'Emily Johnson',
    weight: '25.6 lbs',
    deliveryAddress: '1515 Pine Blvd, Los Angeles, CA 90048',
    signatureUrl: '/signature.png',
    proofImageUrl: '/delivery-proof.jpg',
    sender: {
      name: 'John Smith',
      address: '742 Evergreen Terrace',
      city: 'New York',
      state: 'NY',
      zip: '10001'
    },
    receiver: {
      name: 'Emily Johnson',
      address: '1515 Pine Boulevard',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001'
    },
    trackingHistory: [
      { status: 'Data Transmitted', date: '01/08/2025 06:28 PM', location: 'NEW YORK' },
      { status: 'Picked Up', date: '01/08/2025 11:20 PM', location: 'NEW YORK' },
      { status: 'Inbound scan at destination', date: '01/09/2025 12:15 AM', location: 'LOS ANGELES' },
      { status: 'Delivered', date: '2025-12-16 19:25', location: 'LOS ANGELES' }
    ]
  };

  const handleBackToList = () => {
    navigate(-1);
  };

  const handlePrintDetails = () => {
    window.print();
  };

  const handleTrackAnother = () => {
    navigate('/dashboard');
  };

  return (
    <div className="shipment-details-page">
      <div className="shipment-details-header">
        <button className="back-to-list-btn" onClick={handleBackToList}>
          ← Back to the list
        </button>
        <h2>Shipment Details</h2>
      </div>

      <div className="shipment-details-container">
        {/* Top Section: Tracking Number and Status */}
        <div className="details-top-banner">
          <div className="tracking-number-display">#{shipmentData.trackingNumber}</div>
          <div className="status-badges">
            <span className="status-badge delivered">{shipmentData.status}</span>
            <span className="service-badge">{shipmentData.serviceType}</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="details-content-grid">
          {/* Left Column */}
          <div className="details-left-column">
            {/* Shipment Information */}
            <div className="info-card">
              <h3 className="card-title">Shipment Information</h3>
              <div className="info-grid">
                <div className="info-row">
                  <span className="info-label">AIRBILL NO.</span>
                  <span className="info-value">{shipmentData.airbillNo}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">TRACKING STATUS</span>
                  <span className="info-value">{shipmentData.trackingStatus}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">DELIVERY DATE</span>
                  <span className="info-value">{shipmentData.deliveryDate}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">SIGNED BY</span>
                  <span className="info-value">{shipmentData.signedBy}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">SERVICE TYPE</span>
                  <span className="info-value">{shipmentData.serviceType}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">WEIGHT</span>
                  <span className="info-value">{shipmentData.weight}</span>
                </div>
              </div>
            </div>

            {/* Sender and Receiver Information */}
            <div className="parties-container">
              <div className="party-card">
                <div className="party-icon">👤</div>
                <h4 className="party-title">Sender Information</h4>
                <div className="party-name">{shipmentData.sender.name}</div>
                <div className="party-address">{shipmentData.sender.address}</div>
                <div className="party-location">
                  {shipmentData.sender.city}, {shipmentData.sender.state} {shipmentData.sender.zip}
                </div>
              </div>

              <div className="party-card">
                <div className="party-icon">👤</div>
                <h4 className="party-title">Receiver Information</h4>
                <div className="party-name">{shipmentData.receiver.name}</div>
                <div className="party-address">{shipmentData.receiver.address}</div>
                <div className="party-location">
                  {shipmentData.receiver.city}, {shipmentData.receiver.state} {shipmentData.receiver.zip}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="details-right-column">
            {/* Delivery Info */}
            <div className="info-card">
              <h3 className="card-title">Delivery Info</h3>
              <div className="delivery-address">
                <div className="address-icon">📍</div>
                <div className="address-text">{shipmentData.deliveryAddress}</div>
              </div>
              <div className="delivery-actions">
                <button className="action-link">View Signature</button>
                <button className="action-link">View Image</button>
              </div>
            </div>

            {/* Tracking History */}
            <div className="info-card tracking-history-card">
              <h3 className="card-title">Tracking History</h3>
              <div className="tracking-timeline">
                {shipmentData.trackingHistory.map((event, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-status">{event.status}</div>
                      <div className="timeline-details">
                        <span className="timeline-date">{event.date}</span>
                        <span className="timeline-location">{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="details-actions">
          <button className="action-btn secondary-btn" onClick={handleTrackAnother}>
            Track Another
          </button>
          <button className="action-btn primary-btn" onClick={handlePrintDetails}>
            📄 Print Details
          </button>
        </div>
      </div>

      {/* Export Dialog - Removed from this page */}
    </div>
  );
};

export default ShipmentDetails;
