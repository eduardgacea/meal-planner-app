import classes from './App.module.css';
import MealsData from './Data/MealsData';
import { useState } from 'react';
import MealsList from './Components/Meal/MealsList';
import Form from './Components/Form/Form';

function App() {
  const [meals, setMeals] = useState(MealsData);
  const newMealHandler = (newMeal) => {
    setMeals((state) => [newMeal, ...state]);
  };

  return (
    <div className={classes.mealsAndForm}>
      <Form onMealSubmit={newMealHandler} />
      <MealsList meals={meals} />
    </div>
  );
}

export default App;
