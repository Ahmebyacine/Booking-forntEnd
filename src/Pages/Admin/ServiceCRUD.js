import React, { useState, useEffect } from 'react';
import ServiceCard from '@/Layouts/Admin/ServiceCard';
import api from '@/Services/api';
import Modal from '@/Layouts/Admin/Modal';
import DurationInput from '@/Layouts/Admin/DurationInput';
import StatusModal from '@/Component/StatusModal';
import { Snackbar } from '@mui/material';
import ConfirmationModal from '@/Component/ConfirmationModal';
import ErrorPage from '@/Pages/Common/ErrorPage';
import LoadingPage from '@/Pages/Common/LoadingPage';

const Service = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorModal, setErrorModal] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    availability:true,
    execution_time: ''
  });
  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  const onDeleteRender =()=>{
    fetchServices();
  }
 
  const handleAddService = async () => {
    try {
      const response = await api.post('/services', formData);
      setServices([...services, response.data]);
      setFormData({
        name: '',
        description: '',
        price: '',
        availability:true,
        execution_time: ''
      });
      setIsModalOpen(false);
      setSnackbarMessage('Add Service Success!.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setErrorModal('An error whene adding your service');
      setIsErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServiceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenSubmite = (event) => {
    event.preventDefault();
    setIsAddModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return <LoadingPage/>}
  return (
    <div className="container mx-auto py-8 px-4">
        <div className="">
          <button
            onClick={handleCreateServiceClick}
            className="fixed bottom-4 right-4 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-firstColor text-white hover:bg-bink-300 h-10 pr-2 py-2"
          >
            <span className='text-xl px-2'>+</span>
            Create Service
          </button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} onDeleteRender={onDeleteRender}/>
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="popover-content sm:min-w-[300px] sm:max-w-[500px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Add New Service</h3>
              </div>
              <form className="grid gap-4" onSubmit={handleOpenSubmite}>
                <div className="grid gap-2">
                  <label htmlFor="name">Service Name</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-10 block w-full mb-2 border border-muted p-2 rounded"
                    placeholder="Enter service name"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter service description"
                    className="min-h-[100px] p-2"
                  ></textarea>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="price">Price</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    className="h-10 block w-full mb-2 border border-muted p-2 rounded"
                    placeholder="Enter price"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="execution_time">Duration</label>
                  <DurationInput 
                  setDuration={(newDuration) => setFormData(prevData => ({ ...prevData, execution_time: newDuration }))}
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-firstColor hover:bg-secondColor hover:border-firstColor hover:text-black h-10"
                >
                  Save Service
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      { errorModal && (
        <StatusModal
          type="error"
          title="Error Occurredr"
          message={errorModal}
          isOpen={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
        />
         )}
    <ConfirmationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddService}
        title="Confirm Add"
        message="Are you sure you want to add this service?"
        confirmText="Add"
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
    </div>
  );
};

export default Service;