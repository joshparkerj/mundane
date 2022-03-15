import React from 'react';
import { connect } from 'react-redux';
import './StatBox.scss';
import _ from 'lodash';
import PropTypes from 'prop-types';

import TeamMember from './TeamMember';

const Team = function Team({ dashboard }) {
  const { roster } = dashboard;

  const rosterMapper = function rosterMapper(e, i) {
    return <TeamMember teamMember={e} key={i} />;
  };

  const teamMapper = function teamMapper(teamName, i) {
    return (
      <div className="team" key={i}>
        <h1>
          {teamName}
          {' '}
          {roster.some((e) => e.team_name === teamName && e.manager) ? '' : '(Your team)'}
        </h1>
        <table className="team-table-wrapper">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {roster ? roster.filter((e) => e.team_name === teamName).map(rosterMapper) : ''}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      {roster ? _.uniq(roster.map((e) => e.team_name)).map(teamMapper) : ''}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.user.dashboard,
});

Team.propTypes = {
  dashboard: PropTypes.shape({
    roster: PropTypes.arrayOf(PropTypes.shape({
      team_name: PropTypes.string,
      manager: PropTypes.bool,
    })),
  }).isRequired,
};

export default connect(mapStateToProps)(Team);
