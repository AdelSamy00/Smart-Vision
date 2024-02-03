import Toolbar from "@mui/material/Toolbar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "../stylesheets/Header.css";
import Menu from "./Menu";
import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
const Header = () => {
  return (
    <header style={{ display: "flex"}}>
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
            <img src="../smartVisionLogo.png" />
          </div>

          <div className="icons">
            <Link to={"/profile"}>
              <button
                className="userAccount btnHover"
                style={{ display: "flex", padding: "10px 20px 10px 8px"}}
              >
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  className="avatar"
                />
                <p
                  style={{
                    fontSize: "20px",
                    paddingTop: "0.2rem",
                    marginLeft: "0.3rem",
                  }}
                  className=""
                >
                  Hey! Username {localStorage.getItem("userName")}
                </p>
              </button>
            </Link>
            <button className="btnHover favorite" style={{ outline: "none" }}>
              <FavoriteBorderIcon
                style={{ fontSize: "25px", marginTop: "0.3rem" }}
              ></FavoriteBorderIcon>
            </button>

              <Link to={"./bag"} >
              <IconButton aria-label="cart" style={{ padding: "0px 20px" ,marginTop:"16px" }}className="badge"> 
              <Badge
                badgeContent={
                  <span
                    style={{
                      fontSize: "18px",
                      backgroundColor: "#f8f9fa",
                      borderRadius: "50%",
                      width: "25px",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                    }}
                  >
                    0
                  </span>
                }
                color="black"
              >
                {" "}
                <ShoppingBasketIcon
                  style={{ color: "black", fontSize: "30px" }}
                />
              </Badge>
            </IconButton>
              </Link>



            
          </div>
        </Toolbar>
        <Toolbar className="searchinput" style={{ position: "absolute" }}>
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
              type="search"
              placeholder="What Are You Looking For ?"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                backgroundColor: "#f8f9fa",
                fontSize: "20px",
              }}
            />
          </div>
        </Toolbar>
        <Toolbar className="row3">
          <ul className="headerUl links">
            <li>
              <Link>Products</Link>
            </li>
            <li>
              <Link>Harmony At Hom</Link>
            </li>
            <li>
              <Link>Rooms</Link>
            </li>
            <li>
              <Link>Sale Up To 70%</Link>
            </li>
          </ul>
          <button
            className="btnHover lang"
            style={{ fontSize: "23px", outline: "none" }}
          >
            العربية
          </button>
        </Toolbar>
      </div>
    </header>
  );
};

export default Header;
