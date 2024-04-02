import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import Review from './Review';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/CartSlice';
import { apiRequest } from '../../utils';

export default function Checkout({ socket, setSocket }) {
  const [activeStep, setActiveStep] = useState(0);
  const [orderNumber, setOrderNumber] = useState(0);
  const steps = ['Shipping address', 'Review your order'];
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = React.useState(null);

  useEffect(() => {
    const formDataString = localStorage.getItem('shippingInfo');
    if (formDataString) {
      setShippingInfo(JSON.parse(formDataString));
    }
  }, [activeStep]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  }

  // console.log(products);
  function calculateTotalPrice() {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  }

  const totalPrice = calculateTotalPrice();
  // console.log(totalPrice);
  function calculateTotalPoints() {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPoints = cart.reduce((total, item) => {
      const points = typeof item.points === 'number' ? item.points : 0;
      return total + points;
    }, 0);
    return totalPoints;
  }
  const totalPoints = calculateTotalPoints();
  //console.log(totalPoints);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      const productsWithDetails = cart.map((product) => ({
        product: product?._id,
        quantity: product?.quantity,
      }));
      console.log(shippingInfo);
      //console.log(productsWithDetails.length);
      const response = await apiRequest({
        method: 'POST',
        url: '/customers/order',
        data: {
          id: customer._id,
          cart: productsWithDetails,
          totalPrice: totalPrice,
          totalPoints: totalPoints,
          customerData: shippingInfo,
        },
        token: customer?.token,
      });
      // const response = await axios.post('/customers/order', {
      //   id: customer._id,
      //   cart: productsWithDetails,
      //   totalPrice: totalPrice,
      //   totalPoints: totalPoints,
      //   customerData: shippingInfo,
      // });
      console.log('Order placed successfully:', response.data);
      socket?.emit('setOrder', {
        user: shippingInfo,
        products: productsWithDetails,
        type: 'addOrder',
        order: response.data.order,
      });
      dispatch(clearCart());
      setOrderNumber(response.data.order.orderNumber);
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.error('Error placing order:', error.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent:
                    activeStep === 0 ? 'flex-end' : 'space-between',
                }}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handlePlaceOrder
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
