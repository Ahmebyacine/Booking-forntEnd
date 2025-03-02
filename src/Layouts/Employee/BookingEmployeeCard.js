import React, { useState } from 'react';
import api from '@/Services/api';
import { format } from 'date-fns';

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
};


const BookingsCard = ({ booking }) => {
    const statusColors = {
        Confirmed: 'bg-green-100 text-green-600',
        Completed: 'bg-green-200 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-600',
        Cancelled: 'bg-red-100 text-red-600',
    };

    // Initialize state with the current booking status
    const [currentStatus, setCurrentStatus] = useState(booking.status);

    // Define the function to handle status change
    const handleStatusChange = async () => {
        const statusOrder = ['Pending', 'Confirmed','Completed', 'Cancelled'];
        const currentIndex = statusOrder.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        const newStatus = statusOrder[nextIndex];
        setCurrentStatus(newStatus);
        const userId = localStorage.getItem('userId');
        try {
            const response = await api.patch(`/bookings/${booking._id}`, { status: newStatus, confirmed_by:userId });
            if (!response.status === 200) {
                console.error('Failed to update status:', response);
                setCurrentStatus(currentStatus);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            setCurrentStatus(currentStatus);
        }
    };

    return (
        <div
            key={booking.id}
            className="rounded-lg border pt-4 bg-white text-gray-900 shadow-sm"
        >
            <div className="p-6">
                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">{`Booking #${booking.user_id?.phone}`}</h3>
            </div>
            <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{booking.user_id?.name || 'undefined'}</div>
                    <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                            statusColors[currentStatus] || 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {currentStatus}
                    </div>
                </div>
                <div className="text-sm text-gray-600">{formatDateTime(booking.booking_date)}</div>
                <div className="text-sm text-gray-600">{booking.time}</div>
                <div className="text-sm text-gray-600">{booking.service_name}</div>
                <div className="text-sm text-gray-600">{`${booking.number} guests`}</div>
                <div className="border-t border-gray-100 my-2"></div>
                <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{`$ ${booking.service_price*booking.number}`}</div>
                 {!booking.archive &&
                                    <button
                                    onClick={handleStatusChange}
                                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-secondColor hover:bg-firstColor hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-9 rounded-md px-3"
                                >
                                    Change status
                                </button>
                 }
                </div>
            </div>
        </div>
    );
};

export default BookingsCard;