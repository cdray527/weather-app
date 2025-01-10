import { atom } from 'jotai';
import { IWeatherHistoryItem } from '@/utils/interface/weatherHistoryItem';

export const weatherHistoryState = atom<IWeatherHistoryItem[]>([]);

export const currentWeatherIdState = atom<number | null>(null);
