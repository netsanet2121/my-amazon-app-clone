import { useContext, useState } from "react";
import classes from "./Auth.module.css";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);
  console.log(user);

  const authHandler = async (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading({ ...loading, signIn: true });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setError("");
      console.log("Signed in as:", userCredential.user.email);

      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });
      setLoading({ ...loading, signIn: false });
      navigate("/"); // or to your dashboard or home page
    } catch (error) {
      setError("Failed to sign in: " + error.message);
      console.error("Sign-in error:", error);
    }
  };

  const signUpHandler = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading({ ...loading, signUp: true });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user.email);
      setError("User created successfully! You can now sign in.");
      setLoading({ ...loading, signUp: false });
      dispatch({
        type: Type.SET_USER,
        user: userCredential.user,
      });
    } catch (error) {
      setError("Sign-up failed: " + error.message);
    }
  };

  return (
    <section className={classes.auth}>
      <div className={classes.logo}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png?20250504041148"
          alt="Amazon Logo"
        />
      </div>

      <div className={classes.form}>
        <p className={classes.signInTitle}>Sign In</p>
        <form onSubmit={authHandler}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              type="password"
              id="password"
              required
            />
          </div>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

          <button
            type="submit"
            name="signin"
            className={classes.signInBtn}
            disabled={loading.signIn}
          >
            {loading.signIn ? <ClipLoader color="#fff" size={15} /> : "Sign In"}
          </button>
        </form>
        <h3 className={classes.termsText}>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice and our Interest-Based Ads Notice.
        </h3>

        <button
          type="button"
          onClick={signUpHandler}
          className={classes.createAccountBtn}
          disabled={loading.signUp}
        >
          {loading.signUp ? (
            <ClipLoader color="#fff" size={20} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
      </div>
    </section>
  );
}

export default Auth;
