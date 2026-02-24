import React from 'react';
import { WelcomeHeaderProps } from '../types/components';
import './WelcomeHeader.css';

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  illustrationUrl,
}) => {
  return (
    <div className="welcome-header" data-testid="welcome-header">
      <div className="welcome-content">
        <div className="welcome-text">
          <h1 className="page-title" data-testid="page-title">
            MY ACCOUNT
          </h1>
          <h2 className="greeting" data-testid="greeting">
            HI {userName.toUpperCase()},
          </h2>
        </div>
        <div className="welcome-illustration">
          {illustrationUrl ? (
            <img
              src={illustrationUrl}
              alt="Welcome illustration"
              data-testid="illustration"
            />
          ) : (
            <div className="default-illustration" data-testid="illustration">
              <svg width="200" height="150" viewBox="0 0 200 150">
                <circle cx="100" cy="50" r="30" fill="#4A90E2" />
                <rect x="70" y="85" width="60" height="50" fill="#4A90E2" />
                <circle cx="140" cy="100" r="20" fill="#7ED321" />
                <rect x="30" y="110" width="40" height="30" fill="#F5A623" />
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
