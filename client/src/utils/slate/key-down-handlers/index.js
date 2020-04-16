import basicKeyDownHandler from './basic';

const handlers = [basicKeyDownHandler];

export default function createKeyDownHandler(editor) {
  return (event) => {
    for (const handler of handlers) {
      handler(event, editor);
    }
  };
}
