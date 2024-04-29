import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { setOptionsForTranslate } from '../../utils';
import { apiRequest } from '../../utils';
import { useSelector } from 'react-redux';

const AddMatrialForm = () => {
  const { t } = useTranslation();
  const { employee } = useSelector((state) => state?.employee);
  const [productData, setProductData] = useState({
    name: '',
    quantity: '',
  });

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'quantity' && value < 0) {
      value = 0;
    }

    setProductData({ ...productData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiRequest({
        url: '/materials/',
        method: 'POST',
        data: productData,
        token: employee?.token,
      });
      if (response?.data?.success) {
        setProductData({
          name: '',
          quantity: '',
        });
        toast.dismiss();
        toast.success(t('addSuccessfully'));
      } else {
        toast.error(t('FailedToAddMaterial'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(t('FailedToAddMaterial'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-4/5 m-auto py-7 max-w-4xl">
      <Toaster
        toastOptions={{
          style: {
            duration: 3000,
            border: '1px solid #6A5ACD',
            backgroundColor: '#6A5ACD',
            padding: '16px',
            color: 'white',
            fontWeight: 'Bold',
            marginTop: '65px',
            textAlign: 'center',
          },
        }}
      />
      <Grid container spacing={2} sx={{ marginTop: '6rem' }}>
        <Grid item xs={12} sm={6}>
          <label className="mb-2" htmlFor="name">
            {t('productName')} *
          </label>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <label className="mb-2" htmlFor="Quantity">
            {t('quantity')} *
          </label>
          <TextField
            fullWidth
            id="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid container style={{ marginTop: '20px' }}>
          <Grid item xs={12} style={{ display: 'flex' }}>
            <Button
              type="submit"
              variant="contained"
              style={{
                backgroundColor: '#edede9',
                color: 'black',
                margin: 'auto',
                fontSize: '20px',
              }}
            >
              {t('add')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddMatrialForm;
