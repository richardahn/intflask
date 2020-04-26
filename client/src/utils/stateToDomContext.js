import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  map: new WeakMap(),
};
export const stateToDomContext = createContext(initialState);
const { Provider } = stateToDomContext;

// Actions
export const SET_MAPPING = 'SET_MAPPING';

export function StateToDomProvider({ children }) {
  console.log('Rendering StateToDomProvider');
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_MAPPING:
        const { map } = state;
        map.set(action.key, action.value);
        return { map };
      default:
        throw new Error();
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export function useStateToDom() {
  const context = useContext(stateToDomContext);
  return context;
}
