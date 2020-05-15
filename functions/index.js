const functions = require('firebase-functions');
const app = require('express')();

//Recipe Operations
const {
	createRecipe,
	updateRecipe,
	deleteRecipe,
	getRecipes
} = require('./apis/recipes')

//Catalogue Operations
const {
	createCatalogue,
	loadCatalogue
} = require('./apis/catalogue')

//User Operations
const {
	loginUser,
	signUpUser
} = require('./apis/users')


//Recipe Routes
app.post('/recipe', createRecipe);
app.put('/recipe/:id', updateRecipe);
app.delete('/recipe/:id', deleteRecipe);
app.get('/recipes', getRecipes);

//Catalogue Routes
app.post('/foodbook', createCatalogue);
app.get('/foodbook/allrecipes', loadCatalogue);

//Recipe /api
exports.api = functions.https.onRequest(app);

//Catalogue /food
exports.food = functions.https.onRequest(app);

//User Routes
app.post('/login', loginUser);
app.post('/signup', signUpUser);