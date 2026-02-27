import React, { useState } from 'react';
import './ProofOfDelivery.css';

const ProofOfDelivery: React.FC = () => {
  const [podSearchInput, setPodSearchInput] = useState('');
  const [podResults, setPodResults] = useState<any[]>([]);
  const [podCurrentPage, setPodCurrentPage] = useState(1);
  const [podItemsPerPage, setPodItemsPerPage] = useState(10);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalImageTitle, setModalImageTitle] = useState('');

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
    <div className="proof-of-delivery-page">
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
              <button className="pod-action-btn primary-pod-btn" onClick={() => window.print()}>
                📄 See Print-ready option
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="image-modal-overlay" onClick={handleCloseImageModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="image-modal-header">
              <h3>{modalImageTitle}</h3>
              <button className="image-modal-close" onClick={handleCloseImageModal}>✕</button>
            </div>
            <div className="image-modal-body">
              <img src={modalImageUrl} alt={modalImageTitle} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProofOfDelivery;
