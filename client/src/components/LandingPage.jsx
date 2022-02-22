import { React } from 'react';
import s from '../css/landing&index.module.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <div className={s.initial}>
            <h1 className={s.lanTitle}>Food App</h1>
            <Link to='/home'>
                <button className={s.landing}>Ingresar</button>
            </Link>
        </div>
    )
}
export default LandingPage;