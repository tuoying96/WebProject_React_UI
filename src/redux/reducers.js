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

export default combineReducers({
    user,
})
// export state: {user: {}, userList: [], chat: {}}
