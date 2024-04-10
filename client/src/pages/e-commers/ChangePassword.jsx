import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { apiRequest } from "../../utils";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const defaultTheme = createTheme();

export default function ChangePassword() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [currentPassErrorMessage, setCurrentPassErrorMessage] = useState(false);
  const [newPassErrorMessage, setNewPassErrorMessage] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isNewPasswordChanged, setIsNewPasswordChanged] = useState(false);
  const confirmNewPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const newPasswordRef = useRef(null);
  const currentPasswordRef = useRef(null);
  const [accountInfo, setAccountInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { customer } = useSelector((state) => state?.customer);

  const handleClickShowPassword = (ref) => {
    if (ref === newPasswordRef) setShowPassword(!showPassword);
    else if(ref === confirmNewPasswordRef) setShowConfirmPassword(!showConfirmPassword);
    else setShowCurrentPassword(!showCurrentPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const confirmNewPasswordHandle = (event) => {
    setAccountInfo({ ...accountInfo, confirmPassword: event.target.value });
    if (
      !event.target.value.trim() &&
      !currentPassErrorMessage &&
      !newPassErrorMessage
    ) {
      setErrorMessage("The confirm new password field cannot be left empty");
    } else {
      setIsFormSubmitted(false);
      setErrorMessage("");
    }
  };

  const newPasswordHandle = (event) => {
    setAccountInfo({ ...accountInfo, newPassword: event.target.value });
    if (
      !event.target.value.trim() &&
      !currentPassErrorMessage &&
      !errorMessage
    ) {
      setNewPassErrorMessage("The new password field cannot be left empty");
    } else {
      setIsNewPasswordChanged(true);
      setIsFormSubmitted(false);
      setNewPassErrorMessage("");
    }
  };

  const submitChange = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (
      (!accountInfo.currentPassword.trim() ||
        !accountInfo.newPassword.trim() ||
        !accountInfo.confirmPassword.trim()) &&
      !newPassErrorMessage &&
      !currentPassErrorMessage
    ) {
      setErrorMessage("All fields are required");
    } else if (
      !isPasswordValid &&
      !newPassErrorMessage &&
      !currentPassErrorMessage
    ) {
      setErrorMessage("The password is not valid");
    } else if (
      accountInfo.newPassword !== accountInfo.confirmPassword &&
      !newPassErrorMessage &&
      !currentPassErrorMessage
    ) {
      setErrorMessage("The passwords do not match");
    } else {
      try {
        const response = await apiRequest({
          method: "PUT",
          url: "/customers/changePassword",
          data: {
            oldPassword: accountInfo.currentPassword,
            newPassword: accountInfo.newPassword,
            id: customer._id,
          },
          token: customer?.token,
        });
        console.log("API Response:", response.data.message);
        // Clear text fields after successful submission
        setAccountInfo({
          ...accountInfo,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // Clear error message
        setErrorMessage("");
        setIsPasswordValid(true);
        toast.dismiss();
        toast.success(response.data.message);
        // setSubmitMessage(response.data.message)
      } catch (error) {
        // console.error("Error changing password:", error);
        setSubmitMessage(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    const validatePassword = () => {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return regex.test(accountInfo.newPassword);
    };

    setIsPasswordValid(validatePassword());
  }, [accountInfo.newPassword]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "flex-start",
            minHeight: "100vh",
          }}
          onSubmit={submitChange}
        >
          <Toaster
            toastOptions={{
              style: {
                duration: 3000,
                border: "1px solid #6A5ACD",
                backgroundColor: "#6A5ACD",
                padding: "16px",
                color: "white",
                fontWeight: "Bold",
                marginTop: "65px",
                textAlign: "center",
              },
            }}
          />
          <h1
            style={{
              marginBottom: "50px",
              fontWeight: "bold",
              fontSize: "32px",
            }}
          >
            Change Password
          </h1>
          <p style={{ width: "100%", marginBottom: "50px", fontSize: "19px" }}>
            It&apos;s a good idea to update your password regularly and to make
            sure it&apos;s unique from other passwords you use.
          </p>
          <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
            <label htmlFor="CurrentPassword">Current Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="CurrentPassword"
              name="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              inputRef={currentPasswordRef}
              autoComplete="password"
              value={accountInfo.currentPassword}
              onChange={(event) => {
                setAccountInfo({
                  ...accountInfo,
                  currentPassword: event.target.value,
                });

                if (!event.target.value.trim()) {
                  setCurrentPassErrorMessage(
                    "The current password field cannot be left empty"
                  );
                } else {
                  setIsFormSubmitted(false);
                  setCurrentPassErrorMessage("");
                }
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (
                    !accountInfo.currentPassword.trim() &&
                    !currentPassErrorMessage &&
                    !newPassErrorMessage
                  ) {
                    setCurrentPassErrorMessage(
                      "The current password field cannot be left empty"
                    );
                  } else {
                    newPasswordRef.current.focus();
                    setCurrentPassErrorMessage("");
                  }
                }
              }}
              error={
                !accountInfo.currentPassword.trim() &&
                currentPassErrorMessage ===
                  "The current password field cannot be left empty"
              }
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(currentPasswordRef)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {currentPassErrorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {currentPassErrorMessage}
              </p>
            )}
            <label htmlFor="NewPassword">New Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="New Password"
              type={showPassword ? "text" : "password"}
              id="NewPassword"
              value={accountInfo.newPassword}
              onChange={newPasswordHandle}
              inputRef={newPasswordRef}
              autoComplete="New Password"
              error={
                (isNewPasswordChanged &&
                  !isPasswordValid &&
                  !isFormSubmitted) ||
                (!accountInfo.currentPassword.trim() && newPassErrorMessage)
              }
              helperText={
                isNewPasswordChanged &&
                !isFormSubmitted && (
                  <ul
                    style={{
                      color: "black",
                      paddingLeft: "20px",
                      listStyleType: "none",
                      fontSize: "15px",
                    }}
                  >
                    <li>
                      {/[a-z]/.test(accountInfo.newPassword) ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      A lowercase letter (a-z)
                    </li>
                    <li>
                      {/[A-Z]/.test(accountInfo.newPassword) ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      An uppercase letter (A-Z)
                    </li>
                    <li>
                      {/\d/.test(accountInfo.newPassword) ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      A number
                    </li>
                    <li>
                      {accountInfo.newPassword.length >= 8 &&
                      accountInfo.newPassword.length <= 20 ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      8-20 characters
                    </li>
                  </ul>
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (
                    !accountInfo.newPassword.trim() &&
                    !currentPassErrorMessage &&
                    !errorMessage
                  ) {
                    setNewPassErrorMessage(
                      "The new password field cannot be left empty"
                    );
                  } else {
                    if (isPasswordValid) {
                      e.preventDefault();
                      confirmNewPasswordRef.current.focus();
                    } else {
                      newPasswordRef.current.focus();
                    }
                    setNewPassErrorMessage("");
                  }
                }
              }}
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(newPasswordRef)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {newPassErrorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {newPassErrorMessage}
              </p>
            )}
            <label htmlFor="Confirm New Password">Confirm New Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Confirm New Password"
              type={showConfirmPassword ? "text" : "password"}
              id="Confirm New Password"
              autoComplete="Confirm New Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (
                    !accountInfo.confirmPassword.trim() &&
                    !currentPassErrorMessage &&
                    !newPassErrorMessage
                  ) {
                    setErrorMessage(
                      "The confirm new password field cannot be left empty"
                    );
                  } else {
                    setErrorMessage("");
                    submitChange(e);
                  }
                }
              }}
              error={
                !accountInfo.confirmPassword.trim() &&
                errorMessage ===
                  "The confirm new password field cannot be left empty"
              }
              inputRef={confirmNewPasswordRef}
              value={accountInfo.confirmPassword}
              onChange={confirmNewPasswordHandle}
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handleClickShowPassword(confirmNewPasswordRef)}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </p>
            )}
            {submitMessage && isFormSubmitted && (
              <p style={{ color: "black", marginBottom: "10px" }}>
                {submitMessage}
              </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                width: "100%",
                textTransform: "capitalize",
                bgcolor: "black",
                ":hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                height: "60px",
                borderRadius: "30px",
                fontSize: "19px",
              }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
