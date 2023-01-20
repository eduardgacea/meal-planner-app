import classes from './MealsList.module.css';
import Meal from './Meal';
import Filter from '../Filter/Filter';
import { useReducer, useState } from 'react';
import Button from '../UI/Button';

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'CATEGORY_FILTER':
      return { ...state, filteredCategory: action.value, isCategoryFiltered: true, filter: { ...state.filter, category: action.value } };
    case 'INGREDIENT_FILTER':
      return { ...state, filteredIngredient: action.value, isIngredientFiltered: true, filter: { ...state.filter, ingredient: action.value } };
    case 'FILTER_RESET':
      return {
        filteredCategory: 'Toate',
        filteredIngredient: 'Toate',
        isCategoryFiltered: false,
        isIngredientFiltered: false,
        filter: { category: 'Toate', ingredient: 'Toate' },
      };
    default:
      return {
        filteredCategory: 'Toate',
        filteredIngredient: 'Toate',
        isCategoryFiltered: false,
        isIngredientFiltered: false,
        filter: { category: 'Toate', ingredient: 'Toate' },
      };
  }
};

const MealsList = (props) => {
  const [filterState, dispatch] = useReducer(filterReducer, {
    filteredCategory: 'Toate',
    filteredIngredient: 'Toate',
    isCategoryFiltered: false,
    isIngredientFiltered: false,
    filter: { category: 'Toate', ingredient: 'Toate' },
  });

  const [mealPlan, setMealPlan] = useState([]);

  const categoryFilterHandler = (selectedCategory) => {
    dispatch({ type: 'CATEGORY_FILTER', value: selectedCategory });
  };

  const ingredientFilterHandler = (selectedIngredient) => {
    dispatch({ type: 'INGREDIENT_FILTER', value: selectedIngredient });
  };

  const filteredMeals = props.meals.filter((meal) => {
    if (filterState.filter.category !== 'Toate' && filterState.filter.ingredient !== 'Toate') {
      return meal.category === filterState.filter.category && meal.ingredients.includes(filterState.filter.ingredient);
    }
    if (filterState.filter.category !== 'Toate' && filterState.filter.ingredient === 'Toate') {
      return meal.category === filterState.filter.category;
    }
    if (filterState.filter.category === 'Toate' && filterState.filter.ingredient !== 'Toate') {
      return meal.ingredients.includes(filterState.filter.ingredient);
    }
    if (filterState.filter.category === 'Toate' && filterState.filter.ingredient === 'Toate') {
      return true;
    }
    return true;
  });

  const filterResetHandler = () => {
    dispatch({ type: 'FILTER RESET' });
  };

  const generateMealPlanHandler = () => {
    const mealsByCategory = { breakfast: [], lunch: [], dinner: [], dessert: [], snack: [] };
    for (let key in mealsByCategory) {
      for (let meal of props.meals) {
        if (key === 'breakfast' && meal.category === 'Mic Dejun') {
          mealsByCategory[key].push(meal);
        }
        if (key === 'lunch' && meal.category === 'Pranz') {
          mealsByCategory[key].push(meal);
        }
        if (key === 'dinner' && meal.category === 'Cina') {
          mealsByCategory[key].push(meal);
        }
        if (key === 'dessert' && meal.category === 'Desert') {
          mealsByCategory[key].push(meal);
        }
        if (key === 'snack' && meal.category === 'Gustare') {
          mealsByCategory[key].push(meal);
        }
      }
    }

    let mealPlanArray = [];
    for (let key in mealsByCategory) {
      let item = mealsByCategory[key][Math.floor(Math.random() * mealsByCategory[key].length)];
      if (item === undefined) {
        mealPlanArray.push({ id: Math.random(), name: 'Nu Ati Introdus Alimente Din Categoria', category: key, ingredients: [] });
      } else {
        mealPlanArray.push(item);
      }
    }
    setMealPlan([...mealPlanArray]);
  };

  console.log(mealPlan);

  return (
    <div className={classes.mealsContent}>
      <Filter
        meals={props.meals}
        onCategoryFilter={categoryFilterHandler}
        onIngredientFilter={ingredientFilterHandler}
        onFilterReset={filterResetHandler}
        onGenerateMealPlanRequest={generateMealPlanHandler}
      />
      {!filteredMeals.length && <p className={classes.default}>Nu exista preparate in aceasta categorie!</p>}
      <Button type="button" className={classes.generateMealPlanButton} onClick={generateMealPlanHandler}>
        Genereaza Meniu
      </Button>
      <div className={classes.listsWrapper}>
        <ul className={classes.meals}>
          {filteredMeals.map((meal) => (
            <Meal key={meal.id} name={meal.name} category={meal.category} ingredients={meal.ingredients} />
          ))}
        </ul>

        {!mealPlan.length && <p className={classes.didNotGenerate}>Nu ati generat inca un meniu!</p>}
        {mealPlan.length > 0 && (
          <ul className={classes.meals}>
            {mealPlan.map((meal) => (
              <Meal key={meal.id} name={meal.name} category={meal.category} ingredients={meal.ingredients} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MealsList;
