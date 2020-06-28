function getEmptyCourseData() {
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
function stringifyCourseData(courseData) {
  return courseData;
}

module.exports = {
  getEmptyCourseData,
  stringifyCourseData,
};
