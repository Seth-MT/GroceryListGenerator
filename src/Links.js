import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Collapse = styled.div.attrs({
    className: "collpase navbar-collapse",
})``

const List = styled.div.attrs({
    className: "navbar-nav mr-auto",
})``

const Item = styled.div.attrs({
    className: "collpase navbar-collapse",
})`font-size: 18px;
`

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to = "/" className = "navbar-brand">
                    Grocery List
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to = "/recipes/myrecipes" className = "nav-link">
                                My Recipes
                            </Link>
                        </Item>
                        <Item>
                            <Link to = "/recipes/create" className = "nav-link">
                                Create Recipe
                            </Link>
                        </Item>
						<Item>
							<Link to = "/catalogue" className = "nav-link">
								Catalogue
							</Link>
						</Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links;