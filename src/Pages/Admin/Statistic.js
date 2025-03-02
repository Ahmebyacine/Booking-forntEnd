import AverageBookingValueCard from "@/Layouts/Admin/AverageBookingValueCard";
import BookingsByLocation from "@/Layouts/Admin/BookingsByLocationCard";
import LineGraph from "@/Layouts/Admin/LineGraph";
import NewCustomersCard from "@/Layouts/Admin/NewCustomersCard";
import TotalBookingCard from "@/Layouts/Admin/TotalBookingCard";

const Statistic = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-4 md:p-8 flex-1">
          <div className="grid gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <TotalBookingCard />
              <AverageBookingValueCard />
              <NewCustomersCard />
            </div>
            <LineGraph/>
          </div>
          <div className="grid gap-8">
            <BookingsByLocation />
          </div>
        </main>
      </div>
    </>
  );
};

export default Statistic;
