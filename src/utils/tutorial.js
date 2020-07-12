function getEmptyTutorialContent() {
  return {
    main: {
      content: JSON.stringify([
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ]),
    },
    children: [],
  };
}

module.exports = {
  getEmptyTutorialContent,
};
