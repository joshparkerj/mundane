import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './Password.scss';

const Password = function Password() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const savePassword = () => {
    const newPass = newPassword;
    const comparePass = confirmNewPassword;
    const passwords = {
      currentPassword,
      newPass: newPassword,
    };
    if (newPass === comparePass) {
      axios.put('/api/auth/password', passwords)
        .then(() => {
          setCurrentPassword('');
          setNewPassword('');
          setConfirmNewPassword('');
        });
    } else {
      toast.error("Passwords don't match");
    }
  };

  return (
    <div className="personal_info_container">
      <h2>Change your password</h2>
      <div>
        <div className="input_container">
          <span className="lable">Current Password</span>
          <input value={currentPassword} name="currentPassword" type="password" className="current_password" onChange={({ target }) => setCurrentPassword(target.value)} />
        </div>
        <div className="input_container">
          <span className="lable">New Password</span>
          <input value={newPassword} name="newPassword" type="password" className="new_password" onChange={({ target }) => setNewPassword(target.value)} />
        </div>
        <div className="input_container">
          <span className="lable">Confirm new Password</span>
          <input value={confirmNewPassword} name="confirmNewPassword" type="password" className="confirm_new_password" onChange={({ target }) => setConfirmNewPassword(target.value)} />
        </div>
      </div>
      <button type="submit" onClick={savePassword} className="save-btn">Save</button>
    </div>
  );
};

export default Password;
