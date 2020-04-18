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
};
export default IntflaskEditor;
