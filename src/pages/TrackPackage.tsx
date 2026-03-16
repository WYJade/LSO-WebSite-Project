import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrackPackage.css';

interface TrackingResult {
  trackingNumber: string;
  serviceType: string;
  deliveredTime: string;
  fromCity: string;
  toCity: string;
  sender: string;
  receiver: string;
  status: 'DELIVERED' | 'IN TRANSIT';
}

const TrackPackage: React.FC = () => {
  const navigate = useNavigate();
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResults, setTrackingResults] = useState<TrackingResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState('');
  
  // Dialog states
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showPrintDialog, setShowPrintDialog] = useState(false);
  
  // Filter states
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterServiceType, setFilterServiceType] = useState<string[]>([]);

  const handleTrackingSearch = () => {
    setError('');
    
    if (!trackingInput.trim()) {
      setError('Please enter at least one tracking number');
      return;
    }

    // Parse multiple tracking numbers (comma or newline separated)
    const trackingNumbers = trackingInput
      .split(/[,\n]+/)  // Split by one or more commas or newlines
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

    // Mock tracking results based on input
    const cities = ['Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia'];
    const names = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'William White', 'Mary Harris'];
    const serviceTypes = ['LSO Ground™', 'LSO Priority Next Day™', 'LSO Early Next Day™'];
    const statuses: ('DELIVERED' | 'IN TRANSIT')[] = ['DELIVERED', 'IN TRANSIT'];
    
    const mockResults: TrackingResult[] = trackingNumbers.map((num, i) => ({
      trackingNumber: num,
      serviceType: serviceTypes[i % serviceTypes.length],
      deliveredTime: `2024/2/${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:00`,
      fromCity: cities[i % cities.length],
      toCity: cities[(i + 2) % cities.length],
      sender: names[i % names.length],
      receiver: names[(i + 3) % names.length],
      status: statuses[i % statuses.length]
    }));
    
    setTrackingResults(mockResults);
    setCurrentPage(1);
  };

  const paginatedResults = trackingResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(trackingResults.length / itemsPerPage);

  const handleCardClick = (trackingNumber: string) => {
    navigate(`/dashboard/shipment-details/${trackingNumber}`);
  };

  const handleExport = (format: string) => {
    console.log(`Exporting as ${format}`);
    setShowExportDialog(false);
    // Implement actual export logic here
  };

  const handleApplyFilters = () => {
    console.log('Applying filters:', { filterStatus, filterServiceType });
    setShowFilterDialog(false);
    // Implement actual filter logic here
  };

  const handleClearFilters = () => {
    setFilterStatus([]);
    setFilterServiceType([]);
  };

  const toggleStatusFilter = (status: string) => {
    setFilterStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleServiceTypeFilter = (serviceType: string) => {
    setFilterServiceType(prev =>
      prev.includes(serviceType) ? prev.filter(s => s !== serviceType) : [...prev, serviceType]
    );
  };

  return (
    <div className="track-package-page">
      <div className="track-content-wrapper">
        <div className="track-content">
          {/* Page Title */}
          <div className="page-title-section">
            <h1 className="page-title">Track Your Shipments</h1>
          </div>

          {/* Search Box */}
          <div className="tracking-search-box-wrapper">
            <div className="tracking-search-box-container">
              <textarea
                className="tracking-search-textarea"
                placeholder="Enter up to 30 tracking numbers, separated by commas"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                rows={3}
              />
              <button className="tracking-search-button" onClick={handleTrackingSearch}>
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Search
              </button>
            </div>
            {error && (
              <div className="tracking-error-message">
                {error}
              </div>
            )}
          </div>

          {/* Empty State */}
          {trackingResults.length === 0 && (
            <div className="tracking-empty-state">
              <div className="empty-state-icon">📦</div>
              <h3>Track Your Shipments</h3>
              <p>Enter your tracking number above to view real-time shipment status and delivery information.</p>
              <div className="empty-state-tips">
                <div className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>Track multiple packages at once</span>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>Get detailed delivery updates</span>
                </div>
                <div className="tip-item">
                  <span className="tip-icon">✓</span>
                  <span>View shipment history</span>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {trackingResults.length > 0 && (
            <div className="tracking-results-section">
              <div className="results-header">
                <h3 className="results-title">Tracking Results ({trackingResults.length})</h3>
                <div className="results-actions">
                  <button className="action-btn print-ready-btn" onClick={() => setShowPrintDialog(true)}>
                    <span className="print-icon">🖨️</span>
                    See Print-ready option
                  </button>
                  <button className="action-btn export-btn" onClick={() => setShowExportDialog(true)}>
                    <span className="export-icon">📤</span>
                    Export
                  </button>
                  <button className="action-btn filter-btn" onClick={() => setShowFilterDialog(true)}>
                    <span className="filter-icon">🔍</span>
                    Filter
                  </button>
                </div>
              </div>

              <div className="tracking-results-list">
                {paginatedResults.map((result, index) => (
                  <div 
                    key={index} 
                    className="tracking-result-card"
                    onClick={() => handleCardClick(result.trackingNumber)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="result-header-row">
                      <div className="result-tracking-info">
                        <span className="result-label">Tracking #</span>
                        <span className="result-tracking-number">{result.trackingNumber}</span>
                        <span className={`result-service-badge ${result.serviceType.toLowerCase().replace(/[™\s]/g, '-')}`}>
                          {result.serviceType}
                        </span>
                        <span className={`result-status-badge status-${result.status.toLowerCase().replace(' ', '-')}`}>
                          {result.status}
                        </span>
                      </div>
                      <span className="result-delivered-time">Delivered time: {result.deliveredTime}</span>
                    </div>

                    <div className="result-route">
                      <div className="result-location from-location">
                        <div className="location-label">FROM</div>
                        <div className="location-city">{result.fromCity}</div>
                        <div className="location-person">{result.sender}</div>
                      </div>

                      <div className="result-arrow">
                        <div className="arrow-line"></div>
                      </div>

                      <div className="result-location to-location">
                        <div className="location-label">TO</div>
                        <div className="location-city">{result.toCity}</div>
                        <div className="location-person">{result.receiver}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-container">
                  <div className="pagination-info">
                    <span>Total {trackingResults.length} items</span>
                    <span className="separator">|</span>
                    <span>{itemsPerPage} items/page</span>
                  </div>
                  <div className="pagination-controls">
                    <button 
                      className="page-btn prev-btn" 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      ‹
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      return (
                        <button
                          key={pageNum}
                          className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button 
                      className="page-btn next-btn" 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Export Dialog */}
          {showExportDialog && (
            <div className="dialog-overlay" onClick={() => setShowExportDialog(false)}>
              <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Export Tracking Results</h3>
                  <button className="dialog-close" onClick={() => setShowExportDialog(false)}>×</button>
                </div>
                <div className="dialog-body">
                  <p className="dialog-description">Choose export format for {trackingResults.length} tracking results</p>
                  <div className="export-options">
                    <button className="export-option" onClick={() => handleExport('pdf')}>
                      <span className="export-option-icon">📄</span>
                      <span className="export-option-label">PDF Document</span>
                    </button>
                    <button className="export-option" onClick={() => handleExport('csv')}>
                      <span className="export-option-icon">📊</span>
                      <span className="export-option-label">CSV Spreadsheet</span>
                    </button>
                    <button className="export-option" onClick={() => handleExport('excel')}>
                      <span className="export-option-icon">📗</span>
                      <span className="export-option-label">Excel Workbook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filter Dialog */}
          {showFilterDialog && (
            <div className="dialog-overlay" onClick={() => setShowFilterDialog(false)}>
              <div className="dialog-content filter-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Filter Options</h3>
                  <button className="dialog-close" onClick={() => setShowFilterDialog(false)}>×</button>
                </div>
                <div className="dialog-body">
                  <div className="filter-section">
                    <h4 className="filter-section-title">STATUS</h4>
                    <div className="filter-options">
                      {['Created', 'Picked Up', 'Inbound scan at destination', 'Out For Delivery', 'Delivered', 'Return to Shipper', 'Discarded', 'Lost', 'Delay Exception'].map(status => (
                        <label key={status} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={filterStatus.includes(status)}
                            onChange={() => toggleStatusFilter(status)}
                          />
                          <span>{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="filter-section">
                    <h4 className="filter-section-title">SERVICE TYPE</h4>
                    <div className="filter-options">
                      {['LSO Priority Next Day™', 'LSO Early Next Day™', 'LSO Economy Next Day™', 'LSO Ground™', 'LSO 2nd Day™', 'LSO E-Commerce Delivery™'].map(serviceType => (
                        <label key={serviceType} className="filter-checkbox">
                          <input
                            type="checkbox"
                            checked={filterServiceType.includes(serviceType)}
                            onChange={() => toggleServiceTypeFilter(serviceType)}
                          />
                          <span>{serviceType}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn dialog-btn-secondary" onClick={handleClearFilters}>
                    Clear All
                  </button>
                  <button className="dialog-btn dialog-btn-primary" onClick={handleApplyFilters}>
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Print-ready Dialog */}
          {showPrintDialog && (
            <div className="dialog-overlay" onClick={() => setShowPrintDialog(false)}>
              <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Print-ready Options</h3>
                  <button className="dialog-close" onClick={() => setShowPrintDialog(false)}>×</button>
                </div>
                <div className="dialog-body">
                  <p className="dialog-description">Prepare your tracking results for printing</p>
                  <div className="print-options">
                    <button className="print-option" onClick={() => { setShowPrintDialog(false); window.print(); }}>
                      <span className="print-option-icon">🖨️</span>
                      <span className="print-option-label">Print Current Page</span>
                    </button>
                    <button className="print-option" onClick={() => { setShowPrintDialog(false); window.print(); }}>
                      <span className="print-option-icon">📋</span>
                      <span className="print-option-label">Print All Results</span>
                    </button>
                    <button className="print-option" onClick={() => { setShowPrintDialog(false); handleExport('pdf'); }}>
                      <span className="print-option-icon">📄</span>
                      <span className="print-option-label">Download as PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPackage;
