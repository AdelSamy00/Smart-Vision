import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { handleMultipleFilesUpload } from '../utils';
import Loading from '../components/Loading';
import { TextField, Button, Grid } from '@mui/material';

function BookingServiceForm() {
  const { state } = useLocation();
  const [images, setImages] = useState([{}]);
  const service = state ? state.service : null;
  const { customer } = useSelector((state) => state.customer);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ServiceName: '',
    phoneNumber: '',
    address: '',
    description: '',
    images: [{}],
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(images);
      const uploadedImages =
        images && (await handleMultipleFilesUpload(images));

      console.log('Uploaded Image URL:', uploadedImages);
      const response = await axios.post('/customers/service', {
        id: customer._id,
        service: service.title,
        description: formData.description,
        images: uploadedImages,
        phone: formData.phoneNumber,
        address: formData.address,
      });
      if (response.data.success) {
        setFormSubmitted(true);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to submit the form:', error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2
        style={{ fontSize: '20px', fontWeight: 'bold', paddingBottom: '20px' }}
      >
        If You Need To Book This Service Fill This Form .
      </h2>
      {loading && <Loading />}
      {!formSubmitted && !loading && (
        <form onSubmit={handleSubmit} className="Form">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Service Name"
                variant="outlined"
                name="ServiceName"
                value={service.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                name="address"
                multiline
                rows={2}
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
          <div className="p-2 w-full" style={{ marginTop: '15px' }}>
            <div className="relative flex justify-items-center gap-2">
              <input
                type="file"
                id="images"
                name="images"
                className="uploadBtn file:hidden text-gray-700 bg-gray-300 w-1/4"
                onChange={(e) => {
                  setImages(e.target.files);
                }}
                multiple
              />
              <label
                htmlFor="image"
                className="leading-7 text-sm text-gray-600 mt-1"
              >
                uploadFile
              </label>
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: '#009688',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        </form>
      )}
      {formSubmitted && (
        <div>
          <p className="text-green-500 mt-3">
            Thank you! We will get in touch with you in a few days.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookingServiceForm;
