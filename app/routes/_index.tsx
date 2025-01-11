import type { MetaFunction } from '@remix-run/node';
import WeatherWidget from '@/components/WeatherWidget';
import ThemeController from '@/components/ThemeController';
import { useAtom } from 'jotai';
import { themeAtom } from '@/utils/atoms/themeState';

export const meta: MetaFunction = () => {
    return [{ title: 'Weather App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
    const [theme, setTheme] = useAtom(themeAtom);
    return (
        <>
            <main className="flex min-h-screen flex-col justify-center p-2 sm:p-8">
                <section className="absolute top-5 right-5">
                    <ThemeController
                        id="weather-widget-theme-switcher"
                        defaultValue={theme === 'dark' ? true : false}
                        onChange={(checked) => {
                            if (checked) {
                                setTheme('dark');
                            } else {
                                setTheme('light');
                            }
                        }}
                    />
                </section>
                <section>
                    <WeatherWidget />
                </section>
            </main>
        </>
    );
}
