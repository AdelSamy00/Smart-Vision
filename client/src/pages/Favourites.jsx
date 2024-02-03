import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../redux/CustomerSlice';
import toast, { Toaster } from 'react-hot-toast';

function Favourites() {
  const { customer } = useSelector((state) => state.customer);
  const [favoritProducts, setFavoritProducts] = useState([])
  const dispatch = useDispatch();
  const getFavorits = async (id) => {
    await axios.get(`/customers/favorite/${id}`)
      .then((res) => {
        setFavoritProducts(res.data.favorites)
      })
      .catch((e) => {
        console.log(e)
      })
  };

  useEffect(() => {
    getFavorits(customer._id);
  }, []);

  async function favorites(id, productId) {
    console.log(id, productId)
    await axios.post('/customers/favorite', { id, productId })
      .then((res) => {
        const newData = { ...res.data?.newCustomerData };
        dispatch(SetCustomer(newData));
        toast.dismiss();
        toast(res.data.message);
      }
      ).catch((e) => {
        console.log(e)
      })
  }

const handelFavorit = (id) => {
    favorites(customer._id, id)
    setFavoritProducts((prevfavlist) => {
      return prevfavlist.filter((t) => t._id !== id);
    });
  }

  return (
    <>
      <main>
        <Toaster
          toastOptions={{
            style: {
              duration: 3000,
              border: '1px solid #6A5ACD',
              backgroundColor: '#6A5ACD',
              padding: '16px',
              color: 'white',
              fontWeight: 'Bold',
              marginTop: '65px',
              textAlign: 'center',
            },
          }}
        />
        <h1 className='text-8xl'>Favourites</h1>
        {favoritProducts.length > 0 ?
          (
            favoritProducts.map((product) => {
              return (
                <div key={product._id}>
                  <ProductCard product={product} favoriteList={customer.favoriteList} handelFavorit={handelFavorit} />
                </div>
              )
            })
          )
          :
          (
            <h2 className='text-5xl'>no product in favorite</h2>
          )
        }
      </main>
    </>
  )
}

export default Favourites