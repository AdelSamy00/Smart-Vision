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
  
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {products?.length > 0 ? (
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
                <Card
                  sx={{ maxWidth: 300 }}
                  style={{ backgroundColor: '#eaf4f4' }}
                >
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
                    Quantity : {product?.quantity}
                  </CardContent>
                  <CardActions
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <IconButton style={{ marginTop: '-20px' }}>
                      <Link to={`/inventory/update/product/${product._id}`}>
                        <EditIcon />
                      </Link>
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
                        colors :{' '}
                        {product.colors ? product.colors.join(' , ') : ''}
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
                        <DeleteIcon style={{ color: '#495057' }} />
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
