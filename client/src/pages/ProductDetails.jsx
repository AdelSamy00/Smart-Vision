import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../redux/CustomerSlice';
import ProgressBar from 'react-bootstrap/ProgressBar';
import StarIcon from '@mui/icons-material/Star';
import Reviews from '../components/Reviews';
import "./StyleSheets/ProductDetails.css"
import AddReview from '../components/AddReview';
function ProductDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const [product, setProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [mainImage, setMainImage] = useState();
  const handelFavorit = async (id, productId) => {
    if (customer._id) {
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
      navigate('/login');
    }
  };
  useEffect(() => {
    async function getProduct(productId) {
      await axios.get(`/products/${productId}`).then((res) => {
        setProduct(res?.data?.product);
        const product = res?.data?.product;
        setMainImage(product?.images[0])
        const flag = product?.likes.find((fav) => {
          return fav === customer._id;
        });
        if (flag) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      });
    }
    getProduct(productId);
  }, []);


  return (
    <main className='productDetailMain'>
      <div className="productDetailDivForImgAndData ">
        <div className="productDetailImages">

          <img
            className="productDetailMainImg"
            src={mainImage}
          />
          <div className='productDetailSubImages'>
            {product?.images.map((src, idx) => {
              if (idx < 3) {
                return <img
                  key={idx}
                  className="productDetailSubImag"
                  src={src}
                  onClick={() => setMainImage(src)}
                />
              }
            })}
          </div>
        </div>
        <div className="productDetailData">
          <h1>
            {product?.name}
          </h1>
          <div className='productDetailCategory'>
            <h2>Category:</h2>
            <p>bed</p>
          </div>
          <div className="productDetailRating">
            <Rating
              readOnly
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              sx={{ fontSize: 30 }}
            />
            <p>2.5 Reviews </p>
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
          <p className='productDetailsPrice'>
            {product?.price} EL
          </p>
          <div className="productDetailsDataFooter">
            <button className=" productDetailsAddToCart ">
              Add To Cart
            </button>
            <button
              onClick={() => handelFavorit(customer?._id, product?._id)}
            >
              {!favorite ? (
                <svg className="sbProductCardFooterIcon" viewBox="0 0 24 24">
                  <path
                    d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,
                            7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,
                            24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,
                            1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,
                            12.448,15.253,18.416,12,20.846Z"
                  />
                </svg>
              ) : (
                <svg className="sbProductCardFooterIcon" viewBox="0 0 24 24">
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
      <div className="productDetailReviews">
        <div className="productDetailReviewsDetails">
          <h4>Customer Reviews</h4>
          <div className="productDetailRatingForReviews">
            <Rating
              readOnly
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
              sx={{ fontSize: 25 }}
            />
            <p>2.5 Based on 1624 Reviews </p>
          </div>
          <div className="productDetailRatingAllBars">
            <div className="productDetailRatingBar ">
              <div className='flex'>
                <p className='mr-1'>5</p>
                <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
              </div>
              <ProgressBar
                now={60}
                className='productDetailProgressBar'
                variant="warning" />
              <p>60%</p>
            </div>
            <div className="productDetailRatingBar ">
              <div className='flex'>
                <p className='mr-1'>5</p>
                <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
              </div>
              <ProgressBar now={50} className='productDetailProgressBar' variant="warning" />
              <p>50%</p>
            </div>
            <div className="productDetailRatingBar ">
              <div className='flex'>
                <p className='mr-1'>5</p>
                <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
              </div>
              <ProgressBar now={40} className='productDetailProgressBar' variant="warning" />
              <p>40%</p>
            </div>
            <div className="productDetailRatingBar ">
              <div className='flex'>
                <p className='mr-1'>5</p>
                <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
              </div>
              <ProgressBar now={30} className='productDetailProgressBar' variant="warning" />
              <p>30%</p>
            </div>
            <div className="productDetailRatingBar ">
              <div className='flex'>
                <p className='mr-1'>5</p>
                <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
              </div>
              <ProgressBar now={10} className='productDetailProgressBar' variant="warning" />
              <p>10%</p>
            </div>
          </div>
          <div className="productDetailReviewsFooter">
            <h5>Share your thoughts</h5>
            <p>If you’ve used this product, share your thoughts with other customers.</p>
          </div>
        </div>
        <div className="productDetailReviewsData">
          <Reviews />
          <Reviews />
          <Reviews />
          <AddReview/>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;