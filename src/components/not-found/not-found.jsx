/*
Not Found UI component
 */

import React from "react"
import {Button} from "antd-mobile"

class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div>
          <h2>Oops! Page not found!</h2>
          <Button
            type="primary"
            onClick={() => this.props.history.replace("/")}
          >
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound