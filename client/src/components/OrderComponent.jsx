import { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function OrderComponent({ order }) {
  const [showOrder, setShowOrder] = useState(false);
  const [canselOrder, setCanselOrder] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [deleteMessage, setDeletemessage] = useState(null);
  const { customer } = useSelector((state) => state.customer);

  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };
  const calculateTotalItems = () => {
    let totalItems = 0;
    order?.products.map((product) => {
      totalItems += product?.product?.quantity || 1;
    });
    return totalItems;
  };
  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(`/customers/order`, {
        data: { id: customer?._id, orderId: orderId },
      });
      if (response.status === 200) {
        setUpdatedOrder(response.data.order);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error cancelling order:", error.response.data.message);
      setDeletemessage(error.response.data.message);
    }
  };
  return (
    <Grid container className="order-container" sx={{ marginBottom: "2rem" }}>
      <Grid
        item
        xs={11}
        sm={8}
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
            // textAlign:"center"
          }}
        >
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{ marginBottom: { xs: "1.5rem", md: "0rem" } }}
          >
            <Typography variant="body1">Date Placed</Typography>
            <Typography variant="body2">{order?.createdAt}</Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            sx={{
              textAlign: { xs: "end", md: "center" },
              marginBottom: { xs: "1.5rem", md: "0rem" },
              marginTop: { xs: "-1.5rem", md: "0rem" },
              // backgroundColor:"red"
            }}
          >
            <Typography variant="body1">Order Number</Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
              New
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            // sm={6}
            md={4}
            lg={3}
            sx={{ textAlign: { xs: "start", md: "center" } }}
          >
            <Typography variant="body1">Total Amount</Typography>
            <Typography variant="body2">{calculateTotalItems()}</Typography>
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
                ":hover": {
                  backgroundColor: "#009688",
                },
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
            {/* {console.log(order)} */}
            {order?.products.map((product, index) => (
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
                  <Grid item xs={12} md={4}>
                    <img
                      src={product?.product?.images[0]}
                      alt={product?.product?.name}
                      style={{
                        width: "100%",
                        height:"150px",
                        borderRadius: "5px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Typography
                      variant="body1"
                      sx={{
                        display: "flex",
                        fontSize: { xs: "18px", fontWeight: "bold" },
                      }}
                    >
                      <span>{product?.product?.name}</span>
                      <span style={{ marginLeft: "auto" }}>
                        {product?.product?.price}EGP
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: { xs: "10px" } }}
                    >
                      <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                      {product?.product?.description}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body1" xs={6}>
                <span style={{ fontWeight: "bold" }}>State: </span>{" "}
                {updatedOrder?.state}
              </Typography>
              <Typography variant="body1" xs={6}>
                {updatedOrder.state !== "CANCELED" && (
                  <Button
                    onClick={() => {
                      // console.log(order?._id);
                      cancelOrder(order?._id);
                    }}
                    variant="contained"
                    sx={{
                      backgroundColor: "#009688",
                      color: "white",
                      borderRadius: "5px",
                      ":hover": {
                        backgroundColor: "#009688",
                      },
                    }}
                  >
                    Delete Order
                  </Button>
                )}
              </Typography>
            </Grid>
            <Grid
              xs={12}
              sx={{ display: "flex", justifyContent: "flex-end", color: "red" }}
            >
              {" "}
              <Typography xs={12}>{deleteMessage}</Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default OrderComponent;
