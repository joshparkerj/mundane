import React from 'react';
import PropTypes from 'prop-types';

import './market-support-card.scss';

const SupportCard = function SupportCard({ picture, title, className }) {
  return (
    <div className="card-container">
      <div
        className={`support-pic ${className}`}
        style={{
          backgroundImage: `url(${picture})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <h3>{title}</h3>
    </div>
  );
};

SupportCard.propTypes = {
  picture: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default SupportCard;
