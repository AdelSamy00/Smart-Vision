import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Slider from "../components/HomeSlider";
import Store from "./Store";
import "./StyleSheets/Homepage.css"

const categories = [
  { id: 1, name: "Beds", imageUrl: "../beds.avif" },
  { id: 2, name: "Sofa & armchair", imageUrl: "../sofa.jpeg" },
  { id: 3, name: "chair", imageUrl: "../background.jpg" },
  { id: 4, name: "Bed", imageUrl: "../imageSlider2.jpg" },
  { id: 5, name: "Living Room", imageUrl: "../background.jpg" },
  { id: 6, name: "Bedroom", imageUrl: "../imageSlider2.jpg" },
  { id: 7, name: "Living Room", imageUrl: "../background.jpg" },
  { id: 8, name: "Bedroom", imageUrl: "../imageSlider2.jpg" },
  { id: 9, name: "Bedroom", imageUrl: "../imageSlider2.jpg" },
];

function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="Home">
      <h2 style={{ fontWeight: "bold", fontSize: "30px", marginLeft: "6.5%" }}>
        Browse furniture sale
      </h2>
      <Slider
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Slider
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {selectedCategory && (
        <Store
          key={selectedCategory}
          selectedCategory={selectedCategory.toLowerCase()}
        />
      )}
    </div>
  );
}

export default Homepage;
