import { useState, useEffect } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import Loading from '../shared/Loading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/MatrialCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material';
function MatrialComponnent({ AllMaterials }) {
  const [Matrials, setMatrials] = useState(AllMaterials);
  const [displayedOrders, setDisplayedOrders] = useState(1);
  const [cart, setCart] = useState([]);
  const cart2 = useSelector((state) => state.matrialCard.cart);

  //console.log(cart2)

  const handleShowMore = () => {
    setDisplayedOrders(Matrials.length);
  };

  const handleDelete = async (matrialId) => {
    try {
      const response = await axios.delete('/Materials/', {
        data: { id: matrialId },
      });
      setMatrials((prevMatrials) =>
        prevMatrials.filter((Matrial) => Matrial._id !== matrialId)
      );
      toast.dismiss();
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error deleting matrial:', error);
      toast.error('Failed to delete matrial. Please try again.');
    }
  };
  const dispatch = useDispatch();
  const handleAddToCart = (matrial) => {
    const isAlreadyInCart = cart.some((item) => item._id === matrial._id);

    if (isAlreadyInCart) {
      toast.error('Item is already in the cart!');
    } else {
      dispatch(addToCart(matrial));
    }
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className="presenter-products-container"
    >
      {Matrials.length > 0 ? (
        <Grid item xs={12} sm={10} md={10}>
          <Grid
            container
            spacing={3}
            className="presenter-products"
            align="center"
            justifyContent="center"
          >
            {Matrials.map((matrial, index) => (
              <Grid key={index} item xs={12} md={6} lg={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader
                    title={matrial.name}
                    style={{ marginTop: '10px' }}
                  />
                  <CardContent style={{ marginTop: '-20px' }}>
                    Quantity : {matrial.quantity}
                  </CardContent>
                  <CardActions
                    style={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    <IconButton>
                      <Link to={`/updateMatrial/${matrial._id}`}>
                        <EditIcon style={{ color: 'black' }} />
                      </Link>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(matrial._id)}>
                      <DeleteIcon style={{ color: 'black' }} />
                    </IconButton>
                    <IconButton onClick={() => handleAddToCart(matrial)}>
                      {cart2.find((item) => item._id === matrial._id) ? (
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
                  </CardActions>
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
            width: '65%',
            border: '2px solid',
            margin: 'auto',
            padding: '20px',
            marginBottom: '5rem',
          }}
        >
          <p style={{ marginBottom: '12px' }}>there is no Matrials .</p>
          <Link to="/addMatrial">
            <Button variant="contained" color="primary">
              Add Matrial
            </Button>
          </Link>
        </div>
      )}
    </Grid>
  );
}

export default MatrialComponnent;
