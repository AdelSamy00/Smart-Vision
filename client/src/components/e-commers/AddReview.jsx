import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import './stylesheets/Reviews.css';
import { apiRequest } from '../../utils';

function AddReview({ productId, setReviews }) {
  const { customer } = useSelector((state) => state.customer);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [validated, setValidated] = useState(false);

  //Add review to product
  async function addReview(customerId, rating, comment) {
    try {
      const res = await apiRequest({
        url: '/customers/review',
        method: 'POST',
        data: { customerId, productId, comment, rating },
      });
      setReviews((prevReviews) => {
        return [...prevReviews, res.data.review];
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      addReview(customer._id, rating, review);
      setRating(5);
      setReview('');
    }
  };

  return (
    <>
      <h6 className="addReviewHeader">Add Review</h6>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            value={review}
            placeholder="Add your Review here......"
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
        <div className="flex justify-center">
          <button
            type="submit"
            className="buttonForReview mt-3  bg-slate-700 hover:bg-slate-800"
          >
            Submit
          </button>
        </div>
      </Form>
    </>
  );
}

export default AddReview;
