import React, { Component } from "react";
import styled from "styled-components";
import Links from "./Links";

const Container = styled.div.attrs({
    className: "container",
})``

const Nav = styled.nav.attrs({
    className: "navbar navbar-expand-lg navbar-dark bg-primary",
})`
    margin-bottom: 30 px;
	border-radius: 20px;
	
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>       
                    <Links/>
                </Nav>
            </Container>
        )
    }
}

export default NavBar;