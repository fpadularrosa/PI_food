import { React, useEffect, useState } from 'react';
import Recipe from './Recipe';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipes } from '../redux/actions'
import Pagination from './Pagination';
import s from '../css/Recipes.module.css';

function Recipes(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 9;

    const lastRecipe = currentPage * recipesPerPage;
    const firstRecipe = lastRecipe - recipesPerPage;
    const recipes = props.recipes?.slice(firstRecipe, lastRecipe);

    const paginate = number => {
        setCurrentPage(number);
    }

    useEffect(()=> {
        props.getRecipes()
    }, [])
    return(
    <>
        <div className={s.container}>
            {
            recipes?.map(recipe => <Link to={`recipe/${recipe.id}`}> <Recipe key={recipe.id} name={recipe.name} diets={recipe.diets} img={recipe.image} score={recipe.score} summary={recipe.summary} steps={recipe.steps} dish={recipe.dish}></Recipe> </Link>)
            }
        </div>
        <Pagination totalrecipes={props.recipes?.length} recipesPerPage={recipesPerPage} paginate={paginate}/>
    </>
    )
}

const mapStateToProps = state => {
    return {
        recipes: state.recipes
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getRecipes: () => {dispatch(getRecipes())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes)