import React from 'react'
import "./StyleSheets/ProfileDetails.css"
import OffcanvasForPD from '../components/OffcanvasForPD';


function ProfileDetails() {
    return (
        <section className='ProfileDetails'>
            <div className='sbProfileDetails'>
                <h1>Profile details</h1>
            </div>
            <div className='sbProfileDetails'>
                <div className='userInfo'>
                    <div className='userInofHeader'>
                        <h2>Personal info</h2>
                        <OffcanvasForPD placement={'end'} name={'Edit'} />
                    </div>
                    <div className='Info'>
                        <div className='InfoContant'>
                            <h4>Name</h4>
                            <p>User Name</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Gender</h4>
                            <p>user gender</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Email</h4>
                            <p>UserEmail@gmail.com</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Phone</h4>
                            <p>01212121212</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Address</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileDetails