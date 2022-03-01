import {
    GET_RECIPES,
    GET_DIETS,
    GET_DETAIL,
    POST_RECIPE,
    GET_RECIPES_BY_NAME,
    FILTER_RECIPES,
    ALPHABETICAL_SORT,
    SCORE_SORT
} from "./constants";
import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        try {
            const recipes = await axios.get('http://localhost:3001/recipes');
            if(recipes?.data){
                dispatch({ type: GET_RECIPES, payload: recipes.data})
            }
        } catch (err) {
            dispatch({ type: GET_RECIPES, payload:  err.toString()})
        }
        // .then(recipes => recipes.json())
        // .then(recipes => dispatch({ type: GET_RECIPES, payload: recipes}))
        // .catch(err => dispatch({ type: GET_RECIPES, payload:  err.toString()}))
    }
}

export function getDetails(id) {
    return async function (dispatch) {
        try {
            const details = await axios.get(`http://localhost:3001/recipes/${id}`);
            if(details?.data){
                dispatch({ type: GET_DETAIL, payload: details.data})
            }
        } catch (err) {
            dispatch({ type: GET_DETAIL, payload:  err.toString()})
        }
            // fetch(`http://localhost:3001/recipes/${id}`)
            // .then(details => details.json())
            // .then(details => dispatch({ type: GET_DETAIL, payload: details }))
            // .catch(err => dispatch({ type: GET_DETAIL, payload:  err.toString()}))
    }
}

export function getDiets() {
    return async function (dispatch) {
        try {
            const diets = await axios.get('http://localhost:3001/types');
            if(diets?.data){
                dispatch({type: GET_DIETS, payload: diets.data})
            }
        } catch (err) {
            dispatch({type: GET_DIETS, payload: err.toString()})
        }
        // fetch('http://localhost:3001/types')
        // .then(diets => diets.json())
        // .then(diets => dispatch({ type: GET_DIETS, payload: diets }))
        // .catch(err => dispatch({ type: GET_DIETS, payload:  err.toString()}))
    }
}

export function postRecipe(input) {
    return async function (dispatch) {
        try {
            const newRecipe = await axios.post("http://localhost:3001/recipe", input, {
                headers:{'content-type':'application/json'}});
                if(newRecipe?.data){
                    dispatch({ type: POST_RECIPE, payload: newRecipe.data });
                }
        } catch (err) {
            dispatch({ type: POST_RECIPE, payload:  err.toString()})
        }

            // fetch("http://localhost:3001/recipe", {
            //     method: "POST",
            //     body: JSON.stringify(input),
            //     headers:{'Content-Type':'application/json'}
            // })
            // .then(newRecipe => newRecipe.json())
            // .then(newRecipe => dispatch({ type: POST_RECIPE, payload: newRecipe }))
            // .catch(err => dispatch({ type: POST_RECIPE, payload:  err.toString()}))
    }
}

export const getRecipesByName = name => async dispatch => {
        try {
            const recipesByName = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            if(recipesByName?.data){
                dispatch({type: GET_RECIPES_BY_NAME, payload: recipesByName.data});
            }
        } catch (err) {
            dispatch({type: GET_RECIPES_BY_NAME, payload: err.toString()});
        }
        // fetch(`http://localhost:3001/recipes?name=${name}`)
        // .then(recipe => recipe.json())
        // .then(recipe => dispatch({type: GET_RECIPES_BY_NAME, payload: recipe}))
        // .catch(err => dispatch({type: GET_RECIPES_BY_NAME, payload: err.toString()}))
}

export const filterBy = diet => {
    return {
        type: FILTER_RECIPES,
        payload: diet
    }
}

export function alphabeticalSort(order) {
    return {
        type: ALPHABETICAL_SORT,
        payload: order
    }
};

export function scoreSort(score) {
    return {
        type: SCORE_SORT,
        payload: score
    }
}