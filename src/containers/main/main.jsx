import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'  // set()/get()/remove()
import {NavBar} from 'antd-mobile'

import UserInfo from '../info/info'

import {getRedirectTo} from '../../utils'
import {getUser} from '../../redux/actions'
import Home from '../home/home.jsx'
import Message from '../message/message.jsx'
import Personal from '../personal/personal.jsx'
import Nav from '../../components/nav/nav.jsx'
import NotFound from '../../components/not-found/not-found'
import Chat from '../chat/chat'

class Main extends Component {

  navList = [ // contains all navi components
    {
      path: '/home', // route path
      component: Home,
      title: 'Find My Roommate List',
      icon: 'home',
      text: 'Home',
    },
    {
      path: '/message', // route path
      component: Message,
      title: 'Message',
      icon: 'message',
      text: 'Message',
    },
    {
      path: '/personal', // route path
      component: Personal,
      title: 'My account',
      icon: 'personal',
      text: 'My',
    }
  ]

    componentDidMount () {
        //loged in before(cookie exists userid), but not log in now
        //user in redux do not exists _id
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id) {
            // ajax request, get user
            this.props.getUser()
        }
    }


    render () {
        // get userid in cookie
        const userid = Cookies.get('userid')
        // redirect to log in page
        if(!userid) {
            return <Redirect to='/login'/>
        }
        // get user in redux
        const {user, unReadCount} = this.props
        
        if(!user._id) {
            return null
        } else {
            // if _id exists
            let path = this.props.location.pathname
            if(path==='/') {
                // get an redirected path
                path = getRedirectTo(user.header)
                return <Redirect to= {path}/>
            }
        }

        const {navList} = this
        const path = this.props.location.pathname 
        const currentNav = navList.find(nav=> nav.path===path) // // get current nav
    
        return (
            <div>
            
            {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
            <Switch>
              {
                navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}/>)
              }
              <Route path = '/info' component = {UserInfo}/>
              <Route path = '/chat/:userid' component = {Chat}/>
              <Route component={NotFound}/>
            </Switch>
            {currentNav ? <Nav navList={navList} unReadCount={unReadCount}/> : null}
          </div>
        )
    }
}

export default connect(
    state => ({user: state.user, unReadCount: state.chat.unReadCount}),
    {getUser}
)(Main)