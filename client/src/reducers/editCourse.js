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
} from '../actions/editCourse';

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

export default function editCourse(state = initialState, action) {
  switch (action.type) {
    case SET_COURSE:
      return {
        saveState: null,
        currentTopicIndex: null,
        currentPageIndex: null,
        course: action.course,
      };
    case ADD_TOPIC_GROUP:
      return {
        ...state,
        course: {
          ...state.course,
          topics: [...state.course.topics, generateNewTopicGroup()],
        },
      };
    case ADD_TOPIC:
      return {
        ...state,
        course: {
          ...state.course,
          topics: [...state.course.topics, generateNewTopic()],
        },
      };
    case ADD_PAGE:
      return {
        ...state,
        course: {
          ...state.course,
          topics: state.course.topics.map((topic, i) =>
            i === state.currentTopicIndex
              ? { ...topic, children: [...topic.children, generateNewPage()] }
              : topic,
          ),
        },
      };
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
      if (action.pageIndex != null) {
        return {
          ...state,
          course: {
            ...state.course,
            topics: state.course.topics.map((topic, i) =>
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
        };
      } else if (action.topicIndex != null) {
        return {
          ...state,
          course: {
            ...state.course,
            topics: state.course.topics.map((item, index) =>
              index === state.currentTopicIndex
                ? {
                    ...item,
                    content: action.content,
                  }
                : item,
            ),
          },
        };
      } else {
        return {
          ...state,
          course: {
            ...state.course,
            main: {
              content: action.content,
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
    default:
      return state;
  }
}
