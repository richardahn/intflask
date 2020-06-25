import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import errors from './errors';
import editCourse from './editCourse';

export default combineReducers({
  auth,
  errors,
  editCourse,
});
