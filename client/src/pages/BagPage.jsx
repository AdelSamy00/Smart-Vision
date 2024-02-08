import React, { useEffect, useState } from "react";
import "./StyleSheets/BagPage.css";
import Favourites from "./Favourites";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import PendingIcon from "@mui/icons-material/Pending";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
const Bag = () => {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // Retrieve cart data from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (id) => {
    const existingItem = cart.find((item) => item._id === id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const newItem = {
        _id: id,
        quantity: 1,
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); 
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  function calculateTotalPrice(cart) {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);

    return totalPrice;
  }

  const itemCount = cart.reduce(
    (count, item) => count + (item.quantity || 1),
    0
  );
  const totalPrice = calculateTotalPrice(cart);

  return (
    <div className="BagContent">
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          margin: "25px 80px",
          color: "#333",
        }}
        className="BagHeader"
      >
        Your Bag
      </h1>
      <p
        style={{
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Total Items: {itemCount}
      </p>
      <hr />
      {cart.length === 0 ? (
        <p
          style={{
            fontWeight: "bold",
            fontSize: "40px",
            margin: "35px 0px",
          }}
        >
          Your bag is empty.
        </p>
      ) : (
        <ul className="BagList">
          {cart.map((item) => (
            <li
              key={item._id}
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0px",
              }}
            >
              {item.images && item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{
                    width: "270px",
                    height: "170px",
                    marginRight: "10px",
                  }}
                />
              )}

              <div style={{ marginLeft: "20px" }}>
                <div style={{ maxWidth: "300px" }}>
                  <p>{item.name}</p>
                  <p>Price: {item.price} LE</p>
                </div>

                <div style={{ display: "flex" }} className="divsContent">
                  <div
                    className="quantity-controls"
                    style={{
                      padding: "7px 3px",
                      borderRadius: "30px",
                    }}
                  >
                    <button onClick={() => handleDecreaseQuantity(item._id)}>
                      -
                    </button>
                    <span
                      style={{
                        padding: "20px",
                      }}
                    >
                      {item.quantity || 1}
                    </span>
                    <button onClick={() => handleIncreaseQuantity(item._id)}>
                      +
                    </button>
                  </div>
                  <div className="clickButtons">
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      style={{
                        fontWeight: "bold",
                        padding: "10px",
                        borderRadius: "27px",
                        margin: "0px 13px",
                      }}
                      className="RemoveButton"
                    >
                      Remove
                    </button>
                    <button
                      // onClick={() => Favourites(item._id)}
                      style={{
                        fontWeight: "bold",
                        padding: "10px",
                        borderRadius: "27px",
                        marginTop: "20px",
                      }}
                      className="FavouriteButton"
                    >
                      Save To Favourites
                    </button>
                    <div className="menuButton">
                      <div>
                        <button
                          onClick={handleOpen}
                          className="btnHover"
                          style={{
                            borderRadius: "50%",
                            outline: "none",
                          }}
                        >
                          <PendingIcon
                            style={{
                              fontSize: "32px",
                            }}
                          ></PendingIcon>
                        </button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="left-modal-title"
                          aria-describedby="left-modal-description"
                          closeAfterTransition
                        >
                          <Slide
                            direction="up"
                            in={open}
                            mountOnEnter
                            unmountOnExit
                            className="slideBar"
                          >
                            <div
                              style={{
                                position: "fixed",
                                left: "0",
                                bottom: "0",
                                height: "250px",
                                width: "100vw",
                                backgroundColor: "white",
                                overflow: "auto",
                              }}
                            >
                              <div
                                style={{
                                  marginBottom: "10px",
                                  marginLeft: "1rem",
                                  position: "relative",
                                  fontSize: "20px",
                                }}
                              >
                                <IconButton onClick={handleClose}>
                                  <CloseIcon
                                    style={{
                                      fontSize: "32px",
                                      position: "fixed",
                                      marginTop: "30px",
                                    }}
                                  />
                                </IconButton>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "60px",
                                  }}
                                >
                                  <ArrowForwardSharpIcon
                                    style={{
                                      marginTop: "34px",
                                      marginRight: "20px",
                                    }}
                                  ></ArrowForwardSharpIcon>
                                  <button
                                    // onClick={() => Favourites(item._id)}
                                    style={{
                                      fontWeight: "bold",
                                      padding: "10px",
                                      borderRadius: "27px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    Save To Favourites
                                  </button>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "150px",
                                  }}
                                >
                                  <DeleteSharpIcon
                                    style={{
                                      marginTop: "34px",
                                      marginRight: "20px",
                                    }}
                                  ></DeleteSharpIcon>
                                  <button
                                    onClick={() =>
                                      handleRemoveFromCart(item._id)
                                    }
                                    style={{
                                      fontWeight: "bold",
                                      padding: "10px",
                                      borderRadius: "27px",
                                      marginTop: "20px",
                                    }}
                                    className="RemoveButton2"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Slide>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr></hr>
            </li>
          ))}
        </ul>
      )}
      <p
        style={{
          fontWeight: "bold",
          fontSize: "30px",
          marginBottom:"30px"
        }}
      >
        Total Price: {totalPrice} EL
      </p>
      <Link to={"/checkout"}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            textTransform: "capitalize",
            height: "60px",
            borderRadius: "30px",
            fontSize: "20px",
          }}
          className="checkout"
        >
          checkout
        </Button>
      </Link>
    </div>
  );
};

export default Bag;
