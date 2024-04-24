import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import '../e-commers/StyleSheets/ProductCard.css';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Card({ product, handelDelete }) {
  const [showDeleteMessage, setshowDeleteMessage] = useState(false);
  const handleAgreeDeleteProductMessage = () => {
    handelDelete(product?._id);
    setshowDeleteMessage(false);
  };

  const handleDisagreeDeleteProductMessage = () => {
    setshowDeleteMessage(false);
  };

  return (
    <div className="productCard mb-12">
      <Link className="productCardLink" to={`/p/product/${product?._id}`}>
        {product?.images?.length === 1 ? (
          <div className="sbProductCardDivImg">
            <img className="sbProductCardImg" src={product?.images[0]} />
          </div>
        ) : (
          <div className="sbProductCardDivImg">
            <div className="sbProductCardDivFirstImg">
              <img className="sbProductCardImg" src={product?.images[0]} />
            </div>
            <div className="sbProductCardDivsecondtImg">
              <img className="sbProductCardImg" src={product?.images[1]} />
            </div>
          </div>
        )}
        <div className="sbProductCardData">
          <div className="w-full">
            <h5>{product?.name}</h5>
            <h6>{product?.category}</h6>
            <p>{product?.price} EL</p>
          </div>
          <div className="sbProductCardDataRating">
            <Rating
              readOnly
              name="half-rating"
              value={product?.totalRating}
              precision={0.5}
              sx={{ fontSize: 30 }}
            />
            <p>
              {product?.totalRating} ({product?.reviews?.length})
            </p>
          </div>
        </div>
      </Link>
      <div className="sbProductCardFooter h-16">
        <Link
          className="flex items-center text-xl bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl"
          to={`/presenter/update/product/${product?._id}`}
        >
          Edit
          <EditIcon sx={{ fontSize: '20px', marginLeft: '5px' }} />
        </Link>
        <button
          onClick={() => {
            setshowDeleteMessage(true);
          }}
        >
          <DeleteForeverIcon sx={{ fontSize: '32px' }} />
        </button>
      </div>
      <Dialog
        open={showDeleteMessage}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagreeDeleteProductMessage}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: '25px', fontWeight: 'bold' }}>
          Delete Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to proceed with the deletion of this product?
            <br />
            <br />
            This action cannot be undone and will permanently remove the product
            from the database.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDisagreeDeleteProductMessage}
            sx={{ marginRight: 'auto' }}
          >
            DISAGREE
          </Button>
          <Button onClick={handleAgreeDeleteProductMessage}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Card;
