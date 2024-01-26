import { Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import React from 'react'
import "./StyleSheets/ProfileDetails.css"

function ProfileDetails() {
    return (
        <section className='ProfileDetails'>
            <h1>Profile details</h1>
            <div className='flex flex-row flex-wrap justify-around'>
                <div className='userInfo'>
                    <div className='userInfHeader'>
                        <h2>Personal info</h2>
                        <Button className='rounded-3xl' variant="outlined" endIcon={<EditIcon />}>
                            Edit
                        </Button>
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
                    </div>
                </div>
                <div className='userAdresses'>
                    <h2>Addresses</h2>
                </div>
            </div>
        </section>
    )
}

export default ProfileDetails