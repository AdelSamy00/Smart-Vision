import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './stylesheets/Reviews.css';
import axios from 'axios';

function Reviews({ review, setReviews, setTotalRating, customerReview }) {
  // console.log(customerReview);
  const { customer } = useSelector((state) => state.customer);
  const reviewCustomer = review?.customer?.username
    ? review?.customer
    : customerReview;
  //console.log(reviewCustomer);
  const [comment, setComment] = useState(review?.comment);
  const [rating, setRating] = useState(review?.rating);
  const [validated, setValidated] = useState(false);
  const [isUserReview, SetIsUserReview] = useState(
    customer?._id === reviewCustomer?._id
  );
  const [inEditMode, setInEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [ReviewDeleted, setReviewDeleted] = useState(false);
  const [ReviewUpdated, setReviewUpdated] = useState(false);
  //make avatar to comment
  function stringAvatar(name) {
    //console.log(review);
    return {
      children: `${name?.split(' ')[0][0]}`,
    };
  }

  //handel open menu in review
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  //handel close menu in review
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  //handel Edit Review by the user
  const handleEditReviewMode = () => {
    handleMenuClose();
    if (inEditMode) {
      setRating(review?.rating);
      setComment(review?.comment);
    }
    setInEditMode(!inEditMode);
  };
  // Delete review from product
  async function deleteReview(customerId, reviewId) {
    await axios
      .delete('/customers/review', {
        data: { customerId, reviewId, productId: review?.product },
      })
      .then((res) => {
        setReviews((prevReviews) => {
          return prevReviews.filter((review) => review._id !== reviewId);
        });
        setTotalRating(res.data.totalRating);
      })
      .catch((e) => {
        console.log(e);
      });
    setReviewDeleted(true);
  }

  // Update review in product
  async function editReview(productId, reviewId, comment, rating) {
    await axios
      .put('/customers/review', { productId, reviewId, comment, rating })
      .then((res) => {
        // console.log(res.data);
        setReviews((prevReviews) => {
          return prevReviews.map((review) => {
            if (review?._id === reviewId) {
              return { ...review, comment: comment, rating: rating };
            } else {
              return review;
            }
          });
        });
        setTotalRating(res.data.totalRating);
      })
      .catch((e) => {
        console.log(e);
      });
    customerReview && setReviewUpdated(true);
  }
  //handel Delete Review by the user
  const handleDeleteReview = () => {
    handleMenuClose();
    deleteReview(reviewCustomer?._id, review?._id);
  };

  //handel Add Review by the user
  const handleEditReviewSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      editReview(review?.product, review?._id, comment, rating);
      setInEditMode(false);
    }
  };

  return (
    <>
      {ReviewDeleted || ReviewUpdated ? (
        <div className=" flex justify-center py-5 text-gray-400 text-2xl productDetailUserReview">
          {ReviewDeleted ? 'Deleted' : 'Updated'}
        </div>
      ) : inEditMode ? (
        <div className="productDetailUserReview">
          <div className="flex items-center mb-3">
            <div className="mr-3">
              <Avatar {...stringAvatar(reviewCustomer?.username)} />
            </div>
            <div className="">
              <h6>{reviewCustomer?.username}</h6>
            </div>
          </div>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleEditReviewSubmit}
          >
            <Form.Group className="">
              <Rating
                name="rating"
                value={rating}
                sx={{ fontSize: 25 }}
                onChange={(e) => setRating(Number(e.target.value))}
              />
              <Form.Control
                className="InputField h-auto"
                name="comment"
                required
                as="textarea"
                rows={3}
                value={comment}
                placeholder="Add your Review here......"
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <div className="flex justify-center gap-2 my-3">
              <button
                type="submit"
                className="buttonForReview bg-slate-700 hover:bg-slate-800"
              >
                Submit
              </button>
              <button
                onClick={handleEditReviewMode}
                className="buttonForReview bg-red-600 hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="productDetailUserReview">
          <div className="flex items-center ">
            <div className="mr-3">
              <Avatar {...stringAvatar(reviewCustomer?.username)} />
            </div>
            <div className="">
              <h6>{reviewCustomer?.username}</h6>
              <Rating
                readOnly
                name="half-rating"
                value={review?.rating}
                precision={0.5}
                sx={{ fontSize: 20 }}
              />
            </div>
            {/* for disblay menu item for user review */}
            {isUserReview ? (
              <div className="ml-auto">
                <IconButton onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleEditReviewMode}>
                    <button className="reviewMenuButton">
                      <p className="text-xl">Edit</p>
                      <EditIcon className="ml-2" />
                    </button>
                  </MenuItem>
                  <MenuItem onClick={handleDeleteReview}>
                    <button className="reviewMenuButton">
                      <p className="text-xl">Delete</p>
                      <DeleteForeverIcon className="ml-2" />
                    </button>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <></>
            )}
          </div>
          <p className="px-12">{review?.comment}</p>
        </div>
      )}
      {}
    </>
  );
}

export default Reviews;
