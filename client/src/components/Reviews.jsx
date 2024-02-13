import React from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import './stylesheets/Reviews.css'
function Reviews() {
    function stringAvatar(name) {
        return {
            children: `${name.split(' ')[0][0]}`,
        };
    }
    return (
        <>
            <div className="productDetailUserReview">
                <div className="flex items-center ">
                    <div className="mr-3">
                        <Avatar {...stringAvatar('youssef')} />
                    </div>
                    <div className="">
                        <h6>youssefgamess</h6>
                        <Rating
                            readOnly
                            name="half-rating"
                            defaultValue={2.5}
                            precision={0.5}
                            sx={{ fontSize: 20 }}
                        />
                    </div>
                </div>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quasi aliquam culpa animi similique architecto incidunt dolorem
                    in eveniet repellendus voluptates officiis maiores assumenda consectetur,
                    perferendis delectus alias modi laudantium quia!
                </p>
            </div>
        </>
    )
}

export default Reviews