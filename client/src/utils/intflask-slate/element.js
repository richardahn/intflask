import React from 'react';

export const BLOCK_QUOTE = 'block-quote';
export const BULLETED_LIST = 'bulleted-list';
export const HEADING_ONE = 'heading-one';
export const HEADING_TWO = 'heading-two';
export const LIST_ITEM = 'list-item';
export const NUMBERED_LIST = 'numbered-list';
export const DEFAULT = 'paragraph';
const LIST_TYPES = [NUMBERED_LIST, BULLETED_LIST];

export function isListType(type) {
  LIST_TYPES.includes(type);
}

export default function Element({ attributes, children, element }) {
  switch (element.type) {
    case BLOCK_QUOTE:
      return <blockquote {...attributes}>{children}</blockquote>;
    case BULLETED_LIST:
      return <ul {...attributes}>{children}</ul>;
    case HEADING_ONE:
      return <h1 {...attributes}>{children}</h1>;
    case HEADING_TWO:
      return <h2 {...attributes}>{children}</h2>;
    case LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case NUMBERED_LIST:
      return <ol {...attributes}>{children}</ol>;
    case DEFAULT:
    default:
      return <p {...attributes}>{children}</p>;
  }
}
