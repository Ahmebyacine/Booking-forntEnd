import { useState, useRef, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs';
import api from "@/Services/api";
import BookingForm from "@/Layouts/Users/BookingForm";
import StatusModal from "@/Component/StatusModal";

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState(dayjs());
  const [userId, setUserId] = useState("");
  const [number, setNumber] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const bookingFormRef = useRef(null);
  const messageRef = useRef(null);
  const [timeError, setTimeError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.userId);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        const availableServices = response.data.filter((service) => service.availability);
        setServices(availableServices);
        if (availableServices.length > 0) {
          setService(availableServices[0]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getUserIdFromToken();
    fetchServices();
  }, []);

  useEffect(() => {
    if (service) {
      setTotalPrice(service.price * number);
    }
  }, [service, number]);

  const handleTimeChange = (newTime) => {
    setTime(newTime);
    setTimeError(null);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!time || !time.isValid()) {
      setError("Please select a valid time.");
      setLoading(false);
      return;
    }

    const selectedTime = dayjs(time);
    const minTime = dayjs().hour(9).minute(0);
    const maxTime = dayjs().hour(18).minute(0);

    if (selectedTime.isBefore(minTime) || selectedTime.isAfter(maxTime) || timeError) {
      setError("Please select a time between 09:00 and 18:00.");
      setLoading(false);
      return;
    }

    const bookingData = {
      user_id: userId,
      service_id: service._id,
      booking_date: date,
      execution_time: service.execution_time,
      number,
      time: time.format("HH:mm"),
    };

    try {
      const response = await api.post(`/bookings`, bookingData);
      if (response.status === 200) {
        setSuccess("Booking successful!");
        setBookingSuccess(prev => !prev);
        setIsSuccessOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error:The operation could not be completed. Please try again or contact support if th issue persists");
      setIsErrorOpen(true)
    } finally {
      setLoading(false);
      scrollToMessage();
    }
  };

  const scrollToMessage = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getTodayDate = () => {
    return dayjs().format("YYYY-MM-DD");
  };

  return (
    <div className="flex flex-col min-h-dvh">
      <section ref={bookingFormRef} id="booking-form" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="service" className="block font-medium text-gray-700">
                Service
              </label>
              <select
                id="service"
                className="block h-10 w-full mt-1 border-black-300 rounded-md shadow-sm"
                value={service ? service._id : ""}
                onChange={(e) => {
                  const selectedService = services.find(s => s._id === e.target.value);
                  setService(selectedService);
                }}
              >
                {services.map(service => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="block font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                min={getTodayDate()}
                onChange={(e) => setDate(e.target.value)}
                className="block h-10 w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="time" className="block font-medium text-gray-700">
                Time
              </label>
              <BookingForm
                date={date}
                time={time}
                onTimeChange={handleTimeChange}
                setTimeError={setTimeError}
                bookingSuccess={bookingSuccess}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="people" className="block font-medium text-gray-700">
                Number of People
              </label>
              <input
                type="number"
                id="people"
                min="1"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="block h-10 w-full mt-1 border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          <div className="bg-secondColor rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-bold">Booking Summary</h2>
            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium">Service:</p>
              <p>{service ? service.name : ""}</p>
              <p className="font-medium">Date:</p>
              <p>{date}</p>
              <p className="font-medium">Time:</p>
              <p>{time.format("HH:mm")}</p> 
              <p className="font-medium">People:</p>
              <p>{number}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-lg font-bold">Total: $ {totalPrice}</p>
            </div>

            <button
              className="w-full bg-firstColor rounded-full text-white py-2 px-4 shadow-md"
              onClick={handleBooking}
              disabled={loading || !service || !date || !time || timeError}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </button>

            {error && (
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
              message="Your booking has been booked successfully."
              isOpen={isSuccessOpen}
              onClose={() => setIsSuccessOpen(false)}
            />
            )}
          </div>
        </div>
      </section>

      <div ref={messageRef}></div>
    </div>
  );
}