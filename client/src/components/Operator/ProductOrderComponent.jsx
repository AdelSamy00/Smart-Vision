import { useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import axios from 'axios';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { t } from 'i18next';

function Productorder1Component({ order1, onUpdatedState1, isNew }) {
  const [showorder1, setShoworder1] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isnew, setIsNew] = useState(isNew);
  const [showWholeorder1, setShowWholeorder1] = useState(true);
  const [updatedState, setUpdatedState] = useState(order1?.state);

  // console.log(isnew);
  //console.log(updatedState);
  const toggleorder1 = () => {
    setShoworder1(!showorder1);
    setIsNew(false);
  };
  const handleDoneButtonClick = async () => {
    onUpdatedState1('');
    try {
      const response = await axios.put(`/employees/orders`, {
        orderId: order1?._id,
        newStatus: 'Delivered',
      });
      setShowWholeorder1(false);
      onUpdatedState1(response.data.order.state);
      console.log(response);
    } catch (error) {
      console.error('Error updating order1 status:', error.message);
    }
  };
  const sendRequestToInventory = async () => {
    setShowButton(true);
    setUpdatedState(order1?.state);
    onUpdatedState1('');
    try {
      const response = await axios.put(`/employees/orders/${order1._id}`);
      console.log('Request sent to inventory:', response.data);
      setShowButton(false);
      onUpdatedState1(response.data.order.state);
      setUpdatedState(response.data.order.state);
    } catch (error) {
      console.error('Error sending request to inventory:', error.message);
    }
  };

  return showWholeorder1 ? (
    <Grid container className="order1-container" sx={{ marginBottom: '2rem' }}>
      <Grid
        item
        xs={11}
        sm={9}
        md={9}
        lg={7}
        sx={{
          margin: 'auto',
          border1: '2px solid #ddd',
          border1Radius: '10px',
        }}
      >
        <Grid
          container
          sx={{
            border1Bottom: showorder1 ? '2px solid #ddd' : 'none',
            border1StartEndRadius: '10px',
            border1StartStartRadius: '10px',
            padding: '20px',
            backgroundColor: '#f2f2f2',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {isnew && (
            <NewReleasesIcon
              sx={{
                position: 'absolute',
                top: -8,
                right: -10,
                color: '#009688',
              }}
            />
          )}
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={3}
            sx={{ marginBottom: { xs: '1.5rem', md: '0rem' } }}
          >
            <Typography variant="body1">{t('datePlaced')}</Typography>
            <Typography variant="body2">
              {order1?.createdAt
                ?.substring(0, 10)
                .split('-')
                .reverse()
                .join('-')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={3}
            sx={{
              textAlign: { xs: 'end', sm: 'center' },
              marginBottom: { xs: '1.5rem', md: '0rem' },
            }}
          >
            <Typography variant="body1">{t('orderNumber')}</Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: { xs: 'end', sm: 'center' } }}
            >
              {order1?.orderNumber}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={3}
            sx={{
              textAlign: { xs: 'start', sm: 'end', md: 'center' },
              marginBottom: { xs: '1.5rem', md: '0rem' },
            }}
          >
            <Typography variant="body1">{t('Total Price')}</Typography>
            <Typography variant="body2">{order1?.totalPrice}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sm={12}
            md={3}
            lg={3}
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'flex-end',
                md: 'center',
              },
            }}
          >
            <Button
              onClick={toggleorder1}
              variant="contained"
              sx={{
                backgroundColor: '#009688',
                color: 'white',
                border1Radius: '5px',
                ':hover': {
                  backgroundColor: '#009688',
                },
              }}
            >
              {showorder1 ? t('close') : t('Details')}
            </Button>
          </Grid>
        </Grid>
        {showorder1 && (
          <Grid
            container
            item
            sx={{
              border1Top: 'none',
              padding: '20px',
            }}
          >
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
                  marginInline: '.5rem',
                  fontSize: { xs: '16px', md: '19px', fontWeight: 'bold' },
                }}
              >
                {t('customerName')}:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '16px', md: '18px', color: 'gray' } }}
              >
                {order1?.customerData.firstName +
                  ' ' +
                  order1?.customerData.lastName}
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
                  marginInline: '.5rem',
                  fontSize: { xs: '16px', md: '19px', fontWeight: 'bold' },
                }}
              >
                {t('customerNumber')}:
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: { xs: '16px', md: '18px', color: 'gray' } }}
              >
                {order1?.customerData?.phoneNumber?.toString().length < 11
                  ? '0' + order1?.customerData?.phoneNumber
                  : order1?.customerData?.phoneNumber}
              </Typography>
            </Grid>
            {order1?.products.map((product, index) => (
              <Grid
                key={index}
                item
                xs={12}
                sx={{
                  border1: '2px solid #ddd',
                  border1Radius: '5px',
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
                        border1Radius: '5px',
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
                        <span style={{ textTransform: 'capitalize' }}>
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
                        <span>
                          {product?.product?.price}
                          {t('EGP')}
                        </span>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body2"
                      style={{ marginTop: '1rem', fontSize: { xs: '10px' } }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        {t('description')}:
                      </span>{' '}
                      {product?.product?.description}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: '1rem', fontSize: { xs: '10px' } }}
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '17px' }}>
                        {t('quantity')}:
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
              <Grid
                item
                xs={updatedState === 'Shipped' ? 6 : 12}
                md={updatedState === 'Confirmed' ? 12 : 6}
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'start', md: 'flex-start' },
                  height: { md: '100%' },
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: '1rem',
                    fontSize: { xs: '16px', md: '20px' },
                  }}
                >
                  <span style={{ fontWeight: 'bold', marginInline: '.5rem' }}>
                    {t('state')}:
                  </span>{' '}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: '16px', md: '19px', color: 'gray' } }}
                >
                  {updatedState}
                </Typography>
              </Grid>
              {updatedState === 'PENDING' && showButton && (
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    textAlign: { xs: 'start', md: 'end' },
                    // justifyContent: "flex-start",
                    height: '100%',
                    alignItems: 'center',
                  }}
                >
                  <Button
                    variant="contained"
                    onClick={sendRequestToInventory}
                    sx={{
                      backgroundColor: '#009688',
                      color: 'white',
                      textTransform: 'capitalize',
                      border1Radius: '5px',
                      ':hover': {
                        backgroundColor: '#009688',
                      },
                    }}
                  >
                    {t('sendRequestToInventory')}
                  </Button>
                </Grid>
              )}
              {updatedState === 'Shipped' && (
                <Grid
                  item
                  xs={6}
                  md={6}
                  sx={{
                    textAlign: { xs: 'end' },
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  {/* Render done button */}
                  <Button
                    variant="contained"
                    onClick={handleDoneButtonClick}
                    sx={{
                      backgroundColor: '#009688',
                      color: 'white',
                      textTransform: 'capitalize',
                      border1Radius: '5px',
                      ':hover': {
                        backgroundColor: '#009688',
                      },
                    }}
                  >
                    {t('done')}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  ) : null;
}

export default Productorder1Component;
