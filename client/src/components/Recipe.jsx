import { React, Component } from 'react';
import s from '../css/landing&index.module.css';

export default class Recipe extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return(
            <div className={s.container}>
                <h3 className={s.details}>
                    {this.props.name}
                </h3>
                <h3 className={s.details}>Details:</h3>
                <div className={s.details2}>
                        Types diets: {this.props.diets?.map((d, i) => {
                            if(i === 0) return ` ${d}`;
                            return `, ${d}`;
                        })}
                        <br/>
                        Dish Types: {this.props.dish?.map((d, i) => {
                            if(i === 0) return ` ${d}`;
                            return `, ${d}`;
                        })}
                        <br/>
                        Health Score: {this.props.healthScore}
                        <br/>
                        Likes: {this.props.score}
                </div>
                <img className={s.image} src={this.props.img} alt="imgFood_notfound"/>
            </div>
    )}
}