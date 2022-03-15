import React from 'react';
import './market-fact-card.scss';
import Slide from 'react-reveal/Slide';

export default function MarketFactCard({
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
}
