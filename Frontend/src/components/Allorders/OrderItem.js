import { useContext, useState, useEffect } from "react";
import LazyLoad from "react-lazyload";
import classes from "./MealItem.module.css";
import AuthContext from "../../store/auth-context";

const OrderItem = (props) => {
  const [product, setProduct] = useState([]);
  const [customer, setCustomer] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const pId = Number(props.productId);
      const response = await fetch(
        "http://localhost:8080/api/products/" + pId,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setProduct(responseData);
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      const response = await fetch(
        "http://localhost:8080/api/users/getbyusername",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            username: props.username,
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setCustomer(responseData);
    };

    fetchCustomer();
  }, []);

  const clickHandlerShip = () => {
    const changeStatus = async () => {
      const response = await fetch("http://localhost:8080/api/orders/status", {
        method: "POST",
        body: JSON.stringify({
          id: props.id,
          status: "Shipped",
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
    props.change(true);
  };

  const clickHandlerReject = () => {
    const changeStatus = async () => {
      const response = await fetch("http://localhost:8080/api/orders/status", {
        method: "POST",
        body: JSON.stringify({
          id: props.id,
          status: "Rejected",
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
    props.change(true);
  };

  const getImageSrc = (byteArray) => {
    var img = null;
    if (byteArray != null) img = new Buffer.from(byteArray).toString("base64");
    const file = "data:image/jpeg;base64," + img;
    return file;
  };
  let showShipButton = false;
  if (props.status === "placed") {
    showShipButton = true;
  }
  let showRejectButton = false;
  if (props.status === "placed") {
    showRejectButton = true;
  }
  let ShippingAdd = customer.houseNo + "," + customer.street;
  let cont = customer.city + "," + customer.state + "," + customer.pincode;
  return (
    <li className={classes.meal}>
      <div>
        <h1 className={classes.description}>
          Id-
          {props.username}
        </h1>

        <div align="left" className={classes.price}>
          Shipping Address -
          {ShippingAdd}
          <br />
          {cont} <br />
          
          Contact - {customer.phone}
        </div>
        <h1>Item Details</h1>
        <div align="left" className={classes.price}>
          {product.name}
        </div>
        <br />
        <img
          className={classes.image}
          width="100"
          height="100"
          src={getImageSrc(product.pic)}
        />
        <br />
        <div className={classes.price}>Amount x {props.quantity}</div>
        <div className={classes.price}>Status - {props.status}</div>
        <div className={classes.price}>
          Price - $ {product.price * props.quantity}
        </div>
        <br />
        {showShipButton && (
          <button
            align="right"
            className={classes.button}
            onClick={clickHandlerShip}
          >
            Ship Order
          </button>
        )}
        {showRejectButton && (
          <button
            align="center"
            className={classes.button}
            onClick={clickHandlerReject}
          >
            Reject Order
          </button>
        )}
      </div>
    </li>
  );
};

export default OrderItem;
