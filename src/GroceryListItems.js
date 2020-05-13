import React, { Component } from "react";
import FlipMove from "react-flip-move";

class GroceryListItems extends Component {
	constructor(props) {
		super(props);
		
		this.createItems = this.createItems.bind(this);
		this.removeItems = this.removeItems.bind(this);
	}
	
	delete(key) {
		this.props.delete(key);
	}
	
	createItems(item) {
		return <li onClick = {() => this.delete(item.key)}
			key = {item.key} > {item.text}</li>
	}
	
	removeItems(item) {
		return <li onClick = {() => this.delete(item.key)}
			key = {item.key} > {item.text}</li>
	}
	
	render() {
		var groceryItems = this.props.entries;
		var listItems = groceryItems.map(this.createItems);
		
		
		return (
			<div>
				<ul className = "theList">
					<FlipMove duration = {250} easing = "ease-out">
						{listItems}
					</FlipMove>
				</ul>
			</div>
		);
	}
};

export default GroceryListItems;