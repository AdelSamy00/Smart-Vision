import React, { useState, useEffect } from 'react';
import HomeComponent from '../../components/inventory/HomeComponent';
import MatrialComponnent from '../../components/inventory/matrialComponnent';
import Loading from '../../components/shared/Loading';
import axios from 'axios';

const InventoryHome = () => {
  const [showOrder, setshowOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [Matrials, setMatrials] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/products/`);
      setproducts(response.data.products);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`/Materials/`);
      setMatrials(response.data.materials);
      setIsLoading(false);
      console.log(response.data.materials);
    } catch (error) {
      console.error('Error fetching materials:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchMaterials();
  }, []);

  //console.log(products);
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">
        {showOrder ? 'All Products' : 'All Materials'}
      </h2>
      <div className="materialTransactionsFilterNavbarItem ml-4">
        <label htmlFor="transactionType">Select Type:</label>
        <select
          name="transactionType"
          id="transactionType"
          onChange={(e) => {
            e?.target?.value === 'Materila'
              ? setshowOrder(false)
              : setshowOrder(true);
          }}
        >
          <option value="Products">Products</option>
          <option value="Materila">Materila</option>
        </select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          <li>
            {showOrder ? (
              <HomeComponent Allproducts={products} />
            ) : (
              <MatrialComponnent AllMaterials={Matrials} />
            )}
          </li>
        </ul>
      )}
    </div>
  );
};

export default InventoryHome;
