import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import "./stylesheets/AddProductForm.css";
import toast, { Toaster } from "react-hot-toast";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    description: "",
    category: "",
    colors: "",
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
      const response = await axios.post("/Products/", productData);
      setProductData({
        name: "",
        quantity: "",
        description: "",
        category: "",
        colors: "",
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
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Category"
            variant="outlined"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Color"
            variant="outlined"
            name="colors"
            value={productData.colors}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            name="description"
            multiline
            rows={3}
            value={productData.description}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Button type="submit" variant="contained" color="primary">
            Add Product
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Link to="/inventory">
            <Button variant="contained" color="primary">
              Show Product
            </Button>
          </Link>
        </Grid>
        {submitMessage && (
          <Grid item xs={12}>
            <p
              className={`${
                submitMessage.includes("success") ? "success" : "error"
              }`}
            >
              {submitMessage}
            </p>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default AddProductForm;