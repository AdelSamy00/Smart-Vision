import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiRequest } from "../../utils";
import { Select, MenuItem } from "@mui/material";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Avatar,
  Collapse,
} from "@mui/material";
import DetailsIcon from "@mui/icons-material/Details";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material/colors";
import MoreIcon from "@mui/icons-material/More";
import { Link } from "react-router-dom";
const ExpandMore = ({ expand, ...other }) => <IconButton {...other} />;

const FactorView = () => {
  const [customizationOrders, setCustomizationOrders] = useState([]);
  const [displayedOrders, setDisplayedOrders] = useState(1);
  const [expandedStates, setExpandedStates] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomizationOrders = async () => {
      try {
        const response = await axios.get("/employees/customizationOrders");
        setCustomizationOrders(response.data.customizationOrders);
        console.log(response.data.customizationOrders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchCustomizationOrders();
  }, []);

  const [selectedState, setSelectedState] = useState("");

  // ... (your other useEffect and functions)

  const handleUpdateOrderStatus = async (orderId) => {
    try {
      const response = await apiRequest({
        method: "put",
        url: "/employees/orders",
        data: {
          orderId,
          newStatus: selectedState,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handleShowMore = () => {
    setDisplayedOrders(customizationOrders.length);
  };

  const handleExpandClick = (orderId) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  const filteredOrders = customizationOrders.filter(
    (order) => order.state !== "COMPLETED"
  );

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {isLoading ? (
        <Grid item>{/* Add your loading indicator component */}</Grid>
      ) : customizationOrders.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Factor Orders
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {customizationOrders.map((order, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader
                    title={order.service}
                    style={{ marginTop: "10px" }}
                  />
                  <CardContent style={{ marginTop: "-20px" }}>
                    {`Date: ${order.createdAt
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}`}
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      style={{ marginTop: "-30px" }}
                    >
                      <Link to={`/f/order-details/${order._id}`}>
                        <MoreIcon />
                      </Link>
                      {/* details */}
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
                        style={{ marginBottom: "5px", fontSize: "15px" }}
                      >
                        Engineer: {order?.assignedEngineer?.username}
                      </Typography>
                      <Typography variant="body2" style={{ fontSize: "15px" }}>
                        State: {order?.state}
                      </Typography>

                      {/* <Select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        <MenuItem value="" disabled>
                          Select State
                        </MenuItem>
                        <MenuItem value="COMPLETED">Completed</MenuItem>
                      </Select>
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!selectedState}
                        onClick={() => handleUpdateOrderStatus(order._id)}
                      >
                        Change Status
                      </Button> */}
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <div>
          <p>There is no Materials.</p>
        </div>
      )}
    </Grid>
  );
};

export default FactorView;
