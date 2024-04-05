import React from 'react';
import { useNavigate } from 'react-router-dom';
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

function LoginMessage({ showLoginMessage, setshowLoginMessage }) {
  const navigate = useNavigate();
  return (
    <Dialog
      open={showLoginMessage}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => setshowLoginMessage(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ fontSize: '25px', fontWeight: 'bold' }}>
        Hello there!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Ready to unlock a world of convenience and savings?
          <br />
          Log in to your account to browse, shop, and enjoy personalized
          perks tailored just for you.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setshowLoginMessage(false)}
          sx={{ marginRight: 'auto' }}
        >
          Cancel
        </Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LoginMessage;
