import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast, { useToast } from '../components/Toast';
import './Reports.css';

const Reports: React.FC = () => {
  const navigate = useNavigate();
  
  const getDefaultDates = () => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    return {
      fromMonth: String(oneMonthAgo.getMonth() + 1).padStart(2, '0'),
      fromDay: String(oneMonthAgo.getDate()).padStart(2, '0'),
      fromYear: String(oneMonthAgo.getFullYear()),
      toMonth: String(today.getMonth() + 1).padStart(2, '0'),
      toDay: String(today.getDate()).padStart(2, '0'),
      toYear: String(today.getFullYear())
    };
  };

  const defaultDates = getDefaultDates();
  const [fromMonth, setFromMonth] = useState(defaultDates.fromMonth);
  const [fromDay, setFromDay] = useState(defaultDates.fromDay);
  const [fromYear, setFromYear] = useState(defaultDates.fromYear);
  const [toMonth, setToMonth] = useState(defaultDates.toMonth);
  const [toDay, setToDay] = useState(defaultDates.toDay);
  const [toYear, setToYear] = useState(defaultDates.toYear);
  const [showResults, setShowResults] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  
  // New Report Options states
  const [dateRangeType, setDateRangeType] = useState<string>('create-date');
  const [shipmentScope, setShipmentScope] = useState<string>('all-shipments');
  const [include3rdParty, setInclude3rdParty] = useState<boolean>(true);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const { toast, showToast } = useToast();

  // Mock report data
  const generateMockReportData = () => {
    const statuses = ['Created', 'In Transit', 'Delivered', 'Exception'];
    const serviceTypes = ['Ground', 'Express', '2-Day', 'Overnight'];
    const signatureReqs = ['--', 'Adult Signature', 'General Signature', 'Consignee Signature'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'Dallas'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA'];
    const companies = ['ABC Corp', 'XYZ Industries', 'Tech Solutions Inc', 'Global Logistics', 'Prime Shipping Co'];
    
    const data = [];
    for (let i = 0; i < 15; i++) {
      const createdDate = new Date(2026, 1, Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
      const pickupDate = new Date(createdDate.getTime() + Math.random() * 2 * 24 * 60 * 60 * 1000);
      const deliveredDate = new Date(pickupDate.getTime() + Math.random() * 5 * 24 * 60 * 60 * 1000);
      
      data.push({
        airbillNumber: `LSO${1000000000 + i}`,
        reference: `REF-${Math.floor(Math.random() * 10000)}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdDate: formatDateCST(createdDate),
        pickupDate: formatDateCST(pickupDate),
        deliveredDate: formatDateCST(deliveredDate),
        fromCompany: companies[Math.floor(Math.random() * companies.length)],
        fromName: `Sender ${i + 1}`,
        fromAddress1: `${Math.floor(Math.random() * 9000) + 1000} Main St`,
        fromAddress2: Math.random() > 0.5 ? `Suite ${Math.floor(Math.random() * 500)}` : '',
        fromCity: cities[Math.floor(Math.random() * cities.length)],
        fromState: states[Math.floor(Math.random() * states.length)],
        fromZipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
        toCompany: companies[Math.floor(Math.random() * companies.length)],
        toName: `Receiver ${i + 1}`,
        toAddress1: `${Math.floor(Math.random() * 9000) + 1000} Oak Ave`,
        toAddress2: Math.random() > 0.5 ? `Apt ${Math.floor(Math.random() * 200)}` : '',
        toCity: cities[Math.floor(Math.random() * cities.length)],
        toState: states[Math.floor(Math.random() * states.length)],
        toZipcode: `${Math.floor(Math.random() * 90000) + 10000}`,
        serviceType: serviceTypes[Math.floor(Math.random() * serviceTypes.length)],
        signatureRequirement: signatureReqs[Math.floor(Math.random() * signatureReqs.length)],
        weight: (Math.random() * 50 + 1).toFixed(1),
        dimension: `${Math.floor(Math.random() * 20) + 5} x ${Math.floor(Math.random() * 20) + 5} x ${Math.floor(Math.random() * 20) + 5}`,
        shippingRate: `$${(Math.random() * 100 + 10).toFixed(2)}`,
        billToAccount: `ACC-${Math.floor(Math.random() * 100000)}`
      });
    }
    return data;
  };

  const formatDateCST = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day}/${year} ${hours}:${minutes} CST`;
  };

  const handleClearDate = () => {
    setFromMonth('');
    setFromDay('');
    setFromYear('');
    setToMonth('');
    setToDay('');
    setToYear('');
  };

  const handleReloadDates = () => {
    const dates = getDefaultDates();
    setFromMonth(dates.fromMonth);
    setFromDay(dates.fromDay);
    setFromYear(dates.fromYear);
    setToMonth(dates.toMonth);
    setToDay(dates.toDay);
    setToYear(dates.toYear);
  };

  const handleHelp = () => {
    showToast('This page allows you to generate reports for your shipments. Select a date range and options, then click "Run report".', 'info');
  };

  const handleShipAnother = () => {
    navigate('/ship-with-account');
  };

  const handleRunReport = () => {
    // Validate date range (max 90 days)
    if (fromMonth && fromDay && fromYear && toMonth && toDay && toYear) {
      const fromDate = new Date(parseInt(fromYear), parseInt(fromMonth) - 1, parseInt(fromDay));
      const toDate = new Date(parseInt(toYear), parseInt(toMonth) - 1, parseInt(toDay));
      const daysDiff = Math.floor((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff > 90) {
        showToast('Date range cannot exceed 90 days. Please adjust your date selection.', 'warning');
        return;
      }
      
      if (daysDiff < 0) {
        showToast('End date must be after start date.', 'warning');
        return;
      }
    }
    
    console.log('Running report with dates:', {
      from: `${fromMonth}/${fromDay}/${fromYear}`,
      to: `${toMonth}/${toDay}/${toYear}`,
      dateRangeType,
      shipmentScope,
      include3rdParty,
      selectedStatuses
    });
    // Generate mock data
    const mockData = generateMockReportData();
    setReportData(mockData);
    setShowResults(true);
  };
  
  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleBackToReports = () => {
    setShowResults(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    console.log('Exporting report as CSV...');
    const button = document.querySelector('.export-csv-btn');
    if (button) {
      button.textContent = 'EXPORTING...';
      setTimeout(() => {
        button.textContent = 'EXPORT CSV';
        showToast(`${reportData.length} records exported to CSV successfully.`);
      }, 1500);
    }
  };

  return (
    <div className="reports-page">
      {!showResults ? (
        <div className="reports-content">
          <div className="reports-header">
            <h3>Reports</h3>
            <p>Enter date range or leave blank for all dates</p>
          </div>

          <div className="date-range-section">
            <div className="date-row-container">
              <div className="date-group">
                <label>From</label>
                <div className="date-inputs">
                  <input 
                    type="text" 
                    placeholder="MM" 
                    maxLength={2} 
                    className="date-input-month" 
                    value={fromMonth}
                    onChange={(e) => setFromMonth(e.target.value)}
                  />
                  <span className="date-separator">/</span>
                  <input 
                    type="text" 
                    placeholder="DD" 
                    maxLength={2} 
                    className="date-input-day" 
                    value={fromDay}
                    onChange={(e) => setFromDay(e.target.value)}
                  />
                  <span className="date-separator">/</span>
                  <input 
                    type="text" 
                    placeholder="YYYY" 
                    maxLength={4} 
                    className="date-input-year" 
                    value={fromYear}
                    onChange={(e) => setFromYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="date-group">
                <label>To</label>
                <div className="date-inputs">
                  <input 
                    type="text" 
                    placeholder="MM" 
                    maxLength={2} 
                    className="date-input-month" 
                    value={toMonth}
                    onChange={(e) => setToMonth(e.target.value)}
                  />
                  <span className="date-separator">/</span>
                  <input 
                    type="text" 
                    placeholder="DD" 
                    maxLength={2} 
                    className="date-input-day" 
                    value={toDay}
                    onChange={(e) => setToDay(e.target.value)}
                  />
                  <span className="date-separator">/</span>
                  <input 
                    type="text" 
                    placeholder="YYYY" 
                    maxLength={4} 
                    className="date-input-year" 
                    value={toYear}
                    onChange={(e) => setToYear(e.target.value)}
                  />
                </div>
              </div>

              <div className="date-actions">
                <button className="date-action-btn" onClick={handleClearDate}>Clear date</button>
                <button className="date-action-btn" onClick={handleReloadDates}>Reload dates</button>
              </div>
            </div>
            <p className="helper-text date-range-helper">📅 Maximum date range: 90 days</p>
          </div>

          {/* Date Range Type Selection */}
          <div className="report-section">
            <h4 className="section-label">Date Range Type</h4>
            <div className="date-type-options">
              <label className="date-type-option">
                <input 
                  type="radio" 
                  name="dateRangeType" 
                  value="create-date"
                  checked={dateRangeType === 'create-date'}
                  onChange={(e) => setDateRangeType(e.target.value)}
                />
                <span>Create Date</span>
              </label>
              <label className="date-type-option">
                <input 
                  type="radio" 
                  name="dateRangeType" 
                  value="pickup-date"
                  checked={dateRangeType === 'pickup-date'}
                  onChange={(e) => setDateRangeType(e.target.value)}
                />
                <span>Pickup Date</span>
              </label>
              <label className="date-type-option">
                <input 
                  type="radio" 
                  name="dateRangeType" 
                  value="delivered-date"
                  checked={dateRangeType === 'delivered-date'}
                  onChange={(e) => setDateRangeType(e.target.value)}
                />
                <span>Delivered Date</span>
              </label>
              <label className="date-type-option">
                <input 
                  type="radio" 
                  name="dateRangeType" 
                  value="last-event-date"
                  checked={dateRangeType === 'last-event-date'}
                  onChange={(e) => setDateRangeType(e.target.value)}
                />
                <span>Last Event Date</span>
              </label>
            </div>
          </div>

          <div className="report-options-section">
            <h4>Report Options</h4>
            
            {/* Shipment Scope */}
            <div className="scope-section">
              <div className="scope-options">
                <label className="scope-option">
                  <input 
                    type="radio" 
                    name="shipmentScope" 
                    value="my-shipments-only"
                    checked={shipmentScope === 'my-shipments-only'}
                    onChange={(e) => setShipmentScope(e.target.value)}
                  />
                  <span className="option-text">
                    <strong>My Shipments only</strong>
                    <small>Show only shipments created by me</small>
                  </span>
                </label>
                <label className="scope-option">
                  <input 
                    type="radio" 
                    name="shipmentScope" 
                    value="all-shipments"
                    checked={shipmentScope === 'all-shipments'}
                    onChange={(e) => setShipmentScope(e.target.value)}
                  />
                  <span className="option-text">
                    <strong>All Shipments</strong>
                    <small>Show all shipments on my account</small>
                  </span>
                </label>
              </div>
              
              <div className="additional-option">
                <label className="checkbox-option-large">
                  <input 
                    type="checkbox" 
                    checked={include3rdParty}
                    onChange={(e) => setInclude3rdParty(e.target.checked)}
                  />
                  <span className="option-text">
                    <strong>Include 3rd Party Billing</strong>
                    <small>Include shipments billed to third parties</small>
                  </span>
                </label>
              </div>
            </div>
            
            {/* Status Filter */}
            <div className="status-filter-section">
              <h5 className="filter-label">Status Filter (Optional)</h5>
              <p className="filter-helper-text">Select specific statuses to filter, or leave unselected to include all statuses</p>
              <div className="status-filter-options">
                <label className="status-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes('created')}
                    onChange={() => handleStatusToggle('created')}
                  />
                  <span>Created</span>
                </label>
                <label className="status-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes('in-transit')}
                    onChange={() => handleStatusToggle('in-transit')}
                  />
                  <span>In Transit</span>
                </label>
                <label className="status-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes('delivered')}
                    onChange={() => handleStatusToggle('delivered')}
                  />
                  <span>Delivered</span>
                </label>
                <label className="status-checkbox">
                  <input 
                    type="checkbox" 
                    checked={selectedStatuses.includes('exception')}
                    onChange={() => handleStatusToggle('exception')}
                  />
                  <span>Exception</span>
                </label>
              </div>
            </div>
          </div>

          <div className="report-actions">
            <button className="help-btn" onClick={handleHelp}>Help</button>
            <button className="skip-btn" onClick={handleShipAnother}>Ship another</button>
            <button className="run-report-btn" onClick={handleRunReport}>Run report</button>
          </div>
        </div>
      ) : (
        <div className="report-results-content">
          <div className="report-results-header-new">
            <h3>Report Results</h3>
            <p>Showing {reportData.length} shipments from {fromMonth}/{fromDay}/{fromYear} to {toMonth}/{toDay}/{toYear}</p>
          </div>

          {reportData.length === 0 ? (
            <div className="report-no-results">
              <p>NO REPORT FOUND ON THE SPECIFIED DATE</p>
            </div>
          ) : (
            <div className="report-table-container">
              <table className="report-results-table">
                <thead>
                  <tr>
                    <th>Airbill Number</th>
                    <th>Reference</th>
                    <th>Status</th>
                    <th>Created Date</th>
                    <th>Pickup Date</th>
                    <th>Delivered Date</th>
                    <th>From Company</th>
                    <th>From Name</th>
                    <th>From Address 1</th>
                    <th>From Address 2</th>
                    <th>From City</th>
                    <th>From State</th>
                    <th>From Zipcode</th>
                    <th>To Company</th>
                    <th>To Name</th>
                    <th>To Address 1</th>
                    <th>To Address 2</th>
                    <th>To City</th>
                    <th>To State</th>
                    <th>To Zipcode</th>
                    <th>Service Type</th>
                    <th>Signature Requirement</th>
                    <th>Weight (lbs)</th>
                    <th>Dimension (in)</th>
                    <th>Shipping Rate</th>
                    <th>Bill to Account</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.airbillNumber}</td>
                      <td>{row.reference}</td>
                      <td><span className={`status-badge-new status-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                      <td>{row.createdDate}</td>
                      <td>{row.pickupDate}</td>
                      <td>{row.deliveredDate}</td>
                      <td>{row.fromCompany}</td>
                      <td>{row.fromName}</td>
                      <td>{row.fromAddress1}</td>
                      <td>{row.fromAddress2}</td>
                      <td>{row.fromCity}</td>
                      <td>{row.fromState}</td>
                      <td>{row.fromZipcode}</td>
                      <td>{row.toCompany}</td>
                      <td>{row.toName}</td>
                      <td>{row.toAddress1}</td>
                      <td>{row.toAddress2}</td>
                      <td>{row.toCity}</td>
                      <td>{row.toState}</td>
                      <td>{row.toZipcode}</td>
                      <td>{row.serviceType}</td>
                      <td>{row.signatureRequirement}</td>
                      <td>{row.weight}</td>
                      <td>{row.dimension}</td>
                      <td>{row.shippingRate}</td>
                      <td>{row.billToAccount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="report-results-actions">
            <button className="back-to-reports-btn" onClick={handleBackToReports}>
              ← Back to Reports
            </button>
            <div className="results-action-buttons">
              <button className="print-report-btn" onClick={handlePrint}>PRINT</button>
              <button className="export-csv-btn" onClick={handleExportCSV}>EXPORT CSV</button>
            </div>
          </div>
        </div>
      )}
      <Toast show={toast.show} message={toast.message} type={toast.type} />
    </div>
  );
};

export default Reports;
