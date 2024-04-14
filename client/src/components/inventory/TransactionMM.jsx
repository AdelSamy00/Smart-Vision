import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { apiRequest } from "../../utils";
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
import Autocomplete from "@mui/material/Autocomplete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function TransactionMM() {
  const [transactions, setTransactions] = useState([]);
  const { employee } = useSelector((state) => state.employee);
  const [Matrials, setMatrials] = useState([{ material: "", quantity: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const newMaterialNameRef = useRef(null);
  const newMaterialQuantityRef = useRef(null);
  const [AllMatrials, setAllMatrials] = useState([]);
  const [orderDetails, setOrderDetails] = useState({
    materials: [],
    newMaterialName: "",
    newMaterialQuantity: "",
  });

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`/Materials/`);
      setAllMatrials(response.data.materials);
      setIsLoading(false);
      console.log(response.data.materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };
  useEffect(() => {
    fetchMaterials();
  }, []);

  useEffect(() => {
    const selectedMaterialsData = orderDetails.materials.map(
      (selectedMaterial) => {
        const material = AllMatrials.find(
          (material) => material.name === selectedMaterial.material
        );
        return {
          material,
          quantity: selectedMaterial.quantity,
        };
      }
    );
    setMatrials(selectedMaterialsData);
    setTransactions(selectedMaterialsData);
    setIsLoading(false);
  }, [AllMatrials, orderDetails.materials]);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const addMaterial = () => {
    const { newMaterialName, newMaterialQuantity } = orderDetails;
    if (newMaterialName && newMaterialQuantity) {
      const existingMaterialIndex = orderDetails.materials.findIndex(
        (material) => material.material === newMaterialName
      );
      if (existingMaterialIndex !== -1) {
        const updatedMaterials = [...orderDetails.materials];
        updatedMaterials[existingMaterialIndex].quantity +=
          parseInt(newMaterialQuantity);
        setOrderDetails({
          ...orderDetails,
          materials: updatedMaterials,
          newMaterialName: "",
          newMaterialQuantity: "",
        });
      } else {
        setOrderDetails({
          ...orderDetails,
          materials: [
            ...orderDetails.materials,
            {
              material: newMaterialName,
              quantity: parseInt(newMaterialQuantity),
            },
          ],
          newMaterialName: "",
          newMaterialQuantity: "",
        });
      }
      newMaterialNameRef.current.value = "";
      newMaterialQuantityRef.current.value = "";
      newMaterialNameRef.current.blur();
      newMaterialQuantityRef.current.blur();
    }
  };

  const handleTransaction = async (method) => {
    try {
      const managerId = employee._id;
      console.log(transactions);
      const response = await axios.put("/Materials/transaction", {
        managerId,
        materials: Matrials,
        method,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setTransactions([]);
        setOrderDetails({
          materials: [],
          newMaterialName: "",
          newMaterialQuantity: "",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("Failed to make transaction. Please try again.");
    }
  };
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
  const removeMaterial = (index) => {
    const materials = [...orderDetails.materials];
    materials.splice(index, 1);
    setOrderDetails({ ...orderDetails, materials });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
      spacing={2}
    >
      {" "}
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
      <Grid item xs={12}>
        <Typography
          variant="h5"
          style={{
            padding: "20px 0px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          Materials Transaction :
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Autocomplete
          options={AllMatrials}
          getOptionLabel={(option) => option.name}
          id="combo-box-demo"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Material Name"
              type="text"
              name="newMaterialName"
              inputRef={newMaterialNameRef}
              value={orderDetails.newMaterialName}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                orderDetails.newMaterialName.trim() !== "" &&
                newMaterialQuantityRef.current.focus()
              }
            />
          )}
          onChange={(event, newValue) => {
            if (newValue) {
              setOrderDetails({
                ...orderDetails,
                newMaterialName: newValue.name,
              });
            }
          }}
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
        <Button fullWidth onClick={addMaterial} style={{ marginTop: "10px" }}>
          Add
        </Button>
      </Grid>
      {orderDetails.materials.length > 0 && (
        <Grid item xs={12}>
          <List
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              paddingTop: "0px",
            }}
          >
            {orderDetails.materials.map((material, index) => (
              <ListItem key={index} style={{ paddingBottom: "0px" }}>
                <ListItemText primary={material.material} />
                <ListItemText secondary={material.quantity} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeMaterial(index)}
                >
                  <DeleteForeverIcon
                    sx={{ fontSize: "32px" }}
                    style={{ marginRight: "3vw" }}
                  />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      )}
      <Grid item xs={12}>
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <Button
            variant="contained"
            onClick={() => handleTransaction("Export")}
            style={{ backgroundColor: "#edede9", color: "black" }}
          >
            Export
          </Button>
          <Button
            variant="contained"
            onClick={() => handleTransaction("Import")}
            style={{
              marginLeft: "70px",
              backgroundColor: "#edede9",
              color: "black",
            }}
          >
            Import
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default TransactionMM;
