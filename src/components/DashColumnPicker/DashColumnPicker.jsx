import React from 'react';
import './dash-column-picker.scss';
import DayPicker from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import axios from 'axios';
import PropTypes from 'prop-types';

// Note: used this regex to replace ColumnModalButtons:
// eslint-disable-next-line max-len
// <div\n\s+className="column-modal-button ([^"]+)"\n\s+onClick=\{([^\}]+)\}\n\s+>\n\s+([^\n]+)\n\s+</div>
// <ColumnModalButton className="$1" eventHandler={$2} text="$3" />

const ColumnModalButton = function ColumnModalButton({ className, eventHandler, text }) {
  return <div tabIndex="-1" role="button" className={`column-modal-button ${className}`} onClick={eventHandler} onKeyPress={eventHandler}>{text}</div>;
};

const DashColumnPicker = function DashColumnPicker({
  cellID, modalType, dropdownChange, item, selectedDay, selected, id, handleDayClick,
}) {
  const onEnterTime = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      axios.put('/api/task/time_est', { taskID: cellID, time_est: value });
    }
  };

  const modalTypes = (mt) => {
    switch (mt) {
      case 'priority':
        return (
          <div
            className="priority-container"
          >
            <ColumnModalButton className="high-priority" eventHandler={(e) => dropdownChange(modalType, cellID, 'high-priority', 'High', e)} text="High" />
            <ColumnModalButton className="medium-priority" eventHandler={() => dropdownChange(modalType, cellID, 'medium-priority', 'Medium')} text="Medium" />
            <ColumnModalButton className="low-priority" eventHandler={() => dropdownChange(modalType, cellID, 'low-priority', 'Low')} text="Low" />
          </div>
        );
      case 'status':
        return (
          <div
            className="status-container"
          >
            <ColumnModalButton className="done-status" eventHandler={() => dropdownChange(modalType, cellID, 'done-status', 'Done')} text="Done" />
            <ColumnModalButton className="in-progress-status" eventHandler={() => dropdownChange(modalType, cellID, 'in-progress-status', 'In Progress')} text="In Progress" />
            <ColumnModalButton className="on-hold-status" eventHandler={() => dropdownChange(modalType, cellID, 'on-hold-status', 'On Hold')} text="On Hold" />
          </div>
        );
      case 'start_date':
      case 'end_date':
        return (
          <div
            className="date-container"
          >
            <DayPicker
              selectedDays={selectedDay}
              onDayClick={(a, b) => handleDayClick(a, b, modalType, cellID)}
            />
          </div>
        );
      case 'time_est':
        return (
          <div className="time-est-wrapper">
            <input
              className="time-est-input"
              onKeyDown={onEnterTime}
              type="number"
              min="0"
              placeholder={item.time_est}
            />
            <div>h</div>
          </div>
        );
      case 'owner':
      case 'person':
        return '';
      default:
        return '';
    }
  };

  return (
    <div>
      {modalType === 'status' || modalType === 'priority' || modalType === 'end_date' ? (
        <div
          id={id}
          className={`column-modal-container ${selected ? '' : 'hidden'}`}
        >
          {modalTypes(modalType)}
        </div>
      ) : null}
      {modalType === 'time_est' ? (
        <div
          id={id}
          className={`${selected ? '' : 'hidden'}`}
        >
          {modalTypes(modalType)}
        </div>
      ) : null}
    </div>
  );
};

ColumnModalButton.propTypes = {
  className: PropTypes.string.isRequired,
  eventHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

DashColumnPicker.propTypes = {
  cellID: PropTypes.string.isRequired,
  modalType: PropTypes.oneOf(['priority', 'status', 'start_date', 'end_date', 'time_est', 'owner', 'person']).isRequired,
  dropdownChange: PropTypes.func.isRequired,
  item: PropTypes.shape({
    time_est: PropTypes.string,
  }).isRequired,
  selectedDay: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
};

export default DashColumnPicker;
