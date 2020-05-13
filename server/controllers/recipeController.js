const Recipe = require('../models/recipeModel');

createRecipe = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No recipe provided',
        });
    }

    const recipe = new Recipe(body);

    if (!recipe) {
        return res.status(400).json({ success: false, error: err });
    }

    recipe
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: recipe._id,
                message: 'Recipe Added!',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Couldn't Add Recipe",
            });
        })
}

updateRecipe = async (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'No Changes Found',
        });
    }

    Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Recipe Not Found!',
            });
        }
        recipe.name = body.name;
        recipe.ingredient = body.ingredient;
        recipe.cost = body.cost;
        recipe
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: recipe._id,
                    message: 'Recipe updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Recipe Not Updated!',
                });
            })
    })
}

deleteRecipe = async (req, res) => {
    await Recipe.findOneAndDelete({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe Not Found` });
        }

        return res.status(200).json({ success: true, data: recipe });
    }).catch(err => console.log(err))
}

getRecipeById = async (req, res) => {
    await Recipe.findOne({ _id: req.params.id }, (err, recipe) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        if (!recipe) {
            return res
                .status(404)
                .json({ success: false, error: `Recipe Not Found` });
        }
        return res.status(200).json({ success: true, data: recipe });
    }).catch(err => console.log(err))
}

getRecipes = async (req, res) => {
    await Recipe.find({}, (err, recipes) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (!recipes.length) {
            return res
                .status(404)
                .json({ success: false, error: `No Recipes Found` });
        }
		
		let outputList = recipes.filter((recipes, index, self) =>
			index === self.findIndex((t) => (t.save === recipes.save && t.name === recipes.name)))
			
			
        return res.status(200).json({ success: true, data: outputList });
    }).catch(err => console.log(err))
}



module.exports = {
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipes,
    getRecipeById,
}