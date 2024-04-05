import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './StyleSheets/Store.css';
import ProductCard from '../../components/e-commers/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../../redux/CustomerSlice';
import { setCart } from '../../redux/CartSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/shared/Loading';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import { apiRequest } from '../../utils';
import LoginMessage from '../../components/e-commers/LoginMessage';
const Store = ({ selectedCategory, selectedPrice }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortByPriceOption, setSortByPriceOption] = useState('ascending');
  const [sortByOption, setSortByOption] = useState('name');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const colorDropdownRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(
    selectedPrice ? [{ min: '', max: selectedPrice }] : []
  );
  const colors = ['Red', 'Blue', 'Green', 'Gray', 'Brown', 'Black'];
  const categories = ['sofa', 'chair', 'bed', 'Storage'];
  const [selectedCategories, setSelectedCategories] = useState([
    selectedCategory ? selectedCategory : 'All',
  ]);
  const prices = [
    { min: 4000, max: 6000 },
    { min: 13000, max: 30000 },
  ];

  //add by youssef
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [favoriteList, setFavoriteList] = useState(customer?.favoriteList);
  const [inCart, setInCart] = useState(null);
  const [showLoginMessage, setshowLoginMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handelFavorit = (id) => {
    if (customer?._id) {
      favorites(customer?._id, id);
    } else {
      setshowLoginMessage(true);
    }
  };
  async function favorites(id, productId) {
    await apiRequest({
      method: 'post',
      url: '/customers/favorite',
      data: {
        id,
        productId,
      },
    })
      .then((res) => {
        const newData = {
          token: localStorage?.getItem('token'),
          ...res.data?.newCustomerData,
        };
        dispatch(SetCustomer(newData));
        setFavoriteList(customer?.favoriteList);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handlePriceRangeChange = (range) => {
    const index = selectedPriceRanges.findIndex(
      (selectedRange) =>
        selectedRange.min === range.min && selectedRange.max === range.max
    );
    if (index === -1) {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    } else {
      setSelectedPriceRanges([
        ...selectedPriceRanges.slice(0, index),
        ...selectedPriceRanges.slice(index + 1),
      ]);
    }
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  const handleSortByPrice = (option) => {
    setSortByOption('price');
    setSortByPriceOption(option);
    setShowSortDropdown(false);
  };

  const handleSortByName = () => {
    setSortByOption('name');
    setShowSortDropdown(false);
  };

  const handleColorChange = (color) => {
    console.log('Selected Color:', color);
    setSelectedColor(color === selectedColor ? '' : color);
    setShowColorDropdown(false);
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const togglePriceDropdown = () => {
    setShowPriceDropdown(!showPriceDropdown);
  };

  const toggleColorDropdown = () => {
    setShowColorDropdown(!showColorDropdown);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories || prevCategories.length === 0) {
        return ['All'];
      } else {
        const index = prevCategories.indexOf(category);

        if (index === -1) {
          const updatedCategories = prevCategories.includes('All')
            ? prevCategories.filter((cat) => cat !== 'All')
            : prevCategories;

          return [...updatedCategories, category];
        } else {
          return prevCategories.filter((cat) => cat !== category);
        }
      }
    });
  };

  const sortProducts = (a, b) => {
    if (sortByOption === 'price') {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return sortByPriceOption === 'ascending'
        ? priceA - priceB
        : priceB - priceA;
    } else if (sortByOption === 'name') {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      return nameA.localeCompare(nameB);
    }
    return 0;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target)
      ) {
        setShowPriceDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleCategoryClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleCategoryClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleCategoryClickOutside);
    };
  }, []);
  useEffect(() => {
    if (selectedPrice) {
      setSelectedPriceRanges([{ min: '', max: selectedPrice }]);
      if (selectedCategory) {
        setSelectedCategories(['All']);
      }
    } else {
      setSelectedPriceRanges([]);
    }
  }, [selectedPrice]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategories([selectedCategory]);
      setSelectedPriceRanges([]);
    } else {
      setSelectedCategories(['All']);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/');
        // console.log('API response:', response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        // console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const filterProducts = () => {
    return products
      .filter(
        (product) =>
          (selectedCategories.length === 0 ||
            selectedCategories.includes('All') ||
            selectedCategories.includes(product.category)) &&
          (selectedPriceRanges.length === 0 ||
            selectedPriceRanges.some(
              (selectedRange) =>
                (selectedRange.min === '' ||
                  Number(product.price) >= selectedRange.min) &&
                (selectedRange.max === '' ||
                  Number(product.price) <= selectedRange.max)
            )) &&
          (selectedColor === '' || product.colors.includes(selectedColor))
      )
      .sort(sortProducts);
  };
  return (
    <div className="store-container">
      {isLoading && !selectedCategory && !selectedPrice ? (
        <Loading />
      ) : (
        <div
          className="filters-container"
          style={{
            paddingTop: selectedCategory || selectedPrice ? '3rem' : '0rem',
            width: selectedCategory || selectedPrice ? '100%' : '90%',
          }}
        >
          {/* Category filter */}
          <div
            onClick={toggleCategoryDropdown}
            className="Filter"
            tabIndex="0"
            ref={categoryDropdownRef}
            style={{
              marginLeft:
                selectedCategory || selectedPrice ? '-1.7rem' : '0rem',
            }}
          >
            <h2>
              {'Category '}
              <span className="arrow">
                <KeyboardArrowDownIcon />
              </span>
            </h2>

            {showCategoryDropdown && (
              <div className="dropDown categorydropDown">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="categoryOption"
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryChange(category);
                    }}
                  >
                    <span>{category}</span>
                    <input
                      style={{
                        cursor: 'pointer',
                        width: '17px',
                        height: '17px',
                      }}
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      readOnly
                    />{' '}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            onClick={togglePriceDropdown}
            className="Filter"
            tabIndex="0"
            ref={priceDropdownRef}
            style={{
              marginLeft:
                selectedCategory || selectedPrice ? '-1.7rem' : '0rem',
            }}
          >
            <h2>
              {'Price'}
              <span className="arrow">
                <KeyboardArrowDownIcon />
              </span>
            </h2>

            {showPriceDropdown && (
              <div className="dropDown pricedropDown">
                {prices.map((price, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePriceRangeChange(price);
                    }}
                  >
                    <span>
                      EGP {price.min} - {price.max}
                    </span>
                    <input
                      style={{
                        cursor: 'pointer',
                        width: '17px',
                        height: '17px',
                      }}
                      type="checkbox"
                      checked={selectedPriceRanges.some(
                        (selectedRange) =>
                          selectedRange.min === price.min &&
                          selectedRange.max === price.max
                      )}
                      readOnly
                    />{' '}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div
            onClick={toggleSortDropdown}
            onBlur={() => setShowSortDropdown(false)}
            className="Filter"
            tabIndex="0"
            ref={sortDropdownRef}
            style={{
              marginLeft:
                selectedCategory || selectedPrice ? '-1.7rem' : '0rem',
            }}
          >
            <h2>
              {'Sort '}
              <span className="arrow">
                <KeyboardArrowDownIcon />
              </span>
            </h2>

            {showSortDropdown && (
              <div className="dropDown sortdropDown">
                <div className="sortOption" onClick={handleSortByName}>
                  <span>Sort by Name</span>
                  <div className="circleContainer">
                    <div className="emptyCircle"></div>
                    <span
                      className={
                        sortByOption === 'name'
                          ? 'filledCircle black'
                          : 'filledCircle gray'
                      }
                    ></span>
                  </div>
                </div>
                <div
                  className="sortOption"
                  onClick={() => handleSortByPrice('ascending')}
                >
                  <span>Price: Low to High</span>
                  <div className="circleContainer">
                    <div className="emptyCircle"></div>
                    <span
                      className={
                        sortByOption === 'price' &&
                        sortByPriceOption === 'ascending'
                          ? 'filledCircle black'
                          : 'filledCircle gray'
                      }
                    ></span>
                  </div>
                </div>
                <div
                  className="sortOption"
                  onClick={() => handleSortByPrice('descending')}
                >
                  <span>Price: High to Low</span>
                  <div className="circleContainer">
                    <div className="emptyCircle"></div>
                    <span
                      className={
                        sortByOption === 'price' &&
                        sortByPriceOption === 'descending'
                          ? 'filledCircle black'
                          : 'filledCircle gray'
                      }
                    ></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Color filter */}
          <div
            onClick={toggleColorDropdown}
            onBlur={() => setShowColorDropdown(false)}
            className="Filter"
            tabIndex="0"
            ref={colorDropdownRef}
            style={{
              marginLeft:
                selectedCategory || selectedPrice ? '-1.7rem' : '0rem',
            }}
          >
            <h2>
              {'Color '}
              <span className="arrow">
                <KeyboardArrowDownIcon />
              </span>
            </h2>
            {showColorDropdown && (
              <div className="dropDown colorDropDown">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="colorOption"
                    onClick={() => handleColorChange(color)}
                  >
                    <div
                      className="colorCircle"
                      style={{ backgroundColor: color, position: 'relative' }}
                    >
                      {selectedColor === color && (
                        <div className="correctSign">
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                    <div>{color}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {/* Product display */}
      <div
        className="products-container"
        style={{ width: selectedCategory || selectedPrice ? '100%' : '89%' }}
      >
        {filterProducts().map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            favoriteList={favoriteList}
            handelFavorit={handelFavorit}
            handelCart={handelCart}
          />
        ))}
      </div>
      <LoginMessage
        showLoginMessage={showLoginMessage}
        setshowLoginMessage={setshowLoginMessage}
      />
    </div>
  );
};
Store.propTypes = {
  selectedCategory: PropTypes.string,
  selectedPrice: PropTypes.number,
};
export default Store;
