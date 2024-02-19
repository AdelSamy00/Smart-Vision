import { useEffect, useRef, useState } from "react";
import HomeSlider from "../components/HomeSlider";
import Store from "./Store";
import "./StyleSheets/Homepage.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
// import ProductCard from "../components/ProductCard";
// import { useDispatch, useSelector } from "react-redux";
// import { SetCustomer } from "../redux/CustomerSlice";
// import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Bed", imageUrl: "../beds.avif" },
  { id: 6, name: "Closet", imageUrl: "../closet.avif" },
  { id: 2, name: "Sofa", imageUrl: "../sofa.jpeg" },
  { id: 3, name: "Chair", imageUrl: "../chair.avif" },
  { id: 4, name: "Kitchen", imageUrl: "../kitchen.avif" },
  { id: 5, name: "Dining Table", imageUrl: "../TABLE.jpg" },
  { id: 7, name: "Desk", imageUrl: "../desk.avif" },
  { id: 9, name: "Last", imageUrl: "" },
];
const prices = [
  { low: 5000, imageUrl: "../chair.jpg", name: "Under 5000EGP" },
  { low: 13000 , imageUrl: "../sofa.avif", name: "Under 13000EGP" },
  { low: 33000 , imageUrl: "../bed.jpg", name: "Under 5000EGP" },
  { low: "", name: "Last", imageUrl: "" },
];
// const getinitItems = () => {
//   const data = JSON.parse(localStorage.getItem("cart"));
//   if (!data) return [];
//   return data;
// };
function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [itemsToDisplay, setItemsToDisplay] = useState(4);
  const [products, setProducts] = useState([]);
  // const { customer } = useSelector((state) => state.customer);
  // const [favoriteList, setFavoriteList] = useState(customer?.favoriteList);
  // const [cart, setCart] = useState(getinitItems);
  // const [inCart, setInCart] = useState(null);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const sliderRef = useRef(null);

  // const handelCart = (id, name, price, images, points) => {
  //   console.log(id, name, price, images, points);
  //   const res = cart.find((prod) => {
  //     return prod._id === id;
  //   });
  //   if (res) {
  //     console.log("remove");
  //     setCart((prevCart) => {
  //       return prevCart.filter((t) => t._id !== id);
  //     });
  //     setInCart(false);
  //   } else {
  //     console.log("add");
  //     setCart([...cart, { _id: id, name, price, images, points }]);
  //     localStorage.setItem(
  //       "cart",
  //       JSON.stringify([...cart, { _id: id, name, price, images, points }])
  //     );
  //     setInCart(true);
  //   }
  // };

  // const handelFavorit = (id) => {
  //   if (customer?._id) {
  //     console.log("fired2");
  //     favorites(customer?._id, id);
  //   } else {
  //     navigate("/login");
  //   }
  // };
  // async function favorites(id, productId) {
  //   console.log(id, productId);
  //   await axios
  //     .post("/customers/favorite", { id, productId })
  //     .then((res) => {
  //       const newData = { ...res.data?.newCustomerData };
  //       dispatch(SetCustomer(newData));
  //       setFavoriteList(customer?.favoriteList);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);

  // useEffect(() => {
  //   // let isResized = false;
  //   const updateItemsToScroll = () => {
  //     const screenWidth = window.innerWidth;
  //     console.log("Screen width:", screenWidth);

  //     if (screenWidth <= 825) {
  //       console.log("Setting items to display: 1");
  //       setItemsToDisplay(1);
  //     } else if (screenWidth < 996) {
  //       console.log("Setting items to display: 2");
  //       setItemsToDisplay(2);
  //     } else if (screenWidth <= 1326) {
  //       console.log("Setting items to display: 3");
  //       setItemsToDisplay(3);
  //     } else if (screenWidth <= 1410) {
  //       console.log("Setting items to display: 4");
  //       setItemsToDisplay(4);
  //     } else {
  //       console.log("Setting items to dnisplay: 4");
  //       setItemsToDisplay(4);
  //     }
  //   };

  //   updateItemsToScroll();
  //   window.addEventListener("resize", () => {
  //     updateItemsToScroll();
  //   });

  //   return () => {
  //     window.removeEventListener("resize", updateItemsToScroll);
  //   };
  // }, []);

  // const settings = {
  //   // dots: true,
  //   infinite: true,
  //   speed: 200,
  //   slidesToShow: itemsToDisplay,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   arrows: false,
  // };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/products/");
        // console.log("API response:", response.data.products);
        setProducts(response.data.products);
        setIsLoading(false);
        // console.log(response.data.products[0].images[0])
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="Home">
      <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>
        Browse furniture sale
      </h2>
      <HomeSlider
        items={categories}
        option="category"
        setSelectedOption={setSelectedCategory}
      />
      {/* <div>
        <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>Our Products</h2>
        <Slider {...settings} ref={sliderRef} className="home-product-slider">
          {products.map((product, index) => (
            <div key={index}>
              <ProductCard
                product={product}
                favoriteList={favoriteList}
                handelFavorit={handelFavorit}
                handelCart={handelCart}
              />
            </div>
          ))}
        </Slider>
      </div> */}
      <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>Shop BY Price</h2>
      <HomeSlider
        items={prices}
        option="price"
        setSelectedOption={setSelectedPrice}
      />
      <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>Our Products</h2>
      <HomeSlider
        items={products}
        option="product"
      />
      {/* {console.log(selectedPrice)}
      {console.log(selectedCategory)} */}
      {(selectedCategory || selectedPrice) && (
        <Store
          key={selectedCategory}
          selectedCategory={selectedCategory?.toLowerCase()}
          selectedPrice={selectedPrice}
        />
      )}
    </div>
  );
}

export default Homepage;
