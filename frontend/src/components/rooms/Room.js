import React from 'react'
import { Link } from 'react-router-dom'

class Room extends React.Component {

  render() {
    return (
      <div>
        <Link className='room' to={`/${this.props.id}`} >
          { this.props.name }
        </Link>
      </div>
    )
  }

}

export default Room
