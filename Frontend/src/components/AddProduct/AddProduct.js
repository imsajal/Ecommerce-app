import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";
import { useHistory } from "react-router-dom";
import Modal from "../UI/Modal";
const AddProduct = () => {
  const picInputRef = useRef();
  const nameInputRef = useRef();
  const descriptionInputRef = useRef();
  const priceInputRef = useRef();
  const quantityInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const [image,setImage]=useState(null);
  const [showModal, setShowModal] = useState(false);
  const changeHandler=(event)=>{
    setImage(event.target.files[0]);
  }
  const hideModalHandler = () => {
    setShowModal(false);
    
  };
  const submitHandler = (event) => {
    event.preventDefault();
  
    const enteredName = nameInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;

    const enteredQuantity = quantityInputRef.current.value;
    // optional: Add validation
  
    const formData  = new FormData();
    formData.append('pic',image);
    formData.append('name',enteredName);
    formData.append('description',enteredDescription);
    formData.append('price',enteredPrice);
    formData.append('quantity',enteredQuantity);
    

    const AddNewProduct = async () => {
      const response = await fetch(
        "http://localhost:8080/api/products",
        {
          method: "POST",
          mode: "cors",
          body: formData,
         
        }
      );
      const responseData = await response.json();
      
      setShowModal(true);
      
    };
    AddNewProduct();
  };

  return (
    <div className={classes.back}>
      <section className={classes.auth}>
      {showModal && (
        <Modal onClose={hideModalHandler}>
        
          <h3  className={classes.h3}>Product added</h3>
          <button onClick={hideModalHandler} className={classes.button}>
            OK
          </button>
        </Modal>
      )}
        <h1>Product Details</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label className={classes.required} htmlFor="pic">Pic</label>
            <input type="file" id="pic" required  onChange={changeHandler} />
          </div>

          <div className={classes.control}>
            <label className={classes.required} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              required
              ref={nameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label className={classes.required} htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              required
              ref={descriptionInputRef}
            />
          </div>
          <div className={classes.control}>
            <label className={classes.required} htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              required
              ref={priceInputRef}
            />
          </div>
          <div className={classes.control}>
            <label className={classes.required} htmlFor="quantity">Amount available</label>
            <input
              type="number"
              id="quantity"
              required
              ref={quantityInputRef}
            />
          </div>
          
          <div className={classes.actions}>
          <button type="submit">Submit</button>
          
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddProduct;
