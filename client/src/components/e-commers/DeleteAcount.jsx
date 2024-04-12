import React, { useState } from "react";
import "./stylesheets/DeleteAcount.css";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DeleteAccount = ({ onDelete }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    if (password) {
      onDelete(password);
    } else {
      setError("Please enter a valid password.");
    }
  };

  return (
    <div className="delete-account-container">
      <a href="./">Account Home</a> <ArrowRightIcon />{' '}
      <span>Delete Account</span>
      <h2 className="delete-account-heading">Delete Account</h2>
      <p>
        Time to say goodbye? We miss you already! The following happens when you
        delete your account
      </p>
      <br />
      <ul className="list">
        <li>You delete all personal information and your shopping lists.</li>
        <li>
          You will no longer have access to your account or be able to enjoy any
          member benefits.
        </li>
      </ul>
      <p className="paragraph">Remember that you are always welcome back!</p>
      <hr />
      <p className="paragraph">
        To delete your account, please enter your password:
      </p>
      <div className="deleteAccountInputAndButtonDiv">
        <div className="deleteAccountInputDiv">
          <TextField
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="delete-account-input"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p style={{ color: 'red' }}>{error}</p>
        </div>
        <Button
          onClick={handleDelete}
          className="delete-account-button"
          type="submit"
          variant="contained"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccount;
