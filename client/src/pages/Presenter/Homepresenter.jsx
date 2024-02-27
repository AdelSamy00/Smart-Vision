import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCustomer } from "../../redux/CustomerSlice";
import { setCart } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";
import "./PresenterStyleSheets/homePresenter.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import Loading from "../components/Loading";
import Card from "../../components/Presenter/Card";

const HomePresenter = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", name: "" });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [inCart, setInCart] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryDropdownRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const categories = ["sofa", "chair", "bed", "Storage"];

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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products/");
        console.log("API response:", response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (!prevCategories || prevCategories.length === 0) {
        return ["All"];
      } else {
        const index = prevCategories.indexOf(category);

        if (index === -1) {
          const updatedCategories = prevCategories.includes("All")
            ? prevCategories.filter((cat) => cat !== "All")
            : prevCategories;

          return [...updatedCategories, category];
        } else {
          return prevCategories.filter((cat) => cat !== category);
        }
      }
    });
  };
  useEffect(() => {
    const handleCategoryClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleCategoryClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleCategoryClickOutside);
    };
  }, []);
  const handleNameChange = (e) => {
    if (e && e.target) {
      setFilters({
        ...filters,
        name: e.target.value,
      });
    }
  };
  const filterProducts = () => {
    return products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes("All") ||
          selectedCategories.includes(product.category)) &&
        (filters.name === "" ||
          product.name.toLowerCase().includes(filters.name))
    );
  };
  return (
    <div
      className="store-container"
      // style={{ width: "90%", margin: "auto" }}
    >
      <div
        className="filters-container"
        // style={{
        //   display: "flex",
        //   justifyContent: "flex-start",
        //   width: "100%",
        //   gap: "5rem",
        // }}
      >
        {/* Category filter */}
        <div
          onClick={toggleCategoryDropdown}
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
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    textAlign: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategoryChange(category);
                  }}
                >
                  <span>{category}</span>
                  <input
                    style={{
                      cursor: "pointer",
                      width: "17px",
                      height: "17px",
                    }}
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    readOnly
                  />{" "}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Name filter */}
        <input
          type="text"
          value={filters.name}
          onChange={(e) => handleNameChange(e)}
          placeholder="Enter Product Name"
          style={{
            padding: "0.5rem",
            borderRadius: "5px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            // width: "250px",
          }}
        />
      </div>
      {/* Product display */}
      <div
        className="products-container"
        style={{
          width:"89%"
        }}
      >
        {filterProducts().map((product, index) => (
          <Card key={index} product={product} handelCart={handelCart} />
        ))}
      </div>
    </div>
  );
};
// Store.propTypes = {
//   selectedCategory: PropTypes.string,
//   selectedPrice: PropTypes.number,
// };
export default HomePresenter;
