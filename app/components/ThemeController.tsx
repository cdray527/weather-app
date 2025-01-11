import { useEffect, useState } from 'react';

interface Props {
    id: string;
    defaultValue: boolean;
    onChange(callbackValue: boolean): void;
}

const ThemeController = ({ id, defaultValue, onChange }: Props) => {
    const [isChecked, setIsChecked] = useState(defaultValue || false);

    useEffect(() => {
        setIsChecked(defaultValue);
    }, [defaultValue]);

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onChange(newState);
    };

    return (
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label htmlFor={`${id}-checkbox`} className="flex cursor-pointer gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
                id={`${id}-checkbox`}
                type="checkbox"
                onChange={(e) => handleOnChange(e)}
                value="synthwave"
                aria-label="Theme toggler"
                className="toggle theme-controller"
                checked={isChecked}
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        </label>
    );
};

export default ThemeController;
