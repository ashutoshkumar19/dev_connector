import axios from 'axios';
import { setAlert } from './alert.action';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  AVATAR_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
  GET_AVATAR,
  GET_PROFILE,
  GET_NAME,
  NAME_ERROR,
  PROFILE_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { getCurrentProfile } from './profile.action';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/user', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 3000)));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};

// Update avatar
export const updateAvatar = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/avatar', formData, config);

    dispatch({
      type: GET_AVATAR,
      payload: res.data
    });
    dispatch(setAlert('Avatar Updated', 'success'));

    try {
      const res = await axios.get('/api/profile/me');
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: CLEAR_PROFILE });
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: AVATAR_ERROR
    });
  }
};

// Edit name
export const editName = newNameData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/profile/name', newNameData, config);

    dispatch({
      type: GET_NAME,
      payload: res.data
    });
    dispatch(setAlert('Name Updated', 'success'));

    try {
      const res = await axios.get('/api/profile/me');
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: CLEAR_PROFILE });
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: NAME_ERROR
    });
  }
};
