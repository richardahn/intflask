export const saveOperations = {
  QUEUE_SAVE: 'queueSave',
  DEQUEUE_SAVE: 'dequeueSave',
  MODIFY: 'modify',
};
export const saveStates = {
  MODIFIED: -1,
  SAVED: 0,
  MIN_SAVING: 1,
};
export function isSaving(state) {
  return state >= saveStates.MIN_SAVING;
}
export function isSaved(state) {
  return state === saveStates.SAVED;
}
export function isModified(state) {
  return state === saveStates.MODIFIED;
}
export function applyOperation(state, operation) {
  switch (operation) {
    case saveOperations.QUEUE_SAVE:
      if (isModified(state)) {
        return saveStates.MIN_SAVING;
      }
      return state + 1;
    case saveOperations.DEQUEUE_SAVE:
      return state - 1;
    case saveOperations.MODIFY:
      return saveStates.MODIFIED;
  }
}
