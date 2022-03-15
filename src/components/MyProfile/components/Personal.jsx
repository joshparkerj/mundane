import React, { Component } from 'react';
import './Personal.scss';
import Popup from 'reactjs-popup';
import { connect } from 'react-redux';
import { setPhone, setTitle, setEmail } from '../../../redux/actions';

const contentStyle = {
  maxWidth: '600px',
  width: '90%',
};

class Personal extends Component {
  state = {
    email: '',
    phone: '',
    title: '',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = (close, propsMethod, name) => {
    this.props[propsMethod]({ [name]: this.state[name] });
    close();
  };

  render() {
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
                  {this.props.user.title}
                </span>
                <i className="fas fa-pencil-alt" />
              </div>
)}
            modal
            contentStyle={contentStyle}
          >
            {(close) => (
              <div className="edit_form">
                <div className="close" onClick={close}>&times;</div>
                <div className="header"> Title</div>
                <br />
                <div className="ui input">
                  <input type="text" id="title_input" name="title" value={this.state.title} onChange={this.handleChange} />
                </div>
                <br />
                <div className="save-title-btn">
                  <button className="save" onClick={() => this.handleClick(close, 'setTitle', 'title')}>Save</button>
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
                  {this.props.user.email}
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
                <div className="close" onClick={close}>&times;</div>
                <div className="header"> Email</div>
                <br />
                <div className="ui input">
                  <input type="text" id="title_input" name="email" value={this.state.email} onChange={this.handleChange} />
                </div>
                <br />
                <div className="save-title-btn">
                  <button className="save" onClick={() => this.handleClick(close, 'setEmail', 'email')}>Save</button>
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
                  {this.props.user.phone}
                </span>
                <i className="fas fa-pencil-alt" />
              </div>
)}
            modal
            contentStyle={contentStyle}
          >
            {(close) => (
              <div className="edit_form">
                <div className="close" onClick={close}>&times;</div>
                <div className="header"> Phone</div>
                <br />
                <div className="ui input">
                  <input type="text" id="title_input" name="phone" value={this.state.phone} onChange={this.handleChange} />
                </div>
                <br />
                <div className="save-title-btn">
                  <button className="save" onClick={() => this.handleClick(close, 'setPhone', 'phone')}>Save</button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    );
  }
}

export default connect(null, { setPhone, setEmail, setTitle })(Personal);
