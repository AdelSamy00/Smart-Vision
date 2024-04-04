import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiRequest } from '../../utils';
import Loading from '../../components/shared/Loading';

import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreIcon from '@mui/icons-material/More';
import { Link } from 'react-router-dom';
import { setNotification } from '../../redux/NotificationSlice';
import { useDispatch, useSelector } from 'react-redux';
const ExpandMore = ({ expand, ...other }) => <IconButton {...other} />;

const ViewServiceOrders = ({ socket, setSoket }) => {
  const [expandedStates, setExpandedStates] = useState({});
  const [productOrders, setProductOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { notification } = useSelector((state) => state?.notification);
  const [serviceNotifications, setServiceNotifications] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/services`);
        setProductOrders(response.data.services);
        setIsLoading(false);
        console.log(response.data.services);
      } catch (error) {
        console.error(
          'Error fetching order history:',
          error.response.data.message
        );
      }
    }

    fetchOrderHistory();
  }, [notification]);
  useEffect(() => {
    socket?.on('notifications', (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);
  const handleExpandClick = (orderId) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  useEffect(() => {
    const newServiceOrders = notification.filter(
      (notify) => notify.type === 'addService'
    );
    setServiceNotifications(
      newServiceOrders.map((notify) => notify.serviceOrder)
    );
  }, [notification]);
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {isLoading ? (
        <Grid item>
          <Loading />{' '}
        </Grid>
      ) : productOrders.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          {serviceNotifications.length >= 1 && (
            <div className="">
              <Typography variant="h4" align="center" gutterBottom>
                New Service Orders
              </Typography>
              <Grid
                container
                spacing={3}
                className="presenter-products"
                align="center"
                justifyContent="center"
              >
                {serviceNotifications.map((order, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4}>
                    <Card sx={{ maxWidth: 300 }}>
                      <CardHeader
                        title={order.service}
                        style={{ marginTop: '10px' }}
                      />
                      <CardContent style={{ marginTop: '-20px' }}>
                        {`Date: ${order.createdAt
                          .substring(0, 10)
                          .split('-')
                          .reverse()
                          .join('-')}`}
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton style={{ marginTop: '-30px' }}>
                          <Link to={`/operator/servise-details/${order._id}`}>
                            <MoreIcon />
                          </Link>
                        </IconButton>
                        <ExpandMore
                          expand={expandedStates[order._id]}
                          onClick={() => handleExpandClick(order._id)}
                          aria-expanded={expandedStates[order._id]}
                          aria-label="show more"
                          style={{ marginLeft: 'auto', marginTop: '-30px' }}
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse
                        in={expandedStates[order._id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent sx={{ marginTop: '-20px' }}>
                          <Typography
                            variant="body2"
                            style={{ marginBottom: '5px', fontSize: '15px' }}
                          >
                            {order.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ fontSize: '15px' }}
                          >
                            State: {order?.state}
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
          <Typography variant="h4" align="center" gutterBottom>
            Service Orders
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {productOrders.map((order, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader
                    title={order.service}
                    style={{ marginTop: '10px' }}
                  />
                  <CardContent style={{ marginTop: '-20px' }}>
                    {`Date: ${order.createdAt
                      .substring(0, 10)
                      .split('-')
                      .reverse()
                      .join('-')}`}
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton style={{ marginTop: '-30px' }}>
                      <Link to={`/operator/servise-details/${order._id}`}>
                        <MoreIcon />
                      </Link>
                    </IconButton>
                    <ExpandMore
                      expand={expandedStates[order._id]}
                      onClick={() => handleExpandClick(order._id)}
                      aria-expanded={expandedStates[order._id]}
                      aria-label="show more"
                      style={{ marginLeft: 'auto', marginTop: '-30px' }}
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedStates[order._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent sx={{ marginTop: '-20px' }}>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: '5px', fontSize: '15px' }}
                      >
                        {order.description}
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: '15px' }}>
                        State: {order?.state}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <div>
          <p>There is no orders.</p>
        </div>
      )}
    </Grid>
  );
};

export default ViewServiceOrders;
