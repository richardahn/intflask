/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import imageCompression from 'browser-image-compression';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import React, { useState, useRef, useCallback, useEffect } from 'react';

import { Divider, Modal, Upload, message, Input } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

function AddImageModal({ visible, onModalVisibleChange, addImage }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [imageFileName, setImageFileName] = useState(null);
  const addImageUrl = (imageUrl) => {
    const validUrl = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      imageUrl,
    );
    if (validUrl) {
      addImage(imageUrl);
      message.success('Successfully added image url');
      closeModal();
    } else {
      message.error('Invalid url provided');
    }
  };
  const closeModal = () => {
    onModalVisibleChange(false);
    setImageUrl(null);
    setImageFileName(null);
    setUploadedFiles([]);
  };
  return (
    <div css={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
      <Modal
        title="Add Image"
        visible={visible}
        onOk={() => {
          if (imageFileName) {
            addImage(`/content/images/${imageFileName}`);
            message.success(`Successfully added image`);
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
          disabled={uploadedFiles.length === 1}
          transformFile={(file) =>
            imageCompression(file, {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            })
          }
          fileList={uploadedFiles}
          onChange={(info) => {
            setUploadedFiles(info.fileList);
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
          <p className="ant-upload-hint">Large images will be compressed.</p>
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

function IntflaskEditor({ value, onChange }) {
  const [modalVisible, setModalVisible] = useState(false);
  const editorRef = useRef(null);
  const addImageHandler = useCallback(
    (url) => {
      const editor = editorRef.current.getEditor();
      editor.focus();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', url, 'user');
    },
    [editorRef],
  );
  const onImageButtonClick = useCallback(() => setModalVisible(true), []);
  console.log('loaded editor', value);
  return (
    <React.Fragment>
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
        theme="snow"
        ref={editorRef}
        value={value}
        onChange={onChange}
        modules={{
          syntax: true,
          toolbar: {
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              [{ align: [] }],
              [{ font: [] }, { color: [] }, { background: [] }],
              ['formula', 'link', 'image', 'video'],
              ['blockquote', 'code-block'],
              [{ header: 1 }, { header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
            ],
            handlers: {
              image: onImageButtonClick,
            },
          },
        }}
      />
      <AddImageModal
        visible={modalVisible}
        onModalVisibleChange={setModalVisible}
        addImage={addImageHandler}
      />
    </React.Fragment>
  );
}

export default React.memo(
  IntflaskEditor,
  (
    { value: prevValue, onChange: prevOnChange },
    { value: nextValue, onChange: nextOnChange },
  ) => prevValue == nextValue && prevOnChange == nextOnChange,
);
