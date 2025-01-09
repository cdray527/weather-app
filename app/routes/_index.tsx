import type { MetaFunction } from '@remix-run/node';
import { WeatherWidget } from '@/components/WeatherWidget/WeatherWidget';

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
    return (
        <>
            <p id="index-page">Weather App</p>
            <div>
                <WeatherWidget />
            </div>
        </>
    );
}
