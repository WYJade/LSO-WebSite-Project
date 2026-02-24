import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, UserRole } from '../types/models';
import './ShipWithAccount.css';

const ShipWithAccount: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const currentUser: User = {
    id: '1',
    firstName: 'Andy',
    lastName: 'Smith',
    email: 'andy.smith@example.com',
    role: UserRole.ADMIN,
    language: 'EN',
    region: 'US',
  };

  const steps = [
    { number: 1, title: 'Check service area' },
    { number: 2, title: 'From' },
    { number: 3, title: 'To' },
    { number: 4, title: 'Shipping options' },
    { number: 5, title: 'Review & create airbill' }
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="ship-with-account-page">
      {/* <TopBar /> */}
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={() => navigate('/')}
        onMenuItemClick={(item: MenuItem) => navigate(item.href)}
        onSearch={(query: string) => console.log('Search:', query)}
        onLanguageChange={(lang: string) => console.log('Language:', lang)}
      />

      {/* Hero Banner */}
      <div className="shipping-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-subtitle">SERVICES</p>
            <h1 className="hero-title">SHIP WITH ACCOUNT</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <span className="separator">›</span>
          <span className="current">Ship With Account</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="ship-content-wrapper">
        <div className="ship-content">
          {/* Progress Steps */}
          <div className="progress-steps">
            {steps.map((step) => (
              <div 
                key={step.number} 
                className={`step-item ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
              >
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="step-content">
            {currentStep === 1 && (
              <div className="step-form">
                <h2>Check Service Area</h2>
                <p className="step-description">Verify that we service your shipping route</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Originating Zip Code *</label>
                    <input type="text" className="form-input" placeholder="Enter zip code" maxLength={5} />
                  </div>
                  
                  <div className="form-group">
                    <label>Destination Zip Code *</label>
                    <input type="text" className="form-input" placeholder="Enter zip code" maxLength={5} />
                  </div>
                  
                  <div className="form-group">
                    <label>Country *</label>
                    <select className="form-select">
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="MX">Mexico</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Service *</label>
                    <select className="form-select">
                      <option value="">Select service</option>
                      <option value="ground">LSO Ground™</option>
                      <option value="ecommerce">eCommerce delivery</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Weight (lbs) *</label>
                    <input type="number" className="form-input" placeholder="0.0" step="0.1" min="0" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Dimensions (inches)</label>
                    <div className="dimension-inputs">
                      <input type="number" className="form-input" placeholder="Length" min="0" />
                      <span className="dimension-separator">×</span>
                      <input type="number" className="form-input" placeholder="Width" min="0" />
                      <span className="dimension-separator">×</span>
                      <input type="number" className="form-input" placeholder="Height" min="0" />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Declared Value ($)</label>
                    <input type="number" className="form-input" placeholder="0.00" step="0.01" min="0" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step-form">
                <h2>Sender Information</h2>
                <p className="step-description">Enter the shipping origin details</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" className="form-input" placeholder="Enter company name" />
                  </div>
                  
                  <div className="form-group">
                    <label>Contact Name *</label>
                    <input type="text" className="form-input" placeholder="Enter contact name" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address Line 1 *</label>
                    <input type="text" className="form-input" placeholder="Street address" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address Line 2</label>
                    <input type="text" className="form-input" placeholder="Apartment, suite, etc. (optional)" />
                  </div>
                  
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" className="form-input" placeholder="Enter city" />
                  </div>
                  
                  <div className="form-group">
                    <label>State *</label>
                    <select className="form-select">
                      <option value="">Select state</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Zip Code *</label>
                    <input type="text" className="form-input" placeholder="Enter zip code" maxLength={5} />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" className="form-input" placeholder="(555) 555-5555" />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-input" placeholder="email@example.com" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step-form">
                <h2>Recipient Information</h2>
                <p className="step-description">Enter the shipping destination details</p>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input type="text" className="form-input" placeholder="Enter company name" />
                  </div>
                  
                  <div className="form-group">
                    <label>Contact Name *</label>
                    <input type="text" className="form-input" placeholder="Enter contact name" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address Line 1 *</label>
                    <input type="text" className="form-input" placeholder="Street address" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address Line 2</label>
                    <input type="text" className="form-input" placeholder="Apartment, suite, etc. (optional)" />
                  </div>
                  
                  <div className="form-group">
                    <label>City *</label>
                    <input type="text" className="form-input" placeholder="Enter city" />
                  </div>
                  
                  <div className="form-group">
                    <label>State *</label>
                    <select className="form-select">
                      <option value="">Select state</option>
                      <option value="CA">California</option>
                      <option value="TX">Texas</option>
                      <option value="NY">New York</option>
                      <option value="IL">Illinois</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Zip Code *</label>
                    <input type="text" className="form-input" placeholder="Enter zip code" maxLength={5} />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input type="tel" className="form-input" placeholder="(555) 555-5555" />
                  </div>
                  
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-input" placeholder="email@example.com" />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-form">
                <h2>Shipping Options</h2>
                <p className="step-description">Select additional shipping preferences</p>
                
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Reference Number</label>
                    <input type="text" className="form-input" placeholder="Enter reference number (optional)" />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Special Instructions</label>
                    <textarea className="form-textarea" rows={4} placeholder="Enter any special delivery instructions"></textarea>
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Signature Required</span>
                    </label>
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Saturday Delivery</span>
                    </label>
                  </div>
                  
                  <div className="form-group full-width">
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Insurance Coverage</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="step-form">
                <h2>Review & Create Airbill</h2>
                <p className="step-description">Review your shipment details before creating the airbill</p>
                
                <div className="review-section">
                  <div className="review-card">
                    <h3>📦 Shipment Details</h3>
                    <div className="review-details">
                      <div className="review-row">
                        <span className="review-label">Service:</span>
                        <span className="review-value">LSO Ground™</span>
                      </div>
                      <div className="review-row">
                        <span className="review-label">Weight:</span>
                        <span className="review-value">5.0 lbs</span>
                      </div>
                      <div className="review-row">
                        <span className="review-label">Dimensions:</span>
                        <span className="review-value">12 × 8 × 6 inches</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="review-card">
                    <h3>📤 From</h3>
                    <div className="review-details">
                      <p className="review-address">
                        John Smith<br />
                        123 Main Street<br />
                        New York, NY 10001<br />
                        (555) 555-5555
                      </p>
                    </div>
                  </div>
                  
                  <div className="review-card">
                    <h3>📥 To</h3>
                    <div className="review-details">
                      <p className="review-address">
                        Emily Johnson<br />
                        456 Oak Avenue<br />
                        Los Angeles, CA 90001<br />
                        (555) 555-5556
                      </p>
                    </div>
                  </div>
                  
                  <div className="review-card">
                    <h3>💰 Estimated Cost</h3>
                    <div className="review-details">
                      <div className="review-row">
                        <span className="review-label">Base Rate:</span>
                        <span className="review-value">$12.50</span>
                      </div>
                      <div className="review-row">
                        <span className="review-label">Fuel Surcharge:</span>
                        <span className="review-value">$1.25</span>
                      </div>
                      <div className="review-row total-row">
                        <span className="review-label">Total:</span>
                        <span className="review-value">$13.75</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="step-navigation">
              <button 
                className="nav-btn back-btn" 
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                ← Back
              </button>
              
              {currentStep < 5 ? (
                <button className="nav-btn next-btn" onClick={handleNext}>
                  Next →
                </button>
              ) : (
                <button className="nav-btn create-btn" onClick={() => alert('Airbill created successfully!')}>
                  Create Airbill
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ShipWithAccount;
