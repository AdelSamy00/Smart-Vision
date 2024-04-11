import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import '../Presenter/StyleSheets/PresenterProductsView.css';
import { apiRequest } from '../../utils';
import Loading from '../../components/shared/Loading';
import { setNotification } from '../../redux/NotificationSlice';

function ViewMeasuredCutomizedOrders({ socket, setSocket }) {
  const [requests, setRequests] = useState([]);
  const [newAssignOrders, setNewAssignOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { employee } = useSelector((state) => state.employee);
  const { notification } = useSelector((state) => state?.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `/employees/engineer/${employee._id}`,
        });
        console.log('API response:', response.data);
        const filteredRequests = response.data.services.filter(
          (request) => request.date
        );

        setRequests(filteredRequests);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.response);
      }
    };

    fetchProducts();
  }, [notification]);
  useEffect(() => {
    socket?.on('notifications', (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);
  useEffect(() => {
    setNewAssignOrders(
      notification.filter(
        (notify) =>
          notify.type === 'assignEngineerToCustomizationOrder' &&
          notify.serviceOrder?.date
      )
    );
  }, [notification]);
  console.log(requests);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {isLoading ? (
        <Grid item>
          <Loading />
        </Grid>
      ) : requests.length > 0 ? (
        <>
          {/* New Services */}
          <Grid className="w-full flex flex-col justify-center items-center ">
            {newAssignOrders?.length >= 1 && (
              <Grid item xs={12} sm={10} md={10}>
                <Typography variant="h4" align="center" gutterBottom>
                  New Sevice Requests Needs Measuring
                </Typography>

                <Grid
                  container
                  spacing={3}
                  className="presenter-products"
                  align="center"
                  justifyContent="center"
                >
                  {newAssignOrders.map((request, index) => (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                      <div className={`presenter-product-card`}>
                        <Typography
                          variant="body2"
                          align="center"
                          gutterBottom
                          className="presenter-product-info"
                        >
                          Customer Name:{' '}
                          {request.serviceOrder.customer?.username}
                        </Typography>
                        <Typography
                          variant="body2"
                          align="center"
                          gutterBottom
                          className="presenter-product-description"
                        >
                          Customer Number: 0
                          {request.serviceOrder.customer?.phone}
                        </Typography>
                        <Typography>
                          <Link to={`/e/order-details/${request.serviceOrder?._id}`}>
                            <Button
                              variant="text"
                              sx={{
                                textDecoration: 'underline',
                                textTransform: 'capitalize',
                                fontSize: '19px',
                                padding: 0,
                                '&:hover': {
                                  backgroundColor: 'white',
                                  color: 'black',
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              Service Details
                            </Button>
                          </Link>
                        </Typography>
                        <Typography
                          variant="body3"
                          align="center"
                          gutterBottom
                          className="presenter-product-description"
                        >
                          Day: {request.serviceOrder?.date?.day}
                          <span style={{ marginLeft: '1.5rem' }}>
                            Hour :{request.serviceOrder?.date?.time}
                          </span>
                        </Typography>
                        <div className="button-container">
                          {' '}
                          <Link
                            to={`/engineer/send-request/${request.serviceOrder?._id}`}
                            className="link-style"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              className="add-to-store-button"
                              style={{
                                background:
                                  'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                textTransform: 'capitalize',
                                height: 38,
                                padding: '0px 15px',
                              }}
                            >
                              {' '}
                              Send Order
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
          </Grid>
          {/* Old Services */}
          <Grid item xs={12} sm={10} md={10}>
            <Typography variant="h4" align="center" gutterBottom>
              Needs Measuring Sevice Requests
            </Typography>

            <Grid
              container
              spacing={3}
              className="presenter-products"
              align="center"
              justifyContent="center"
            >
              {requests.map((request, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <div className={`presenter-product-card`}>
                    {' '}
                    {console.log(request)}
                    <Typography
                      variant="body2"
                      align="center"
                      gutterBottom
                      className="presenter-product-info"
                    >
                      Customer Name: {request.customer?.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      align="center"
                      gutterBottom
                      className="presenter-product-description"
                    >
                      Customer Number: 0{request.customer?.phone}
                    </Typography>
                    <Typography>
                      <Link to={`/e/order-details/${request?._id}`}>
                        <Button
                          variant="text"
                          sx={{
                            textDecoration: 'underline',
                            textTransform: 'capitalize',
                            fontSize: '19px',
                            padding: 0,
                            '&:hover': {
                              backgroundColor: 'white',
                              color: 'black',
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          Service Details
                        </Button>
                      </Link>
                    </Typography>
                    <Typography
                      variant="body3"
                      align="center"
                      gutterBottom
                      className="presenter-product-description"
                    >
                      Day: {request?.date?.day}
                      <span style={{ marginLeft: '1.5rem' }}>
                        Hour :{request?.date?.time}
                      </span>
                    </Typography>
                    <div className="button-container">
                      {' '}
                      <Link
                        to={`/engineer/send-request/${request?._id}`}
                        className="link-style"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className="add-to-store-button"
                          style={{
                            background:
                              'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            textTransform: 'capitalize',
                            height: 38,
                            padding: '0px 15px',
                          }}
                        >
                          {' '}
                          Send Order
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" align="center" gutterBottom>
            There's no requests at the moment.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewMeasuredCutomizedOrders;
