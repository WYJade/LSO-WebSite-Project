import React from 'react';
import { TrackingCardProps } from '../types/components';
import './TrackingCard.css';

const TrackingCard: React.FC<TrackingCardProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <div
      className="tracking-card"
      onClick={onClick}
      data-testid="tracking-card"
    >
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <button className="card-button" data-testid="card-button">
        Click Here
      </button>
    </div>
  );
};

export default TrackingCard;
