//importar
import c from '../css/CreateRecipe.module.css';
const validate = ({name, summary, score, healthScore, steps, diets, image}) => {
    let errors = {};
    const regexUrl = /[a-zA-Z]+:\/\/([a-zA-Z]+(.[a-zA-Z]+)+)/i;
    if(!name || name === "") errors.name = <h4 className={c.h4}>{"A name is required"}</h4>;
    if(Number(name)) errors.name = <h4 className={c.h4}>{'Name must be a string'}</h4>;

    if(!regexUrl.test(image)) errors.image = <h4 className={c.h4}>{'The url is wrong'}</h4>;

    if(!summary || summary === "") errors.summary = <h4 className={c.h4}>{"A summary is required"}</h4>;

    if(!score || score === "") errors.score = <h4 className={c.h4}>{"A score is required"}</h4>;
    else if (isNaN(Number(score))) errors.score = <h4 className={c.h4}>{"Score must be a number"}</h4>;
    else if(score > 100 || score < 0) errors.score = <h4 className={c.h4}>{"Score must be between 0 and 100"}</h4>

    if(!healthScore || healthScore === "") errors.healthScore = <h4 className={c.h4}>{"A health score is required"}</h4>;
    else if (isNaN(Number(healthScore))) errors.healthScore = <h4 className={c.h4}>{"Health score must be a number"}</h4>;
    else if(healthScore > 100 || healthScore < 0) errors.healthScore = <h4 className={c.h4}>{"Health score must be between 0 and 100"}</h4>

    if(!steps || steps === "") errors.steps = <h4 className={c.h4}>{"Instructions are required"}</h4>;

    if(diets.length === 0) errors.diets = <h4 className={c.h4}>{"Pick at least one diet"}</h4>;
    
    return errors;
}

export default validate;