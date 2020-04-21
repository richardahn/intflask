import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { Editor, createEditor } from 'slate';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import { connect } from 'react-redux';

// Components
import Sideblocks from '../components/Sideblocks';

// Redux
import { setEditorState } from '../actions/editor';

// Intflask Slate Tools
import withShortcuts from '../utils/intflask-slate/shortcuts';
import withDefaultInsert from '../utils/intflask-slate/defaultInsert';
import keyDownHandler from '../utils/intflask-slate/keyDownHandler';
import Element from '../utils/intflask-slate/element';
import Leaf from '../utils/intflask-slate/leaf';
import withDom from '../utils/intflask-slate/dom';

function IntflaskEditor(props) {
  const editor = useMemo(
    () =>
      withDefaultInsert(withShortcuts(withHistory(withReact(createEditor())))),
    [],
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event) => keyDownHandler(event, editor), [
    editor,
  ]);

  const [editorDomNodes, setEditorDomNodes] = useState([]);
  const onDomChange = useCallback((dom) => setEditorDomNodes(dom));
  const IntflaskEditable = useMemo(() => withDom(Editable, onDomChange), []);
  return (
    <Slate
      editor={editor}
      value={props.editor}
      onChange={(value) => props.setEditorState(value)}
    >
      <IntflaskEditable
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
      {editorDomNodes.length > 0 && (
        <Sideblocks
          className="col s6"
          editorDomNodes={editorDomNodes}
          style={{ backgroundColor: 'red' }}
        />
      )}
    </Slate>
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
