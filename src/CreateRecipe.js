import React, { Component } from "react";
import api from "./api";

import styled from "styled-components";

const Wrapper = styled.div.attrs({
    className: "form-group",
})`
    margin: 0 30px;
	padding: 10px;
`

const Label = styled.label`
    margin: 5px;
	font-family: sans-serif;
	font-size: 18px;
	font-weight: bold;
`

const InputText = styled.input.attrs({
    className: "form-control",
})`
    margin: 5px;
	border-radius: 15px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 25px 25px 15px 5px;
	border-radius: 8px;
	font-family: sans-serif;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 25px 15px 15px 5px;
	border-radius: 8px;
	font-family: sans-serif;
`

class CreateRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            cost: '',
            ingredient: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputCost = async event => {
        const cost = event.target.value
        this.setState({ cost })
    }

    handleChangeInputIngredient = async event => {
        const ingredient = event.target.value
        this.setState({ ingredient })
    }

    handleIncludeRecipe = async () => {
        const { name, cost, ingredient } = this.state
        const arrayIngredient = ingredient.split('/')
        const payload = { name, cost, ingredient: arrayIngredient }

        await api.insertRecipe(payload).then(res => {
            window.alert(`Recipe inserted successfully`)
            this.setState({
                name: '',
                cost: '',
                ingredient: '',
            })
        })
    }

    render() {
        const { name, cost, ingredient } = this.state
        return (
            <Wrapper>
                <Label>Name: </Label>
                <InputText
                    type = "text"
                    value = {name}
                    onChange = {this.handleChangeInputName}
                />

                <Label>Cost: </Label>
                <InputText
                    type="text"
                    value={cost}
                    onChange={this.handleChangeInputCost}
                />

                <Label>Ingredients: </Label>
                <InputText
                    type="text"
                    value={ingredient}
                    onChange={this.handleChangeInputIngredient}
                />

                <Button onClick={this.handleIncludeRecipe}>Add Recipe</Button>
                <CancelButton href={'/recipes/myrecipes'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CreateRecipe;