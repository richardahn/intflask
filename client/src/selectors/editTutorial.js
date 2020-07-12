import { createSelector } from 'reselect';

// -- Input-Selectors --
const getCurrentPath = (state) => state.editTutorial.currentPath;
const getTutorial = (state) => state.editTutorial.tutorial;

// -- Selectors --
export const getCurrentPage = createSelector(
  [getTutorial, getCurrentPath],
  (tutorial, currentPath) => {
    console.log('Selecting');
    if (tutorial != null && currentPath != null) {
      if (currentPath.length === 2) {
        return tutorial.content.children[currentPath[0]].children[
          currentPath[1]
        ];
      } else if (currentPath.length === 1) {
        return tutorial.content.children[currentPath[0]];
      } else if (currentPath.length === 0) {
        console.log('returning main');
        return tutorial.content.main;
      }
    }
    return null;
  },
);
