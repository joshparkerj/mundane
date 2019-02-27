import React from 'react';
import DropDownWeek from '../DropDownWeek/DropDownWeek';

function SectionTypeContainer({ hc, bt, ac, nav, sdd }) {
  return (
    <div className='section-type-container'>
      <span onClick={hc}>{bt}</span>
      <span className='assignmentCounter'>{ac}</span>
      {sdd ? (<DropDownWeek nav={nav} />) : (null)}
    </div>
  );
}

export default SectionTypeContainer;
