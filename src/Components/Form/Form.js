import classes from './Form.module.css';
import Button from '../UI/Button';
import { useReducer, useState } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'NAME_INPUT':
      return {
        ...state,
        name: action.data,
        isNameValid: action.data.trim().length > 0,
        isFormValid: state.isIngredientsValid && state.isCategoryValid && action.data.trim().length > 0,
      };
    case 'INGREDIENTS_INPUT':
      return {
        ...state,
        ingredients: action.data,
        isIngredientsValid: action.data.trim().length > 0,
        isFormValid: state.isNameValid && state.isCategoryValid && action.data.trim().length > 0,
      };
    case 'CATEGORY_INPUT':
      return {
        ...state,
        category: action.data,
        isCategoryValid: action.data !== 'Alege o categorie',
        isFormValid: state.isNameValid && state.isIngredientsValid && action.data !== 'Alege o categorie',
      };
    case 'NAME_BLUR':
      return {
        ...state,
        isNameValid: state.name.trim().length > 0,
      };
    case 'INGREDIENTS_BLUR':
      return {
        ...state,
        isIngredientsValid: state.ingredients.trim().length > 0,
      };
    case 'CATEGORY_BLUR':
      return {
        ...state,
        isCategoryValid: state.category !== 'Alege o categorie',
      };
    case 'SUBMIT':
      return { name: '', ingredients: '', category: 'Alege o categorie', isNameValid: undefined, isIngredientsValid: undefined, isFormValid: undefined };
    default:
      return {
        name: '',
        ingredients: '',
        category: '',
        isNameValid: undefined,
        isIngredientsValid: undefined,
        isCategoryValid: undefined,
        isFormValid: undefined,
      };
  }
};

const Form = (props) => {
  const [isFormActive, setIsFormActive] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, {
    name: '',
    ingredients: '',
    category: 'Alege o categorie',
    isNameValid: undefined,
    isIngredientsValid: undefined,
    isCategoryValid: undefined,
    isFormValid: false,
  });

  const activateFormHandler = () => {
    setIsFormActive(true);
  };

  const closeFormHandler = () => {
    setIsFormActive(false);
  };

  const nameChangeHandler = (event) => {
    dispatch({ type: 'NAME_INPUT', data: event.target.value });
  };

  const ingredientsChangeHandler = (event) => {
    dispatch({ type: 'INGREDIENTS_INPUT', data: event.target.value });
  };

  const categoryChangeHandler = (event) => {
    dispatch({ type: 'CATEGORY_INPUT', data: event.target.value });
  };

  const nameBlurHandler = () => {
    dispatch({ type: 'NAME_BLUR' });
  };

  const ingredientsBlurHandler = () => {
    dispatch({ type: 'INGREDIENTS_BLUR' });
  };

  const categoryBlurHandler = () => {
    dispatch({ type: 'CATEGORY_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const ingredients = formState.ingredients.split(',').map((ingredient) => ingredient.trim());
    const newMeal = { id: Math.random(), name: formState.name, category: formState.category, ingredients: ingredients };
    props.onMealSubmit(newMeal);
    dispatch({ type: 'SUBMIT' });
    setIsFormActive(false);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {!isFormActive && (
        <>
          <p className={classes.inactiveFormTitle}>Adaugati Un Preparat Nou</p>
          <Button type="button" onClick={activateFormHandler}>
            Adaugati
          </Button>
        </>
      )}
      {isFormActive && (
        <>
          <div className={classes.control}>
            <label className={classes.label} htmlFor="mealName">
              Nume
            </label>
            <input
              className={`${classes.input} ${formState.isNameValid === false ? classes.inactive : ''}`}
              type="text"
              id="mealName"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={formState.name}
            />
          </div>
          <div className={classes.control}>
            <label className={classes.label} htmlFor="ingredients">
              Ingrediente (separate prin virgula)
            </label>
            <input
              className={`${classes.input} ${formState.isIngredientsValid === false ? classes.inactive : ''}`}
              type="text"
              id="ingredients"
              onChange={ingredientsChangeHandler}
              onBlur={ingredientsBlurHandler}
              value={formState.ingredients}
            />
          </div>
          <select
            className={`${classes.select} ${formState.isCategoryValid === false ? classes.inactive : ''}`}
            onChange={categoryChangeHandler}
            value={formState.category}
            onBlur={categoryBlurHandler}
          >
            <option disabled className={classes.selectOption}>
              Alege o categorie
            </option>
            <option className={classes.selectOption}>Mic Dejun</option>
            <option className={classes.selectOption}>Pranz</option>
            <option className={classes.selectOption}>Cina</option>
            <option className={classes.selectOption}>Desert</option>
            <option className={classes.selectOption}>Gustare</option>
          </select>
          <div className={classes.actions}>
            <Button type="submit" disabled={!formState.isFormValid}>
              Adauga
            </Button>
            <Button type="button" onClick={closeFormHandler}>
              Renunta
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default Form;
