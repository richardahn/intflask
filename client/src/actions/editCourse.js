import saveStates from '../enums/saveStates';
import axios from 'axios';
import { message } from 'antd';
import { stringifyCourseContent } from '../utils/course';

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
export const SET_NAME = 'SET_NAME';

// -- Thunks --
export function saveCourse() {
  return (dispatch, getState) => {
    const course = getState().editCourse.course;
    dispatch(setSaveState(saveStates.SAVING));
    axios
      .put(`/api/admin/courses/${course.slug}`, stringifyCourseContent(course))
      .then(
        () => dispatch(setSaveState(saveStates.SAVED)),
        (error) => {
          console.error(error);
          message.error('Failed to save');
          dispatch(setSaveState(saveStates.MODIFIED));
        },
      );
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
export function setName(name) {
  return {
    type: SET_NAME,
    name,
  };
}
