/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AppLayout, PaddedContent } from '../styles';

import React, { useState } from 'react';

import IntflaskEditor from '../components/IntflaskEditor';

export default function EditorPlayground() {
  const [editorValue, setEditorValue] = useState('');
  return (
    <AppLayout>
      <PaddedContent css={{ display: 'flex', flexDirection: 'column' }}>
        <IntflaskEditor value={editorValue} onChange={setEditorValue} />
      </PaddedContent>
    </AppLayout>
  );
}
