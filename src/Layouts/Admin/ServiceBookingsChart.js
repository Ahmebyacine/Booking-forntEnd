import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '@/Services/api';
import LoadingCard from '@/Component/LoadingCard';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ServiceBookingsChart = ({ year }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchServiceBookings = async () => {
      try {
        const response = await api.get(`/servicesBookedForYear/${year}`);
        setServiceData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching service bookings');
        setLoading(false);
      }
    };

    fetchServiceBookings();
  }, [year]);

  if (error) return <p>{error}</p>;

  // Prepare the chart data
  const data = {
    labels: serviceData.map(item => item._id), // X-axis: service names
    datasets: [
      {
        label: 'Number of Bookings',
        data: serviceData.map(item => item.count), // Y-axis: number of bookings
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: `Number of Bookings Per Service in ${year}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[500px] lg:h-[400px]">
      <Bar data={data} options={options} />
      { loading && (
            <LoadingCard />
             )}
    </div>
  );
};

export default ServiceBookingsChart;