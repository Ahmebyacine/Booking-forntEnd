import { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import getBookedTimeSlotsForDate from '@/Utils/getBookedTimeSlots';

const BookingForm = ({ date, time, onTimeChange, setTimeError, bookingSuccess }) => {
  const [bookedTimeRanges, setBookedTimeRanges] = useState([]);

  useEffect(() => {
    const selectedDate = new Date(date);
    const fetchBookedTimeSlots = async () => {
      const slots = await getBookedTimeSlotsForDate(selectedDate);
      setBookedTimeRanges(slots);
    };

    fetchBookedTimeSlots();
  }, [date, bookingSuccess]);
  const isTimeInRange = useCallback((timeValue) => {
    if (bookedTimeRanges.length === 0) return false;
    const formattedTime = dayjs(timeValue).format('HH:mm');
    return bookedTimeRanges.some(({ start, end }) => {
      const startTime = dayjs(start, 'HH:mm');
      const endTime = dayjs(end, 'HH:mm');
      const currentTime = dayjs(formattedTime, 'HH:mm');
      return currentTime.isBetween(startTime, endTime, null, '[)');
    });
  }, [bookedTimeRanges]);

  const shouldDisableTime = (timeValue, viewType) => {
    const selectedHour = dayjs(timeValue).hour();
    const startDomainHour = 9;
    const endDomainHour = 18;

    if (viewType === 'hours') {
      return selectedHour < startDomainHour || selectedHour >= endDomainHour;
    }

    if (viewType === 'minutes') {
      return isTimeInRange(timeValue);
    }

    return false;
  };

  // Side effect to handle time errors separately from rendering
  useEffect(() => {
    if (time) {
      const isBooked = isTimeInRange(time);
      if (isBooked) {
        setTimeError("Selected time is already booked.");
      } else {
        setTimeError(false);
      }
    }
  }, [time, bookedTimeRanges, setTimeError, isTimeInRange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} sx={{ minWidth: 305 }}>
        <MobileTimePicker
          value={time}
          onChange={onTimeChange}
          timeSteps={{ hours: 1, minutes: 15 }}
          ampm={false}
          shouldDisableTime={shouldDisableTime}
          renderInput={(params) => <input {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}
export default BookingForm;