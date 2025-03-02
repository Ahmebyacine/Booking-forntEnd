import React, { useState, useEffect } from 'react';
import api from '@/Services/api';
import LoadingCard from '@/Component/LoadingCard';
import { countStatuses } from '@/Utils/calculateStatusCount';

const TotalBookingComletedCardMonthly = () => {
    const [value, setValue] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = localStorage.getItem('userId');
            const date = new Date();
            const month = date.getMonth() + 1;
            try {
                const response = await api.get(`/bookings/employee/${userId}`);
                const count = countStatuses(response.data);
                const data2024 = count['2024'].monthlyStatistics[month].statusCounts;

                const dataCompletedCount = data2024['Completed'] && data2024['Completed']['count'] ? data2024['Completed']['count'] : 0;
                const dataCompletedPrice = data2024['Completed'] && data2024['Completed']['total_price'] ? data2024['Completed']['total_price'] : 0;
                  setValue(dataCompletedCount);
                  setPercentageChange(dataCompletedPrice);
                
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
                    Total Booking Complted
                </h3>
            </div>
            <div className="p-6 flex flex-col">
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
                            {value}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {percentageChange !== null ? `${percentageChange} $` : 'N/A'}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default TotalBookingComletedCardMonthly;