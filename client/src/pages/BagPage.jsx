import React, { useEffect, useState } from "react";
import "./StyleSheets/BagPage.css";

const Bag = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart data from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    // Remove item from cart based on its id
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    // Update local storage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (id) => {
    // Increase quantity for a specific item
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updatedCart);
    // Update local storage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecreaseQuantity = (id) => {
    // Decrease quantity for a specific item
    const updatedCart = cart
      .map((item) =>
        item._id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove items with zero quantity
    setCart(updatedCart);
    // Update local storage with the new cart data
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  function calculateTotalPrice(cart) {
    if (!cart || cart.length === 0) {
      return 0;
    }
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1); // Multiply by quantity
    }, 0);

    return totalPrice;
  }

  const itemCount = cart.reduce((count, item) => count + (item.quantity || 1), 0);
  const totalPrice = calculateTotalPrice(cart);

  return (
    <div className="BagContent">
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          margin: "35px 0px",
        }}
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
        <ul>
          {cart.map((item) => (
            <li key={item._id}>
              {item.images && item.images.length > 0 && (
                <img
                  src={item.images[0]}
                  alt={item.name}
                  style={{
                    width: "300px",
                    height: "200px",
                    marginRight: "10px",
                  }}
                />
              )}
              <div
                style={{
                  display: "block",
                }}
              >
                <p>{item.name}</p>
                <p>Price: {item.price} LE</p>
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
              </div>
              <button
                onClick={() => handleRemoveFromCart(item._id)}
                style={{
                  marginLeft: "30px",
                  fontWeight: "bold",
                  padding: "10px 15px",
                  borderRadius: "30px",
                }}
                className="RemoveButton"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p
        style={{
          fontWeight: "bold",
          fontSize: "30px",
        }}
      >
        Total Price: {totalPrice} EL
      </p>
    </div>
  );
};

export default Bag;
