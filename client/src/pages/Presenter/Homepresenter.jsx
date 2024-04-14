import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './StyleSheets/homePresenter.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Card from '../../components/Presenter/Card';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Loading from '../../components/shared/Loading';

const HomePresenter = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', name: '' });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const categoryDropdownRef = useRef(null);
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const categories = ['sofa', 'chair', 'bed', 'table'];

  async function handelDeleteProduct(productId) {
    await axios
      .delete('/products/', { data: { productId } })
      .then((res) => {
        //console.log(res.data);
        setProducts(
          products.filter((item) => {
            return item._id !== productId;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/');
        console.log('API response:', response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
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
          selectedCategories.includes('All') ||
          selectedCategories.includes(product.category)) &&
        (filters.name === '' ||
          product.name.toLowerCase().includes(filters.name))
    );
  };
  return (
    <>
      <div className="store-container">
        <div className="filters-container">
          {/* Category filter */}
          <div
            onClick={toggleCategoryDropdown}
            className="Filter"
            tabIndex="0"
            ref={categoryDropdownRef}
          >
            <h2>
              {'Category '}
              <span className="arrow">
                <KeyboardArrowDownIcon />
              </span>
            </h2>

            {showCategoryDropdown && (
              <div
                className="dropDown categorydropDown "
                style={{ maxHeight: '200px' }}
              >
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

          {/* Name filter */}
          <input
            type="text"
            className="inline md:hidden"
            value={filters.name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Enter Product Name"
            style={{
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              // width: "250px",
            }}
          />
          <div
            className="hidden md:block"
            style={{
              marginTop: '0px',
              marginLeft: '0px',
              minWidth: '500px',
              height: '50px',
              backgroundColor: 'gray',
              borderRadius: '35px',
              position: 'relative',
            }}
          >
            <IconButton
              style={{ position: 'absolute', top: '6px', left: '10px' }}
            >
              <SearchIcon />
            </IconButton>
            <input
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid #ccc',
                backgroundColor: '#f8f9fa',
                borderRadius: '30px',
                fontSize: '20px',
                padding: '15px 20px',
                paddingLeft: '50px',
                outline: 'none',
              }}
              type="search"
              value={filters.name}
              onChange={(e) => handleNameChange(e)}
              placeholder="Enter Product Name"
            ></input>
          </div>
        </div>
        {/* Product display */}
        {isLoading ? (
          <Loading />
        ) : (
          <div
            className="products-container"
            style={{
              width: '89%',
              justifyContent: 'space-evenly',
            }}
          >
            {filterProducts().map((product, index) => (
              <Card
                key={index}
                product={product}
                handelDelete={handelDeleteProduct}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
// Store.propTypes = {
//   selectedCategory: PropTypes.string,
//   selectedPrice: PropTypes.number,
// };
export default HomePresenter;
