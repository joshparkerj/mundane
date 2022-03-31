import React from 'react';
import PropTypes from 'prop-types';

import './DropMenu.scss';

const DropDown = function DropDown({ nav }) {
  const subMenu = nav.map((e) => (
    <li className="drop-down-nav" key={e.name}>
      <span className="board-name">
        {e.name}
      </span>
    </li>
  ));

  return (
    <div className="drop-nav-wrapper">
      <ul className="submenu">
        {subMenu}
      </ul>
    </div>
  );
};

DropDown.propTypes = {
  nav: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

export default DropDown;
