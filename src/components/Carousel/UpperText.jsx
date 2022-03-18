import React from 'react';
import './carousel.scss';
import PropTypes from 'prop-types';

import slides from './slides';

function UpperText({ currentIndex }) {
  const { upperText, color } = slides[currentIndex];
  return (
    <div className="upper-text-container">
      <span><h1>A new way to manage your&nbsp;</h1></span>
      <span style={{ color }}><h1>{upperText}</h1></span>
    </div>
  );
}

UpperText.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export default UpperText;
