import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiRequest } from "../../utils";
import Loading from "../../components/shared/Loading";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
  TextField,
  InputAdornment,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreIcon from "@mui/icons-material/More";
import { Link, useNavigate } from "react-router-dom";
import { setNotification } from "../../redux/NotificationSlice";
import { useDispatch, useSelector } from "react-redux";
const ExpandMore = ({ expand, ...other }) => <IconButton {...other} />;

const ViewServiceOrders = ({ socket, setSoket }) => {
  const [expandedStates, setExpandedStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [productOrders, setProductOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serviceType, setServiceType] = useState("All");
  const { notification } = useSelector((state) => state?.notification);
  const [serviceNotifications, setServiceNotifications] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`/employees/services`);
        const sortedOrders = response.data.services
          .filter(
            (order) =>
              !(order.state === "Delivered")
          )
          .sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        setProductOrders(sortedOrders);
        // setProductOrders(response.data.services);
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
  }, [notification]);
  useEffect(() => {
    socket?.on("notifications", (data) => {
      console.log(data);
      //let number = getNumberOfNotifications(notification);
      dispatch(setNotification([...notification, data]));
    });
  }, [socket]);
  const handleExpandClick = (orderId) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  useEffect(() => {
    const newServiceOrders = notification.filter(
      (notify) => notify.type === "addService"
    );
    setServiceNotifications(
      newServiceOrders.map((notify) => notify.serviceOrder)
    );
  }, [notification]);

  const filteredOrders = productOrders.filter((order) => {
    const searchString = searchTerm.toLowerCase();
    const customerName = `${order?.customer?.username}`.toLowerCase();
    const customerPhone = `0${order?.customer?.phone}`.toLowerCase();
    const orderState = order?.state.toLowerCase();

    // Filter based on search term and selected service type
    return (
      (serviceType === "All" || order.service.toLowerCase() === serviceType.toLowerCase()) &&
      (customerName.includes(searchString) ||
        customerPhone.includes(searchString) ||
        orderState.includes(searchString))
    );
  });

  // Handler function to update selected service type
  const handleServiceTypeChange = (event) => {
    setServiceType(event.target.value);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {isLoading ? (
        <Grid item>
          <Loading />{" "}
        </Grid>
      ) : productOrders.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          {serviceNotifications.length >= 1 && (
            <div className="">
              <Typography variant="h4" align="center" gutterBottom>
                New Service Orders
              </Typography>
              <Grid
                container
                spacing={3}
                className="presenter-products"
                align="center"
                justifyContent="center"
              >
                {serviceNotifications.map((order, index) => (
                  <Grid key={index} item xs={12} md={6} lg={4}>
                    <Card sx={{ maxWidth: 300 }}>
                      <CardHeader
                        title={order.service}
                        style={{ marginTop: "10px" }}
                      />
                      <CardContent
                        style={{ marginTop: "-20px" }}
                        onClick={() => {
                          navigate(`/operator/servise-details/${order?._id}`);
                        }}
                      >
                        {`Date: ${order.createdAt
                          .substring(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")}`}
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton style={{ marginTop: "-30px" }}>
                          <Link to={`/operator/servise-details/${order._id}`}>
                            <MoreIcon />
                          </Link>
                        </IconButton>
                        <ExpandMore
                          expand={expandedStates[order._id]}
                          onClick={() => handleExpandClick(order._id)}
                          aria-expanded={expandedStates[order._id]}
                          aria-label="show more"
                          style={{ marginLeft: "auto", marginTop: "-30px" }}
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse
                        in={expandedStates[order._id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent sx={{ marginTop: "-20px" }}>
                          <Typography
                            variant="body2"
                            style={{ marginBottom: "5px", fontSize: "15px" }}
                          >
                            {order.description}
                          </Typography>
                          <Typography
                            variant="body2"
                            style={{ fontSize: "15px" }}
                          >
                            State: {order?.state}
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          )}
          <Typography variant="h4" align="center" gutterBottom>
            Service Orders
          </Typography>
          <Grid
            sx={{
              marginBottom: "2rem",
              marginLeft: { xs: "0rem", md: "-3rem" },
              maxWidth: { xs: "90vw", md: "500px" },
              display:"flex",
              gap:"1rem"
            }}
          >
             <TextField
                select
                label="Service Type"
                value={serviceType}
                onChange={handleServiceTypeChange}
                variant="outlined"
                style={{ minWidth: "150px" }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Delivery services">Delivery services</MenuItem>
                <MenuItem value="Packing Service">Packing Service</MenuItem>
                <MenuItem value="Customization Service">Customization Service</MenuItem>
                <MenuItem value="Assembly service">Assembly service</MenuItem>
                <MenuItem value="Measuring Service">Measuring Service</MenuItem>
              </TextField>
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
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {filteredOrders.map((order, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader
                    title={order.service}
                    style={{ marginTop: "10px" }}
                  />
                  <CardContent
                    style={{ marginTop: "-20px" }}
                    onClick={() => {
                      navigate(`/operator/servise-details/${order?._id}`);
                    }}
                  >
                    {`Date: ${order.createdAt
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}`}
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton style={{ marginTop: "-30px" }}>
                      <Link to={`/operator/servise-details/${order._id}`}>
                        <MoreIcon />
                      </Link>
                    </IconButton>
                    <ExpandMore
                      expand={expandedStates[order._id]}
                      onClick={() => handleExpandClick(order._id)}
                      aria-expanded={expandedStates[order._id]}
                      aria-label="show more"
                      style={{ marginLeft: "auto", marginTop: "-30px" }}
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedStates[order._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent sx={{ marginTop: "-20px" }}>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: "5px", fontSize: "15px" }}
                      >
                        {order.description}
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: "15px" }}>
                        State: {order?.state}
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <div>
          <p>There is no orders.</p>
        </div>
      )}
    </Grid>
  );
};

export default ViewServiceOrders;
