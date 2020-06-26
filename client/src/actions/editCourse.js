import { saveOperations } from '../enums/saveState';

export const SET_COURSE = 'SET_COURSE';
export const ADD_TOPIC_GROUP = 'ADD_TOPIC_GROUP';
export const ADD_TOPIC = 'ADD_TOPIC';
export const ADD_PAGE = 'ADD_PAGE';
export const SET_TOPIC_INDEX = 'SET_TOPIC_INDEX';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const SET_MAIN = 'SET_MAIN';
export const SET_CONTENT = 'SET_CONTENT';
export const RESET = 'RESET';
export const APPLY_SAVE_OPERATION = 'APPLY_SAVE_OPERATION';

// -- Thunks --
export function saveCourse(course) {
  return (dispatch) => {
    console.log('begining to save course...');
    dispatch(applySaveOperation(saveOperations.QUEUE_SAVE));
    setTimeout(() => {
      console.log('saved course!');
      dispatch(applySaveOperation(saveOperations.DEQUEUE_SAVE));
    }, 4000);
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

// Saving state
export function applySaveOperation(operation) {
  return {
    type: APPLY_SAVE_OPERATION,
    operation,
  };
}
