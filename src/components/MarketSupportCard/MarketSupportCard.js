import React from 'react';
import './market-support-card.scss';

function SupportCard({ picture, title, className }) {
  return (
    <div className="card-container">
      <div
        className={`support-pic ${className}`}
        style={{
          backgroundImage: `url(${picture})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      >
      </div>
      <h3>{title}</h3>
    </div>
  );
}

export default SupportCard;
