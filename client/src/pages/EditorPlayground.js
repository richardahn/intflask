/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useState } from 'react';
import IntflaskEditor from '../components/IntflaskEditor';
import { AppLayout, PaddedContent } from '../styles';

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
