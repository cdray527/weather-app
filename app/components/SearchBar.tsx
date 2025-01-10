import { useState } from 'react';
import cn from 'classnames';
import { Form } from '@remix-run/react';
import Iconify from '@/components/Iconify';

interface Props {
    id: string;
    defaultSearchInput: string;
    onSubmit: (
        searchInput: string,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        setError: React.Dispatch<React.SetStateAction<string | null>>
    ) => void;
    className?: string;
}

const SearchBar = ({ id, defaultSearchInput, onSubmit, className }: Props) => {
    const [searchInput, setSearchInput] = useState<string>(defaultSearchInput);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(searchInput, setLoading, setError); // Pass down the setLoading and setError functions
    };

    return (
        <Form
            id={id}
            method="get"
            onSubmit={handleFormSubmit}
            className={cn('w-full', className)}
        >
            <div className="flex items-center">
                <input
                    id={`${id}-input`}
                    type="text"
                    placeholder="Search City, Country"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    name="q"
                    className="input input-bordered w-full"
                />
                <button
                    id={`${id}-button`}
                    type="submit"
                    disabled={loading || searchInput.length === 0}
                    className="btn text-primary-foreground bg-primary-background border-none flex items-center justify-center p-0 w-12 h-12 ml-4"
                >
                    {loading ? (
                        <Iconify icon="svg-spinners:180-ring" width={24} />
                    ) : (
                        <Iconify icon="mdi:magnify" width={32} />
                    )}
                </button>
            </div>
            {error && <p className="text-error text-sm">{error}</p>}
        </Form>
    );
};

export default SearchBar;
