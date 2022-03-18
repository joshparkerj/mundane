import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './DashboardLanding.scss';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import DashSideNav from '../../components/Dash-side-nav/DashSideNav';
import Inbox from '../../components/Inbox/Inbox';
import MyWeek from '../../components/MyWeek/MyWeek';
import TopNavBar from '../../components/TopNavBar/TopNavBar';
import Admin from '../../components/Admin/Admin';
import { dashboard } from '../../redux/actions';
import BoardsView from './BoardsView/BoardsView';
import MyProfile from '../../components/MyProfile/MyProfile';
import NewRegisterView from './NewRegister/NewRegisterView';

const DashboardLanding = function DashboardLanding({
  dashboard: dash, dashboards, history, user,
}) {
  const [count, setCount] = useState('');

  const getCount = () => {
    const numbers = dashboards.comments.filter((comment) => !comment.read).length;
    setCount(numbers);
  };

  useEffect(() => {
    dash().then(() => { getCount(); });
  }, []);

  const changeViews = (e) => {
    const name = e.target.title;
    history.push(`/dashboard/${name}`);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="topNavBar">
        <TopNavBar page={history.push} user={user.user} />
      </div>
      <DashSideNav
        changeViews={changeViews}
        dashboard={dashboards}
        count={count}
      />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="dashboard-inner-wrapper"
      >
        <Route path="/dashboard/Inbox" render={() => <Inbox />} />
        <Route path="/dashboard/myweek" render={() => <MyWeek />} />
        <Route path="/dashboard/boards" render={() => <BoardsView />} />
        <Route path="/dashboard/Admin" render={({ history: hist }) => <Admin history={hist} />} />
        <Route path="/dashboard/profile" render={() => <MyProfile user={user.user} />} />
        <Route path="/dashboard/join-team" component={NewRegisterView} />
        <Route path="/dashboard/" render={() => <BoardsView />} />
      </AnimatedSwitch>
    </div>
  );
};

DashboardLanding.propTypes = {
  dashboard: PropTypes.func.isRequired,
  dashboards: PropTypes.arrayOf().isRequired,
  history: PropTypes.shape().isRequired,
  user: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      pic: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  dashboards: state.user.dashboard,
});

export default connect(mapStateToProps, { dashboard })(DashboardLanding);
