import React, { useState } from 'react';
import './NewTeamButton.scss';
import axios from 'axios';

const NewTeamButton = function NewTeamButton() {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/team', { name: teamName })
      .then(() => {
        setTeamName('');
      });

    setTeamName('Thank you!');
  };

  return (
    <form
      className="new-team-button"
      onSubmit={handleSubmit}
    >
      <label htmlFor="team-name">
        Create a new team.
        <input
          name="team-name"
          id="team-name"
          value={teamName}
          onChange={({ target }) => setTeamName(target.value)}
          placeholder="Enter team name here"
        />
      </label>
    </form>
  );
};

export default NewTeamButton;
