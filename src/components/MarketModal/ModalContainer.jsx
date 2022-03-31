import React from 'react';
import PropTypes from 'prop-types';

const ModalContainer = function ModalContainer({
  modalOpacity, position, changeState, handleLogin, handleMouseDown, handleRegister, changeToggle,
}) {
  return (
    <div
      className="modal-container"
      style={{
        opacity: modalOpacity,
        display: modalOpacity === 0 ? 'none' : undefined,
      }}
    >
      <div className="inner-modal-container">
        <div
          className="motion-container"
          style={{
            transform: position !== 1 && position !== 0 ? `translateX(${(50 - position * 100) / 2}%)` : undefined,
          }}
        >
          <div
            className="sign-in-container"
            style={{
              opacity: 1 - position,
              display: position === 1 ? 'none' : undefined,
            }}
          >
            <div className="register-inputs-container">
              <h1>Sign in.</h1>
              <div className="inputs">
                <input
                  placeholder="Enter username"
                  name="username"
                  onChange={changeState}
                />
                <input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  onChange={changeState}
                />
              </div>
              <div>
                <button type="submit" onClick={handleLogin}>
                  Submit
                </button>
                <div>
                  <span>Not a member?</span>
                  <button
                    type="button"
                    className="register-button"
                    onClick={handleMouseDown}
                  >
                    Register now.
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="register-container"
            style={{
              opacity: position,
              display: position === 0 ? 'none' : undefined,
            }}
          >
            <div className="register-inputs-container">
              <h1>Register now.</h1>
              <div>
                <input
                  placeholder="Username"
                  name="registerUsername"
                  onChange={changeState}
                />
                <input
                  placeholder="Email address"
                  name="registerEmail"
                  onChange={changeState}
                />
                <input
                  placeholder="Create password"
                  type="password"
                  name="registerPassword"
                  onChange={changeState}
                />
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleRegister}
                >
                  Submit
                </button>
                <div>
                  <span>Already a member?</span>
                  <button
                    type="button"
                    className="sign-in-button"
                    onClick={handleMouseDown}
                  >
                    Sign in.
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="exit-modal"
        onClick={changeToggle}
      >
        {' '}
        close
      </button>
    </div>
  );
};

ModalContainer.propTypes = {
  modalOpacity: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  changeState: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleMouseDown: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  changeToggle: PropTypes.func.isRequired,
};

export default ModalContainer;
