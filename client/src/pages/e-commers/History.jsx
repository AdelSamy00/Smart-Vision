import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import OrderComponent from '../../components/e-commers/OrderComponent';
import ServiceHistory from '../../components/e-commers/serviceHistory';
import Loading from '../../components/shared/Loading';
import '../inventory/styleSheets/InventoryMaterialTransactions.css';
import { apiRequest } from '../../utils';
import { Alert, Snackbar } from '@mui/material';

const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderServiceHistory, setOrderServiceHistory] = useState([]);
  const { customer } = useSelector((state) => state.customer);
  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  async function fetchOrderServiceHistory() {
    try {
      const response = await apiRequest({
        method: 'get',
        url: `/customers/service/${customer._id}`,
        data: {},
      });
      setOrderServiceHistory(response.data.history);
      setIsLoading(false);
      console.log(response.data);
      console.log(response.data.createdAt);
    } catch (error) {
      console.error(
        'Error fetching order history:',
        error.response.data.message
      );
    }
  }

  async function fetchOrderHistory() {
    try {
      const response = await axios.get(`/customers/order/${customer._id}`);
      setOrderHistory(response.data.history);
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error(
        'Error fetching order history:',
        error.response.data.message
      );
    }
  }

  const cancelService = async (serviceId) => {
    try {
      const response = await apiRequest({
        method: 'delete',
        url: '/customers/service',
        data: { id: customer._id, serviceId },
      });
      console.log(response.data);
      if (response?.success) {
        setOrderServiceHistory((prevOrderServiceHistory) =>
          prevOrderServiceHistory.map((entry) =>
            entry._id === serviceId ? { ...entry, state: 'CANCELED' } : entry
          )
        );
      } else {
        setError(response?.message);
        handleOpenSnackbar();
      }
    } catch (error) {
      console.error('Error cancelling service:', error.response.data.message);
    }
  };
  
  useEffect(() => {
    fetchOrderServiceHistory();
    fetchOrderHistory();
  }, []);

  return (
    <div>
      <div className="ml-4 materialTransactionsFilterNavbarItem">
        <label htmlFor="transactionType">Select History Type:</label>
        <select
          name="transactionType"
          id="transactionType"
          onChange={(e) => {
            e?.target?.value === 'Services'
              ? setShowOrderHistory(false)
              : setShowOrderHistory(true);
          }}
        >
          <option value="Orders">Orders</option>
          <option value="Services">Services</option>
        </select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {showOrderHistory ? (
            <li>
              {orderHistory?.length > 0 ? (
                <>
                  <h1
                    style={{
                      marginBottom: '30px',
                      fontWeight: 'bold',
                      fontSize: '32px',
                      textAlign: 'center',
                    }}
                  >
                    Order History
                  </h1>
                  {orderHistory?.map((order, index) => (
                    <OrderComponent key={index} order={order} />
                  ))}
                </>
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
          ) : (
            <li>
              {orderHistory?.length > 0 ? (
                <>
                  <h1
                    style={{
                      marginBottom: '30px',
                      fontWeight: 'bold',
                      fontSize: '32px',
                      textAlign: 'center',
                    }}
                  >
                    Services History
                  </h1>
                  <ServiceHistory
                    orderServiceHistory={orderServiceHistory}
                    cancelService={cancelService}
                  />
                </>
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
                  Your services history is empty.
                </p>
              )}
            </li>
          )}
        </ul>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default History;
