import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import './StyleSheets/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className=" p-4 flex flex-col">
        <div className="FooterLinks">
          <div className="sbFooterLinks">
            <Image src="/smartVisionLogo.png" rounded />
          </div>
          <div className="sbFooterLinks">
            <h4>Resources</h4>
            <Link to={'#'}>Login</Link>
            <Link to={'#'}>Login</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>Resources</h4>
            <Link to={'#'}>Login</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>Resources</h4>
            <Link to={'#'}>Login</Link>
            <Link to={'#'}>Login</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>Social Media</h4>
            <div>
              <Link to={''}>
                <FacebookIcon sx={{ fontSize: 40 }} />
              </Link>
              <Link to={''}>
                <InstagramIcon sx={{ fontSize: 40 }} />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-4 rounded-full border-sky-500 w-full">
        </div>
        <div className="flex flex-row justify-between mt-1">
          <div className="ml-4 font-semibold text-white ">
            <p>All right reserved.</p>
          </div>
          <div className="footerBelowLinks mr-1">
            <Link to={'#'}>Login</Link>
            <Link to={'#'}>Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
