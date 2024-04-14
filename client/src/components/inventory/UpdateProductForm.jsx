import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
const UpdateProductForm = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    name: "",
    quantity: "",
    description: "",
    category: "",
    colors: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/Products/${productId}`);
        setProductData(response.data.product);
        console.log(response.data.product)
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

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
      const response = await axios.put(`/Products/updateDetails/${productId}`, productData);
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating product:", error);
      setSubmitMessage("Failed to update product. Please try again.");
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
        <Grid container style={{marginTop:"20px"}}>
        <Grid item xs={6}  style={{display:"flex",marginLeft:"15px"}}>
          <Button type="submit" variant="contained" style={{backgroundColor: "#edede9", color: "black"}}>
            Update
          </Button>
        </Grid>
        <Grid item xs={5.6}  style={{display:"flex" ,justifyContent:"flex-end",marginRight:"-30px"}}>
          <Link to="/inventory">
            <Button variant="contained" style={{backgroundColor: "#edede9", color: "black"}}>
              Show
            </Button>
          </Link>
        </Grid>
        </Grid>

        {submitMessage && (
          <Grid item xs={12}>
            <p className="error">{submitMessage}</p>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default UpdateProductForm;
