import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
const defaultTheme = createTheme();

export default function ChangePassword() {
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isNewPasswordChanged, setIsNewPasswordChanged] = useState(false);
  const confirmNewPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const [accountInfo, setAccountInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const confirmNewPasswordHandle = (event) => {
    setAccountInfo({ ...accountInfo, confirmPassword: event.target.value });
    if (!event.target.value.trim()) {
      setErrorMessage("The confirm new password field cannot be left empty");
    } else {
      setErrorMessage("");
    }
  };

  const newPasswordHandle = (event) => {
    setAccountInfo({ ...accountInfo, newPassword: event.target.value });

    if (event.target.value.trim() !== "") {
      setIsNewPasswordChanged(true);
      setErrorMessage("");
    } else {
      setErrorMessage("The new password field cannot be left empty");
    }
  };

  const submitChange = (e) => {
    e.preventDefault();

    if (
      !accountInfo.currentPassword.trim() ||
      !accountInfo.newPassword.trim() ||
      !accountInfo.confirmPassword.trim()
    ) {
      setErrorMessage("All fields are required");
      return;
    } else if (!isPasswordValid) {
      setErrorMessage("The password is not valid");
      return;
    } else if (accountInfo.newPassword !== accountInfo.confirmPassword) {
      setErrorMessage("The passwords do not match");
      return;
    } else {
      setErrorMessage("Password Has Changed Successfully");
      // Call  API
    }
  };

  useEffect(() => {
    const validatePassword = () => {
      // Password must contain no more than 2 identical characters in a row,
      // a lowercase letter, an uppercase letter, 8-20 characters, and a number
      //   const regex = /^(?!.*(\w)\1{2,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/;
      const regex =
        /^(?!.*(\w)\1{2,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?]).{8,20}$/;

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
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100vh",
          }}
          onSubmit={submitChange}
        >
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
              type="password"
              autoComplete="password"
              onChange={(event) => {
                setAccountInfo({
                  ...accountInfo,
                  currentPassword: event.target.value,
                });

                if (!event.target.value.trim()) {
                  setErrorMessage(
                    "The current password field cannot be left empty"
                  );
                } else {
                  setErrorMessage("");
                }
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!accountInfo.currentPassword.trim()) {
                    setErrorMessage(
                      "The current password field cannot be left empty"
                    );
                  } else {
                    newPasswordRef.current.focus();
                    setErrorMessage("");
                  }
                }
              }}
              error={
                !accountInfo.currentPassword.trim() &&
                errorMessage ===
                  "The current password field cannot be left empty"
              }
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
            />
            <label htmlFor="NewPassword">New Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="New Password"
              type="password"
              id="NewPassword"
              onChange={newPasswordHandle}
              inputRef={newPasswordRef}
              autoComplete="New Password"
              error={
                (isNewPasswordChanged && !isPasswordValid) ||
                (!accountInfo.currentPassword.trim() &&
                  errorMessage ===
                    "The new password field cannot be left empty")
              }
              helperText={
                isNewPasswordChanged && (
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
                      {/[^a-zA-Z\d]/.test(accountInfo.newPassword) ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      A special character
                    </li>
                    <li>
                      {/^(?!.*(\w)\1{2,}).*$/.test(accountInfo.newPassword) ? (
                        <CheckIcon style={{ color: "green" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}{" "}
                      No more than 2 identical characters in a row
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
                  if (!accountInfo.newPassword.trim()) {
                    setErrorMessage(
                      "The new password field cannot be left empty"
                    );
                  } else {
                    if (isPasswordValid) {
                      e.preventDefault();
                      confirmNewPasswordRef.current.focus();
                    } else {
                      newPasswordRef.current.focus();
                    }
                    setErrorMessage("");
                  }
                }
              }}
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
            />
            <label htmlFor="Confirm New Password">Confirm New Password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              name="Confirm New Password"
              type="password"
              id="Confirm New Password"
              autoComplete="Confirm New Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!accountInfo.confirmPassword.trim()) {
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
              onChange={confirmNewPasswordHandle}
              sx={{
                marginTop: "0px",
                marginBottom: "25px",
                display: "block",
                width: "100%",
              }}
            />
            {errorMessage && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
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
