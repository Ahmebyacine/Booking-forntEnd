import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "@/Services/api";
import { countStatuses } from "@/Utils/calculateStatusCount";
import LoadingCard from "@/Component/LoadingCard";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LineGraphBookingYearly = ({ year }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthlyBookingCounts, setMonthlyBookingCounts] = useState([]);
  const [monthlyBookingValues, setMonthlyBookingValues] = useState([]);

  useEffect(() => {
    const fetchBookingStatistics = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await api.get(`/bookings/employee/${userId}`);
        const statusCounts = countStatuses(response.data);
        // Extract 'Completed' status counts
        const data = statusCounts['2024'].monthlyStatistics;
        if (!data) {
          throw new Error("Monthly statistics data is missing");
        }

        // Initialize arrays to store booking counts and values for each month
        const counts = new Array(12).fill(0);
        const values = new Array(12).fill(0);

        // Loop through the data to extract 'Completed' status for each month
        Object.keys(data).forEach((monthKey) => {
            const monthData = data[monthKey];
            const statusCounts = monthData.statusCounts;
          
            if (statusCounts && statusCounts.Completed) {
              // Convert monthKey to an integer and map it to the correct index
              const monthIndex = parseInt(monthKey, 10) - 1; // Assuming keys are 1-based, e.g., 8 for August, 9 for September
              
              // Ensure that the monthIndex is valid (between 0 and 11)
              if (monthIndex >= 0 && monthIndex < 12) {
                counts[monthIndex] = statusCounts.Completed.count || 0;
                values[monthIndex] = statusCounts.Completed.total_price || 0;
              }
            }
          });

        setMonthlyBookingCounts(counts);
        setMonthlyBookingValues(values);
        setLoading(false);
      } catch (err) {
        setError("Error fetching booking statistics: " + err.message);
        setLoading(false);
      }
    };

    fetchBookingStatistics();
  }, [year]);
  if (error) return <p>{error}</p>;

  const dataNumber = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Completed Bookings",
        data: monthlyBookingCounts, // Y-axis data for completed bookings
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };

  const dataValue = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Completed Booking Values ($)",
        data: monthlyBookingValues, // Y-axis data for completed booking values
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Completed Bookings Statistics by Month",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="md:flex">
      <div className="md:w-full h-[300px] md:h-[500px] md:w-1/2">
        <Line data={dataNumber} options={options} />
        { loading && (
            <LoadingCard />
             )}
      </div>
      <div className="md:w-full h-[300px] md:h-[500px] md:w-1/2">
        <Line data={dataValue} options={options} />
        { loading && (
            <LoadingCard />
             )}
      </div>
    </div>
  );
};

export default LineGraphBookingYearly;
