import React from 'react'
import "./StyleSheets/ProfileDetails.css"
import OffcanvasForPD from '../components/OffcanvasForPD';
import { useSelector } from 'react-redux';


function ProfileDetails() {
    const { customer } = useSelector((state) => state.customer);
    return (
        <section className='ProfileDetails'>
            <div className='sbProfileDetails'>
                <h1>Profile details</h1>
            </div>
            <div className='sbProfileDetails'>
                <div className='userInfo'>
                    <div className='userInofHeader'>
                        <h2>Personal info</h2>
                        <OffcanvasForPD placement={'end'} />
                    </div>
                    <div className='Info'>
                        <div className='InfoContant'>
                            <h4>Name</h4>
                            <p>{customer?.username}</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Gender</h4>
                            <p>{customer?.gender }</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Email</h4>
                            <p>{customer?.email}</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Phone</h4>
                            <p>{customer?.phone}</p>
                        </div>
                        <div className='InfoContant'>
                            <h4>Address</h4>
                            <p>{customer?.addres ? (customer?.addres):("No address added")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProfileDetails