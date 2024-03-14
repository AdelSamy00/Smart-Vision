import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LogoutIcon from '@mui/icons-material/Logout';
import DehazeIcon from '@mui/icons-material/Dehaze';
import './StyleSheets/EmployeeHeader.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../redux/EmployeeSlice';

const ENGINEER = [
  {
    path: '/engineer/view-customized-requests',
    title: 'Cutomized Orders',
  },
  {
    path: '/engineer/view-measured-customized-requests',
    title: 'Measured',
  },
];
const FACTORY = [
  // {
  //   path: '/presenter-home',
  //   title: 'Home',
  // },
  // {
  //   path: '/presenter-view',
  //   title: 'New products',
  // },
];
const PRESENTER = [
  {
    path: '/presenter-home',
    title: 'Home',
  },
  {
    path: '/presenter-view',
    title: 'New products',
  },
];
const OPERATOR = [
  {
    path: '/operator/view-product-orders',
    title: 'Orders',
  },
  {
    path: '/operator/view-Service-orders',
    title: 'Services',
  },
];
const INVENTORY = [
  {
    path: '/inventory',
    title: 'Home',
  },
  {
    path: '/order',
    title: 'Orders',
  },
  {
    path: '/addProduct',
    title: 'Add Product',
  },
  {
    path: '/addMatrial',
    title: 'Add matria',
  },
  {
    path: '/transactions-history',
    title: 'History',
  },
  {
    path: '/inventory-Order-matrials',
    title: 'History',
  },
  {
    path: '/inventory-Order-products',
    title: 'History',
  },
  {
    path: '/Transaction',
    title: 'Transaction',
  },
];

function EmployeeHeader({ props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const jobTitle = employee?.jobTitle;
  const [navLinks, setnavLinks] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleLogout() {
    dispatch(Logout());
    navigate('/login/employee');
  }
  function setNavLinksWithEmployeeType() {
    if (jobTitle === 'Engineer') {
      setnavLinks(ENGINEER);
    } else if (jobTitle === 'Factory') {
      setnavLinks(FACTORY);
    } else if (jobTitle === 'Inventory Manager') {
      setnavLinks(INVENTORY);
    } else if (jobTitle === 'Operator') {
      setnavLinks(OPERATOR);
    } else if (jobTitle === 'Presenter') {
      setnavLinks(PRESENTER);
    }
  }

  useEffect(() => {
    setNavLinksWithEmployeeType();
  }, []);

  return (
    <>
      <header className="employeeHeaderMain">
        <div className="employeeHeaderLogo">
          <img className="w-16 h-16" src="/smartVisionLogo.png" />
          <span className="ml-3 text-2xl font-bold">Smart Vision</span>
        </div>
        <div className="employeeHeaderLinks">
          {navLinks?.map((item, idx) => {
            return (
              <NavLink key={idx} to={item.path}>
                {item.title}
              </NavLink>
            );
          })}
        </div>
        <button className="employeeHeaderLogoutIcon" onClick={handleLogout}>
          <Tooltip title="Logout">
            <LogoutIcon sx={{ fontSize: '25px' }} />
          </Tooltip>
        </button>
        <button className="employeeHeaderDehazeIcon" onClick={handleShow}>
          <DehazeIcon sx={{ fontSize: '30px' }} />
        </button>
      </header>
      <Offcanvas show={show} onHide={handleClose} {...props} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title className="text-4xl font-bold">
            Smart Vision
          </Offcanvas.Title>
          <button className="me-2" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="employeeHeaderOffcanvasLinks">
            {navLinks?.map((item, idx) => {
              return (
                <NavLink key={idx} to={item.path}>
                  {item.title}
                </NavLink>
              );
            })}
          </div>
          <button className="text-2xl font-bold" onClick={handleLogout}>
            Logout
            <LogoutIcon sx={{ fontSize: '25px', marginLeft: '.5rem' }} />
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default EmployeeHeader;
