import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import api from '@/Services/api';
import LoadingCard from '@/Component/LoadingCard';

// Register Chart.js modules
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineGraph = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyBookingCounts, setMonthlyBookingCounts] = useState([]);
  const [monthlyBookingValues, setMonthlyBookingValues] = useState([]);

  useEffect(() => {
    const fetchBookingStatistics = async () => {
      try {
        const response = await api.get('/bookingsStaticsMonthly');
        const { monthlyBookingCounts, monthlyBookingValues } = response.data;
        setMonthlyBookingCounts(monthlyBookingCounts);
        setMonthlyBookingValues(monthlyBookingValues);
        setLoading(false);
      } catch (err) {
        setError('Error fetching booking statistics');
        setLoading(false);
      }
    };

    fetchBookingStatistics();
  }, []);

  if (error) return <p>{error}</p>;

  const dataNumber = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ], // X-axis labels for months
    datasets: [
      {
        label: 'Total Bookings',
        data: monthlyBookingCounts, // Y-axis data for total bookings
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        pointBackgroundColor: 'rgba(75,192,192,1)',
        tension: 0.3,
      }
    ],
  };
  const dataValue = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ], // X-axis labels for months
    datasets: [
      {
        label: 'Total Booking Values ($)',
        data: monthlyBookingValues, // Y-axis data for total booking values
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        pointBackgroundColor: 'rgba(255,99,132,1)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bookings Statistics by Month',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
    <div className="lg:flex">
    <div className="md:w-full h-[300px] md:h-[500px] lg:w-1/2">
      <Line data={dataNumber} options={options} />
    </div>
    <div className="md:w-full h-[300px] md:h-[500px] lg:w-1/2">
      <Line data={dataValue} options={options} />
    </div>
    </div>
    { loading && (
            <LoadingCard />
            )}
    </>
  );
};

export default LineGraph;