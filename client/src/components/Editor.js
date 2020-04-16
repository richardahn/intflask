import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import renderer from '../utils/slate/renderers';
import createKeyDownHandler from '../utils/slate/key-down-handlers';

export default function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Test text.' }],
    },
  ]);
  const renderElement = useCallback(renderer, []);
  const onKeyDown = useCallback(createKeyDownHandler(editor), [editor]);

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Editable renderElement={renderElement} onKeyDown={onKeyDown} />
    </Slate>
  );
}
