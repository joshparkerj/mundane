import React, { Component } from 'react';
import { connect } from 'react-redux';
import './StatBox.scss';
import _ from 'lodash';
import TeamMember from './TeamMember';

class Team extends Component {
  rosterMapper = (e, i) => (
    <TeamMember teamMember={e} key={i} />
  );

  teamMapper = (teamName, i) => {
    const { props: { dashboard: { roster } }, rosterMapper } = this;
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

  render() {
    const { props: { dashboard: { roster } }, teamMapper } = this;
    return (
      <div>
        {roster ? _.uniq(roster.map((e) => e.team_name)).map(teamMapper) : ''}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dashboard: state.user.dashboard,
});

export default connect(mapStateToProps)(Team);
