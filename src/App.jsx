import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import history from './history';
import './App.css';
import DashboardLanding from './views/dashboard/DashboardLanding';
import Marketing from './views/marketing/Marketing';
import { getSession } from './redux/actions';

class App extends Component {
  componentDidMount() {
    const { getSession: getSesh } = this.props;
    getSesh();
  }

  render() {
    const { userExists } = this.props;

    return (
      <div className="App">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/marketing" component={Marketing} />
            {
              userExists && (
                <Switch>
                  <Route path="/dashboard" component={DashboardLanding} />
                </Switch>
              )
            }
            <Route component={Marketing} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

App.propTypes = {
  getSession: PropTypes.func.isRequired,
  userExists: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userExists: !!state.user.user,
});

export default connect(mapStateToProps, { getSession })(App);
