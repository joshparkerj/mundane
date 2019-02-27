import React from 'react'
import './DropDownWeek.scss'

function DropDownWeek ({ nav }) {
    const subMenu = nav.map(e => {
      return (
        <li><span>{e.task}</span></li>
      )
    });
    return (
      <div className='drop-nav-wrapper'>
        <ul className='submenu'>
          {subMenu}
        </ul>
      </div>
    );
}

export default DropDownWeek;
