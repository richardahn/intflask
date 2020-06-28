import {
  SET_COURSE,
  ADD_TOPIC_GROUP,
  ADD_TOPIC,
  ADD_PAGE,
  SET_TOPIC_INDEX,
  SET_PAGE_INDEX,
  SET_MAIN,
  SET_CONTENT,
  RESET,
  SET_SAVE_STATE,
} from '../actions/editCourse';
import saveStates, { getNextState } from '../enums/saveStates';

const initialState = {
  saveState: null,
  currentTopicIndex: null,
  currentPageIndex: null,
  course: null,
};

function generateNewEditorContent() {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
}

function generateNewTopicGroup() {
  return {
    name: 'New Topic',
    content: generateNewEditorContent(),
    children: [],
  };
}
function generateNewTopic() {
  return { name: 'New Topic', content: generateNewEditorContent() };
}
function generateNewPage() {
  return { name: 'New Page', content: generateNewEditorContent() };
}

function addTopic(state, newTopic) {
  return {
    ...state,
    course: {
      ...state.course,
      data: {
        ...state.course.data,
        children: [...state.course.data.children, newTopic],
      },
    },
  };
}
function addPage(state, newPage) {
  return {
    ...state,
    course: {
      ...state.course,
      data: {
        ...state.course.data,
        children: state.course.data.children.map((topic, i) =>
          i === state.currentTopicIndex
            ? { ...topic, children: [...topic.children, newPage] }
            : topic,
        ),
      },
    },
  };
}

export default function editCourse(state = initialState, action) {
  switch (action.type) {
    case SET_COURSE:
      return {
        saveState: getNextState(state.saveState, saveStates.SAVED),
        currentTopicIndex: null,
        currentPageIndex: null,
        course: action.course,
      };
    case ADD_TOPIC_GROUP:
      return addTopic(state, generateNewTopicGroup());
    case ADD_TOPIC:
      return addTopic(state, generateNewTopic());
    case ADD_PAGE:
      return addPage(state, generateNewPage());
    case SET_TOPIC_INDEX:
      return {
        ...state,
        currentTopicIndex: action.index,
        currentPageIndex: null,
      };
    case SET_PAGE_INDEX:
      return {
        ...state,
        currentPageIndex: action.index,
      };
    case SET_MAIN:
      return {
        ...state,
        currentTopicIndex: null,
        currentPageIndex: null,
      };
    case SET_CONTENT:
      const nextSaveState = getNextState(state.saveState, saveStates.MODIFIED);
      if (action.pageIndex != null) {
        return {
          ...state,
          saveState: nextSaveState,
          course: {
            ...state.course,
            data: {
              ...state.course.data,
              children: state.course.data.children.map((topic, i) =>
                i === state.currentTopicIndex
                  ? {
                      ...topic,
                      children: topic.children.map((page, j) =>
                        j === state.currentPageIndex
                          ? {
                              ...page,
                              content: action.content,
                            }
                          : page,
                      ),
                    }
                  : topic,
              ),
            },
          },
        };
      } else if (action.topicIndex != null) {
        return {
          ...state,
          saveState: nextSaveState,
          course: {
            ...state.course,
            data: {
              ...state.course.data,
              children: state.course.data.children.map((topic, i) =>
                i === state.currentTopicIndex
                  ? {
                      ...topic,
                      content: action.content,
                    }
                  : topic,
              ),
            },
          },
        };
      } else {
        return {
          ...state,
          saveState: nextSaveState,
          course: {
            ...state.course,
            data: {
              ...state.course.data,
              main: {
                ...state.course.data.main,
                content: action.content,
              },
            },
          },
        };
      }
    case RESET:
      return {
        saveState: null,
        currentTopicIndex: null,
        currentPageIndex: null,
        course: null,
      };
    case SET_SAVE_STATE:
      return {
        ...state,
        saveState: getNextState(state.saveState, action.state),
      };
    default:
      return state;
  }
}
