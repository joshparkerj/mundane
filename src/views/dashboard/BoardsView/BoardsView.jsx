import React, { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './boards-view.scss';
import Boards from '../../../components/Boards/Boards';

const BoardsView = function BoardsView() {
  const [boards, setBoards] = useState([]);
  const [groupedByTeams, setGroupedByTeams] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');

  useEffect(() => {
    axios.get('/api/board')
      .then((serverBoards) => {
        setGroupedByTeams(_.groupBy(serverBoards.data, (board) => board.team_id));
        setBoards(serverBoards.data);
      });
  }, []);

  const handleNewBoard = ({ key, target: { value } }, teamID) => {
    if (key === 'Enter') {
      setNewGroupName('');
      axios.post('/api/board', { name: value, teamID })
        .then((serverBoards) => {
          const newBoards = [...boards, serverBoards.data];
          setGroupedByTeams(_.groupBy(newBoards, (board) => board.team_id));
          setBoards(newBoards);
        });
    }
  };

  return (
    <div>
      <div className="board-view-container">
        {Object.entries(groupedByTeams).map(([teamID, boardsGroupedByTeams]) => (
          <div className="grouped-teams" key={teamID}>
            <div className="title-container">
              <div className="team-title">{boardsGroupedByTeams[0].team}</div>
              <div className="add-board">
                <input
                  value={newGroupName}
                  onChange={({ target }) => setNewGroupName(target.value)}
                  placeholder="+ Add new group"
                  onKeyDown={(e) => handleNewBoard(e, teamID)}
                />
                <button type="submit" onClick={(e) => handleNewBoard(e, teamID)}>+</button>
              </div>
            </div>
            <div>
              {boardsGroupedByTeams.map(({ id, name }) => (
                <Boards board_id={id} board_name={name} key={id} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsView;
