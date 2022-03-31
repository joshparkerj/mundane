import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HamburgerMenu from 'react-hamburger-menu';
import PropTypes from 'prop-types';

import { login, register } from '../../redux/actions';
import MarketModal from '../MarketModal/MarketModal';

import './mark-top-nav.scss';

const MarketTopNav = function MarketTopNav({
  toggle, display, register: handleRegister, login: handleLogin,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = ({ target: { value, name } }) => {
    const changeMap = {
      username: setUsername,
      password: setPassword,
      registerEmail: setRegisterEmail,
      registerPassword: setRegisterPassword,
      registerUsername: setRegisterUsername,
    };

    changeMap[name](value);
  };

  const handleClickLogin = () => {
    const user = {
      username,
      password,
    };

    handleLogin(user);
  };

  const handleClickRegister = () => {
    const user = {
      username: registerUsername,
      password: registerPassword,
      email: registerEmail,
    };

    handleRegister(user);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    $(() => {
      const nav = $('.nav-container');
      $(window).scroll(() => {
        const scroll = $(window).scrollTop();
        if (scroll >= 10) {
          nav.removeClass('nav-container').addClass('fixed-nav');
        } else {
          nav.removeClass('fixed-nav').addClass('nav-container');
        }
      });
    });
  }, []);

  return (
    <div className="nav-container">
      <Link className="nav-logo" to="/" />
      <div className="nav-right">
        <div
          id="nav-product"
          className="menu"
        >
          Product
        </div>
        <Link
          to="why-us"
          id="nav-why"
          className="menu"
        >
          Why Us
        </Link>
        <button
          type="button"
          onClick={toggle}
          className="menu"
        >
          Log in
        </button>
        <div className="mobile-menu">
          <HamburgerMenu
            isOpen={open}
            menuClicked={handleClick}
          />
        </div>
        {open ? (
          <div className="mobile-dropdown">
            <div className="inner-dropdown">
              <div
                id="nav-product"
                className="mobile-items"
              >
                Product
              </div>
              <Link
                to="why-us"
                id="nav-why"
                className="mobile-items"
              >
                Why Us
              </Link>
              <button
                type="button"
                onClick={toggle}
                className="mobile-items"
                id="nav-login"
              >
                Log in
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <MarketModal
        changeToggle={toggle}
        changeState={handleChange}
        handleLogin={handleClickLogin}
        handleRegister={handleClickRegister}
        display={display}
      />
    </div>
  );
};

MarketTopNav.propTypes = {
  toggle: PropTypes.func.isRequired,
  display: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { login, register })(MarketTopNav);
