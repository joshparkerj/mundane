import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentSlideIn from '../CommentSlideIn/CommentSlideIn';
import BoardRow from './BoardRow';
import './boards.scss';

const Boards = function Boards({ board_id: boardID, board_name: boardName }) {
  const [selectedRow, setSelectedRow] = useState(-1);
  const [selectedCol, setSelectedCol] = useState('');
  const [items, setItems] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [selectedDay, setSelectedDay] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [addRowName, setAddRowName] = useState('');

  useEffect(() => {
    // add axios request to create row
    axios.get(`/api/task/by-board/${boardID}`)
      .then(({ data }) => setItems(data));

    // WTF
    document.addEventListener('click', (e) => e.target.focus());
  }, []);

  const checkSelected = (row, col) => row === selectedRow && col === selectedCol;

  const taskNameChange = () => {
    console.log(selectedRow, taskName);
    axios.put('/api/task/name', { taskID: selectedRow, name: taskName });
    setItems(items.map((item) => (item.id === selectedRow ? { ...item, name: taskName } : item)));
  };

  const openCommentSlideIn = (id) => {
    axios.get(`/api/comment/on-task/${id}`)
      .then((response) => {
        setCommentList(response.data.reverse());
      });

    setOpen(true);
    setCommentList([]);
  };

  const updateCell = (row) => (col, task) => {
    if (col === 'name') {
      openCommentSlideIn(row);
    }

    setSelectedRow(row);
    setSelectedCol(col);
    setTaskName(task);
  };

  const handleSlideInClose = () => {
    setOpen(false);
    setCommentList([]);
  };

  const addRowOnEnter = ({ key, target: { value } }) => {
    if (key === 'Enter') {
      setAddRowName('');
      axios.post('/api/task', {
        boardID,
        name: value,
      }).then((task) => {
        setItems([...items, task.data]);
      });
    }
  };

  const updateCommentList = (newComment) => {
    setCommentList([newComment, ...commentList]);
  };

  const itemMapper = (item, index) => (
    <BoardRow
      item={item}
      key={index}
      ti={index}
      checkSelected={checkSelected}
      uc={updateCell}
      selectedDay={selectedDay}
    />
  );

  return (
    <div className="board-wrapper">
      <CommentSlideIn
        open={open}
        taskID={selectedRow}
        commentList={commentList}
        updateComment={updateCommentList}
        taskName={taskName}
        setTaskName={setTaskName}
        closePanel={handleSlideInClose}
        updateTaskName={taskNameChange}
        commentText={commentText}
        setCommentText={setCommentText}
      />
      <table>
        <thead>
          <tr>
            <th style={{ width: '400px' }}>
              <h4>{boardName}</h4>
            </th>
            <th>Owner</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Person</th>
            <th>Time Est.</th>
          </tr>
        </thead>
        <tbody>
          {items.map(itemMapper)}
        </tbody>
      </table>
      <input
        value={addRowName}
        onChange={({ target }) => setAddRowName(target.value)}
        className="add-row-input"
        onKeyDown={addRowOnEnter}
        placeholder="+ Add a task"
      />
    </div>
  );
};

export default Boards;
