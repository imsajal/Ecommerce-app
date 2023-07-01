import { Fragment, useContext } from "react";
import AuthContext from "../../store/auth-context";
import HeaderCartButton from "./HeaderCartButton";
import shopping from "../../assets/discount.jpg";
import image from "../../assets/os.jpg";
import classes from "./Header.module.css";
import { Route, useHistory} from "react-router-dom";
import Orders from "../Orders/Orders";
const Header = (props) => {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
  };
  
  const history = useHistory();

  const homeHandler = () => {
    if(authCtx.user.role=='customer'){
    history.push("/customer");}
    else{
      history.push("/admin");
    }
 };

 const addProductHandler = () => {
  history.push("/admin/addproduct");
};
  const myOrders = () => {
    
     history.push("/customer/orders");
  };
  return (
    <Fragment>
      <header className={classes.header}>
        <h1 onClick={homeHandler}>oKart</h1>
         <button
          align="right"
          onClick={homeHandler}
          className={classes.button}
        >
         Home
        </button>
        {authCtx.user.role=='customer' && <button align="right" onClick={myOrders} className={classes.button}>
          Orders
        </button>}
        {authCtx.user.role=='admin' && <button className={classes.button} onClick={addProductHandler}>Add Product</button>}
        {authCtx.user.role=='customer' && <HeaderCartButton onClick={props.onShowCart} />}
        <button
          align="right"
          onClick={logoutHandler}
          className={classes.button}
        >
          Logout
        </button>
      </header>
     {authCtx.user.role=='customer' && <div className={classes["main-image"]}>
        <img src={shopping} alt="A table full of delicious food!" />
      </div>}
      {authCtx.user.role=='admin' && <div className={classes["main-image"]}>
        <img src={image} alt="A table full of delicious food!" />
      </div>}
      
    </Fragment>
  );
};

export default Header;
