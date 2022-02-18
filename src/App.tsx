import React from 'react';

export const App: React.FC = () => {
    return (
        <React.Fragment>
            <h1>Write it down</h1>
            <div className="container">
                <textarea name="write-area" placeholder="Start writing something..."></textarea>
            </div>
        </React.Fragment>
    )
}