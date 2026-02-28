import React from 'react';
import './MainNavigation.css';

export type NavigationModule = 'overview' | 'claim' | 'admin' | 'address-book' | 'report' | 'billing';

interface MainNavigationProps {
  activeModule: NavigationModule;
  onModuleChange: (module: NavigationModule) => void;
}

const MainNavigation: React.FC<MainNavigationProps> = ({
  activeModule,
  onModuleChange,
}) => {
  const modules: { id: NavigationModule; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'claim', label: 'Claim' },
    { id: 'admin', label: 'Admin' },
    { id: 'address-book', label: 'Address book' },
    { id: 'report', label: 'Report' },
    { id: 'billing', label: 'Billing' },
  ];

  return (
    <div className="main-navigation" data-testid="main-navigation">
      <div className="main-nav-container">
        {modules.map((module) => (
          <button
            key={module.id}
            className={`main-nav-button ${
              activeModule === module.id ? 'active' : ''
            }`}
            onClick={() => onModuleChange(module.id)}
            data-testid={`nav-module-${module.id}`}
          >
            {module.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainNavigation;
