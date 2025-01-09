import React, { ReactNode } from 'react';
import { useAtom } from 'jotai';
import { themeState } from '@/utils/atoms/themeState';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme] = useAtom(themeState);

    return (
        <div
            style={{
                backgroundImage: `url(${theme === 'light' ? '/bg-light.png' : '/bg-dark.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                transition: 'background 0.3s ease'
            }}
        >
            {children}
        </div>
    );
};
