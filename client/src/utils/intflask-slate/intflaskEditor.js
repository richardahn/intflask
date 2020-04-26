import { Transforms, Editor, Span, Node, Text } from 'slate';
import { isListType, DEFAULT, LIST_ITEM } from './element';

const IntflaskEditor = {
  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
    return !!match;
  },
  isMarkActive(editor, format) {
    const marks = Editor.marks(editor); // Returns an object containing all non-text properties from the text nodes basically
    return marks ? marks[format] === true : false;
  },
  isPropertyActive(editor, property) {
    const [match] = Editor.nodes(editor, { match: (n) => n[property] != null });
    return !!match;
  },
  toggleBlock(editor, format) {
    const isActive = this.isBlockActive(editor, format);
    const isList = isListType(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => isListType(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? DEFAULT : isList ? LIST_ITEM : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },
  toggleMark(editor, format) {
    const isActive = this.isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  toggleProperty(editor, property, createPropertyValue) {
    const isActive = this.isPropertyActive(editor, property);
    let propertyValue = null;
    if (!isActive) {
      const block = Editor.nodes(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      propertyValue = createPropertyValue(block);
    }
    Transforms.setNodes(editor, {
      [property]: propertyValue,
    });
  },
  getAllNodes(editor) {
    const lastRowIndex = editor.children.length - 1;
    const start = Editor.start(editor, [0]);
    const end = Editor.end(editor, [lastRowIndex]);
    const range = { anchor: start, focus: end };
    return [...Editor.nodes(editor, { at: range })];
  },
};
export default IntflaskEditor;
