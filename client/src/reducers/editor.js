import { SET_EDITOR_STATE, SET_EDITOR_DOM_STATE } from '../actions/editor';

const initialState = [
  {
    type: 'paragraph',
    children: [
      { text: 'This is editable ' },
      { text: 'rich', bold: true },
      { text: ' text, ' },
      { text: 'much', italic: true },
      { text: ' better than a ' },
      { text: '<textarea>', code: true },
      { text: '!' },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text:
          "Since it's rich text, you can do things like turn a selection of text ",
      },
      { text: 'bold', bold: true },
      {
        text:
          ', or add a semantically rendered block quote in the middle of the page, like this:',
      },
    ],
  },
  {
    type: 'block-quote',
    children: [{ text: 'A wise quote.' }],
    url: 'https',
    sideblock: {
      value: 'THIS BLOCKQUOTE 1',
      children: [
        {
          value: 'THIS BLOCKQUOTE 2',
        },
      ],
    },
  },
  {
    type: 'paragraph',
    children: [{ text: 'Try it out for yourself!' }],
  },
];
export default function editor(state = initialState, action) {
  switch (action.type) {
    case SET_EDITOR_STATE:
      return action.state;
    default:
      return state;
  }
}
