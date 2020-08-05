
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
    reqLogin, reqUpdateUser, reqUser,
} from '../api'

// sync action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})

const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

const receiveUser = (user) => ({type: RECEIVE_USER, data:user})

export const resetUser = (msg) => ({type: RESET_USER, data: msg})

const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})

// async register action
export const register = (user) => {
    const {username, password, password2, sex} = user

    if(!username) {
        return errorMsg('Please enter username!')
    } else if(password!==password2) {
        return errorMsg('Two password are not matched!')
    }


    return async dispatch => {
        const response = await reqRegister({username, password, sex})
        const result = response.data //  {code: 0/1, data: user, msg: ''}
        if(result.code===0) {// 成功
            // getMsgList(dispatch, result.data._id)
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
            // getMsgList(dispatch, result.data._id)

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
            //getMsgList(dispatch, result.data._id)
            dispatch(receiveUser(result.data))
        } else { 
            dispatch(resetUser(result.msg))
        }
    }
}