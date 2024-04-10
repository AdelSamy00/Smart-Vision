import React, { useState, useRef, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import './EngineerStyleSheets/CustomizedOrderForm.css';
import { apiRequest, handleFileUpload } from '../../utils';
import { useSelector } from 'react-redux';

const CustomOrderForm = ({ socket, setSocket }) => {
  const { requestId } = useParams();
  const [error, setError] = useState('');
  const { employee } = useSelector((state) => state.employee);
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    description: '',
    materials: [],
    additionalDetails: '',
    newMaterialName: '',
    newMaterialQuantity: '',
  });
  const [customOrder, setCustomOrder] = useState('');
  const newMaterialNameRef = useRef(null);
  const newMaterialQuantityRef = useRef(null);
  console.log(requestId);
  useEffect(() => {
    const fetchCustomOrder = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/employees/services/${requestId}`,
        });
        setCustomOrder(response.data.service[0]);
        console.log(response.data.service[0].customer.username);
      } catch (error) {
        console.error('Error fetching custom order:', error);
      }
    };

    fetchCustomOrder();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleQuantityKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (orderDetails.newMaterialName.trim() !== '') {
        addMaterial();
      }
    }
  };

  const addMaterial = () => {
    const { newMaterialName, newMaterialQuantity } = orderDetails;
    if (newMaterialName && newMaterialQuantity) {
      setOrderDetails({
        ...orderDetails,
        materials: [
          ...orderDetails.materials,
          {
            material: newMaterialName,
            quantity: newMaterialQuantity,
          },
        ],
        newMaterialName: '',
        newMaterialQuantity: '',
      });
      setError('');
      newMaterialNameRef.current.value = '';
      newMaterialQuantityRef.current.value = '';
      newMaterialNameRef.current.blur();
      newMaterialQuantityRef.current.blur();
    }
  };

  const removeMaterial = (index) => {
    const materials = [...orderDetails.materials];
    materials.splice(index, 1);
    setOrderDetails({ ...orderDetails, materials });
  };
  const handleFileChange = (e) => {
    setOrderDetails({ ...orderDetails, details: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderDetails.materials.length === 0) {
      setError('Please add materials before submitting.');
      return;
    }
    try {
      const file =
        orderDetails.details && (await handleFileUpload(orderDetails.details));
      console.log(file);
      const response = await apiRequest({
        method: 'POST',
        url: 'employees/customizationOrders/',
        data: {
          serviceId: requestId,
          engineerId: employee._id,
          materials: orderDetails.materials,
          details: file,
        },
      });
      setOrderDetails({
        ...orderDetails,
        materials: [],
      });
      console.log('Order placed successfully:', response.data);
      socket?.emit('sendDetails', {
        user: employee,
        type: ['getMaterial', 'newOrderToFactory'],
        materialOrder: response.data.materialOrder,
        service: response.data.service,
      });
    } catch (error) {
      console.error('Error placing order:', error.response);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="custom-order-form">
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <TextField
            label="Customer Name"
            name="customerName"
            value={customOrder.customer?.username}
            fullWidth
            onChange={handleChange}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={customOrder?.description}
            fullWidth
            onChange={handleChange}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginBottom: '10px' }}>
            Materials Needed:
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Material Name"
            type="text"
            name="newMaterialName"
            inputRef={newMaterialNameRef}
            value={orderDetails.newMaterialName}
            onChange={handleChange}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              orderDetails.newMaterialName.trim() !== '' &&
              newMaterialQuantityRef.current.focus()
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            label="Quantity"
            name="newMaterialQuantity"
            inputRef={newMaterialQuantityRef}
            value={orderDetails.newMaterialQuantity}
            onChange={handleChange}
            onKeyDown={handleQuantityKeyDown}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth onClick={addMaterial} style={{ marginTop: '10px' }}>
            Add
          </Button>
        </Grid>
        {orderDetails.materials.length > 0 && (
          <Grid item xs={12}>
            <List
              style={{
                maxHeight: '200px',
                overflowY: 'auto',
                paddingTop: '0px',
              }}
            >
              {orderDetails.materials.map((material, index) => (
                <ListItem key={index} style={{ paddingBottom: '0px' }}>
                  <ListItemText primary={material.material} />
                  <ListItemText secondary={material.quantity} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeMaterial(index)}
                  >
                    <DeleteForeverIcon sx={{ fontSize: '32px' }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '-0.5rem',
          }}
        >
          <Grid container item xs={8}>
            <input
              type="file"
              id="uploadFile"
              name="uploadFile"
              className="uploadBtn file:hidden text-black bg-white w-full p-3 rounded-md border border-gray-300"
              onChange={handleFileChange}
              style={{ boxShadow: 'none' }}
            />
          </Grid>
          <Grid container item xs={4} justify="center">
            <label
              htmlFor="uploadFile"
              className="leading-7 text-md text-gray-600 mt-1 w-full h-full cursor-pointer"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              Upload File
            </label>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '10px', textTransform: 'capitalize' }}
          >
            Send Request
          </Button>
        </Grid>
      </Grid>
    </form>
    // </div>
  );
};

export default CustomOrderForm;
