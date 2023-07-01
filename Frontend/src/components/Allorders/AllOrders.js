import AuthContext from "../../store/auth-context";
import Card from "../UI/Card";
import OrderItem from "./OrderItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState, useContext } from "react";
import LazyLoad from "react-lazyload";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setfilter] = useState("status");
  const [searchStatus, setSearchStatus] = useState('');
 
  const [statusChanged, setStatusChanged] = useState(false);
  const authCtx = useContext(AuthContext);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  const changeStatusHandler = (temp) => {
    setStatusChanged(temp);
  };
  const filterHandler = (event) => {
    setfilter(event.target.value);
  };
  const searchStatusHandler = (event) => {
    setSearchStatus(event.target.value);
  };
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch("http://localhost:8080/api/orders", {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      console.log(responseData);
      setOrders(responseData);
    };
    fetchOrders();
    setStatusChanged(false);
  }, [statusChanged]);
  
  const placedOrders = orders.filter(
    (order) => order.status == "placed" || order.status == "Shipped" || order.status == "Rejected"
  );

 
  let filteredOrders =  search.length === 0 ? placedOrders : placedOrders.filter(
      (order) => order.username.toLowerCase().includes(search.toLowerCase())
             );

  //const filteredOrders =  search.length === 0 ? placedOrders : placedOrders.filter(
    //(order) => order.username.toLowerCase().includes(search.toLowerCase())
  //);
  function compare_item(a, b) {
    // a should come before b in the sorted order
    if (a.username < b.username) {
      return -1;
      // a should come after b in the sorted order
    } else if (a.username > b.username) {
      return 1;
      // and and b are the same
    } else {
      return 0;
    }
  }
  filteredOrders.sort(compare_item);
  const OrdersList = filteredOrders.map((order) => (
    <OrderItem
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
    
      <input
        className={classes.button}
        placeholder="Search Orders with customer id..."
        type="text"
        value={search}
        onChange={searchHandler}
      /> 
      
     
       
      <Card>
        <ul>{OrdersList}</ul>
      </Card>
    
    </section>
  );
};

export default AllOrders;
