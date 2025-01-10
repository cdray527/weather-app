import React, { ReactNode, useEffect } from 'react';
import { useAtom } from 'jotai';
import { themeState } from '@/utils/atoms/themeState';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useAtom(themeState);

    useEffect(() => {
        // Default theme based on user current time
        const currentHour = new Date().getHours();
        const isDayTime = currentHour >= 6 && currentHour < 18;

        if (!theme) {
            setTheme(isDayTime ? 'light' : 'dark');
        }

        // Set the data-theme on html element
        document.documentElement.setAttribute(
            'data-theme',
            theme || (isDayTime ? 'light' : 'dark')
        );

        // Change the background on the body element
        const body = document.body;
        body.style.backgroundImage = `url(${theme === 'light' ? '/bg-light.png' : '/bg-dark.png'})`;
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center';
        body.style.transition = 'background 0.3s ease';
    }, [theme, setTheme]);

    return <>{children}</>;
};