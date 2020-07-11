/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import React from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default class InputTags extends React.Component {
  state = {
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  };

  handleClose = (removedTag) => {
    this.props.onChange(this.props.tags.filter((tag) => tag !== removedTag));
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.props;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.onChange(tags);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = (e) => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    const newTags = [...this.props.tags];
    newTags[this.state.editInputIndex] = this.state.editInputValue;
    this.props.onChange(newTags);
    this.setState(() => {
      return {
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  saveEditInputRef = (input) => {
    this.editInput = input;
  };

  render() {
    const { tags } = this.props;
    const {
      inputVisible,
      inputValue,
      editInputIndex,
      editInputValue,
    } = this.state;
    return (
      <div
        css={css`
          .site-tag-plus {
            background: #fff;
            border-style: dashed;
          }
          .edit-tag {
            user-select: none;
          }
          .tag-input {
            width: 78px;
            margin-right: 8px;
            vertical-align: top;
          }
        `}
      >
        {tags.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={this.saveEditInputRef}
                key={tag}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={this.handleEditInputChange}
                onBlur={this.handleEditInputConfirm}
                onPressEnter={this.handleEditInputConfirm}
              />
            );
          }

          const isLongTag = tag.length > 20;

          const tagElem = (
            <Tag
              className="edit-tag"
              key={tag}
              closable={true}
              onClose={() => this.handleClose(tag)}
            >
              <span
                onDoubleClick={(e) => {
                  this.setState(
                    { editInputIndex: index, editInputValue: tag },
                    () => {
                      this.editInput.focus();
                    },
                  );
                  e.preventDefault();
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}
