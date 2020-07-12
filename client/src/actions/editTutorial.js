import saveStates from '../enums/saveStates';
import axios from 'axios';
import { message } from 'antd';
import { stringifyTutorialContent } from '../utils/tutorial';

export const SET_TUTORIAL = 'SET_TUTORIAL';
export const ADD_PAGE_GROUP = 'ADD_PAGE_GROUP';
export const ADD_PAGE = 'ADD_PAGE';
export const ADD_SUBPAGE = 'ADD_SUBPAGE';
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';
export const SET_CURRENT_PAGE_CONTENT = 'SET_CURRENT_PAGE_CONTENT';
export const RESET = 'RESET';
export const SET_SAVE_STATE = 'SET_SAVE_STATE';
export const SET_NAME = 'SET_NAME';
export const SET_DEPLOYED = 'SET_DEPLOYED';

export const SET_CONTENT = 'SET_CONTENT';

// -- Thunks --
export function saveTutorial(onSuccess = null, onError = null) {
  return (dispatch, getState) => {
    const tutorial = getState().editTutorial.tutorial;
    dispatch(setSaveState(saveStates.SAVING));
    axios
      .put(
        `/api/admin/tutorials/${tutorial.slug}`,
        stringifyTutorialContent(tutorial),
      )
      .then(
        () => {
          dispatch(setSaveState(saveStates.SAVED));
          if (onSuccess) {
            onSuccess();
          }
        },
        (error) => {
          console.error(error);
          message.error('Failed to save');
          dispatch(setSaveState(saveStates.MODIFIED));
          if (onError) {
            onError();
          }
        },
      );
  };
}

// -- Actions --
export function setTutorial(tutorial) {
  return {
    type: SET_TUTORIAL,
    tutorial,
  };
}
export function addPageGroup() {
  return {
    type: ADD_PAGE_GROUP,
  };
}
export function addPage() {
  return {
    type: ADD_PAGE,
  };
}
export function addSubpage(page) {
  // Convenience
  return {
    type: ADD_SUBPAGE,
  };
}
export function setCurrentPath(path) {
  return {
    type: SET_CURRENT_PATH,
    path,
  };
}
export function setCurrentPageContent(content) {
  return {
    type: SET_CURRENT_PAGE_CONTENT,
    content,
  };
}
export function reset() {
  return {
    type: RESET,
  };
}
export function setSaveState(state) {
  return {
    type: SET_SAVE_STATE,
    state,
  };
}
export function setName(name) {
  return {
    type: SET_NAME,
    name,
  };
}
export function setDeployed(deployed) {
  return {
    type: SET_DEPLOYED,
    deployed,
  };
}

export function setTest(content) {
  return {
    type: 'test',
    content,
  };
}

export function setContent(content, path) {
  return {
    type: SET_CONTENT,
    content,
    path,
  };
}
