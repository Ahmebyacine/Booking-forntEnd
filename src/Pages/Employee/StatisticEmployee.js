import TotalBookingCardMonthly from "@/Layouts/Employee/Statistics/monthly/TotalBookingCardMonthly";
import TotalBookingComletedCardMonthly from "@/Layouts/Employee/Statistics/monthly/TotalBookingComletedCardMonthly";
import TotalBookingCardEmployee from "@/Layouts/Employee/Statistics/TotalBookingCardEmployeeYearly";
import TotalBookingValueCard from "@/Layouts/Employee/Statistics/TotalBookingComletedCardYearly";
import BookingsByLocation from "@/Layouts/Employee/Statistics/BookingByLocationYearly";
import ServiceBookingsChartYearly from "@/Layouts/Employee/Statistics/ServiceBookingChartYearly";
import ServiceBookingsChartMonthly from "@/Layouts/Employee/Statistics/monthly/ServiceBookingsChartMonthly";
import LineGraphBookingYearly from "@/Layouts/Employee/Statistics/LineGraphBookingComletedYearly";

const StatisticEmployee = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-4 md:p-8 flex-1">
          <div className="grid gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <TotalBookingCardEmployee />
               <TotalBookingValueCard />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <TotalBookingCardMonthly />
               <TotalBookingComletedCardMonthly />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            </div>
          </div>
          <div className="grid gap-8">
           <BookingsByLocation>
             <ServiceBookingsChartYearly year={2024} />
           </BookingsByLocation>
           <BookingsByLocation>
             <ServiceBookingsChartMonthly year={2024} />
           </BookingsByLocation>
          </div>
        </main>
              <LineGraphBookingYearly year={2024}/>
      </div>
    </>
  );
};

export default StatisticEmployee;
