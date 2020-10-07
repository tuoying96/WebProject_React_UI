/*
api modules
functions return promise
 */

import ajax from './ajax'

// register api
export const reqRegister = (user) => ajax('/register', user, 'POST')
// login api
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// update user api
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// get user api
export const reqUser = () => ajax('/user')
//get user list
export const reqUserList = () => ajax('/userlist')
// get message list
export const reqChatMsgList = () => ajax('/msglist')
// modify message state(read)
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')