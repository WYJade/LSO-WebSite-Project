import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, UserRole } from '../types/models';
import './CalculateRates.css';

interface RateDetail {
  label: string;
  value: string;
}

interface Rate {
  type: string;
  serviceName: string;
  totalCharge: string;
  details: RateDetail[];
  expanded?: boolean;
}

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
  const [expectedShipDate, setExpectedShipDate] = useState('');
  const [dimensionLength, setDimensionLength] = useState('');
  const [dimensionWidth, setDimensionWidth] = useState('');
  const [dimensionHeight, setDimensionHeight] = useState('');
  const [showRates, setShowRates] = useState(false);
  const [rateType, setRateType] = useState<'ground' | 'express'>('ground');
  const [rates, setRates] = useState<Rate[]>([]);
  const [errors, setErrors] = useState({
    weight: false,
    originatingZip: false,
    destinationZip: false,
    pickupOption: false,
    expectedShipDate: false
  });

  // Generate next 7 days for Expected Ship Date dropdown
  const getNext7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      dates.push({
        value: `${month}/${day}/${year}`,
        label: `${month}/${day}/${year}`
      });
    }
    return dates;
  };

  const shipDateOptions = getNext7Days();

  const generateGroundRates = (): Rate[] => {
    const basePrice = parseFloat(weight) * 3.35;
    const fuelSurcharge = basePrice * 0.14;
    const totalCharge = basePrice + fuelSurcharge;

    return [{
      type: 'Ground Rate',
      serviceName: 'LSO Ground',
      totalCharge: `$${totalCharge.toFixed(2)}`,
      details: [
        { label: 'Base Price', value: `$${basePrice.toFixed(2)}` },
        { label: 'Fuel Surcharge', value: `$${fuelSurcharge.toFixed(2)}` },
        { label: 'Pickup Fee Price', value: '0.00' },
        { label: 'Service Charge', value: '0.00' },
        { label: 'Total Charge', value: `$${totalCharge.toFixed(2)}` }
      ],
      expanded: true
    }];
  };

  const generateExpressRates = (): Rate[] => {
    const basePrice = parseFloat(weight) * 14.76;
    const fuelSurcharge = basePrice * 0.14;
    const totalCharge = basePrice + fuelSurcharge;

    return [
      {
        type: 'Express Rate',
        serviceName: 'LSO Priority Overnight',
        totalCharge: `$${totalCharge.toFixed(2)}`,
        details: [
          { label: 'Base Price', value: `$${basePrice.toFixed(2)}` },
          { label: 'Fuel Surcharge', value: `$${fuelSurcharge.toFixed(2)}` },
          { label: 'Pickup Fee Price', value: '0.00' },
          { label: 'Service Charge', value: '0.00' },
          { label: 'Total Charge', value: `$${totalCharge.toFixed(2)}` }
        ],
        expanded: true
      },
      {
        type: 'Express Rate',
        serviceName: 'LSO Early Overnight',
        totalCharge: `$${(totalCharge * 1.72).toFixed(2)}`,
        details: [],
        expanded: false
      },
      {
        type: 'Express Rate',
        serviceName: 'LSO Economy Next Day',
        totalCharge: `$${(totalCharge * 1.61).toFixed(2)}`,
        details: [],
        expanded: false
      },
      {
        type: 'Express Rate',
        serviceName: 'LSO 2nd Day',
        totalCharge: `$${(totalCharge * 0.47).toFixed(2)}`,
        details: [],
        expanded: false
      },
      {
        type: 'Express Rate',
        serviceName: 'LSO Economy delivery',
        totalCharge: `$${(totalCharge * 0.35).toFixed(2)}`,
        details: [],
        expanded: false
      }
    ];
  };

  const handleShowGroundRate = () => {
    const newErrors = {
      weight: !weight,
      originatingZip: !originatingZip,
      destinationZip: !destinationZip,
      pickupOption: false,
      expectedShipDate: !expectedShipDate
    };
    
    setErrors(newErrors);
    
    if (newErrors.weight || newErrors.originatingZip || newErrors.destinationZip || newErrors.expectedShipDate) {
      return;
    }
    
    setRateType('ground');
    setRates(generateGroundRates());
    setShowRates(true);
  };

  const handleShowExpressRate = () => {
    const newErrors = {
      weight: !weight,
      originatingZip: !originatingZip,
      destinationZip: !destinationZip,
      pickupOption: false,
      expectedShipDate: !expectedShipDate
    };
    
    setErrors(newErrors);
    
    if (newErrors.weight || newErrors.originatingZip || newErrors.destinationZip || newErrors.expectedShipDate) {
      return;
    }
    
    setRateType('express');
    setRates(generateExpressRates());
    setShowRates(true);
  };

  const shouldShowBothButtonsInResults = true;

  const toggleRateExpansion = (index: number) => {
    setRates(rates.map((rate, i) => 
      i === index ? { ...rate, expanded: !rate.expanded } : rate
    ));
  };

  const switchToGroundRate = () => {
    setRateType('ground');
    setRates(generateGroundRates());
  };

  const switchToExpressRate = () => {
    setRateType('express');
    setRates(generateExpressRates());
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

      {/* Breadcrumb */}
      <div className="breadcrumb-calc">
        <div className="breadcrumb-inner-calc">
          <a href="/">Home</a>
          <span className="separator">›</span>
          <span className="current">Calculate rates</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="rates-content-calc">
        <div className="rates-container-calc">
          {/* Header Section */}
          <div className="rates-header-calc">
            <div className="header-icon-calc">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M8 12 L20 4 L32 12 L32 28 L20 36 L8 28 Z" fill="#2563EB"/>
              </svg>
            </div>
            <h1 className="page-title-calc">Calculate rates</h1>
          </div>

          <p className="page-description-calc">
            Need to find out if we pick up or deliver to a certain zip code? Simply use the form below to find LSO service and delivery options to that area.
          </p>

          <p className="page-links-calc">
            For more detailed calculations, use <a href="/ship-with-account">Ship now</a> or <a href="/dashboard">Go to your account</a>
          </p>

          {/* Form Section */}
          <div className="rates-layout-calc">
            {/* Left Side - Form */}
            <div className="rates-form-calc">
              <div className="form-group-calc">
                <label htmlFor="weight">Weight</label>
                <div className="input-wrapper-calc">
                  <input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => {
                      setWeight(e.target.value);
                      if (e.target.value) setErrors(prev => ({ ...prev, weight: false }));
                    }}
                    placeholder="Enter weight"
                    className={errors.weight ? 'error' : ''}
                  />
                  <span className="input-suffix-calc">lbs.</span>
                </div>
                {errors.weight && <span className="error-message">Weight is required.</span>}
              </div>

              <div className="form-group-calc form-group-row-calc">
                <div className="form-field-half-calc">
                  <label htmlFor="originating-zip">From Zip</label>
                  <input
                    id="originating-zip"
                    type="text"
                    value={originatingZip}
                    onChange={(e) => {
                      setOriginatingZip(e.target.value);
                      if (e.target.value) setErrors(prev => ({ ...prev, originatingZip: false }));
                    }}
                    placeholder="Enter from zip"
                    maxLength={5}
                    className={errors.originatingZip ? 'error' : ''}
                  />
                  {errors.originatingZip && <span className="error-message">From Zip is required.</span>}
                </div>

                <div className="form-field-half-calc">
                  <label htmlFor="destination-zip">To Zip</label>
                  <input
                    id="destination-zip"
                    type="text"
                    value={destinationZip}
                    onChange={(e) => {
                      setDestinationZip(e.target.value);
                      if (e.target.value) setErrors(prev => ({ ...prev, destinationZip: false }));
                    }}
                    placeholder="Enter to zip"
                    maxLength={5}
                    className={errors.destinationZip ? 'error' : ''}
                  />
                  {errors.destinationZip && <span className="error-message">To Zip is required.</span>}
                </div>
              </div>

              <div className="form-group-calc">
                <label htmlFor="expected-ship-date">Expected Ship Date <span className="required-star">*</span></label>
                <select
                  id="expected-ship-date"
                  value={expectedShipDate}
                  onChange={(e) => {
                    setExpectedShipDate(e.target.value);
                    if (e.target.value) setErrors(prev => ({ ...prev, expectedShipDate: false }));
                  }}
                  className={errors.expectedShipDate ? 'error' : ''}
                >
                  <option value="">Select expected ship date</option>
                  {shipDateOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.expectedShipDate && <span className="error-message">Expected Ship Date is required.</span>}
              </div>

              <div className="form-group-calc">
                <label>Dimension (optional)</label>
                <div className="dimension-inputs-calc">
                  <input
                    type="number"
                    value={dimensionLength}
                    onChange={(e) => setDimensionLength(e.target.value)}
                    placeholder="Length"
                    min="0"
                    step="0.1"
                  />
                  <span className="dimension-separator">×</span>
                  <input
                    type="number"
                    value={dimensionWidth}
                    onChange={(e) => setDimensionWidth(e.target.value)}
                    placeholder="Width"
                    min="0"
                    step="0.1"
                  />
                  <span className="dimension-separator">×</span>
                  <input
                    type="number"
                    value={dimensionHeight}
                    onChange={(e) => setDimensionHeight(e.target.value)}
                    placeholder="Height"
                    min="0"
                    step="0.1"
                  />
                  <span className="dimension-unit">in</span>
                </div>
              </div>

              <div className="form-group-calc">
                <label>Dropoff or Pickup</label>
                <div className="radio-group-calc">
                  <label className="radio-option-calc">
                    <input
                      type="radio"
                      name="pickup"
                      value="dropbox"
                      checked={pickupOption === 'dropbox'}
                      onChange={(e) => setPickupOption(e.target.value)}
                    />
                    <span>Use LSO Dropbox</span>
                  </label>
                  <label className="radio-option-calc">
                    <input
                      type="radio"
                      name="pickup"
                      value="scheduled"
                      checked={pickupOption === 'scheduled'}
                      onChange={(e) => setPickupOption(e.target.value)}
                    />
                    <span>Regular Scheduled Pickup (Pre-Arranged)</span>
                  </label>
                  <label className="radio-option-calc">
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
                {errors.pickupOption && <span className="error-message">You must choose Dropoff or Pickup option</span>}
              </div>

              <div className="form-actions-calc">
                <button 
                  className="btn-show-ground-calc"
                  onClick={handleShowGroundRate}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M8 12L3 7h10l-5 5z"/>
                  </svg>
                  Show ground rate
                </button>
                <button 
                  className="btn-show-express-calc"
                  onClick={handleShowExpressRate}
                  type="button"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M13 8l-5-5v10l5-5z"/>
                  </svg>
                  Show express rate
                </button>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="rates-results-calc">
              {showRates ? (
                <div className="rates-display">
                  <div className="rates-header-row">
                    <div className="rate-col">RATE</div>
                    <div className="type-col">TYPE</div>
                    <div className="charge-col">TOTAL CHARGE</div>
                  </div>

                  {rates.map((rate, index) => (
                    <div key={index} className="rate-item">
                      <div className="rate-summary" onClick={() => toggleRateExpansion(index)}>
                        <div className="rate-col">{rate.type}</div>
                        <div className="type-col">{rate.serviceName}</div>
                        <div className="charge-col">
                          <span className="charge-amount">${rate.totalCharge}</span>
                          <button 
                            className="expand-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRateExpansion(index);
                            }}
                            type="button"
                          >
                            {rate.expanded ? (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 5l5 5H3l5-5z"/>
                              </svg>
                            ) : (
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 11L3 6h10l-5 5z"/>
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                      
                      {rate.expanded && rate.details.length > 0 && (
                        <div className="rate-details">
                          {rate.details.map((detail, idx) => (
                            <div key={idx} className="detail-row">
                              <span className="detail-label">{detail.label}</span>
                              <span className="detail-value">${detail.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="rate-switch-btn">
                    {rateType === 'express' ? (
                      <button 
                        className="btn-switch" 
                        onClick={switchToGroundRate}
                        type="button"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                          <path d="M8 12L3 7h10l-5 5z"/>
                        </svg>
                        Show ground rate
                      </button>
                    ) : (
                      <button 
                        className="btn-switch" 
                        onClick={switchToExpressRate}
                        type="button"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" style={{ marginRight: '8px' }}>
                          <path d="M13 8l-5-5v10l5-5z"/>
                        </svg>
                        Show express rate
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="rates-placeholder">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path d="M16 24 L40 8 L64 24 L64 56 L40 72 L16 56 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="2"/>
                  </svg>
                  <h3>No rates calculated yet</h3>
                  <p>Fill in the form and click a button to see rates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section-calc">
        <div className="help-container-calc">
          <div className="help-column-calc">
            <p className="help-label-calc">FOR QUESTIONS OR ISSUES</p>
            <h2 className="help-title-calc">
              <span className="help-icon-calc">🎧</span> HELP & SUPPORT
            </h2>
            <button className="btn-help-calc">Get help or get in touch</button>
          </div>
          <div className="help-divider-calc"></div>
          <div className="help-column-calc">
            <p className="help-label-calc">WAS THIS PAGE HELPFUL?</p>
            <h2 className="help-title-calc">
              <span className="help-icon-calc">💬</span> YOUR FEEDBACK
            </h2>
            <button className="btn-feedback-calc">Send us a message</button>
          </div>
        </div>
      </div>

      <Footer showNewsletter={false} />
    </div>
  );
};

export default CalculateRates;
