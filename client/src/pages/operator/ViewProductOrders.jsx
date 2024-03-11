import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import { Button, FormControlLabel, Switch } from "@mui/material";
import ProductOrderComponent from "../../components/Operator/ProductOrderComponent";
const ViewProductOrders = () => {
  const [productOrders, setProductOrders] = useState([]);
  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/orders`);
        setProductOrders(response.data.orders);
        setIsLoading(false);
        console.log(response.data.orders);
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
    {isLoading ? (
      <Loading />
    ) : (
      <ul>
        <li>
          {productOrders.length > 0 ? (
            productOrders?.map((order, index) => (
              <ProductOrderComponent key={index} order={order} />
            ))
          ) : (
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "18px",
                width: "65%",
                border: "2px solid",
                margin: "auto",
                padding: "20px",
                marginBottom: "5rem",
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
