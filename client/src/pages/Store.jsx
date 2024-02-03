import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./StyleSheets/Store.css";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../redux/CustomerSlice';
import { useNavigate } from "react-router-dom";

const getinitItems = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  if (!data) return [];
  return data;
};

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedColor, setSelectedColor] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [sortByPriceOption, setSortByPriceOption] = useState("ascending");
  const [sortByOption, setSortByOption] = useState("name");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showColorDropdown, setShowColorDropdown] = useState(false);
  const categoryDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const colorDropdownRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const colors = ["Red", "Blue", "Green", "Yellow", "White", "Black"];
  const categories = ["sofa", "chair", "bed", "Storage"];
  const prices = [
    { min: 4000, max: 6000 },
    { min: 13000, max: 30000 },
  ];

  //add by youssef
  const { customer } = useSelector((state) => state.customer);
  const [favoriteList, setFavoriteList] = useState(customer.favoriteList);
  const [cart, setCart] = useState(getinitItems);
  const [inCart, setInCart] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handelCart = (id, name, price, images) => {
    console.log(id, name, price, images)
    const res = cart.find((prod) => {
      return prod._id === id
    })
    if (res) {
      console.log('remove')
      setCart((prevCart) => {
        return prevCart.filter((t) => t._id !== id);
      });
      setInCart(false)
    }
    else {
      console.log('add')
      setCart([...cart, { _id: id, name, price, images }]);
      localStorage.setItem("cart", JSON.stringify([...cart, { _id: id, name, price, images }]));
      setInCart(true)
    }
  }

  const handelFavorit = (id) => {
    if (customer._id) {
      console.log('fired2')
      favorites(customer._id, id)
    } else {
      navigate("/login")
    }
  }
  async function favorites(id, productId) {
    console.log(id, productId)
    await axios.post('/customers/favorite', { id, productId })
      .then((res) => {
        const newData = { ...res.data?.newCustomerData };
        dispatch(SetCustomer(newData));
        setFavoriteList(customer.favoriteList)
      }
      ).catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

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
    setSortByOption("price");
    setSortByPriceOption(option);
    setShowSortDropdown(false);
  };

  const handleSortByName = () => {
    setSortByOption("name");
    setShowSortDropdown(false);
  };

  const handleColorChange = (color) => {
    console.log("Selected Color:", color);
    setSelectedColor(color);
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

  const sortProducts = (a, b) => {
    if (sortByOption === "price") {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      return sortByPriceOption === "ascending"
        ? priceA - priceB
        : priceB - priceA;
    } else if (sortByOption === "name") {
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/');
        // console.log("API response:", response.data.products);
        setProducts(response.data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="store-container">
      <div className="filters-container">
        {/* Category filter */}
        <div
          onClick={toggleCategoryDropdown}
          onBlur={() => setShowCategoryDropdown(false)}
          className="Filter"
          tabIndex="0"
          ref={categoryDropdownRef}
        >
          <h2>
            {"Category "}
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
                  onClick={() => handleCategoryChange(category)}
                >
                  <span>{category}</span>
                  <div className="circleContainer">
                    <div className="emptyCircle"></div>
                    <span
                      className={
                        selectedCategory === category
                          ? "filledCircle black"
                          : "filledCircle gray"
                      }
                    ></span>
                  </div>
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
        >
          <h2>
            {"Price"}
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
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
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
                      cursor: "pointer",
                      width: "17px",
                      height: "17px",
                    }}
                    type="checkbox"
                    checked={selectedPriceRanges.some(
                      (selectedRange) =>
                        selectedRange.min === price.min &&
                        selectedRange.max === price.max
                    )}
                    readOnly
                  />{" "}
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
        >
          <h2>
            {"Sort "}
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
                      sortByOption === "name"
                        ? "filledCircle black"
                        : "filledCircle gray"
                    }
                  ></span>
                </div>
              </div>
              <div
                className="sortOption"
                onClick={() => handleSortByPrice("ascending")}
              >
                <span>Price: Low to High</span>
                <div className="circleContainer">
                  <div className="emptyCircle"></div>
                  <span
                    className={
                      sortByOption === "price" &&
                      sortByPriceOption === "ascending"
                        ? "filledCircle black"
                        : "filledCircle gray"
                    }
                  ></span>
                </div>
              </div>
              <div
                className="sortOption"
                onClick={() => handleSortByPrice("descending")}
              >
                <span>Price: High to Low</span>
                <div className="circleContainer">
                  <div className="emptyCircle"></div>
                  <span
                    className={
                      sortByOption === "price" &&
                      sortByPriceOption === "descending"
                        ? "filledCircle black"
                        : "filledCircle gray"
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
        >
          <h2>
            {"Color "}
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
                  onClick={() => handleColorChange(color.toLowerCase())}
                >
                  <div
                    className="colorCircle"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>{color}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product display */}
      <div className="products-container">
        {products
          .filter(
            (product) =>
              (selectedCategory === "All" ||
                product.category === selectedCategory) &&
              (selectedPriceRanges.length === 0 ||
                selectedPriceRanges.some(
                  (selectedRange) =>
                    (selectedRange.min === "" ||
                      Number(product.price) >= selectedRange.min) &&
                    (selectedRange.max === "" ||
                      Number(product.price) <= selectedRange.max)
                )) &&
              (selectedColor === "" || product.colors.includes(selectedColor))
          )
          .sort(sortProducts)
          .map((product, index) => (
            <ProductCard
              key={index}
              product={product}
              favoriteList={favoriteList}
              handelFavorit={handelFavorit}
              handelCart={handelCart}
            />
          ))}
      </div>
    </div>
  );
};

export default Store;
