import { useState, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./store/auth-context";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import AuthForm from "./components/login/AuthForm";
import Orders from "./components/Orders/Orders";
import AddProduct from "./components/AddProduct/AddProduct";
import AllOrders from "./components/Allorders/AllOrders";
import Modal from "./components/UI/Modal";
import classes from "./components/login/AuthForm.module.css"
function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const authCtx = useContext(AuthContext);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };
  const cancelButtonHandler = () => {
    setCartIsShown(false);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
    setShowModal(true);
  };


  return (
    <div>
      {showModal && (
        <Modal onClose={hideModalHandler}>
          <h3 >Congrats! Order placed.</h3>
          <h3>Delhivery Address- {authCtx.user.houseNo},{authCtx.user.street},{authCtx.user.city},{authCtx.user.state},{authCtx.user.pincode},<br />Contact-{authCtx.user.phone}</h3>
          <button className={classes.buttonapp} onClick={hideModalHandler} >
           OK
          </button>
        
        </Modal>
      )}
      <Switch>
        <Route path="/" exact>
          <AuthForm />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path="/admin" exact>
            <Header />
            <AllOrders />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/admin/addproduct">
            <Header />
            <AddProduct />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/customer" exact>
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} onCancel={cancelButtonHandler}  />}
              <Header onShowCart={showCartHandler} />
              <main>
                <Meals />
              </main>
            </CartProvider>
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/customer/orders">
            <CartProvider>
              {cartIsShown && <Cart onClose={hideCartHandler} onCancel={cancelButtonHandler} />}
              <Header onShowCart={showCartHandler} />
           
            <Orders />
            </CartProvider>
          </Route>
        )}
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
