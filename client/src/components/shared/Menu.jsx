import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import './StyleSheets/Header.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Menu = () => {
  const { customer } = useSelector((state) => state.customer);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        className="btnHover"
        style={{
          borderRadius: '50%',
          outline: 'none',
        }}
      >
        <MenuIcon
          style={{
            fontSize: '28px',
          }}
        ></MenuIcon>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="left-modal-title"
        aria-describedby="left-modal-description"
        closeAfterTransition
      >
        <Slide
          direction="right"
          in={open}
          mountOnEnter
          unmountOnExit
          className="slideBar max-w-72"
        >
          <div
            style={{
              position: 'fixed',
              top: '0',
              left: '0',
              height: '100%',
              width: '500px', // Adjusted width based on your design
              backgroundColor: 'white',
              padding: '20px',
              zIndex: '1000',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                marginBottom: '10px',
                marginLeft: '8px', // Adjusted margin for the close button
                position: 'relative',
              }}
            >
              <IconButton onClick={handleClose}>
                <CloseIcon style={{ fontSize: '32px', position: 'fixed' }} />
              </IconButton>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: '1.5rem', // Adjusted margin for the content
                }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <img
                    src="../smartVisionLogo.png"
                    alt="Logo"
                    style={{
                      width: '100px',
                      height: '60px',
                      border: 'none',
                    }}
                  />
                </div>
                <ul
                  className='MenuUL'
                  style={{
                    fontSize: '30px', // Adjusted font size
                    marginTop: '.5rem', // Adjusted margin for the list
                    fontWeight:'600'
                  }}
                >
                  <li>
                    <NavLink to="/home" onClick={handleClose}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/store" onClick={handleClose}>
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/services" onClick={handleClose}>
                      Services
                    </NavLink>
                  </li>
                  {customer?._id ? (
                    <>
                      <li>
                        <NavLink to="/Profile" onClick={handleClose}>
                          Profile
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/favourites" onClick={handleClose}>
                          Favorites
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/history" onClick={handleClose}>
                          History
                        </NavLink>
                      </li>
                    </>
                  ) : null}

                  <li>
                    <NavLink to="/bag" onClick={handleClose}>
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" onClick={handleClose}>
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact-us">Contact Us</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Menu;
