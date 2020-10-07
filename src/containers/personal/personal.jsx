/*
personal map component router
 */

import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button, Modal, TextareaItem, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import {resetUser, updateUser} from '../../redux/actions'
import HeaderSelector from '../../components/header-selector/header-selector'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {
    constructor(props) {
      super(props);

      this.state = {
        header: this.props.user.header,
        info: this.props.user.info,
        housestyle: this.props.user.housestyle,
        rent: this.props.user.rent,
        location: this.props.user.location,
        zipcode: this.props.user.zipcode,
        visable: false
      }

      this.logout = this.logout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.onClose = this.onClose.bind(this);
      this.save = this.save.bind(this);
      this.choosePic = this.choosePic.bind(this);

    }

    logout = () => {
      // alert('-----')
      Modal.alert('logout', 'Are you sure to log out?', [
        {text: 'cancel'},
        {
          text: 'confirm',
          onPress: ()=> {
            Cookies.remove('userid')
            this.props.resetUser()
          }
        }
      ])
    }

    handleChange = (name, value) => {
      if(this.state[name] !== value){
        this.setState({
          [name]: value
        })
      } 
    }

    save = () => {
        Modal.alert('save', 'Are you sure to edit your info?', [
            {text: 'cancel'},
            {
                text: 'confirm',
                onPress: ()=> {
                    this.props.updateUser(this.state)
                    this.onClose();
                }
            }
        ])
    }

    choosePic = () => {
      this.setState({
        visible: true,
      });
    }

    onClose = () => {
      this.setState({
        visible: false,
      });
    }

    setHeader = (header) => {
      this.setState({
        header
      })
    }

    render() {
        const {username, email, sex, header, info, location, housestyle, rent, zipcode} = this.props.user
        return (
          <div style={{marginBottom:50, marginTop:50}}>
            <Result
              img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
              title={username}
              buttonText="Choose Picture"
              buttonType="ghost"
              onButtonClick={this.choosePic}
            />
            <List renderHeader={() => 'Personal Info'}>
                <Item multipleLine>
                    <Brief>NEU email: {email}</Brief>
                    <WhiteSpace/>
                    <Brief>Username: {username}</Brief>
                    <WhiteSpace/>
                    <Brief>Gender: {sex}</Brief>
                </Item>
            </List>
            <WhiteSpace/>
            <InputItem placeholder={`${location? location: "Please specify"}`} onChange={val => {this.handleChange('location', val)}}>Location:</InputItem>
            <InputItem placeholder={`${zipcode? zipcode: "Please specify"}`} onChange={val => {this.handleChange('zipcode', val)}}>Zip Code:</InputItem>
            <InputItem placeholder={`${housestyle? housestyle: "Please specify"}`} onChange={val => {this.handleChange('housestyle', val)}}>House Style:</InputItem>
            <InputItem placeholder={`${rent? rent: "Please specify"}`} onChange={val => {this.handleChange('rent', val)}}>Rent:</InputItem>
            <TextareaItem title="Introduction: "
                          placeholder={`${info}`}
                          rows={4} onChange={val => {this.handleChange('info', val)}}
            />
            <Button type='primary' onClick={this.save}>Save</Button>
            <List>
            <Button type='warning' onClick={this.logout}>Logout</Button>
            </List>
            <Modal
              popup
              visible={this.state.visible}
              animationType="slide-up"
              onClose={this.onClose}
              style={{ height: 400 }}
            >
              <HeaderSelector setHeader={this.setHeader} size="small"/>
              <Button
                type="primary"
                onClick={this.save}
              >
                Save
              </Button>
              <Button
                onClick={this.onClose}
              >
                Cancel
              </Button>
            </Modal>   
          </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {resetUser, updateUser}
  )(Personal)