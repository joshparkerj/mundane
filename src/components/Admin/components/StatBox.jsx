import React from 'react';
import './StatBox.scss';
import PropTypes from 'prop-types';

const StatBox = function StatBox({
  boxClass, title, col1number, col1title, col2number, col2title, col3number, col3title,
}) {
  return (
    <div>
      <div className={boxClass}>
        <div className="box-title">
          <h2>{title}</h2>
          <h2>Last 60 days</h2>
        </div>
        <div className="col-container">
          <div className="box-col">
            <h1>{col1number}</h1>
            <h3>{col1title}</h3>
          </div>
          <div className="box-col">
            <h1>{col2number}</h1>
            <h3>{col2title}</h3>
          </div>
          <div className="box-col">
            <h1>{col3number}</h1>
            <h3>{col3title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

StatBox.propTypes = {
  boxClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  col1number: PropTypes.string.isRequired,
  col1title: PropTypes.string.isRequired,
  col2number: PropTypes.string.isRequired,
  col2title: PropTypes.string.isRequired,
  col3number: PropTypes.string.isRequired,
  col3title: PropTypes.string.isRequired,
};

export default StatBox;
