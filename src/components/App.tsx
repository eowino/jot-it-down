import React from 'react';

import { SaveDisabled, SaveEnabled } from './icons';
import { ToggleTheme } from './ToggleTheme';

export const SAVE_ID = 'write_it_down_save';
export const SAVED_CONTENT = 'write_it_down_content';

export const App: React.FC = () => {
  const selectionStartRef = React.useRef<number | null>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = React.useState(
    localStorage.getItem(SAVED_CONTENT) ?? ''
  );
  const [shouldSave, setShouldSave] = React.useState(
    localStorage.getItem(SAVE_ID) === 'true'
  );

  React.useEffect(() => {
    localStorage.setItem(SAVE_ID, shouldSave.toString());
  }, [shouldSave]);

  React.useLayoutEffect(() => {
    if (selectionStartRef.current != null && textAreaRef.current) {
      const nextPosition = selectionStartRef.current + 2;
      textAreaRef.current.setSelectionRange(nextPosition, nextPosition);
      selectionStartRef.current = null;
    }
  }, [text]);

  React.useEffect(() => {
    if (shouldSave) {
      localStorage.setItem(SAVED_CONTENT, text);
    } else {
      localStorage.removeItem(SAVED_CONTENT);
    }
  }, [shouldSave, text]);

  function toggleSaving() {
    setShouldSave((isSaving) => !isSaving);
  }

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart } = e.target as HTMLTextAreaElement;
      selectionStartRef.current = selectionStart;

      setText((t) => {
        return t.slice(0, selectionStart) + '  ' + t.slice(selectionStart);
      });
    }
  }

  return (
    <React.Fragment>
      <header>
        <h1>Write it down</h1>
        <ToggleTheme />
        <button
          className="btn btn-save"
          type="button"
          onClick={toggleSaving}
          title={`${shouldSave ? 'Disable' : 'Enable'} saving`}
        >
          {shouldSave ? <SaveEnabled /> : <SaveDisabled />}
        </button>
      </header>
      <div className="container">
        <textarea
          name="write-area"
          ref={textAreaRef}
          placeholder="Start writing something..."
          autoFocus
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={text}
        />
      </div>
    </React.Fragment>
  );
};
