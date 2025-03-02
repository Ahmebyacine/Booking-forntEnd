export default function getBookingStats(bookings) {
    const totalBookings = bookings.length;
    let completedBookings;
    if(!totalBookings){
       completedBookings = bookings.filter(booking => booking.status === "Completed").length;
     }else{
      completedBookings=0;
     }
  
    return {
      totalBookings,
      completedBookings
    };
  }