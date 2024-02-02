import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerInfo } from '../utils';
import { SetCustomer } from '../redux/CustomerSlice';
function Favourites() {
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);
  const getCustomer = async () => {
    const res = await getCustomerInfo(customer?.token);
    //console.log(res);
    const newData = { token: customer?.token, ...res };
    dispatch(SetCustomer(newData));
  };
  useEffect(() => {
    getCustomer();
  }, []);
  const [favoritProducts, setFavoritProducts] = useState([])
  const getFavorits = async (id) => {
    const res = await axios.get(`/customers/favorite/${id}`)
      .then((res) => {
        //console.log(res.data.favorites)
        setFavoritProducts(res.data.favorites)
      })
      .catch((e) => {
        console.log(e)
      })
  };

  useEffect(() => {
    getFavorits(customer._id);
  }, []);

  const handelFavorit = (id) => {
    
    setFavoritProducts((prevfavlist) => {
      return prevfavlist.filter((t) => t._id !== id);
    });
  }

  return (
    <>
      <main>{console.log(favoritProducts)}
        <h1 className='text-8xl'>Favourites</h1>
        {favoritProducts.length > 0 ? (
          favoritProducts.map((product) => {
            return (
              <div key={product._id}>
                <ProductCard product={product} favoriteList={customer.favoriteList} handelFavorit={handelFavorit} />
              </div>
            )
          })
        ) : (
          <h2 className='text-5xl'>no product in favorite</h2>
        )}
      </main>
    </>
  )
}

export default Favourites