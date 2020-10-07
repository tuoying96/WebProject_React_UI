/*
chat component
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
    state = {
        content: ''
    }

    componentDidMount() {
        // initialized list
        window.scrollTo(0, document.body.scrollHeight)
    
    }
    
    componentDidUpdate () {
        // update
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount() {
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from, to)
    }

    handleSend = () => {
        //collect data
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //send request
        if(content) {
            this.props.sendMsg({from, to, content})
        }
        //clear input content
        this.setState({content: ''})
    }

    render() {
        const {user} = this.props
        const {users, chatMsgs} = this.props.chat
         // filter chatMsgs
         const meId = user._id
         if(!users[meId]) {
           return null
         }
        const targetId = this.props.match.params.userid
        const chatId = [meId, targetId].sort().join('_')
        const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

        //get header of target user
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

        return (
        <div id='chat-page'>
        <NavBar
          icon={<Icon type='left'/>}
          className='sticky-header'
          onLeftClick={()=> this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List style={{marginTop:50, marginBottom: 50}}>
            {
              msgs.map(msg => {
                if(targetId===msg.from) {//from
                  return (
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else { // to me
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra='Me'
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }

        </List>

            <div className='am-tab-bar'>
            <InputItem
                placeholder="please input"
                value={this.state.content}
                onChange={val => this.setState({content: val})}
                extra={
                <span style={{color:'#731621', fontWeight: "bold"}} onClick={this.handleSend}>
                    Send
                </span>
                }
            />
            </div>
        </div>
        )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)