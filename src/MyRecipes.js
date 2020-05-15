import React, { Component } from "react";
import styled from "styled-components";
import api from "./api";
import "./MyRecipes.css";
import axios from "axios";

const Delete = styled.div`
    color: red;
    cursor: pointer;
`

const Update = styled.div`
    color: green;
    cursor: pointer;
`

class DeleteRecipe extends Component {
	deleteUser = event => {
		event.preventDefault()

		if (
			window.confirm(
				`Do you want to delete this recipe permanently?`,
			)
		) {
			api.deleteRecipeById(this.props.id)
			window.location.reload()
		}
	}
	render() {
		return <Delete onClick={this.deleteUser}>Delete</Delete>
	}
}

class UpdateRecipe extends Component {
	updateUser = event => {
		event.preventDefault()
		window.location.href = `/recipes/update/${this.props.id}`
	}
	render() {
		return <Update onClick={this.updateUser}>Update</Update>
	}
}
	
class MyRecipes extends Component {
	constructor(props){
		super(props)
		this.state = {
			recipes: [],
		}
	}
	
	componentDidMount = async () => {
		axios
			.get('/recipes')
			.then((response) => {
				
				this.setState({
					recipes: response.data.data,
					isLoading: false,
            })
        })
    }
	
	renderTableData(){
		return this.state.recipes.map((recipe, index) => {
			const { _id, name, cost, ingredient } = recipe
			return (
				<tr key = {_id}>
					<td>{name}</td>
					<td>{cost}</td>
					<td>{ingredient.join(", ")}</td>
					<td><DeleteRecipe id = {_id} /></td>
					<td><UpdateRecipe id = {_id} /></td>
				</tr>
			)
		})
	}
	
	renderTableHeader(){
		const recipeKey = {
			name: "name",
			cost: "cost",
			ingredients: "ingredient"
		}
		
		let header = Object.keys(recipeKey)
		return header.map((key, index) => {
			return <th key = {index}>{key.toUpperCase()}</th>
		})
	}
	
	
	
	
	render() {
		const { recipes } = this.state
		console.log('TCL: Catalogue -> render -> recipes', recipes)
		
		
		return (
			<div className = "myrecipes">
				<table id = "recipes">
					<tbody>
						<tr>{this.renderTableHeader()}</tr>
						{this.renderTableData()}
					</tbody>
				</table>
			</div>
        )
	}
}

export default MyRecipes;