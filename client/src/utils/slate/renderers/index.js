import React from 'react';
import basicRenderer from './basic';

const renderers = [basicRenderer];

export const DEFAULT = 'paragraph';
const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default function fullRenderer(props) {
  let element;
  for (const renderer of renderers) {
    if ((element = renderer(props)) != null) {
      return element;
    }
  }
  return <DefaultElement {...props} />;
}
