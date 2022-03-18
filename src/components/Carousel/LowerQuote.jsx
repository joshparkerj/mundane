import React from 'react';
import './carousel.scss';
import PropTypes from 'prop-types';

import slides from './slides';

function LowerQuote({ currentIndex }) {
  const { quote, quoteName, quoteImage } = slides[currentIndex];
  return (
    <div>
      <div className="quote-main-container">
        <div
          className="quote-image"
          style={{ backgroundImage: `url(${quoteImage})` }}
        />
        <div className="lower-quote-container">
          <div className="lower-quote">{quote}</div>
          <div className="quote-name">{quoteName}</div>
        </div>
      </div>
    </div>
  );
}

LowerQuote.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export default LowerQuote;
