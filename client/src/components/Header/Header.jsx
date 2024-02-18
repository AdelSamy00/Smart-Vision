import React from "react";
import { useSelector } from "react-redux";
import Toolbar from "@mui/material/Toolbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "../stylesheets/Header.css";
import Menu from "./Menu";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

const Header = ({itemCount}) => {
  const { customer } = useSelector((state) => state.customer);

  const renderUserName = () => {
    if (!customer || !customer.username) {
      return "Log in or sign up";
    }
    return customer.username;
  };

  return (
    <header style={{ display: "flex" }}>
      <div className="menu">
        <Menu></Menu>
        <p>Menu</p>
      </div>
      <div style={{ position: "relative" }} className="head">
        <Toolbar
          style={{ display: "flex", justifyContent: "space-between" }}
          className="header-row"
        >
          <div className="header-logo">
            <Link to={"/home"}>
              <img src="../smartVisionLogo.png" />
            </Link>
          </div>
          <div className="icons">
            <Link to={"/profile"}>
              <button
                className="userAccount btnHover"
                style={{ display: "flex", padding: "10px 20px 10px 8px" }}
              >
                <Avatar sx={{ width: 35, height: 35 }} className="avatar" />
                <p
                  style={{
                    fontSize: "19px",
                    paddingTop: "0.2rem",
                    marginLeft:"0.5rem"
                    // width:"210px",
                    // marginLeft:"-0.7rem"
                  }}
                  className=""
                >
                  {renderUserName()}
                </p>
              </button>
            </Link>
            <button className="btnHover favorite" style={{ outline: "none" ,padding:"4px 12px"}}>
              <Link to={"/favourites"}>
              <FavoriteIcon
                style={{ fontSize: "22px", marginTop: "0.8rem", }} 
              ></FavoriteIcon></Link>
            </button>
            <Link to={"./bag"} >
              <IconButton aria-label="cart" style={{ padding: "12px", marginLeft:'2px' }} className="badge">
                <Badge
                  badgeContent={
                    <span
                      style={{
                        fontSize: "16px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "50%",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {itemCount}
                    </span>
                  }
                  color="black"
                >
                  {" "}
                  <ShoppingBasketIcon
                    style={{ color: "black", fontSize: "25px" }}
                  />
                </Badge>
              </IconButton>
            </Link>
          </div>
        </Toolbar>
        <Toolbar className="searchinput" style={{ position: "absolute", padding: '0px' }}>
          <div
            style={{
              borderRadius: "30px",
              outline: "none",
              border: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              fontSize: "25px",
            }}
            className="btnHover search"
          >
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
            <input
              className="searchInput"
              type="search"
              placeholder="What Are You Looking For ?"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                backgroundColor: "#f8f9fa",
                fontSize: "19px",
                width:"100%"
              }}
            />
          </div>
        </Toolbar>
        <Toolbar className="row3">
          <ul className="headerUl links">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/store">Products</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
          <button
            className="btnHover lang"
            style={{ fontSize: "19px", outline: "none" }}
          >
            العربية
          </button>
        </Toolbar>
      </div>
    </header>
  );
};

export default Header;
