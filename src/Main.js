import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch
} from "react-router-dom";
import NavBar from "./NavBar";
import GroceryList from "./GroceryList";
import MyRecipes from "./MyRecipes";
import CreateRecipe from "./CreateRecipe";
import UpdateRecipe from "./UpdateRecipe";
import Catalogue from "./Catalogue";
import LoginUser from "./LoginUser";
import CreateUser from "./CreateUser";
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
	return (
		<Router>
			<NavBar/>
			<Switch>
				<Route exact path = "/" component = {GroceryList}/>
				<Route path = "/recipes/myrecipes" exact component = {MyRecipes}/>
				<Route path = "/recipes/create" exact component = {CreateRecipe}/>
				<Route path = "/catalogue" exact component = {Catalogue}/>
				<Route path = "/recipes/update/:id" exact component = {UpdateRecipe}/>
				<Route path = "/user/login" exact component = {LoginUser}/>
				<Route path = "/user/register" exact component = {CreateUser}/>
			</Switch>
		</Router>
	);
}

export default Main;