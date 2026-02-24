import React from 'react';
import { TabNavigationProps } from '../types/components';
import './TabNavigation.css';

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTabId,
  onTabChange,
}) => {
  return (
    <div className="tab-navigation" data-testid="tab-navigation">
      <div className="tab-container">
        <div className="tab-list">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${
                activeTabId === tab.id ? 'active' : ''
              }`}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content" data-testid="tab-content">
        {tabs.find((tab) => tab.id === activeTabId)?.content}
      </div>
    </div>
  );
};

export default TabNavigation;
