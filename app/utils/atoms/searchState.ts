import { atom } from 'jotai';
import { IWeatherHistoryItem } from '@/utils/type/weatherHistoryItem';

export const weatherHistoryState = atom<IWeatherHistoryItem[]>([]);
