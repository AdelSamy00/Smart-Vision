import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import Slider from "../components/HomeSlider";
import Store from "./Store";
import "./StyleSheets/Homepage.css";
import ImageCarousel from "../components/imageCarousel";

const categories = [
  { id: 1, name: "Bed", imageUrl: "../beds.avif" },
  { id: 2, name: "Sofa", imageUrl: "../sofa.jpeg" },
  { id: 3, name: "Chair", imageUrl: "../background.jpg" },
  { id: 4, name: "Kitchen", imageUrl: "../kitchen.jpg" },
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
      <div style={{marginBottom:"4rem"}}>
        <h2 style={{ fontWeight: "bold", fontSize: "27px", marginLeft: "3%" }}>
          Our Products
        </h2>
        <ImageCarousel images={categories.map((ele) => ele.imageUrl)} />
      </div>
      <h2 style={{ fontWeight: "bold", fontSize: "27px", marginLeft: "6.7%" }}>
        Browse furniture sale
      </h2>
      <Slider
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <h2 style={{ fontWeight: "bold", fontSize: "27px", marginLeft: "6.7%" }}>
        Shop BY Price
      </h2>
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
