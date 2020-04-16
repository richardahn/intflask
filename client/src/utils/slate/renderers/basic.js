import React from 'react';

export const CODE = 'code';
const CodeElement = (props) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

export default function basicRenderer(props) {
  switch (props.element.type) {
    case CODE:
      return <CodeElement {...props} />;
  }
}
