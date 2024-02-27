import { useEffect, useRef, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import "../pages/StyleSheets/Homepage.css";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetCustomer } from "../redux/CustomerSlice";
import { useNavigate } from "react-router-dom";

const getinitItems = () => {
  const data = JSON.parse(localStorage.getItem("cart"));
  if (!data) return [];
  return data;
};

function HomeSlider({ items, option, setSelectedOption }) {
  const categoryCardsRef = useRef(null);
  const leftArrowRef = useRef(null);
  const rightArrowRef = useRef(null);
  const sliderContainerRef = useRef(null);
  const [itemsToScroll, setItemsToScroll] = useState(5.75); // Initial value
  const { customer } = useSelector((state) => state.customer);
  const [favoriteList, setFavoriteList] = useState(customer?.favoriteList);
  const [cart, setCart] = useState(getinitItems);
  const [inCart, setInCart] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelCart = (id, name, price, images, points) => {
    console.log(id, name, price, images, points);
    const res = cart.find((prod) => {
      return prod._id === id;
    });
    if (res) {
      console.log("remove");
      setCart((prevCart) => {
        return prevCart.filter((t) => t._id !== id);
      });
      setInCart(false);
    } else {
      console.log("add");
      setCart([...cart, { _id: id, name, price, images, points }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { _id: id, name, price, images, points }])
      );
      setInCart(true);
    }
  };

  const handelFavorit = (id) => {
    if (customer?._id) {
      console.log("fired2");
      favorites(customer?._id, id);
    } else {
      navigate("/login");
    }
  };
  async function favorites(id, productId) {
    console.log(id, productId);
    await axios
      .post("/customers/favorite", { id, productId })
      .then((res) => {
        const newData = { ...res.data?.newCustomerData };
        dispatch(SetCustomer(newData));
        setFavoriteList(customer?.favoriteList);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    // const container = categoryCardsRef.current;
    const updateItemsToScroll = () => {
      // Check if the screen width is less than or equal to a certain value (e.g., 600px)
      const screenWidth = window.innerWidth;
      console.log(screenWidth); // Log the screenWidth

      if (screenWidth < 580 && option !== "product") {
        setItemsToScroll(1.08);
      } else if (screenWidth < 890 && option !== "product") {
        setItemsToScroll(2.1);
      } else if (screenWidth <= 1035 && option !== "product") {
        setItemsToScroll(3.2);
      } else if (screenWidth <= 1410 && option !== "product") {
        setItemsToScroll(4.3);
      } else if(option === 'product'&&screenWidth<780){
        setItemsToScroll(1);
      }else {
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
        {items.map((item, index) =>
          option === "category" || option === "price" ? (
            <CategoryCard
              key={index}
              name={item.name}
              imageUrl={item.imageUrl}
              isLast={index === items.length - 1}
              onClick={() =>
                setSelectedOption(option === "category" ? item.name : item.low)
              }
            />
          ) : (
            <ProductCard
              key={index}
              product={item}
              favoriteList={favoriteList}
              handelFavorit={handelFavorit}
              handelCart={handelCart}
              name="home"
            />
          )
        )}
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
          pointerEvents: "none",
        }}
      >
        <button
          className="arrow left-arrow"
          onClick={scrollLeft}
          ref={leftArrowRef}
          style={{
            visibility: "hidden",
            pointerEvents: "auto",
          }}
        >
          &#10094;
        </button>
        <button
          className="arrow right-arrow"
          onClick={scrollRight}
          ref={rightArrowRef}
          style={{
            visibility: "hidden",
            pointerEvents: "auto",
          }}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default HomeSlider;
