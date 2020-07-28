/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

export default function IntflaskViewer({ value }) {
  return (
    <ReactQuill
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        .ql-container {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .ql-editor {
          flex: 1;
          padding: 0;
        }
      `}
      theme="bubble"
      value={value}
      readOnly
      modules={{
        syntax: true,
      }}
    />
  );
}
