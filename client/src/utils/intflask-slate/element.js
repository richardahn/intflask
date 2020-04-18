import React from 'react';

export const BLOCK_QUOTE = 'block-quote';
export const NUMBERED_LIST = 'numbered-list';
export const BULLETED_LIST = 'bulleted-list';
export const LIST_ITEM = 'list-item';
export const HEADING_ONE = 'heading-one';
export const HEADING_TWO = 'heading-two';
export const HEADING_THREE = 'heading-three';
export const HEADING_FOUR = 'heading-four';
export const HEADING_FIVE = 'heading-five';
export const HEADING_SIX = 'heading-six';
export const DEFAULT = 'paragraph';
const LIST_TYPES = [NUMBERED_LIST, BULLETED_LIST];

export function isListType(type) {
  LIST_TYPES.includes(type);
}

export default function Element({ attributes, children, element }) {
  switch (element.type) {
    case BLOCK_QUOTE:
      return <blockquote {...attributes}>{children}</blockquote>;
    case NUMBERED_LIST:
      return <ol {...attributes}>{children}</ol>;
    case BULLETED_LIST:
      return <ul {...attributes}>{children}</ul>;
    case LIST_ITEM:
      return <li {...attributes}>{children}</li>;
    case HEADING_ONE:
      return <h1 {...attributes}>{children}</h1>;
    case HEADING_TWO:
      return <h2 {...attributes}>{children}</h2>;
    case HEADING_THREE:
      return <h3 {...attributes}>{children}</h3>;
    case HEADING_FOUR:
      return <h4 {...attributes}>{children}</h4>;
    case HEADING_FIVE:
      return <h5 {...attributes}>{children}</h5>;
    case HEADING_SIX:
      return <h6 {...attributes}>{children}</h6>;
    case DEFAULT:
    default:
      return <p {...attributes}>{children}</p>;
  }
}
