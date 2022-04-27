import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const TeamMember = function TeamMember({ teamMember }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [approvedTeamMember, setApprovedTeamMember] = useState(false);
  const [buttonText, setButtonText] = useState('Approve');

  const approveUser = () => {
    setButtonDisabled(true);
    setButtonText('one moment');
    axios.post('/api/team/approval', {
      teamID: teamMember.team_id,
      memberID: teamMember.id,
    }).then(() => {
      setApprovedTeamMember(true);
    });
  };

  if (teamMember.approved || approvedTeamMember) {
    return (
      <tr>
        <td>
          {teamMember.name}
          {' '}
          {teamMember.manager ? '(manager)' : ''}
        </td>
        <td>{teamMember.email}</td>
        <td>{teamMember.phone}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{teamMember.name}</td>
      <td>
        This user has requested to join your team.
      </td>
      <td>
        <button onClick={approveUser} disabled={buttonDisabled} type="button">
          {buttonText}
        </button>
      </td>
    </tr>
  );
};

TeamMember.propTypes = {
  teamMember: PropTypes.exact({
    team_id: PropTypes.string,
    id: PropTypes.string,
    approved: PropTypes.bool,
    name: PropTypes.string,
    manager: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

export default TeamMember;
