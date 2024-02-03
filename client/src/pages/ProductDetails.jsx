import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { SetCustomer } from '../redux/CustomerSlice';
import { useNavigate } from 'react-router-dom';
function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { customer } = useSelector((state) => state.customer);
  const [product, setProduct] = useState(null);
  const [favorite, setFavorite] = useState(false);
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
    async function getProduct(id) {
      await axios.get(`/products/${id}`).then((res) => {
        console.log(res?.data?.product);
        setProduct(res?.data?.product);
        const product = res?.data?.product;
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
    getProduct(id);
  }, []);
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 pb-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://dummyimage.com/400x400"
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              PRODUCT NAME
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product?.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Rating
                  readOnly
                  name="half-rating"
                  defaultValue={2.5}
                  precision={0.5}
                  sx={{ fontSize: 30 }}
                />
                <span className="text-gray-600 ml-3">2.5 Reviews</span>
              </span>
            </div>
            <p className="leading-relaxed">{product?.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color: </span>
                {product?.colors.map((color, idx) => (
                  <span key={idx} className="mr-3">
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                {product?.price} EL
              </span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Add To Cart
              </button>
              <button
                className="rounded-full w-10 h-10 p-0 border-0 inline-flex items-center justify-center ml-4"
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
      </div>
    </section>
  );
}

export default ProductDetails;
