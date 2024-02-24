import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../stylesheets/Reviews.css'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ReviewPresenter({ review, deleteReview }) {
    const reviewCustomer = review.customer;
    const [anchorEl, setAnchorEl] = useState(null);
    const [showDeleteReviewMessage, setShowDeleteReviewMessage] = useState(false);

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

    //handel Delete Review
    const handleDeleteReview = () => {
        handleMenuClose();
        deleteReview(reviewCustomer?._id, review?._id);
    };

    const handleMenuDelete = () => {
        handleMenuClose();
        setShowDeleteReviewMessage(true)
    };

    

    const handleAgreeDeleteReviewMessage = () => {
        handleDeleteReview()
    };

    const handleDisagreeDeleteReviewMessage = () => {
        setShowDeleteReviewMessage(false);
    };


    return (
        <>
            <div className="productDetailUserReview">
                <div className="flex items-center ">
                    <div className="mr-3">
                        <Avatar {...stringAvatar(reviewCustomer?.username)} />
                    </div>
                    <div>
                        <h6>{reviewCustomer?.username}</h6>
                        <Rating
                            readOnly
                            name="half-rating"
                            value={review?.rating}
                            precision={0.5}
                            sx={{ fontSize: 20 }}
                        />
                    </div>
                    <div className='ml-auto'>
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuDelete}>
                                <button className='reviewMenuButton'>
                                    <p className='text-xl'>Delete</p>
                                    <DeleteForeverIcon className='ml-2' />
                                </button>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <p className='px-12'>
                    {review?.comment}
                </p>
            </div >
            <Dialog
                open={showDeleteReviewMessage}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleDisagreeDeleteReviewMessage}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle sx={{ fontSize: "25px", fontWeight: "bold" }}>Delete Customer Review</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this review? 
                        <br />
                        We are sad to see you leave, and hope you will come back in the future.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDisagreeDeleteReviewMessage}
                        sx={{ marginRight: 'auto' }}
                    >
                        DISAGREE
                    </Button>
                    <Button
                        onClick={handleAgreeDeleteReviewMessage}
                    >
                        AGREE
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ReviewPresenter