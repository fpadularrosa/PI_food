import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../redux/actions.js';
import s from '../css/SearchBar.module.css';
import { Link } from 'react-router-dom';
import Filters from './Filters.jsx';

const validate = nombre => {
    const err = {}

    if(!nombre.trim()) {
        err.nombre = 'Nombre de receta requerido'
    }

    return err;
}

const SearchBar = () => {
    const [nombre, setNombre] = useState('');
    const [errores, setErrores] = useState({});

    const dispatch = useDispatch();

    const handleChange = e => {
        setNombre(e.target.value)
        setErrores(validate(nombre))
    }

    const handleSubmit = e => {
        e.preventDefault();
        setErrores(validate(nombre));
        if(Object.keys(errores).length === 0) {
            dispatch(getRecipesByName(nombre));
            setNombre('');
        }
    }
    
return(
    <div className={s.searchBar}>
        <form className={s.formBar} onSubmit={e => handleSubmit(e)}>                           
            <input type="text" className={s.input} name="name" id="input" placeholder='Recipes' value={nombre} onChange={handleChange}/>
            <button type="submit" className={s.btn}>Search</button> 
        </form>
        {errores.nombre && <span>{errores.nombre}</span>}
        <Filters/>
        <Link to='/recipe'>
                <button className={s.btn}>New Recipe</button>
        </Link>
    </div>
    );
}
export default SearchBar;