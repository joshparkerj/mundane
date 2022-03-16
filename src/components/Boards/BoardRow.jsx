import React from 'react';
import PropTypes from 'prop-types';
import BoardCell from './BoardCell';

const columns = ['name',
  'owner',
  'priority',
  'status',
  'end_date',
  'person',
  'time_est'];

const BoardRow = function BoardRow({
  item, ti, uc, checkSelected, selectedDay,
}) {
  const columnMapper = function columnMapper(e, i) {
    return (
      <BoardCell
        key={i}
        col_name={e}
        item={item}
        ti={i + 7 * ti}
        uc={uc(item.id)}
        values=""
        s={checkSelected(item.id, e)}
        selectedDay={selectedDay}
      />
    );
  };

  return (
    <tr className="board-row">
      {columns.map(columnMapper)}
    </tr>
  );
};

BoardRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  ti: PropTypes.number.isRequired,
  uc: PropTypes.func.isRequired,
  checkSelected: PropTypes.func.isRequired,
  selectedDay: PropTypes.string.isRequired,
};

export default BoardRow;
