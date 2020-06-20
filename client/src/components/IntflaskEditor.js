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

// Redux
import { setEditorState } from '../actions/editor';

// Intflask Slate Tools
import withShortcuts from '../utils/intflask-slate/shortcuts';
import withDefaultInsert from '../utils/intflask-slate/defaultInsert';
import keyDownHandler from '../utils/intflask-slate/keyDownHandler';
import Element from '../utils/intflask-slate/element';
import Leaf from '../utils/intflask-slate/leaf';

// WARNING: Seems like withShortcuts or withDefaultInsert is causing an issue when holding undo
function IntflaskEditor(props) {
  const editor = useMemo(
    () =>
      withDefaultInsert(withShortcuts(withReact(withHistory(createEditor())))),
    [],
  );
  // Make an HOC that goes on top of Element and pass in the setCanvasState function
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event) => keyDownHandler(event, editor), [
    editor,
  ]);

  return (
    <div>
      <Slate
        editor={editor}
        value={props.editor}
        onChange={(value) => props.setEditorState(value)}
      >
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={onKeyDown}
          placeholder="Enter some rich text…"
          spellCheck={false}
          autoFocus
        />
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
