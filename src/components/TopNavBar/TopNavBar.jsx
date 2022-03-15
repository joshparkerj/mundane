import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions';
import './TopNavBar.scss';
import NewTeamButton from '../NewTeam/NewTeamButton';

class TopNavBar extends Component {
  state = {
    profileHidden: false,
  };

  handleClick = () => {
    this.setState({ profileHidden: !this.state.profileHidden });
  };

  handleAdmin = () => {
    this.props.page('/dashboard/admin');
  };

  handleProfile = () => {
    this.props.page('/dashboard/profile');
  };

  searchSite = ({ key, target, target: { value } }) => {
    if (key === 'Enter') {
      target.value = '';
    }
  };

  render() {
    return (
      <div className="navbar-wrapper">
        <div className="logo-tab-wrapper">
          <div className="logo-background">
            <div className="dash-nav-logo" />
          </div>
          <div className="first-three">
            <div className="navbar-tab">
              <span className="text">
                <div className="add-member-span">
                  <div className="dropdown-notifs">
                    <i className="material-icons">notifications_none</i>
                    <div className="dropdown-content">
                      Notifications
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div className="navbar-tab">
              <span className="text">
                <div className="dropdown-people">
                  <i className="material-icons">people_outline</i>
                  <div className="dropdown-button">
                    <NewTeamButton />
                  </div>
                </div>
              </span>
            </div>
            <div className="navbar-tab">
              <div className="container">
                <input
                  type="text"
                  placeholder="Search our site."
                  onKeyDown={this.searchSite}
                />
                <div className="search" />
              </div>
            </div>
          </div>
        </div>
        <div className="last-two">
          <div className="navbar-tab">
            <span className="text">
              <div className="add-member-span">
                <i className="material-icons">add_circle_outline</i>
                <p> Invite Team Members </p>
              </div>
            </span>
          </div>
          <div className="navbar-tab">
            <div onClick={this.handleClick} className={`add-member-span ${this.state.profileHidden ? 'active' : ''}`}>
              <img src={this.props.user.pic} className="topNav-user-pic" alt="" />
              <p className="user-profile-menu"> UserProfile</p>
              {this.state.profileHidden
                ? (
                  <div>
                    <ul className="user-profile-menu-list">
                      <li onClick={this.handleProfile}>Profile</li>
                      <li onClick={this.handleAdmin}>Admin </li>
                      <li>Recycle Bin </li>
                      <li onClick={this.props.logout}>Logout</li>
                    </ul>
                  </div>
                ) : (null)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { logout })(TopNavBar);
