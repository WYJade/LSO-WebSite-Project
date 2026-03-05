import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types/models';
import './Sidebar.css';

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  submenu?: SubMenuItem[];
}

interface SidebarProps {
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());

  const menuItems: MenuItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      path: '/overview',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
        </svg>
      ),
      submenu: [
        { id: 'track', label: 'Track Shipments', path: '/tracking' },
        { id: 'create', label: 'Create Shipment', path: '/ship-with-account' },
        { id: 'schedule', label: 'Schedule Pickup', path: '/schedule-pickup' },
        { id: 'manage', label: 'Manage Pickup', path: '/cancel-pickup' },
        { id: 'rate', label: 'Rate', path: '/calculate-rates' },
        { id: 'preferences', label: 'Your Preferences', path: '/preferences' },
      ],
    },
    {
      id: 'claim',
      label: 'Claim',
      path: '/claim',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'admin',
      label: 'Admin',
      path: '/admin',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'address-book',
      label: 'Address book',
      path: '/address-book',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10-4h2v6h-2zm-6 0h4v2h-4z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'report',
      label: 'Report',
      path: '/reports',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'billing',
      label: 'Billing',
      path: '/billing',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  // Auto-expand parent menu if current route is a submenu item
  useEffect(() => {
    const currentPath = location.pathname;
    const newExpandedMenus = new Set<string>();

    menuItems.forEach((menuItem) => {
      if (menuItem.submenu) {
        const isSubmenuActive = menuItem.submenu.some(
          (subItem) => subItem.path === currentPath
        );
        if (isSubmenuActive) {
          newExpandedMenus.add(menuItem.id);
        }
      }
    });

    setExpandedMenus(newExpandedMenus);
  }, [location.pathname]);

  const handleMenuClick = (menuItem: MenuItem) => {
    if (menuItem.submenu) {
      // Toggle submenu expansion
      setExpandedMenus((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(menuItem.id)) {
          newSet.delete(menuItem.id);
        } else {
          newSet.add(menuItem.id);
        }
        return newSet;
      });
    } else {
      // Navigate to page
      navigate(menuItem.path);
    }
  };

  const handleSubmenuClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const isMenuActive = (menuItem: MenuItem): boolean => {
    if (menuItem.path === location.pathname) {
      return true;
    }
    if (menuItem.submenu) {
      return menuItem.submenu.some((subItem) => subItem.path === location.pathname);
    }
    return false;
  };

  return (
    <nav className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-content">
        {menuItems.map((menuItem) => (
          <div key={menuItem.id} className="sidebar-menu-item">
            <button
              className={`sidebar-menu-button ${
                isMenuActive(menuItem) ? 'active' : ''
              } ${expandedMenus.has(menuItem.id) ? 'expanded' : ''}`}
              onClick={() => handleMenuClick(menuItem)}
              aria-expanded={menuItem.submenu ? expandedMenus.has(menuItem.id) : undefined}
              aria-current={isActive(menuItem.path) ? 'page' : undefined}
            >
              {menuItem.icon && <span className="menu-icon">{menuItem.icon}</span>}
              <span className="menu-label">{menuItem.label}</span>
              {menuItem.submenu && (
                <span className={`expand-icon ${expandedMenus.has(menuItem.id) ? 'expanded' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>

            {menuItem.submenu && expandedMenus.has(menuItem.id) && (
              <div className="sidebar-submenu" role="navigation" aria-label={`${menuItem.label} submenu`}>
                {menuItem.submenu.map((subItem) => (
                  <button
                    key={subItem.id}
                    className={`sidebar-submenu-button ${
                      isActive(subItem.path) ? 'active' : ''
                    }`}
                    onClick={() => handleSubmenuClick(subItem.path)}
                    aria-current={isActive(subItem.path) ? 'page' : undefined}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
