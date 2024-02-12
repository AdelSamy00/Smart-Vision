import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const [products, setProducts] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Shipping address", "Review your order"];
  const { customer } = useSelector((state) => state.customer);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review products={products} />;
      default:
        throw new Error("Unknown step");
    }
  }
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(storedCart);
    setProducts(storedCart);
  }, []);
  // console.log(products);
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
  // console.log(totalPrice);
  function calculateTotalPoints(cart) {
    if (!cart || cart.length === 0) {
      return 0;
    }

    const totalPoints = cart.reduce((total, item) => {
      const points = typeof item.points === "number" ? item.points : 0;
      return total + points;
    }, 0);

    return totalPoints;
  }
  const totalPoints = calculateTotalPoints(products);
  console.log(totalPoints);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handlePlaceOrder = async () => {
    try {
      const productsWithDetails = products.map((product) => ({
        product: product?._id,
        quantity: product?.quantity || 1,
      }));
      console.log(productsWithDetails.length);
      const response = await axios.post("/customers/order", {
        id: customer._id,
        cart: productsWithDetails,
        totalPrice: totalPrice,
        totalPoints: totalPoints,
      });
      console.log("Order placed successfully:", response.data);
      localStorage.removeItem("cart");
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.error("Error placing order:", error.response.data.message);
    }
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #212345. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    activeStep === 0 ? "flex-end" : "space-between",
                }}
              >
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={
                    activeStep === steps.length - 1
                      ? handlePlaceOrder
                      : handleNext
                  }
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
