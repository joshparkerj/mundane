import axios from 'axios';
import { push } from 'connected-react-router';

export const login = (user) => (dispatch) => {
  axios.post('/api/auth/login', user)
    .then((serverUser) => {
      dispatch({
        type: 'USER',
        payload: serverUser,
      });
      if (serverUser) {
        dispatch(push('/dashboard'));
      }
    });
};

export const logout = () => (dispatch) => {
  axios.get('/api/auth/logout')
    .then(() => {
      dispatch({
        type: 'LOGOUT',
        payload: null,
      });
      dispatch(push('/'));
    });
};

export const getSession = () => (dispatch) => {
  axios.get('/api/auth/session ')
    .then((user) => {
      dispatch({
        type: 'USER',
        payload: user,
      });
      if (!user) {
        dispatch(push('/marketing'));
      } else {
        dispatch(push('/dashboard'));
      }
    });
};

// user must have name, email and password
export const register = (user) => (dispatch) => {
  axios.post('/api/auth/register', user)
    .then((serverUser) => {
      dispatch({
        type: 'USER',
        payload: serverUser,
      });
      dispatch(push('/dashboard/join-team'));
    });
};

export const dashboard = () => (dispatch) => axios.get('/api/dashboard')
  .then((board) => {
    dispatch({
      type: 'BOARDS',
      payload: board.data,
    });
  });

export const setPhone = (number) => (dispatch) => {
  axios.put('/api/user/phone', number)
    .then(() => {
      dispatch({
        type: 'PHONE',
        payload: number.phone,
      });
    });
};

export const setEmail = (email) => (dispatch) => {
  axios.put('/api/user/email', email)
    .then(() => {
      dispatch({
        type: 'EMAIL',
        payload: email.email,
      });
    });
};

export const setTitle = (title) => (dispatch) => {
  axios.put('/api/user/title', title)
    .then(() => {
      dispatch({
        type: 'TITLE',
        payload: title.title,
      });
    });
};

export const setPic = (pic) => (dispatch) => {
  axios.put('/api/user/pic', pic)
    .then(() => {
      dispatch({
        type: 'PIC',
        payload: pic.pic,
      });
    });
};
