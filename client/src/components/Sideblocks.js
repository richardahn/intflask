import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { Editor, createEditor } from 'slate';
import { Editable, withReact, Slate, useSlate } from 'slate-react';

function navigateDomNodesPath(tree, path) {
  let domNode = tree;
  for (let i = 0; i < path.length - 1; i++) {
    domNode = domNode[path[i]].children;
  }
  domNode = domNode[path[path.length - 1]];
  return domNode;
}

function Sideblock({ associatedDomNode, value }) {
  const offsetTop = associatedDomNode.offsetTop;
  const [divDom, setDivDom] = useState(null);
  const divRef = useCallback((node) => setDivDom(node));
  const [marginTop, setMarginTop] = useState(null);
  useEffect(() => {
    debugger;
    if (divDom != null) {
      if (divDom.offsetTop < offsetTop) {
        setMarginTop(offsetTop - divDom.offsetTop);
      } else if (marginTop != null) {
        setMarginTop(null);
      }
    }
  }, [divDom, offsetTop, value]);
  debugger;
  return (
    <div style={{ marginTop, border: '1px solid black' }} ref={divRef}>
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
      hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi
    </div>
  );
}

// Manages sideblocks
export default function Sideblocks({ editorDomNodes, ...rest }) {
  const editor = useSlate();
  const start = Editor.start(editor, [0]);
  const end = Editor.end(editor, [editor.children.length - 1]);
  const range = { anchor: start, focus: end };

  const sideblocks = [
    ...Editor.nodes(editor, {
      at: range,
      match: (n) => n.sideblock != null,
    }),
  ].map(([sideblock, path]) => {
    const domNode = navigateDomNodesPath(editorDomNodes, path);
    return <Sideblock associatedDomNode={domNode.node} value={sideblock} />;
  });
  return <div {...rest}>{sideblocks}</div>;
}
