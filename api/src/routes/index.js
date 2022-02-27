const { Router } = require('express');
require('dotenv').config();
const { apiKey } = process.env;
const fetch = require('node-fetch');
const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const urlRecipes = `https://api.spoonacular.com/recipes/complexSearch?number=100&apiKey=${apiKey}&addRecipeInformation=true`;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/recipes', async (req, res) => {
    //Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
    //Si no existe ninguna receta mostrar un mensaje adecuado
    const { name } = req.query;
    let recipes = await fetch(urlRecipes)
    .then(r => r.json())
    .then(r => r.results);
    
    recipes = recipes.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.title,
            score: recipe.spoonacularScore,
            healthScore: recipe.healthScore,
            diets: recipe.diets,
            image: recipe.image,
            dish: recipe.dishTypes
        }
    })
    let dataBaseRecipe = await Recipe.findAll({
        include: Diet
    })

    dataBaseRecipe = dataBaseRecipe.map(recipe => {
        return {
            id: recipe.id,
            name: recipe.name,
            score: recipe.score,
            healthScore: recipe.healthScore,
            diets: recipe.diets.map(diet => diet.name),
            image: recipe.image,
            dish: recipe.dish
        }
    })
    recipes.push(...dataBaseRecipe);
    if(name) recipes = recipes.filter(recipe => recipe.name?.toLowerCase().includes(name.toLowerCase()));
    if(!recipes.length) return res.status(404).json('No existe ninguna receta.');
    return res.json(recipes);
})

router.get('/recipes/:idReceta', async (req, res)=> {
    //Obtener el detalle de una receta en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de receta
    //Incluir los tipos de dieta asociados
    const { idReceta } = req.params;
    let totalDetails;
    if(idReceta.length < 32) totalDetails = await fetch(`https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${apiKey}`).then(data => data.json());
    else totalDetails = await Recipe.findOne({where: {id: idReceta}, include: Diet})
    const details = {
        name: totalDetails.title || totalDetails.name,
        summary: totalDetails.summary.replace(/<[^>]+>/g, '') || totalDetails.summary,
        score: totalDetails.spoonacularScore || totalDetails.score,
        healthScore: totalDetails.healthScore,
        steps: totalDetails.instructions?.replace(/<[^>]+>/g, '') || totalDetails.steps,
        diets: totalDetails.diets || totalDetails.diets.map(d => d.name),
        image: totalDetails.image,
        dish: totalDetails.dishTypes || totalDetails.dish
    }
    res.json(details);
})

router.get('/types', async (req, res) => {
    //Obtener todos los tipos de dieta posibles
    //En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos de datos indicados por spoonacular acá
    const diets = await Diet.findAll();
    res.json(diets);
})

router.post('/recipe', async (req, res) => {
    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
    //Crea una receta en la base de datos

    const { name, summary, score, healthScore, steps, diets, image, dishtype } = req.body;
    const newRecipe = Recipe.create({
        name,
        image,
        summary,
        score,
        healthScore,
        steps,
        dish: dishtype
    })
    .then(recipe => diets.forEach(diet => Diet.findOne({
        where: {name: {[Op.substring]: diet}
    }}).then(diet => recipe.addDiet(diet.id))))
    
    res.send(newRecipe);
})

module.exports = router;
