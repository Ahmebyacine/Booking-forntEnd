import React, { useEffect, useState } from 'react';
import BookingsCardUsers from "@/Layouts/Users/BookingCardUsers";
import api from '@/Services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingPage from '@/Pages/Common/LoadingPage';

function BookingUsers() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('current');
  const [selectedDate, setSelectedDate] = useState(null);
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));

  useEffect(() => {

    const fetchBookings = async () => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
      try {
        const response = await api.get(`/bookings/user/${userId}`);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const updatedBookings = response.data.map(booking => {
          const bookingDate = new Date(booking.booking_date);
          if (bookingDate < today) {
            return { ...booking, archive: true };
          }
          return { ...booking, archive: false };
        });
        setBookings(updatedBookings);
      } catch (error) {
        setError(error.response.data);
      } finally {
        setLoading(false);
      }
      
    };
    fetchBookings();
  }, [userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.booking_date);

    // Filter by selected date
    if (selectedDate) {
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === selectedDate.getTime();
    }

    // Filter by current view (current or archive)
    if (currentView === 'archive') return booking.archive;
    return !booking.archive;
  });
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return <LoadingPage/>}

  return (
    <>
    <div className="flex-1 flex-col gap-4 md:gap-8 md:p-6">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-4">
          <DatePicker 
            selected={selectedDate} 
            onChange={handleDateChange} 
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
            placeholderText="Select a date"
          />
        </div>
      </header>
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 text-lg font-bold text-firstColor transition-colors duration-300 ${
            currentView === 'current' ? 'bg-secondColor' : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => setCurrentView('current')}
        >
          Current
        </button>
        <button
          className={`flex-1 py-2 text-lg font-bold text-firstColor transition-colors duration-300 ${
            currentView === 'archive' ? 'bg-secondColor' : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => setCurrentView('archive')}
        >
          Archive
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2">
        {filteredBookings.map((booking) => (
          <BookingsCardUsers key={booking._id} booking={booking}/>
        ))}
      </div>
      </div>
   </>
  );
}

export default BookingUsers;