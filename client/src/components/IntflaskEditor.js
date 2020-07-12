/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useState, useCallback, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { Editor, Transforms, Range, Point, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import debounce from '../utils/debounce';

import { Typography, Button, Alert } from 'antd';
import { Blockquote } from '../styles';
import withFeedback from '../hocs/slate/withFeedback';
const { Text, Paragraph, Title } = Typography;

const SHORTCUTS = {
  '*': 'list-item',
  '-': 'list-item',
  '+': 'list-item',
  '>': 'block-quote',
  '#': 'heading-one',
  '##': 'heading-two',
  '###': 'heading-three',
  '####': 'heading-four',
  '#####': 'heading-five',
  '######': 'heading-six',
};

const FEEDBACK_TOP = 50;
const FEEDBACK_WIDTH = 140;
export default function IntflaskEditor({
  showFeedback = false,
  readOnly = false,
  value,
  onChange,
  feedbackWidth = FEEDBACK_WIDTH,
  feedbackTop = FEEDBACK_TOP,
  ...props
}) {
  // Feedback Column
  const renderElement = useCallback(
    (props) =>
      showFeedback ? (
        React.createElement(withFeedback(Element, feedbackWidth), props)
      ) : (
        <Element {...props} />
      ),
    [showFeedback],
  );
  const editor = useMemo(
    () => withShortcuts(withReact(withHistory(createEditor()))),
    [],
  );
  return (
    <div
      style={{
        marginRight: showFeedback ? feedbackWidth : 0,
        marginTop: showFeedback ? feedbackTop : 0,
      }}
      {...props}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => {
          if (value != newValue) {
            onChange(newValue);
          }
        }}
      >
        <Editable
          renderElement={renderElement}
          placeholder="Write something..."
          spellCheck="false"
          readOnly={readOnly}
          css={{ height: '100%' }}
        />
      </Slate>
    </div>
  );
}

const withShortcuts = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === ' ' && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type },
          { match: (n) => Editor.isBlock(editor, n) },
        );

        if (type === 'list-item') {
          const list = { type: 'bulleted-list', children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === 'list-item',
          });
        }

        return;
      }
    }

    insertText(text);
  };

  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          block.type !== 'paragraph' &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: 'paragraph' });

          if (block.type === 'list-item') {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === 'bulleted-list',
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <Blockquote {...attributes}>{children}</Blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'heading-four':
      return <h4 {...attributes}>{children}</h4>;
    case 'heading-five':
      return <h5 {...attributes}>{children}</h5>;
    case 'heading-six':
      return <h6 {...attributes}>{children}</h6>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};
