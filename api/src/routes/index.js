const { Router } = require('express');
require('dotenv').config();
const { apiKey } = process.env;
const fetch = require('node-fetch');
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
            dishtype: recipe.dishTypes
        }
    })
    const dataBaseRecipe = await Recipe.findAll()
    recipes.push(...dataBaseRecipe);
    if(!recipes) return res.sendStatus(404).json({error: 'No existe ninguna receta.'});
    if(name){
        const recipesName = recipes.filter(recipe => recipe.name.toLowerCase().includes(name));
        return res.json(recipesName);
    }
    return res.json(recipes);
})

router.get('/recipes/:idReceta', async (req, res)=> {
    //Obtener el detalle de una receta en particular
    //Debe traer solo los datos pedidos en la ruta de detalle de receta
    //Incluir los tipos de dieta asociados
    const { idReceta } = req.params;
    const urlIdRecipe = `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${apiKey}`;

    const totalDetails = await fetch(urlIdRecipe).then(r => r.json());
    const details = {
        name: totalDetails.title,
        summary: totalDetails.summary.replace(/<[^>]+>/g, ''),
        score: totalDetails.spoonacularScore,
        healthScore: totalDetails.healthScore,
        steps: totalDetails.instructions?.replace(/<[^>]+>/g, ''),
        diets: totalDetails.diets,
        image: totalDetails.image
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

    const { name, summary, score, healthScore, steps, diets, image} = req.body;
    const newRecipe = await Recipe.create({
        name,
        image,
        summary,
        score,
        healthScore,
        steps
    })
    newRecipe.addDiets(diets);
    res.send(newRecipe);
})

module.exports = router;
