import React, { Component } from "react";
import styled from "styled-components";
import api from "./api";
import api2 from "./api2";
import "./MyRecipes.css";

const Save = styled.div`
    color: green;
    cursor: pointer;
`


class Catalogue extends Component {
	constructor(props){
		super(props)
		this.state = {
			catalogue: [],
		}
	}
	
	componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api2.loadCatalogue().then(response => {
            this.setState({
                catalogue: response.data.data,
                isLoading: false,
            })
        })
    }
	
	saveRecipe = async (recipe) => {
		const { name, cost, ingredient } = recipe
		const payload = { name, cost, ingredient }
		
		await api.insertRecipe(payload).then(res => {
			window.alert(`Recipe Saved`)
		});
	}
	
	renderTableData(){
		return this.state.catalogue.map((recipe, index) => {
			const { name, cost, ingredient } = recipe
			return (
				<tr key = {name}>
					<td>{name}</td>
					<td><Save onClick = {() => {this.saveRecipe(recipe)}}>Save</Save></td>
				</tr>
			)
		})
	}
	
	renderTableHeader(){
		const recipeKey = {
			Recipes: "name",
		}
		
		let header = Object.keys(recipeKey)
		return header.map((key, index) => {
			return <th key = {index}>{key.toUpperCase()}</th>
		})
	}
	
	render() {
		const { catalogue } = this.state
		console.log('TCL: Catalogue -> render -> recipes', catalogue)
		
		
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

export default Catalogue;