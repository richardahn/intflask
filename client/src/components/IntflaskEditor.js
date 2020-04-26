import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { Editor, createEditor } from 'slate';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import { connect } from 'react-redux';

// Components
import Annotations from './Annotations';

// Redux
import { setEditorState } from '../actions/editor';

// Intflask Slate Tools
import withShortcuts from '../utils/intflask-slate/shortcuts';
import withDefaultInsert from '../utils/intflask-slate/defaultInsert';
import keyDownHandler from '../utils/intflask-slate/keyDownHandler';
import Element from '../utils/intflask-slate/element';
import Leaf from '../utils/intflask-slate/leaf';

// DOM
import { withPosition } from '../utils/hocs/dom';
import { StateToDomProvider } from '../utils/stateToDomContext';

// Initialize
const ElementWithPosition = withPosition(Element);

function IntflaskEditor(props) {
  const editor = useMemo(
    () =>
      withDefaultInsert(withShortcuts(withHistory(withReact(createEditor())))),
    [],
  );
  // Make an HOC that goes on top of Element and pass in the setCanvasState function
  const renderElement = useCallback(
    (props) => <ElementWithPosition {...props} />,
    [],
  );
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event) => keyDownHandler(event, editor), [
    editor,
  ]);

  return (
    <div style={{ position: 'relative' }}>
      <Slate
        editor={editor}
        value={props.editor}
        onChange={(value) => props.setEditorState(value)}
      >
        <StateToDomProvider>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={onKeyDown}
            placeholder="Enter some rich text…"
            spellCheck={false}
            autoFocus
            className="col s6"
            style={{
              backgroundColor: 'lightblue',
            }}
          />
          <Annotations className="col s6" />
        </StateToDomProvider>
      </Slate>
    </div>
  );
}

// Maps store state to props
const mapStateToProps = (state) => ({
  editor: state.editor,
});

const mapDispatchToProps = {
  setEditorState,
};

export default connect(mapStateToProps, mapDispatchToProps)(IntflaskEditor);
