import React from 'react';
import PropTypes from 'prop-types';

import DropDownWeek from '../DropDownWeek/DropDownWeek';

function SectionTypeContainer({
  hc, bt, ac, nav, sdd,
}) {
  return (
    <div className="section-type-container">
      <span tabIndex="-1" role="link" onKeyPress={hc} onClick={hc}>{bt}</span>
      <span className="assignmentCounter">{ac}</span>
      {sdd ? (<DropDownWeek nav={nav} />) : (null)}
    </div>
  );
}

SectionTypeContainer.propTypes = {
  hc: PropTypes.func.isRequired,
  bt: PropTypes.string.isRequired,
  ac: PropTypes.string.isRequired,
  nav: PropTypes.string.isRequired,
  sdd: PropTypes.bool.isRequired,
};

export default SectionTypeContainer;
