import React from 'react';

import { render } from '@testing-library/react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../redux/store';

import '../../match-media.mock';

import DashboardLanding from './DashboardLanding';

it('dashboard landing renders without crashing', () => {
  const dispatchUser = () => (dispatch) => dispatch({
    type: 'USER',
    payload: { data: { user: { name: 'Doug', pic: 'handsome' } } },
  });

  const dispatchDashboard = () => (dispatch) => dispatch({
    type: 'BOARDS',
    payload: {
      boards: [
        {
          private: true,
          name: 'board alpha',
          id: 'alpha',
        },
      ],
    },
  });

  const DispatchStuff = connect(null, {
    dispatchUser,
    dispatchDashboard,
  })(({ children, dispatchUser: du, dispatchDashboard: dd }) => {
    du();
    dd();
    return <div className="dispatch-user">{children}</div>;
  });

  render(
    <Provider store={store}>
      <Router>
        <DispatchStuff>
          <DashboardLanding />
        </DispatchStuff>
      </Router>
    </Provider>,
  );

  expect(true).toBe(true);
});
