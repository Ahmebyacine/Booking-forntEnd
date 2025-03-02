import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import api from '@/Services/api';
import { countStatuses } from '@/Utils/calculateStatusCount';
import LoadingCard from '@/Component/LoadingCard';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ServiceBookingsChartMonthly = ({ year }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchServiceBookings = async () => {
        const userId = localStorage.getItem('userId');
        const date = new Date();
        const month = date.getMonth() + 1;
      try {
        const response = await api.get(`/bookings/employee/${userId}`);
        const count = countStatuses(response.data);
        const data2024 = count[year].monthlyStatistics[month].servicesSummary;
        setServiceData(data2024);
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
    labels: Object.keys(serviceData), // X-axis: service names
    datasets: [
      {
        label: 'Number of Bookings',
        data: Object.values(serviceData).map(item => item.count), // Y-axis: number of bookings
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

export default  ServiceBookingsChartMonthly;