import ServiceBookingsChart from './ServiceBookingsChart';

const BookingsByLocation = () => {
    return (
        <div
          className="rounded-lg border bg-card text-card-foreground shadow-sm"
          data-v0-t="card"
        >
          <ServiceBookingsChart year={2024}/>
        </div>
    );
}

export default BookingsByLocation;