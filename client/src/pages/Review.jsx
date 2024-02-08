import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";

export default function Review() {
  const [products, setProducts] = React.useState([]);
  const [shippingInfo, setshippingInfo] = React.useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(storedCart);
    const Shipping = JSON.parse(localStorage.getItem("shippingInfo"));
    setshippingInfo(Shipping);
  }, []);
  function calculateTotalPrice(cart) {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);

    return totalPrice;
  }

  const totalPrice = calculateTotalPrice(products);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem
            key={product._id}
            sx={{
              py: 1,
              px: 0,
              borderTop: "1px solid grey",
              borderBottom: "1px solid grey",
              boxShadow:'none'
            }}
            variant="outlined"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              style={{ width: 100, height: 70, marginRight: 10 }}
            />
            <Typography variant="body2" style={{ fontSize: "15px" }}>
              <span style={{ fontSize: "18px" }}>{product.quantity?product.quantity:1}</span> x{" "}
              {(product.name)}
              <br />
              {/* <span style={{ fontSize: "11px" }}>{product.description}</span> */}
            </Typography>

            <Typography
              variant="body2"
              sx={{ fontWeight: 700, marginRight: 3, marginLeft: "auto" }}
            >
              EGP {product.price}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" sx={{ marginLeft: 3 }} />
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, marginRight: 3 }}
          >
            EGP {totalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2} style={{ textAlign: "" }}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping Info
          </Typography>
          {shippingInfo && (
            <React.Fragment>
              <Typography gutterBottom>
                Your Name Is :{shippingInfo.firstName} {shippingInfo.lastName}
              </Typography>
              <Typography gutterBottom>
                Your Address Is :{shippingInfo.address}
              </Typography>
              <Typography gutterBottom>
                Your Phone Number Is :{shippingInfo.phoneNumber}
              </Typography>
            </React.Fragment>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
