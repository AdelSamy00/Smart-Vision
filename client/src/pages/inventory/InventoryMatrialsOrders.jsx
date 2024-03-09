import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import MaterialOrder from "../../components/inventory/MaterialOrder";
import { apiRequest } from '../../utils';

const InventoryMatrialsOrders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [matrials, setMatrials] = useState([]);

  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await apiRequest({
          method: 'get',
          url: '/Employees/material-order',
          data:{}
        })
        setMatrials(response.data.materialOrders);
        setIsLoading(false);
        console.log(response.data.materialOrders);
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
      <h1 style={{fontSize:"25px",margin:"20px"}}>Order History</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          <li>
            {matrials.length > 0 ? (
              matrials?.map((matrial, index) => (
                <MaterialOrder key={index} matrial={matrial} />
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

export default InventoryMatrialsOrders;
