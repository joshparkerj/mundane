import React, { useState } from 'react';
import './Personal.scss';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPhone, setTitle, setEmail } from '../../../redux/actions';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};

const Personal = function Personal({
  user, setPhone: setDispatchPhone, setTitle: setDispatchTitle, setEmail: setDispatchEmail,
}) {
  const [stateEmail, setStateEmail] = useState('');
  const [statePhone, setStatePhone] = useState('');
  const [stateTitle, setStateTitle] = useState('');

  return (
    <div className="personal_info_container">
      <h2>Overview</h2>
      <div className="profile_edit_container">
        <div className="icon_container">
          <i className="far fa-user" />
        </div>
        <Popup
          trigger={(
            <div className="data_container_popup_edit_link">
              <span className="edit_text_title">
                Title:
                {user.title}
              </span>
              <i className="fas fa-pencil-alt" />
            </div>
          )}
          modal
          contentStyle={contentStyle}
        >
          {(close) => (
            <div className="edit_form">
              <button type="button" className="close" onClick={close}>&times;</button>
              <div className="header"> Title</div>
              <br />
              <div className="ui input">
                <input type="text" id="title_input" name="title" value={stateTitle} onChange={({ target }) => setStateTitle(target.value)} />
              </div>
              <br />
              <div className="save-title-btn">
                <button
                  type="submit"
                  className="save"
                  onClick={() => {
                    setDispatchTitle(stateTitle);
                    close();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="profile_edit_container">
        <div className="icon_container">
          <i className="fas fa-envelope-square" />
        </div>
        <Popup
          trigger={(
            <div className="data_container_popup_edit_link">
              <span className="edit_text_title">
                Email:
                {user.email}
              </span>
              <span className="profile-field-content" />
              <i className="fas fa-pencil-alt" />
            </div>
          )}
          modal
          contentStyle={contentStyle}
        >
          {(close) => (
            <div className="edit_form">
              <button type="button" className="close" onClick={close}>&times;</button>
              <div className="header"> Email</div>
              <br />
              <div className="ui input">
                <input type="text" id="title_input" name="email" value={stateEmail} onChange={({ target }) => setStateEmail(target.value)} />
              </div>
              <br />
              <div className="save-title-btn">
                <button
                  type="submit"
                  className="save"
                  onClick={() => {
                    setDispatchEmail(stateEmail);
                    close();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <div className="profile_edit_container">
        <div className="icon_container">
          <i className="fas fa-phone" />
        </div>
        <Popup
          trigger={(
            <div className="data_container_popup_edit_link">
              <span className="edit_text_title">
                Phone:
                {user.phone}
              </span>
              <i className="fas fa-pencil-alt" />
            </div>
          )}
          modal
          contentStyle={contentStyle}
        >
          {(close) => (
            <div className="edit_form">
              <button type="button" className="close" onClick={close}>&times;</button>
              <div className="header"> Phone</div>
              <br />
              <div className="ui input">
                <input type="text" id="title_input" name="phone" value={statePhone} onChange={({ target }) => setStatePhone(target.value)} />
              </div>
              <br />
              <div className="save-title-btn">
                <button
                  type="submit"
                  className="save"
                  onClick={() => {
                    setDispatchPhone(statePhone);
                    close();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
};

Personal.propTypes = {
  user: PropTypes.shape({
    phone: PropTypes.string,
    email: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  setPhone: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default connect(null, { setPhone, setEmail, setTitle })(Personal);
