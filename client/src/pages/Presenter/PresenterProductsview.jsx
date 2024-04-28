import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './StyleSheets/PresenterProductsView.css'; // Import custom CSS for advanced styling
import Loading from '../../components/shared/Loading';
import { apiRequest } from '../../utils';
import { t } from 'i18next';

function PresenterProductsView() {
  const { employee } = useSelector((state) => state?.employee);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [displayedProducts, setDisplayedProducts] = useState(3); // Show initial 3 orders

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiRequest({
          url: '/employees/presenter/not-shown/',
          method: 'GET',
          token: employee?.token,
        });
        console.log('API response:', response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error.response.data.message);
      }
    };

    fetchProducts();
  }, []);
  // const handleShowMore = () => {
  //   setDisplayedProducts(products.length); // Show all orders when "Show All" is clicked
  // };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {' '}
      {/* Apply advanced styling class */}
      {isLoading ? (
        <Grid item>
          <Loading />
        </Grid>
      ) : products?.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ marginBottom: '1rem' }}
          >
            {t('productsInInventory')}
          </Typography>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="space-evenly"
          >
            {products?.map((product, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <div className={`presenter-product-card`}>
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    className="presenter-product-title"
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-info"
                  >
                    {t('quantity')}: {product.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    className="presenter-product-description"
                  >
                    {t('description')}: {product.description}
                  </Typography>
                  <div className="button-container">
                    {' '}
                    <Link
                      to={`/presenter/add-to-store/product/${product?._id}`}
                      className="link-style"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        className="add-to-store-button"
                        style={{
                          background:
                            'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          textTransform: 'capitalize',
                          height: 34,
                          padding: '0px 15px',
                        }}
                      >
                        {t('addToStore')}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8} sx={{ display: 'flex' }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              padding: '20px',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '25px',
              width: '80vw',
              marginTop: '5rem ',
              marginInline: 'auto',
            }}
          >
            {t('allProductsAdded')}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default PresenterProductsView;
