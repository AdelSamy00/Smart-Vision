import React, { useState } from 'react'
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
import './stylesheets/Reviews.css'

function Reviews({ review, deleteReview, editReview }) {
    const { customer } = useSelector((state) => state.customer);
    const reviewCustomer = review.customer;
    const [comment, setComment] = useState(review?.comment);
    const [rating, setRating] = useState(review?.rating);
    const [validated, setValidated] = useState(false);
    const [isUserReview, SetIsUserReview] = useState(customer?._id === reviewCustomer?._id)
    const [inEditMode, setInEditMode] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    //make avatar to comment
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}`,
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
            setRating(review?.rating)
            setComment(review?.comment)
        }
        setInEditMode(!inEditMode)
    };

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
            editReview(reviewCustomer?._id, review?.product, review?._id, comment, rating)
            setInEditMode(false)
        }
    };

    return (
        <>{inEditMode ?
            (
                <div className="productDetailUserReview">
                    <div className="flex items-center mb-3">
                        <div className="mr-3">
                            <Avatar {...stringAvatar(reviewCustomer?.username)} />
                        </div>
                        <div className="">
                            <h6>{reviewCustomer?.username}</h6>
                        </div>
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleEditReviewSubmit}>
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
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="buttonForReview bg-slate-700 hover:bg-slate-800"
                            >
                                submit Edites
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
            )
            :
            (
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
                        {isUserReview ?
                            (
                                <div className='ml-auto'>
                                    <IconButton onClick={handleMenuClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={handleEditReviewMode}>
                                            <button className='reviewMenuButton'>
                                                <p className='text-xl'>Edit</p>
                                                <EditIcon className='ml-2' />
                                            </button>
                                        </MenuItem>
                                        <MenuItem onClick={handleDeleteReview}>
                                            <button className='reviewMenuButton'>
                                                <p className='text-xl'>Delete</p>
                                                <DeleteForeverIcon className='ml-2' />
                                            </button>
                                        </MenuItem>
                                    </Menu>
                                </div>
                            )
                            :
                            (
                                <></>
                            )
                        }
                    </div>
                    <p className='px-12'>
                        {review?.comment}
                    </p>
                </div >
            )
        }
        </>
    )
}

export default Reviews