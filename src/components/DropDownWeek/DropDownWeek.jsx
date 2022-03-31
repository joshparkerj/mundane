import React from 'react';
import PropTypes from 'prop-types';

import './DropDownWeek.scss';

const DropDownWeek = function DropDownWeek({ nav }) {
  const subMenu = nav.map((e) => (
    <li key={e.task}><span>{e.task}</span></li>
  ));
  return (
    <div className="drop-nav-wrapper">
      <ul className="submenu">
        {subMenu}
      </ul>
    </div>
  );
};

DropDownWeek.propTypes = {
  nav: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string,
  })).isRequired,
};

export default DropDownWeek;
