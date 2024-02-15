import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Rating from '@mui/material/Rating';
import { useSelector } from 'react-redux';
import './stylesheets/Reviews.css';
import { useNavigate } from 'react-router-dom';

function AddReview({ addReview }) {
    const navigate = useNavigate();
    const { customer } = useSelector((state) => state.customer);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const [validated, setValidated] = useState(false);
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (customer?._id) {
            if (form.checkValidity() === false) {
                event.stopPropagation();
                setValidated(true);
            } else {
                addReview(customer._id, rating, review);
                setRating(5);
                setReview('');
            }
        } else {
            navigate('/login');
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
                        className="text-xl bg-slate-700 hover:bg-slate-800 text-white font-bold rounded-3xl w-1/4 m-2 h-14"
                    >
                        Add Review
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AddReview;
