/*
personal mape component router
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal, TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {
    logout = () => {
        // alert('-----')
        Modal.alert('logout', 'Are you sure to log out?', [
          {text: 'cancle'},
          {
            text: 'confirm',
            onPress: ()=> {
              Cookies.remove('userid')
              this.props.resetUser()
            }
          }
        ])
      }
    
      render() {
        const {username, email, gender, header, post} = this.props.user
        return (
          <div style={{marginBottom:50, marginTop:50}}>
            <Result
            img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
            title={username}
            />
            <List renderHeader={() => 'Personal Info'}>
                <Item multipleLine>
                    <Brief>Name: {username}</Brief>
                    <WhiteSpace/>
                    <Brief>NEU email: {email}</Brief>
                    <WhiteSpace/>
                    <Brief>Gender: {gender}</Brief>
                </Item>
            </List>
            <WhiteSpace/>
            <TextareaItem title="Requirements:"
                            placeholder='Please introduce yourself briefly'
                            rows={4}/>
                            <List>
            <Button type='warning' onClick={this.logout}>logout</Button>
            </List>   
          </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser}
  )(Personal)