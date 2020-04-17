import isHotkey from 'is-hotkey';
import IntflaskEditor from './intflaskEditor';

import {
  HEADING_ONE,
  HEADING_TWO,
  BLOCK_QUOTE,
  NUMBERED_LIST,
  BULLETED_LIST,
} from './element';
import { BOLD, ITALIC, UNDERLINE, CODE } from './leaf';

// todo: allow hotkeys from multiple sources by destructuring and restructuring
const HOTKEYS = {
  'mod+i': { block: NUMBERED_LIST },
  'mod+u': { block: BULLETED_LIST },
  'mod+`': { mark: CODE },
  'mod+r': { mark: BOLD },
  'mod+b': function () {
    alert('pressed');
  },
};

export default function keyDownHandler(event, editor) {
  for (const hotkey in HOTKEYS) {
    if (isHotkey(hotkey, event)) {
      event.preventDefault();
      processCommand(editor, HOTKEYS[hotkey]);
    }
  }
}

function processCommand(editor, command) {
  if (command == null) {
    return;
  }

  if (typeof command === 'object') {
    if (command.mark != null) {
      IntflaskEditor.toggleMark(editor, command.mark);
    }
    if (command.block != null) {
      IntflaskEditor.toggleBlock(editor, command.block);
    }
  } else if (typeof command === 'function') {
    command(editor);
  }
}
