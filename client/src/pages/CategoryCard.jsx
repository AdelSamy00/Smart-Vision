import React from "react";

const CategoryCard = ({ name, imageUrl }) => {
  return (
    <div className={`category-card active `} style={{width: "350px", height: "450px" ,position:"relative"}}>
      <img
        src={imageUrl}
        alt={name}
        style={{ width: "100%", height: "100%"}}
      />
      <button style={{position:"absolute", top: "90%", left: "50%", transform: "translate(-50%, -50%)" }}>{name}</button>
    </div>
  );
};

export default CategoryCard;
