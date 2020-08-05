import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class Nav extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired,
    unReadCount: PropTypes.number.isRequired
  }

  render () {
    let {navList} = this.props //changed "let {navList, unReadCount}" in iter1, otherwise report error
    // filter nav
    navList = navList.filter(nav => !nav.hide)
    const path = this.props.location.pathname
    return (
      <TabBar>
        {
          navList.map((nav) => (
            <Item key={nav.path}
                  title={nav.text}
                  icon={{uri: require(`./nav/${nav.icon}.png`)}}
                  selectedIcon={{uri: require(`./nav/${nav.icon}-selected.png`)}}
                  selected={path===nav.path}
                  onPress={() => this.props.history.replace(nav.path)}/>
          ))
        }

      </TabBar>
    )
  }
}

// export component using withRouter()
export default withRouter(Nav)