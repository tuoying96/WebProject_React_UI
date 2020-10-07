/*
demonstrate user list
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card, List, Radio, InputItem, Range, SearchBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body
const ListItem = List.Item

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  state = {
    sex: '',
    minRent: '',
    maxRent: '',
    search:''
  }

  // handle the input state
  handleChange = (name, val) => {
      // update state
      this.setState({
          [name]: val
      })
  }

  render () {
    const {userList} = this.props
    const {sex} = this.state
    const {minRent, maxRent} = this.state
    const {search} = this.state
    var filteredUserList = this.state.sex === ''? userList : userList.filter((user) => user.sex === this.state.sex)
    if (minRent !== '') {
      filteredUserList = filteredUserList.filter((user) => parseInt(user.rent, 10) >= parseInt(minRent, 10))
    }
    if (maxRent !== '') {
      filteredUserList = filteredUserList.filter((user) => parseInt(user.rent, 10) <= parseInt(maxRent, 10))
    }
    if (search !== '') {
      filteredUserList = filteredUserList.filter((user) => user.username.toLowerCase().includes(search.toLowerCase()) 
      || user.sex.toLowerCase().includes(search.toLowerCase()) 
      || user.email.toLowerCase().includes(search.toLowerCase())
      || user.zipcode.toLowerCase().includes(search.toLowerCase())
      || user.info.toLowerCase().includes(search.toLowerCase()) 
      || user.location.toLowerCase().includes(search.toLowerCase()) 
      || user.rent.toLowerCase().includes(search.toLowerCase()) 
      || user.housestyle.toLowerCase().includes(search.toLowerCase())
      )
    }

    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
        <ListItem>
          <SearchBar
           placeholder={"Search"}
           maxLength={16} 
           cancelText={"Clear"}
           onChange={val => {this.handleChange('search', val)}}
           />
        </ListItem>
        <ListItem>
            <span>Gender:</span>
            &nbsp;&nbsp;&nbsp;
            <Radio checked={sex==='female'} onChange={() => this.handleChange('sex', 'female')}>Girl</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio checked={sex==='male'}  onClick={() => this.handleChange('sex', 'male')}>Boy</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio checked={sex==='non-binary'}  onClick={() => this.handleChange('sex', 'non-binary')}>Non-binary</Radio>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Radio checked={sex===''}  onClick={() => this.handleChange('sex', '')}>All</Radio>
        </ListItem>
        
        {/* <ListItem>
            <span>Rent:</span>
            &nbsp;&nbsp;&nbsp;
            <InputItem placeholder="Min" type="digit" onChange={val => {this.handleChange('minRent', val)}}></InputItem>
            <InputItem placeholder="Max" type="digit" onChange={val => {this.handleChange('maxRent', val)}}></InputItem>
        </ListItem> */}

        <ListItem>
            <span>Rent Range:</span>
            <WhiteSpace/>
            <Range 
              style={{ height: 15, margin: 20, touchAction: "pan-y"}}
              defaultValue={[0, 3000]}
              onAfterChange={val => {
                  this.handleChange('minRent', val[0])
                  this.handleChange('maxRent', val[1])
                }
              }
              step={50}
              min={0}
              max={3000}
              pushable={100}
              marks={{ 0:'0', 500:'500', 1000:'1000', 1500:'1500', 2000:'2000', 2500:'2500', 3000:'3000' }}
            >
            </Range>
        </ListItem>


          {filteredUserList.map((user) => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.header}.png`)}
                    title={user.username}
                  />
                  <Body>
                  <div>Email: {user.email}</div>
                  <div>Gender: {user.sex}</div>
                  {user.location ? <div>Location: {user.location}</div> : null}
                  {user.zipcode ? <div>Zip Code: {user.zipcode}</div> : null}
                  {user.rent ? <div>Rent: {user.rent}</div> : null}
                  {user.housestyle ? <div>House Style: {user.housestyle}</div> : null}
                  <div>Introduction: {user.info}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
      </WingBlank>
    )
  }
}

export default withRouter(UserList) 