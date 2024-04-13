import { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { apiRequest } from "../../utils";
import toast, { Toaster } from "react-hot-toast";

function ProductOrder({ order }) {
  const { employee } = useSelector((state) => state.employee);
  const [showOrder, setShowOrder] = useState(false);
  const [products, setProducts] = useState([{ product: "", quantity: "" }]);
  const [transactions, setTransactions] = useState([]);
  const [updatedOrder, setUpdatedOrder] = useState(order);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const productData = order.products;
    console.log(productData);
    setTransactions(productData);
    const formattedProducts = productData.map((product) => ({
      product: product,
      quantity: product.quantity,
    }));

    setProducts(formattedProducts);
  }, []);
  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  useEffect(() => {
    const date = new Date(order?.createdAt);
    const formatted = date.toLocaleDateString();
    setFormattedDate(formatted);
  }, [order?.createdAt]);

  const handleStateChange = async () => {
    try {
      const response = await apiRequest({
        method: "PUT",
        url: `/employees/orders`,
        data: {
          orderId: order._id,
          newStatus: "Shipped",
        },
      });
      console.log(response.data.order);
      setUpdatedOrder(response.data.order);
      console.log("Updated order state:", response.data.order.state);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleTransaction = async (method) => {
    try {
      const managerId = employee._id;
      console.log(order);

      console.log(transactions);
      const response = await axios.put("/products/transaction", {
        managerId,
        products: products,
        method,
      });

      if (response.data.success) {
        toast.success("The Product Exported Successfully");
        handleStateChange();
        order.state = "Shipped";

        setTransactions([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("There Is No Enough Quantity In The In The Inventory");
    }
  };

  if (order.state === "Shipped") {
    return null;
  }

  return (
    <Grid container className="order-container" sx={{ marginBottom: "2rem" }}>
            <Toaster
        toastOptions={{
          style: {
            duration: 3000,
            border: "1px solid #6A5ACD",
            backgroundColor: "#6A5ACD",
            padding: "16px",
            color: "white",
            fontWeight: "Bold",
            marginTop: "65px",
            textAlign: "center",
          },
        }}
      />
      <Grid
        item
        xs={11}
        sm={8}
        md={7}
        sx={{ margin: "auto", border: "2px solid #ddd", borderRadius: "10px" }}
      >
        <Grid
          container
          sx={{
            borderBottom: showOrder ? "2px solid #ddd" : "none",
            borderStartEndRadius: "10px",
            borderStartStartRadius: "10px",
            padding: "20px",
            backgroundColor: "#f2f2f2",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={6}
            md={4}
            lg={4}
            sx={{ marginBottom: { xs: "1.3rem", md: "0rem" } }}
          >
            <Typography variant="body1">Date Placed</Typography>
            <Typography variant="body2">
              {order.createdAt
                .substring(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            md={4}
            lg={4}
            sx={{
              textAlign: { md: "center" },
              marginBottom: { xs: "2.1rem", lg: "0rem", md: "0rem" },

              display: "flex",
              justifyContent: {
                xs: "flex-end",
                md: "center",
                // lg: "flex-end",
              },
            }}
          >
            <Typography variant="body1">
              Total Products : {order?.products.length}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            sx={{
              display: "flex",
              justifyContent: {
                // xs: "flex-start",
                md: "flex-end",
                lg: "flex-end",
              },
              marginTop: {  lg: "0rem" },
              marginRight: { xs: "20px", md: "0rem", lg: "0rem" },
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
              {showOrder ? "close" : "Details"}
            </Button>
          </Grid>
        </Grid>
        {showOrder && (
          <Grid
            container
            item
            sx={{
              borderTop: "none",
              padding: "20px",
            }}
          >
            {order?.products?.map((product, index) => (
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
                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      sx={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "gray",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                        variant="body1"
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "center", md: "flex-start" },
                          color: "black",
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontSize: { xs: "16px", md: "20px" } }}
                        >
                          {product?.product?.name}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                        variant="body1"
                        sx={{
                          display: "flex",
                          justifyContent: { xs: "center", md: "flex-end" },
                          marginBottom: "1rem",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            fontSize: {
                              xs: "16px",
                              md: "20px",
                              color: "black",
                            },
                          }}
                        >
                          Quantity:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: {
                              xs: "16px",
                              md: "22px",
                              color: "black",
                            },
                          }}
                        >
                          {product?.quantity}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item sm={8} xs={6}>
              <Button
                onClick={() => handleTransaction("Export")}
                variant="contained"
                sx={{
                  backgroundColor: "#009688",
                  color: "white",
                  borderRadius: "7px",
                  ":hover": {
                    backgroundColor: "#009688",
                  },
                }}
              >
                Export
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductOrder;
