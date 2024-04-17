import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import ProductOrder from "../../components/inventory/ProductOrder";
import { apiRequest } from "../../utils";
import { Grid, Button, Typography } from "@mui/material";

const InventoryProductOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setorders] = useState([]);
  const [noOrdersMessage, setNoOrdersMessage] = useState(false);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await apiRequest({
          method: "get",
          url: "/Employees/inventory",
          data: {},
        });
        setorders(response.data.orders.reverse());
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

  useEffect(() => {
    const allShipped = orders.every(
      (orderItem) => orderItem.state === "Shipped"
    );
    if (allShipped) {
      setNoOrdersMessage(true);
    } else {
      setNoOrdersMessage(false);
    }
  }, [orders]);

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
      {/* <h1 style={{ fontSize: "25px", margin: "20px" }}>Product Orders </h1> */}
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          <li>
            {orders?.map((order, index) => (
              <ProductOrder key={index} order={order} />
            ))}
          </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryProductOrders;
