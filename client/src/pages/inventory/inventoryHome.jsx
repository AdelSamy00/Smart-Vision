import React, { useState, useEffect } from 'react';
import HomeComponent from '../../components/inventory/HomeComponent'; 
import MatrialComponnent from '../../components/inventory/matrialComponnent';
import Loading from '../../components/Loading';
import { Button, FormControlLabel, Switch, Typography } from "@mui/material";
import axios from 'axios';

const InventoryHome = () => {
  const [products, setProducts] = useState([]);
  const [Matrials, setMatrials] = useState([]);

  const [showOrderHistory, setShowOrderHistory] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [label, setLabel] = useState("Inventory Products");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products/not-shown`);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const toggleHistory = () => {
    setShowOrderHistory((prevShowOrderHistory) => !prevShowOrderHistory);
    setLabel((prevLabel) =>
      prevLabel === "Inventory Products" ? "Inventory Materials" : "Inventory Products"
    );
  };

  return (
    <div>
      <FormControlLabel
        labelPlacement="start"
        label={label}
        control={
          <Switch
            checked={showOrderHistory}
            onChange={toggleHistory}
            color="primary"
          />
        }
        sx={{ marginBottom: "1rem", marginLeft: "5%" }}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
            <li>
              {showOrderHistory ? (
                <HomeComponent/>
              ) : (
                <MatrialComponnent/>
              )}
            </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryHome;
