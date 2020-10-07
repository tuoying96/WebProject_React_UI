/*
Home page
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/user-list'

class Home extends Component {

  componentDidMount () {
    this.props.getUserList()
    // get user in redux
    // const {username} = this.props.user
    // if (username) {
    //   this.props.userList.filter(item => item.username !== username)
    // }
  }
  
  render () {
    return (
      <UserList userList = {this.props.userList} />
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {getUserList}
)(Home)