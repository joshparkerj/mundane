import React from 'react';
import './market-footer.scss';

function MarketFooter() {
  return (
    <div className="footer-container">
      <div className="footer-logo" />
      <div className="footer-info">
        <div>All Rights Reserved</div>
        <div>&copy; moonday.com</div>
        <div>+1 888.568.9898</div>
      </div>
      <div className="social-icons">
        <div><span><i className="fab fa-pinterest-p" /></span></div>
        <div><span><i className="fab fa-twitter" /></span></div>
        <div><span><i className="fab fa-linkedin-in" /></span></div>
        <div><span><i className="fab fa-facebook-f" /></span></div>
        <div><span><i className="fab fa-youtube" /></span></div>
        <div><span><i className="fab fa-instagram" /></span></div>
      </div>
    </div>
  );
}

export default MarketFooter;
