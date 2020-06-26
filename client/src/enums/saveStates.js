const saveStates = {
  MODIFIED: 0,
  SAVED: 1,
  SAVING: 2,
};
export default saveStates;
export function getNextState(currentState, desiredState) {
  switch (desiredState) {
    case saveStates.MODIFIED:
      return desiredState;
    case saveStates.SAVED:
      return currentState === saveStates.MODIFIED
        ? saveStates.MODIFIED
        : desiredState;
    case saveStates.SAVING:
      return desiredState;
    default:
      return desiredState;
  }
}
