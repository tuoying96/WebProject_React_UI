/*
UI component for selecting user header
 */

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null //name of header file
  }

  constructor(props) {
    super(props)
    // list data
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: 'Icon'+(i+1),
        icon: require(`../../assets/images/Icon${i+1}.png`) // can not use import
      })
    }
  }

  handleClick = ({text, icon}) => {
    // update state
    this.setState({icon})
    this.props.setHeader(text)
  }

  render () {
    // Header Section
    const {icon} = this.state
    const listHeader = !icon ? 'Please select your header' : (
      <div>
        Selected Header:<img src={icon}/>
      </div>
    )

    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}