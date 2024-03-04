import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../Presenter/StyleSheets/PresenterProductsView.css";
import { apiRequest } from "../../utils";

function ViewCutomizedOrder() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { employee } = useSelector((state) => state.employee);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: `/employees/customizationOrders/${employee._id}`,
        });
        console.log("API response:", response.data.customizationOrders);
        setRequests(response.data.customizationOrders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {" "}
      {isLoading ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : requests.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Sevice Requests
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {requests.map((request, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <div className={`presenter-product-card`}>
                  {" "}
                  {console.log(request)}
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-info"
                  >
                    Customer: {request.customer.username}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-description"
                  >
                    Description: {request.description}
                  </Typography>
                  <Typography>
                    <Link to={"/"}>
                      <Button
                        variant="text"
                        sx={{
                          textDecoration: "underline",
                          textTransform: "capitalize",
                          padding: 0,
                          "&:hover": {
                            backgroundColor: "white",
                            color: "black",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        Service Details
                      </Button>
                    </Link>
                  </Typography>
                  <div className="button-container">
                    {" "}
                    <Link
                      to={`/engineer/send-request/${request._id}`}
                      className="link-style"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className="add-to-store-button"
                        style={{
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                        //   borderRadius: 3,
                        //   border: 0,
                        //   color: "white",
                        textTransform:"capitalize",
                          height: 38,
                          padding: "0px 15px",
                        }}
                      >
                        {" "}
                        Send Order To Factory
                      </Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" align="center" gutterBottom>
            All products in inventory have been added to the store.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default ViewCutomizedOrder;
