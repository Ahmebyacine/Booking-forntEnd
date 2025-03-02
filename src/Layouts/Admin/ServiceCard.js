import React, { useState } from 'react';
import api from '@/Services/api';
import EditIcon from '@/Assets/Icons/EditIcon';
import DeleteIcon from '@/Assets/Icons/DeleteIcon';
import DurationInput from './DurationInput';
import StatusModal from '@/Component/StatusModal';
import { Snackbar } from '@mui/material';
import ConfirmationModal from '@/Component/ConfirmationModal';

const ServiceCard = ({ _id, name, description, price, availability, execution_time , onDeleteRender}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name, description, price, availability, execution_time });
  const [originalData, setOriginalData] = useState({ name, description, price, availability, execution_time });
  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const availabilityClass = formData.availability ? "bg-green-500" : "bg-red-500";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData);
  };

  const handleSave = async () => {
    try {
      await api.patch(`/services/${_id}`, formData);
      setOriginalData(formData);
      setIsEditing(false);
      setIsUpdateModalOpen(false);
      setSnackbarMessage('Service has been Updated successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating service:", error);
      setError('Service has not updating');
      setIsErrorOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/services/${_id}`);
      setSnackbarMessage('Service deleted successfully.');
      setSnackbarOpen(true);
      setTimeout(onDeleteRender,3000);
    } catch (error) {
      console.error("Error deleting service:", error);
      setError('Service has not deleted');
      setIsErrorOpen(true);
    }
  };

  return (
    <>
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all flex flex-col h-full">
      <div className="p-6 flex-1 space-y-4">
        {isEditing ? (
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mb-2 border border-muted p-2 rounded"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="block w-full mb-2 border border-muted p-2 rounded"
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="block w-full mb-2 border border-muted p-2 rounded"
            />
            <select
              name="availability"
              value={formData.availability ? "true" : "false"}
              onChange={(e) => setFormData(prevData => ({ ...prevData, availability: e.target.value === "true" }))}
              className="block w-full mb-2 border border-muted p-2 rounded"
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <div className="grid gap-2">
                  <DurationInput 
                  duration={formData.execution_time}
                  setDuration={(newDuration) => setFormData(prevData => ({ ...prevData, execution_time: newDuration }))}
                  />
                </div>
           </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p className="text-muted-foreground">{formData.description}</p>
            <div className="flex justify-between items-center">
              <div className="font-semibold">{formData.price}</div>
              <span className={`text-white px-2 py-1 rounded-full ${availabilityClass}`}>{formData.availability ? "Available" : "Unavailable"}</span>
            </div>
            <div className="text-muted-foreground">{formData.execution_time}</div>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 p-4 border-t border-muted">
        {isEditing ? (
          <>
            <button
              onClick={()=> setIsUpdateModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-firstColor hover:bg-bink-600 text-white h-8 w-20"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-gray-500 hover:bg-gray-600 text-white h-8 w-20"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
              <EditIcon/>
            </button>
            <button 
              onClick={()=> setIsDeleteModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
              < DeleteIcon />
            </button>
          </>
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
      </div>
    </div>
    <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        confirmColor="#f44336"
      />

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleSave}
        title="Confirm Update"
        message="Are you sure you want to change this service?"
        confirmText="Update"
        confirmColor="#db2777"
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
  );
};

export default ServiceCard;