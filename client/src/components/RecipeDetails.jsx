import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import s from '../css/landing&index.module.css';
import { getDetails, clearStore } from '../redux/actions';
import { connect } from 'react-redux';

const RecipeDetails = (props) => {

    const dispatch = useDispatch();
    
    useEffect(()=> {
        props.getDetails(props.recipeId);
    }, [])

    useEffect(() => {
        return () => {
            dispatch(clearStore("detail"))
        }
    }, []); //eslint-disable-line

    return(
        <div className={s.containerDetail1}>
            { props.detail ?
                <div className={s.containerDetail2}>
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
                        <h4>Health Score: {props.detail.healthScore}</h4>
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