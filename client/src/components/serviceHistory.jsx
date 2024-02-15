import React, { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function ServiceHistory() {
  const [showOrder, setShowOrder] = useState(false);
  const [orderServiceHistory, setOrderServiceHistory] = useState([]);
  const { customer } = useSelector((state) => state.customer);

  useEffect(() => {
    async function fetchOrderServiceHistory() {
      try {
        const response = await axios.get(`/customers/service/${customer._id}`);
        setOrderServiceHistory(response.data.history);
        console.log(response.data);
        console.log(response.data.createdAt);
      } catch (error) {
        console.error("Error fetching order history:", error.response.data.message);
      }
    }

    if (customer && customer._id) {
      fetchOrderServiceHistory();
    }
  }, [customer]);

  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <Grid container className="order-container" sx={{ marginBottom: "2rem" }}>
      <Grid
        item
        xs={11}
        md={7}
        sx={{ margin: "auto", border: "1px solid #ddd", borderRadius: "10px" }}
      >
        <Grid
          container
          sx={{
            borderBottom: "2px solid #ddd",
            padding: "20px",
            backgroundColor: "#f2f2f2",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{
              textAlign: { xs: "end", md: "center" },
              marginBottom: { xs: "1.5rem", md: "0rem" },
              marginTop: { xs: "-1.5rem", md: "0rem" },
            }}
          >
            <Typography variant="body1">Total Services</Typography>
            <Typography variant="body2">{orderServiceHistory.length}</Typography>
          </Grid>
          {/* </Grid> */}
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{
              textAlign: { xs:"end", md: "center" },
              marginBottom: { xs: "1.5rem", md: "0rem" },
              marginTop: { xs: "-1.5rem", md: "0rem" },
              // backgroundColor:"red"
            }}
          >
            <Typography variant="body1">Order Number</Typography>
            <Typography variant="body2" sx={{textAlign:"center"}}>New</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{
              display: "flex",
              justifyContent: {
                xs: "flex-end",
                md: "flex-start",
                lg: "flex-end",
              },
              marginTop: { md: "1.7rem", lg: "0rem" },
            }}
          >
            <Button
              onClick={toggleOrder}
              variant="contained"
              sx={{
                backgroundColor: "#009688",
                color: "white",
                borderRadius: "5px",
              }}
            >
              {showOrder ? "Hide Order" : "Show Order"}
            </Button>
          </Grid>
        </Grid>
        {showOrder && (
          <Grid
            container
            sx={{
              border: "2px solid #ddd",
              borderTop: "none",
              padding: "20px",
            }}
          >
            {orderServiceHistory.map((historyEntry, index) => (
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
                <Grid container spacing={2}>
                <Grid item xs={12} md={8} >
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: { xs: "10px" }, fontSize:"20px"}}
                    >
                      <span style={{ fontWeight: "bold" }}>Service Name :</span>{" "}
                      {historyEntry.service}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>

                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: { xs: "10px" } ,fontSize:"20px"}}
                    >
                      <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                      {historyEntry.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: { xs: "10px" } ,fontSize:"20px"}}
                    >
                      <span style={{ fontWeight: "bold" }}>state:</span>{" "}
                      {historyEntry.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: { xs: "10px" } ,fontSize:"20px"}}
                    >
                      <span style={{ fontWeight: "bold" }}>Date Placed:</span>{" "}
                      {historyEntry.createdAt}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default ServiceHistory;
