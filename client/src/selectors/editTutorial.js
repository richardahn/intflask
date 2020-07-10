import { createSelector } from 'reselect';

// -- Input-Selectors --
const getCurrentTopicIndex = (state) => state.editCourse.currentTopicIndex;
const getCurrentPageIndex = (state) => state.editCourse.currentPageIndex;
const getCourse = (state) => state.editCourse.course;

// -- Selectors --
export const getPage = createSelector(
  [getCourse, getCurrentTopicIndex, getCurrentPageIndex],
  (course, currentTopicIndex, currentPageIndex) => {
    if (course != null) {
      if (currentPageIndex != null) {
        return course.data.children[currentTopicIndex].children[
          currentPageIndex
        ];
      } else if (currentTopicIndex != null) {
        return course.data.children[currentTopicIndex];
      } else {
        return course.data.main;
      }
    }
    return null;
  },
);
