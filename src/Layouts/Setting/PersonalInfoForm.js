import { useState, useEffect } from 'react';
import api from '@/Services/api';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingCard from '@/Component/LoadingCard';
import StatusModal from "@/Component/StatusModal";

const PersonalInfoForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(false);
  const [errorModal, setErrorModal] = useState(null);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);


  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/my-info');
        const { name, email, phone } = response.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put('/change-info', {
        name,
        email,
        phone,
      });
      setSuccess('Info updated:', response.data);
      setIsSuccessOpen(true);
    } catch (err) {
      setErrorModal('Failed to update personal information.');
      setIsErrorOpen(true);
    }
  };

  if (loading) {
    return <LoadingCard/>;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className='flex flex-col min-h-[100dvh]'>
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
    <div className="bg-muted p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-firstColor text-white py-2 px-4 rounded-full hover:bg-bink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
      >
        Save Info
      </button>
      {errorModal && (
                <StatusModal
                  type="error"
                  title="Error Occurredr"
                  message={errorModal}
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
    </form>
    </div>
  );
}
export default PersonalInfoForm;