import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSelector ,useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../redux/MatrialCard";
import { removeAllFromCart } from "../../redux/MatrialCard";
import DeleteIcon from '@mui/icons-material/Delete';
function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [modifiedQuantities, setModifiedQuantities] = useState({});
  const { customer } = useSelector((state) => state.customer);
  const [Matrials, setMatrials] = useState([{ material: "", quantity: "" }]);
  const [isLoading, setIsLoading] = useState(true);
  const cart = useSelector((state) => state.matrialCard.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const materialData = cart|| [];
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
      const managerId = customer._id;
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
  
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

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
          <CircularProgress />
        </Grid>
      ) : transactions.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography variant="h4" align="center" gutterBottom>
            Products in Inventory
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {transactions.map((transaction, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <div className={`presenter-product-card`}>
                  {" "}
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    className="presenter-product-title"
                  >
                    {transaction.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-info"
                  >
                    Quantity: {transaction.quantity}
                  </Typography>
                  <TextField
                    type="number"
                    label="Modify Quantity"
                    value={modifiedQuantities[index] || ""}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                    style={{ marginTop: "10px" }}
                  />
                  <div>
                    <Button
                      onClick={() => handleDelete(index)}
                      style={{color:"grey"}}
                    >
                      <DeleteIcon></DeleteIcon>
                    </Button>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleTransaction("Export")}
            >
              Export
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleTransaction("Import")}
              style={{ marginLeft: "10px" }}
            >
              Import
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8}>
          <Typography variant="h5" align="center" gutterBottom>
            All products in inventory have been added to the store.
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default TransactionsPage;
