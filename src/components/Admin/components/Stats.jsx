import React from 'react';
import StatBox from './StatBox';
import './StatBox.scss';

function Stats() {
  return (
    <div className="stat-wrapper">
      <StatBox
        boxClass="purple"
        title="Summary"
        col1number="10"
        col1title="Boards updated"
        col2number="14"
        col2title="People posted"
        col3number="9"
        col3title="Updates in boards"
      />
      <div className="empty-box">
        <h1>DATA</h1>
      </div>
      <StatBox
        boxClass="green"
        title="People Activity"
        col1number="3"
        col1title="People joined"
        col2number="3"
        col2title="People contributed"
        col3number="0"
        col3title="invited but didn't join"
      />
      <StatBox
        boxClass="orange"
        title="Boards Created"
        col1number="5"
        col1title="Main Boards"
        col2number="2"
        col2title="Shared boards"
        col3number="0"
        col3title="Private boards"
      />
    </div>
  );
}

export default Stats;
