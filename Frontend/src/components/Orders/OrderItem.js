import { useContext,useState,useEffect } from 'react';

import classes from './MealItem.module.css';


const OrderItem = (props) => {
 
  const [product, setProduct] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      const pId= Number(props.productId);
      const response = await fetch('http://localhost:8080/api/products/' + pId,{
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
       console.log(responseData);
      setProduct(responseData);
      
    };

    fetchProduct();
  }, []);

 

  const clickHandler = () => {


    const changeStatus = async () => {
      const response = await fetch('http://localhost:8080/api/orders/status',{
        method: "POST",
        body: JSON.stringify({
          id: props.id,
          status: 'Cancelled',
         
        }),
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      
      console.log(responseData);
      
    };

    changeStatus();
    props.change();
  };
  const getImageSrc = (byteArray) => {
    var img = null;
    if (byteArray != null) img = new Buffer.from(byteArray).toString("base64");
    const file = "data:image/jpeg;base64," + img;
    return file;
  };
  let showCancelButton= false;
  if(props.status==='placed'){
    showCancelButton= true;
  }
  
  return (
    <li className={classes.meal}>
      <div>
        <div className={classes.price}>Order Id- {props.id}</div>
        <div className={classes.price}>{product.name}</div><br />
        <img  className={classes.image} width="300" height="300" src={getImageSrc(product.pic)} /><br />
        <div className={classes.description}>Amount x {props.quantity}</div>
        <div className={classes.description}>Status - {props.status}</div>
        <div className={classes.description}>Price - $ {product.price * props.quantity}</div><br />
        {showCancelButton && <button align="right" className={classes.button} onClick={clickHandler}>Cancel Item</button>}
      </div>
    </li>
  );
};

export default OrderItem;
