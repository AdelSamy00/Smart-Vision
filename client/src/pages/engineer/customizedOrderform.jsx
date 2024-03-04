import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useParams } from "react-router-dom";
import "./EngineerStyleSheets/CustomizedOrderForm.css";
import { apiRequest } from "../../utils";
import { useSelector } from "react-redux";

const CustomOrderForm = () => {
  const { requestId } = useParams();
  const [error, setError] = useState("");
  const { employe } = useSelector((state) => state.employee);
  const [orderDetails, setOrderDetails] = useState({
    customerName: "",
    description: "",
    materials: [],
    additionalDetails: "",
    newMaterialName: "",
    newMaterialQuantity: "",
  });
  const [customOrder, setCustomOrder] = useState("");
  const newMaterialNameRef = useRef(null);
  const newMaterialQuantityRef = useRef(null);

  useEffect(() => {
    const fetchCustomOrder = async () => {
      try {
        const response = await apiRequest({
          method: "GET",
          url: `/employees/customizationOrder/${requestId}`,
        });
        setCustomOrder(response.data.customizationOrder);
        console.log(response.data.customizationOrder);
      } catch (error) {
        console.error("Error fetching custom order:", error);
      }
    };

    fetchCustomOrder();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleQuantityKeyDown = (e) => {
    if (e.key === "Enter") {
      if (orderDetails.newMaterialName.trim() !== "") {
        addMaterial();
      }
    }
  };

  const addMaterial = () => {
    const { newMaterialName, newMaterialQuantity } = orderDetails;
    if (newMaterialName && newMaterialQuantity) {
      setOrderDetails({
        ...orderDetails,
        materials: [
          ...orderDetails.materials,
          {
            material: newMaterialName,
            quantity: newMaterialQuantity,
          },
        ],
        newMaterialName: "",
        newMaterialQuantity: "",
      });
      setError("");
      newMaterialNameRef.current.value = "";
      newMaterialQuantityRef.current.value = "";
      newMaterialNameRef.current.blur();
      newMaterialQuantityRef.current.blur();
    }
  };

  const removeMaterial = (index) => {
    const materials = [...orderDetails.materials];
    materials.splice(index, 1);
    setOrderDetails({ ...orderDetails, materials });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (orderDetails.materials.length === 0) {
      setError("Please add materials before submitting.");
      return;
    }
    try {
      const response = await apiRequest({
        method: "POST",
        url: "employees/send-customization-details/",
        data: {
          serviceId: requestId,
          engineerId: employe._id,
          materials: orderDetails.materials,
          // details: customOrder.details,
        },
      });
      setOrderDetails({
        ...orderDetails,
        materials: [],
      });
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      console.error("Error placing order:", error.response.data.message);
    }
  };
  return (
    //   <Typography variant="h2" style={{ marginBottom: "20px" }}>
    //     Custom Order Form
    //   </Typography>
    <form onSubmit={handleSubmit} className="custom-order-form">
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <TextField
            label="Customer Name"
            name="customerName"
            value={customOrder.customer?.username}
            fullWidth
            onChange={handleChange}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={customOrder?.description}
            fullWidth
            onChange={handleChange}
            disabled
            InputLabelProps={{
              shrink: true, 
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            Materials Needed:
          </Typography>
        </Grid>

        <Grid item xs={5}>
          <TextField
            label="Material Name"
            name="newMaterialName"
            inputRef={newMaterialNameRef}
            value={orderDetails.newMaterialName}
            onChange={handleChange}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              orderDetails.newMaterialName.trim() !== "" &&
              newMaterialQuantityRef.current.focus()
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            type="number"
            label="Quantity"
            name="newMaterialQuantity"
            inputRef={newMaterialQuantityRef}
            value={orderDetails.newMaterialQuantity}
            onChange={handleChange}
            onKeyDown={handleQuantityKeyDown}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            onClick={addMaterial}
            style={{ marginTop: "10px" }}
          >
            Add
          </Button>
        </Grid>
        {orderDetails.materials.length > 0 && (
          <Grid item xs={12}>
            <List>
              {orderDetails.materials.map((material, index) => (
                <ListItem key={index}>
                  <ListItemText primary={material.material} />
                  <ListItemText secondary={material.quantity} />
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => removeMaterial(index)}
                  >
                    <DeleteForeverIcon sx={{ fontSize: "32px" }} />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        )}
        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
        </Grid>
        {/* <Grid item xs={12}> */}
          {/* <a
            href={customOrder.details}
            target="_blank"
            rel="noopener noreferrer"
          >
            <TextField
              label="Additional Details"
              name="pdfLink"
              value={customOrder.details}
              fullWidth
              InputProps={{
                readOnly: true, // Make the input read-only
              }}
              InputLabelProps={{
                shrink: true, // Move the label up when input has a value
              }}
            />
          </a> */}
        
        {/* </Grid> */}
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px",textTransform:"capitalize" }}
          >
            Submit Request
          </Button>
        </Grid>
      </Grid>
    </form>
    // </div>
  );
};

export default CustomOrderForm;
