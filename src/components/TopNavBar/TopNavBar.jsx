import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux/actions';
import './TopNavBar.scss';
import NewTeamButton from '../NewTeam/NewTeamButton';

const TopNavBar = function TopNavBar({ page, user, logout: logoutFunc }) {
  const [profileHidden, setProfileHidden] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  const handleClick = () => {
    setProfileHidden(!profileHidden);
  };

  const handleAdmin = () => {
    page('/dashboard/admin');
  };

  const handleProfile = () => {
    page('/dashboard/profile');
  };

  const searchSite = ({ key }) => {
    if (key === 'Enter') {
      setSearchInputValue('');
    }
  };

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
                value={searchInputValue}
                onChange={({ target }) => setSearchInputValue(target.value)}
                type="text"
                placeholder="Search our site."
                onKeyDown={searchSite}
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
          <div tabIndex="-1" role="switch" aria-checked={profileHidden} onClick={handleClick} onKeyPress={handleClick} className={`add-member-span ${profileHidden ? 'active' : ''}`}>
            <img src={user.pic} className="topNav-user-pic" alt="" />
            <p className="user-profile-menu"> UserProfile</p>
            {profileHidden
              ? (
                <div>
                  <ul className="user-profile-menu-list">
                    <li><button type="button" onClick={handleProfile}>Profile</button></li>
                    <li><button type="button" onClick={handleAdmin}>Admin </button></li>
                    <li>Recycle Bin </li>
                    <li><button type="button" onClick={logoutFunc}>Logout</button></li>
                  </ul>
                </div>
              ) : (null)}
          </div>
        </div>
      </div>
    </div>
  );
};

TopNavBar.propTypes = {
  page: PropTypes.func.isRequired,
  user: PropTypes.shape({
    pic: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(TopNavBar);
