import React from 'react';
import { HighBrightness } from '.';

import { AppTheme } from '../enums';
import { LowBrightness } from './LowBrightness';

export const THEME_ID = 'write_it_down_theme';

let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? AppTheme.Dark : AppTheme.Light;
const savedTheme = localStorage.getItem(THEME_ID);

if (savedTheme) {
    theme = savedTheme === AppTheme.Dark ? AppTheme.Dark : AppTheme.Light;
}

export const ThemeToggle: React.FC = () => {
    const [currentTheme, setCurrentTheme] = React.useState(theme);
    const isDarkMode = currentTheme === AppTheme.Dark;

    React.useEffect(() => {
        document.body.classList.toggle('dark-mode', currentTheme === AppTheme.Dark);
        localStorage.setItem(THEME_ID, currentTheme);
    }, [currentTheme]);

    function toggleTheme() {
        setCurrentTheme(isDarkMode ? AppTheme.Light : AppTheme.Dark);
    }

    return (
        <button className='btn-theme' type='button' onClick={toggleTheme} title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} mode`}>
            {isDarkMode ? <LowBrightness /> : <HighBrightness />}
        </button>
    );
};