import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import './StyleSheets/Footer.css';
import { useTranslation } from "react-i18next";
import { Icon } from '@iconify/react';
function Footer() {
  const { t ,i18n} = useTranslation();
  const isRTL = i18n.language === 'ar';
  const socialMediaLinkStyle = isRTL ? { marginLeft: "10px" } : { marginRight: "10px" };
  return (
    <footer className="footer">
      <div className=" p-4 flex flex-col">
        <div className="FooterLinks">
          <div className="sbFooterLinks">
            <Image src="/smartVisionLogo.png" rounded />
          </div>
          <div className="sbFooterLinks">
            <h4>{t("Resources")}</h4>
            <Link to={'/home'}>{t("Home")}</Link>
            <Link to={'/favourites'}>{t("favorites")}</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>{t("Resources")}</h4>
            <Link to={'/about'}>{t("About Us")}</Link>
            <Link to={'/store'}>{t("Products")}</Link>
            <Link to={'/profile'}>{t("Profile")}</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>{t("Resources")}</h4>
            <Link to={'/contact-us'}>{t("Contact Us")}</Link>
            <Link to={'/services'}>{t("Services")}</Link>
          </div>
          <div className="sbFooterLinks">
            <h4>{t("Social Media")}</h4>
            <div className='SocialMedia'>
              <Link to={'https://www.facebook.com/smartvision77'} target='_blank'>
                <Icon icon="logos:facebook" width="30" height="30" style={socialMediaLinkStyle}/>
              </Link>
              <Link to={''}>
                <Icon icon="skill-icons:instagram" sx={{ fontSize: 40 }} width="30" height="30" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-4 rounded-full border-sky-500 w-full">
        </div>
        <div className="flex flex-row justify-between mt-1">
          <div className="ml-4 font-semibold text-white ">
            <p>{t("All right reserved.")}</p>
          </div>
          <div className="footerBelowLinks mr-1">
            <Link to={'./login'}>{t("Login")}</Link>
            {/* <Link to={'#'}>Login</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
