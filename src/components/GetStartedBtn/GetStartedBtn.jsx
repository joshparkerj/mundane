import React from 'react';
import PropTypes from 'prop-types';

import './get-started-btn.scss';

const GetStartedBtn = function GetStartedBtn({ changeNav }) {
  return (
    <div>
      <button type="button" onClick={changeNav} className="get-started">Get Started</button>
    </div>
  );
};

GetStartedBtn.propTypes = {
  changeNav: PropTypes.func.isRequired,
};

export default GetStartedBtn;
