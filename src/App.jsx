import React, { useEffect } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import history from './history';
import './App.css';
import DashboardLanding from './views/dashboard/DashboardLanding';
import Marketing from './views/marketing/Marketing';
import { getSession } from './redux/actions';

const App = function App({ userExists, getSession: getSesh }) {
  useEffect(() => {
    getSesh();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/marketing" render={() => <Marketing />} />
          {
            userExists && (
              <Switch>
                <Route path="/dashboard" render={() => <DashboardLanding />} />
              </Switch>
            )
          }
          <Route path="*" render={() => <Marketing />} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

App.propTypes = {
  getSession: PropTypes.func.isRequired,
  userExists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userExists: !!state.user.user,
});

export default connect(mapStateToProps, { getSession })(App);
