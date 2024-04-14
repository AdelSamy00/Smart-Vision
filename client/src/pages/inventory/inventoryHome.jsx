import React, { useState, useEffect } from 'react';
import HomeComponent from '../../components/inventory/HomeComponent';
import MatrialComponnent from '../../components/inventory/matrialComponnent';
import Loading from '../../components/shared/Loading';
import axios from 'axios';

const InventoryHome = () => {
  const [showOrder, setshowOrder] = useState(true);
  const [dataType, setDataType] = useState('products');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [products, setproducts] = useState([]);
  // const [Matrials, setMatrials] = useState([]);

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
      <h2 className="text-center text-3xl font-bold" style={{marginTop:"8vh",marginBottom:"4vh"}}>
        All {dataType === 'products' ? 'Products' : 'Materials'}
      </h2>
      <div className="materialTransactionsFilterNavbarItem ml-4" style={{marginBottom:"2vh"}}>
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
        <ul>
          <li>
            {dataType === 'products' ? (
              <HomeComponent Allproducts={data} />
            ) : (
              <MatrialComponnent AllMaterials={data} />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryHome;
