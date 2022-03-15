import React, { Component } from 'react';
import './DropMenu.scss';

class DropDown extends Component {
  handleClick = () => {
    this.setState({ hidden: !this.state.hidden });
  };

  render() {
    const subMenu = this.props.nav.map((e, i) => (
      <li className="drop-down-nav" key={i}>
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
  }
}

export default DropDown;
