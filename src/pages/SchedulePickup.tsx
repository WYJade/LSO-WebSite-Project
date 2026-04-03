import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SchedulePickup.css';

type ActiveTab = 'schedule' | 'cancel';

const SchedulePickup: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ActiveTab>('schedule');
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [topError, setTopError] = useState('');

  // Step 1 fields
  const [accountNo, setAccountNo] = useState('');
  const [mainZip, setMainZip] = useState('');
  const [phone, setPhone] = useState('');
  const [countryTerritory, setCountryTerritory] = useState('United States');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { number: 1, title: 'Pickup address' },
    { number: 2, title: 'Pickup dates' },
    { number: 3, title: 'Pickup\nconfirmation' },
  ];

  // Mock valid accounts: accountNo "1" => zip "78754"
  const mockAccounts: Record<string, string> = { '1': '78754', '12345': '75050', '99999': '76087' };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!accountNo.trim()) errs.accountNo = 'Account no. is required.';
    if (!mainZip.trim()) errs.mainZip = 'Zip code is required.';
    if (!phone.trim()) errs.phone = 'Phone Number is required.';
    if (!address.trim()) errs.address = 'Address is required.';
    if (!postalCode.trim()) errs.postalCode = 'Postal Code is required.';
    if (!city.trim()) errs.city = 'City is required.';
    if (!state.trim()) errs.state = 'State is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleShowPickupDates = () => {
    setSubmitted(true);
    setTopError('');
    if (!validate()) return;

    // Check account/zip match
    const expectedZip = mockAccounts[accountNo.trim()];
    if (!expectedZip || expectedZip !== mainZip.trim()) {
      setTopError('Main Zip Code does not match the LSO Account no.');
      return;
    }

    setCurrentStep(2);
  };

  const clearField = (setter: (v: string) => void) => {
    setter('');
  };

  const hasValue = (v: string) => v.trim().length > 0;

  return (
    <div className="schedule-pickup-page">
      <div className="sp-content">
        {/* Page Title */}
        <div className="sp-page-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" stroke="#0d3b66" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          <h1>Schedule a pickup</h1>
        </div>

        {/* Description */}
        <p className="sp-description">
          Enter your account information below and your friendly LSO driver will be coming your way. If you need special arrangements, such as an earlier or later pickup, get in touch <a href="/contact" className="sp-link">here</a>.
        </p>

        {/* Progress Steps */}
        <div className="sp-progress">
          <div className="sp-progress-line"></div>
          {steps.map((step) => (
            <div key={step.number} className={`sp-step ${currentStep === step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="sp-step-label">{step.title}</div>
              <div className="sp-step-number">{currentStep > step.number ? '✓' : step.number}</div>
            </div>
          ))}
        </div>

        {/* Create account link */}
        <div className="sp-create-account">
          Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }} className="sp-link-underline">Create one</a>
        </div>

        {/* Tabs */}
        <div className="sp-tabs">
          <button className={`sp-tab ${activeTab === 'schedule' ? 'active' : ''}`} onClick={() => setActiveTab('schedule')}>
            Schedule a pickup
          </button>
          <button className={`sp-tab ${activeTab === 'cancel' ? 'active' : ''}`} onClick={() => setActiveTab('cancel')}>
            Cancel a scheduled pickup →
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'schedule' && currentStep === 1 && (
          <div className="sp-form-container">
            {/* Top Error Banner */}
            {topError && (
              <div className="sp-error-banner">{topError}</div>
            )}

            <div className="sp-required-notice"><span className="required-star">*</span>required fields</div>

            {/* Account Information */}
            <div className="sp-section-title">Account Information</div>
            <p className="sp-section-desc">
              Please enter the LSO account number of the party who will be paying for the shipping fee.<br/>
              If you don't have an account, click <a href="/signup" className="sp-link-underline">here</a> to create one.
            </p>
            <div className="sp-divider"></div>

            <div className="sp-form-row-2col">
              <div className="sp-field">
                <label>LSO Account No.<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => { setAccountNo(e.target.value); if (submitted) setErrors(p => ({...p, accountNo: ''})); setTopError(''); }}
                  placeholder="LSO Account No."
                  className={`${submitted && errors.accountNo ? 'sp-input-error' : ''} ${hasValue(accountNo) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.accountNo && <span className="sp-field-error">{errors.accountNo}</span>}
              </div>
              <div className="sp-field">
                <label>Main Zip Code<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={mainZip}
                  onChange={(e) => { setMainZip(e.target.value); if (submitted) setErrors(p => ({...p, mainZip: ''})); setTopError(''); }}
                  placeholder="Zip Code"
                  maxLength={5}
                  className={`${submitted && errors.mainZip ? 'sp-input-error' : ''} ${hasValue(mainZip) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.mainZip && <span className="sp-field-error">{errors.mainZip}</span>}
              </div>
            </div>

            {/* Pickup Address */}
            <div className="sp-section-title" style={{ marginTop: '28px' }}>Pickup Address</div>
            <div className="sp-divider"></div>

            {/* Phone Number */}
            <div className="sp-form-row-half">
              <div className="sp-field">
                <label>Phone Number<span className="required-star">*</span></label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); if (submitted) setErrors(p => ({...p, phone: ''})); }}
                  placeholder="Phone Number"
                  className={`${submitted && errors.phone ? 'sp-input-error' : ''} ${hasValue(phone) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.phone && <span className="sp-field-error">{errors.phone}</span>}
              </div>
            </div>

            {/* Country/Territory + Address */}
            <div className="sp-form-row-2col">
              <div className="sp-field">
                <label>Country/Territory<span className="required-star">*</span></label>
                <div className="sp-select-wrapper">
                  <select
                    value={countryTerritory}
                    onChange={(e) => setCountryTerritory(e.target.value)}
                    className={`sp-select ${hasValue(countryTerritory) ? 'sp-input-filled' : ''}`}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                  {countryTerritory && (
                    <button type="button" className="sp-clear-btn" onClick={() => clearField(setCountryTerritory)}>×</button>
                  )}
                </div>
              </div>
              <div className="sp-field">
                <label>Address<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); if (submitted) setErrors(p => ({...p, address: ''})); }}
                  placeholder="Address"
                  className={`${submitted && errors.address ? 'sp-input-error' : ''} ${hasValue(address) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.address && <span className="sp-field-error">{errors.address}</span>}
              </div>
            </div>

            {/* Address 2 + Address 3 */}
            <div className="sp-form-row-2col">
              <div className="sp-field">
                <label>Address 2</label>
                <input type="text" value={address2} onChange={(e) => setAddress2(e.target.value)} placeholder="Address" />
              </div>
              <div className="sp-field">
                <label>Address 3</label>
                <input type="text" value={address3} onChange={(e) => setAddress3(e.target.value)} placeholder="Address" />
              </div>
            </div>

            {/* Postal Code + City + State */}
            <div className="sp-form-row-3col">
              <div className="sp-field">
                <label>Postal Code<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => { setPostalCode(e.target.value); if (submitted) setErrors(p => ({...p, postalCode: ''})); }}
                  placeholder="Postal Code"
                  maxLength={5}
                  className={`${submitted && errors.postalCode ? 'sp-input-error' : ''} ${hasValue(postalCode) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.postalCode && <span className="sp-field-error">{errors.postalCode}</span>}
              </div>
              <div className="sp-field">
                <label>City<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => { setCity(e.target.value); if (submitted) setErrors(p => ({...p, city: ''})); }}
                  placeholder="City"
                  className={`${submitted && errors.city ? 'sp-input-error' : ''} ${hasValue(city) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.city && <span className="sp-field-error">{errors.city}</span>}
              </div>
              <div className="sp-field">
                <label>State<span className="required-star">*</span></label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => { setState(e.target.value); if (submitted) setErrors(p => ({...p, state: ''})); }}
                  placeholder="State"
                  maxLength={2}
                  className={`${submitted && errors.state ? 'sp-input-error' : ''} ${hasValue(state) ? 'sp-input-filled' : ''}`}
                />
                {submitted && errors.state && <span className="sp-field-error">{errors.state}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="sp-actions">
              <button type="button" className="sp-btn-primary" onClick={handleShowPickupDates}>Show Pickup Dates</button>
            </div>
          </div>
        )}

        {/* Step 2 placeholder */}
        {activeTab === 'schedule' && currentStep === 2 && (
          <div className="sp-form-container">
            <div className="sp-section-title">Pickup Dates</div>
            <p className="sp-section-desc">Step 2 content will be added next.</p>
            <div className="sp-actions">
              <button type="button" className="sp-btn-outline" onClick={() => setCurrentStep(1)}>Go Back</button>
              <button type="button" className="sp-btn-primary" onClick={() => setCurrentStep(3)}>Continue</button>
            </div>
          </div>
        )}

        {/* Step 3 placeholder */}
        {activeTab === 'schedule' && currentStep === 3 && (
          <div className="sp-form-container">
            <div className="sp-section-title">Pickup Confirmation</div>
            <p className="sp-section-desc">Step 3 content will be added next.</p>
            <div className="sp-actions">
              <button type="button" className="sp-btn-outline" onClick={() => setCurrentStep(2)}>Go Back</button>
              <button type="button" className="sp-btn-primary" onClick={() => { setCurrentStep(1); setSubmitted(false); }}>Done</button>
            </div>
          </div>
        )}

        {/* Cancel Tab */}
        {activeTab === 'cancel' && (
          <div className="sp-form-container">
            <div className="sp-section-title">Cancel a Scheduled Pickup</div>
            <p className="sp-section-desc">Enter your pickup confirmation number to cancel a scheduled pickup.</p>
            <div className="sp-divider"></div>
            <div className="sp-form-row-half">
              <div className="sp-field">
                <label>Confirmation Number<span className="required-star">*</span></label>
                <input type="text" placeholder="Enter confirmation number" />
              </div>
            </div>
            <div className="sp-actions">
              <button type="button" className="sp-btn-primary">Cancel Pickup</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePickup;
