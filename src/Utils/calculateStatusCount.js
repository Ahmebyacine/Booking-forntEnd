export const countStatuses = (data) => {
  const result = {};

  // Iterate over each booking
  data.forEach(booking => {
    const bookingDate = new Date(booking.booking_date);
    const year = bookingDate.getFullYear();
    const month = bookingDate.getMonth() + 1; // getMonth() is zero-based, so we add 1
    const status = booking.status;
    const price = booking.service_price;
    const serviceName = booking.service_name;

    // Initialize year if not present
    if (!result[year]) {
      result[year] = {
        monthlyStatistics: {},
        yearlyStatistics: {
          statusCounts: {},
          servicesSummary: {}
        }
      };
    }

    // Initialize month if not present
    if (!result[year].monthlyStatistics[month]) {
      result[year].monthlyStatistics[month] = {
        statusCounts: {},
        servicesSummary: {}
      };
    }

    // Initialize status in the month if not present
    if (!result[year].monthlyStatistics[month].statusCounts[status]) {
      result[year].monthlyStatistics[month].statusCounts[status] = {
        count: 0,
        total_price: 0
      };
    }

    // Initialize status in the year if not present
    if (!result[year].yearlyStatistics.statusCounts[status]) {
      result[year].yearlyStatistics.statusCounts[status] = {
        count: 0,
        total_price: 0
      };
    }

    // Initialize service summary in the month if not present
    if (!result[year].monthlyStatistics[month].servicesSummary[serviceName]) {
      result[year].monthlyStatistics[month].servicesSummary[serviceName] = {
        count: 0,
        total_revenue: 0
      };
    }

    // Initialize service summary in the year if not present
    if (!result[year].yearlyStatistics.servicesSummary[serviceName]) {
      result[year].yearlyStatistics.servicesSummary[serviceName] = {
        count: 0,
        total_revenue: 0
      };
    }

    // Count statuses and accumulate prices for the month
    result[year].monthlyStatistics[month].statusCounts[status].count++;
    result[year].monthlyStatistics[month].statusCounts[status].total_price += price;

    // Count statuses and accumulate prices for the year
    result[year].yearlyStatistics.statusCounts[status].count++;
    result[year].yearlyStatistics.statusCounts[status].total_price += price;

    // Track service usage and revenue for the month
    result[year].monthlyStatistics[month].servicesSummary[serviceName].count++;
    result[year].monthlyStatistics[month].servicesSummary[serviceName].total_revenue += price;

    // Track service usage and revenue for the year
    result[year].yearlyStatistics.servicesSummary[serviceName].count++;
    result[year].yearlyStatistics.servicesSummary[serviceName].total_revenue += price;
  });

  return result;
};