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
import MoreVertIcon from '@mui/icons-material/MoreVert';

function Reviews({ reviewId ,userId, userName, rating, review, deleteReview }) {
    const { customer } = useSelector((state) => state.customer);
    const [isUserReview, SetIsUserReview] = useState(customer?._id === userId)
    const [anchorEl, setAnchorEl] = useState(null);
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
        console.log("first")
    };
    const handleDelete = () => {
        handleClose();
        deleteReview(userId, reviewId);
    };

    return (
        <>
            <div className="productDetailUserReview">
                <div className="flex items-center ">
                    <div className="mr-3">
                        <Avatar {...stringAvatar(userName)} />
                    </div>
                    <div className="">
                        <h6>{userName}</h6>
                        <Rating
                            readOnly
                            name="half-rating"
                            defaultValue={rating}
                            precision={0.5}
                            sx={{ fontSize: 20 }}
                        />
                    </div>
                </div>
                <p>
                    {review}
                </p>
                {isUserReview ?
                    (
                        <div>
                            <IconButton onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleEdit}>
                                    <button className='flex justify-around items-center'>
                                        <p className='inline text-2xl'>Edit</p>
                                        <EditIcon className='ml-2' />
                                    </button>
                                </MenuItem>
                                <MenuItem onClick={handleDelete}>
                                    <button className='flex justify-around items-center'>
                                        <p className='inline text-2xl'>Delete</p>
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
        </>
    )
}

export default Reviews