const { db } = require('../util/admin');

exports.createCatalogue = (request, response) => {
	
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
		.collection('catalogue')
		.add(Recipe)
		.then((doc) => {
			const responseRecipe = Recipe;
			responseRecipe.id = doc.id;
			return response.json(responseRecipe);
		})
		.catch((err) => {
			response.status(400).json({error: "Couldn't Add Entry"});
		});
};

exports.loadCatalogue = (request, response) => {
	db
		.collection('catalogue')
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
				return res.status(404).json({error: "No Entries Found"});
			}
			return response.json(recipes);
		})
		.catch((err) => {
			response.status(400).json({error: err.code});
		});
}