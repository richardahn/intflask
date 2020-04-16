import { Transforms, Editor } from 'slate';

// Renderer types
import { CODE } from '../renderers/basic';
import { DEFAULT } from '../renderers';

export default function basicKeyDownHandler(event, editor) {
  if (event.key === '`' && event.ctrlKey) {
    event.preventDefault();

    // get the first code match
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === CODE,
    });
    Transforms.setNodes(
      editor, // The editor to transform
      { type: match ? DEFAULT : CODE }, // The props to add onto the element
      { match: (n) => Editor.isBlock(editor, n) }, //
    );
  }
}
