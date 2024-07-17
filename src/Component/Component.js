import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./styles.css";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (err) {
      setError("An error occurred while booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
        <></>
      <div className="container">
        <section className="hero-section">
          <div className="content">
            <h1 className="title">Book Our Premium Services</h1>
            <p className="description">
              Experience the best services tailored to your needs. Book now and let us take care of everything.
            </p>
            <Link to="#" className="book-button">Book Now</Link>
          </div>
        </section>
        <section id="booking-form" className="form-section">
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select id="service" className="form-control">
                <option value="massage">Massage</option>
                <option value="facial">Facial</option>
                <option value="manicure">Manicure</option>
                <option value="pedicure">Pedicure</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input type="time" id="time" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="people">Number of People</label>
              <input type="number" id="people" min="1" defaultValue="1" className="form-control" />
            </div>
          </div>
          <div className="summary">
            <h2 className="summary-title">Booking Summary</h2>
            <div className="summary-content">
              <p className="summary-item"><span>Service:</span> Massage</p>
              <p className="summary-item"><span>Date:</span> 2023-07-01</p>
              <p className="summary-item"><span>Time:</span> 14:00</p>
              <p className="summary-item"><span>People:</span> 2</p>
            </div>
            <div className="total">
              <p className="total-text">Total: $100</p>
            </div>
            <button className="complete-button" onClick={handleBooking} disabled={loading}>
              {loading ? (
                <div className="loading">
                  Loading...
                </div>
              ) : (
                "Complete Booking"
              )}
            </button>
          </div>
          {success && (
            <div className="success-message">
              <div className="icon">
                <CircleCheckIcon className="icon" />
              </div>
              <div className="message">
                <p className="text">Booking successful!</p>
              </div>
            </div>
          )}
          {error && (
            <div className="error-message">
              <div className="icon">
                <TriangleAlertIcon className="icon" />
              </div>
              <div className="message">
                <p className="text">{error}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  </Router>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function TriangleAlertIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </