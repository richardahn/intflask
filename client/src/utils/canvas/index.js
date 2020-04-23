import React, {
  useContext,
  useState,
  useCallback,
  useLayoutEffect,
} from 'react';

export const CanvasContext = React.createContext();

export function CanvasProvider({ children }) {
  const addSideblock = useCallback((sideblock) => {
    setCanvasState((prev) => ({
      ...prev,
      sideblocks: prev.sideblocks.concat(sideblock),
    }));
  });
  const refresh = useCallback(() => {
    setCanvasState((prev) => ({ ...prev }));
  });
  const initialCanvasState = {
    sideblocks: [],
    addSideblock,
    refresh,
  };
  const [canvasState, setCanvasState] = useState(initialCanvasState);
  return (
    <CanvasContext.Provider value={canvasState}>
      {children}
    </CanvasContext.Provider>
  );
}
export default function Canvas(props) {
  const canvas = useContext(CanvasContext);
  debugger;
  return (
    <div {...props}>
      {canvas.sideblocks.map((sideblock, index) => {
        const { bounds, value } = sideblock.value;
        return (
          <div key={index} style={{ position: 'absolute', top: bounds.y }}>
            {value.text}
          </div>
        );
      })}
    </div>
  );
}
