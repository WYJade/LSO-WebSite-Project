import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Preferences.css';

type PreferencesTab = 'user-settings' | 'preferences';

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<PreferencesTab>('user-settings');
  const [accountNumber, setAccountNumber] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [billingRefRequired, setBillingRefRequired] = useState(false);
  const [useSavedBillingRef, setUseSavedBillingRef] = useState(false);
  const [emailDeliveryNotification, setEmailDeliveryNotification] = useState(false);
  const [printPublishedRates, setPrintPublishedRates] = useState(true);
  const [defaultService, setDefaultService] = useState('Next Day');
  const [printTo, setPrintTo] = useState('Plain Paper');
  const [handlingFee, setHandlingFee] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccessNotification = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const handleBackToOverview = () => {
    navigate(-1); // Go back to previous page
  };

  const handleUpdateAccount = () => {
    if (oldEmail && newEmail) {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(oldEmail) || !emailRegex.test(newEmail)) {
        setEmailError(true);
        alert('Please enter valid email addresses');
        return;
      }
    }
    setEmailError(false);
    showSuccessNotification('Account information updated successfully!');
  };

  const handleUpdatePreferences = () => {
    showSuccessNotification('Shipping preferences updated successfully!');
  };

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword) {
      alert('Please fill in both password fields');
      return;
    }
    if (newPassword.length < 8) {
      alert('New password must be at least 8 characters');
      return;
    }
    showSuccessNotification('Password updated successfully!');
    setOldPassword('');
    setNewPassword('');
  };

  const renderUserSettings = () => (
    <div className="preferences-content-compact">
      <div className="compact-layout-grid">
        {/* Left Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>Account Information</h3>
            <div className="form-group">
              <label>Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter account number"
              />
            </div>
            <div className="form-group">
              <label>Old email address</label>
              <input
                type="email"
                className={emailError ? 'error' : ''}
                value={oldEmail}
                onChange={(e) => {
                  setOldEmail(e.target.value);
                  setEmailError(false);
                }}
                placeholder="current@email.com"
              />
            </div>
            <div className="form-group">
              <label>New email address</label>
              <input
                type="email"
                className={emailError ? 'error' : ''}
                value={newEmail}
                onChange={(e) => {
                  setNewEmail(e.target.value);
                  setEmailError(false);
                }}
                placeholder="new@email.com"
              />
            </div>
            <button className="update-btn-compact" onClick={handleUpdateAccount}>
              Update
            </button>
          </div>

          <div className="preferences-section-compact">
            <h3>Change Password</h3>
            <div className="form-group password-group">
              <label>Old Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <div className="form-group password-group">
              <label>New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>
            <button className="update-btn-compact" onClick={handleUpdatePassword}>
              Update
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="compact-column">
          <div className="preferences-section-compact">
            <h3>Shipping Preferences</h3>
            <div className="checkbox-group-compact">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={billingRefRequired}
                  onChange={(e) => setBillingRefRequired(e.target.checked)}
                />
                <span>Billing reference required</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={useSavedBillingRef}
                  onChange={(e) => setUseSavedBillingRef(e.target.checked)}
                />
                <span>Use saved billing ref</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={emailDeliveryNotification}
                  onChange={(e) => setEmailDeliveryNotification(e.target.checked)}
                />
                <span>Email delivery notification</span>
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={printPublishedRates}
                  onChange={(e) => setPrintPublishedRates(e.target.checked)}
                />
                <span>Print published rates</span>
              </label>
            </div>

            <div className="form-group">
              <label>Default Service</label>
              <select
                value={defaultService}
                onChange={(e) => setDefaultService(e.target.value)}
              >
                <option value="Next Day">Next Day</option>
                <option value="2nd Day">2nd Day</option>
                <option value="By 10:30am">By 10:30am</option>
                <option value="ECommerce">ECommerce</option>
                <option value="By 8:30am">By 8:30am</option>
                <option value="By 3:00pm">By 3:00pm</option>
              </select>
            </div>
            <div className="form-group">
              <label>Print to</label>
              <select
                value={printTo}
                onChange={(e) => setPrintTo(e.target.value)}
              >
                <option value="Plain Paper">Plain Paper</option>
                <option value="4 x 5 in Label">4 x 5 in Label</option>
                <option value="4 x 6.5 in Label w/ Receipt">4 x 6.5 in Label w/ Receipt</option>
              </select>
            </div>
            <div className="form-group">
              <label>Handling fee</label>
              <input
                type="text"
                value={handlingFee}
                onChange={(e) => setHandlingFee(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <button className="update-btn-compact" onClick={handleUpdatePreferences}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="preferences-content">
      <div className="preferences-section">
        <h3>Your Preferences</h3>
        <p className="placeholder-text">General preferences configuration coming soon...</p>
      </div>
    </div>
  );

  return (
    <div className="preferences-page">
      <div className="preferences-header">
        <div className="header-content">
          <h1>Your Preferences</h1>
          <button className="back-to-overview-btn" onClick={handleBackToOverview}>
            <svg className="back-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Overview
          </button>
        </div>
      </div>

      <div className="preferences-tabs">
        <button
          className={`tab-btn ${activeTab === 'user-settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-settings')}
        >
          User settings
        </button>
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Your Preferences
        </button>
      </div>

      <div className="preferences-body">
        {activeTab === 'user-settings' && renderUserSettings()}
        {activeTab === 'preferences' && renderPreferences()}
      </div>

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="success-toast">
          <div className="toast-content">
            <svg className="toast-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4CAF50"/>
              <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="toast-message">{successMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Preferences;
