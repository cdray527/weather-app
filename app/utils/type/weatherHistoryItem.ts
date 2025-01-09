export interface IWeatherHistoryItem {
    city: string;
    country: string;
    temp: string;
    maxTemp: string;
    minTemp: string;
    weather: string;
    humidity: number;
    timestamp: string;
}

export interface IWeatherHistoryItems {
    items?: IWeatherHistoryItem[];
}
