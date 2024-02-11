import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import "../stylesheets/Header.css";
import { Link } from "react-router-dom";

const Menu = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="btnHover"
        style={{
          borderRadius: "50%",
          outline: "none",
        }}
      >
        <MenuIcon
          style={{
            fontSize: "32px",
          }}
        ></MenuIcon>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="left-modal-title"
        aria-describedby="left-modal-description"
        closeAfterTransition
      >
        <Slide direction="right" in={open} mountOnEnter unmountOnExit className="slideBar">
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              height: "100%",
              width: "500px", // Adjusted width based on your design
              backgroundColor: "white",
              padding: "20px",
              zIndex: "1000",
              overflow: "auto",
            }}
            
          >
            <div
              style={{
                marginBottom: "10px",
                marginLeft: "1rem", // Adjusted margin for the close button
                position: "relative",
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon style={{ fontSize: "32px", position: "fixed" }} />
              </IconButton>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "1rem", // Adjusted margin for the content
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <img
                    src="../smartVisionLogo.png"
                    alt="Logo"
                    style={{
                      width: "100px",
                      height: "60px",
                      marginLeft:"2.3rem",
                      border:"none"
                    }}
                  />
                </div>

                <ul
                  style={{
                    fontSize: "30px", // Adjusted font size
                    fontWeight: "bolder",
                    marginTop: "1.5rem", // Adjusted margin for the list
                    marginLeft:"2.3rem"
                  }}
                >
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/home">Home</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/store">Products</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/services">Services</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/Profile">Profile</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/favourites">Favorites</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/bag">Cart</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li style={{ marginTop: "1rem" ,boxShadow: "none",}}>
                    <Link to="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Menu;
