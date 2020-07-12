function processTutorialContent(tutorial, func) {
  const { content } = tutorial;
  return {
    ...tutorial,
    content: {
      children:
        content.children &&
        content.children.map((i) => ({
          ...i,
          content: func(i.content),
          ...(!i.children &&
            i.children.map((j) => ({
              ...j,
              content: func(j.content),
            }))),
        })),
      main: {
        ...content.main,
        content: func(content.main.content),
      },
    },
  };
}

export function parseTutorialContent(tutorial) {
  return processTutorialContent(tutorial, JSON.parse);
}
export function stringifyTutorialContent(tutorial) {
  return processTutorialContent(tutorial, JSON.stringify);
}
