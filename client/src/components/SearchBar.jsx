import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../redux/actions.js';
import s from '../css/SearchBar.module.css';
import { Link } from 'react-router-dom';
import Filters from './Filters.jsx';

const SearchBar = () => {
    const [nombre, setNombre] = useState('');

    const dispatch = useDispatch();

    const handleChange = e => {
        setNombre(e.target.value)
}

const handleSubmit = e => {
    e.preventDefault();

    dispatch(getRecipesByName(nombre));
    setNombre('');
}

return(
    <div className={s.searchBar}>
        <form className={s.formBar} onSubmit={e => handleSubmit(e)}>                           
            <input type="text" className={s.input} name="name" id="input" placeholder='Recipes' value={nombre} onChange={handleChange}/>
            <button type="submit" className={s.btn}>Search</button> 
        </form>
        <Filters/>
        <Link to='/recipe'>
                <button className={s.btn}>New Recipe</button>
        </Link>
    </div>
    );
}
export default SearchBar;