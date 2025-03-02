const BookingsByLocation = ({ children }) => {
  return (
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm"
        data-v0-t="card"
      >
        {children}
      </div>
  );
}

export default BookingsByLocation;