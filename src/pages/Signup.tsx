import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyPassword, setShowVerifyPassword] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    contactNumber: '',
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    country: 'United States',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    packagesPerDay: '',
    businessType: '',
    hearAbout: '',
    // Payment info
    cardFirstName: '',
    cardLastName: '',
    cardBillingAddress: '',
    cardBillingZip: '',
    cardNumber: '',
    cardExpiration: '',
    phoneNumber: '',
    cardEmail: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    alert('Account created successfully!');
    navigate('/dashboard/overview');
  };

  return (
    <div className="signup-page">
      {/* Header */}
      <div className="signup-header">
        <div className="signup-header-content">
          <div className="logo-section" onClick={() => navigate('/')}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <ellipse cx="16" cy="10" rx="16" ry="8" fill="#1E3A8A" transform="rotate(-15 16 10)"/>
              <ellipse cx="20" cy="20" rx="18" ry="9" fill="#2563EB" transform="rotate(5 20 20)"/>
              <circle cx="16" cy="30" r="9" fill="#0EA5E9"/>
            </svg>
            <span className="logo-text">LSO</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="signup-breadcrumb">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
        <span className="breadcrumb-separator">›</span>
        <span>Create an LSO account</span>
      </div>

      {/* Main Content */}
      <div className="signup-container">
        <div className="signup-title-section">
          <svg width="48" height="48" viewBox="0 0 60 40" fill="none">
            <ellipse cx="16" cy="10" rx="16" ry="8" fill="#1E3A8A" transform="rotate(-15 16 10)"/>
            <ellipse cx="20" cy="20" rx="18" ry="9" fill="#2563EB" transform="rotate(5 20 20)"/>
            <circle cx="16" cy="30" r="9" fill="#0EA5E9"/>
          </svg>
          <h1>Create an LSO account</h1>
          <p className="signup-subtitle">
            Create an Account, log in and ship today. Creating your account makes it easier to track your shipments and charges, and order supplies. At LSO we make it easy, fast and affordable.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="signup-progress">
          <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
            <div className="progress-circle">1</div>
            <span>Account Info</span>
          </div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
            <div className="progress-circle">2</div>
            <span>Payment Info</span>
          </div>
        </div>

        <div className="signup-form-container">
          <div className="required-notice">*required fields</div>

          {step === 1 && (
            <div className="signup-form">
              <div className="form-row">
                <div className="form-col">
                  <label>First Name*</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-col">
                  <label>Last Name*</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Business Name*</label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-col">
                  <label>Contact Number*</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Login/Username*</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Login/Username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-col">
                  <label>Email*</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Password*</label>
                  <div className="password-input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      👁️
                    </button>
                  </div>
                  <p className="field-hint">Password must be 6-9 characters and is case-sensitive.</p>
                </div>
                <div className="form-col">
                  <label>Verify Password*</label>
                  <div className="password-input-group">
                    <input
                      type={showVerifyPassword ? 'text' : 'password'}
                      name="verifyPassword"
                      placeholder="Verify Password"
                      value={formData.verifyPassword}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowVerifyPassword(!showVerifyPassword)}
                    >
                      👁️
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Country/Territory*</label>
                  <select name="country" value={formData.country} onChange={handleInputChange}>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </select>
                </div>
                <div className="form-col">
                  <label>Address*</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    placeholder="Address 2"
                    value={formData.address2}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-col-third">
                  <label>City*</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-col-third">
                  <label>State*</label>
                  <select name="state" value={formData.state} onChange={handleInputChange}>
                    <option value="">State</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                    <option value="NY">New York</option>
                  </select>
                </div>
                <div className="form-col-third">
                  <label>Zip*</label>
                  <input
                    type="text"
                    name="zip"
                    placeholder="00000"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>No. of packages you plan to ship a day*</label>
                  <select name="packagesPerDay" value={formData.packagesPerDay} onChange={handleInputChange}>
                    <option value="">Please select</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-100">51-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                <div className="form-col">
                  <label>Type of Business</label>
                  <select name="businessType" value={formData.businessType} onChange={handleInputChange}>
                    <option value="">Please select</option>
                    <option value="retail">Retail</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col-full">
                  <label>How did you hear about LSO?*</label>
                  <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange}>
                    <option value="">Please select</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-next" onClick={handleNextStep}>
                  Next: Payment Information →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="signup-form payment-form">
              <div className="payment-header">
                <h2>Enter Payment Information</h2>
              </div>

              <div className="payment-section">
                <div className="payment-section-title">
                  <span>Credit Card Information</span>
                  <div className="card-logos">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%231434CB'%3E%3Crect width='40' height='25' rx='3' fill='%231434CB'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='10' text-anchor='middle' dy='.3em'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25'%3E%3Crect width='40' height='25' rx='3' fill='%23EB001B'/%3E%3Ccircle cx='15' cy='12.5' r='8' fill='%23FF5F00'/%3E%3Ccircle cx='25' cy='12.5' r='8' fill='%23F79E1B'/%3E%3C/svg%3E" alt="Mastercard" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%230079C1'%3E%3Crect width='40' height='25' rx='3' fill='%230079C1'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='8' text-anchor='middle' dy='.3em'%3EAMEX%3C/text%3E%3C/svg%3E" alt="Amex" />
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='25' fill='%23FF6000'%3E%3Crect width='40' height='25' rx='3' fill='%23FF6000'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='7' text-anchor='middle' dy='.3em'%3EDISCOVER%3C/text%3E%3C/svg%3E" alt="Discover" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                    <label>First Name*</label>
                    <input
                      type="text"
                      name="cardFirstName"
                      placeholder="First Name"
                      value={formData.cardFirstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-col">
                    <label>Last Name*</label>
                    <input
                      type="text"
                      name="cardLastName"
                      placeholder="Last Name"
                      value={formData.cardLastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                    <label>Card Billing Address*</label>
                    <input
                      type="text"
                      name="cardBillingAddress"
                      placeholder="Card Billing Address"
                      value={formData.cardBillingAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-col">
                    <label>Card Billing Zipcode*</label>
                    <input
                      type="text"
                      name="cardBillingZip"
                      placeholder="Card Billing Zipcode"
                      value={formData.cardBillingZip}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                    <label>Card Number*</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-col">
                    <label>Card Expiration Date*</label>
                    <input
                      type="text"
                      name="cardExpiration"
                      placeholder="MM/YY"
                      value={formData.cardExpiration}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-col">
                    <label>Phone Number*</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Phone Number"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-col">
                    <label>Email Address*</label>
                    <input
                      type="email"
                      name="cardEmail"
                      placeholder="Email Address"
                      value={formData.cardEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={handlePrevStep}>
                  ← Back
                </button>
                <button type="button" className="btn-submit" onClick={handleSubmit}>
                  Sign up for account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
