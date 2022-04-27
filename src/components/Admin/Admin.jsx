import React from 'react';
import { Route } from 'react-router-dom';
import $ from 'jquery';
import { AnimatedSwitch } from 'react-router-transition';

import General from './components/General';
import Team from './components/Team';
import Stats from './components/Stats';

import history from '../../history';

import './Admin.scss';

const Admin = function Admin() {
  const handleClick = (name) => {
    history.push(`/dashboard/admin/${name}`);
    $('.admin-nav').removeClass('active');
    if (window.location.pathname === `/dashboard/admin/${name}`) {
      $(`#${name}`).addClass('active');
    }
  };

  const items = [
    { name: 'General', logo: 'fas fa-cog' },
    { name: 'My-Team', logo: 'fas fa-users' },
    { name: 'Stats', logo: 'far fa-chart-bar' },
  ];

  return (
    <div className="admin-main-container">
      <div className="admin-nav-container-left">
        <h1 className="admin-title">Admin</h1>
        <div className="admin-nav-list-container">
          <div className="admin-nav-wrapper">
            {items.map(({ name, logo }) => (
              <div tabIndex="-1" role="link" key={name} id={name} className="admin-nav" onKeyPress={() => handleClick(name)} onClick={() => handleClick(name)}>
                <i className={logo} />
                <h2>{name}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route path="/dashboard/Admin/My-Team" render={() => <Team />} />
        <Route path="/dashboard/Admin/Stats" render={() => <Stats />} />
        <Route path="/dashboard/Admin/" render={() => <General />} />
      </AnimatedSwitch>
    </div>
  );
};

export default Admin;
