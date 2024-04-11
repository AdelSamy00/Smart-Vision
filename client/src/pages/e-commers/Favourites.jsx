import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/e-commers/ProductCard.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../../redux/CustomerSlice.js';
import toast, { Toaster } from 'react-hot-toast';
import './StyleSheets/Favorites.css';
import Loading from '../../components/shared/Loading.jsx';
import { setCart } from '../../redux/CartSlice.js';

function Favourites() {
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [favoritProducts, setFavoritProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inCart, setInCart] = useState(null);
  const dispatch = useDispatch();

  const getFavorits = async (id) => {
    await axios
      .get(`/customers/favorite/${id}`)
      .then((res) => {
        setFavoritProducts(res.data.favorites);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getFavorits(customer?._id);
  }, []);

  async function favorites(id, productId) {
    console.log(id, productId);
    await axios
      .post('/customers/favorite', { id, productId })
      .then((res) => {
        const newData = {
          token: localStorage?.getItem('token'),
          ...res.data?.newCustomerData,
        };
        dispatch(SetCustomer(newData));
        toast.dismiss();
        toast(res.data.message);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handelFavorit = (id) => {
    favorites(customer?._id, id);
    setFavoritProducts((prevfavlist) => {
      return prevfavlist.filter((t) => t._id !== id);
    });
  };

  //remove product from cart
  function deleteProductFromCart(prevCart, id) {
    return prevCart.filter((t) => t._id !== id);
  }

  const handelCart = (id, name, price, images, points) => {
    const inCart = cart.find((prod) => {
      return prod._id === id;
    });
    //item all ready in the cart
    if (inCart) {
      dispatch(setCart(deleteProductFromCart(cart, id)));
      setInCart(false);
    } else {
      dispatch(
        setCart([
          ...cart,
          { _id: id, name, price, images, points, quantity: 1 },
        ])
      );
      setInCart(true);
    }
  };
  return (
    <>
      <main className="favoritesMain">
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
        <h1>Favorites</h1>
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className={
              favoritProducts.length > 0
                ? 'favoritesProductes'
                : 'EmptyfavoriteProducte'
            }
            style={{display:"flex" ,justifyContent:"center"}}
          >
            {favoritProducts.length > 0 ? (
              favoritProducts.map((product) => {
                return (
                  <div key={product._id} className="favoriteProducteDiv">
                    <ProductCard
                      product={product}
                      favoriteList={customer?.favoriteList}
                      handelFavorit={handelFavorit}
                      handelCart={handelCart}
                    />
                  </div>
                );
              })
            ) : (
              <h2>Your favorite list is empty.</h2>
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Favourites;
