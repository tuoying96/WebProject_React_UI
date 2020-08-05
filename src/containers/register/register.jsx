/*
Register router
 */

import React, {Component} from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
    state = {
        username: '',  // username
        password: '',  // password
        password2: '',  // check password
        sex: 'gender',  // gender
    }

    // when click register, POST all data
    register = () => {
        this.props.register(this.state)
    }

    // handle the input state
    handleChange = (name, val) => {
        // update state
        this.setState({
            [name]: val
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const {sex} = this.state
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
                        <InputItem placeholder='Please re-input your username' type="password" onChange={val => {this.handleChange('password2', val)}}>Re-Password:</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>Gender:</span>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={sex==='female'} onChange={() => this.handleChange('sex', 'female')}>Girl</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={sex==='male'}  onClick={() => this.handleChange('sex', 'male')}>Boy</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.register}>Register</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>I have an account</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {register}
)(Register)
