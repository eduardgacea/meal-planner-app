import classes from './Meal.module.css';
import Ingredient from './Ingredient';

const Meal = (props) => {
  return (
    <li className={classes.meal}>
      <div className={classes.left}>
        <p className={classes.title}>{props.name}</p>
        <p className={classes.category}>{props.category}</p>
      </div>
      <div className={classes.right}>
        <p className={classes.title}>Ingrediente</p>
        <ul className={classes.ingredientsList}>
          {props.ingredients.map((ingredient, index) => (
            <Ingredient key={index} name={ingredient} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Meal;
