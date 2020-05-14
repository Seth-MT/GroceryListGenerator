import React, { Component } from "react";
import api3 from "./api3";

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


	
class LoginUser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            pass: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputPassword = async event => {
        const pass = event.target.value
        this.setState({ pass })
    }

    handleVerifyUser = async () => {
        const { name, pass } = this.state
        const payload = { name, pass }

        await api3.loginUser(payload).then(res => {
            window.alert(`Logged In`)
			window.location.href = `/recipes/myrecipes`
	
            this.setState({
                name: '',
                pass: '',
            })
        })
    }

    render() {
        const { name, pass } = this.state
        return (
            <Wrapper>
                <Label>Name: </Label>
                <InputText
                    type = "text"
                    value = {name}
                    onChange = {this.handleChangeInputName}
                />

                <Label>Password: </Label>
                <InputText
                    type="password"
                    value={pass}
                    onChange={this.handleChangeInputPassword}
                />

                <Button onClick = {this.handleVerifyUser}>Log In</Button>
                <CancelButton href={'/'}>Cancel</CancelButton>
				<a href = "/user/register">No account? Click here to register</a>
            </Wrapper>
        )
    }
}

export default LoginUser;