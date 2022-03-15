import React, { useState } from 'react';
import './new-register-view.scss';
import axios from 'axios';
import { connect } from 'react-redux';

const NewRegisterView = function NewRegisterView() {
  const [searchText, setSearchText] = useState('');
  const [teamsList, setTeamsList] = useState([]);

  const searchOnEnter = ({ key }) => {
    if (key === 'Enter') {
      setSearchText('');
      axios.get(`/api/team/by-name/${searchText}`)
        .then((response) => {
          setTeamsList(response.data);
        });
    }
  };

  const handleJoin = (teamName) => {
    axios.post('/api/team/join-name', { name: teamName });
  };

  return (
    <div className="new-register-container">
      <h1>Join a Team.</h1>
      <input
        value={searchText}
        placeholder="Search here..."
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={searchOnEnter}
      />
      <div className="list-container">
        {teamsList.map((team) => (
          <div className="team-name-container" key={team.id}>
            <div>{team.name}</div>
            <i
              tabIndex="-1"
              role="button"
              className="material-icons"
              onClick={() => handleJoin(team.name)}
              onKeyPress={() => handleJoin(team.name)}
            >
              add_circle_outline
            </i>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(NewRegisterView);
