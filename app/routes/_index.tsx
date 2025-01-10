import type { MetaFunction } from '@remix-run/node';
import WeatherWidget from '@/components/WeatherWidget';

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
    return (
        <>
            <div className="flex min-h-screen flex-col justify-center">
                <WeatherWidget />
            </div>
        </>
    );
}
