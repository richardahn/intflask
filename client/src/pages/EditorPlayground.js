/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AppLayout, PaddedContent } from '../styles';
import imageCompression from 'browser-image-compression';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React, {
  Component,
  useState,
  useReducer,
  useRef,
  useCallback,
} from 'react';

import {
  Tooltip,
  Button,
  Popconfirm,
  Divider,
  Modal,
  Typography,
  Upload,
  message,
  Input,
} from 'antd';
import { SearchOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import IntflaskEditor from '../components/IntflaskEditor';
const { Text } = Typography;
const { Dragger } = Upload;

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
