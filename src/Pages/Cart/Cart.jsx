import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import classes from "./Cart.module.css";
import { Type } from "../../Utility/action.type";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const total = basket.reduce(
    (sum, item) => sum + item.price * (item.amount || 1),
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping Cart</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket.map((item, index) => (
              <section key={item.id || index} className={classes.cart__item}>
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                <div className={classes.quantityControls}>
                  <button onClick={() => increment(item)}>+</button>
                  <span>{item.amount || 1}</span>
                  <button onClick={() => decrement(item.id)}>-</button>
                </div>
              </section>
            ))
          )}
        </div>

        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <p>Subtotal ({basket?.length} items)</p>
            <CurrencyFormat amount={total} />
            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>
            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
