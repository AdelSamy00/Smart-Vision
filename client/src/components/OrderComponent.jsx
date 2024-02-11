import React, { useState } from "react";

function OrderComponent() {
  const [showOrder, setShowOrder] = useState(false);

  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <div
      className="order-container"
      style={{
        width: "60%",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          border: "2px solid #ddd",
          padding: "20px",
          backgroundColor: "#f2f2f2",
        }}
      >
        <div>
          <div>Date Placed</div>
          <div>New line value of Date Placed</div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div>Order Number</div>
          <div>New line value of Order Number</div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div>Total Amount</div>
          <div>New line value of Total Amount</div>
        </div>
        <button
          onClick={toggleOrder}
          style={{
            marginLeft: "20px",
            padding: "5px 20px",
            backgroundColor: "#009688", // Changed button color
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {showOrder ? "Hide Order" : "Show Order"}
        </button>
      </div>
      {showOrder && (
        <div
          style={{
            width: "100%",
            border: "2px solid #ddd",
            padding: "30px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "40%" }}>
              <img
                src="path_to_image"
                alt="Product"
                style={{ width: "100%", height: "100px" }}
              />
            </div>
            <div style={{ marginLeft: "20px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>Product Name</div>
                <div>Price</div>
              </div>
              <div>Description</div>
            </div>
          </div>
          <div>
            <div>Status of Order</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderComponent;
