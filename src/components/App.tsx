import React from 'react';

import { SaveDisabled, SaveEnabled } from './icons';
import { ToggleTheme } from './ToggleTheme';

export const SAVE_ID = 'write_it_down_save';
export const SAVED_CONTENT = 'write_it_down_content';

export const App: React.FC = () => {
    const [text, setText] = React.useState(localStorage.getItem(SAVED_CONTENT) ?? '');
    const [shouldSave, setShouldSave] = React.useState(() => {
        return localStorage.getItem(SAVE_ID) === 'true' ? true : false;
    });

    React.useEffect(() => {
        localStorage.setItem(SAVE_ID, shouldSave.toString());
    }, [shouldSave]);

    React.useEffect(() => {
        if (shouldSave) {
            localStorage.setItem(SAVED_CONTENT, text);
        } else {
            localStorage.removeItem(SAVED_CONTENT);
        }
    }, [shouldSave, text]);

    function toggleSaving() {
        setShouldSave(isSaving => !isSaving);
    }

    return (
        <React.Fragment>
            <header>
                <h1>Write it down</h1>
                <ToggleTheme />
                <button className='btn btn-save' type='button' onClick={toggleSaving} title={`${shouldSave ? 'Disable' : 'Enable'} saving`}>
                    {shouldSave ? <SaveEnabled /> : <SaveDisabled />}
                </button>
            </header>
            <div className="container">
                <textarea
                    name="write-area"
                    placeholder="Start writing something..."
                    onChange={({ target: { value } }) => setText(value)}
                    value={text} />
            </div>
        </React.Fragment>
    )
}