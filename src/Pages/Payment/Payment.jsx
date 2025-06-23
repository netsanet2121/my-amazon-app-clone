import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { Type } from "../../Utility/action.type"; // ✅ Import Type
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Utility/firebase";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext); // ✅ Include dispatch

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
  const total = basket.reduce(
    (sum, item) => sum + item.price * (item.amount || 1),
    0
  );

  const [cardError, setCardError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    setCardError(e?.error?.message || "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setCardError(null);

    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.email || "Guest",
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setPaymentSuccess(true);
        const paymentIntent = result.paymentIntent;

        console.log("✅ Payment succeeded:", paymentIntent);

        if (!user?.uid) {
          console.warn("User not logged in, skipping Firestore save");
          setLoading(false);
          return;
        }

        console.log("🔥 Saving to Firestore for user:", user.uid);

        await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
          basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        // ✅ Clear basket after saving order
        dispatch({
          type: Type.CLEAR_BASKET,
        });
      }
    } catch (error) {
      console.error("❌ Payment failed:", error);
      setCardError("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment} autoComplete="off">
                {cardError && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    ⚠ {cardError}
                  </div>
                )}
                {paymentSuccess && (
                  <div style={{ color: "green", marginBottom: "10px" }}>
                    ✅ Payment successful! Thank you for your order.
                  </div>
                )}

                <CardElement onChange={handleChange} />

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={!stripe || loading || paymentSuccess}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
