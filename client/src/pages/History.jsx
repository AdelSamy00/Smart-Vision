import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderComponent from "../components/OrderComponent";
import ServiceHistory from "../components/serviceHistory";
import Loading from "../components/Loading";
import { Button, FormControlLabel, Switch } from "@mui/material";
const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { customer } = useSelector((state) => state.customer);
  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/customers/order/${customer._id}`);
        setOrderHistory(response.data.history);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(
          "Error fetching order history:",
          error.response.data.message
        );
      }
    }

    fetchOrderHistory();
  }, []);
  const toggleHistory = () => {
    setShowOrderHistory((prevShowOrderHistory) => !prevShowOrderHistory);
  };
  return (
    <div>
      {/* <h1>Order History</h1> */}
      <FormControlLabel
        labelPlacement="start"
        label={showOrderHistory ? "Order History" : "Service History"}
        control={
          <Switch
            checked={showOrderHistory}
            onChange={toggleHistory}
            color="primary"
          />
        }
        sx={{ marginBottom: "1rem",marginLeft:"5%" }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {showOrderHistory ? (
            <li>
              {/* <h1 style={{fontWeight:"bold",fontSize:"20px",marginLeft:"20px"}}>Order History</h1> */}
              {orderHistory.length > 0 ? (
                orderHistory.map((order, index) => (
                  <OrderComponent key={index} order={order} />
                ))
              ) : (
                <p>You haven't ordered yet.</p>
              )}
            </li>
          ) : (
            <li>
              {/* <h1 style={{fontWeight:"bold",fontSize:"20px",marginLeft:"20px"}}>Service History</h1> */}
              <ServiceHistory />
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default History;
