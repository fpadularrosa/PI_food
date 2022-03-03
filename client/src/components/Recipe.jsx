import { React, Component } from 'react';
import s from '../css/landing&index.module.css';

export default class Recipe extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className={s.container}>
                <h1 className={s.details}>{this.props.name}</h1>
                <h4 className={s.details}>Types diets: 
                    {this.props.diets?.map((d, i) => {
                        if(i === 0) return ` ${d}`;
                        return `, ${d}`;
                    })}
                </h4> 
                <h4 className={s.details}>Dish Types: 
                    {this.props.dish}
                </h4>
                <h4>Health Score: {this.props.healthScore}</h4>
                <h4 className={s.details}>Score: {this.props.score}</h4>
                <img className={s.image} src={this.props.img} alt="imgFood_notfound"/>
            </div>
    )}
}