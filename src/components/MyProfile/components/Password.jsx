import React, { Component } from 'react';
import './Password.scss';
import axios from 'axios';

class Password extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  handleChange = (e) => {
    const key = e.target.name;
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  savePassword = () => {
    const newPass = this.state.newPassword;
    const comparePass = this.state.confirmNewPassword;
    const passwords = {
      currentPassword: this.state.currentPassword,
      newPass: this.state.newPassword,
    };
    if (newPass === comparePass) {
      axios.put('/api/auth/password', passwords)
        .then((res) => {
          console.log(res);
          this.setState({
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        });
    } else alert("Passwords don't match");
  };

  render() {
    return (
      <div className="personal_info_container">
        <h2>Change your password</h2>
        <div>
          <div className="input_container">
            <span className="lable">Current Password</span>
            <input value={this.state.currentPassword} name="currentPassword" type="password" className="current_password" onChange={this.handleChange} />
          </div>
          <div className="input_container">
            <span className="lable">New Password</span>
            <input value={this.state.newPassword} name="newPassword" type="password" className="new_password" onChange={this.handleChange} />
          </div>
          <div className="input_container">
            <span className="lable">Confirm new Password</span>
            <input value={this.state.confirmNewPassword} name="confirmNewPassword" type="password" className="confirm_new_password" onChange={this.handleChange} />
          </div>
        </div>
        <button onClick={this.savePassword} className="save-btn">Save</button>
      </div>
    );
  }
}

export default Password;
