import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import DashColumnPicker from '../DashColumnPicker/DashColumnPicker';

const BoardCell = function BoardCell({
  item, col_name: colNameProp, ti, uc, s, selectedDay,
}) {
  const [values, setValues] = useState(null);

  const onDropdownChange = (colName, id, _, dropdownValues) => {
    setValues(dropdownValues);
    document.activeElement.blur();
    axios.put(`/api/task/${colName}`, { taskID: id, [colName]: dropdownValues });
  };

  const handleDayClick = (day, { selected }) => {
    setValues(selected ? undefined : day.toLocaleDateString());
    document.activeElement.blur();
    axios.put('/api/task/end_date', { taskID: item.id, end_date: day.toLocaleDateString() });
  };

  const returnClassName = function returnClassName(v, colName) {
    return colName === 'time_est' ? 'time-est-input' : {
      status: {
        Done: 'done-status',
        'In Progress': 'in-progress-status',
        'On Hold': 'on-hold-status',
      },
      priority: {
        High: 'high-priority',
        Medium: 'medium-priority',
        Low: 'low-priority',
      },
      time_est: {},
    }[colName][v] || '';
  };

  return (
    <td className={`board-cell ${returnClassName(values || item[colNameProp], colNameProp)} ${colNameProp === 'name' ? 'left-align' : ''}`}>
      <button
        tabIndex={ti}
        type="button"
        onClick={() => uc(colNameProp, item.name)}
      >
        {colNameProp === 'time_est' ? '' : values || item[colNameProp]}
        <DashColumnPicker
          id={`col-${item.id}-${colNameProp}`}
          modalType={colNameProp}
          selected={s}
          dropdownChange={onDropdownChange}
          cellID={item.id}
          handleDayClick={handleDayClick}
          selectedDay={selectedDay}
          item={item}
        />
      </button>
    </td>
  );
};

BoardCell.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  col_name: PropTypes.string.isRequired,
  ti: PropTypes.string.isRequired,
  uc: PropTypes.func.isRequired,
  s: PropTypes.bool.isRequired,
  selectedDay: PropTypes.string.isRequired,
};

export default BoardCell;
