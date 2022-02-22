import React, { useEffect } from 'react';
import s from '../css/landing&index.module.css';
import { getDetails } from '../redux/actions';
import { connect } from 'react-redux';

const RecipeDetails = (props) => {
    useEffect(()=> {
        props.getDetails(props.recipeId)
    }, [])
    return(
        <>
            { props.detail ?
                <div>
                    <h3>Recipe: <br></br> {props.detail.name}</h3>
                    <h4>Diets types:<br></br>
                        {props.detail.diets?.map(d => `${'|'} ${d} ${'|'}`)}
                    </h4>
                    <h4>Summary: <br></br> {props.detail.summary}</h4> 
                    <h4>Instructions: <br></br> {props.detail.steps}</h4>
                    <img className={s.imageDetail} src={props.detail.image}/>
                </div>
                : 'No existe la receta'
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        detail: state.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getDetails: id => {dispatch(getDetails(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails)