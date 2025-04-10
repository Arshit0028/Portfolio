import React, { useRef, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";
import nav_underline from "../../assets/nav_underline.svg";
import menu_open from "../../assets/menu_open.svg"
import menu_close from "../../assets/menu_close.svg"

import AnchorLink from "react-anchor-link-smooth-scroll";

 const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const menuRef = useRef(null);

  const openMenu = () => {
    if (menuRef.current && menuRef.current instanceof HTMLElement) {
      menuRef.current.style.right = "0px";
    }
  };

  const closeMenu = () => {
    if (menuRef.current && menuRef.current instanceof HTMLElement) {
      menuRef.current.style.right = "-350px";
    }
  };

  return (
    <div className="navbar">
      <a href="/">
        <img src={logo} alt="Logo" width={50} />
      </a>
      <img src={menu_open} alt="Open Menu" className="nav-mob-open" onClick={openMenu} />
      <ul ref={menuRef} className="nav-menu">
        <img src={menu_close} alt="Close Menu" className="nav-mob-close" onClick={closeMenu} />
        <li>
          <AnchorLink className="anchor-link"   href="#home">
            <p onClick={() => setMenu("home")}>Home</p>
          </AnchorLink>
          {menu === "home" ? <img src={nav_underline} alt="Underline" /> : null}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#about">
            <p onClick={() => setMenu("about")}>About Me</p>
          </AnchorLink>
          {menu === "about" ? <img src={nav_underline} alt="Underline" /> : null}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#services">
            <p onClick={() => setMenu("services")}>Services</p>
          </AnchorLink>
          {menu === "services" ? <img src={nav_underline} alt="Underline" /> : null}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#portfolio">
            <p onClick={() => setMenu("portfolio")}>Portfolio</p>
          </AnchorLink>
          {menu === "portfolio" ? <img src={nav_underline} alt="Underline" /> : null}
        </li>
        <li>
          <AnchorLink className="anchor-link" offset={50} href="#contact">
            <p onClick={() => setMenu("contact")}>Contact</p>
          </AnchorLink>
          {menu === "contact" ? <img src={nav_underline} alt="Underline" /> : null}
        </li>
      </ul>
      <div className="nav-connect">Connect with me</div>
    </div>
  );
};

export default Navbar;
