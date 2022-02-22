import { React } from 'react';
import s from '../css/Pagination.module.css';

const Pagination = ({ totalrecipes, recipesPerPage, paginate }) => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalrecipes / recipesPerPage); i++) {
        arr.push(i)
    }
    return(
        <div>
            {
                arr?.map(number => <button key={number} className={s.btn} onClick={e => paginate(number)}>{number}</button>)
            }
        </div>
    )
}
export default Pagination;