import React, { useState } from 'react';
import './Preferences.css';

type PreferencesTab = 'preferences' | 'payment' | 'user-settings';

const Preferences: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PreferencesTab>('preferences');
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
    alert('Account settings updated successfully');
  };

  const handleUpdatePreferences = () => {
    alert('Preferences updated successfully');
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
    alert('Password updated successfully');
    setOldPassword('');
    setNewPassword('');
  };

  const renderUserSettings = () => (
    <div className="preferences-content">
      <div className="preferences-section">
        <h3>Account Information</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
            />
          </div>
        </div>
        <div className="form-grid two-columns">
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
        </div>
        <button className="update-btn" onClick={handleUpdateAccount}>
          Update
        </button>
      </div>

      <div className="preferences-section">
        <h3>Shipping Preferences</h3>
        <div className="checkbox-group">
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

        <div className="form-grid two-columns">
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
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Handling fee</label>
            <input
              type="text"
              value={handlingFee}
              onChange={(e) => setHandlingFee(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>

        <button className="update-btn" onClick={handleUpdatePreferences}>
          Update
        </button>
      </div>

      <div className="preferences-section">
        <h3>Change Password</h3>
        <div className="form-grid two-columns">
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
        </div>
        <button className="update-btn" onClick={handleUpdatePassword}>
          Update
        </button>
      </div>
    </div>
  );

  const renderPaymentDetails = () => (
    <div className="preferences-content">
      <div className="preferences-section">
        <h3>Payment Details</h3>
        <p className="placeholder-text">Payment details configuration coming soon...</p>
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
        <h1>Settings</h1>
      </div>

      <div className="preferences-tabs">
        <button
          className={`tab-btn ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Your Preferences
        </button>
        <button
          className={`tab-btn ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Payment details
        </button>
        <button
          className={`tab-btn ${activeTab === 'user-settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('user-settings')}
        >
          User settings
        </button>
      </div>

      <div className="preferences-body">
        {activeTab === 'preferences' && renderPreferences()}
        {activeTab === 'payment' && renderPaymentDetails()}
        {activeTab === 'user-settings' && renderUserSettings()}
      </div>
    </div>
  );
};

export default Preferences;
