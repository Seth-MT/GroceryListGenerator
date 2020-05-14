import React, { Component } from "react";
import api from "./api";
import styled from "styled-components";

const Title = styled.h1.attrs({
    className: "h1",
})``

const Wrapper = styled.div.attrs({
    className: "form-group",
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: "form-control",
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class UpdateRecipe extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
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

    handleUpdateRecipe = async () => {
        const { id, name, cost, ingredient } = this.state
        const arrayIngredient = ingredient.split(',')
        const payload = { name, cost, ingredient: arrayIngredient }

        await api.updateRecipeById(id, payload).then(res => {
            window.alert(`Recipe updated successfully`)
            this.setState({
                name: '',
                cost: '',
                ingredient: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const recipe = await api.getRecipeById(id)

        this.setState({
            name: recipe.data.data.name,
            cost: recipe.data.data.cost,
            ingredient: recipe.data.data.ingredient.join(','),
        })
    }

    render() {
        const { name, cost, ingredient } = this.state
        return (
            <Wrapper>
                <Title>Create Recipe</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Cost: </Label>
                <InputText
                    type="text"
                    value={cost}
                    onChange={this.handleChangeInputCost}
                />

                <Label>Ingredient: </Label>
                <InputText
                    type="text"
                    value={ingredient}
                    onChange={this.handleChangeInputIngredient}
                />

                <Button onClick={this.handleUpdateRecipe}>Update Recipe</Button>
                <CancelButton href={'/recipes/myrecipes'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UpdateRecipe;