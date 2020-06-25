export const SET_COURSE = 'SET_COURSE';
export const ADD_TOPIC_GROUP = 'ADD_TOPIC_GROUP';
export const ADD_TOPIC = 'ADD_TOPIC';
export const ADD_PAGE = 'ADD_PAGE';
export const SET_TOPIC_INDEX = 'SET_TOPIC_INDEX';
export const SET_PAGE_INDEX = 'SET_PAGE_INDEX';
export const SET_MAIN = 'SET_MAIN';
export const SET_CONTENT = 'SET_CONTENT';
export const RESET = 'RESET';

// -- Thunks --
export function saveCourse(course) {
  return (dispatch) => {
    console.log('saved course!');
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
