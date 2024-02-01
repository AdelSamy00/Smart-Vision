import React, { useState } from "react";
import "./stylesheets/DeleteAcount.css";
// import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const DeleteAccount = ({ onDelete }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = () => {
    // Check if the user entered the correct password
    if (password) {
      // Pass the password to the parent component for handling deletion
      onDelete(password);
    } else {
      // Display an error message if the password is empty
      setError("Please enter a valid password.");
    }
  };

  return (
    <div className="delete-account-container">
      <a href="./">Account Home</a> <ArrowRightIcon /> <span>Delete Account</span>
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
      <p className="paragraph">To delete your account, please enter your password:</p>
      <TextField
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(""); // Clear the error message when the user starts typing
        }}
        className="delete-account-input"
        label="Password"
        fullWidth
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
      <p style={{ color: "red" }}>{error}</p>
      <br />
      <Button
        onClick={handleDelete}
        className="delete-account-button"
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          textTransform: "capitalize",
          bgcolor: "black",
          ":hover": { backgroundColor: "rgba(0,0,0,0.8)" },
          height: "60px",
          borderRadius: "30px",
          fontSize: "19px",
        }}
      >
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccount;
