import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PublicTracking.css';

interface TrackingResult {
  trackingNumber: string;
  serviceType: string;
  status: string;
  deliveredTime?: string;
  fromCity: string;
  toCity: string;
  sender: string;
  receiver: string;
}

const PublicTracking: React.FC = () => {
  const navigate = useNavigate();
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResults, setTrackingResults] = useState<TrackingResult[]>([]);
  const [error, setError] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleTrackingSearch = () => {
    setError('');
    
    if (!trackingInput.trim()) {
      setError('Please enter at least one tracking number');
      return;
    }

    const trackingNumbers = trackingInput
      .split(/[,\n]+/)
      .map(num => num.trim())
      .filter(num => num.length > 0);

    if (trackingNumbers.length === 0) {
      setError('Please enter at least one valid tracking number');
      return;
    }

    if (trackingNumbers.length > 30) {
      setError('Maximum 30 tracking numbers allowed');
      return;
    }

    // Mock tracking results
    const cities = ['Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
    const names = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'William White'];
    const serviceTypes = ['LSO Ground™', 'LSO Priority Next Day™', 'LSO Early Next Day™'];
    const statuses = ['DELIVERED', 'IN TRANSIT'];
    
    const mockResults: TrackingResult[] = trackingNumbers.map((num, i) => ({
      trackingNumber: num,
      serviceType: serviceTypes[i % serviceTypes.length],
      status: statuses[i % statuses.length],
      deliveredTime: i % 2 === 0 ? `2024/2/${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00` : undefined,
      fromCity: cities[i % cities.length],
      toCity: cities[(i + 2) % cities.length],
      sender: names[i % names.length],
      receiver: names[(i + 3) % names.length],
    }));
    
    setTrackingResults(mockResults);
    setShowResults(true);
  };

  const handleCardClick = (trackingNumber: string) => {
    navigate(`/tracking/${trackingNumber}`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="public-tracking-page">
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
            <button className="public-nav-link">SHIPPING</button>
            <button className="public-nav-link">SERVICES</button>
            <button className="public-nav-link active">TRACKING</button>
            <button className="public-nav-link">ABOUT US</button>
          </div>
          <div className="public-nav-right">
            <button className="public-login-btn" onClick={handleBackToHome}>
              LOGIN / SIGN UP
            </button>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="public-breadcrumb">
        <div className="public-container">
          <span className="breadcrumb-link" onClick={handleBackToHome}>Home</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Tracking</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="public-main-content">
        <div className="public-container">
          {!showResults ? (
            <>
              {/* Info Section */}
              <div className="public-info-section">
                <div className="public-info-header">
                  <div className="public-info-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M21 10H3M21 6H3M21 14H3M21 18H3" stroke="#0066CC" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <h2 className="public-info-title">Easy Online Package Tracking</h2>
                </div>
                <p className="public-info-description">
                  LSO's online package tracking system allows you to track packages anywhere and at any time. 
                  Get real-time accurate and powerful package views in the industry. See where your packages are by entering 
                  our easy-to-use tracker below.
                </p>
                <p className="public-info-description">
                  Plus enter your tracking number, or add more if you will update 30 (our absolute). 
                  You can also enter up to 10 tracking numbers in this window, or e-mailing a number per line.
                </p>
              </div>

              {/* Search Box */}
              <div className="public-search-section">
                <div className="public-search-box">
                  <h3 className="public-search-title">Enter up to 30 tracking numbers</h3>
                  <div className="public-search-input-wrapper">
                    <textarea
                      className="public-search-textarea"
                      placeholder="Enter tracking number"
                      value={trackingInput}
                      onChange={(e) => setTrackingInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleTrackingSearch();
                        }
                      }}
                      rows={3}
                    />
                    <button className="public-search-btn" onClick={handleTrackingSearch}>
                      Track
                    </button>
                  </div>
                  {error && (
                    <div className="public-error-message">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Search Box - Compact */}
              <div className="public-search-compact">
                <h2 className="public-page-title">Track Your Shipments</h2>
                <div className="public-search-box-compact">
                  <textarea
                    className="public-search-textarea-compact"
                    placeholder="Enter up to 30 tracking numbers, separated by commas"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleTrackingSearch();
                      }
                    }}
                    rows={2}
                  />
                  <button className="public-search-btn-compact" onClick={handleTrackingSearch}>
                    <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                      <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Search
                  </button>
                </div>
                {error && (
                  <div className="public-error-message">
                    {error}
                  </div>
                )}
              </div>

              {/* Results Section */}
              <div className="public-results-section">
                <div className="public-results-header">
                  <h3 className="public-results-title">Tracking Results ({trackingResults.length})</h3>
                  <div className="public-results-actions">
                    <button className="public-action-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      See Print-ready option
                    </button>
                  </div>
                </div>

                <div className="public-results-list">
                  {trackingResults.map((result, index) => (
                    <div 
                      key={index} 
                      className="public-result-card"
                      onClick={() => handleCardClick(result.trackingNumber)}
                    >
                      <div className="public-result-header">
                        <div className="public-result-info">
                          <span className="public-result-label">Tracking #</span>
                          <span className="public-result-number">{result.trackingNumber}</span>
                          <span className="public-result-service">{result.serviceType}</span>
                          <span className={`public-result-status status-${result.status.toLowerCase().replace(' ', '-')}`}>
                            {result.status}
                          </span>
                        </div>
                        {result.deliveredTime && (
                          <span className="public-result-time">Delivered time: {result.deliveredTime}</span>
                        )}
                      </div>

                      <div className="public-result-route">
                        <div className="public-result-location">
                          <div className="location-label">FROM</div>
                          <div className="location-city">{result.fromCity}</div>
                          <div className="location-person">{result.sender}</div>
                        </div>

                        <div className="public-result-arrow">
                          <svg width="120" height="24" viewBox="0 0 120 24" fill="none">
                            <line x1="0" y1="12" x2="110" y2="12" stroke="#d1d5db" strokeWidth="2"/>
                            <path d="M110 12l-8-6v12l8-6z" fill="#d1d5db"/>
                          </svg>
                        </div>

                        <div className="public-result-location">
                          <div className="location-label">TO</div>
                          <div className="location-city">{result.toCity}</div>
                          <div className="location-person">{result.receiver}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer Sections */}
      <div className="public-footer-sections">
        <div className="public-container">
          <div className="public-footer-grid">
            <div className="public-footer-card">
              <div className="footer-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#0066CC" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="#0066CC" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="footer-card-title">HELP & SUPPORT</h3>
              <p className="footer-card-text">FOR QUESTIONS OR ISSUES</p>
              <button className="footer-card-btn">Get help or get in touch</button>
            </div>

            <div className="public-footer-card">
              <div className="footer-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="#0066CC" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="footer-card-title">YOUR FEEDBACK</h3>
              <p className="footer-card-text">WAS THIS PAGE HELPFUL?</p>
              <button className="footer-card-btn">Send us a message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicTracking;
