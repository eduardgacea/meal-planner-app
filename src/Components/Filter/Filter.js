import classes from './Filter.module.css';
import Option from './Option';
import Button from '../UI/Button';
import { useState } from 'react';

const Filter = (props) => {
  const [defaultCategory, setDefaultCategory] = useState('Toate');
  const [defaultIngredient, setDefaultIngredient] = useState('Toate');
  let allIngredients = [];
  props.meals.forEach((elem) => {
    allIngredients = [...allIngredients, ...elem.ingredients];
  });
  const uniqueIngredients = [...new Set(allIngredients)];
  const categoryFilterHandler = (event) => {
    props.onCategoryFilter(event.target.value);
    setDefaultCategory(event.target.value);
  };
  const ingredientFilterHandler = (event) => {
    props.onIngredientFilter(event.target.value);
    setDefaultIngredient(event.target.value);
  };

  const clearFilterHandler = () => {
    props.onFilterReset();
    setDefaultCategory('Toate');
    setDefaultIngredient('Toate');
  };

  return (
    <div className={classes.filtersWrapper}>
      <div className={classes.actions}>
        <Button type="button" className={classes.resetButton} onClick={clearFilterHandler}>
          Reseteaza
        </Button>
      </div>
      <div className={classes.filters}>
        <div className={classes.filter}>
          <label htmlFor="category-filter">Filtru Categorie</label>
          <select id="category-filter" className={classes.categoryFilter} onChange={categoryFilterHandler} value={defaultCategory}>
            <option>Toate</option>
            <option>Mic Dejun</option>
            <option>Pranz</option>
            <option>Cina</option>
            <option>Desert</option>
            <option>Gustare</option>
          </select>
        </div>
        <div className={classes.filter}>
          <label htmlFor="ingredient-filter">Filtru Ingrediente</label>
          <select id="ingredient-filter" className={classes.ingredientFilter} onChange={ingredientFilterHandler} value={defaultIngredient}>
            <option>Toate</option>
            {uniqueIngredients.map((ingredient, index) => (
              <Option key={index}>{ingredient}</Option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
