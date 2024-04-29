import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { t } from 'i18next';
import { setOptionsForTranslate } from '../../utils';

const UpdateMatrialForm = () => {
  const { matrialId } = useParams();
  const [matrialData, setMatrialData] = useState({
    id: matrialId,
    name: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`/Materials/${matrialId}`);
        setMatrialData(response.data.material);
        //console.log(response.data.material);
      } catch (error) {
        console.error('Error fetching material details:', error);
      }
    };

    fetchMaterialDetails();
  }, [matrialId]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === 'quantity' && value < 0) {
      value = 0;
    }
    setMatrialData({ ...matrialData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(matrialData);
    try {
      const translationRes = await axios.request(
        setOptionsForTranslate([matrialData.name])
      );
      console.log(translationRes.data);
      const response = await axios.put(`/Materials/`, {
        id: matrialId,
        name: matrialData.name,
        quantity: matrialData.quantity,
      });
      toast.dismiss();
      toast.success(t('addSuccessfully'));
    } catch (error) {
      console.error('Error updating material:', error);
      toast.error(t('FailedTryAgain'));
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
            value={matrialData.name}
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
            value={matrialData.quantity}
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
              {t('update')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateMatrialForm;
