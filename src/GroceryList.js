import React, { Component } from "react";
import GroceryListItems from "./GroceryListItems";
import "./GroceryList.css";

class GroceryList extends Component {
	constructor(props, context) {
		super(props, context);
		
		this.state = {
			items: []
		};
		
		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.clearGroceryList = this.clearGroceryList.bind(this);
	}
	
	addItem(item) {
		if (this._inputElement !== "") {
			var newItem = {
				text: this._inputElement.value,
				key: Date.now()
			};
			
			this.setState((prevState) => {
				return {
					items: prevState.items.concat(newItem)
				};
			});
			
			this._inputElement.value = "";
		}
		
		console.log(this.state.items);
		
		item.preventDefault();
	}
	
	deleteItem(key) {
		var filteredItems = this.state.items.filter(function (item) {
			return (item.key !== key);
		});
		
		this.setState({
			items: filteredItems
		});
	}
	
	clearGroceryList() {
		this._inputElement.value = "";
		this.setState({
			items: []
		});
	}
	
	render() {
		return (
			<div className = "groceryListMain">
				<div className = "header">
					<form onSubmit = {this.addItem} onReset = {this.clearGroceryList}>
						<input ref = {(a) => this._inputElement = a}
							placeholder = "Add Item">
						</input>
						<button type = "submit">Add</button>
						<button type = "reset">Clear List</button>
					</form>
					
				</div>
				<div>
					<h2>Items</h2>
					<GroceryListItems entries = {this.state.items}
						delete = {this.deleteItem}/>
				</div>
			</div>
		);
	}
}

export default GroceryList;