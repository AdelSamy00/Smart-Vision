import React from "react";

const CategoryCard = ({ name, imageUrl, onClick }) => {
  return (
    <div
      className={`category-card active `}
      style={{ width: "250px", height: "350px", position: "relative" }}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100%", height: "100%" }}
      />
      <div style={{position:"absolute",
          top: "85%",width:"100%",textAlign:"center"}}>
      <button
        style={{
          
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          color: "black",
          padding: "10px 15px",
          border: "none",
          borderRadius: "20px",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
        onMouseEnter={e => e.target.style.backgroundColor = "#f0f0f0"} 
        onMouseLeave={e => e.target.style.backgroundColor = "white"} 
      >
        {name}
      </button>
      </div>
   
    </div>
  );
};

export default CategoryCard;
