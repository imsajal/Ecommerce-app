import { useContext,useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
 
 
  async function checkoutHandler() {
   
    for (var i = 0; i < cartCtx.items.length; i++) {
     await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        body: JSON.stringify({
          username: authCtx.user.username,
          productId: cartCtx.items[i].id,
          quantity: cartCtx.items[i].amount,
          status: "placed",
        }),
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    

      
    }
   
    props.onClose();
    cartCtx.clear();
    
  }

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    

    <Modal onClose={props.onCancel}>
      
      {cartItems}
      <div className={classes.total}>
        <span>Total Price</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCancel}>
          Close
        </button>
        {hasItems && (
          <button onClick={checkoutHandler} className={classes.button}>
             Order Now
          </button>
        )}
      </div>
    </Modal>
    
  );
};

export default Cart;
