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
    topics: [],
  };
}

module.exports = {
  getEmptyTutorialContent,
};
