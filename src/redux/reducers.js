/*
reducer functions, return new state
 */
import {combineReducers} from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READ
} from './action-types'

import {getRedirectTo} from '../utils'

const initUser = {
    username: '', // username
    sex: '', // gender
    msg: '', // Error message
    redirectTo: '' // route need to be redirected
}

// generate state of user
function user(state=initUser, action) {
    switch (action.type) { //Should be action.sex???
        case AUTH_SUCCESS: // user
            const {header} = action.data
            return {...action.data, redirectTo: getRedirectTo(header)}
        case ERROR_MSG: // msg
            return {...state, msg: action.data}
        case RECEIVE_USER: // user
            return action.data
        case RESET_USER: // msg
            return {...initUser, msg: action.data}
        default:
            return state
    }
}

//generate state of user list
const initUserList = []
function userList(state=initUserList, action) {
    switch (action.type) {
      case RECEIVE_USER_LIST:  // data is UserList
        return action.data
      default:
        return state
    }
  }

  const initChat = {
    users: {}, // all users' information  key: userid, value: {username, header}
    chatMsgs: [], // message array of current user
    unReadCount: 0 // total count of unread message
  }
  
  // generate state of chat
  function chat(state=initChat, action) {
    switch (action.type) {

        case RECEIVE_MSG_LIST:  // data: {users, chatMsgs}
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal+(!msg.read&&msg.to===userid?1:0),0)
            }
        case RECEIVE_MSG: // data: chatMsg
            const {chatMsg} = action.data
            return {
                users: state.users,
                chatMsgs: [...state.chatMsgs, chatMsg],
                unReadCount: state.unReadCount + (!chatMsg.read&&chatMsg.to===action.data.userid?1:0)
            }
        case MSG_READ:
            const {from, to, count} = action.data
            state.chatMsgs.forEach(msg => {
              if(msg.from===from && msg.to===to && !msg.read) {
                msg.read = true
              }
            })
            return {
              users: state.users,
              chatMsgs: state.chatMsgs.map(msg => {
                if(msg.from===from && msg.to===to && !msg.read) { //update
                  return {...msg, read: true}
                } else {// no update
                  return msg
                }
              }),
              unReadCount: state.unReadCount-count
            }
      default:
        return state
    }
  }

export default combineReducers({
    user, userList, chat
})
// export state: {user: {}, userList: [], chat: {}}
