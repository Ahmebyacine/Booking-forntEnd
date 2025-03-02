import React, { useEffect, useState } from 'react';
import api from '@/Services/api';

const TotalBookingCard = () => {
    const [totalBookings, setTotalBookings] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);

    useEffect(() => {
        const fetchTotalBookings = async () => {
            try {
                const response = await api.get('/bookingsStatics');
                const { totalBookings, totalChangePercentage } = response.data;
                setTotalBookings(totalBookings);
                setPercentageChange(totalChangePercentage);
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

export default TotalBookingCard;