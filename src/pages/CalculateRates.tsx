import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, UserRole } from '../types/models';
import './CalculateRates.css';

const CalculateRates: React.FC = () => {
  const navigate = useNavigate();
  
  const currentUser: User = {
    id: '1',
    firstName: 'Andy',
    lastName: 'Smith',
    email: 'andy.smith@example.com',
    role: UserRole.ADMIN,
    language: 'EN',
    region: 'US',
  };

  const [weight, setWeight] = useState('');
  const [originatingZip, setOriginatingZip] = useState('');
  const [destinationZip, setDestinationZip] = useState('');
  const [pickupOption, setPickupOption] = useState('dropbox');
  const [weightError, setWeightError] = useState('');
  const [originatingZipError, setOriginatingZipError] = useState('');
  const [destinationZipError, setDestinationZipError] = useState('');

  const handleShowGroundRate = () => {
    let hasError = false;
    
    if (!weight) {
      setWeightError('Weight is required');
      hasError = true;
    }
    if (!originatingZip) {
      setOriginatingZipError('Originating Zip is required');
      hasError = true;
    }
    if (!destinationZip) {
      setDestinationZipError('Destination Zip is required');
      hasError = true;
    }
    
    if (hasError) return;
    
    console.log('Show ground rate');
  };

  const handleShowExpressRate = () => {
    let hasError = false;
    
    if (!weight) {
      setWeightError('Weight is required');
      hasError = true;
    }
    if (!originatingZip) {
      setOriginatingZipError('Originating Zip is required');
      hasError = true;
    }
    if (!destinationZip) {
      setDestinationZipError('Destination Zip is required');
      hasError = true;
    }
    
    if (hasError) return;
    
    console.log('Show express rate');
  };

  return (
    <div className="calculate-rates-page">
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={() => navigate('/')}
        onMenuItemClick={(item: MenuItem) => navigate(item.href)}
        onSearch={(query: string) => console.log('Search:', query)}
        onLanguageChange={(lang: string) => console.log('Language:', lang)}
      />

      {/* Hero Banner */}
      <div className="rates-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-subtitle">SERVICES</p>
            <h1 className="hero-title">CALCULATE RATES</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Home</a>
          <span className="separator">›</span>
          <span className="current">Calculate rates</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="rates-content">
        <div className="rates-container">
          {/* Header Section */}
          <div className="rates-header">
            <div className="header-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="26" cy="18" rx="21" ry="8" fill="#1E3A8A" transform="rotate(-22 26 18)"/>
                <ellipse cx="30" cy="30" rx="24" ry="9" fill="#2563EB" transform="rotate(3 30 30)"/>
                <circle cx="26" cy="44" r="9" fill="#0EA5E9"/>
              </svg>
            </div>
            <h1 className="page-title">Calculate rates</h1>
          </div>

          <p className="page-description">
            Need to find out if we pick up or deliver to a certain zip code? Simply use the form below to find LSO service and delivery options to that area.
          </p>

          <p className="page-links">
            For more detailed calculations, use <a href="/ship-now">Ship now</a> or <a href="/ship-with-account">Go to your account</a>
          </p>

          {/* Form Section */}
          <div className="rates-form">
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <div className="input-wrapper">
                <input
                  id="weight"
                  type="text"
                  value={weight}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    setWeightError('');
                  }}
                  placeholder="Enter package weight"
                  className={weightError ? 'error' : ''}
                />
                <span className="input-suffix">lbs.</span>
              </div>
              {weightError && <span className="error-message">{weightError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="originating-zip">Originating Zip</label>
              <input
                id="originating-zip"
                type="text"
                value={originatingZip}
                onChange={(e) => {
                  setOriginatingZip(e.target.value);
                  setOriginatingZipError('');
                }}
                placeholder="Enter originating zip code"
                maxLength={5}
                className={originatingZipError ? 'error' : ''}
              />
              {originatingZipError && <span className="error-message">{originatingZipError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="destination-zip">Destination Zip</label>
              <input
                id="destination-zip"
                type="text"
                value={destinationZip}
                onChange={(e) => {
                  setDestinationZip(e.target.value);
                  setDestinationZipError('');
                }}
                placeholder="Enter destination zip code"
                maxLength={5}
                className={destinationZipError ? 'error' : ''}
              />
              {destinationZipError && <span className="error-message">{destinationZipError}</span>}
            </div>

            <div className="form-group">
              <label>Dropoff or Pickup</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="pickup"
                    value="dropbox"
                    checked={pickupOption === 'dropbox'}
                    onChange={(e) => setPickupOption(e.target.value)}
                  />
                  <span>Use LSO Dropbox</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="pickup"
                    value="scheduled"
                    checked={pickupOption === 'scheduled'}
                    onChange={(e) => setPickupOption(e.target.value)}
                  />
                  <span>Regular Scheduled Pickup (Pre-Arranged)</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="pickup"
                    value="schedule"
                    checked={pickupOption === 'schedule'}
                    onChange={(e) => setPickupOption(e.target.value)}
                  />
                  <span>Schedule a Pickup</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button 
                className="btn-show-ground"
                onClick={handleShowGroundRate}
              >
                Show ground rate
              </button>
              <button 
                className="btn-show-express"
                onClick={handleShowExpressRate}
              >
                Show express rate
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <div className="help-container">
          <div className="help-column">
            <p className="help-label">FOR QUESTIONS OR ISSUES</p>
            <h2 className="help-title">
              <span className="help-icon">🎧</span> HELP & SUPPORT
            </h2>
            <button className="btn-help">Get help or get in touch</button>
          </div>
          <div className="help-divider"></div>
          <div className="help-column">
            <p className="help-label">WAS THIS PAGE HELPFUL?</p>
            <h2 className="help-title">
              <span className="help-icon">💬</span> YOUR FEEDBACK
            </h2>
            <button className="btn-feedback">Send us a message</button>
          </div>
        </div>
      </div>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default CalculateRates;
