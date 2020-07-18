/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import imageCompression from 'browser-image-compression';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useImperativeHandle,
} from 'react';

import { Divider, Modal, Upload, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

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
        }
      `}
      theme="bubble"
      value={value}
      readOnly
    />
  );
}
