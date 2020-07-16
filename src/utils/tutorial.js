function getEmptyTutorialContent() {
  return {
    main: {
      content: '',
    },
    children: [],
  };
}

function convertTutorialContentToOutline(content) {
  return content.children.map((outer, i) => ({
    title: outer.name,
    key: `${i}`,
    ...(outer.children && {
      children: outer.children.map((inner, j) => ({
        title: inner.name,
        key: `${i}-${j}`,
      })),
    }),
  }));
}

module.exports = {
  getEmptyTutorialContent,
  convertTutorialContentToOutline,
};
