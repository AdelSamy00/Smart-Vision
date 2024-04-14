import { useEffect, useState } from 'react';
import Loading from '../../components/shared/Loading';
import MaterialOrder from '../../components/inventory/MaterialOrder';
import { apiRequest } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../redux/NotificationSlice';
import { Typography } from "@mui/material";

const InventoryMatrialsOrders = ({ socket, setSocket }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [matrials, setMatrials] = useState([]);
  const [noOrdersMessage, setNoOrdersMessage] = useState(false);
  const { notification } = useSelector((state) => state?.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await apiRequest({
          method: 'get',
          url: '/Employees/material-order',
          data: {},
        });
        setMatrials(response.data.materialOrders.reverse());
        setIsLoading(false);
        console.log(response.data.materialOrders);
      } catch (error) {
        console.error(
          'Error fetching order history:',
          error.response.data.message
        );
      }
    }

    fetchOrderHistory();
  }, []);
  useEffect(() => {
    socket?.on('notifications', (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);

  useEffect(() => {
    const allShipped = matrials.every(
      (orderItem) => orderItem.state === "SHIPPED"
    );
    if (allShipped) {
      setNoOrdersMessage(true);
    } else {
      setNoOrdersMessage(false);
    }
  }, [matrials]);

  if (noOrdersMessage) {
    return (
      <Typography
        variant="body1"
        style={{
          padding: "20px",
          backgroundColor: "#f0f0f0",
          borderRadius: "5px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "25px",
          marginTop: "3rem",
          width: "80vw",
          margin: "4rem auto",
        }}
      >
        All Orders Shipped .
      </Typography>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: '25px', margin: '20px' }}>Materials Orders</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          <li>
            {
              matrials?.map((matrial, index) => (
                <MaterialOrder key={index} matrial={matrial} />
              ))}
          </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryMatrialsOrders;
