import { useState, useEffect } from "react";
import { Grid, Typography, Button } from "@mui/material";
import Loading from "../Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function HomeComponent() {
  const [displayedOrders, setDisplayedOrders] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products/not-shown`);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete("/products", { data: { productId } });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const handleShowMore = () => {
    setDisplayedOrders(products.length);
  };

  return (
    <>
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
      {isLoading ? (
        <Loading />
      ) : products.length > 0 ? (
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
                borderStartEndRadius: "10px",
                borderStartStartRadius: "10px",
                padding: "10px",
                backgroundColor: "#f2f2f2",
                alignItems: "center",
              }}
            >
              <Grid
                item
                xs={6}
                md={4}
                sx={{
                  textAlign: { xs: "start", md: "center" },
                  padding: "10px 0px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Inventory Products
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
                  marginLeft: { md: "auto" },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    marginRight: "1rem",
                    fontSize: { xs: "16px", md: "20px" },
                  }}
                >
                  Total Products:{" "}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: { xs: "16px", md: "19px" } }}
                >
                  {products.length}
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
              {products.slice(0, displayedOrders).map((product, index) => (
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
                  <Grid item xs={12} md={7}>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Product Name :</span>{" "}
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>quantity:</span>{" "}
                      {product.quantity}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Category:</span>{" "}
                      {product.category}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Colors:</span>{" "}
                      {product.colors}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ marginTop: "1rem", fontSize: "20px" }}
                    >
                      <span style={{ fontWeight: "bold" }}>Date Placed:</span>{" "}
                      {product.createdAt}
                    </Typography>
                  </Grid>
                  <Grid container>
                    <Grid item sm={6} xs={12} style={{ margin: "15px 0px" }}>
                      <Link to={`/updateProduct/${product._id}`}>
                        <Button variant="contained" color="primary">
                          Update Product
                        </Button>
                      </Link>
                    </Grid>
                    <Grid item sm={6} xs={12} style={{ margin: "15px 0px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete Product
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
              {products.length > displayedOrders && (
                <Grid container justifyContent="end">
                  <Typography
                    variant="body2"
                    style={{
                      cursor: "pointer",
                      fontSize: "19px",
                      textDecoration: "underline",
                    }}
                    onClick={handleShowMore}
                  >
                    Show All
                  </Typography>
                </Grid>
              )}
              <Link to="/addProduct">
                <Button variant="contained" color="primary">
                  Add New Product
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "20px",
          width: "45%",
          border: "2px solid",
          margin: "auto",
          padding: "20px",
          marginBottom: "5rem",
          borderRadius:"5px"
        }}
        >
          <p style={{marginBottom:"12px"}}>
            There is no products .
          </p>
          <Link to="/addProduct">
            <Button variant="contained" color="primary">
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
export default HomeComponent;
