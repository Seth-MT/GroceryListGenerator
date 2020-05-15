const { db } = require('../util/admin');

exports.createRecipe = (request, response) => {
	
	if((request.body.name.trim() === "") || (request.body.cost.trim()=== "")){
		return res.status(400).json({
			success: false,
			error: 'No Empty Fields',
		});
	}
	
	const Recipe = {
		name: request.body.name,
		ingredient: request.body.ingredient,
		cost: request.body.cost
	}
	
	db
		.collection('recipes')
		.add(Recipe)
		.then((doc) => {
			const responseRecipe = Recipe;
			responseRecipe.id = doc.id;
			return response.json(responseRecipe);
		})
		.catch((err) => {
			response.status(400).json({error: "Couldn't Add Recipe"});
		});
};

exports.updateRecipe = (request, response) => {
	if(!request.body){
		return response.status(400).json({
			error: "No Changes Found",
		});
	}
	
	let document = db.collection('recipes').doc(`${request.params.id}`);
	
	if(!document){
		return response.status(404).json({
			message: "Recipe Not Found!",
		})
	}
	
	document.update(request.body)
	.then(() => {
		response.json({message: 'Recipe Updated!'});
	})
	.catch((err) => {
		return response.status(404).json({
			error: err.code,
			message: "Recipe Not Updated!",
		});
	})
}

exports.deleteRecipe = (request, response) => {
	const document = db.doc(`/recipes/${request.params.id}`);
	document
		.get()
		.then((doc) => {
			if(!doc.exists) {
				return response.status(404).json({error: "Recipe Not Found"})
			}
			return document.delete();
		})
		.then(() => {
			response.json({message: 'Delete Successful'});
		})
		.catch((err) => {
			return res.status(400).json({error: err.code})
		});
}

exports.getRecipes = (request, response) => {
	db
		.collection('recipes')
		.orderBy('name')
		.get()
		.then((data) => {
			let recipes = [];
			data.forEach((doc) => {
				recipes.push({
					id: doc.id,
					name: doc.data().name,
					ingredient: doc.data().ingredient,
					cost: doc.data().cost,
				});
			});
			if(!recipes.length){
				return res.status(404).json({error: "No Recipes Found"});
			}
			return response.json(recipes);
		})
		.catch((err) => {
			response.status(400).json({error: err.code});
		});
}