import React, { useState, useEffect } from 'react';
import api from '@/Services/api';
import LoadingCard from '@/Component/LoadingCard';

const NewCustomersCard = () => {
    const [newCustomers, setNewCustomers] = useState(null);
    const [percentageChange, setPercentageChange] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/userStats');
                setNewCustomers(response.data.currentMonthCount);
                setPercentageChange(response.data.percentageChange);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-2">
                <h3 className="whitespace-nowrap tracking-tight text-sm font-medium">
                    New Customers
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
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </div>
            <div className="p-6">
            { loading && (
            <LoadingCard />
             )} 
              {error ? (
                    <div className="text-center">
                        <p className="text-sm text-red-500">Error: {error}</p>
                    </div>
                ) : (
                    <>
                        <div className="text-3xl font-bold">{newCustomers}</div>
                        <p className="text-xs text-muted-foreground">
                            {percentageChange}% from last month
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default NewCustomersCard;