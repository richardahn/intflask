/** @jsx jsx */
// -- General Imports --
import { css, jsx } from '@emotion/core';
import React, { useCallback, useEffect, useMemo } from 'react';
import { PageHeader } from 'antd';
import CourseEditor from '../components/EditCourse/CourseEditor';

// -- Redux --
import { connect } from 'react-redux';
import { setCourse, reset } from '../actions/editCourse';

// -- Css --
import { fixedHeaderCssAtHeight, mainHeaderHeight } from '../styles';

function EditCourse({ match, history, setCourse, reset }) {
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

  return (
    <React.Fragment>
      <PageHeader
        css={fixedHeaderCssAtHeight(mainHeaderHeight)}
        className="site-page-header"
        onBack={onBack}
        title="How To Build a MERN Stack Website"
        subTitle="Editing"
      />
      <CourseEditor />
    </React.Fragment>
  );
}

const mapDispatchToProps = {
  setCourse,
  reset,
};

export default connect(null, mapDispatchToProps)(EditCourse);
