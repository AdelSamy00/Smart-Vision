import { useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { apiRequest } from '../../utils';

function ProductOrderComponent({ order }) {
  const [showOrder, setShowOrder] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  //console.log(updatedOrder)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900); // Adjust this value as needed
    };

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    order?.products.forEach((product) => {
      totalPrice += product?.product?.price * (product?.quantity || 1);
    });
    return totalPrice;
  };
  const handleStateChange = async (event) => {
    const newStatus = event.target.value;

    try {
      const response = await apiRequest({
        method: 'PUT',
        url: `/employees/orders`,
        data: {
          orderId: order._id,
          newStatus: newStatus,
        },
      });
      console.log(response.data); // Log the response from the server
      setUpdatedOrder(response.data.order);
      console.log('Updated order state:', updatedOrder.state);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };
  return (
    <Grid container className="order-container" sx={{ marginBottom: '2rem' }}>
      <Grid
        item
        xs={11}
        sm={9}
        md={9}
        lg={7}
        sx={{ margin: 'auto', border: '2px solid #ddd', borderRadius: '10px' }}
      >
        <Grid
          container
          sx={{
            borderBottom: showOrder ? '2px solid #ddd' : 'none',
            borderStartEndRadius: '10px',
            borderStartStartRadius: '10px',
            padding: '20px',
            backgroundColor: '#f2f2f2',
            alignItems: 'center',
          }}
        >
          <Grid
            item
            xs={6}
            md={3}
            lg={3}
            sx={{ marginBottom: { xs: '1.5rem', md: '0rem' } }}
          >
            <Typography variant="body1">Date Placed</Typography>
            <Typography variant="body2">
              {order.createdAt.substring(0, 10).split('-').reverse().join('-')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            lg={3}
            sx={{
              textAlign: { xs: 'end', md: 'center' },
              marginBottom: { xs: '1.5rem', md: '0rem' },
              marginTop: { xs: '-1.5rem', md: '0rem' },
              // backgroundColor:"red"
            }}
          >
            <Typography variant="body1">Order Number</Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: { xs: 'end', md: 'center' } }}
            >
              {order?.orderNumber}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            // sm={6}
            md={3}
            lg={3}
            sx={{ textAlign: { xs: 'start', md: 'center' } }}
          >
            <Typography variant="body1">Total Price</Typography>
            <Typography variant="body2">{order.totalPrice}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={3}
            lg={3}
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'flex-end',
                md: 'center',
                // lg: "flex-end",
              },
              //   marginTop: { md: "1.7rem", lg: "0rem" },
            }}
          >
            <Button
              onClick={toggleOrder}
              variant="contained"
              sx={{
                backgroundColor: '#009688',
                color: 'white',
                borderRadius: '5px',
                ':hover': {
                  backgroundColor: '#009688',
                },
              }}
            >
              {showOrder ? 'close' : 'Order Details'}
            </Button>
          </Grid>
        </Grid>
        {showOrder && (
          <Grid
            container
            item
            sx={{
              borderTop: 'none',
              padding: '20px',
            }}
          >
            {/* {console.log(order)} */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginBottom: '1rem',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  marginRight: '1rem',
                  fontSize: { xs: '16px', md: '20px', fontWeight: 'bold' },
                }}
              >
                Customer Name:{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '16px', md: '19px', color: 'gray' } }}
              >
                {order?.customerData.firstName + order?.customerData.lastName}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                marginBottom: '1rem',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  marginRight: '1rem',
                  fontSize: { xs: '16px', md: '20px', fontWeight: 'bold' },
                }}
              >
                Phone Number:{' '}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '16px', md: '19px', color: 'gray' } }}
              >
                {order?.customerData.phoneNumber}
              </Typography>
            </Grid>

            {order?.products.map((product, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sx={{
                  border: '2px solid #ddd',
                  borderRadius: '5px',
                  marginBottom: '20px',
                  padding: '20px',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <img
                      src={product?.product?.images[0]}
                      alt={product?.product?.name}
                      style={{
                        width: '100%',
                        height: '150px',
                        borderRadius: '5px',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Grid
                      item
                      container
                      sx={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: 'gray',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Grid item xs={12} md={8} variant="body1">
                        <span style={{ color: '' }}>
                          {product?.product?.name}
                        </span>
                      </Grid>
                      <Grid
                        item
                        variant="body1"
                        xs={12}
                        md={4}
                        sx={{
                          marginTop: { xs: '1rem', md: '0rem' },
                          display: 'flex',
                          alignItems: 'end',

                          justifyContent: { md: 'end' },
                        }}
                      >
                        <span>{product?.product?.price} EGP</span>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body2"
                      style={{ marginTop: '1rem', fontSize: { xs: '10px' } }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        Description:
                      </span>{' '}
                      {product?.product?.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: '1rem', fontSize: { xs: '10px' } }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        Quantity:
                      </span>{' '}
                      <span style={{ fontSize: '18px' }}>
                        {product?.quantity}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid
              item
              xs={12}
              container
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Grid item xs={3} md={2} style={{ justifyContent: 'center' }}>
                <Typography variant="body1">
                  <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                    State:{' '}
                  </span>{' '}
                </Typography>
              </Grid>
              {isSmallScreen ? (
                <Grid
                  item
                  xs={9}
                  md={10}
                  style={{ textAlign: 'center', justifyContent: 'center' }}
                >
                  <FormControl fullWidth>
                    <Select
                      labelId="order-state-label"
                      id="order-state"
                      value={updatedOrder?.state}
                      onChange={handleStateChange}
                    >
                      {console.log(updatedOrder)}
                      <MenuItem value="PENDING">Pending</MenuItem>
                      <MenuItem value="In Progress">Processing</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <RadioGroup
                  row
                  aria-label="order-state"
                  name="order-state"
                  value={updatedOrder?.state}
                  onChange={handleStateChange}
                >
                  {console.log(updatedOrder)}
                  <FormControlLabel
                    value="PENDING"
                    control={<Radio />}
                    label="Pending"
                  />
                  <FormControlLabel
                    value="In Progress"
                    control={<Radio />}
                    label="Processing"
                  />
                  <FormControlLabel
                    value="Shipped"
                    control={<Radio />}
                    label="Shipped"
                  />
                  <FormControlLabel
                    value="Delivered"
                    control={<Radio />}
                    label="Delivered"
                  />
                </RadioGroup>
              )}
              {/* </Grid> */}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductOrderComponent;
