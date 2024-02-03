import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating';
import './stylesheets/ProductCard.css'
import { Link } from 'react-router-dom';
const getinitItems = () => {
    const data = JSON.parse(localStorage.getItem("cart"));
    if (!data) return [];
    return data;
};

function ProductCard({ product }) {
    const [favorite, setFavorite] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [cart, setCart] = useState(getinitItems);
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handelFavorit = (favorite) => {
        if (favorite) {
            setTimeout(() => {
                setFavorite(false)
            }, 1000);
        }
        else {
            setTimeout(() => {
                setFavorite(true)
            }, 1000);
        }
    }
    const handelsetInCart = (inCart, id ,name ,price ,images) => {
        if (inCart) {
            setCart((prevCart) => {
                return prevCart.filter((t) => t._id !== id);
            });
            setTimeout(() => {
                setInCart(false)
            }, 1000);
        }
        else {
            setCart((prevCart) => {
                return [...prevCart, { _id: id ,name ,price ,images}];
            });
            setTimeout(() => {
                setInCart(true)
            }, 1000);
        }
    }


    return (
        <div className="productCard" key={product._id} style={{marginBottom:"3rem"}}>
            <Link className='productCardLink' to={'/'}>
                {product.images.length === 1 ?
                    (<div className="sbProductCardDivImg">
                        <img className="sbProductCardImg" src={product.images[0]} />
                    </div>)
                    :
                    (<div className="sbProductCardDivImg">
                        <div className="sbProductCardDivFirstImg">
                            <img className="sbProductCardImg" src={product.images[0]} />
                        </div>
                        <div className="sbProductCardDivsecondtImg">
                            <img className="sbProductCardImg" src={product.images[1]} />
                        </div>
                    </div>)
                }
                <div className="sbProductCardData">
                    <h5>{product.name}</h5>
                    <h6>{product.category}</h6>
                    <p>{product.price} EL</p>
                    <div className="sbProductCardDataRating">
                        <Rating readOnly name="half-rating" defaultValue={2.5} precision={0.5} sx={{ fontSize: 30 }} />
                        <p>2.5</p>
                    </div>
                </div >
            </Link>
            <div className="sbProductCardFooter ">
                <button onClick={() => handelsetInCart(inCart, product._id ,product.name ,product.price ,product.images)} className='addToCartButton'>
                    {!inCart ?
                        <svg className='sbProductCardFooterIcon' viewBox="0 0 24 24">
                            <path d="M18,12a5.993,5.993,0,0,1-5.191-9H4.242L4.2,2.648A3,3,0,0,0,1.222,0H1A1,1,0,
                            0,0,1,2h.222a1,1,0,0,1,.993.883l1.376,11.7A5,5,0,0,0,8.557,19H19a1,1,0,0,0,0-2H8.557a3,
                            3,0,0,1-2.821-2H17.657a5,5,0,0,0,4.921-4.113l.238-1.319A5.984,5.984,0,0,1,18,12Z" />
                            <circle cx="7" cy="22" r="2" />
                            <circle cx="17" cy="22" r="2" />
                            <path d="M15,7h2V9a1,1,0,0,0,2,0V7h2a1,1,0,0,0,0-2H19V3a1,1,0,0,0-2,0V5H15a1,1,0,0,0,0,2Z" />
                        </svg>
                        :
                        <svg className='sbProductCardFooterIcon' viewBox="0 0 24 24">
                            <path d="M7.8,21.425A2.542,2.542,0,0,1,6,20.679L.439,15.121,2.561,13,7.8,
                        18.239,21.439,4.6l2.122,2.121L9.6,20.679A2.542,2.542,0,0,1,7.8,21.425Z" />
                        </svg>
                    }
                </button>
                <button onClick={() => handelFavorit(favorite)} >
                    {!favorite ?<svg className='sbProductCardFooterIcon' viewBox="0 0 24 24">
                            <path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,
                            7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,
                            24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,
                            1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,
                            12.448,15.253,18.416,12,20.846Z" />
                        </svg>
                        :
                        <svg className='sbProductCardFooterIcon' viewBox="0 0 24 24" >
                            <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,
                                0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,
                                13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z" />
                        </svg>
                    }
                </button>
            </div>
        </div>

    )
}

export default ProductCard