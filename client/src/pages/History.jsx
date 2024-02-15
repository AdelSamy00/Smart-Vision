import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderComponent from "../components/OrderComponent";
import ServiceHistory from "../components/serviceHistory";
const History = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/customers/order/${customer._id}`);
        setOrderHistory(response.data.history);
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
  return (
    <div>
      {/* <h1>Order History</h1> */}
      <ul>
        <li>
          <h1 style={{fontWeight:"bold",fontSize:"20px",marginLeft:"20px"}}>Order History</h1>
          {orderHistory.map((order, index) => (
            <OrderComponent key={index} order={order} />
          ))}
        </li>
        <li>
          <h1 style={{fontWeight:"bold",fontSize:"20px",marginLeft:"20px"}}>Service History</h1>
          <ServiceHistory />
        </li>
      </ul>
    </div>
  );
};

export default History;
