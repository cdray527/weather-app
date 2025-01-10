import { atom } from 'jotai';
import { IWeatherHistoryItem } from '@/utils/interface/IWeatherHistoryItem';

export const weatherHistoryAtom = atom<IWeatherHistoryItem[]>([]);

export const currentWeatherIdAtom = atom<number | null>(null);
