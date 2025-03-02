import api from "@/Services/api";

const fetchBookingsFromAPI = async () => {
    try {
      const response = await api.get("/bookings");
      const bookings = response.data;
      return bookings;
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      return []; 
    }
  };
  
  const getBookedTimeSlots = (date, bookings) => {
    const filteredBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.booking_date);
      return (
        bookingDate.getFullYear() === date.getFullYear() &&
        bookingDate.getMonth() === date.getMonth() &&
        bookingDate.getDate() === date.getDate()
      );
    });
  
    const bookedSlots = filteredBookings.map(booking => {
      const startTime = booking.time;
      const executionTimeParts = booking.execution_time.split(':');
      const executionHours = parseInt(executionTimeParts[0]) || 0;
      const executionMinutes = parseInt(executionTimeParts[1]) || 0;
  
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const endDate = new Date(date);
      endDate.setHours(startHours);
      endDate.setMinutes(startMinutes + executionHours * 60 + executionMinutes);
  
      const endHours = String(endDate.getHours()).padStart(2, '0');
      const endMinutes = String(endDate.getMinutes()).padStart(2, '0');
      const endTime = `${endHours}:${endMinutes}`;
  
      return { start: startTime, end: endTime };
    });
  
    return bookedSlots;
  };
  
  const getBookedTimeSlotsForDate = async (selectedDate) => {
    const bookings = await fetchBookingsFromAPI();
    const bookedTimeSlots = getBookedTimeSlots(selectedDate, bookings);
    return bookedTimeSlots;
  };
  
  export default getBookedTimeSlotsForDate;