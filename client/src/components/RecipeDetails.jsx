import React, { useEffect } from 'react';
import s from '../css/landing&index.module.css';
import { getDetails } from '../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const RecipeDetails = (props) => {
    useEffect(()=> {
        props.getDetails(props.recipeId)
    }, [])
    return(
        <div>
        <Link to='/home'>
            <button className={s.back}>BACK</button>
        </Link>
            { props.detail ?
                <div className={s.containerDetail}>
                    <h2 className={s.title}>{props.detail.name}</h2>

                    <div className={s.diets}> 
                        <h4>Dish Type:
                            {` ${props.detail.dish}`}
                        </h4>
                        <h4>Diets types: 
                        {props.detail.diets?.map((d, i) => {
                            if(i === 0) return ` ${d.name || d}`;
                            return `, ${d.name || d}`;
                        })}
                        </h4>
                        <h4>Score: {props.detail.score}</h4>
                    </div>

                    <div className={s.leftContainer}>
                        <h4>Steps:</h4> 
                            <p>{props.detail.steps}</p>
                    </div>
                    <div className={s.middleContainer}>
                        <img className={s.imageDetail} src={props.detail.image} alt='foodNotFound' />
                        </div>
                    <div className={s.rightContainer}>
                        <h4>Summary:</h4> 
                            <p>{props.detail.summary}</p>
                    </div>
                </div>
                : 'No existe la receta'
            }
        </div>
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