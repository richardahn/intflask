import React, {
  useCallback,
  useState,
  useEffect,
  useContext,
  useMemo,
  useLayoutEffect,
} from 'react';

import { CanvasContext } from '../canvas';

export const SIDEBLOCK = 'sideblock';

function getBounds(node) {
  const bounds = node.getBoundingClientRect();
  const parentBounds = node.offsetParent.getBoundingClientRect();
  return {
    y: bounds.top - parentBounds.top,
    width: bounds.width,
    height: bounds.height,
  };
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    // Setup
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export default function Sideblock({ children, element, ...props }) {
  const canvas = useContext(CanvasContext);
  const windowSize = useWindowSize();
  const sideblock = useMemo(() => ({ value: null }), []);
  const sideblockRef = useCallback(
    (node) => {
      if (node == null) {
        return;
      }
      if (sideblock.value == null) {
        sideblock.value = {
          bounds: getBounds(node),
          value: element.sideblock[0],
        };
        canvas.addSideblock(sideblock);
      } else {
        sideblock.value = {
          bounds: getBounds(node),
          value: element.sideblock[0],
        };
        canvas.refresh();
      }
    },
    [windowSize],
  );
  debugger;
  return (
    <span {...props} className="sideblockNode" ref={sideblockRef}>
      {children}
    </span>
  );
}
