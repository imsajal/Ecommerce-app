import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };
  const getImageSrc = (byteArray) => {
    var img = null;
    if (byteArray != null) img = new Buffer.from(byteArray).toString("base64");
    const file = "data:image/jpeg;base64," + img;
    return file;
  };
  
  return (
    <li className={classes.meal}>
      <div>
        <h3 align="center" >{props.name}</h3><br />
        <img className={classes.img} width="300" height="300" src={getImageSrc(props.pic)} />
        
        <div className={classes.price}>{price}</div>
        
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
