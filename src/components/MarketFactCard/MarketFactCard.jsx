import React from 'react';
import PropTypes from 'prop-types';

import Slide from 'react-reveal/Slide';

import './market-fact-card.scss';

const MarketFactCard = function MarketFactCard({
  text, percent, logo, quote, name, color,
}) {
  return (
    <div className="fact-card-container">
      <Slide left>
        <div className={`fact-details-wrapper ${color}`}>
          <span id="percentage">
            {' '}
            {percent}
            %
            {' '}
          </span>
          {' '}
          <span id="fact-text">
            {' '}
            {text}
            {' '}
          </span>
        </div>
      </Slide>
      <Slide right>
        <div className="fact-quote-wrapper">
          <div id="logo">
            {logo}
          </div>
          <div className="quote-wrapper">
            <p id="quote">
              &ldquo;
              {quote}
              &rdquo;
            </p>
            <div id="quote-name">
              {name}
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
};

MarketFactCard.propTypes = {
  text: PropTypes.string.isRequired,
  percent: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default MarketFactCard;
