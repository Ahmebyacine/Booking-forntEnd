import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

const DurationInput = ({ duration, setDuration }) => {

  const convertToDate = (durationStr) => {
    if (durationStr) {
      const [hours, minutes] = durationStr.split(':');
      return new Date(0, 0, 0, parseInt(hours), parseInt(minutes));
    }
    return new Date(0, 0, 0, 0, 0);
  };

  const initialTime = convertToDate(duration);

  const handleTimeChange = (newValue) => {
    if (newValue) {
      // Format the date object to "hh:mm"
      const formattedTime = format(newValue, 'HH:mm');
      setDuration(formattedTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label="Select Time"
        value={initialTime}
        onChange={handleTimeChange}
        timeSteps={{ hours: 1, minutes: 15 }}
        ampm={false}
        views={['hours', 'minutes']}
      />
    </LocalizationProvider>
  );
};

export default DurationInput;