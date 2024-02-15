import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import EditIcon from '@mui/icons-material/Edit';
import './stylesheets/Reviews.css'
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Form from 'react-bootstrap/Form';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleEdit = () => {
        handleClose();
        setInEditMode(true)
    };
    const handleDelete = () => {
        handleClose();
        deleteReview(reviewCustomer?._id, review?._id);
    };
    const handleSubmit = async (event) => {
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
                                value={comment}
                                placeholder="Add your Review here......"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Form.Group>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="editButtonForReview bg-slate-700 hover:bg-slate-800"
                            >
                                submit Edites
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
                                defaultValue={review?.rating}
                                precision={0.5}
                                sx={{ fontSize: 20 }}
                            />
                        </div>
                        {isUserReview ?
                            (
                                <div className='ml-auto'>
                                    <IconButton onClick={handleClick}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleEdit}>
                                            <button className='flex items-center'>
                                                <p className='text-xl'>Edit</p>
                                                <EditIcon className='ml-2' />
                                            </button>
                                        </MenuItem>
                                        <MenuItem onClick={handleDelete}>
                                            <button className='flex items-center'>
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