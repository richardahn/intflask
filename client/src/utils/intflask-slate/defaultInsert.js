import { DEFAULT } from './element';

// Keys are generated based off object reference, so it's important to make NEW objects every time, otherwise all your new line breaks will have the same key
function createDefaultNode() {
  return {
    type: DEFAULT,
    children: [{ text: '' }],
  };
}

// TODO: I need to insert node based on context. The source code automatically duplicates previous node, so base my code off that
export default function withDefaultInsert(editor) {
  const { insertNode } = editor;
  editor.insertBreak = () => {
    insertNode(createDefaultNode());
  };
  return editor;
}
