import {
    GET_RECIPES,
    GET_DIETS,
    POST_RECIPE,
    GET_DETAIL,
    GET_RECIPES_BY_NAME,
    FILTER_RECIPES,
    ALPHABETICAL_SORT,
    SCORE_SORT,
    HEALTH_SORT
  } from "./constants";

const initialState = {
    recipes: [],
    diets: [],
    detail: {}
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case GET_RECIPES:
            return {
            ...state,
            recipes: action.payload
        }
        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                recipes: action.payload
        }
        case GET_DIETS:
            return {
            ...state,
            diets: action.payload
        }
        case GET_DETAIL:
            return {
            ...state,
            detail: action.payload
        }
        case FILTER_RECIPES:
            const filteredByDietType = state.recipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
            return {
            ...state,
            recipes: filteredByDietType
        }
        case ALPHABETICAL_SORT:   
          let sortedRecipes;
          if(action.payload === 'atoz'){
            sortedRecipes = [...state.recipes].sort(function(a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          }else if(action.payload === 'ztoa'){
            sortedRecipes = [...state.recipes].sort(function(a, b) {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
               return 0;
            }); 
          }
          return {
            ...state,
            recipes: sortedRecipes
        }
        case SCORE_SORT:
          let sortedRecipesByScore;
          if(action.payload === 'asc'){
            sortedRecipesByScore = [...state.recipes].sort(function(a, b) {
              if (a.score > b.score) return 1;
              if (a.score < b.score) return -1;
              return 0;
            })
          }else if(action.payload === 'desc'){
            sortedRecipesByScore = [...state.recipes].sort(function(a, b) {
              if (a.score < b.score) return 1;
              if (a.score > b.score) return -1;
              return 0;
            });
          }
          return {
            ...state,
            recipes: sortedRecipesByScore
        }
        case POST_RECIPE: 
            return {
                ...state,
        }
        case HEALTH_SORT:
          let sortedRecipesByHealthy;
          if(action.payload === 'asc'){
            sortedRecipesByHealthy = [...state.recipes].sort(function(a, b) {
              if (a.healthScore > b.healthScore) return 1;
              if (a.healthScore < b.healthScore) return -1;
              return 0;
            })
          }else if(action.payload === 'desc'){
            sortedRecipesByHealthy = [...state.recipes].sort(function(a, b) {
              if (a.healthScore < b.healthScore) return 1;
              if (a.healthScore > b.healthScore) return -1;
              return 0;
            });
          }
          return {
            ...state,
            recipes: sortedRecipesByHealthy
        }
        default: return state
    }
}

export default reducer;