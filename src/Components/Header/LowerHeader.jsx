import React, { useState } from "react";
import classes from "./LowerHeader.module.css";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

function LowerHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top nav bar */}
      <nav className={classes.lowerHeader}>
        <ul className={classes.navList}>
          <li className={classes.menu} onClick={toggleSidebar}>
            <HiOutlineMenu size={20} />
            <span>All</span>
          </li>
          <li>
            <a href="#">Today's Deals</a>
          </li>
          <li>
            <a href="#">Customer Service</a>
          </li>
          <li>
            <a href="#">Registry</a>
          </li>
          <li>
            <a href="#">Gift Cards</a>
          </li>
          <li>
            <a href="#">Sell</a>
          </li>
        </ul>
      </nav>

      {/* Sidebar overlay */}
      {isOpen && <div className={classes.overlay} onClick={toggleSidebar} />}

      {/* Sidebar menu */}
      <div className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
        <div className={classes.sidebarHeader}>
          <AiOutlineClose size={25} onClick={toggleSidebar} />
          <h3>Hello, Sign in</h3>
        </div>
        <ul className={classes.sidebarLinks}>
          <li>
            <a href="#">Amazon Home</a>
          </li>
          <li>
            <a href="#">Electronics</a>
          </li>
          <li>
            <a href="#">Books</a>
          </li>
          <li>
            <a href="#">Fashion</a>
          </li>
          <li>
            <a href="#">Toys</a>
          </li>
          <li>
            <a href="#">Groceries</a>
          </li>
          <li>
            <a href="#">Prime Video</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LowerHeader;
