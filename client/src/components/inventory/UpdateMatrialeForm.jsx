import React, { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const UpdateMatrialForm = () => {
  const { matrialId } = useParams();
  const [matrialData, setMatrialData] = useState({
    id:matrialId,
    name: "",
    quantity: "",
  });

  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`/Materials/${matrialId}`);
        setMatrialData(response.data.material);
        console.log(response.data.material);
      } catch (error) {
        console.error("Error fetching material details:", error);
      }
    };

    fetchMaterialDetails();
  }, [matrialId]);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "quantity" && value < 0) {
      value = 0;
    }

    setMatrialData({ ...matrialData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/Materials/`, {
        id:matrialId,
        name: matrialData.name,
        quantity: matrialData.quantity,
      });
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating material:", error);
      setSubmitMessage("Failed to update material. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}  className="ProductForm">
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
      <Grid container >
      <Grid item xs={12}>
          <TextField
            fullWidth
            label="Matrial Name"
            variant="outlined"
            name="name"
            value={matrialData.name}
            onChange={handleChange}
            required
            style={{marginBottom:"20px"}}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            fullWidth
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            value={matrialData.quantity}
            onChange={handleChange}
            required
            style={{marginBottom:"20px"}}
          />
        </Grid>
        <Grid  container >
        <Grid item xs={6}  style={{display:"flex" ,justifyContent:"flex-start"}}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </Grid>
        <Grid item xs={6}  style={{ display:"flex" ,justifyContent:"flex-end"}}>
          <Link to="/inventory">
            <Button variant="contained" color="primary">
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

export default UpdateMatrialForm;
