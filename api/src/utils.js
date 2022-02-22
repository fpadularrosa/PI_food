const fetch = require('node-fetch');
const { apiKey } = process.env;
const { Recipe, Diet } = require('./db.js');

module.exports = { 
    saveDiets: async () => {
    const urlRecipeDetails = `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${apiKey}&addRecipeInformation=true`;
    const recipesDetails = await fetch(urlRecipeDetails)
    .then(res => res.json())
    .then(res => res.results)

    let diets = [];
    recipesDetails.forEach(recipe => {
        diets.push(...recipe.diets);
    });

    diets = [...new Set(diets)];
    diets.forEach(diet => { 
        Diet.create(
            {name: diet}
        )}
        );
    }
}