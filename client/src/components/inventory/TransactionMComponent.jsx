import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/MatrialCard";
import { removeAllFromCart } from "../../redux/MatrialCard";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomMobileStepper from "./MobileStepperComponent";

import {
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
function TransactionMComponent() {
  const [transactions, setTransactions] = useState([]);
  const [modifiedQuantities, setModifiedQuantities] = useState({});
  const { employee } = useSelector((state) => state.employee);
  const [Matrials, setMatrials] = useState([{ material: "", quantity: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useSelector((state) => state.matrialCard.cart);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const currentTransaction = transactions[activeStep];

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, transactions.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  useEffect(() => {
    const materialData = cart || [];
    setTransactions(materialData);
    const formattedMaterials = materialData.map((material) => ({
      material: material,
      quantity: "",
    }));

    setMatrials(formattedMaterials);
    console.log(formattedMaterials);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const handleQuantityChange = (index, value) => {
    setModifiedQuantities((prev) => ({
      ...prev,
      [index]: parseInt(value, 10) || 0,
    }));
    setMatrials((prevMatrials) => {
      const updatedMatrials = [...prevMatrials];
      updatedMatrials[index].quantity = parseInt(value, 10) || 0;
      return updatedMatrials;
    });
    console.log("matrial", Matrials);
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
        dispatch(removeAllFromCart());
        setTransactions([]);
        localStorage.removeItem("card");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error making transaction:", error);
      toast.error("Failed to make transaction. Please try again.");
    }
  };

  const handleDelete = (index) => {
    dispatch(removeFromCart(transactions[index]._id));
    setTransactions((prevTransactions) => {
      const updatedTransactions = [...prevTransactions];
      updatedTransactions.splice(index, 1);
      return updatedTransactions;
    });
    setModifiedQuantities((prev) => {
      const updatedQuantities = { ...prev };
      delete updatedQuantities[index];
      return updatedQuantities;
    });
    setMatrials((prevMatrials) => {
      const updatedMatrials = [...prevMatrials];
      updatedMatrials.splice(index, 1);
      return updatedMatrials;
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
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
      {isLoading ? (
        <Grid item>
        </Grid>
      ) : transactions.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Materials
          </Typography>

          <Grid item xs={12} sm={10} md={10}>
            <Grid
              container
              spacing={3}
              className="presenter-products"
              align="center"
              justifyContent="center"
              style={{ textTransform: "uppercase"}}
            >
              <Grid item>
                <Card
                  sx={{ maxWidth: 250 }}
                  sm={{ maxWidth: 600 }}
                  lg={{ maxWidth: 250 }}
                  xs={{ maxWidth: 600 }}
                  style={{backgroundColor:"#edede9"}}
                >
                  <CardHeader
                    title={currentTransaction.name}
                    style={{ marginTop: "10px" }}
                  />
                  <CardContent style={{ marginTop: "-20px" }}>
                    Quantity: {currentTransaction.quantity}
                    <input
                      placeholder="Enter Quantity"
                      value={modifiedQuantities[activeStep] || ""}
                      onChange={(e) =>
                        handleQuantityChange(activeStep, e.target.value)
                      }
                      style={{
                        marginTop: "10px",
                        padding: "8px",
                        width: "80%",
                        borderRadius:"4px",
                        border:"1px solid"
                      }}
                    />
                    <Button
                      onClick={() => handleDelete(activeStep)}
                      style={{ color: "grey" }}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10} md={10} lg={8}>
            <CustomMobileStepper
              activeStep={activeStep}
              maxSteps={transactions.length}
              handleNext={handleNext}
              handleBack={handleBack}
            />
          </Grid>

          <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={() => handleTransaction("Export")}
              
              style={{backgroundColor:"#edede9", color:"black"}}
            >
              Export
            </Button>
            <Button
              variant="contained"
              onClick={() => handleTransaction("Import")}
              style={{ marginLeft: "70px" ,backgroundColor:"#edede9", color:"black"}}
            >
              Import
            </Button>
          </Grid>
        </Grid>
      ):(
        <div
        style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '20px',
          width: '45%',
          border: '2px solid',
          margin: 'auto',
          padding: '20px',
          borderRadius: '5px',
          marginTop:"40px"
        }}
      >
        <p style={{ marginBottom: '12px' }}>There is no Materials .</p>
      </div>
      )}
    </Grid>
  );
}

export default TransactionMComponent;
