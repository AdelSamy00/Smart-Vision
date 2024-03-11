import React, { useState } from 'react';
import DeleteAccount from '../../components/e-commers/DeleteAcount';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Logout } from '../../redux/CustomerSlice';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { apiRequest } from '../../utils';
//to Tranition the message from the end of the page
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteAccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const { customer } = useSelector((state) => state.customer);
  const [showMessage, setShowMessage] = useState(false);

  //to delete the customer from the redux and navigate the user to landing page
  const handleCancelMessage = () => {
    setShowMessage(false);
    dispatch(Logout());
    navigate('/');
  };

  const handleDelete = async (password) => {
    try {
      const response = await apiRequest({
        method:"delete",
        url:`/customers/delete-acount/${customer._id}`,
        data:{password},
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.status === 200) {
        setShowMessage(true);
      } else if (password !== customer.password) {
        setError('Incorrect password. Please try again.');
      }
    } catch (error) {
      toast.dismiss();
      toast(error.response.data.message);
    }
  };

  return (
    <div className="delete-account-page">
      <Toaster
        toastOptions={{
          style: {
            duration: 3000,
            border: '1px solid #6A5ACD',
            backgroundColor: '#6A5ACD',
            padding: '16px',
            color: 'white',
            fontWeight: 'Bold',
            marginTop: '65px',
            textAlign: 'center',
          },
        }}
      />
      <DeleteAccount onDelete={handleDelete} error={error} />
      <div
        className="account-deleted-message"
        style={{ fontSize: '20px', marginLeft: '20px', marginBottom: '20px' }}
      >
        <Dialog
          open={showMessage}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCancelMessage}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle sx={{ fontSize: '25px', fontWeight: 'bold' }}>
            Your account is deleted
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Your Smart Vision account has now been deleted.
              <br />
              We are sad to see you leave, and hope you will come back in the
              future.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelMessage}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default DeleteAccountPage;
