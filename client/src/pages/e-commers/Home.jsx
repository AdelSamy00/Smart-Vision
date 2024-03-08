import { useEffect, useRef, useState } from "react";
import HomeSlider from "../../components/e-commers/HomeSlider";
import Store from "./Store";
import "./StyleSheets/Homepage.css";
import axios from "axios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import "react-slideshow-image/dist/styles.css";
import { Fade, Zoom, Slide } from "react-slideshow-image";
import Loading from "../../components/shared/Loading";

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
  { low: 13000, imageUrl: "../sofa.avif", name: "Under 13000EGP" },
  { low: 33000, imageUrl: "../bed.jpg", name: "Under 5000EGP" },
  { low: "", name: "Last", imageUrl: "" },
];
const offers = [
  {
    id: 1,
    title: "50% Off",
    description: "Get 50% off on selected items",
    imageUrl: "../50%.avif",
  },
  {
    id: 2,
    title: "Flash Sale",
    description: "Limited time offer! Flash sale on all products",
    imageUrl: "../flash-sale-3d.jpg",
  },
  {
    id: 3,
    title: "Free Shipping",
    description: "Enjoy free shipping on all orders over $50",
    imageUrl: "../free_delivery.jpg",
  },
  // Add more offers as needed
];
function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

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
      <div
        className="rounded-lg sm:h-60 md:h-full overflow-hidden"
        style={{ marginBottom: "3.2rem", width: "90%", margin: "auto" }}
      >
        <div className=" ">
          <div className="inline md:slide-container">
            <Slide>
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="offer-item rounded-lg sm:h-60 md:h-full w-full"
                >
                  <div
                    className="flex flex-col justify-center items-center w-full h-[400px] bg-center"
                    style={{
                      backgroundImage: `url(${offer.imageUrl})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                </div>
              ))}
            </Slide>
          </div>
        </div>
      </div>
      <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>
        Browse furniture sale
      </h2>
      <HomeSlider
        items={categories}
        option="category"
        setSelectedOption={setSelectedCategory}
      />
      <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>Shop BY Price</h2>
      <HomeSlider
        items={prices}
        option="price"
        setSelectedOption={setSelectedPrice}
      />
      {isLoading && !selectedCategory && !selectedPrice ? (
        <Loading />
      ) : (
        <>
          <h2 style={{ fontWeight: "bold", fontSize: "27px" }}>Our Products</h2>
          <HomeSlider items={products} option="product" />
        </>
      )}
      {(selectedCategory || selectedPrice) && (
        <Store
          key={selectedCategory}
          selectedCategory={selectedCategory?.toLowerCase()}
          selectedPrice={selectedPrice}
        />
      )}

      <div
        className="mt-10 w-full  flex flex-col md:flex-row bg-slate-200 justify-between overflow-hidden rounded-lg "
        style={{ marginBottom: "2rem" }}
      >
        <div className="md:w-1/3 flex flex-col  bg-slate-300  p-10 hover:bg-slate-100 transition ease-in duration-800">
          <img
            src="/vision.png"
            alt="vision"
            width={60}
            height={60}
            className="self-center"
          />
          <h2 className="text-3xl text-blue-500 text-center ">Our Vision</h2>
          <p className="text-black">
            Smart Vision seeks to provide the best services with high quality to
            its customers while achieving the equation between (commitment -
            price - quality)
          </p>
        </div>
        <div className="md:w-1/3 flex flex-col p-10 hover:bg-slate-100 transition ease-in duration-800">
          <img
            src="/mission.png"
            alt="vision"
            width={60}
            height={60}
            className="self-center"
          />
          <h2 className="text-3xl text-blue-500 text-center">Mission</h2>
          <p className="text-black">
            We affirm our keenness to work continuously to obtain excellent
            results by forming a partnership between us and our customers in
            achieving the vision of Smart Vision.
          </p>
        </div>
        <div className="md:w-1/3 flex flex-col  bg-slate-300  p-10 hover:bg-slate-100 transition ease-in duration-800">
          <img
            src="/commitment.png"
            alt="vision"
            width={60}
            height={60}
            className="self-center"
          />
          <h2 className="text-3xl text-blue-500 text-center">Commitment</h2>
          <p className="text-black">
            We are committed to hard and continuous work and learning to provide
            our services to our customers without discrimination, and to work to
            develop our products to reach the highest levels of quality
          </p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;