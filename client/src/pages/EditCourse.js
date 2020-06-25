/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useEffect, useMemo } from 'react';
import { PageHeader } from 'antd';
import CourseEditor from '../components/EditCourse/CourseEditor';
import debounce from '../utils/debounce';

// -- Redux --
import { connect } from 'react-redux';
import { setCourse, setContent, reset } from '../actions/editCourse';

// -- Css --
import { fixedHeaderCssAtHeight, mainHeaderHeight } from '../styles';

function EditCourse({
  match,
  history,
  currentTopicIndex,
  currentPageIndex,
  setCourse,
  setContent,
  reset,
}) {
  console.log('In Edit Course');
  const { courseId } = match.params;
  const onBack = useCallback(() => history.goBack(), [history]);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setCourse({
        main: {
          content: [
            {
              type: 'paragraph',
              children: [{ text: '' }],
            },
          ],
        },
        topics: [],
      });
    }, 1000);

    return function cleanup() {
      reset();
      clearTimeout(timeout);
    };
  }, []);

  const onSaveWrapper = useMemo(() => ({}), []);
  onSaveWrapper.onSave = useCallback(
    (value) => {
      console.log('onSave called');
      setContent(value, currentTopicIndex, currentPageIndex);
    },
    [currentTopicIndex, currentPageIndex],
  );
  useEffect(
    () => () => {
      console.log('onSave cancelled!');
      onSaveWrapper.onSave.cancel();
    },
    [],
  );

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title="React App Tutorial"
        subTitle="Editing Mode"
      />
      <CourseEditor onSave={onSaveWrapper.onSave} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  currentTopicIndex: state.editCourse.currentTopicIndex,
  currentPageIndex: state.editCourse.currentPageIndex,
});

const mapDispatchToProps = {
  setCourse,
  setContent,
  reset,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);
