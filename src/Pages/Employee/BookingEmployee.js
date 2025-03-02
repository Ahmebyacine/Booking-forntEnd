import React, { useEffect, useState } from 'react';
import BookingsCard from "@/Layouts/Employee/BookingEmployeeCard";
import api from '@/Services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CheckCircleIcon, XCircleIcon, ClockIcon, AdjustmentsHorizontalIcon,ChevronDownIcon} from '@heroicons/react/24/solid';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingPage from '@/Pages/Common/LoadingPage';

const statuses = [
  { id: 'all', name: 'All', icon: AdjustmentsHorizontalIcon },
  { id: 'pending', name: 'Pending', icon: ClockIcon },
  { id: 'Confirmed', name: 'Confirmed', icon: ClockIcon },
  { id: 'Completed', name: 'Completed', icon: CheckCircleIcon },
  { id: 'Cancelled', name: 'Cancelled', icon: XCircleIcon },
];

function BookingEmployee() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentView, setCurrentView] = useState('current');
  const [currentStatus, setCurrentStatus] = useState('all');

  const [isOpen, setIsOpen] = useState(false);



  useEffect(() => {
    const fetchBookings = async () => {
        try {
          const userId = localStorage.getItem('userId');
      
          const response = await api.get(`/bookings/employee/${userId}`);
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
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStatusChange = (statusId) => {
    setCurrentStatus(statusId);
    setIsOpen(false);
  };


  const filteredBookings = bookings.filter(booking => {
    const bookingDate = new Date(booking.booking_date);

    // Filter by status
    if (currentStatus !== 'all' && booking.status.toLowerCase() !== currentStatus.toLowerCase()) {
      return false;
    }

    // Filter by selected date
    if (selectedDate) {
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === selectedDate.getTime();
    }

    if (currentView === 'archive') return booking.archive;
    return !booking.archive;
  });
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return <LoadingPage/>}

  return (
    <>
    <div className="flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 m-1">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto">
          <div className="flex align-center sm:h-16">
            <div className="flex items-center md:w-1/3 lg:w-2/3 mb-4 sm:mb-0">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full"
                placeholderText="Select a date"
              />
            </div>
          <div className='flex align-center'>
            <div className="md:hidden flex ml-8 align-center">
               <button
                 onClick={() => setIsOpen(!isOpen)}
                 className="h-10 flex items-center mr-1 ml-auto px-2 border rounded-md border-firstColor text-sm font-medium"
               >
                 {currentStatus}
                 <ChevronDownIcon className="ml-1 mr-2 h-5 w-5" aria-hidden="true"/> 
               </button>
               {isOpen && (
                 <div className="origin-top-right absolute right-0 mt-2 w-2/3 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                   <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                     {statuses.map((status) => (
                       <button
                         key={status.id}
                         onClick={() => handleStatusChange(status.id)}
                         className={`${
                           currentStatus === status.id ? 'bg-secondColor text-gray-900' : 'text-gray-700'
                         } flex w-full px-4 py-4 text-sm text-left hover:bg-gray-100 hover:text-gray-900`}
                         role="menuitem"
                       >
                         <status.icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                         {status.name}
                       </button>
                     ))}
                   </div>
                 </div>
               )}
           </div>
            <div className="hidden md:flex items-center justify-center sm:justify-start w-full">
              <div className="flex justify-around w-full">
                {statuses.map((status) => (
                  <button
                    key={status.id}
                    onClick={() => setCurrentStatus(status.id)}
                    className={`inline-flex items-center mx-1 p-2 border rounded-md text-sm font-medium ${
                      currentStatus === status.id
                        ? 'bg-firstColor text-white'
                        : 'border-secondColor text-firstGray hover:bg-secondColor'
                    }`}
                  >
                    <status.icon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    {status.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </header>

      <div className="flex border-b pb-2 border-gray-200">
        <button
          className={`flex-1 py-2 text-lg text-firstColor font-bold transition-colors duration-300 ${
            currentView === 'current' ? 'bg-secondColor' : 'bg-white hover:bg-bink-50'
          }`}
          onClick={() => setCurrentView('current')}
        >
          Current
        </button>
        <button
          className={`flex-1 py-2 text-lg text-firstColor font-bold transition-colors duration-300 ${
            currentView === 'archive' ? 'bg-secondColor' : 'bg-white hover:bg-bink-50'
          }`}
          onClick={() => setCurrentView('archive')}
        >
          Archive
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBookings.map((booking) => (
          <BookingsCard key={booking._id} booking={booking}/>
        ))}
      </div>
      </div>
    </>
  );
}

export default BookingEmployee;
