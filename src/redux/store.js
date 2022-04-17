import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducer from './reducer';
import history from '../history';

// https://github.com/supasate/connected-react-router/blob/master/src/reducer.js
const connectRouter = (hist) => {
  const fromJS = (value) => value;
  const injectQuery = (location) => {
    if (location && location.query) {
      return location;
    }

    const searchQuery = location && location.search;

    if (typeof searchQuery !== 'string' || searchQuery.length === 0) {
      return {
        ...location,
        query: {},
      };
    }

    const search = searchQuery.substring(1);
    const queries = search.split('&');
    const query = queries.reduce((acc, currentQuery) => {
      const [queryKey, queryValue] = currentQuery.split('=');
      return {
        ...acc,
        [queryKey]: queryValue,
      };
    }, {});

    return {
      ...location,
      query,
    };
  };

  const initialRouterState = fromJS({
    location: injectQuery(hist.location),
    action: hist.action,
  });

  const merge = (state, payload) => ({ ...state, ...payload });
  return (state = initialRouterState, { type, payload } = {}) => {
    if (type === '@@router/LOCATION_CHANGE') {
      const { location, action, isFirstRendering } = payload;
      return isFirstRendering
        ? state
        : merge(state, { location: fromJS(injectQuery(location)), action });
    }

    return state;
  };
};

// https://github.com/supasate/connected-react-router/blob/master/src/middleware.js
// eslint-disable-next-line no-unused-vars
const routerMiddleware = (hist) => (_) => (next) => (action) => {
  if (action.type !== '@@router/CALL_HISTORY_METHOD') {
    return next(action);
  }

  const { payload: { method, args } } = action;
  hist[method](...args);
  return undefined;
};

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: reducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      routerMiddleware(history),
    ),
  ),
);
