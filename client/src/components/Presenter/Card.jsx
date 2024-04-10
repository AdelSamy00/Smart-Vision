import React from 'react'
import Rating from '@mui/material/Rating';
import '../e-commers/StyleSheets/ProductCard.css';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Card({ product, handelCart }) {

    return (
        <div className="productCard mb-12">
            <Link className='productCardLink' to={`/p/product/${product?._id}`}>
                {product?.images?.length === 1 ?
                    (<div className="sbProductCardDivImg">
                        <img className="sbProductCardImg" src={product?.images[0]} />
                    </div>)
                    :
                    (<div className="sbProductCardDivImg">
                        <div className="sbProductCardDivFirstImg">
                            <img className="sbProductCardImg" src={product?.images[0]} />
                        </div>
                        <div className="sbProductCardDivsecondtImg">
                            <img className="sbProductCardImg" src={product?.images[1]} />
                        </div>
                    </div>)
                }
                <div className="sbProductCardData">
                    <div className='w-full'>
                        <h5>{product?.name}</h5>
                        <h6>{product?.category}</h6>
                        <p>{product?.price} EL</p>
                    </div>
                    <div className="sbProductCardDataRating">
                        <Rating
                            readOnly
                            name="half-rating"
                            value={product?.totalRating}
                            precision={0.5}
                            sx={{ fontSize: 30 }}
                        />
                        <p>{product?.totalRating} ({product?.reviews?.length})</p>
                    </div>
                </div >
            </Link>
            <div className="sbProductCardFooter h-16">
                <Link
                    className='flex items-center text-xl bg-slate-700 hover:bg-slate-800 text-white py-1 px-2 rounded-xl'
                    to={`/ed/product/${product?._id}`}
                >
                    Edit
                    <EditIcon sx={{ fontSize: '20px', marginLeft: "5px" }} />
                </Link>
                <button
                    onClick={() => { }}
                >
                    <DeleteForeverIcon sx={{ fontSize: '32px' }} />
                </button>
            </div>
        </div>
    )
}

export default Card