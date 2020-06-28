function processCourseContent(course, func) {
  const { data } = course;
  return {
    ...course,
    data: {
      children:
        data.children &&
        data.children.map((i) => ({
          ...i,
          content: func(i.content),
          ...(!i.children &&
            i.children.map((j) => ({
              ...j,
              content: func(j.content),
            }))),
        })),
      main: {
        ...data.main,
        content: func(data.main.content),
      },
    },
  };
}

export function parseCourseContent(course) {
  return processCourseContent(course, JSON.parse);
}
export function stringifyCourseContent(course) {
  return processCourseContent(course, JSON.stringify);
}
