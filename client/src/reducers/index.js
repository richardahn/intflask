import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import errors from './errors';
import editTutorial from './editTutorial';

export default combineReducers({
  auth,
  errors,
  editTutorial,
});
