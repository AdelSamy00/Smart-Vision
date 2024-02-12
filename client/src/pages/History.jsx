import axios from "axios";
import { useEffect ,useState} from "react";
import { useSelector } from "react-redux";
import OrderComponent from "../components/OrderComponent";

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
      <h1>Order History</h1>
      <ul>
        {orderHistory.map((order,index) => (
          <OrderComponent key={index} order={order} />
        ))}
      </ul>
    </div>
  );
};

export default History;
