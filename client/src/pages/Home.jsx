import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "./StyleSheets/Homepage.css";
import Store from "./Store";

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
  const categoryCardsRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [itemsToScroll, setItemsToScroll] = useState(4.25); // Initial value

  useEffect(() => {
    const updateItemsToScroll = () => {
      const screenWidth = window.innerWidth;
      console.log(screenWidth); // Log the screenWidth

      if (screenWidth < 720) {
        setItemsToScroll(1.07);
      } else if (screenWidth <= 1035) {
        setItemsToScroll(2.1);
      } else if (screenWidth <= 1410) {
        setItemsToScroll(3.2);
      } else {
        setItemsToScroll(4.25);
      }
    };

    updateItemsToScroll();
    window.addEventListener("resize", updateItemsToScroll);

    return () => window.removeEventListener("resize", updateItemsToScroll);
  });

  useEffect(() => {
    const container = categoryCardsRef.current;
    const sliderContainer = sliderContainerRef.current;

    const handleScroll = () => {
      if (container) {
        const showLeftArrow = container.scrollLeft > 0;
        const showRightArrow =
          container.scrollLeft < container.scrollWidth - container.offsetWidth;

        if (leftArrowRef.current) {
          leftArrowRef.current.style.visibility = showLeftArrow
            ? "visible"
            : "hidden";
        }
        if (rightArrowRef.current) {
          rightArrowRef.current.style.visibility = showRightArrow
            ? "visible"
            : "hidden";
        }
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    if (container) {
      container.addEventListener("scroll", throttledScroll);
    }

    if (sliderContainer) {
      sliderContainer.addEventListener("mouseenter", () => {
        if (container) {
          const showLeftArrow = container.scrollLeft > 0;
          const showRightArrow =
            container.scrollLeft <
            container.scrollWidth - container.offsetWidth;

          if (leftArrowRef.current) {
            leftArrowRef.current.style.visibility = showLeftArrow
              ? "visible"
              : "hidden";
          }
          if (rightArrowRef.current) {
            rightArrowRef.current.style.visibility = showRightArrow
              ? "visible"
              : "hidden";
          }
        }
      });

      sliderContainer.addEventListener("mouseleave", () => {
        if (leftArrowRef.current && rightArrowRef.current) {
          leftArrowRef.current.style.visibility = "hidden";
          rightArrowRef.current.style.visibility = "hidden";
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", throttledScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    const container = categoryCardsRef.current;
    if (container) {
      const scrollWidth = itemsToScroll * container.children[0].offsetWidth;
      let scrollAmount = -1 * scrollWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const container = categoryCardsRef.current;
    if (container) {
      const scrollWidth = itemsToScroll * container.children[0].offsetWidth;
      let scrollAmount = 1 * scrollWidth;
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="Home">
      <h2 style={{ fontWeight: "bold", fontSize: "30px", marginLeft: "6.5%" }}>
        Browse furniture sale
      </h2>
      <div
        className="slider-container"
        style={{ position: "relative" }}
        ref={sliderContainerRef}
      >
        <div className="category-cards" ref={categoryCardsRef}>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              imageUrl={category.imageUrl}
              onClick={() => {
                setSelectedCategory(category.name);
              }}
            />
          ))}
        </div>

        <div
          className="overlay"
          style={{
            position: "absolute",
            width: "100%",
            height: "20%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            className="arrow left-arrow"
            onClick={scrollLeft}
            ref={leftArrowRef}
            style={{ visibility: "hidden" }}
          >
            &#10094;
          </button>
          <button
            className="arrow right-arrow"
            onClick={scrollRight}
            ref={rightArrowRef}
            style={{ visibility: "hidden" }}
          >
            &#10095;
          </button>
        </div>
      </div>
      <div
        className="slider-container"
        style={{ position: "relative" }}
        ref={sliderContainerRef}
      >
        <div className="category-cards" ref={categoryCardsRef}>
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category.name}
              imageUrl={category.imageUrl}
              onClick={() => {
                setSelectedCategory(category.name);
              }}
            />
          ))}
        </div>

        <div
          className="overlay"
          style={{
            position: "absolute",
            width: "100%",
            height: "20%",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <button
            className="arrow left-arrow"
            onClick={scrollLeft}
            ref={leftArrowRef}
            style={{ visibility: "hidden" }}
          >
            &#10094;
          </button>
          <button
            className="arrow right-arrow"
            onClick={scrollRight}
            ref={rightArrowRef}
            style={{ visibility: "hidden" }}
          >
            &#10095;
          </button>
        </div>
      </div>
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
