import React from 'react';
import { API_ROOT, PARSE_JSON } from '../../constants';
import NewRoomForm from './NewRoomForm'
import Room from './Room'

import cable from '../../services/Cable'

class RoomsList extends React.Component {

  state = {
    rooms: []
  }

  componentDidMount = () => {
    this.loadRooms()
    // fetch Rooms
    this.roomsChannel()
    // init roomsChannel
  }

  componentWillUnmount = () => {
    // this is necessary to avoid memory leaks
    // the websocket won't unsubscribe unless the window is closed
    cable.disconnect()
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
  }

  loadRooms = () => {
    fetch(`${API_ROOT}/rooms`)
    .then(PARSE_JSON)
    .then( data => {
      this.setState({ rooms: data })
    })
  }

  // Here's the most important part
  // This creates a subscription to the channel
  // 'RoomsChannel' must match what you used
  // on the backend
  roomsChannel = () => {
    cable.subscriptions.create({
    channel: `RoomsChannel`,
    },
      {connected: () => {
        console.log('RoomsChannel connected!')
      },
      disconnected: () => {
        console.log('RoomsChannel disconnected!');
      },
      received: data => {
        // once the subscription is initiated
        // when the server is sent data it will
        // broadcast it out to the subscribers
        this.handleReceivedRoom(data)
        console.log('RoomsChannel data received')
      }
    })
  }

  handleReceivedRoom = response => {
    this.loadRooms()
  }

  mapRooms = rooms => {
    return rooms.map(room => {
      return (
        <Room key={room.id} id={room.id} name={room.name} />
      )
    })
  }

  render = () => {
    return (
      <div className="roomsList">
        <h1>Rooms</h1>
        <p>Select a room or create a new one</p>
        { this.mapRooms(this.state.rooms) }


        <NewRoomForm />

      </div>
    )
  }
}

export default RoomsList
