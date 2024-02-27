import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import ProgressBar from 'react-bootstrap/ProgressBar';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Tooltip,
} from '@mui/material';
import '../StyleSheets/ProductDetails.css';
import ReviewPresenter from '../../components/Presenter/ReviewsPresenter';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProductDetailsPresenter() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState();
  const [reviews, setReviews] = useState(null);
  const [totalRating, setTotalRating] = useState(null);
  const [progressBar, setProgressBar] = useState(null);
  const [showDeleteProductMessage, setShowDeleteProductMessage] =
    useState(false);

  //set valuse to prograss bar
  function setUpPrograssBar(reviews) {
    const totalRatings = [
      { number: 5, numOfRating: 0, progres: 0 },
      { number: 4, numOfRating: 0, progres: 0 },
      { number: 3, numOfRating: 0, progres: 0 },
      { number: 2, numOfRating: 0, progres: 0 },
      { number: 1, numOfRating: 0, progres: 0 },
    ];
    reviews.map((review) => {
      totalRatings.map((rating) => {
        if (review?.rating === rating.number) {
          rating.numOfRating++;
          rating.progres = Math.floor(
            (rating.numOfRating / reviews.length) * 100
          );
        }
      });
    });
    return totalRatings;
  }
  //Update prograss bar after any changes in reviews
  function updatePrograssBar(review, progressBar) {
    let totalReviews = 0;
    progressBar.map((rating) => {
      totalReviews = totalReviews + rating.numOfRating;
    });
    // 
    progressBar.map((rating) => {
      if (review?.rating === rating.number) {
        rating.numOfRating--;
        totalReviews--;
      }
    });
    progressBar.map((rating) => {
      rating.progres = Math.floor((rating.numOfRating / totalReviews) * 100);
    });
    return progressBar;
  }

  //handel remove product
  const handelDeleteProduct = async (productId) => {
    console.log('first');
    // await axios
    //     .delete('', { productId })
    //     .then((res) => {
    //         console.log(res.data)
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });
  };

  async function getProduct(productId) {
    await axios
      .get(`/products/${productId}`)
      .then((res) => {
        setProduct(res?.data?.product);
        const product = res?.data?.product;
        setMainImage(product?.images[0]);
        setReviews(product?.reviews);
        setTotalRating(product?.totalRating);
        setProgressBar(setUpPrograssBar(product?.reviews));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getProduct(productId);
  }, []);

  // Delete review from product
  async function deleteReview(customerId, reviewId) {
    await axios
      .delete('/customers/review', {
        data: { customerId, reviewId, productId },
      })
      .then((res) => {
        console.log(res.data)
        setReviews((prevReviews) => {
          return prevReviews.filter((review) => review._id !== reviewId);
        });
        setTotalRating(res.data.totalRating);
        setProgressBar(
          updatePrograssBar(res.data.deletedReview, progressBar,)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const handleAgreeDeleteProductMessage = () => {
    handelDeleteProduct(productId);
  };

  const handleDisagreeDeleteProductMessage = () => {
    setShowDeleteProductMessage(false);
  };

  return (
    <main className="productDetailMain">
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
            <p className="productDetailDescription">{product?.description}</p>
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
            <Link
              className="flex items-center text-xl bg-slate-700 hover:bg-slate-800 text-white py-2 px-3 rounded-xl"
              to={'/'}
            >
              Edit
              <EditIcon sx={{ fontSize: '20px', marginLeft: '5px' }} />
            </Link>
            <button onClick={() => setShowDeleteProductMessage(true)}>
              <Tooltip title="Delete" placement="top">
                <DeleteForeverIcon sx={{ fontSize: '40px' }} />
              </Tooltip>
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
              value={totalRating}
              precision={0.5}
              sx={{ fontSize: 25 }}
            />
            <p>
              {totalRating} Based on {reviews?.length} Reviews{' '}
            </p>
          </div>
          <div className="productDetailRatingAllBars">
            {progressBar ? (
              progressBar.map((bar, idx) => {
                return (
                  <div className="productDetailRatingBar" key={idx}>
                    <div className="flex">
                      <p className="mr-1">{bar.number}</p>
                      <StarIcon sx={{ color: '#ffbb00', fontSize: 20 }} />
                    </div>
                    <ProgressBar
                      now={bar.progres}
                      className="productDetailProgressBar"
                      variant="warning"
                    />
                    <p className="w-10">{bar.progres}%</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
          <div className="productDetailReviewsFooter">
            <h5>Share your thoughts</h5>
            <p>
              If you have used this product, share your thoughts with other
              customers.
            </p>
          </div>
        </div>
        <div className="productDetailReviewsData">
          {reviews ? (
            reviews.map((review) => {
              return (
                <ReviewPresenter
                  key={review._id}
                  review={review}
                  deleteReview={deleteReview}
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
      <Dialog
        open={showDeleteProductMessage}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDisagreeDeleteProductMessage}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ fontSize: '25px', fontWeight: 'bold' }}>
          Your account is deleted
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your Smart Vision account has now been deleted.
            <br />
            We are sad to see you leave, and hope you will come back in the
            future.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDisagreeDeleteProductMessage}
            sx={{ marginRight: 'auto' }}
          >
            DISAGREE
          </Button>
          <Button onClick={handleAgreeDeleteProductMessage}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

export default ProductDetailsPresenter;
