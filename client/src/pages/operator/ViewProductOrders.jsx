import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import { Button, FormControlLabel, Switch } from '@mui/material';
import ProductOrderComponent from '../../components/Operator/ProductOrderComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/NotificationSlice';
const ViewProductOrders = ({ socket, setSocket }) => {
  const [productOrders, setProductOrders] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { notification } = useSelector((state) => state?.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/orders`);
        setProductOrders(response.data.orders);
        setIsLoading(false);
        //console.log(response.data.orders);
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
    socket?.on('getOrders', (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
      //setNotification([...notification, data]);
    });
  }, [socket]);
  return (
    <div>
      {console.log(socket?.id)}
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {notification?.length >= 1 && (
            <div className="">
              <h2 className=" flex flex-col justify-center items-center text-[#696969] text-3xl p-2">
                New orders
              </h2>
              <li>
                {console.log(notification)}
                {notification?.map((notify, idx) => {
                  let order = notify.order;
                  console.log(order);
                  return <ProductOrderComponent key={idx} order={order} />;
                })}
              </li>
            </div>
          )}
          <h2 className=" flex flex-col justify-center items-center text-[#696969] text-3xl pb-4">
            Orders
          </h2>
          <li>
            {productOrders.length > 0 ? (
              productOrders?.map((order, index) => (
                <ProductOrderComponent key={index} order={order} />
              ))
            ) : (
              <p
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  width: '65%',
                  border: '2px solid',
                  margin: 'auto',
                  padding: '20px',
                  marginBottom: '5rem',
                }}
              >
                Your order history is empty.
              </p>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default ViewProductOrders;
