/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AppLayout, PaddedContent } from '../styles';

import React, { useState, useCallback } from 'react';

import IntflaskEditor from '../components/IntflaskEditor';

export default function EditorPlayground() {
  const [editorValue, setEditorValue] = useState('');
  const onChange = useCallback((val) => {
    console.log('on change', val);
    setEditorValue(val);
  }, []);
  return (
    <AppLayout>
      <PaddedContent css={{ display: 'flex', flexDirection: 'column' }}>
        <IntflaskEditor value={editorValue} onChange={onChange} />
      </PaddedContent>
    </AppLayout>
  );
}
