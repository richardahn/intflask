import {
  DEFAULT,
  LIST_ITEM,
  BLOCK_QUOTE,
  HEADING_ONE,
  HEADING_TWO,
  HEADING_THREE,
  HEADING_FOUR,
  HEADING_FIVE,
  HEADING_SIX,
  BULLETED_LIST,
} from './element';
import { Editor, Transforms, Point, Range } from 'slate';

const SHORTCUTS = {
  '*': LIST_ITEM,
  '-': LIST_ITEM,
  '+': LIST_ITEM,
  '>': BLOCK_QUOTE,
  '#': HEADING_ONE,
  '##': HEADING_TWO,
  '###': HEADING_THREE,
  '####': HEADING_FOUR,
  '#####': HEADING_FIVE,
  '######': HEADING_SIX,
};

// HOC for the Slate editor
export default function withShortcuts(editor) {
  const { deleteBackward, insertText } = editor;
  editor.insertText = (text) => {
    const { selection } = editor;

    // If I pressed ' ', which signals that there a possible shortcut is being created
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

        if (type === LIST_ITEM) {
          const list = { type: BULLETED_LIST, children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === LIST_ITEM,
          });
        }
        return; // Do NOT insert text
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

        if (block.type !== DEFAULT && Point.equals(selection.anchor, start)) {
          Transforms.setNodes(editor, { type: DEFAULT });

          if (block.type === LIST_ITEM) {
            Transforms.unwrapNodes(editor, {
              match: (n) => n.type === BULLETED_LIST,
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
}
