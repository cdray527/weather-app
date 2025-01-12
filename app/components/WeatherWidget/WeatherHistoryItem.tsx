import { useEffect, useState } from 'react';
import { IWeatherHistoryItem } from '@/utils/interface/IWeatherHistoryItem';
import Iconify from '@/components/Iconify';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { useWeatherState } from '@/utils/hooks/useWeatherState';

interface Props {
    data: IWeatherHistoryItem;
}

const WeatherHistoryItem = ({ data }: Props) => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { currentWeatherId, setCurrentWeatherId, refreshWeatherData, removeWeatherDataById } =
        useWeatherState();

    const [isSelected, setIsSelected] = useState(currentWeatherId === data.id || false);

    useEffect(() => {
        setIsSelected(currentWeatherId === data.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentWeatherId]);

    return (
        <li>
            <div
                id={`whi-select-button-${data.id}`}
                className={cn(
                    'relative flex flex-col justify-between pl-4 pr-4 mt-4 w-full items-start bg-opacity-90 sm:flex-row sm:items-center dark:bg-accent',
                    styles.WeatherHistoryItem__container,
                    {
                        [styles.WeatherHistoryItem__container_selected]: isSelected
                    }
                )}
                role="button"
                tabIndex={0}
                onClick={() => setCurrentWeatherId(data.id)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        setCurrentWeatherId(data.id);
                    }
                }}
            >
                <div className="flex flex-col w-full sm:flex-row pt-1 sm:pt-0 text-left">
                    <span className="text-tertiary-foreground">{`${data.city}, ${data.country}`}</span>
                    <span className="text-xs sm:text-base text-tertiary-foreground sm:ml-auto">{`${data.timestamp}`}</span>
                </div>
                <div className="flex absolute right-3 top-2 w-auto ml-4 sm:right-0 sm:relative sm:top-0 sm:ml-4">
                    <button
                        id={`whi-search-button-${data.id}`}
                        className={cn(
                            'btn text-secondary-foreground bg-transparent',
                            styles.WeatherHistoryItem__button
                        )}
                        aria-label="Update selected weather"
                        onClick={() => refreshWeatherData(data.id)}
                    >
                        <Iconify icon="mdi:magnify" width={24} />
                    </button>
                    <button
                        id={`whi-delete-button-${data.id}`}
                        className={cn(
                            'ml-2 btn text-secondary-foreground bg-transparent',
                            styles.WeatherHistoryItem__button
                        )}
                        aria-label="Remove selected weather"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsDeleteModalOpen(true);
                        }}
                    >
                        <Iconify icon="mdi:delete" width={24} />
                    </button>
                    <dialog
                        id={`whi-confirm-delete-modal-${data.id}`}
                        className="modal"
                        open={isDeleteModalOpen}
                    >
                        <div className="modal-box text-left text-secondary-foreground dark:text-primary-foreground bg-secondary-background">
                            <h3 className="font-bold text-lg">Confirmation</h3>
                            <p className="py-4">Do you want to remove this from history?</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button
                                        className="btn text-primary-foreground bg-primary-background"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeWeatherDataById(data.id);
                                        }}
                                        aria-label="Yes"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        className="ml-2 btn bg-secondary-background"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsDeleteModalOpen(false);
                                        }}
                                        aria-label="Cancel"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </li>
    );
};

export default WeatherHistoryItem;
