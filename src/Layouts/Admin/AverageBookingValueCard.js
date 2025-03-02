import React, { useState, useEffect } from 'react';
import api from '@/Services/api';
import LoadingCard from '@/Component/LoadingCard';

const AverageBookingValueCard = () => {
    const [value, setValue] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/bookingsStatics');
                setValue(response.data.averageBookingValue); 
                setPercentageChange(response.data.averageChangePercentage);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);



    return (
        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
        >
            <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                    Average Booking Value
                </h3>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-muted-foreground"
                    aria-label="Chart icon"
                >
                    <line x1={12} x2={12} y1={2} y2={22} />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
            </div>
            <div className="p-6 flex flex-col items-center">
            { loading && (
            <LoadingCard />
             )}
                {error && (
                    <div className="text-center">
                        <p className="text-sm text-red-500">Error: {error}</p>
                    </div>
                )}
                {!loading && !error && (
                    <>
                        <div className="text-3xl font-bold">
                            {value}$
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {percentageChange !== null ? `${percentageChange}% from last month` : 'N/A'}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AverageBookingValueCard;