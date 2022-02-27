import c from '../css/CreateRecipe.module.css';
const validate = ({name, summary, score, healthScore, steps, diets, image, dishtype}) => {
    let errors = {};
    const regexUrl = /[a-zA-Z]+:\/\/([a-zA-Z]+(.[a-zA-Z]+)+)/i;
    if(!name || name === "") errors.name = <p className={c.p1}>{"A name is required"}</p>;
    if(Number(name)) errors.name = <p className={c.p1}>{'Name must be a string'}</p>;

    if(!dishtype || dishtype === "") errors.dishtype = <p className={c.p1}>{"A dish type is required"}</p>;
    if(Number(dishtype)) errors.dishtype = <p className={c.p1}>{'Dish type must be a string'}</p>;

    if(!regexUrl.test(image)) errors.image = <p className={c.p1}>{'The url is wrong'}</p>;

    if(!summary || summary === "") errors.summary = <p className={c.p1}>{"A summary is required"}</p>;

    if(!score || score === "") errors.score = <p className={c.p1}>{"A score is required"}</p>;
    else if (isNaN(Number(score))) errors.score = <p className={c.p1}>{"Score must be a number"}</p>;
    else if(score > 100 || score < 0) errors.score = <p className={c.p1}>{"Score must be between 0 and 100"}</p>

    if(!healthScore || healthScore === "") errors.healthScore = <p className={c.p1}>{"A health score is required"}</p>;
    else if (isNaN(Number(healthScore))) errors.healthScore = <p className={c.p1}>{"Health score must be a number"}</p>;
    else if(healthScore > 100 || healthScore < 0) errors.healthScore = <p className={c.p1}>{"Health score must be between 0 and 100"}</p>

    if(!steps || steps === "") errors.steps = <p className={c.p1}>{"Instructions are required"}</p>;

    if(diets.length === 0) errors.diets = <p className={c.p1}>{"Pick at least one diet"}</p>;
    
    return errors;
}

export default validate;