import React, { useState } from 'react';
import { NavigationBarProps, MenuItem } from '../types/components';
import './NavigationBar.css';

const NavigationBar: React.FC<NavigationBarProps> = ({
  currentUser,
  onLogoClick,
  onMenuItemClick,
  onSearch,
  onLanguageChange,
}) => {
  const [showShippingDropdown, setShowShippingDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showAboutDropdown, setShowAboutDropdown] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'shipping', label: 'SHIPPING', href: '/shipping' },
    { id: 'services', label: 'SERVICES', href: '/services' },
    { id: 'tracking', label: 'TRACKING', href: '/tracking' },
    { id: 'about', label: 'ABOUT US', href: '/about' },
  ];

  return (
    <nav className="navigation-bar" data-testid="navigation-bar">
      <div className="nav-container">
        <div className="nav-left">
          <div className="logo" onClick={onLogoClick} data-testid="logo">
            <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
              {/* Top ellipse - dark blue, elongated and tilted */}
              <ellipse cx="35" cy="15" rx="35" ry="11" fill="#0052CC" transform="rotate(-25 35 15)"/>
              {/* Middle ellipse - medium blue, horizontal */}
              <ellipse cx="40" cy="30" rx="38" ry="13" fill="#1976D2" transform="rotate(5 40 30)"/>
              {/* Bottom circle - light cyan blue */}
              <circle cx="35" cy="47" r="13" fill="#00BCD4"/>
              
              {/* LSO Text */}
              <text x="75" y="42" fontFamily="Arial, sans-serif" fontSize="36" fontWeight="bold" fill="#000000">LSO</text>
            </svg>
          </div>
        </div>

        <div className="nav-center">
          <ul className="menu-items">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className="menu-item-wrapper"
                onMouseEnter={() => {
                  if (item.id === 'shipping') setShowShippingDropdown(true);
                  if (item.id === 'services') setShowServicesDropdown(true);
                  if (item.id === 'about') setShowAboutDropdown(true);
                }}
                onMouseLeave={() => {
                  if (item.id === 'shipping') setShowShippingDropdown(false);
                  if (item.id === 'services') setShowServicesDropdown(false);
                  if (item.id === 'about') setShowAboutDropdown(false);
                }}
              >
                <button
                  onClick={() => onMenuItemClick(item)}
                  className="menu-item"
                  data-testid={`menu-${item.id}`}
                >
                  {item.label} {(item.id === 'shipping' || item.id === 'services' || item.id === 'about') && '▼'}
                </button>
                
                {item.id === 'shipping' && showShippingDropdown && (
                  <div className="shipping-mega-menu">
                    <div className="mega-menu-container">
                      <div className="mega-menu-sidebar">
                        <div className="sidebar-header">
                          <span className="sidebar-icon">📦</span>
                          <span className="sidebar-title">All Shipping</span>
                          <span className="dropdown-arrow">▼</span>
                        </div>
                        <ul className="sidebar-menu">
                          <li><a href="/ship-now">Ship now</a></li>
                          <li><a href="/ship-with-account">Ship with account</a></li>
                          <li><a href="/schedule-pickup">Schedule pickup</a></li>
                          <li><a href="/calculate-rates">Calculate rates/quote</a></li>
                          <li><a href="/delivery-options">Delivery Options</a></li>
                          <li><a href="/customer-cookie">Customer Cookie Program</a></li>
                          <li><a href="/view-all-shipping">View all shipping</a></li>
                        </ul>
                      </div>
                      <div className="mega-menu-content">
                        <div className="content-card">
                          <img 
                            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80" 
                            alt="Shipping" 
                            className="content-image"
                          />
                          <h3 className="content-title">Lone Star Overnight Announces Annual GRI And Peak Surcharge 2023</h3>
                          <a href="/learn-more" className="content-link">
                            FIND OUT MORE →
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="mega-menu-footer">
                      <span>TRY SEARCH BY WHERE YOU PLAN TO MAKE YOUR SHIPMENTS</span>
                      <span className="footer-arrow">→</span>
                    </div>
                  </div>
                )}
                
                {item.id === 'services' && showServicesDropdown && (
                  <div className="dropdown-menu">
                    <a href="/shipping-rates">LSO Shipping Rates</a>
                    <a href="/schedule-pickup">Schedule an LSO Pickup</a>
                    <a href="/about">About Us</a>
                  </div>
                )}
                
                {item.id === 'about' && showAboutDropdown && (
                  <div className="dropdown-menu">
                    <a href="/about">About Us</a>
                    <a href="/cookie-program">Cookie Program</a>
                    <a href="/submit-claim">Submit a Claim</a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-right">
          <div className="user-account">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="8" r="4" stroke="#666" strokeWidth="2"/>
              <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="user-name">{currentUser?.firstName || 'ANDY'} ▼</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
