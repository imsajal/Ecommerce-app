import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import OrderItem from "./OrderItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState, useContext } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setfilter] = useState("orderid");
  const [searchOrder, setSearchOrder] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);
  const authCtx = useContext(AuthContext);
  const changeStatusHandler = () => {
    setStatusChanged(true);
  };
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const filterHandler = (event) => {
    setfilter(event.target.value);
  };
  const searchOrderHandler = (event) => {
    setSearchOrder(event.target.value);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "http://localhost:8080/api/orders/myorders",
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            username: authCtx.user.username,
            password: authCtx.user.password,
          }),
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setOrders(responseData);
    };
    fetchOrders();
    setStatusChanged(false);
  }, [statusChanged]);
  let filteredOrders;
  if(filter==='status'){
   filteredOrders =
    search.length === 0
      ? orders
      : orders.filter((order) =>
          order.status.toLowerCase().includes(search.toLowerCase())
        );}
   else {filteredOrders =
        searchOrder.length === 0
          ? orders
          : orders.filter((order) =>
              order.id===Number(searchOrder)
            );}

  const OrdersList = filteredOrders.map((order) => (
    <OrderItem
      search={search}
      change={changeStatusHandler}
      key={order.id}
      id={order.id}
      username={order.username}
      productId={order.productId}
      quantity={order.quantity}
      status={order.status}
    />
  ));

  return (
    <section className={classes.meals}>
      
      <h1 className={classes.h1}>Filter Orders</h1>
      <select id="dropFilter" onChange={filterHandler} className={classes.button}>
        <option value="orderid" >Order Id</option>
        <option value="status" >Status</option>
      </select>
      {filter==='status' &&  <input
        className={classes.button}
        placeholder="Search with order status"
        type="text"
        value={search}
        onChange={searchHandler}
      /> }
       {filter==='orderid'  && <input
        className={classes.button}
        placeholder="Search with order id"
        type="text"
        value={searchOrder}
        onChange={searchOrderHandler}
      />}
     

      <Card>
        <ul>{OrdersList}</ul>
      </Card>
    </section>
  );
};

export default Orders;
