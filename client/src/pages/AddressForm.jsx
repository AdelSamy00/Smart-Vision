import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export default function AddressForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    country: "",
    address: "",
  });

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("shippingInfo"));
    if (storedFormData) {
      setFormData(storedFormData);
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  useEffect(() => {
    localStorage.setItem("shippingInfo", JSON.stringify(formData));
  }, [formData]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        {Object.entries(formData).map(([fieldName, fieldValue]) => (
          <Grid item xs={12} sm={6} key={fieldName}>
            <TextField
              required
              id={fieldName}
              name={fieldName}
              label={
                fieldName === "phoneNumber"
                  ? "Phone Number"
                  : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
              }
              fullWidth
              autoComplete={fieldName}
              variant="standard"
              value={fieldValue}
              onChange={handleInputChange}
            />
          </Grid>
        ))}
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveAddress"
                checked={formData.saveAddress}
                onChange={handleInputChange}
              />
            }
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}
