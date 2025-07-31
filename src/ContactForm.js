
/**
 * ContactForm Component
 * 
* A contact form with fields for name, email, phone number, and message is rendered by this React component. 
 To handle form data, submission state, and validation errors, it makes use of React hooks (useState).
  *  When the form is submitted, the data is checked to make sure the phone number matches a 10-digit pattern and that all required fields are filled out accurately.  
 The form clears and displays the submitted data beneath it after a successful submission.  A CSS module imported as `styles` is used to apply styling.
 */

import React, { useState } from 'react';
import styles from './ContactForm.module.css';  // import CSS Module for scoped styling

function ContactForm() {
  // State to hold form input values
  const [formData, setFormData] = useState({ name: '', email: '', message: '', phone: '' });
  // State to hold submitted data for display after form submission
  const [submittedData, setSubmittedData] = useState(null);
  // State to hold validation error messages for each input
  const [errors, setErrors] = useState({});

  // Update formData state when any input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value })); // merge previous state with new input value
  };

  // Validate form fields and return an object with error messages
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';  // Name must not be empty
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';  // Email must contain '@'
    if (!formData.message.trim()) newErrors.message = 'Message is required';  // Message must not be empty
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Phone must be 10 digits';  // Phone must be exactly 10 digits
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    const validationErrors = validate(); // Validate form data
    if (Object.keys(validationErrors).length === 0) {  // If no errors
      setSubmittedData(formData); // Save submitted data for display
      setFormData({ name: '', email: '', message: '', phone: '' }); // Reset form fields
      setErrors({}); // Clear errors
    } else {
      setErrors(validationErrors); // Set errors to show messages
    }
  };

  // Render the form with inputs and validation error messages
  return (
    <div className={styles.container}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:<br />
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className={styles.input} 
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>} {/* Show name error if any */}
        </label><br /><br />

        <label>
          Email:<br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            className={styles.input} 
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>} {/* Show email error if any */}
        </label><br /><br />

        <label>
          Phone:<br />
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            className={styles.input} 
            pattern="\d{10}"  // HTML pattern to allow exactly 10 digits
            placeholder="Enter 10 digit phone number"
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>} {/* Show phone error if any */}
        </label><br /><br />

        <label>
          Message:<br />
          <textarea 
            name="message" 
            rows="5" 
            value={formData.message} 
            onChange={handleChange} 
            className={styles.textarea}
          ></textarea>
          {errors.message && <p className={styles.error}>{errors.message}</p>} {/* Show message error if any */}
        </label><br /><br />

        <button type="submit" className={styles.button}>Submit</button>
      </form>

      {/* Display submitted data after successful submission */}
      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre> {/* Pretty-print JSON */}
        </div>
      )}
    </div>
  );
}

export default ContactForm;

