import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../../redux/CustomerSlice';
import './StyleSheets/ProductDetails.css';
import AddReview from '../../components/e-commers/AddReview';
import { setCart } from '../../redux/CartSlice';
import Loading from '../../components/shared/Loading';
import LoginMessage from '../../components/e-commers/LoginMessage';
import HomeSlider from '../../components/e-commers/HomeSlider';
import ReviewsSection from '../../components/e-commers/ReviewsSection';

function ProductDetails() {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const { cart } = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [reviews, setReviews] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [inCart, setInCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginMessage, setshowLoginMessage] = useState(false);
  const [products, setProducts] = useState([]);
  // console.log(product);

  //handel add and remove from favorite list
  const handelFavorit = async (id, productId) => {
    if (customer?._id) {
      await axios
        .post('/customers/favorite', { id, productId })
        .then((res) => {
          const newData = { ...res.data?.newCustomerData };
          dispatch(SetCustomer(newData));
          setFavorite(!favorite);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setshowLoginMessage(true);
    }
  };

  function isFavorite(product) {
    const flag = product?.likes.find((fav) => {
      return fav === customer?._id;
    });
    if (flag) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch main product details
        const productResponse = await axios.get(`/products/${productId}`);
        const productData = productResponse.data.product;

        // Set main product details
        setProduct(productData);
        setMainImage(productData.images[0]);
        setReviews(productData.reviews);
        setTotalRating(productData.totalRating);
        setInCart(isProductInCart(cart, productId));
        isFavorite(productData);

        // Fetch category of main product
        const productCategory = productData.category;

        // Fetch all products with the same category
        const categoryResponse = await axios.get(
          `/products/category/${productCategory}`
        );
        // Filter out the product with the given ID
        const filteredProducts = categoryResponse.data.products.filter(
          (product) => product._id !== productId
        );

        setProducts(filteredProducts);
        // console.log(categoryResponse.data.products);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  //check if the product in cart
  function isProductInCart(cart, productId) {
    const res = cart.find((product) => {
      return product?._id === productId;
    });
    if (res) {
      return true;
    }
    return false;
  }
  //remove product from cart
  function deleteProductFromCart(prevCart, id) {
    return prevCart.filter((t) => t._id !== id);
  }

  //handel add to cart button
  const handelCart = (id, name, price, images, points) => {
    const inCart = cart.find((prod) => {
      return prod._id === id;
    });
    //item all ready in the cart
    if (inCart) {
      dispatch(setCart(deleteProductFromCart(cart, id)));
    } else {
      dispatch(
        setCart([
          ...cart,
          { _id: id, name, price, images, points, quantity: 1 },
        ])
      );
    }
    setTimeout(() => {
      setInCart(!inCart);
    }, 1000);
  };
  return (
    <main className="productDetailMain">
      {isLoading ? (
        <div className="flex h-56 ">
          <div className=" m-auto">
            <Loading />
          </div>
        </div>
      ) : (
        <>
          <div className="productDetailDivForImgAndData ">
            <div className="productDetailImages">
              <img className="productDetailMainImg" src={mainImage} />
              <div className="productDetailSubImages">
                {product?.images.map((src, idx) => {
                  if (idx < 3) {
                    return (
                      <img
                        key={idx}
                        className="productDetailSubImag"
                        src={src}
                        onClick={() => setMainImage(src)}
                      />
                    );
                  }
                })}
              </div>
            </div>
            <div className="productDetailData">
              <div>
                <h1>{product?.name}</h1>
                <div className="productDetailCategory">
                  <h2>Category:</h2>
                  <p>{product?.category}</p>
                </div>
                <div className="productDetailRating">
                  <Rating
                    readOnly
                    name="half-rating"
                    value={totalRating}
                    precision={0.5}
                    sx={{ fontSize: 30 }}
                  />
                  <p>
                    {totalRating} Based on {reviews?.length} Reviews.{' '}
                  </p>
                </div>
                <h3>Description:</h3>
                <p className="productDetailDescription">
                  {product?.description}
                </p>
                <div className="productDetailColors">
                  <p>Color: </p>
                  {product?.colors.map((color, idx) => (
                    <span key={idx} className="mr-3">
                      {color}
                    </span>
                  ))}
                </div>
                <p className="productDetailsPrice">{product?.price} EL</p>
              </div>
              <div className="productDetailsDataFooter">
                {product?.quantity === 0 ? (
                  <h2
                    style={{
                      backgroundColor: '#ff6347',
                      color: 'white',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}
                  >
                    Out of Stock
                  </h2>
                ) : (
                  <button
                    className={
                      !inCart
                        ? ' productDetailsAddToCart '
                        : 'productDetailsAddToCart bg-red-700 hover:bg-red-900'
                    }
                    onClick={() =>
                      handelCart(
                        product?._id,
                        product?.name,
                        product?.price,
                        product?.images,
                        product?.price
                      )
                    }
                  >
                    {!inCart ? ' Add to cart ' : 'Remove From cart'}
                  </button>
                )}
                <button
                  onClick={() => handelFavorit(customer?._id, product?._id)}
                >
                  {!favorite ? (
                    <svg
                      className="sbProductCardFooterIcon"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,
                            7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,
                            24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,
                            1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,
                            12.448,15.253,18.416,12,20.846Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="sbProductCardFooterIcon"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,
                                0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,
                                13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <ReviewsSection
            reviews={reviews}
            TotalProductRating={totalRating}
            setTotalRating={setTotalRating}
            setReviews={setReviews}
          />
          {/* <AddReview
            productId={productId}
            setTotalRating={setTotalRating}
            setReviews={setReviews}
          /> */}
          {products?.length > 0 && (
            <>
              <h2
                style={{
                  fontWeight: 'bold',
                  fontSize: '27px',
                  marginTop: '3rem',
                  marginBottom: '3rem',
                }}
              >
                Related Products
              </h2>
              <HomeSlider items={products} option="product" />
            </>
          )}
        </>
      )}
      <LoginMessage
        showLoginMessage={showLoginMessage}
        setshowLoginMessage={setshowLoginMessage}
      />
    </main>
  );
}

export default ProductDetails;
