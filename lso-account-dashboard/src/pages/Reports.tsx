import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    alert('Help: This page allows you to generate reports for your shipments. Select a date range and report options, then click "Run report" to generate your report.');
  };

  const handleShipAnother = () => {
    navigate('/ship-with-account');
  };

  const handleRunReport = () => {
    console.log('Running report with dates:', {
      from: `${fromMonth}/${fromDay}/${fromYear}`,
      to: `${toMonth}/${toDay}/${toYear}`
    });
    setShowResults(true);
  };

  const handleBackToReports = () => {
    setShowResults(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    alert('CSV export will be available soon.');
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
            <div className="date-group">
              <label>From</label>
              <div className="date-inputs">
                <input 
                  type="text" 
                  placeholder="Month" 
                  maxLength={2} 
                  className="date-input-month" 
                  value={fromMonth}
                  onChange={(e) => setFromMonth(e.target.value)}
                />
                <span className="date-separator">/</span>
                <input 
                  type="text" 
                  placeholder="Day" 
                  maxLength={2} 
                  className="date-input-day" 
                  value={fromDay}
                  onChange={(e) => setFromDay(e.target.value)}
                />
                <span className="date-separator">/</span>
                <input 
                  type="text" 
                  placeholder="Year" 
                  maxLength={4} 
                  className="date-input-year" 
                  value={fromYear}
                  onChange={(e) => setFromYear(e.target.value)}
                />
                <button className="date-action-btn" onClick={handleClearDate}>Clear date</button>
              </div>
            </div>

            <div className="date-group">
              <label>To</label>
              <div className="date-inputs">
                <input 
                  type="text" 
                  placeholder="Month" 
                  maxLength={2} 
                  className="date-input-month" 
                  value={toMonth}
                  onChange={(e) => setToMonth(e.target.value)}
                />
                <span className="date-separator">/</span>
                <input 
                  type="text" 
                  placeholder="Day" 
                  maxLength={2} 
                  className="date-input-day" 
                  value={toDay}
                  onChange={(e) => setToDay(e.target.value)}
                />
                <span className="date-separator">/</span>
                <input 
                  type="text" 
                  placeholder="Year" 
                  maxLength={4} 
                  className="date-input-year" 
                  value={toYear}
                  onChange={(e) => setToYear(e.target.value)}
                />
                <button className="date-action-btn" onClick={handleReloadDates}>Reload dates</button>
              </div>
            </div>
          </div>

          <div className="report-options-section">
            <h4>Report Options</h4>
            <div className="options-grid">
              <div className="options-column">
                <label className="radio-option">
                  <input type="radio" name="reportType" defaultChecked />
                  <span>Pickup Date<br /><small>(shows only those packages picked up)</small></span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="reportType" />
                  <span>Printed Date<br /><small>(shows all packages)</small></span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="reportType" />
                  <span>Billing difference<br /><small>(shows only those packages picked up)</small></span>
                </label>
              </div>
              <div className="options-column">
                <label className="radio-option">
                  <input type="radio" name="reportType" />
                  <span>My Shipments</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="reportType" />
                  <span>All Shipments on my Account</span>
                </label>
                <label className="radio-option">
                  <input type="radio" name="reportType" />
                  <span>My Shipments<br /><small>(including 3rd Party billed)</small></span>
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
          <div className="report-results-header">
            <div className="report-columns-header">
              <div className="column-item">PRINTED<br/>DATE</div>
              <div className="column-item">PICKUP<br/>DATE</div>
              <div className="column-item">AIRBILL<br/>NUMBER</div>
              <div className="column-item">COMPANY<br/>NAME &<br/>PERSON<br/>NAME</div>
              <div className="column-item">DELIVERY<br/>& ADDRESS</div>
              <div className="column-item">WEIGHT<br/>WT. COST</div>
              <div className="column-item">SERVICE<br/>TYPE</div>
              <div className="column-item">REFERENCE<br/>ACCT#/NUM</div>
              <div className="column-item">DELIVERY<br/>DATE/DELIVERY<br/>SIGNATURE</div>
            </div>
          </div>

          <div className="report-no-results">
            <p>NO REPORT FOUND ON THE SPECIFIED DATE</p>
          </div>

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
    </div>
  );
};

export default Reports;
