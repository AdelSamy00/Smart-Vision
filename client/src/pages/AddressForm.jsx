import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";


export default function AddressForm() {
  const [formData, setFormData] = useState(() => {
    const storedFormData = JSON.parse(localStorage.getItem("shippingInfo"));
    return storedFormData || {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      city: "",
      country: "",
      address: "",
    };
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    localStorage.setItem("shippingInfo", JSON.stringify(formData));
    console.log(formData);
  }, [formData]);


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <form >
      <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Address"
              autoComplete="shipping address-line1"
              value={formData.address}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="city"
              name="city"
              label="City"
              autoComplete="shipping address-level2"
              value={formData.city}
              required
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="country"
              name="country"
              label="Country"
              autoComplete="shipping country"
              value={formData.country}
              required
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}
