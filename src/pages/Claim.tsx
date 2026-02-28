import React, { useState } from 'react';
import './Claim.css';

const Claim: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="claim-page">
      <h2>Your Claims</h2>
      
      <div className="claim-actions">
        <button className="new-claim-button">
          Click for New Claim Link
        </button>
      </div>

      <div className="claim-options">
        <div className="claim-option-section">
          <button
            className="claim-option-header"
            onClick={() => toggleSection('file-claim')}
          >
            <span>How to File a Claim</span>
            <span className="expand-icon">{expandedSection === 'file-claim' ? '−' : '+'}</span>
          </button>
          {expandedSection === 'file-claim' && (
            <div className="claim-option-content">
              <p>To file a claim, please follow these steps:</p>
              <ol>
                <li>Click the "Click for New Claim Link" button above</li>
                <li>Fill out the claim form with shipment details</li>
                <li>Upload supporting documentation (photos, receipts, etc.)</li>
                <li>Submit the claim for review</li>
              </ol>
              <p>Claims are typically processed within 5-7 business days.</p>
            </div>
          )}
        </div>

        <div className="claim-option-section">
          <button
            className="claim-option-header"
            onClick={() => toggleSection('claim-types')}
          >
            <span>Types of Claims</span>
            <span className="expand-icon">{expandedSection === 'claim-types' ? '−' : '+'}</span>
          </button>
          {expandedSection === 'claim-types' && (
            <div className="claim-option-content">
              <ul>
                <li><strong>Damage:</strong> Package arrived damaged</li>
                <li><strong>Loss:</strong> Package was lost in transit</li>
                <li><strong>Delay:</strong> Package arrived significantly late</li>
                <li><strong>Other:</strong> Other issues with your shipment</li>
              </ul>
            </div>
          )}
        </div>

        <div className="claim-option-section">
          <button
            className="claim-option-header"
            onClick={() => toggleSection('required-docs')}
          >
            <span>Required Documentation</span>
            <span className="expand-icon">{expandedSection === 'required-docs' ? '−' : '+'}</span>
          </button>
          {expandedSection === 'required-docs' && (
            <div className="claim-option-content">
              <p>Please prepare the following documents:</p>
              <ul>
                <li>Tracking number</li>
                <li>Photos of damaged package (if applicable)</li>
                <li>Original invoice or receipt</li>
                <li>Proof of value</li>
                <li>Packing slip</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="existing-claims">
        <h3>Recent Claims</h3>
        <div className="no-claims-message">
          <p>You have no active claims at this time.</p>
        </div>
      </div>
    </div>
  );
};

export default Claim;
