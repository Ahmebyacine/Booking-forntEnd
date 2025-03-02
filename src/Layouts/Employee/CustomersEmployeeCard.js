import { useEffect ,useState } from "react";
import { UserCircleIcon, UsersIcon, CalendarIcon } from '@heroicons/react/24/solid'
import api from '@/Services/api';
import DeleteIcon from '@/Assets/Icons/DeleteIcon';
import ConfirmationModal from "@/Component/ConfirmationModal";
import { Snackbar } from "@mui/material";
import getBookingStats from "@/Utils/GetBookingStats";
import StatusModal from "@/Component/StatusModal";
import LoadingCard from "@/Component/LoadingCard";

export default function CustomersEmployeeCard ({ user ,onUpdate  }) {
  const [loading, setLoading] = useState(true);
  const [allBooking, setAllBooking] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  useEffect(() => {  
    const fetchBookings = async () => {
      try {
        const response = await api.get(`/bookings/user/${user._id}`);
        const stats = getBookingStats(response.data);
        setAllBooking(stats.totalBookings);
        setCompletedBookings(stats.completedBookings);
      } catch (error) {
        setError(error.message);
        setIsErrorOpen(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user._id]);
  // Function to handle user deletion
  const handleDelete = async () => {
    try {
      await api.delete(`/users/${user._id}`);
      setIsDeleteModalOpen(false);
      setSnackbarMessage('Item deleted successfully!');
      setSnackbarOpen(true);
      setTimeout(onUpdate,3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError('an Error in delete the user');
      setIsErrorOpen(true);
    }
  };

  return (
    <>
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col items-center pb-4 pt-8">
        <UserCircleIcon className="mb-3 h-24 w-24 rounded-full text-gray-400" />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
        <div className="mt-4 flex space-x-3 md:mt-6">
          <button onClick={() => setIsDeleteModalOpen(true)} 
           className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            <DeleteIcon/>
            </button>
        </div>
      </div>
      <div className="flex justify-center space-x-4 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <CalendarIcon className="h-6 w-6 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{allBooking}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">All Project</span>
        </div>
        <div className="flex flex-col items-center">
          <UsersIcon className="h-6 w-6 text-gray-400" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{completedBookings}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Completed Bookings</span>
        </div>
      </div>
    </div>
    { loading && (
            <LoadingCard />
             )}
    { error && (
            <StatusModal
              type="error"
              title="Error Occurredr"
              message={error}
              isOpen={isErrorOpen}
              onClose={() => setIsErrorOpen(false)}
            />
             )}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message='Are you sure you want to delete this user? This action cannot be undone.'
        confirmText="Delete"
        confirmColor="#f44336"
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  )
}