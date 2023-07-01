import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import Modal from "../UI/Modal";
import { useHistory } from "react-router-dom";
const AuthForm = () => {
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();
  const houseInputRef = useRef();
  const streetInputRef = useRef();
  const cityInputRef = useRef();
  const stateInputRef = useRef();
  const pincodeInputRef = useRef();
  const phoneInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCustomMessage, setCustomMessage] = useState(false);
  const [registered, setRegistered] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
    setRegistered(false);
    setCustomMessage(false);
  };

  const registrationHandler = () => {
    setShowModal(true);
    setIsLogin((prevState) => !prevState);
    setCustomMessage(true);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            authCtx.login(data);
            const role = data.role;
            if (role === "customer") {
              history.replace("/customer");
            } else {
              history.replace("/admin");
            }
          });
        } else {
          setShowModal(true);
        }
      });
    } else {
      const enteredFirstName = firstNameInputRef.current.value;
      const enteredLastName = lastNameInputRef.current.value;
      const enteredHouse = houseInputRef.current.value;
      const enteredStreet = streetInputRef.current.value;
      const enteredCity = cityInputRef.current.value;
      const enteredState = stateInputRef.current.value;
      const enteredPincode = pincodeInputRef.current.value;
      const enteredPhone = phoneInputRef.current.value;
      fetch("http://localhost:8080/api/users", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          username: enteredUsername,
          password: enteredPassword,
          firstName: enteredFirstName,
          lastName: enteredLastName,
          houseNo: enteredHouse,
          street: enteredStreet,
          city: enteredCity,
          state: enteredState,
          pincode: enteredPincode,
          phone: enteredPhone,
          role: "customer",
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          setShowModal(true);
          setRegistered(true);
        } else {
          setShowModal(true);
        }
      });
    }
  };

  return (
    <div className={classes.back}>
      
      <section className={classes.auth}>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          {isLogin && showCustomMessage && <h3 className={classes.h3}>Successfully Registered</h3>}
          {isLogin && !showCustomMessage && <h3 className={classes.h3}>Username and password incorrect</h3>}
          {!isLogin && !registered && <h3  className={classes.h3}>Username already exists</h3>}
          {!isLogin && registered && <h3  className={classes.h3}>Successfully registered</h3> && registrationHandler() }
          <button onClick={hideModalHandler} className={classes.button}>
            OK
          </button>
        </Modal>
      )}
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <h3>* indicates madatory fields</h3>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label className={classes.required} htmlFor="email">
              Username{" "}
            </label>
            <input type="text" id="email" required ref={usernameInputRef} />
          </div>

          <div className={classes.control}>
            <label className={classes.required} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="firstname">First Name</label>
              <input type="text" id="firstname" ref={firstNameInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id="lastname" ref={lastNameInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="house">
                House Number
              </label>
              <input type="text" id="house" required ref={houseInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="street">
                Street
              </label>
              <input type="text" id="street" required ref={streetInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="city">
                City
              </label>
              <input type="text" id="city" required ref={cityInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="state">
                State
              </label>
              <input type="text" id="state" required ref={stateInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="pincode">
                Pincode
              </label>
              <input type="text" id="pincode" required ref={pincodeInputRef} />
            </div>
          )}
          {!isLogin && (
            <div className={classes.control}>
              <label className={classes.required} htmlFor="phone">
                Phone
              </label>
              <input type="text" id="phone" required ref={phoneInputRef} />
            </div>
          )}
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
