import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import validate from "../filters/validate";
import { getDiets, postRecipe } from "../redux/actions";
import { connect } from "react-redux";
import c from '../css/CreateRecipe.module.css';
import { Link } from "react-router-dom";
import minion from '../chef_minions.png'

const CreateRecipe = props => {
    
    const [state, setState] = useState({
        name: "",
        image: '',
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        dishtype: '',
        diets: []
    })

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    function handleSelectChange(event) {
        setState({
            ...state,
            [event.target.name]: [...state.diets, event.target.value]
        });
    }

    function handleChange(event) {
        event.preventDefault();
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(!Object.keys(errors).length > 0){
            dispatch(postRecipe(state))
            alert('Recipe has been created!')
        }else{
            alert('Completa bien el formulario')
        }
    }

    useEffect(()=>{
        dispatch(getDiets())
    },[])

    useEffect(() => {
        setErrors(validate(state))
    },[state.name, state.summary, state.score, state.healthScore, state.steps, state.diets, state.dishtype])


    return(
    <>
    <div className={c.fondo}>
        <Link to='/home'>
            <button className={c.back}>BACK</button>
        </Link>
        <h1 className={c.create}>CREATE RECIPES!</h1>
        <div className={c.minion}><img src={minion}></img></div>
        <form className={c.form} onSubmit={handleSubmit}>
            <div className="inputs">
                <label className={c.label}>Name:</label> <br></br>
                <input className={`${c.inputs} ${errors.name && c.danger}`} name="name" value={state.name} onChange={handleChange} /> 
                {errors.name && <span>{errors.name}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Dish type:</label> <br></br>
                <input className={`${c.inputs} ${errors.image && c.danger}` } name="dishtype" value={state.dishtype} placeholder='dish type...' onChange={handleChange} /> <br></br>
                {errors.dishtype && <span>{errors.dishtype}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Summary:</label> <br></br>
                <input className={`${c.inputs} ${errors.summary && c.danger}` } name="summary" value={state.summary} placeholder='overview...' onChange={handleChange} /> 
                {errors.summary && <span>{errors.summary}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Score:</label> <br></br>
                <input className={`${c.inputs} ${errors.score && c.danger}` } name="score" value={state.score} placeholder='food rating...' onChange={handleChange} /> <br></br>
                {errors.score && <span>{errors.score}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Health score:</label> <br></br>
                <input className={`${c.inputs} ${errors.healthScore && c.danger}` } name="healthScore" value={state.healthScore} placeholder='healthy...' onChange={handleChange} /> <br></br>
                {errors.healthScore && <span>{errors.healthScore}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Steps:</label> <br></br>
                <textarea className={`${c.inputs} ${errors.steps && c.danger}` } name="steps" value={state.steps} placeholder='steps...' onChange={handleChange}></textarea> <br></br>
                {errors.steps && <span>{errors.steps}</span>}
            </div>

            <div className="inputs">
                <label className={c.label}>Image:</label> <br></br>
                <input className={`${c.inputs} ${errors.image && c.danger}` } name="image" value={state.image} placeholder='url...' onChange={handleChange} /> <br></br>
                {errors.image && <span>{errors.image}</span>}
            </div>

            <div className="inputs">
                    <p>Diets:</p>
                    <select className={c.inputs} name='diets' onChange={handleSelectChange}>
                        {props.diets?.map(diet => <option key={diet.id} value={diet.name}>{diet.name}</option>)}                        
                    </select>
                    {errors.diets && <span>{errors.diets}</span>}
                </div>


                <button className={c.btn} type='submit' disabled={Object.keys(errors).length > 0}>Create recipe!</button>
        </form>
        </div>
    </>
    )
}

const mapStateToProps = state => {
    return{
        diets: state.diets,

     }
}

const mapDispatchToProps = dispatch => {
    return{
        getDiets: ()=>{ dispatch(getDiets())}
     }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);