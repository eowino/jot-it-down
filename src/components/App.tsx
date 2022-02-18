import React from 'react';

import { ThemeToggle } from './ThemeToggle';

export const App: React.FC = () => {
    return (
        <React.Fragment>
            <header>
                <h1>Write it down</h1>
                <ThemeToggle />
            </header>
            <div className="container">
                <textarea name="write-area" placeholder="Start writing something..."></textarea>
            </div>
        </React.Fragment>
    )
}