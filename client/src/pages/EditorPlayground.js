/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { AppLayout, PaddedContent } from '../styles';
import 'draft-js/dist/Draft.css';
import axios from 'axios';

import React, { Component, useState } from 'react';
import { convertFromRaw, EditorState, RichUtils } from 'draft-js';
import Editor, { composeDecorators } from 'draft-js-plugins-editor';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-image-plugin/lib/plugin.css';
import createFocusPlugin from 'draft-js-focus-plugin';
import 'draft-js-focus-plugin/lib/plugin.css';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// import 'draft-js-drag-n-drop-plugin/lib/plugin.css';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-linkify-plugin/lib/plugin.css';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
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
// import 'draft-js-resizeable-plugin/lib/plugin.css';
const { Text } = Typography;
const { Dragger } = Upload;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const linkifyPlugin = createLinkifyPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator,
);
const imagePlugin = createImagePlugin({ decorator });

const plugins = [
  blockDndPlugin,
  focusPlugin,
  resizeablePlugin,
  imagePlugin,
  linkifyPlugin,
  alignmentPlugin,
  emojiPlugin,
];
const initialState = {
  entityMap: {
    '0': {
      type: 'IMAGE',
      mutability: 'IMMUTABLE',
      data: {
        src: '/assets/signup.png',
      },
    },
  },
  blocks: [
    {
      key: '9gm3s',
      text:
        'You can have images in your text field which are draggable. Hover over the image press down your mouse button and drag it to another position inside the editor.',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
    {
      key: 'ov7r',
      text: ' ',
      type: 'atomic',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 0,
          length: 1,
          key: 0,
        },
      ],
      data: {},
    },
    {
      key: 'e23a8',
      text:
        'You can checkout the alignment tool plugin documentation to see how to build a compatible block plugin …',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

function ImageToolbar({ addImage }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);
  const addImageUrl = (imageUrl) => {
    const validUrl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      imageUrl,
    );
    if (validUrl) {
      addImage(imageUrl);
      message.success(`added image ${imageUrl}`);
      closeModal();
    } else {
      message.error('Invalid url provided');
    }
  };
  const closeModal = () => {
    setModalVisible(false);
    setImageUrl(null);
    setImageFileName(null);
  };
  return (
    <div css={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
      <Tooltip title="Add Image">
        <Button
          htmlType="button"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        />
      </Tooltip>
      <Modal
        title="Add Image"
        visible={modalVisible}
        onOk={() => {
          if (imageFileName) {
            addImage(`content/images/${imageFileName}`);
            message.success(`added image ${imageFileName}`);
            closeModal();
          } else if (imageUrl) {
            addImageUrl(imageUrl);
          } else {
            message.error('No image provided');
          }
        }}
        onCancel={() => {
          closeModal();
        }}
      >
        <Dragger
          name="image-upload"
          action="/content/images"
          method="post"
          multiple={false}
          name="image"
          headers={{
            Authorization: localStorage.jwtToken,
          }}
          onChange={(info) => {
            const { status } = info.file;
            if (status === 'done') {
              const { response } = info.file;
              message.success('Successfully uploaded image');
              setImageFileName(response);
            } else if (status === 'error') {
              console.error('Upload Failure: ', info);
              message.error('Failed to upload file');
            }
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Upload an Image</p>
          <p className="ant-upload-hint">File size may not exceed 4 MB.</p>
        </Dragger>
        <Divider>or</Divider>
        <Input
          placeholder="Enter image url..."
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          onPressEnter={(event) => {
            addImageUrl(imageUrl);
            event.preventDefault();
          }}
        />
      </Modal>
    </div>
  );
}

class CustomImageEditor extends Component {
  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState)),
  };
  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  handleKeyCommand = this.handleKeyCommand.bind(this);

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  render() {
    return (
      <div
        css={css`
          flex: 1;
          position: relative;
          img {
            z-index: 1;
          }
        `}
      >
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => {
            this.editor = element;
          }}
        />
        <EmojiSuggestions />
        <AlignmentTool />
        <ImageToolbar
          addImage={(url) =>
            this.onChange(imagePlugin.addImage(this.state.editorState, url))
          }
        />
      </div>
    );
  }
}

export default function EditorPlayground(props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  return (
    <AppLayout>
      <PaddedContent css={{ display: 'flex', flexDirection: 'column' }}>
        <CustomImageEditor />
      </PaddedContent>
    </AppLayout>
  );
}
