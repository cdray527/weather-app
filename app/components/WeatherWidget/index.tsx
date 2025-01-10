import SearchBar from '@/components/SearchBar';
import WeatherHistory from './WeatherHistory';

const WeatherWidget: React.FC = () => {
    return (
        <div className="flex flex-col items-center space-y-4">
            <SearchBar />
            <WeatherHistory />
        </div>
    );
};

export default WeatherWidget;
