import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from "react-router-dom";
import api from'@/Services/api';

const iconMap = {
  'Haircut & Styling': Scissors,
  'Color & Highlights': Star,
  'Hair Treatments': Clock,
  'Nail Services': DollarSign,
};

const Landing = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get('/allServices');
        const servicesWithIcons = response.data.map(service => ({
          ...service,
          icon: iconMap[service.name] || null,
        }));
        setServices(servicesWithIcons);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-firstGradient">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-firstColor"
          >
            Glamour Salon
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/booking" className="bg-firstColor text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors">
              Book Now
            </Link>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="text-center py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-firstGray"
          >
            Discover Your Perfect Look
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-secondGray mb-8"
          >
            Experience luxury and style with our professional salon services
          </motion.p>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-firstGray">Our Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <service.icon className="w-12 h-12 text-firstColor mb-4" />
                <h4 className="text-xl font-semibold mb-2 text-firstGray">{service.name}</h4>
                <p className="text-secondGray">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-secondColor p-12 rounded-lg"
          >
            <h3 className="text-3xl font-bold mb-4 text-firstGray">Ready to Transform Your Look?</h3>
            <p className="text-xl text-secondGray mb-8">Book your appointment today and let our experts take care of you</p>
            <Link 
              to="/booking" 
              className="whitespace-nowrap bg-firstColor text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Book Your Appointment
            </Link>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-secondGray mb-4 md:mb-0">&copy;{new Date().getFullYear()} Glamour Salon. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/login" className="text-firstColor hover:text-pink-800 transition-colors">Login</Link>
              <Link to="/signup" className="text-firstColor hover:text-pink-800 transition-colors">Sign Up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;