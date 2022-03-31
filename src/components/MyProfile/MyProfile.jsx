import React, { useState } from 'react';
import { NavLink, Routes as Switch, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Personal from './components/Personal';
import Password from './components/Password';
import { setPic } from '../../redux/actions';

import './MyProfile.scss';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};

const MyProfile = function MyProfile({ setPic: setPicFunc, user }) {
  const [username, setUsername] = useState('');
  const [url, setUrl] = useState('');

  const handleClickUrl = (close) => {
    setPicFunc({ pic: url });
    close();
  };

  return (
    <div className="content">
      <div className="user_profile_container">
        <div className="user_profile">
          <section className="user_profile_top_container">
            <div className="user_middle_container">
              <div className="user_inner_container user_profile_top st_current">
                <Popup
                  className="popup_wrapper"
                  trigger={(
                    <div className="hover_wrapper">
                      <div className="profile-image-component">
                        <img className="profile-image-hover" src={user.pic} alt="" />
                        <div className="change_picture_hover">
                          <i className="fas fa-user-plus" />
                          <div className="change-picture-text">Change profile picture</div>
                        </div>
                      </div>
                    </div>
                  )}
                  modal
                  contentStyle={contentStyle}
                >
                  {(close) => (
                    <div className="picture_edit_form">
                      <button type="button" className="close" onClick={close}>&times;</button>
                      <div className="header"> Change picture</div>
                      <br />
                      <div className="ui input">
                        <input type="text" id="title_input" name="url" placeholder="enter a url" value={url} onChange={({ target }) => setUrl(target.value)} />
                      </div>
                      <button type="submit" className="save_url_btn" onClick={() => handleClickUrl(close)}>Save</button>
                      <br />
                      <button type="button" className="header2" onClick={() => {}}>
                        {' '}
                        Remove picture
                        <br />
                        <i className="fas fa-trash-alt" />
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
            <Popup
              trigger={(
                <div className="tooltipProfileWrapper">
                  <div className="tooltip">
                    <span className="tooltiptext">Edit user name</span>
                    <span className="edit_username_component">
                      <div className="userName">{user.name}</div>
                    </span>
                  </div>
                </div>
              )}
              modal
              contentStyle={contentStyle}
            >
              {(close) => (
                <div className="edit_form">
                  <button type="button" className="close" onClick={close}>&times;</button>
                  <div className="header"> Change username</div>
                  <br />
                  <div className="ui input">
                    <input type="text" id="username_input" name="username" value={username} onChange={({ target }) => setUsername(target.value)} />
                  </div>
                  <br />
                  <div className="save-title-btn">
                    <button type="submit" className="save" onClick={() => {}}>Save</button>
                  </div>
                </div>
              )}
            </Popup>
            <ul className="list_tabs">
              <NavLink to="/dashboard/profile/personal-info" activeClassName="is-selected">
                <li>Personal Info</li>
              </NavLink>
              <NavLink to="/dashboard/profile/password" activeClassName="is-selected">
                <li>Password</li>
              </NavLink>
            </ul>
          </section>
          <section className="user_profile_bottom_container">
            <Switch>
              { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
              <Route path="/dashboard/profile/personal-info" element={<Personal user={user} />} />
              <Route path="/dashboard/profile/password" element={<Password />} />
            </Switch>
          </section>
        </div>
      </div>
    </div>
  );
};

MyProfile.propTypes = {
  setPic: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    pic: PropTypes.string,
  }).isRequired,
};

export default connect(null, { setPic })(MyProfile);
