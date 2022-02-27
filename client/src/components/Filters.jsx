import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterBy, getDiets, alphabeticalSort, scoreSort } from '../redux/actions';
import s from '../css/SearchBar.module.css';

const Filters = () => {
    const [order, setOrder] = useState('')
    const dispatch = useDispatch()
    const diets = useSelector(state => state.diets)
    
    useEffect(() => {
        dispatch(alphabeticalSort(order))
    },[order])
    
    useEffect(() => {
        dispatch(getDiets())
    }, [])

    const handleAlphabeticalSort = e => {
        setOrder(e.target.value)
        e.preventDefault();
    }

    const handleFilterBy = e => {
        dispatch(filterBy(e.target.value))
    }

    const handleScoreSort = e => {
        e.preventDefault();                
        dispatch(scoreSort(e.target.value));
    }

    return (
        <div className={s.filters}>

        <label className={s.label}>Sort:</label>
        <select className={s.select} defaultValue='none' name="alphabetical" onChange={handleAlphabeticalSort}>
            <option disabled hidden value='none' >Alphabetical</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
        </select>

        <select className={s.select} name="numerical" defaultValue='none' onChange={handleScoreSort}>
            <option disabled hidden value='none'>Score</option>
            <option value="asc">From Min to Max</option>
            <option value="desc">From Max to Min</option>
        </select>

         <select className={s.select} defaultValue='none' name="diets" id="diets" onChange={handleFilterBy}>
            <option disabled hidden value='none' >Diets types</option>
            {
                diets.length > 0 ? diets.map(diet => (<option key={diet.id} value={diet.name}>{diet.name}</option>)) : <option>Loading....</option>
            }
        </select>

        </div>
    )
};

export default Filters;