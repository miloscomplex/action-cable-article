import React from 'react';
import { API_ROOT, PARSE_JSON } from '../../constants';

class ShowRoom extends React.Component {

  state = {
    room: ''
  }

  componentDidMount = () => {
    this.loadRoom()
  }

  loadRoom = () => {
    fetch(`${API_ROOT}/rooms/${this.props.match.params.id}`)
    .then(PARSE_JSON)
    .then( data => {
      this.setState({ room: data })
    })
  }

  render = () => {
    return (
      <div>
        <h1>Room</h1>
        <div className='room'>
          { this.state.room.name }
        </div>
      </div>
    )
  }
}

export default ShowRoom
