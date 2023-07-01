import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('http://localhost:8080/api/products',{
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      
      setMeals(responseData);
      
    };

    fetchMeals();
  }, []);
  const filteredProducts =  search.length === 0 ? meals : meals.filter(
    (meal) => meal.name.toLowerCase().includes(search.toLowerCase())
  );
  const mealsList = filteredProducts.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      pic={meal.pic}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
     
       <input align="right" className={classes.button} placeholder="Searching for a product..." type="text" value={search} onChange={searchHandler} /> <br/> <br /><br />
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
