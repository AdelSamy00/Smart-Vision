import { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Loading from '../shared/Loading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartP } from '../../redux/ProductCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ExpandMore = ({ expand, ...other }) => <IconButton {...other} />;

function HomeComponent({ Allproducts }) {
  const [displayedOrders, setDisplayedOrders] = useState(1);
  const [products, setProducts] = useState(Allproducts);
  // const [cart, setCart] = useState([]);
  const ProductCart = useSelector((state) => state.products.product);
  const [expandedStates, setExpandedStates] = useState({});

  const handleExpandClick = (orderId) => {
    setExpandedStates((prevStates) => ({
      ...prevStates,
      [orderId]: !prevStates[orderId],
    }));
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete('/products', { data: { productId } });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  const handleShowMore = () => {
    setDisplayedOrders(products.length);
  };
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    const isAlreadyInCart = ProductCart.some(
      (item) => item._id === product._id
    );

    if (isAlreadyInCart) {
      toast.error('Item is already in the cart!');
    } else {
      dispatch(addToCartP(product));
    }
  };
  // console.log(ProductCart)
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {products.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {products.map((product, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader />
                  <CardContent
                    style={{
                      marginTop: '-20px',
                      fontWeight: 'bold',
                      fontSize: '18px',
                    }}
                  >
                    Name : {product.name}
                  </CardContent>
                  <CardContent style={{ marginTop: '-20px' }}>
                    Quantity : {product.quantity}
                  </CardContent>
                  <CardActions
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <IconButton style={{ marginTop: '-20px' }}>
                      <Link to={`/updateProduct/${product._id}`}>
                        <EditIcon />
                      </Link>
                    </IconButton>
                    <IconButton
                      onClick={() => handleAddToCart(product)}
                      style={{ marginTop: '-20px', marginLeft: '80px' }}
                    >
                      {ProductCart.find((item) => item._id === product._id) ? (
                        // If item is in the cart
                        <svg
                          className="sbProductCardFooterIcon"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,
    18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z"
                          />
                        </svg>
                      ) : (
                        // If item is not in the cart
                        <svg
                          className="sbProductCardFooterIcon"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M18,12a5.993,5.993,0,0,1-5.191-9H4.242L4.2,2.648A3,3,0,0,0,1.222,0H1A1,1,0,
        0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,
        3,0,0,1-2.821-2H17.657a5,5,0,0,0,4.921-4.113l.238-1.319A5.984,5.984,0,0,1,18,12Z"
                          />
                          <circle cx="7" cy="22" r="2" />
                          <circle cx="17" cy="22" r="2" />
                          <path d="M15,7h2V9a1,1,0,0,0,2,0V7h2a1,1,0,0,0,0-2H19V3a1,1,0,0,0-2,0V5H15a1,1,0,0,0,0,2Z" />
                        </svg>
                      )}
                    </IconButton>
                    <ExpandMore
                      expand={expandedStates[product._id]}
                      onClick={() => handleExpandClick(product._id)}
                      aria-expanded={expandedStates[product._id]}
                      aria-label="show more"
                      style={{ marginLeft: 'auto', marginTop: '-20px' }}
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse
                    in={expandedStates[product._id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent sx={{ marginTop: '-20px' }}>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: '5px', fontSize: '15px' }}
                      >
                        Category : {product.category}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: '5px', fontSize: '15px' }}
                      >
                        colors : {product.colors}
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ marginBottom: '5px', fontSize: '15px' }}
                      >
                        {product.description}
                      </Typography>
                      <Typography
                        variant="body2"
                        onClick={() => handleDelete(product._id)}
                      >
                        <DeleteIcon />
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        <div
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '20px',
            width: '45%',
            border: '2px solid',
            margin: 'auto',
            padding: '20px',
            marginBottom: '5rem',
            borderRadius: '5px',
          }}
        >
          <p style={{ marginBottom: '12px' }}>There is no products .</p>
          <Link to="/addProduct">
            <Button variant="contained" color="primary">
              Add Product
            </Button>
          </Link>
        </div>
      )}
    </Grid>
  );
}
export default HomeComponent;
