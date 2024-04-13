import React, { useEffect, useState } from 'react';
import './StyleSheets/BagPage.css';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import PendingIcon from '@mui/icons-material/Pending';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../../redux/CustomerSlice';
import axios from 'axios';
import { setCart } from '../../redux/CartSlice';
import { apiRequest } from '../../utils';
const Bag = () => {
  const [productsInCart, setproductsInCart] = useState(null);
  const [open, setOpen] = useState(false);
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handelFavorit = async (id, productId) => {
    if (customer._id) {
      await apiRequest({
        method: 'post',
        url: '/customers/favorite',
        data: {
          id,
          productId,
        },
      })
        .then((res) => {
          const newData = { ...res.data?.newCustomerData };
          dispatch(SetCustomer(newData));
          setFavorite(!favorite);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      navigate('/login');
    }
  };

  function numOfProductsInCart() {
    let numOfProducts = 0;
    cart.map((product) => {
      numOfProducts = numOfProducts + product?.quantity;
    });
    return numOfProducts;
  }

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    dispatch(setCart(updatedCart));
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(setCart(updatedCart));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );
    dispatch(setCart(updatedCart));
  };

  function calculateTotalPrice() {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return totalPrice;
  }

  const totalPrice = calculateTotalPrice();

  useEffect(() => {
    setproductsInCart(numOfProductsInCart());
  }, [cart]);

  return (
    <>
      {cart.length === 0 ? (
        <div className="BagIsEmptyDiv">
          <div>
            <h2>Your bag is empty</h2>
            <p>Add some Products</p>
            <Link
              to="/store"
              className="btn btn-lg btn-secondary font-bold text-white mt-2"
            >
              View Product
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="BagContent">
            <h1
              style={{
                fontWeight: 'bold',
                marginBottom: '1rem',
                fontSize: '40px',
                color: '#333',
              }}
              className="BagHeader"
            >
              Your Bag
            </h1>
            <p
              style={{
                fontSize: '24px',
                marginBottom: '20px',
              }}
            >
              Total Items: {productsInCart}
            </p>
            <hr />
            <ul className="BagList">
              {cart.map((item) => (
                <li
                  key={item._id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: '20px 0px',
                  }}
                >
                  {item.images && item.images.length > 0 && (
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{
                        width: '270px',
                        height: '170px',
                        marginRight: '10px',
                      }}
                    />
                  )}

                  <div style={{ marginLeft: '20px' }}>
                    <div style={{ maxWidth: '300px' }}>
                      <p>{item.name}</p>
                      <p>Price: {item.price} LE</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex' }} className="divsContent">
                        <div
                          className="quantity-controls"
                          style={{
                            padding: '7px 3px',
                            borderRadius: '30px',
                          }}
                        >
                          <button
                            onClick={() => handleDecreaseQuantity(item._id)}
                          >
                            -
                          </button>
                          <span
                            style={{
                              padding: '20px',
                            }}
                          >
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item._id)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}

                          style={{
                            marginTop: '15px',
                            marginLeft:'1rem'
                          }}
                        >
                          <DeleteSharpIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                </li>
              ))}
            </ul>
            <p
     
                className='BagTotalPrice'
            >
              Total Price: {totalPrice} EL
            </p>
            <Link to={'/checkout'} className="w-full flex justify-center">
              <Button
                type="submit"
                variant="contained"
                className="checkoutButton"
              >
                checkout
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Bag;
