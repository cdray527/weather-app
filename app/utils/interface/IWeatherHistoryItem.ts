export interface IWeatherHistoryItem {
    id: number;
    city: string;
    country: string;
    temp: number;
    maxTemp: number;
    minTemp: number;
    weather: string;
    humidity: number;
    timestamp: string;
}

export interface IWeatherHistoryItems {
    items?: IWeatherHistoryItem[];
}
