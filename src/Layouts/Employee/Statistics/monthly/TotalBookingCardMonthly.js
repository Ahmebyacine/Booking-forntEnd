import React, { useEffect, useState } from 'react';
import api from '@/Services/api';
import { countStatuses } from '@/Utils/calculateStatusCount';

const TotalBookingCardMonthly = () => {
    const [totalBookings, setTotalBookings] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    useEffect(() => {
        const fetchTotalBookings = async () => {
            const userId = localStorage.getItem('userId');
            const date = new Date();
            const month = date.getMonth() + 1;
            try {

                const response = await api.get(`/bookings/employee/${userId}`);
                const count = countStatuses(response.data);
                const data2024 = count['2024'].monthlyStatistics[month].statusCounts;


                const dataCancelledCount = data2024['Cancelled'] && data2024['Cancelled']['count'] ? data2024['Cancelled']['count'] : 0;
                const dataConfirmedCount = data2024['Confirmed'] && data2024['Confirmed']['count'] ? data2024['Confirmed']['count'] : 0;
                const dataCompletedCount = data2024['Completed'] && data2024['Completed']['count'] ? data2024['Completed']['count'] : 0;

                const dataCancelledPrice = data2024['Cancelled'] && data2024['Cancelled']['total_price'] ? data2024['Cancelled']['total_price'] : 0;
                const dataConfirmedPrice = data2024['Confirmed'] && data2024['Confirmed']['total_price'] ? data2024['Confirmed']['total_price'] : 0;
                const dataCompletedPrice = data2024['Completed'] && data2024['Completed']['total_price'] ? data2024['Completed']['total_price'] : 0;

                setTotalBookings(dataCancelledCount+dataConfirmedCount+dataCompletedCount);
                setPercentageChange(dataCancelledPrice+dataConfirmedPrice+dataCompletedPrice);
            } catch (error) {
                console.error('Error fetching total bookings:', error);
            }
        };

        fetchTotalBookings();
    }, []);

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                    Total Bookings
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
                >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width={18} height={18} x={3} y={4} rx={2} />
                    <path d="M3 10h18" />
                </svg>
            </div>
            <div className="p-6">
                <div className="text-3xl font-bold">{totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                    {percentageChange > 0 ? '+' : ''}{percentageChange}% from last month
                </p>
            </div>
        </div>
    );
}

export default TotalBookingCardMonthly;