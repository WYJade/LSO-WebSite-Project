import React from 'react';
import ExpandableSection from '../components/ExpandableSection';
import TrackingSection from '../components/TrackingSection';
import ShipmentActions from '../components/ShipmentActions';
import { Shipment } from '../types/models';
import './OverviewTab.css';

interface OverviewTabProps {
  shipments: Shipment[];
  onTrackPackage: () => void;
  onViewReports: () => void;
  onViewProofOfDelivery: () => void;
  onShipmentOptionSelect: (option: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({
  shipments,
  onTrackPackage,
  onViewReports,
  onViewProofOfDelivery,
  onShipmentOptionSelect,
}) => {
  return (
    <div className="overview-tab" data-testid="overview-tab">
      {/* Your Tracking Section */}
      <ExpandableSection
        title="Your Tracking"
        icon="📦"
        optionsLink="Your tracking options"
        defaultExpanded={true}
      >
        <TrackingSection
          onTrackPackage={onTrackPackage}
          onViewReports={onViewReports}
          onViewProofOfDelivery={onViewProofOfDelivery}
        />
      </ExpandableSection>

      {/* Your Shipments Section */}
      <ExpandableSection
        title="Your shipments"
        icon="📮"
        optionsLink="Your shipment options"
        defaultExpanded={true}
      >
        <ShipmentActions
          onCreateAirbill={() => console.log('Create airbill')}
          onSchedulePickup={() => console.log('Schedule pickup')}
          onCancelPickup={() => console.log('Cancel pickup')}
        />
      </ExpandableSection>

      {/* Your Claims Section */}
      <ExpandableSection
        title="Your claims"
        icon="📋"
        optionsLink="Your claim options"
        defaultExpanded={false}
      >
        <div className="claims-content">
          <p className="empty-message">No active claims at this time.</p>
          <button className="primary-button">Submit a New Claim</button>
        </div>
      </ExpandableSection>

      {/* Your Preferences Section */}
      <ExpandableSection
        title="Your Preferences"
        icon="⚙️"
        defaultExpanded={false}
      >
        <div className="preferences-content">
          <div className="preference-links">
            <a href="/preferences/payment" className="preference-link">
              Payment details
            </a>
            <a href="/preferences/settings" className="preference-link">
              User settings
            </a>
          </div>
        </div>
      </ExpandableSection>
    </div>
  );
};

export default OverviewTab;
