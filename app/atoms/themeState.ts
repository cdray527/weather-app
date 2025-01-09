import { atom } from 'jotai';

export const themeState = atom<'light' | 'dark'>('dark');
