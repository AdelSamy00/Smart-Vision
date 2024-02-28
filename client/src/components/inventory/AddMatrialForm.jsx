import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./stylesheets/AddProductForm.css";
import toast, { Toaster } from "react-hot-toast";

const AddMatrialForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "quantity" && value < 0) {
      value = 0;
    }

    setProductData({ ...productData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/Materials/", productData);
      setProductData({
        name: "",
        quantity: ""
      })
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product:", error);
      setSubmitMessage("Failed to add product. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ProductForm">
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
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid container style={{marginTop:"20px"}}>
        <Grid item xs={6}  style={{display:"flex",marginLeft:"15px"}}>
          <Button type="submit" variant="contained" color="primary">
            Add 
          </Button>
        </Grid>
        <Grid item xs={5.6}  style={{display:"flex" ,justifyContent:"flex-end",marginRight:"-30px"}}>
          <Link to="/inventory">
            <Button variant="contained" color="primary">
              Show 
            </Button>
          </Link>
        </Grid>
        </Grid>

      </Grid>
    </form>
  );
};

export default AddMatrialForm;
