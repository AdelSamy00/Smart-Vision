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
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { clearNotification } from '../../redux/NotificationSlice';

const ENGINEER = [
  {
    path: '/engineer/view-customized-requests',
    title: 'Cutomized Orders',
  },
  {
    path: '/engineer/view-measured-customized-requests',
    title: 'Measuring',
  },
];
const FACTORY = [
  {
    path: '/f/factor-View',
    title: 'Home',
  },
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
    path: '/addProduct',
    title: 'Add Product',
  },
  {
    path: '/addMatrial',
    title: 'Add matrial',
  },
  {
    path: '/transactions-history',
    title: 'History',
  },
  {
    path: '/inventory-Order-matrials',
    title: 'Matrials History',
  },
  {
    path: '/inventory-Order-products',
    title: 'Products History',
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
  const { notification } = useSelector((state) => state.notification);
  const [open, setOpen] = useState(false);
  const jobTitle = employee?.jobTitle;
  const [navLinks, setnavLinks] = useState(null);
  const [numberOfNotifications, setnumberOfNotifications] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleLogout() {
    dispatch(Logout());
    navigate('/login/employee');
  }
  function setNavLinksWithEmployeeType() {
    if (jobTitle === 'engineer') {
      setnavLinks(ENGINEER);
    } else if (jobTitle === 'factory') {
      setnavLinks(FACTORY);
    } else if (jobTitle === 'Inventory Manager') {
      setnavLinks(INVENTORY);
    } else if (jobTitle === 'operator') {
      setnavLinks(OPERATOR);
    } else if (jobTitle === 'presenter') {
      setnavLinks(PRESENTER);
    }
  }
  useEffect(() => {
    setNavLinksWithEmployeeType();
  }, []);
  //made by adel
  function getNumberOfNotifications(notification) {
    return notification?.length;
  }
  useEffect(() => {
    let number = getNumberOfNotifications(notification);
    setnumberOfNotifications(number);
  }, [notification]);
  const displayNotifications = (notification, idx) => {
    let msg;
    //console.log(notification);
    switch (notification?.type) {
      case 'addOrder':
        msg = `${notification.user.firstName} ${notification.user.lastName} place new order`;
        break;
      case 'addService':
        msg = `${notification.serviceOrder.customer.username} place new Service order`;
        break;
      case 'assignEngineerToCustomizationOrder':
        msg = `${notification.user.username} assign you to new customization order`;
        break;
      case 'getMaterial':
        msg = `${notification.user.username} add new Material order`;
        break;
      case 'newOrderToFactory':
        msg = `${notification.user.username} add new product to manfacturing`;
        break;
      default:
        msg = 'wrong';
        break;
    }
    return (
      <span className="notification" key={idx}>
        {`${msg}`}
      </span>
    );
  };
  const handleRead = () => {
    dispatch(clearNotification());
    setnumberOfNotifications(0);
    setOpen(!open);
  };
  return (
    <>
      <header className="employeeHeaderMain">
        <div className="employeeHeaderLogo">
          <img src="/smartVisionLogo.png" />
          <span>Smart Vision</span>
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
        <button
          className="ml-auto mr-4"
          onClick={() => {
            if (notification?.length >= 1) {
              setOpen(!open);
            }
          }}
        >
          <Badge badgeContent={numberOfNotifications} color="primary">
            <NotificationsIcon color="action" />
          </Badge>
        </button>
        <button className="employeeHeaderLogoutIcon" onClick={handleLogout}>
          <Tooltip title="Logout">
            <LogoutIcon sx={{ fontSize: '25px' }} />
          </Tooltip>
        </button>
        <button className="employeeHeaderDehazeIcon ml-0" onClick={handleShow}>
          <DehazeIcon sx={{ fontSize: '30px' }} />
        </button>
        {open && (
          <div className="notifications border-2 ">
            {notification.map((n, idx) => displayNotifications(n, idx))}
            <button className="readBtn" onClick={() => handleRead()}>
              Mark as read
            </button>
          </div>
        )}
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
