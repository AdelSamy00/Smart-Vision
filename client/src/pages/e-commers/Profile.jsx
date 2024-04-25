import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './StyleSheets/Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/CustomerSlice';
function Profile({ socket, setSocket }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customer } = useSelector((state) => state.customer);

  return (
    <>
      {console.log(socket?.id)}
      <section className="Profile">
        <div className="sbProfileHeader">
          <h1>He! {customer.username}</h1>
          <p>
            Need to change account?
            <button
              onClick={() => {
                if (socket) {
                  console.log(socket);
                  socket.emit('close', { socketId: socket.id });
                  setSocket(null);
                }
                dispatch(Logout());
                navigate('/');
              }}
              className="font-bold"
            >
              Log out
            </button>
          </p>
        </div>
        <div className="sbProfile">
          <div className="sbProfileDiv">
            <div className="sbProfileDivLeft">
              <img src="https://dummyimage.com/720x500" alt="" />
              <h2>Welcome to your profile</h2>
              <p>Here is where you can update your info.</p>
            </div>
          </div>
          <div className="sbProfileDiv">
            <div className="sbProfileDivRight">
              <h3>Your profile</h3>
              <ul>
                <li>
                  <Link to={'/profile/details'} className="profileLinks">
                    <div className="sbProfileLink">
                      <svg className="sbProfileLinkIcon" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                      <div className="sbProfileLinkContant">
                        <h4>Profile details</h4>
                        <p>View and edit your profile details</p>
                      </div>
                    </div>
                    <svg className="sbProfileLinkIcon" viewBox="0 0 24 24">
                      <path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    className="profileLinks"
                    to={'/profile/change-password'}
                  >
                    <div className="sbProfileLink">
                      <svg viewBox="0 0 24 24" className="sbProfileLinkIcon">
                        <path d="M19,8V7A7,7,0,0,0,5,7V8H2V21a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V8ZM7,7A5,5,0,0,1,17,7V8H7ZM20,21a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V10H20Z" />
                        <rect x="11" y="14" width="2" height="4" />
                      </svg>
                      <div className="sbProfileLinkContant">
                        <h4>Change password</h4>
                        <p>Requires current password</p>
                      </div>
                    </div>
                    <svg className="sbProfileLinkIcon" viewBox="0 0 24 24">
                      <path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link className="profileLinks" to={'/profile/delete-account'}>
                    <div className="sbProfileLink">
                      <svg viewBox="0 0 24 24" className="sbProfileLinkIcon">
                        <path d="M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z" />
                        <rect x="9" y="10" width="2" height="8" />
                        <rect x="13" y="10" width="2" height="8" />
                      </svg>
                      <div className="sbProfileLinkContant">
                        <h4>Delete account</h4>
                        <p>Leave whenever you want</p>
                      </div>
                    </div>
                    <svg className="sbProfileLinkIcon" viewBox="0 0 24 24">
                      <path d="M6.079,22.5a1.5,1.5,0,0,1,.44-1.06l7.672-7.672a2.5,2.5,0,0,0,0-3.536L6.529,2.565A1.5,1.5,0,0,1,8.65.444l7.662,7.661a5.506,5.506,0,0,1,0,7.779L8.64,23.556A1.5,1.5,0,0,1,6.079,22.5Z" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
