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
}
// Manages sideblocks
export default function Sideblocks({ editorDomNodes, ...rest }) {
  const editor = useSlate();
  // Create tree hierarchy, which is what it is
  // First sideblock is always 1st column
  // Child sideblocks go to nth column
  // Keep track of path
  // As you get deeper, append to array, but COPY that array to recursive func
  // Keep original array as the 'path', and then use that
  const start = Editor.start(editor, [0]);
  const end = Editor.end(editor, [editor.children.length - 1]);
  const range = { anchor: start, focus: end };
  const sideblock = [
    ...Editor.nodes(editor, {
      at: range,
      match: (n) => n.sideblock != null,
    }),
  ];
  return <div></div>;
}
