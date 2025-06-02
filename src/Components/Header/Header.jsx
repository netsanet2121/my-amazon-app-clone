import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import LowerHeader from "./LowerHeader";
import { BiCart } from "react-icons/bi";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";
const Header = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  console.log(basket.length);
  return (
    <section className={classes.fixed}>
      <header className={classes.header__container}>
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="Amazon logo"
            />
          </Link>
          <div className={classes.delivery}>
            <SlLocationPin />
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select>
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search Amazon" />
          <button className={classes.search__icon}>
            <BsSearch size={20} />
          </button>
        </div>

        <div className={classes.order__container}>
          <Link to={"/"} className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US Flag"
            />
            <select>
              <option value="en">EN</option>
            </select>
          </Link>

          <Link to="/auth">
            <div>
              {user ? (
                <>
                  <p> Hello {user?.email?.split("@")[0]}</p>
                  <span onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            {basket.length > 0 && (
              <span className={classes.cart__count}>{totalItem}</span>
            )}
          </Link>
        </div>
      </header>

      <LowerHeader />
    </section>
  );
};

export default Header;
