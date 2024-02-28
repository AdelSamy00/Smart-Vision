import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./PresenterStyleSheets/PresenterProductsView.css"; // Import custom CSS for advanced styling

function PresenterProductsView() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState(3); // Show initial 3 orders

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products/not-shown/");
        console.log("API response:", response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error.response.data.message);
      }
    };

    fetchProducts();
  }, []);
  const handleShowMore = () => {
    setDisplayedProducts(products.length); // Show all orders when "Show All" is clicked
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {" "}
      {/* Apply advanced styling class */}
      {isLoading ? (
        <Grid item>
          <CircularProgress />
        </Grid>
      ) : products.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Products in Inventory
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {products.slice(0, displayedProducts).map((product, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <div className={`presenter-product-card`}>
                  {" "}
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    className="presenter-product-title"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-info"
                  >
                    Quantity: {product.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-description"
                  >
                    Description: {product.description}
                  </Typography>
                  <div className="button-container">
                    {" "}
                    <Link
                      to={`/presenter-edit-product/${product?._id}`}
                      className="link-style"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className="add-to-store-button"
                      >
                        {" "}
                        Add to Store
                      </Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          {products.length > displayedProducts && (
            <Grid container justifyContent="center">
              <Button
                onClick={handleShowMore}
                variant="outlined"
                className="show-all-button"
              >
                {" "}
                {/* Apply advanced styling class */}
                Show All
              </Button>
            </Grid>
          )}
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

export default PresenterProductsView;