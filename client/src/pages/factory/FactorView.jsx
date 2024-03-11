import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiRequest } from "../../utils";
import { Select, MenuItem } from "@mui/material";
import Loading from "../../components/shared/Loading";

import {
  Grid,
  Typography,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const handleUpdateOrderStatus = async (orderId) => {
    try {
        console.log("Updating order status. Order ID:", orderId, "New State:", selectedState);
      const response = await apiRequest({
        method: "put",
        url: "/employees/services",
        data: {
          orderId,
          newState: selectedState,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
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
        <Grid item><Loading/> </Grid>
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
                        sx={{ border: "none", "&:before, &:after": { border: "none" } }}
                      >
                        <MenuItem value="" disabled>
                         <ModeEditOutlineSharpIcon/>
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
          <p>There is no orders.</p>
        </div>
      )}
    </Grid>
  );
};

export default FactorView;
