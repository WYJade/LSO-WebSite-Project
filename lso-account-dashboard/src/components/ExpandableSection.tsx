import React, { useState } from 'react';
import './ExpandableSection.css';

interface ExpandableSectionProps {
  title: string;
  icon?: React.ReactNode;
  optionsLink?: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  icon,
  optionsLink,
  children,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="expandable-section">
      <div className="expandable-header">
        <div className="expandable-title">
          {icon && <span className="section-icon">{icon}</span>}
          <h2>{title}</h2>
        </div>
        <div className="expandable-controls">
          {optionsLink && (
            <button className="options-link">{optionsLink}</button>
          )}
          <button
            className="expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="expandable-content">{children}</div>
      )}
    </div>
  );
};

export default ExpandableSection;
