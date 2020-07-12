import {
  SET_TUTORIAL,
  ADD_PAGE_GROUP,
  ADD_PAGE,
  ADD_SUBPAGE,
  SET_CURRENT_PATH,
  SET_CURRENT_PAGE_CONTENT,
  RESET,
  SET_SAVE_STATE,
  SET_NAME,
  SET_DEPLOYED,
} from '../actions/editTutorial';
import saveStates, { getNextState } from '../enums/saveStates';

const initialState = {
  saveState: null,
  currentPath: null,
  tutorial: null,
};

function generateNewEditorContent() {
  return [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
}

function generateNewPageGroup() {
  return {
    name: 'New Topic',
    content: generateNewEditorContent(),
    children: [],
  };
}
function generateNewPage() {
  return { name: 'New Topic', content: generateNewEditorContent() };
}
function generateNewSubpage() {
  return { name: 'New Page', content: generateNewEditorContent() };
}

function addPage(state, page) {
  return {
    ...state,
    tutorial: {
      ...state.tutorial,
      content: {
        ...state.tutorial.content,
        children: [...state.tutorial.content.children, page],
      },
    },
  };
}
function addSubpage(state, subpage) {
  return {
    ...state,
    tutorial: {
      ...state.tutorial,
      content: {
        ...state.tutorial.content,
        children: state.tutorial.content.children.map((topic, i) =>
          i === state.currentTopicIndex
            ? { ...topic, children: [...topic.children, subpage] }
            : topic,
        ),
      },
    },
  };
}

export default function editTutorial(state = initialState, action) {
  switch (action.type) {
    case SET_TUTORIAL:
      return {
        saveState: getNextState(state.saveState, saveStates.SAVED),
        currentPath: [],
        tutorial: action.tutorial,
      };
    case ADD_PAGE_GROUP:
      return addPage(state, generateNewPageGroup());
    case ADD_PAGE:
      return addPage(state, generateNewPage());
    case ADD_SUBPAGE:
      return addSubpage(state, generateNewSubpage());
    case SET_CURRENT_PATH:
      return { ...state, currentPath: action.path };
    case SET_CURRENT_PAGE_CONTENT:
      const nextSaveState = getNextState(state.saveState, saveStates.MODIFIED);
      if (state.currentPath.length === 2) {
        return {
          ...state,
          saveState: nextSaveState,
          tutorial: {
            ...state.tutorial,
            content: {
              ...state.tutorial.content,
              children: state.tutorial.content.children.map((page, i) =>
                i === state.currentPath[0]
                  ? {
                      ...page,
                      children: page.children.map((subpage, j) =>
                        j === state.currentPath[1]
                          ? {
                              ...subpage,
                              content: action.content,
                            }
                          : subpage,
                      ),
                    }
                  : page,
              ),
            },
          },
        };
      } else if (state.currentPath.length === 1) {
        return {
          ...state,
          saveState: nextSaveState,
          tutorial: {
            ...state.tutorial,
            content: {
              ...state.tutorial.content,
              children: state.tutorial.content.children.map((page, i) =>
                i === state.currentPath[0]
                  ? {
                      ...page,
                      content: action.content,
                    }
                  : page,
              ),
            },
          },
        };
      } else if (state.currentPath.length === 0) {
        console.log('REDUCED');
        let ret = {
          ...state,
          saveState: nextSaveState,
          tutorial: {
            ...state.tutorial,
            content: {
              ...state.tutorial.content,
              main: {
                ...state.tutorial.content.main,
                content: action.content,
              },
            },
          },
        };
        console.log(ret);
        return ret;
      } else {
        console.log('SUPER BAD');
        return state;
      }
    case RESET:
      return {
        saveState: null,
        currentPath: null,
        tutorial: null,
      };
    case SET_SAVE_STATE:
      return {
        ...state,
        saveState: getNextState(state.saveState, action.state),
      };
    case SET_NAME:
      if (state.currentPageIndex != null) {
        return {
          ...state,
          tutorial: {
            ...state.tutorial,
            content: {
              ...state.tutorial.content,
              children: state.tutorial.content.children.map((topic, i) =>
                i === state.currentTopicIndex
                  ? {
                      ...topic,
                      children: topic.children.map((page, j) =>
                        j === state.currentPageIndex
                          ? {
                              ...page,
                              name: action.name,
                            }
                          : page,
                      ),
                    }
                  : topic,
              ),
            },
          },
        };
      } else if (state.currentTopicIndex != null) {
        return {
          ...state,
          tutorial: {
            ...state.tutorial,
            content: {
              ...state.tutorial.content,
              children: state.tutorial.content.children.map((topic, i) =>
                i === state.currentTopicIndex
                  ? {
                      ...topic,
                      name: action.name,
                    }
                  : topic,
              ),
            },
          },
        };
      }
      return state;
    case SET_DEPLOYED:
      return {
        ...state,
        tutorial: {
          ...state.tutorial,
          deployed: action.deployed,
        },
      };
    default:
      return state;
  }
}
