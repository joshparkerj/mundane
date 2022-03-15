import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../../../components/Carousel/Carousel';
import LowerQuote from '../../../components/Carousel/LowerQuote';
import UpperText from '../../../components/Carousel/UpperText';
import GetStartedBtn from '../../../components/GetStartedBtn/GetStartedBtn';

const MarketingLanding = function MarketingLanding({ toggle }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="market-land-container">
      <div className="market-top-container">
        <UpperText currentIndex={currentIndex} />
      </div>
      <Carousel handleChange={setCurrentIndex} />
      <LowerQuote currentIndex={currentIndex} />
      <div className="workflow-container">
        <div className="workflow-text">
          <span><h1>Workflow made simple.</h1></span>
          <span style={{ color: 'blue' }}><h1>Try it for free.</h1></span>
        </div>
        <GetStartedBtn changeNav={toggle} />
      </div>
    </div>
  );
};

MarketingLanding.propTypes = {
  toggle: PropTypes.bool.isRequired,
};

export default MarketingLanding;
