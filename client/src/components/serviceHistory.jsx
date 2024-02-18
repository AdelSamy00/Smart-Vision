import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function ServiceHistory() {
  const [orderServiceHistory, setOrderServiceHistory] = useState([]);
  const { customer } = useSelector((state) => state.customer);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedOrders, setDisplayedOrders] = useState(1);
  useEffect(() => {
    async function fetchOrderServiceHistory() {
      try {
        const response = await axios.get(`/customers/service/${customer._id}`);
        setOrderServiceHistory(response.data.history);
        setIsLoading(false);
        console.log(response.data);
        console.log(response.data.createdAt);
      } catch (error) {
        console.error(
          "Error fetching order history:",
          error.response.data.message
        );
      }
    }

    if (customer && customer._id) {
      fetchOrderServiceHistory();
    }
  }, [customer]);

  const cancelService = async (serviceId) => {
    try {
      const response = await axios.delete(`/customers/service`, {
        data: { id: customer._id, serviceId },
      });
      console.log(response.data);
      setOrderServiceHistory((prevOrderServiceHistory) =>
        prevOrderServiceHistory.map((entry) =>
          entry._id === serviceId ? { ...entry, state: "CANCELED" } : entry
        )
      );
    } catch (error) {
      console.error("Error cancelling service:", error.response.data.message);
    }
  };
  const handleShowMore = () => {
    // setDisplayedOrders((prevDisplayedOrders) => prevDisplayedOrders + 2); // Display additional 2 orders
    setDisplayedOrders(orderServiceHistory.length);
  };
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : orderServiceHistory.length > 0 ? (
        <Grid
          container
          className="order-container"
          sx={{ marginBottom: "2rem" }}
        >
          <Grid
            item
            xs={11}
            md={7}
            sx={{
              margin: "auto",
              border: "2px solid #ddd",
              borderRadius: "10px",
            }}
          >
            <Grid
              container
              sx={{
                borderBottom: "2px solid #ddd",
                borderStartEndRadius:"10px",
                borderStartStartRadius:"10px",
                padding: "10px",
                backgroundColor: "#f2f2f2",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={6}
                md={4}
                // lg={3}
                sx={{
                  textAlign: { xs: "start", md: "center" },
                  padding: "10px 0px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    // fontWeight: "bold",
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Service History
                </Typography>
              </Grid>
              <Grid
                item
                xs={6}
                md={4}
                // lg={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: { md: "auto" }
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: "1rem",
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Total Orders:{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "16px", md: "19px" } }}
                >
                  {orderServiceHistory.length}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                borderTop: "none",
                padding: "20px",
              }}
            >
              {orderServiceHistory
                .slice(0, displayedOrders)
                .map((historyEntry, index) => (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sx={{
                      border: "2px solid #ddd",
                      borderRadius: "5px",
                      marginBottom: "20px",
                      padding: "20px",
                    }}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        {historyEntry.images.length === 1 ? (
                          <img
                            src={historyEntry.images[0]}
                            alt={`Image 1`}
                            style={{ width: "100%", height: "150px" }}
                          />
                        ) : (
                          <Slider {...settings}>
                            {historyEntry.images.map((image, index) => (
                              <div key={index}>
                                <img
                                  src={image}
                                  alt={`Image ${index + 1}`}
                                  style={{ width: "100%", height: "150px" }}
                                />
                              </div>
                            ))}
                          </Slider>
                        )}
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Typography
                          variant="body2"
                          style={{ marginTop: "1rem", fontSize: "20px" }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Service Name :
                          </span>{" "}
                          {historyEntry.service}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ marginTop: "1rem", fontSize: "20px" }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Date Placed:
                          </span>{" "}
                          {historyEntry.createdAt}
                        </Typography>
                        <Typography
                          variant="body2"
                          style={{ marginTop: "1rem", fontSize: "20px" }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            Description:
                          </span>{" "}
                          {historyEntry.description}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          textAlign: "center",
                          // backgroundColor:"red",
                          // paddingTop:"0"
                        }}
                      >
                        <Typography
                          variant="body2"
                          // xs={6}
                          style={{ fontSize: "20px", paddingTop: "0" }}
                        >
                          <span style={{ fontWeight: "bold", color: "#222" }}>
                            State:
                          </span>{" "}
                          {historyEntry.state}
                        </Typography>
                        {historyEntry.state !== "CANCELED" && (
                          <Button
                            onClick={() => cancelService(historyEntry._id)}
                            variant="contained"
                            color="error"
                            xs={4}
                            sx={{
                              backgroundColor: "#009688",
                              color: "white",
                              borderRadius: "5px",
                              // paddingTop:"0",
                              ":hover": {
                                backgroundColor: "#009688",
                              },
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              {orderServiceHistory.length > displayedOrders && (
                 <Grid container justifyContent="end">
                 <Typography
                   variant="body2"
                   style={{ cursor: "pointer" ,fontSize:"19px",textDecoration:"underline"}}
                   onClick={handleShowMore}
                 >
                   Show All
                 </Typography>
               </Grid>
              )}
            </Grid>

            {/* )} */}
          </Grid>
        </Grid>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Your service history is empty.
        </p>
      )}
    </>
  );
}

export default ServiceHistory;
