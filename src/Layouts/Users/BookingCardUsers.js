import React, { useState } from 'react';
import api from '@/Services/api';
import { format } from 'date-fns';
import EditIcon from '@/Assets/Icons/EditIcon';
import StatusModal from '@/Component/StatusModal';

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd');
};

const BookingsCardUsers = ({ booking }) => {
    const statusColors = {
        Confirmed: 'bg-green-100 text-green-600',
        Completed: 'bg-green-200 text-green-800',
        Pending: 'bg-yellow-100 text-yellow-600',
        Cancelled: 'bg-red-100 text-red-600',
    };

    // Initialize state with the booking data
    const [currentStatus, setCurrentStatus] = useState(booking.status);
    const [editableBooking, setEditableBooking] = useState({
        booking_date: booking.booking_date,
        time: booking.time,
        number: booking.number,
    });
    const [desplayBooking, setDesplayBooking] = useState({
        booking_date: booking.booking_date,
        time: booking.time,
        number: booking.number,
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isErrorOpen, setIsErrorOpen] = useState(false);

    // Handle input changes and set status to 'Pending' for any input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableBooking({ ...editableBooking, [name]: value });
    };

    // Handle status change to only 'Cancelled'
    const handleStatusChange = () => {
        if (currentStatus !== 'Cancelled') {
            setCurrentStatus('Cancelled');
        }
    };

    // Handle form submission to update booking data
    const handleSaveChanges = async () => {
        try { 
            if(currentStatus !== 'Cancelled'){
             setCurrentStatus('Pending');
            }
            const response = await api.patch(`/bookings/${booking._id}`, {
                ...editableBooking,
                status: currentStatus,
            });

            if (response.status === 200) {
                console.log('Booking updated successfully:', response.data);
                setDesplayBooking(response.data)
                setIsEditing(false);
                setSuccess('Updated');
                setIsSuccessOpen(true);
            } else {
                console.error('Failed to update booking:', response);
                setError('Error:The operation could not be completed. Please try again or contact support if th issue persists');
                setIsErrorOpen(true);
            }
        } catch (error) {
            console.error('Error updating booking:', error);
            setError('Error:The operation could not be completed. Please try again or contact support if th issue persists');
            setIsErrorOpen(true);
        }
    };

    // Toggle between edit and view modes
    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div key={booking._id} className="rounded-lg border bg-white text-gray-900 shadow-sm">
            <div className="p-6 space-y-2">
                <div className="flex items-center justify-between">
                    <div className={`rounded-full px-2 py-1 text-xs font-medium ${
                        statusColors[currentStatus] || 'bg-gray-100 text-gray-600'
                    }`}>
                        {currentStatus}
                    </div>
                    {!booking.archive &&
                      currentStatus !=='Completed' &&
                                        <button
                                            onClick={toggleEditMode}
                                            className="inline-flex items-center justify-center whitespace-nowrap text-secondColor text-sm font-medium bg-firstColor rounded-full hover:bg-bink-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-9 px-3"
                                        >
                                            
                                            {isEditing ? 'Cancel' :<><EditIcon /> Edit </>}
                                        </button>
                    }
                </div>

                {!isEditing ? (
                    // View Mode: Display booking details
                    <>
                        <div className="text-sm text-gray-600">{formatDateTime(desplayBooking.booking_date)}</div>
                        <div className="text-sm text-gray-600">{desplayBooking.time}</div>
                        <div className="text-sm text-gray-600">{desplayBooking.service_name}</div>
                        <div className="text-sm text-gray-600">{`${desplayBooking.number} guests`}</div>
                    </>
                ) : (
                    // Edit Mode: Show input fields
                    <>
                        <input
                            type="date"
                            name="booking_date"
                            value={formatDateTime(editableBooking.booking_date)}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="time"
                            name="time"
                            value={editableBooking.time}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="number"
                            name="number"
                            value={editableBooking.number}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        />
                    </>
                )}

                <div className="border-t border-gray-100 my-2"></div>
                <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">
                        {`$ ${booking.service_price * editableBooking.number}`}
                    </div>
                    {isEditing && (
                        <>
                        <button
                            onClick={handleStatusChange}
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-gray-200 hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-9 rounded-md px-3"
                        >
                            Cancel booking
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium bg-gray-200 hover:bg-gray-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-9 rounded-md px-3"
                        >
                            Save Changes
                        </button>
                        </>
                    )}
                    { error && (
                     <StatusModal
                       type="error"
                       title="Error Occurredr"
                       message={error}
                       isOpen={isErrorOpen}
                       onClose={() => setIsErrorOpen(false)}
                     />
                      )}
              
                      {success && (
                        
                        <StatusModal
                        type="success"
                        title={success}
                        message="Your booking has updated successfult."
                        isOpen={isSuccessOpen}
                        onClose={() => setIsSuccessOpen(false)}
                      />
                 )}
                </div>
            </div>
        </div>
    );
};

export default BookingsCardUsers;
