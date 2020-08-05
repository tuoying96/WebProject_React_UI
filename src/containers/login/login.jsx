import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Login extends Component {
    state = {
        username: '',  // username
        password: '',  // password
    }

    login = () => {
        this.props.login(this.state)
    }

    // handle the input state
    handleChange = (name, val) => {
        // update state
        this.setState({
            [name]: val
        })
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {

        const {msg, redirectTo} = this.props.user
        // If redirectTo is not empty, we should redirect the corresponding Router
        if(redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>NEU Find My Roommate</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace/>
                        <InputItem placeholder='Please input your username' onChange={val => {this.handleChange('username', val)}}>Username:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='Please input your password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
                        <WhiteSpace/>

                        <Button type='primary' onClick={this.login}>Log In</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>Register</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)