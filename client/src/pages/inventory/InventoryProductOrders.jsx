import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import ProductOrder from "../../components/inventory/ProductOrder";
import { apiRequest } from '../../utils';

const InventoryProductOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setorders] = useState([]);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await apiRequest({
          method: 'get',
          url: '/Employees/orders',
          data:{}
        })
        setorders(response.data.orders);
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
      <h1 style={{fontSize:"25px",margin:"20px"}}>Product Order History</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          <li>
            {orders.length > 0 ? (
              orders?.map((order, index) => (
                <ProductOrder key={index} order={order} />
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

export default InventoryProductOrders;
