import React, { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../pages/StyleSheets/Homepage.css";
function Slider({ categories, selectedCategory, setSelectedCategory }) {
  const categoryCardsRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [itemsToScroll, setItemsToScroll] = useState(5.75); // Initial value

  useEffect(() => {
    // const container = categoryCardsRef.current;
    const updateItemsToScroll = () => {
      // Check if the screen width is less than or equal to a certain value (e.g., 600px)
      const screenWidth = window.innerWidth;
      console.log(screenWidth); // Log the screenWidth

      if (screenWidth < 580) {
        setItemsToScroll(1.08);
      } else if (screenWidth < 890) {
        setItemsToScroll(2.2);
      }
      else if (screenWidth <= 1035) {
        setItemsToScroll(3.2);
      } else if (screenWidth <= 1410) {
        setItemsToScroll(4.3);
      } else {
        setItemsToScroll(5.3);
      }
    };

    updateItemsToScroll();
    window.addEventListener("resize", updateItemsToScroll);
    return () => window.removeEventListener("resize", updateItemsToScroll);
  }, []);

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
    <div
      className="home-slider-container"
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
  );
}

export default Slider;
