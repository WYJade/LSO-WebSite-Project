import React from 'react';
import TrackingCard from './TrackingCard';
import './TrackingSection.css';

interface TrackingSectionProps {
  onTrackPackage: () => void;
  onViewReports: () => void;
  onViewProofOfDelivery: () => void;
}

const TrackingSection: React.FC<TrackingSectionProps> = ({
  onTrackPackage,
  onViewReports,
  onViewProofOfDelivery,
}) => {
  const TruckIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
      <rect x="10" y="40" width="50" height="30" rx="2" />
      <rect x="60" y="30" width="30" height="40" rx="2" />
      <circle cx="25" cy="75" r="8" />
      <circle cx="75" cy="75" r="8" />
      <rect x="20" y="45" width="15" height="10" fill="white" />
    </svg>
  );

  const BoxIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
      <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" />
      <path d="M50 10 L50 50 M10 30 L50 50 M90 30 L50 50" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );

  const MagnifyingGlassIcon = () => (
    <svg viewBox="0 0 100 100" fill="currentColor">
      <circle cx="40" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="4" />
      <line x1="58" y1="58" x2="85" y2="85" stroke="currentColor" strokeWidth="4" />
      <rect x="60" y="70" width="15" height="25" fill="white" />
      <text x="65" y="85" fontSize="12" fill="currentColor">📄</text>
    </svg>
  );

  return (
    <div className="tracking-section" data-testid="tracking-section">
      <div className="tracking-cards-container">
        <TrackingCard
          title="Track a Package"
          icon={<TruckIcon />}
          onClick={onTrackPackage}
        />
        <TrackingCard
          title="Reports"
          icon={<BoxIcon />}
          onClick={onViewReports}
        />
        <TrackingCard
          title="Proof of Delivery"
          icon={<MagnifyingGlassIcon />}
          onClick={onViewProofOfDelivery}
        />
      </div>
    </div>
  );
};

export default TrackingSection;
