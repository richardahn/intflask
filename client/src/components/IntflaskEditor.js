import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Editor, Transforms, createEditor } from 'slate';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { withHistory } from 'slate-history';

import withShortcuts from '../utils/intflask-slate/shortcuts';

import Element from '../utils/intflask-slate/element';
import Leaf from '../utils/intflask-slate/leaf';

import keyDownHandler from '../utils/intflask-slate/keyDownHandler';

export default function IntflaskEditor() {
  const [value, setValue] = useState(initialValue);
  const editor = useMemo(
    () => withShortcuts(withHistory(withReact(createEditor()))),
    [],
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event) => keyDownHandler(event, editor), [
    editor,
  ]);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDown}
        placeholder="Enter some rich text…"
        spellCheck={false}
        autoFocus
      />
    </Slate>
  );
}

const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];
