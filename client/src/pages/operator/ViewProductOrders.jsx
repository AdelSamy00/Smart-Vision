import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/shared/Loading";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ProductOrderComponent from "../../components/Operator/ProductOrderComponent";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/NotificationSlice";
const ViewProductOrders = ({ socket, setSocket }) => {
  const [productOrders, setProductOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { notification } = useSelector((state) => state?.notification);
  const dispatch = useDispatch();
  const [ordersNotification, setOrdersNotification] = useState([]);
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/orders`);
        const sortedOrders = response.data.orders
          .filter(
            (order) =>
              !(order.state === "CANCELED" || order.state === "Delivered")
          ) 
          .sort((a, b) => b.orderNumber - a.orderNumber);
        setProductOrders(sortedOrders);
        setIsLoading(false);
        //console.log(response.data.orders);
      } catch (error) {
        console.error(
          "Error fetching order history:",
          error.response.data.message
        );
      }
    }

    fetchOrderHistory();
  }, [notification]);

  const filteredOrders = [...productOrders, ...ordersNotification].filter(
    (order) => {
      const searchString = searchTerm.toLowerCase();
      const customerName =
        `${order?.customerData?.firstName} ${order.customerData.lastName}`.toLowerCase();
      const orderNumber = order?.orderNumber.toString().toLowerCase();
      const customerPhone =
        `0${order?.customerData?.phoneNumber}`.toLowerCase();
      const orderState = order?.state.toLowerCase();

      return (
        customerName.includes(searchString) ||
        orderNumber.includes(searchString) ||
        customerPhone.includes(searchString) ||
        orderState.includes(searchString)
      );
    }
  );

  useEffect(() => {
    socket?.on("notifications", (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);
  useEffect(() => {
    setOrdersNotification(
      notification.filter((notify) => notify.type === "addOrder")
    );
  }, [notification]);
  return (
    <div>
      {console.log(socket?.id)}
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {console.log(ordersNotification)}
          {ordersNotification?.length >= 1 && (
            <div className="">
              <h2 className=" flex flex-col justify-center items-center text-[#696969] text-3xl p-2">
                New orders
              </h2>
              <Grid
                sx={{
                  marginBottom: "2rem",
                  marginLeft: { xs: "0rem", md: "3rem" },
                  width: { xs: "100vw", md: "500px" },
                  padding: "0px 15px",
                }}
              >
                <TextField
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  placeholder="Enter Your search ..."
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        {searchTerm && (
                          <IconButton
                            edge="end"
                            aria-label="clear search"
                            onClick={(e) => setSearchTerm("")}
                          >
                            <ClearIcon color="action" />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                    style: { backgroundColor: "white", borderRadius: "5px" },
                  }}
                />
              </Grid>
              <li>
                {ordersNotification?.map((notify, idx) => {
                  let order = notify.order;
                  console.log(order);
                  return <ProductOrderComponent key={idx} order={order} />;
                })}
              </li>
            </div>
          )}
          <h2 className=" flex flex-col justify-center items-center text-[#696969] text-3xl pb-4">
            Orders
          </h2>
          {!ordersNotification?.length && (
            <Grid
              sx={{
                marginBottom: "2rem",
                marginLeft: { xs: "0rem", md: "3rem" },
                width: { xs: "100vw", md: "500px" },
                padding: "0px 15px",
              }}
            >
              <TextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                placeholder="Enter Your search ..."
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchTerm && (
                        <IconButton
                          edge="end"
                          aria-label="clear search"
                          onClick={(e) => setSearchTerm("")}
                        >
                          <ClearIcon color="action" />
                        </IconButton>
                      )}
                    </InputAdornment>
                  ),
                  style: { backgroundColor: "white", borderRadius: "5px" },
                }}
              />
            </Grid>
          )}
          <li>
            {productOrders.length === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                  width: "65%",
                  border: "2px solid",
                  margin: "auto",
                  padding: "20px",
                  marginBottom: "5rem",
                }}
              >
                No orders
              </p>
            ) : filteredOrders.length > 0 ? (
              filteredOrders?.map((order, index) => (
                <ProductOrderComponent key={index} order={order} />
              ))
            ) : (
              <p
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "25px",
                  width: "65%",
                  // border: "2px solid",
                  margin: "auto",
                  padding: "20px",
                  marginBottom: "5rem",
                }}
              >
                No results found
              </p>
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default ViewProductOrders;
