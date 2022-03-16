import React, { useState } from 'react';
import './DashSideNav.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DropDown from '../DropDown/DropDown';

const DashSideNav = function DashSideNav({ changeViews, dashboard, count }) {
  const [hidden, setHidden] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);

  const getComponent = (e) => {
    changeViews(e);
  };

  const boardCount = (p) => {
    if (dashboard && dashboard.boards) {
      return dashboard.boards
        .filter((e) => (p ? e.private : !e.private)).length;
    }
    return 0;
  };

  const boardDisplay = (p) => {
    if (dashboard && dashboard.boards) {
      return dashboard.boards
        .filter((e) => (p ? e.private : !e.private)).map((e) => ({
          name: e.name,
          board: e.name,
          number: e.id,
        }));
    }

    return null;
  };

  const showMenu = (e) => {
    setHidden(!hidden);
    changeViews(e);
  };

  return (
    <div className="leftpane-container" id="leftpane-container">
      <div className="leftpane-component">
        <a href="www.monday.com">
          <i className="../../assets/monday-logo-final.png" id="leftpane-logo" />
        </a>
      </div>
      <div className="leftpane-inbox-component">
        <div tabIndex="-1" role="link" className="inbox-wrap" title="Inbox" onClick={getComponent} onKeyPress={getComponent}>
          <div title="Inbox" className="title-side">Inbox</div>
          <div className="inboxCounter">
            {' '}
            {count}
          </div>
        </div>
      </div>
      <div>
        <div tabIndex="-1" role="link" className="leftpane-week-component" title="MyWeek" onClick={getComponent} onKeyPress={showMenu}>
          <span title="MyWeek" className="title-side">My Week</span>
        </div>
      </div>
      <div className="leftpane-boards-list-wrapper" id="leftpane-boards-list-wrapper">
        <div>
          <div className="leftpane-boards-public-list-component">
            <span tabIndex="-1" role="link" className="link-wrapper router" id="link-container" onClick={showMenu} onKeyPress={showMenu}>
              <i className="material-icons title-side">menu</i>
              <span className="title-side">Boards public</span>
              <span className="title-side">
                {' '}
                (
                {boardCount()}
                )
              </span>
            </span>
            <div className="drop-menu">
              {
                hidden
                  ? (
                    <DropDown nav={boardDisplay()} />
                  )
                  : (null)
              }

            </div>
          </div>
        </div>
      </div>
      <div className="leftpane-boards-list-wrapper" id="leftpane-boards-list-wrapper">
        <div>
          <div className="leftpane-boards-private-list-component" id="leftpane-boards-list-component">
            <span tabIndex="-1" aria-checked={showPrivate} role="switch" className="link-wrapper router" id="link-container" onClick={() => setShowPrivate(!showPrivate)} onKeyPress={() => setShowPrivate(!showPrivate)}>
              <i className="material-icons title-side">menu</i>
              <span className="title-side">Boards private</span>
              <span className="title-side">
                {' '}
                (
                {boardCount(true)}
                )
              </span>
            </span>
            {
              showPrivate
                ? (
                  <div className="drop-menu">
                    <DropDown nav={boardDisplay(true)} />
                  </div>
                )
                : (null)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

DashSideNav.propTypes = {
  changeViews: PropTypes.func.isRequired,
  dashboard: PropTypes.shape({
    boards: PropTypes.arrayOf(PropTypes.shape({
      private: PropTypes.bool,
      name: PropTypes.string,
      id: PropTypes.string,
    })),
  }).isRequired,
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(DashSideNav);
