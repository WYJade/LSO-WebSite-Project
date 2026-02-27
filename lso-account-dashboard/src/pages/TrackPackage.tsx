import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { MenuItem } from '../types/components';
import { User, UserRole } from '../types/models';
import './TrackPackage.css';

const TrackPackage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'tracking' | 'reports' | 'proof'>('tracking');
  const [trackingNumbers, setTrackingNumbers] = useState<string[]>(['', '']);
  const [errors, setErrors] = useState<string[]>(['', '']);
  const [showReportResults, setShowReportResults] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingResults, setTrackingResults] = useState<any[]>([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCustomerServiceDialog, setShowCustomerServiceDialog] = useState(false);
  const [selectedTrackingNumber, setSelectedTrackingNumber] = useState('');
  const [showLiveChatDialog, setShowLiveChatDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: string, message: string, time: string}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [attachments, setAttachments] = useState<Array<{name: string, size: number, type: string}>>([]);
  const [showBulkExportDialog, setShowBulkExportDialog] = useState(false);
  const [selectedExportFormat, setSelectedExportFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [showCsvExportDialog, setShowCsvExportDialog] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [showPrintView, setShowPrintView] = useState(false);
  
  // Proof of Delivery states
  const [podSearchInput, setPodSearchInput] = useState('');
  const [podResults, setPodResults] = useState<any[]>([]);
  const [podCurrentPage, setPodCurrentPage] = useState(1);
  const [podItemsPerPage, setPodItemsPerPage] = useState(10);
  const [showPodPrintView, setShowPodPrintView] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalImageTitle, setModalImageTitle] = useState('');

  // Date states for Reports tab
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

  const currentUser: User = {
    id: '1',
    firstName: 'Andy',
    lastName: 'Smith',
    email: 'andy.smith@example.com',
    role: UserRole.ADMIN,
    language: 'EN',
    region: 'US',
  };

  // Check URL parameters for tab selection
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'reports' || tab === 'proof' || tab === 'tracking') {
      setActiveTab(tab as 'tracking' | 'reports' | 'proof');
    }
  }, [searchParams]);
  const handleAddTrackingNumber = () => {
    if (trackingNumbers.length < 25) {
      setTrackingNumbers([...trackingNumbers, '']);
      setErrors([...errors, '']);
    }
  };

  const handleTrackingNumberChange = (index: number, value: string) => {
    const newNumbers = [...trackingNumbers];
    newNumbers[index] = value;
    setTrackingNumbers(newNumbers);
    
    // Clear error when user starts typing
    if (value.trim()) {
      const newErrors = [...errors];
      newErrors[index] = '';
      setErrors(newErrors);
    }
  };

  const handleRemoveTrackingNumber = (index: number) => {
    if (trackingNumbers.length > 1) {
      const newNumbers = trackingNumbers.filter((_, i) => i !== index);
      const newErrors = errors.filter((_, i) => i !== index);
      setTrackingNumbers(newNumbers);
      setErrors(newErrors);
    }
  };

  const handleTrack = () => {
    // Validate all tracking numbers
    const newErrors = trackingNumbers.map(num => 
      num.trim() ? '' : 'Please enter a tracking number.'
    );
    setErrors(newErrors);
    
    // Check if there are any errors
    const hasErrors = newErrors.some(error => error !== '');
    if (!hasErrors) {
      const validNumbers = trackingNumbers.filter(n => n.trim());
      console.log('Tracking numbers:', validNumbers);
      // Here you would typically make an API call
    }
  };

  const handleRunReport = () => {
    // Simulate running report - in real app, this would call an API
    setShowReportResults(true);
    // Mock data - empty results to show "NO REPORT FOUND" message
    setReportData([]);
  };

  const handleBackToReports = () => {
    setShowReportResults(false);
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleExportCSV = () => {
    setShowCsvExportDialog(true);
  };

  const confirmCsvExport = () => {
    console.log('Exporting report to CSV...');
    alert('CSV export started. Your file will download shortly.');
    setShowCsvExportDialog(false);
    // In real app, this would generate and download CSV
  };

  const handleTrackingSearch = () => {
    // Mock tracking results - 50 items for large dataset testing
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose', 'Austin', 'Jacksonville', 'Fort Worth', 'Columbus', 'Charlotte', 'San Francisco', 'Indianapolis', 'Seattle', 'Denver', 'Boston'];
    const names = ['John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 'David Wilson', 'Jessica Martinez', 'James Anderson', 'Jennifer Taylor', 'Robert Thomas', 'Linda Jackson', 'William White', 'Mary Harris', 'Richard Martin', 'Patricia Thompson', 'Charles Garcia'];
    const serviceTypes = ['LSO Ground™', 'LSO Priority Next Day™', 'LSO Early Next Day™', 'LSO Economy Next Day™', 'LSO 2nd Day™', 'LSO E-Commerce Delivery™'];
    const statuses = ['Delivered', 'Picked Up', 'In Transit', 'Out For Delivery', 'New'];
    
    const mockResults = Array.from({ length: 50 }, (_, i) => ({
      trackingNumber: `QY${326000 + i}`,
      type: serviceTypes[i % serviceTypes.length],
      signTime: `2025-12-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      fromCity: cities[i % cities.length],
      toCity: cities[(i + 7) % cities.length],
      sender: names[i % names.length],
      receiver: names[(i + 5) % names.length],
      status: statuses[i % statuses.length]
    }));
    
    setTrackingResults(mockResults);
    setTotalItems(mockResults.length);
    setCurrentPage(1);
  };

  const handleFilterSelect = (filter: string) => {
    // This function is no longer used with multi-select
    setShowFilterMenu(false);
  };

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleServiceTypeToggle = (serviceType: string) => {
    setSelectedServiceTypes(prev => 
      prev.includes(serviceType) 
        ? prev.filter(s => s !== serviceType)
        : [...prev, serviceType]
    );
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSelectedServiceTypes([]);
  };

  const handleApplyFilters = () => {
    setShowFilterMenu(false);
    // Filter logic will be applied to the results
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleExportClick = (trackingNumber: string) => {
    setSelectedTrackingNumber(trackingNumber);
    setShowExportDialog(true);
  };

  const handleDeleteClick = (trackingNumber: string) => {
    setSelectedTrackingNumber(trackingNumber);
    setShowDeleteDialog(true);
  };

  const handleCustomerServiceClick = (trackingNumber: string) => {
    setSelectedTrackingNumber(trackingNumber);
    setShowCustomerServiceDialog(true);
  };

  const confirmExport = () => {
    console.log('Exporting tracking:', selectedTrackingNumber);
    setShowExportDialog(false);
    // Export logic here
  };

  const confirmDelete = () => {
    console.log('Deleting tracking:', selectedTrackingNumber);
    setTrackingResults(trackingResults.filter(r => r.trackingNumber !== selectedTrackingNumber));
    setShowDeleteDialog(false);
  };

  const handleCallUs = () => {
    setShowCustomerServiceDialog(false);
    // Copy phone number to clipboard
    navigator.clipboard.writeText('1-800-576-7447');
    alert('Phone number copied to clipboard: 1-800-LSO-SHIP (1-800-576-7447)');
  };

  const handleLiveChat = () => {
    setShowCustomerServiceDialog(false);
    setShowLiveChatDialog(true);
    // Add initial greeting message
    setChatMessages([
      {
        sender: 'agent',
        message: `Hello! I'm here to help you with tracking ${selectedTrackingNumber}. How can I assist you today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleEmailSupport = () => {
    setShowCustomerServiceDialog(false);
    setShowEmailDialog(true);
  };

  const handleSendChatMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        sender: 'user',
        message: chatInput,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput('');
      
      // Simulate agent response after 1 second
      setTimeout(() => {
        const agentResponse = {
          sender: 'agent',
          message: 'Thank you for your message. Our team is reviewing your inquiry and will respond shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, agentResponse]);
      }, 1000);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending email support request');
    alert('Your email has been sent successfully. We will respond within 24 hours.');
    setShowEmailDialog(false);
    setAttachments([]); // Clear attachments after sending
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type: string): string => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    if (type.includes('zip') || type.includes('compressed')) return '📦';
    return '📎';
  };

  const handleBulkExport = () => {
    setShowBulkExportDialog(true);
  };

  const confirmBulkExport = () => {
    console.log(`Exporting all ${trackingResults.length} shipments as ${selectedExportFormat.toUpperCase()}`);
    alert(`Exporting ${trackingResults.length} shipments as ${selectedExportFormat.toUpperCase()}. Download will start shortly.`);
    setShowBulkExportDialog(false);
  };

  const handleViewShipmentDetail = (shipment: any) => {
    // Add detailed tracking history and package information
    const detailedShipment = {
      ...shipment,
      trackingHistory: [
        { status: 'Data Transmitted', date: '02/08/2026 09:20 PM', location: shipment.fromCity.toUpperCase() },
        { status: 'Picked Up', date: '02/08/2026 11:22 PM', location: shipment.fromCity.toUpperCase() },
        { status: 'Inbound scan at destination', date: '02/09/2026 12:15 AM', location: shipment.toCity.toUpperCase() },
        { status: shipment.status, date: shipment.signTime, location: shipment.toCity.toUpperCase() }
      ],
      deliveryAddress: `${Math.floor(Math.random() * 9000) + 1000} ${['Main St', 'Oak Ave', 'Elm Rd', 'Pine Blvd'][Math.floor(Math.random() * 4)]}, ${shipment.toCity}, ${['CA', 'TX', 'NY', 'IL'][Math.floor(Math.random() * 4)]} ${Math.floor(Math.random() * 90000) + 10000}`,
      weight: `${(Math.random() * 50 + 1).toFixed(1)} lbs`,
      serviceType: shipment.type,
      signatureUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      podImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      // Package Info fields
      createTime: '02/08/2026 09:20 PM',
      billingRef: `REF${Math.floor(Math.random() * 900000) + 100000}`,
      length: `${Math.floor(Math.random() * 30) + 10} in`,
      width: `${Math.floor(Math.random() * 20) + 8} in`,
      height: `${Math.floor(Math.random() * 15) + 6} in`,
      // Sender address
      senderAddress: `${Math.floor(Math.random() * 9000) + 1000} ${['Broadway', 'Market St', 'Park Ave', 'Main St'][Math.floor(Math.random() * 4)]}, Suite ${Math.floor(Math.random() * 500) + 100}, ${shipment.fromCity}, ${['CA', 'TX', 'NY', 'IL'][Math.floor(Math.random() * 4)]}`,
      // Receiver address
      receiverAddress: `${Math.floor(Math.random() * 9000) + 1000} ${['Oak Ave', 'Elm Rd', 'Pine Blvd', 'Cedar Ln'][Math.floor(Math.random() * 4)]}, Apt ${Math.floor(Math.random() * 300) + 1}, ${shipment.toCity}, ${['CA', 'TX', 'NY', 'IL'][Math.floor(Math.random() * 4)]}`
    };
    setSelectedShipment(detailedShipment);
    setShowDetailView(true);
  };

  const handleBackToList = () => {
    setShowDetailView(false);
    setSelectedShipment(null);
  };

  const handleShowPrintView = () => {
    setShowPrintView(true);
    // Trigger print dialog after a short delay to ensure content is rendered
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleClosePrintView = () => {
    setShowPrintView(false);
  };

  const handlePrintAll = () => {
    window.print();
  };

  const handleClearDate = () => {
    // Clear both From and To dates
    setFromMonth('');
    setFromDay('');
    setFromYear('');
    setToMonth('');
    setToDay('');
    setToYear('');
  };

  const handleReloadDates = () => {
    // Reload both From and To dates to default values
    const dates = getDefaultDates();
    setFromMonth(dates.fromMonth);
    setFromDay(dates.fromDay);
    setFromYear(dates.fromYear);
    setToMonth(dates.toMonth);
    setToDay(dates.toDay);
    setToYear(dates.toYear);
  };

  // Proof of Delivery handlers
  const handlePodSearch = () => {
    // Mock POD results with realistic sample data - 20 items
    const addresses = [
      '1234 MAIN ST, LOS ANGELES, CA 90001',
      '5678 OAK AVE, NEW YORK, NY 10001',
      '9012 PINE RD, CHICAGO, IL 60601',
      '3456 ELM BLVD, HOUSTON, TX 77001',
      '7890 MAPLE DR, PHOENIX, AZ 85001',
      '2345 CEDAR LN, PHILADELPHIA, PA 19101',
      '6789 BIRCH ST, SAN ANTONIO, TX 78201',
      '1357 SPRUCE AVE, SAN DIEGO, CA 92101',
      '2468 WILLOW RD, DALLAS, TX 75201',
      '3579 ASPEN BLVD, SAN JOSE, CA 95101'
    ];
    const serviceTypes = ['LSO Ground™', 'LSO Priority Next Day™', 'LSO Early Next Day™', 'LSO 2nd Day™'];
    const signedByNames = ['John Smith', 'Mary Johnson', 'Robert Brown', 'Jennifer Davis', 'Michael Wilson', 'Linda Martinez', 'David Anderson', 'Sarah Taylor', 'James Thomas', 'Patricia Garcia'];
    
    const mockPodResults = Array.from({ length: 20 }, (_, i) => ({
      trackingNumber: `Z${100 + i}D0V${i}`,
      airbillNo: `Z${100 + i}D0V${i}`,
      trackingStatus: 'Delivered',
      serviceType: serviceTypes[i % serviceTypes.length],
      deliveryDate: `02/${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}/2026`,
      deliveryAddress: addresses[i % addresses.length],
      signedBy: signedByNames[i % signedByNames.length],
      signatureUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      podImages: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
    }));
    
    setPodResults(mockPodResults);
  };

  const handleBackToPodSearch = () => {
    setPodResults([]);
    setPodSearchInput('');
  };

  const handleShowPodPrintView = () => {
    setShowPodPrintView(true);
    // Trigger print dialog immediately after a short delay to ensure content is rendered
    setTimeout(() => {
      window.print();
    }, 50);
  };

  const handleClosePodPrintView = () => {
    setShowPodPrintView(false);
  };

  const handleViewImage = (imageUrl: string, title: string) => {
    setModalImageUrl(imageUrl);
    setModalImageTitle(title);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setModalImageUrl('');
    setModalImageTitle('');
  };

  return (
    <div className="track-package-page">
      {/* <TopBar /> */}
      <NavigationBar
        currentUser={currentUser}
        onLogoClick={() => navigate('/')}
        onMenuItemClick={(item: MenuItem) => navigate(item.href)}
        onSearch={(query: string) => console.log('Search:', query)}
        onLanguageChange={(lang: string) => console.log('Language:', lang)}
      />

      {/* Hero Banner */}
      <div className="tracking-hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <p className="hero-subtitle">SERVICES</p>
            <h1 className="hero-title">YOUR TRACKING</h1>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb-container">
        <div className="breadcrumb">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
          <span className="separator">›</span>
          <span className="current">Account Tracking</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="track-content-wrapper">
        <div className="track-content">
          {/* Title with Icon */}
          <div className="content-header">
            <svg className="lso-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 3L8 8L16 0L21 5L13 13L8 8L3 3Z" fill="#003087"/>
              <rect x="2" y="10" width="20" height="2" fill="#003087"/>
              <rect x="2" y="14" width="20" height="2" fill="#003087"/>
            </svg>
            <h2>Check out your account tracking here</h2>
          </div>

          {/* Tabs */}
          <div className="tracking-tabs">
            <button
              className={`tab-button ${activeTab === 'tracking' ? 'active' : ''}`}
              onClick={() => setActiveTab('tracking')}
            >
              Tracking
            </button>
            <button
              className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </button>
            <button
              className={`tab-button ${activeTab === 'proof' ? 'active' : ''}`}
              onClick={() => setActiveTab('proof')}
            >
              Proof of Delivery
            </button>
          </div>

          {/* Tracking Content */}
          {activeTab === 'tracking' && !showDetailView && (
            <div className="tracking-content-new">
              <div className="tracking-search-bar">
                <input
                  type="text"
                  className="tracking-search-input"
                  placeholder="Enter Tracking number to search, separate multiple with commas"
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                />
                <button className="tracking-search-btn" onClick={handleTrackingSearch}>
                  Search
                </button>
              </div>

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

              {trackingResults.length > 0 && (
                <div className="tracking-results-section">
                  <div className="results-header-bar">
                    <h3 className="results-title">My Shipments</h3>
                    <div className="results-actions">
                      <button className="print-ready-btn" onClick={handleShowPrintView}>
                        📄 See Print-ready option
                      </button>
                      <button className="export-icon-btn" onClick={handleBulkExport}>📤 Export</button>
                      <button className="filter-icon-btn" onClick={() => setShowFilterMenu(!showFilterMenu)}>
                        🔽 Filter
                      </button>
                    </div>
                  </div>

                  {showFilterMenu && (
                    <div className="filter-modal-overlay" onClick={() => setShowFilterMenu(false)}>
                      <div className="filter-modal-panel" onClick={(e) => e.stopPropagation()}>
                        <div className="filter-panel-header">
                          <h4>Filter Options</h4>
                          <button className="filter-close-btn" onClick={() => setShowFilterMenu(false)}>✕</button>
                        </div>
                        
                        <div className="filter-panel-body">
                          {/* Status Filter */}
                          <div className="filter-section">
                            <div className="filter-section-title">Status</div>
                            <div className="filter-checkbox-group">
                              {[
                                { value: 'created', label: 'Created' },
                                { value: 'picked-up-by-driver', label: 'Picked up by Driver' },
                                { value: 'possession-scan', label: 'Possession Scan at Terminal' },
                                { value: 'inbound', label: 'Inbound scan at destination' },
                                { value: 'out-for-delivery', label: 'Out For Delivery' },
                                { value: 'delivered', label: 'Delivered' },
                                { value: 'failed', label: 'Failed Attempt' },
                                { value: 'discarded', label: 'Discarded' },
                                { value: 'lost', label: 'Lost' },
                                { value: 'return', label: 'Return to sender' },
                                { value: 'delay', label: 'Delay Exception' }
                              ].map(status => (
                                <label key={status.value} className="filter-checkbox-item">
                                  <input
                                    type="checkbox"
                                    checked={selectedStatuses.includes(status.value)}
                                    onChange={() => handleStatusToggle(status.value)}
                                  />
                                  <span>{status.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Service Type Filter */}
                          <div className="filter-section">
                            <div className="filter-section-title">Service Type</div>
                            <div className="filter-checkbox-group">
                              {[
                                'LSO Priority Next Day™',
                                'LSO Early Next Day™',
                                'LSO Economy Next Day™',
                                'LSO Ground™',
                                'LSO 2nd Day™',
                                'LSO E-Commerce Delivery™'
                              ].map(serviceType => (
                                <label key={serviceType} className="filter-checkbox-item">
                                  <input
                                    type="checkbox"
                                    checked={selectedServiceTypes.includes(serviceType)}
                                    onChange={() => handleServiceTypeToggle(serviceType)}
                                  />
                                  <span>{serviceType}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="filter-panel-footer">
                          <button className="filter-clear-btn" onClick={handleClearFilters}>
                            Clear All
                          </button>
                          <button className="filter-apply-btn" onClick={handleApplyFilters}>
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="tracking-results-list">
                    {trackingResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((result, index) => (
                      <div 
                        key={index} 
                        className="tracking-result-card clickable-card"
                        onClick={() => handleViewShipmentDetail(result)}
                      >
                        <div className="result-header">
                          <div className="result-tracking-info">
                            <span className="result-tracking-number">Tracking # {result.trackingNumber}</span>
                            <span className="result-service-type-badge">
                              {result.type}
                            </span>
                            <span className={`result-status-badge status-${result.status.toLowerCase().replace(' ', '-')}`}>
                              {result.status}
                            </span>
                          </div>
                          {result.status === 'Delivered' && result.signTime && (
                            <div className="result-sign-time">Delivered time: {result.signTime}</div>
                          )}
                        </div>
                        <div className="result-route">
                          <div className="result-location from-location">
                            <div className="location-label">From</div>
                            <div className="location-city">{result.fromCity}</div>
                            <div className="location-person">{result.sender}</div>
                          </div>
                          <div className="result-arrow">
                            <svg className="route-arrow-icon" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <marker id={`arrowhead-${index}`} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                                  <polygon points="0 3, 12 6, 0 9" fill="#d0d0d0" />
                                </marker>
                              </defs>
                              <line x1="10" y1="20" x2="190" y2="20" stroke="#d0d0d0" strokeWidth="3" markerEnd={`url(#arrowhead-${index})`} />
                            </svg>
                          </div>
                          <div className="result-location to-location">
                            <div className="location-label">To</div>
                            <div className="location-city">{result.toCity}</div>
                            <div className="location-person">{result.receiver}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                          <button className="result-action-link" onClick={() => handleCustomerServiceClick(result.trackingNumber)}>💬 Customer Service</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pagination-container">
                    <div className="pagination-info">
                      <span className="total-items">Total {totalItems} items</span>
                      <select 
                        className="items-per-page-select" 
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                      >
                        <option value={10}>10 items/page</option>
                        <option value={20}>20 items/page</option>
                        <option value={50}>50 items/page</option>
                      </select>
                    </div>
                    <div className="pagination-controls">
                      <button 
                        className="page-btn prev-btn"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        ‹
                      </button>
                      <button className="page-btn page-number active">1</button>
                      <button 
                        className="page-btn next-btn"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
                      >
                        ›
                      </button>
                    </div>
                    <div className="pagination-jump">
                      <span>Go to</span>
                      <input 
                        type="number" 
                        className="page-jump-input" 
                        min="1"
                        max={Math.ceil(totalItems / itemsPerPage)}
                        placeholder="Page"
                      />
                      <span>Page</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipment Detail View */}
          {activeTab === 'tracking' && showDetailView && selectedShipment && (
            <div className="shipment-detail-view">
              <div className="detail-header">
                <button className="back-to-list-btn" onClick={handleBackToList}>
                  ← Back to List
                </button>
                <h2 className="detail-title">Shipment Details</h2>
              </div>

              <div className="detail-content">
                {/* Tracking Number Header */}
                <div className="detail-tracking-header">
                  <h1 className="detail-tracking-number">#{selectedShipment.trackingNumber}</h1>
                  <div className="detail-status-badges">
                    <span className={`detail-status-badge status-${selectedShipment.status.toLowerCase().replace(' ', '-')}`}>
                      {selectedShipment.status}
                    </span>
                    <span className="detail-service-badge">{selectedShipment.serviceType}</span>
                  </div>
                </div>

                {/* Shipment Information Grid */}
                <div className="detail-info-grid">
                  <div className="info-section">
                    <h3 className="section-title">Package Info</h3>
                    <div className="info-rows">
                      <div className="info-row">
                        <span className="info-label">Create Time</span>
                        <span className="info-value">{selectedShipment.createTime}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Billing Ref</span>
                        <span className="info-value">{selectedShipment.billingRef}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Length</span>
                        <span className="info-value">{selectedShipment.length}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Width</span>
                        <span className="info-value">{selectedShipment.width}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Height</span>
                        <span className="info-value">{selectedShipment.height}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Weight</span>
                        <span className="info-value">{selectedShipment.weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3 className="section-title">Proof of Delivery</h3>
                    <div className="info-rows">
                      <div className="info-row">
                        <span className="info-label">Delivery Date</span>
                        <span className="info-value">{selectedShipment.signTime}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Signed by</span>
                        <span className="info-value">{selectedShipment.receiver}</span>
                      </div>
                    </div>
                    <div className="address-box">
                      <div className="address-icon">📍</div>
                      <div className="address-text">{selectedShipment.deliveryAddress}</div>
                    </div>
                    <div className="pod-image-section">
                      <div className="pod-image-label">SIGNATURE URL</div>
                      <div 
                        className="pod-image-link" 
                        onClick={() => handleViewImage(selectedShipment.signatureUrl, 'Signature')}
                      >
                        View Signature
                      </div>
                    </div>
                    <div className="pod-image-section">
                      <div className="pod-image-label">PROOF OF DELIVERY IMAGES</div>
                      <div 
                        className="pod-image-link" 
                        onClick={() => handleViewImage(selectedShipment.podImage, 'Proof of Delivery')}
                      >
                        View Image
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3 className="section-title">Sender Info</h3>
                    <div className="contact-info">
                      <div className="contact-icon">👤</div>
                      <div>
                        <div className="contact-name">{selectedShipment.sender}</div>
                        <div className="contact-location">{selectedShipment.senderAddress}</div>
                      </div>
                    </div>
                  </div>

                  <div className="info-section">
                    <h3 className="section-title">Receiver Info</h3>
                    <div className="contact-info">
                      <div className="contact-icon">👤</div>
                      <div>
                        <div className="contact-name">{selectedShipment.receiver}</div>
                        <div className="contact-location">{selectedShipment.receiverAddress}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking History */}
                <div className="tracking-history-section">
                  <h3 className="section-title">Tracking History</h3>
                  <div className="history-table">
                    <div className="history-header">
                      <div className="history-col">Status</div>
                      <div className="history-col">Date</div>
                      <div className="history-col">Location</div>
                    </div>
                    {selectedShipment.trackingHistory.map((event: any, index: number) => (
                      <div key={index} className="history-row">
                        <div className="history-col history-status">{event.status}</div>
                        <div className="history-col history-date">{event.date}</div>
                        <div className="history-col history-location">{event.location}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="detail-actions">
                  <button className="detail-action-btn secondary-btn" onClick={handleBackToList}>
                    Track Another
                  </button>
                  <button className="detail-action-btn primary-btn" onClick={() => window.print()}>
                    📄 Print Details
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Export Dialog */}
          {showExportDialog && (
            <div className="dialog-overlay" onClick={() => setShowExportDialog(false)}>
              <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Export Tracking Information</h3>
                  <button className="dialog-close" onClick={() => setShowExportDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Export tracking details for <strong>{selectedTrackingNumber}</strong>?</p>
                  <div className="export-options">
                    <label className="export-option">
                      <input type="radio" name="exportFormat" defaultChecked />
                      <span>PDF Format</span>
                    </label>
                    <label className="export-option">
                      <input type="radio" name="exportFormat" />
                      <span>Excel Format</span>
                    </label>
                    <label className="export-option">
                      <input type="radio" name="exportFormat" />
                      <span>CSV Format</span>
                    </label>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn cancel-btn" onClick={() => setShowExportDialog(false)}>Cancel</button>
                  <button className="dialog-btn confirm-btn" onClick={confirmExport}>Export</button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          {showDeleteDialog && (
            <div className="dialog-overlay" onClick={() => setShowDeleteDialog(false)}>
              <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Confirm Delete</h3>
                  <button className="dialog-close" onClick={() => setShowDeleteDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Are you sure you want to delete tracking <strong>{selectedTrackingNumber}</strong>?</p>
                  <p className="warning-text">This action cannot be undone.</p>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn cancel-btn" onClick={() => setShowDeleteDialog(false)}>Cancel</button>
                  <button className="dialog-btn delete-btn" onClick={confirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {/* Customer Service Dialog */}
          {showCustomerServiceDialog && (
            <div className="dialog-overlay" onClick={() => setShowCustomerServiceDialog(false)}>
              <div className="dialog-box customer-service-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>Customer Service</h3>
                  <button className="dialog-close" onClick={() => setShowCustomerServiceDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Need help with tracking <strong>{selectedTrackingNumber}</strong>?</p>
                  <div className="service-options">
                    <button className="service-option-btn" onClick={handleCallUs}>
                      <span className="service-icon">📞</span>
                      <div>
                        <div className="service-title">Call Us</div>
                        <div className="service-detail">1-800-LSO-SHIP</div>
                      </div>
                    </button>
                    <button className="service-option-btn" onClick={handleLiveChat}>
                      <span className="service-icon">💬</span>
                      <div>
                        <div className="service-title">Live Chat</div>
                        <div className="service-detail">Available 24/7</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn cancel-btn" onClick={() => setShowCustomerServiceDialog(false)}>Close</button>
                </div>
              </div>
            </div>
          )}

          {/* Live Chat Dialog */}
          {showLiveChatDialog && (
            <div className="dialog-overlay" onClick={() => setShowLiveChatDialog(false)}>
              <div className="dialog-box live-chat-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>💬 Live Chat Support</h3>
                  <button className="dialog-close" onClick={() => setShowLiveChatDialog(false)}>✕</button>
                </div>
                <div className="dialog-body chat-body">
                  <div className="chat-messages">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`chat-message ${msg.sender}`}>
                        <div className="message-content">
                          <div className="message-text">{msg.message}</div>
                          <div className="message-time">{msg.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="chat-input-area">
                    <input
                      type="text"
                      className="chat-input"
                      placeholder="Type your message..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    />
                    <button className="chat-send-btn" onClick={handleSendChatMessage}>
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Email Support Dialog */}
          {showEmailDialog && (
            <div className="dialog-overlay" onClick={() => setShowEmailDialog(false)}>
              <div className="dialog-box email-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>✉️ Email Support</h3>
                  <button className="dialog-close" onClick={() => setShowEmailDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Send us an email about tracking <strong>{selectedTrackingNumber}</strong></p>
                  <form onSubmit={handleSendEmail} className="email-form">
                    <div className="form-group">
                      <label>Your Name</label>
                      <input type="text" className="form-input" placeholder="Enter your name" required />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" className="form-input" placeholder="your.email@example.com" required />
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input type="text" className="form-input" placeholder="Brief subject" required />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea className="form-textarea" rows={5} placeholder="Describe your issue..." required></textarea>
                    </div>
                    
                    {/* Attachments Section */}
                    <div className="form-group">
                      <label>Attachments</label>
                      <div className="attachment-section">
                        <input
                          type="file"
                          id="file-upload"
                          className="file-input-hidden"
                          multiple
                          onChange={handleFileSelect}
                        />
                        <label htmlFor="file-upload" className="file-upload-btn">
                          <span className="upload-icon">📎</span>
                          <span>Attach Files</span>
                        </label>
                        <span className="attachment-hint">Max 10MB per file</span>
                      </div>
                      
                      {/* Display Attached Files */}
                      {attachments.length > 0 && (
                        <div className="attachments-list">
                          {attachments.map((file, index) => (
                            <div key={index} className="attachment-item">
                              <span className="file-icon">{getFileIcon(file.type)}</span>
                              <div className="file-info">
                                <div className="file-name">{file.name}</div>
                                <div className="file-size">{formatFileSize(file.size)}</div>
                              </div>
                              <button
                                type="button"
                                className="remove-attachment-btn"
                                onClick={() => handleRemoveAttachment(index)}
                                title="Remove attachment"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="dialog-footer">
                      <button type="button" className="dialog-btn cancel-btn" onClick={() => setShowEmailDialog(false)}>Cancel</button>
                      <button type="submit" className="dialog-btn confirm-btn">Send Email</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Export Dialog */}
          {showBulkExportDialog && (
            <div className="dialog-overlay" onClick={() => setShowBulkExportDialog(false)}>
              <div className="dialog-box bulk-export-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>📤 Export All Shipments</h3>
                  <button className="dialog-close" onClick={() => setShowBulkExportDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Export all <strong>{trackingResults.length} shipments</strong> from your tracking results</p>
                  
                  <div className="export-info-box">
                    <div className="info-item">
                      <span className="info-icon">📦</span>
                      <div className="info-content">
                        <div className="info-label">Total Shipments</div>
                        <div className="info-value">{trackingResults.length}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📊</span>
                      <div className="info-content">
                        <div className="info-label">Export Date</div>
                        <div className="info-value">{new Date().toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div className="export-format-section">
                    <label className="format-label">Select Export Format:</label>
                    <div className="export-format-options">
                      <label className={`format-option ${selectedExportFormat === 'pdf' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="bulkExportFormat" 
                          value="pdf"
                          checked={selectedExportFormat === 'pdf'}
                          onChange={(e) => setSelectedExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                        />
                        <div className="format-content">
                          <span className="format-icon">📄</span>
                          <div className="format-details">
                            <div className="format-name">PDF Document</div>
                            <div className="format-desc">Best for printing and sharing</div>
                          </div>
                        </div>
                      </label>
                      <label className={`format-option ${selectedExportFormat === 'excel' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="bulkExportFormat" 
                          value="excel"
                          checked={selectedExportFormat === 'excel'}
                          onChange={(e) => setSelectedExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                        />
                        <div className="format-content">
                          <span className="format-icon">📊</span>
                          <div className="format-details">
                            <div className="format-name">Excel Spreadsheet</div>
                            <div className="format-desc">Best for data analysis</div>
                          </div>
                        </div>
                      </label>
                      <label className={`format-option ${selectedExportFormat === 'csv' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="bulkExportFormat" 
                          value="csv"
                          checked={selectedExportFormat === 'csv'}
                          onChange={(e) => setSelectedExportFormat(e.target.value as 'pdf' | 'excel' | 'csv')}
                        />
                        <div className="format-content">
                          <span className="format-icon">📋</span>
                          <div className="format-details">
                            <div className="format-name">CSV File</div>
                            <div className="format-desc">Universal compatibility</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="export-note">
                    <span className="note-icon">ℹ️</span>
                    <span>The export will include tracking numbers, status, locations, and timestamps for all shipments.</span>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn cancel-btn" onClick={() => setShowBulkExportDialog(false)}>Cancel</button>
                  <button className="dialog-btn confirm-btn export-confirm-btn" onClick={confirmBulkExport}>
                    <span>📥</span>
                    <span>Export {selectedExportFormat.toUpperCase()}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* CSV Export Dialog for Reports */}
          {showCsvExportDialog && (
            <div className="dialog-overlay" onClick={() => setShowCsvExportDialog(false)}>
              <div className="dialog-box csv-export-dialog" onClick={(e) => e.stopPropagation()}>
                <div className="dialog-header">
                  <h3>📊 Export Report to CSV</h3>
                  <button className="dialog-close" onClick={() => setShowCsvExportDialog(false)}>✕</button>
                </div>
                <div className="dialog-body">
                  <p>Export your report data to CSV format for easy analysis in spreadsheet applications.</p>
                  
                  <div className="export-info-box">
                    <div className="info-item">
                      <span className="info-icon">📅</span>
                      <div className="info-content">
                        <div className="info-label">Date Range</div>
                        <div className="info-value">{fromMonth}/{fromDay}/{fromYear} - {toMonth}/{toDay}/{toYear}</div>
                      </div>
                    </div>
                    <div className="info-item">
                      <span className="info-icon">📋</span>
                      <div className="info-content">
                        <div className="info-label">Format</div>
                        <div className="info-value">CSV</div>
                      </div>
                    </div>
                  </div>

                  <div className="csv-export-features">
                    <div className="feature-title">Your CSV export will include:</div>
                    <div className="feature-list">
                      <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>All shipment tracking numbers</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>Pickup and delivery dates</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>Origin and destination information</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>Service types and status</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">✓</span>
                        <span>Weight and billing details</span>
                      </div>
                    </div>
                  </div>

                  <div className="export-note">
                    <span className="note-icon">ℹ️</span>
                    <span>The CSV file can be opened in Excel, Google Sheets, or any spreadsheet application.</span>
                  </div>
                </div>
                <div className="dialog-footer">
                  <button className="dialog-btn cancel-btn" onClick={() => setShowCsvExportDialog(false)}>Cancel</button>
                  <button className="dialog-btn confirm-btn export-confirm-btn" onClick={confirmCsvExport}>
                    <span>📥</span>
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Print-Ready View Dialog */}
          {showPrintView && (
            <div className="print-view-container" onClick={handleClosePrintView}>
              <div className="print-content" onClick={(e) => e.stopPropagation()}>
                <div className="print-page-header">
                  <p className="print-page-title">Your Tracking Information is below</p>
                  <div className="print-header-actions">
                    <button className="print-close-btn" onClick={handleClosePrintView}>Close</button>
                    <button className="print-action-btn" onClick={handlePrintAll}>📄 Print</button>
                  </div>
                </div>

                <div className="print-shipments-grid">
                  {trackingResults.map((shipment, index) => (
                    <div key={index} className="print-shipment-block">
                      <h2 className="print-shipment-number">#{shipment.trackingNumber}</h2>
                      
                      <div className="print-details-list">
                        <div className="print-detail-row">
                          <span className="print-detail-label">Airbill No</span>
                          <span className="print-detail-value">{shipment.trackingNumber}</span>
                        </div>
                        <div className="print-detail-row">
                          <span className="print-detail-label">Tracking Status</span>
                          <span className="print-detail-value">{shipment.status}</span>
                        </div>
                        <div className="print-detail-row">
                          <span className="print-detail-label">Delivery Date</span>
                          <span className="print-detail-value"></span>
                        </div>
                        <div className="print-detail-row">
                          <span className="print-detail-label">Signed by</span>
                          <span className="print-detail-value"></span>
                        </div>
                        <div className="print-detail-row">
                          <span className="print-detail-label">Delivery Address</span>
                          <span className="print-detail-value">
                            {Math.floor(Math.random() * 9000) + 1000} CHISHOLM TRL null WEATHERFORD, TX {Math.floor(Math.random() * 90000) + 10000}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && !showReportResults && (
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
                <button className="help-btn">Help</button>
                <button className="skip-btn" onClick={() => navigate('/ship-with-account')}>Ship another</button>
                <button className="run-report-btn" onClick={handleRunReport}>Run report</button>
              </div>
            </div>
          )}

          {activeTab === 'reports' && showReportResults && (
            <div className="report-results-content">
              <div className="report-results-header">
                <div className="report-columns-header">
                  <div className="column-item">PRINTED<br/>DATE</div>
                  <div className="column-item">PICKUP<br/>DATE</div>
                  <div className="column-item">AIRBILL<br/>NUMBER</div>
                  <div className="column-item">COMPANY<br/>NAME<br/>ATTENTION<br/>NAME</div>
                  <div className="column-item">DELIVERY<br/>ADDRESS</div>
                  <div className="column-item">WEIGHT<br/>EST. COST</div>
                  <div className="column-item">SERVICE<br/>TYPE</div>
                  <div className="column-item">REFERENCE<br/>ACCTNUM</div>
                  <div className="column-item">DELIVERY<br/>DATE/DELIVERY<br/>SIGNATURE</div>
                </div>
              </div>

              {reportData.length === 0 ? (
                <div className="no-report-message">
                  <h2>NO REPORT FOUND ON THE SPECIFIED DATE</h2>
                </div>
              ) : (
                <div className="report-table">
                  {/* Table data would go here */}
                </div>
              )}

              <div className="report-results-actions">
                <button className="back-btn" onClick={handleBackToReports}>
                  ← Back to Reports
                </button>
                <div className="export-actions">
                  <button className="print-btn" onClick={handlePrintReport}>
                    Print
                  </button>
                  <button className="export-csv-btn" onClick={handleExportCSV}>
                    Export CSV
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'proof' && (
            <div className="pod-content">
              {podResults.length === 0 ? (
                <div className="pod-search-section">
                  <div className="pod-instruction-text">
                    <p>See proof of delivery including digitized signatures (if available) using the form below. You can print the resulting documents to file away for safe keeping.</p>
                  </div>
                  
                  <div className="pod-search-bar">
                    <input
                      type="text"
                      className="pod-search-input"
                      placeholder="Enter Tracking number to search"
                      value={podSearchInput}
                      onChange={(e) => setPodSearchInput(e.target.value)}
                    />
                    <button className="pod-search-btn" onClick={handlePodSearch}>
                      Submit
                    </button>
                  </div>

                  <div className="pod-empty-state">
                    <div className="pod-empty-icon">📋</div>
                    <h3>Access Your Delivery Proof</h3>
                    <p>Enter your tracking number above to view proof of delivery documents, including signatures and delivery confirmations.</p>
                    <div className="pod-empty-tips">
                      <div className="pod-tip-item">
                        <span className="pod-tip-icon">✓</span>
                        <span>View digitized signatures</span>
                      </div>
                      <div className="pod-tip-item">
                        <span className="pod-tip-icon">✓</span>
                        <span>Print delivery confirmations</span>
                      </div>
                      <div className="pod-tip-item">
                        <span className="pod-tip-icon">✓</span>
                        <span>Save records for your files</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pod-results-section">
                  <div className="pod-results-header">
                    <h3 className="pod-results-title">Proof Of Delivery Result</h3>
                  </div>

                  <div className="pod-results-list">
                    {podResults.slice((podCurrentPage - 1) * podItemsPerPage, podCurrentPage * podItemsPerPage).map((result, index) => (
                      <div key={index} className="pod-result-block">
                        <div className="pod-header-row">
                          <h2 className="pod-tracking-number">#{result.trackingNumber}</h2>
                          <div className="pod-badges">
                            <span className="pod-service-type-badge">{result.serviceType}</span>
                            <span className="pod-status-badge-outline">
                              <span className="status-icon">✓</span>
                              <span className="status-text">{result.trackingStatus}</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="pod-details-list">
                          <div className="pod-detail-row">
                            <span className="pod-detail-label">Delivery Date</span>
                            <span className="pod-detail-value">{result.deliveryDate}</span>
                          </div>
                          <div className="pod-detail-row">
                            <span className="pod-detail-label">Delivery Address</span>
                            <span className="pod-detail-value">{result.deliveryAddress}</span>
                          </div>
                          <div className="pod-detail-row">
                            <span className="pod-detail-label">Signed By</span>
                            <span className="pod-detail-value">{result.signedBy}</span>
                          </div>
                          <div className="pod-detail-row">
                            <span className="pod-detail-label">Signature URL</span>
                            <span 
                              className="pod-detail-link" 
                              onClick={() => handleViewImage('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80', 'Delivery Signature')}
                              style={{ cursor: 'pointer' }}
                            >
                              View Signature
                            </span>
                          </div>
                          <div className="pod-detail-row">
                            <span className="pod-detail-label">Proof of Delivery Images</span>
                            <span 
                              className="pod-detail-link" 
                              onClick={() => handleViewImage(result.podImages, 'Proof of Delivery')}
                              style={{ cursor: 'pointer' }}
                            >
                              View Image
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pagination-container">
                    <div className="pagination-info">
                      <span className="total-items">Total {podResults.length} items</span>
                      <select 
                        className="items-per-page-select" 
                        value={podItemsPerPage}
                        onChange={(e) => { setPodItemsPerPage(Number(e.target.value)); setPodCurrentPage(1); }}
                      >
                        <option value={10}>10 items/page</option>
                        <option value={20}>20 items/page</option>
                        <option value={50}>50 items/page</option>
                        <option value={100}>100 items/page</option>
                      </select>
                    </div>
                    <div className="pagination-controls">
                      <button 
                        className="page-btn prev-btn"
                        onClick={() => setPodCurrentPage(podCurrentPage - 1)}
                        disabled={podCurrentPage === 1}
                      >
                        ‹
                      </button>
                      {Array.from({ length: Math.ceil(podResults.length / podItemsPerPage) }, (_, i) => i + 1)
                        .filter(page => {
                          const totalPages = Math.ceil(podResults.length / podItemsPerPage);
                          return page === 1 || page === totalPages || Math.abs(page - podCurrentPage) <= 1;
                        })
                        .map((page, idx, arr) => (
                          <React.Fragment key={page}>
                            {idx > 0 && arr[idx - 1] !== page - 1 && <span className="page-ellipsis">...</span>}
                            <button
                              className={`page-btn ${page === podCurrentPage ? 'active' : ''}`}
                              onClick={() => setPodCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))}
                      <button 
                        className="page-btn next-btn"
                        onClick={() => setPodCurrentPage(podCurrentPage + 1)}
                        disabled={podCurrentPage === Math.ceil(podResults.length / podItemsPerPage)}
                      >
                        ›
                      </button>
                    </div>
                  </div>

                  <div className="pod-actions">
                    <button className="pod-action-btn secondary-pod-btn" onClick={handleBackToPodSearch}>
                      See proof of other deliveries
                    </button>
                    <button className="pod-action-btn primary-pod-btn" onClick={handleShowPodPrintView}>
                      📄 See Print-ready option
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* POD Print-Ready View */}
          {showPodPrintView && (
            <div className="pod-print-view-container">
              <div className="pod-print-content">
                <div className="pod-print-page-header">
                  <p className="pod-print-page-title">Proof Of Delivery Result</p>
                  <div className="pod-print-header-actions">
                    <button className="pod-print-close-btn" onClick={handleClosePodPrintView}>Close</button>
                    <button className="pod-print-action-btn" onClick={() => window.print()}>📄 Print</button>
                  </div>
                </div>

                <div className="pod-print-results-grid">
                  {podResults.map((result, index) => (
                    <div key={index} className="pod-print-result-block">
                      <h2 className="pod-print-tracking-number">#{result.trackingNumber}</h2>
                      
                      {/* Tracking Status - Prominent Display for Print */}
                      <div className="pod-print-status-badge">
                        <strong>Status:</strong> {result.trackingStatus}
                      </div>
                      
                      <div className="pod-print-details-list">
                        <div className="pod-print-detail-row">
                          <span className="pod-print-detail-label">Delivery Date</span>
                          <span className="pod-print-detail-value">{result.deliveryDate}</span>
                        </div>
                        <div className="pod-print-detail-row">
                          <span className="pod-print-detail-label">Delivery Address</span>
                          <span className="pod-print-detail-value">{result.deliveryAddress}</span>
                        </div>
                        <div className="pod-print-detail-row">
                          <span className="pod-print-detail-label">Signature URL</span>
                          <span className="pod-print-detail-value">{result.signatureUrl}</span>
                        </div>
                        <div className="pod-print-detail-row">
                          <span className="pod-print-detail-label">Proof of Delivery Images</span>
                          <span className="pod-print-detail-value">{result.podImages}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={handleCloseImageModal}>
          <div className="image-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="image-modal-header">
              <h3>{modalImageTitle}</h3>
              <button className="image-modal-close" onClick={handleCloseImageModal}>✕</button>
            </div>
            <div className="image-modal-body">
              <img src={modalImageUrl} alt={modalImageTitle} className="modal-image" />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TrackPackage;
