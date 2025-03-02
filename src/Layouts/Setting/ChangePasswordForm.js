import { useState } from 'react';
import api from '@/Services/api';
import TriangleAlertIcon from '@/Assets/Icons/TriangleAlertIcon';
import StatusModal from '@/Component/StatusModal';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // for validating passwords match
  const [error, setError] = useState(null);  
  const [success, setSuccess] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setPasswordsMatch(false); // show error
      return; // prevent form submission
    }

    try {
      await api.put('/change-password', {
        currentPassword,
        newPassword,
        confirmPassword,
      });

      setSuccess('Password change submitted');
      setIsSuccessOpen(true);
      setError(false);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordsMatch(true);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(true);
  };

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <form onSubmit={handleSubmit} className="bg-white rop-6 mb-6">
        <div className="bg-muted p-8 flex items-center justify-center">
        <div className="max-w-md w-full space-y-6">
         <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
         <div className="space-y-4">
           <div>
             <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
             <input
               type="password"
               id="currentPassword"
               value={currentPassword}
               onChange={(e) => setCurrentPassword(e.target.value)}
               required
               className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             />
           </div>
           <div>
             <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
             <input
               type="password"
               id="newPassword"
               value={newPassword}
               onChange={handleNewPasswordChange}
               required
               className={`mt-1 block w-full border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
             />
           </div>
           <div>
             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
             <input
               type="password"
               id="confirmPassword"
               value={confirmPassword}
               onChange={handleConfirmPasswordChange}
               required
               className={`mt-1 block w-full border ${passwordsMatch ? 'border-gray-300' : 'border-red-500'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
             />
             {!passwordsMatch && (
               <p className="text-red-500 text-sm">Passwords do not match</p>
             )}
           </div>
         </div>
         <button
           type="submit"
           className="w-full bg-firstColor text-white py-2 px-4 rounded-full hover:bg-bink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
           disabled={!passwordsMatch}
         >
           Save Password
         </button>
         {error && (
           <div className="flex items-center p-4 mt-4 bg-red-100 text-red-700 rounded-md">
             <TriangleAlertIcon className="mr-2 w-6 h-6" />
             <p className="font-medium">{error}</p>
           </div>
         )}
    
         {success && (
           <StatusModal
             type="success"
             title={success}
             message="Your password has been changed successfully."
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