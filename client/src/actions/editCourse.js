import saveStates from '../enums/saveStates';

export const SET_COURSE = 'SET_COURSE';
export const ADD_TOPIC_GROUP = 'ADD_TOPIC_GROUP';
export const ADD_TOPIC = 'ADD_TOPIC';
export const ADD_PAGE = 'ADD_PAGE';
export const SET_TOPIC_INDEX = 'SET_TOPIC_INDEX';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const SET_MAIN = 'SET_MAIN';
export const SET_CONTENT = 'SET_CONTENT';
export const RESET = 'RESET';
export const SET_SAVE_STATE = 'SET_SAVE_STATE';

// -- Thunks --
export function saveCourse(course) {
  return (dispatch, getState) => {
    console.log('begining to save course...');
    dispatch(setSaveState(saveStates.SAVING));
    setTimeout(() => {
      console.log('saved course!');
      dispatch(setSaveState(saveStates.SAVED));
    }, 1000);
  };
}

// -- Actions --
export function setCourse(course) {
  return {
    type: SET_COURSE,
    course,
  };
}
export function addTopicGroup() {
  return {
    type: ADD_TOPIC_GROUP,
  };
}
export function addTopic() {
  return {
    type: ADD_TOPIC,
  };
}
export function addPage() {
  return {
    type: ADD_PAGE,
  };
}
export function setTopicIndex(index) {
  return {
    type: SET_TOPIC_INDEX,
    index,
  };
}
export function setPageIndex(index) {
  return {
    type: SET_PAGE_INDEX,
    index,
  };
}
export function setMain() {
  return {
    type: SET_MAIN,
  };
}
export function setContent(content, topicIndex, pageIndex) {
  return {
    type: SET_CONTENT,
    content,
    topicIndex,
    pageIndex,
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
