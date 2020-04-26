import React from 'react';

import { useSlate } from 'slate-react';
import { useStateToDom } from '../utils/stateToDomContext';
import IntflaskEditor from '../utils/intflask-slate/intflaskEditor';

function getMappedNodes(editor, map) {
  return IntflaskEditor.getAllNodes(editor)
    .filter(([node]) => map.has(node))
    .map(([node]) => ({ node, position: map.get(node) }));
}

export default function Annotations(props) {
  const { state } = useStateToDom();
  const editor = useSlate();
  console.log('  Rendering Annotations');
  const annotations = getMappedNodes(editor, state.map).map(
    ({ node, position }) => {
      return (
        <div style={{ position: 'absolute', top: position.relative.top }}>
          Text: {node.sideblock[0].text}
        </div>
      );
    },
  );
  return <div {...props}>{annotations}</div>;
}
