import React, { useState, useEffect } from "react";
import HomeComponent from "../../components/inventory/HomeComponent";
import MatrialComponnent from "../../components/inventory/matrialComponnent";
import Loading from "../../components/shared/Loading";
import axios from "axios";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";

const InventoryHome = () => {
  const [showOrder, setshowOrder] = useState(true);
  const [dataType, setDataType] = useState("products");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const actions = [
    { icon: <Link to={"/addMatrial"}><SpeedDialIcon /></Link>, name: 'Add Material' },
    { icon:  <Link to={"/addProduct"}><SpeedDialIcon /></Link>, name: 'Add Product' },
  ];

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/${dataType}/`);
      setData(response.data[dataType]);
      setIsLoading(false);
      console.log(response.data[dataType]);
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataType]);

  //console.log(products);
  return (
    <div>
      <h2
        className="text-center text-3xl font-bold"
        style={{ marginTop: "8vh", marginBottom: "4vh" }}
      >
        All {dataType === "products" ? "Products" : "Materials"}
      </h2>
      <div
        className="materialTransactionsFilterNavbarItem ml-4"
        style={{ marginBottom: "2vh" }}
      >
        <label htmlFor="transactionType">Select Type:</label>
        <select
          name="transactionType"
          id="transactionType"
          onChange={(e) => setDataType(e.target.value)}
          value={dataType}
        >
          <option value="products">Products</option>
          <option value="materials">Materials</option>
        </select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul style={{ position: "relative" }}>
          <li>
            {dataType === "products" ? (
              <HomeComponent Allproducts={data} />
            ) : (
              <MatrialComponnent AllMaterials={data} />
            )}
          </li>
          <Box
            sx={{
              height: 320,
              transform: "translateZ(0px)",
              flexGrow: 1,
              position: "fixed",
              bottom: 16,
              right: 0,
            }}
          >
            <SpeedDial
              ariaLabel="SpeedDial basic example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
              icon={<SpeedDialIcon/>}
              direction="left"
            >
              {actions.map((action) => (
                <SpeedDialAction
                  key={action.name}
                  icon={action.icon}
                  tooltipTitle={action.name}
                />
              ))}
            </SpeedDial>
          </Box>
        </ul>
      )}
    </div>
  );
};

export default InventoryHome;
