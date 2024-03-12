import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import ServiceOrderComponent from "../../components/Operator/ServiceOrderComponent";
const ViewProductOrders = () => {
  const [productOrders, setProductOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/services`);
        setProductOrders(response.data.services);
        setIsLoading(false);
        console.log(response.data.services);
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
        <h1 style={{fontSize:"25px",margin:"20px"}}>service history</h1>
    {isLoading ? (
      <Loading />
    ) : (
      <ul>
        <li>
          {productOrders.length > 0 ? (
            productOrders?.map((order, index) => (
              <ServiceOrderComponent key={index} order={order} />
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
              service order history is empty.
            </p>
          )}
        </li>
      </ul>
    )}
  </div>
);
};

export default ViewProductOrders;
