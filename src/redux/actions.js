import io from 'socket.io-client'

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

import {
    reqRegister,
    reqLogin, 
    reqUpdateUser, 
    reqUser,
    reqUserList,
    reqChatMsgList,
    reqReadMsg
} from '../api'

require('dotenv').config()

// sync action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

const receiveUser = (user) => ({type: RECEIVE_USER, data:user})

export const resetUser = (msg) => ({type: RESET_USER, data: msg})

const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})

const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})

const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

function initIO(dispatch, userid) {
    // create socket object if not exist
    if(!io.socket) {
      // connect to server
      // io.socket = io('https://webproject-api.herokuapp.com')
      io.socket = io(process.env.REACT_APP_IO_WS)
      // combine listener
      io.socket.on('receiveMsg', function (chatMsg) {
        console.log('client receive message from server', chatMsg)
        // filter message(only receive message related to current user)
        if(userid===chatMsg.from || userid===chatMsg.to) {
          dispatch(receiveMsg(chatMsg, userid))
        }
      })
  
    }
  }

// async register action
export const register = (user) => {
    const {email, username, password, password2, sex} = user

    if(!username) {
        return errorMsg('Please enter username!')
    } else if(password!==password2) {
        return errorMsg('Two password are not matched!')
    } else if(!email) {
        return errorMsg('Must input a valid email address')
    } else if(!validateEmail(email)){
        return errorMsg('email format not correct, please use your northeastern.edu email address')
    }


    return async dispatch => {
        const response = await reqRegister({email, username, password, sex})
        const result = response.data //  {code: 0/1, data: user, msg: ''}
        if(result.code===0) {// succeed
            getMsgList(dispatch, result.data._id)
            // dispatch authSuccess action
            dispatch(authSuccess(result.data))
        } else { 
            // dispatch errorMsg action
            dispatch(errorMsg(result.msg))
        }
    }
}

// async login action
export const login = (user) => {

    const {username, password} = user
    
    if(!username) {
        return errorMsg('Please enter username!')
    } else if(!password) {
        return errorMsg('Please enter password!')
    }

    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if(result.code===0) {
            getMsgList(dispatch, result.data._id)
            dispatch(authSuccess(result.data))
        } else { 
            dispatch(errorMsg(result.msg))
        }
    }
}

// async update user action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if(result.code===0) { // success
            dispatch(receiveUser(result.data))
        } else { // failed
            dispatch(resetUser(result.msg))
        }
    }
}

// async get user action
export const getUser = () => {
    return async dispatch => {
        // execute ajax request
        const response = await reqUser()
        const result = response.data
        if(result.code===0) {  
            getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { 
            dispatch(resetUser(result.msg))
        }
    }
}

// async get user list action
export const getUserList = () => {
    return async dispatch => {
    // execute ajax request
    const response = await reqUserList()
    const result = response.data
    // dispatch action
    if(result.code===0) {
        dispatch(receiveUserList(result.data))
        }
    }
}

async function getMsgList(dispatch, userid) {
    initIO(dispatch, userid)
    const response = await reqChatMsgList()
    const result = response.data
    if(result.code===0) {
    const {users, chatMsgs} = result.data
    // dispatch action
    dispatch(receiveMsgList({users, chatMsgs, userid}))
    }
}

//async send message
export const sendMsg = ({from, to, content}) => {
    return dispatch => {
        console.log('client send message to server', {from, to, content})
        io.socket.emit('sendMsg', {from, to, content})
    }
}

  // async read message
export const readMsg = (from, to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if(result.code===0) {
            const count = result.data
            dispatch(msgRead({count, from, to}))
        }
    }
}

function validateEmail (email) {
    const regexp = /^([\w-\.]+@northeastern.edu)?$/;
    return regexp.test(email);
}

