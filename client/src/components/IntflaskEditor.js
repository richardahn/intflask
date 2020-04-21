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

// Redux
import { setEditorState } from '../actions/editor';

// Intflask Slate Tools
import withShortcuts from '../utils/intflask-slate/shortcuts';
import keyDownHandler from '../utils/intflask-slate/keyDownHandler';
import Element from '../utils/intflask-slate/element';
import Leaf from '../utils/intflask-slate/leaf';

function SideblockColumn({ editorDomNodes, ...rest }) {
  const editor = useSlate();
  console.log('in sideblock...');
  console.log(editorDomNodes);
  console.log(editor.children);
  const sideblocks = editorDomNodes.map((node, i) => {
    const slateNode = editor.children[i];
    const style = node.currentStyle || window.getComputedStyle(node);
    console.log(`Top: ${style.marginTop}, height: ${node.offsetHeight}`);
    return (
      <div
        style={{
          marginTop: style.marginTop,
          height: node.offsetHeight,
        }}
        className="col s12"
      >
        {slateNode?.sideblock?.text}
      </div>
    );
  });
  return <div {...rest}>{sideblocks}</div>;
}

const IntflaskEditable = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <Editable {...props} />
  </div>
));

function IntflaskEditor(props) {
  const editor = useMemo(
    () => withShortcuts(withHistory(withReact(createEditor()))),
    [],
  );
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const onKeyDown = useCallback((event) => keyDownHandler(event, editor), [
    editor,
  ]);

  const [editorDom, setEditorDom] = useState(null);
  const editorRef = useCallback((dom) => {
    setEditorDom(dom);
    debugger;
  });

  const [editorDomNodes, setEditorDomNodes] = useState([]);
  useEffect(() => {
    if (editorDom != null) {
      setEditorDomNodes([
        ...editorDom.querySelectorAll('[data-slate-node="element"]'),
      ]);
    }
  }, [props.editor, editorDom]);
  // when state changes, update dom, but dom hasnt updated yet
  // so update dom when ref changes, but ref doesnt represent all children
  // Slate state changes when ur SELECTION changes
  // If this then changes editor state with redux
  // However, the actual slate json content didn't change so our component
  // doesnt rerender
  let sideblocks = null;
  if (editorDomNodes != null) {
    sideblocks = (
      <SideblockColumn className="col s6" editorDomNodes={editorDomNodes} />
    );
  }
  debugger;
  return (
    <Slate
      editor={editor}
      value={props.editor}
      onChange={(value) => props.setEditorState(value)}
    >
      <IntflaskEditable
        ref={editorRef}
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
      {sideblocks}
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
