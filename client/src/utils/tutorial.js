import saveStates from '../enums/saveStates';
import axios from 'axios';
import { message } from 'antd';
import debounce from './debounce';

function processTutorialContent(tutorial, func) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.map((page) => ({
        ...page,
        content: func(page.content),
        ...(page.children && {
          children: page.children.map((subpage) => ({
            ...subpage,
            content: func(subpage.content),
          })),
        }),
      })),
      main: {
        ...tutorial.content.main,
        content: func(tutorial.content.main.content),
      },
    },
  };
}

export function parseTutorialDates(tutorial) {
  return {
    ...tutorial,
    creationDate: new Date(tutorial.creationDate),
    modifiedDate: new Date(tutorial.modifiedDate),
    reviews: tutorial.reviews.map((review) => ({
      ...review,
      date: new Date(review.date),
    })),
    purchases: tutorial.purchases.map((purchase) => ({
      ...purchase,
      date: new Date(purchase.date),
    })),
  };
}

export function parseTutorialContent(tutorial) {
  return processTutorialContent(tutorial, JSON.parse);
}
export function stringifyTutorialContent(tutorial) {
  return processTutorialContent(tutorial, JSON.stringify);
}

function generateNewEditorContent() {
  return '';
}
function generateNewPageGroup() {
  return {
    name: 'New Page Group',
    content: generateNewEditorContent(),
    children: [],
  };
}
function generateNewPage() {
  return { name: 'New Page', content: generateNewEditorContent() };
}
function generateNewSubpage() {
  return { name: 'New Subpage', content: generateNewEditorContent() };
}

function reducePageBase(tutorial, page) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: [...tutorial.content.children, page],
    },
  };
}
export function reducePageGroup(tutorial) {
  return reducePageBase(tutorial, generateNewPageGroup());
}
export function reducePage(tutorial) {
  return reducePageBase(tutorial, generateNewPage());
}
export function reduceSubpage(tutorial, current) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.map((page, i) =>
        i === current
          ? { ...page, children: [...page.children, generateNewSubpage()] }
          : page,
      ),
    },
  };
}
function move(array, from, to) {
  console.log('moving from', from, to);
  console.log('old arr', array);
  const res = array.slice();
  res.splice(to, 0, res.splice(from, 1)[0]);
  console.log('new arr', res);
  return res;
}

function clamp(number, min, max) {
  return Math.max(Math.min(number, max), min);
}

export function reduceMovePage(tutorial, i, iNewRaw) {
  const iNew = clamp(iNewRaw, 0, tutorial.content.children.length - 1);
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: move(tutorial.content.children, i, iNew),
    },
  };
}
export function reduceDeletePage(tutorial, iTarget) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.filter((_, i) => i !== iTarget),
    },
  };
}
export function reduceDeleteSubpage(tutorial, iTarget, jTarget) {
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.map((page, i) =>
        i === iTarget
          ? {
              ...page,
              children: page.children.filter((_, j) => j !== jTarget),
            }
          : page,
      ),
    },
  };
}
export function reduceMoveSubpage(tutorial, iCurrent, j, jNewRaw) {
  const jNew = clamp(
    jNewRaw,
    0,
    tutorial.content.children[iCurrent].children.length - 1,
  );
  return {
    ...tutorial,
    content: {
      ...tutorial.content,
      children: tutorial.content.children.map((page, i) =>
        i === iCurrent
          ? {
              ...page,
              children: move(page.children, j, jNew),
            }
          : page,
      ),
    },
  };
}

export function isMain(page) {
  return !('name' in page);
}
export function getName(page) {
  return isMain(page) ? 'Main' : page.name;
}
export function getCurrentPageFromSelection(tutorial, selectionPath) {
  console.log('tutorial', tutorial);
  let currentPage = null;
  if (selectionPath.length === 0) {
    currentPage = tutorial.content.main;
  } else if (selectionPath.length === 1) {
    currentPage = tutorial.content.children[selectionPath[0]];
  } else if (selectionPath.length === 2) {
    currentPage =
      tutorial.content.children[selectionPath[0]].children[selectionPath[1]];
  }
  return currentPage;
}

export function reduceTutorialCurrentPageName(
  tutorial,
  currentSelectionPath,
  name,
) {
  if (currentSelectionPath.length === 1) {
    return {
      ...tutorial,
      content: {
        ...tutorial.content,
        children: tutorial.content.children.map((page, i) =>
          i === currentSelectionPath[0]
            ? {
                ...page,
                name,
              }
            : page,
        ),
      },
    };
  } else if (currentSelectionPath.length === 2) {
    return {
      ...tutorial,
      content: {
        ...tutorial.content,
        children: tutorial.content.children.map((page, i) =>
          i === currentSelectionPath[0]
            ? {
                ...page,
                children: page.children.map((subpage, j) =>
                  j === currentSelectionPath[1]
                    ? {
                        ...subpage,
                        name,
                      }
                    : subpage,
                ),
              }
            : page,
        ),
      },
    };
  }
}

export function reduceTutorialContent(
  tutorial,
  currentSelectionPath,
  newContent,
) {
  if (currentSelectionPath.length === 0) {
    return {
      ...tutorial,
      content: {
        ...tutorial.content,
        main: {
          ...tutorial.content.main,
          content: newContent,
        },
      },
    };
  } else if (currentSelectionPath.length === 1) {
    return {
      ...tutorial,
      content: {
        ...tutorial.content,
        children: tutorial.content.children.map((page, i) =>
          i === currentSelectionPath[0]
            ? {
                ...page,
                content: newContent,
              }
            : page,
        ),
      },
    };
  } else if (currentSelectionPath.length === 2) {
    return {
      ...tutorial,
      content: {
        ...tutorial.content,
        children: tutorial.content.children.map((page, i) =>
          i === currentSelectionPath[0]
            ? {
                ...page,
                children: page.children.map((subpage, j) =>
                  j === currentSelectionPath[1]
                    ? {
                        ...subpage,
                        content: newContent,
                      }
                    : subpage,
                ),
              }
            : page,
        ),
      },
    };
  }
}
export const saveTutorial = debounce((tutorial, setSaveState) => {
  setSaveState(saveStates.SAVING);
  axios
    .put(
      `/api/admin/tutorials/${tutorial.slug}`,
      stringifyTutorialContent(tutorial),
    )
    .then(
      () => {
        setSaveState(saveStates.SAVED);
      },
      (error) => {
        console.error(error);
        message.error('Failed to save');
        setSaveState(saveStates.MODIFIED);
      },
    );
});
