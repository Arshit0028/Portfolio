import React from "react";
import "./Footer.css";
import Logo from "../../assets/Logo.svg";
import user_icon from "../../assets/user_icon.svg";

const Footer = () => {
return (
    <div className="footer">
        <div className="footer-top">
            <div className="footer-top-left">
                <img src={Logo} alt="Logo" height={100} />
                <p>
                    Hey everyone! 👋 I’m a passionate full-stack developer with a love
                    for creating interactive web applications.
                </p>
            </div>
            <div className="footer-top-right">
                <div className="footer-email-input">
                    <img src={user_icon} alt="" />
                    <input type="email" placeholder="Enter your email" />
                </div>
                <div className="footer-subscribe">Subscribe</div>
                <hr />
            </div>
        </div>
        <div className="footer-bottom">
            <p className="footer-bottom-left">2025 © All rights reserved</p>
            <div className="footer-bottom-right">
                <p>Term of Services</p>
                <p>Privacy Policy</p>
                <p>Connect With Me</p>
            </div>
        </div>
    </div>
);
};

export default Footer;
