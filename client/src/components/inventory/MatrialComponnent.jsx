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
                <Card sx={{ maxWidth: 300 }} style={{backgroundColor:"#eaf4f4"}}>
                  <CardHeader
                    title={matrial.name}
                    style={{ marginTop: '10px' }}
                  />
                  <CardContent style={{ marginTop: '-20px' }}>
                    Quantity : {matrial.quantity}
                  </CardContent>
                  <CardActions
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <IconButton style={{color:"#cce3de"}}>
                      <Link to={`/updateMatrial/${matrial._id}`}>
                        <EditIcon style={{ color: '#495057' }} />
                      </Link>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(matrial._id)}>
                      <DeleteIcon style={{ color: '#495057' }} />
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
