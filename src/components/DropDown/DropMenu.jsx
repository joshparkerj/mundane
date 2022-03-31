import React, { useState } from 'react';
import './DropMenu.scss';

const DropMenu = function DropMenu() {
  const [hidden, setHidden] = useState(true);
  const nav = [{ board: 'one', number: 1 }, { board: 'two', number: 2 }, { board: 'three', number: 3 }];

  const handleClick = () => {
    setHidden(!hidden);
  };

  const subMenu = nav.map((i) => (
    <li><span>{i.board}</span></li>
  ));
  return (
    <div className="drop-nav-wrapper">
      <ul>
        <li>
          <button type="button" onClick={handleClick}>Testing</button>
          {hidden ? (
            <ul className="submenu">
              {subMenu}
            </ul>
          ) : (null)}
        </li>
        <li><span>test </span></li>
      </ul>
    </div>
  );
};

export default DropMenu;
