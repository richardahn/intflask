import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import errors from './errors';
import editor from './editor';

export default combineReducers({
  auth,
  errors,
  editor,
});
