import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import './StyleSheets/Header.css';
import Menu from './Menu';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import axios from 'axios';
import LoginMessage from '../e-commers/LoginMessage';

const Header = () => {
  const navigate = useNavigate();
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [productsInCart, setproductsInCart] = useState(null);
  const [showSearchResults, setshowSearchResults] = useState(false);
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [showLoginMessage, setshowLoginMessage] = useState(false);

  async function getProducts() {
    try {
      await axios
        .get(`/products/`)
        .then((res) => {
          setProducts(res?.data?.products);
          setfilteredProducts(res?.data?.products);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  const renderUserName = () => {
    if (!customer || !customer.username) {
      return 'Log in or sign up';
    }
    return customer.username;
  };

  function numOfProductsInCart(cart) {
    let numOfProducts = 0;
    cart.map((product) => {
      numOfProducts = numOfProducts + product?.quantity;
    });
    return numOfProducts;
  }

  useEffect(() => {
    setproductsInCart(numOfProductsInCart(cart));
  }, [cart]);

  useEffect(() => {
    const filtered = Products?.filter((item) => {
      const nameMatch = item.name
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const categoryMatch = item.category
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      // const description = item.description
      //   .toLowerCase()
      //   .includes(searchValue.toLowerCase());

      if (nameMatch || categoryMatch) {
        return item;
      }
    });
    setfilteredProducts(filtered);
  }, [searchValue]);

  return (
    <header style={{ display: 'flex' }}>
      <div className="menu">
        <Menu></Menu>
        <p>Menu</p>
      </div>
      <div style={{ position: 'relative' }} className="head">
        <Toolbar
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className="header-row"
        >
          <div className="header-logo">
            <Link to={'/home'}>
              <img src="/smartVisionLogo.png" />
            </Link>
          </div>
          <div className="icons">
            <Link to={'/profile'}>
              <button
                className="userAccount btnHover"
                style={{ display: 'flex', padding: '10px 20px 10px 8px' }}
              >
                <Avatar sx={{ width: 35, height: 35 }} className="avatar" />
                <p
                  style={{
                    fontSize: '19px',
                    paddingTop: '0.2rem',
                    marginLeft: '0.5rem',
                    // width:"210px",
                    // marginLeft:"-0.7rem"
                  }}
                  className=""
                >
                  {renderUserName()}
                </p>
              </button>
            </Link>
            <button
              className="btnHover favorite"
              style={{ outline: 'none', padding: '4px 12px' }}
              onClick={() => {
                customer?._id
                  ? navigate('/favourites')
                  : setshowLoginMessage(true);
              }}
            >
              <FavoriteIcon
                style={{ fontSize: '22px', marginTop: '0.8rem' }}
              ></FavoriteIcon>
            </button>
            <Link to={'./bag'}>
              <IconButton
                aria-label="cart"
                style={{ padding: '12px', marginLeft: '2px' }}
                className="badge"
              >
                <Badge
                  badgeContent={
                    <span
                      style={{
                        fontSize: '16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {productsInCart}
                    </span>
                  }
                  color="black"
                >
                  {' '}
                  <ShoppingBasketIcon
                    style={{ color: 'black', fontSize: '25px' }}
                  />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
        <Toolbar className="searchinput">
          <div className="btnHover search">
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
            <input
              className="searchInput"
              type="search"
              value={searchValue}
              placeholder="What Are You Looking For ?"
              onChange={(e) => setsearchValue(e.target.value)}
              onFocus={() => setshowSearchResults(true)}
              onBlur={() => {
                setTimeout(() => {
                  setsearchValue('');
                  setshowSearchResults(false);
                }, 150);
              }}
            />
            {showSearchResults ? (
              <ul className="searchInputResults">
                {filteredProducts?.length > 0 ? (
                  filteredProducts?.map((item, idx) => {
                    return (
                      <li
                        className="searchInputResultsLi"
                        key={idx}
                        onClick={() => navigate(`/product/${item?._id}`)}
                      >
                        <div className="flex">
                          <img src={item?.images[0]} />
                          <div className="ml-2 items-center flex w-10/12 flex-wrap">
                            <p className="searchInputResultsProductName">
                              {item?.name}
                            </p>
                            <p className="searchInputResultsProductCategory">
                              {item?.category}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <li className="searchInputResultsNotFound">
                    No product found
                  </li>
                )}
              </ul>
            ) : null}
          </div>
        </Toolbar>
        <Toolbar className="row3">
          <ul className="headerUl links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/store">Products</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
          <button
            className="btnHover lang"
            style={{ fontSize: '19px', outline: 'none' }}
          >
            العربية
          </button>
        </Toolbar>
      </div>
      <LoginMessage
        showLoginMessage={showLoginMessage}
        setshowLoginMessage={setshowLoginMessage}
      />
    </header>
  );
};

export default Header;
