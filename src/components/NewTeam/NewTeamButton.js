import React, { Component } from 'react';
import './NewTeamButton.scss';
import axios from 'axios';

class NewTeamButton extends Component {
  state = {
    teamName: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/team', { name: this.state.teamName })
      .then(() => {
        this.setState({ teamName: '' });
      });
    this.setState({ teamName: 'Thank you!' });
  };

  render() {
    return (
      <form
        className="new-team-button"
        onSubmit={this.handleSubmit}
      >
        <label>Create a new team.</label>
        <input
          name="teamName"
          value={this.state.teamName}
          onChange={this.handleChange}
          placeholder="Enter team name here"
        />
      </form>
    );
  }
}

export default NewTeamButton;
