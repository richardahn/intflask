import React, { useState, useCallback, useEffect } from 'react';
import { useSlate } from 'slate-react';

function getDomNodes(childNodes) {
  return [...childNodes]
    .filter((node) => node.hasAttribute('data-slate-node'))
    .map((node) => ({ node: node, children: getDomNodes(node.childNodes) }));
}
function rawDomToSlateDom(rawEditorDom) {
  const editor = rawEditorDom.querySelector('[data-slate-editor]');
  const nodes = getDomNodes(editor.childNodes);
  return nodes;
}
// I need ref to the intflask editable
export default function withDom(Editable, onDomChange) {
  return function (props) {
    const editorValue = useSlate().children;
    const [rawEditorDom, setRawEditorDom] = useState(null);
    const editorRef = useCallback((dom) => {
      setRawEditorDom(dom);
    });
    useEffect(() => {
      if (rawEditorDom != null) {
        onDomChange(rawDomToSlateDom(rawEditorDom));
      }
    }, [editorValue, rawEditorDom]);

    return (
      <div ref={editorRef}>
        <Editable {...props} />
      </div>
    );
  };
}
